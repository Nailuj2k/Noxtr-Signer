/**
 * Signer — Firmador NIP-46 web (Fase 0, ver PLAN.md)
 *
 * Custodia la nsec cifrada (AES-GCM + PBKDF2) en IndexedDB de este origen y firma
 * eventos para clientes NIP-46 (kind 24133, cifrado NIP-44) vía relay.
 *
 * Núcleo copiado/adaptado de _modules_/noxtr/script.js (Pool, Nip44, Bunker).
 * TODO Fase 1: extraer este núcleo a _lib_/nostr/ y compartirlo con noxtr.
 */
(function() {
    'use strict';

    // ==================== HELPERS ====================

    function hexToBytes(hex) {
        var bytes = new Uint8Array(hex.length / 2);
        for (var i = 0; i < hex.length; i += 2) bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        return bytes;
    }
    function bytesToHex(bytes) {
        return Array.from(bytes).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
    }
    async function sha256(message) {
        var data = typeof message === 'string' ? new TextEncoder().encode(message) : message;
        return new Uint8Array(await crypto.subtle.digest('SHA-256', data));
    }
    async function sha256hex(str) { return bytesToHex(await sha256(str)); }
    function escapeHtml(text) {
        return String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }
    function randomId() { return Math.random().toString(36).substr(2, 12); }
    // Interpolación ${0}, ${1}... sin depender del t() global
    function fmt(s) {
        var args = arguments;
        return String(s).replace(/\$\{(\d+)\}/g, function(m, i) {
            var v = args[parseInt(i, 10) + 1];
            return v !== undefined ? v : m;
        });
    }
    function toB64(buf) { return btoa(String.fromCharCode.apply(null, new Uint8Array(buf))); }
    function fromB64(s) { var b = atob(s); return new Uint8Array(b.length).map(function(_, i) { return b.charCodeAt(i); }); }

    // ==================== BECH32 / NIP-19 ====================

    var BC = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
    function bpolymod(v) {
        var G = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3], c = 1;
        for (var i = 0; i < v.length; i++) {
            var t = c >> 25; c = ((c & 0x1ffffff) << 5) ^ v[i];
            for (var j = 0; j < 5; j++) if ((t >> j) & 1) c ^= G[j];
        } return c;
    }
    function bhrp(h) {
        var r = []; for (var i = 0; i < h.length; i++) r.push(h.charCodeAt(i) >> 5);
        r.push(0); for (var i = 0; i < h.length; i++) r.push(h.charCodeAt(i) & 31); return r;
    }
    function bech32Encode(hrp, data) {
        var v = bhrp(hrp).concat(data).concat([0,0,0,0,0,0]);
        var p = bpolymod(v) ^ 1, cs = [];
        for (var i = 0; i < 6; i++) cs.push((p >> (5*(5-i))) & 31);
        var all = data.concat(cs), r = hrp + '1';
        for (var i = 0; i < all.length; i++) r += BC[all[i]]; return r;
    }
    function bech32Decode(str) {
        str = str.toLowerCase(); var pos = str.lastIndexOf('1');
        if (pos < 1) return null;
        var hrp = str.slice(0, pos), data = [];
        for (var i = pos + 1; i < str.length; i++) { var d = BC.indexOf(str[i]); if (d === -1) return null; data.push(d); }
        return { hrp: hrp, data: data.slice(0, -6) };
    }
    function convertBits(data, from, to, pad) {
        var a = 0, b = 0, r = [], m = (1 << to) - 1;
        for (var i = 0; i < data.length; i++) { a = (a << from) | data[i]; b += from; while (b >= to) { b -= to; r.push((a >> b) & m); } }
        if (pad && b > 0) r.push((a << (to - b)) & m); return r;
    }
    function npubEncode(hex) { return bech32Encode('npub', convertBits(Array.from(hexToBytes(hex)), 8, 5, true)); }
    function nsecEncode(hex) { return bech32Encode('nsec', convertBits(Array.from(hexToBytes(hex)), 8, 5, true)); }
    function nsecDecode(nsec) { var d = bech32Decode(nsec); return (d && d.hrp === 'nsec') ? bytesToHex(new Uint8Array(convertBits(d.data, 5, 8, false))) : null; }
    function shortKey(s) { return s ? s.slice(0, 8) + ':' + s.slice(-4) : '?'; }

    // ==================== BIP39 / BIP32 (import 12 palabras; copiado de noxtr script.mostro.js) ====================

    // BIP39: mnemónico → seed de 64 bytes (PBKDF2-SHA512, 2048 iteraciones)
    async function bip39Seed(mnemonic) {
        var enc = new TextEncoder();
        var key = await crypto.subtle.importKey('raw', enc.encode(mnemonic.normalize('NFKD')), 'PBKDF2', false, ['deriveBits']);
        var bits = await crypto.subtle.deriveBits(
            { name: 'PBKDF2', salt: enc.encode('mnemonic'), iterations: 2048, hash: 'SHA-512' },
            key, 512
        );
        return new Uint8Array(bits);
    }

    async function hmacSha512(keyBytes, dataBytes) {
        var k = await crypto.subtle.importKey('raw', keyBytes, { name: 'HMAC', hash: 'SHA-512' }, false, ['sign']);
        return new Uint8Array(await crypto.subtle.sign('HMAC', k, dataBytes));
    }

    var SECP256K1_N = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141');

    // BIP32: derivar hijo a partir de privkey (hex), chainCode (Uint8Array) e índice
    async function bip32DeriveChild(parentPrivHex, parentChain, index) {
        var parentPriv = hexToBytes(parentPrivHex);
        var isHardened = index >= 0x80000000;
        var idxBuf = new Uint8Array(4);
        new DataView(idxBuf.buffer).setUint32(0, index >>> 0, false);
        var data = new Uint8Array(37);
        if (isHardened) {
            data[0] = 0x00;
            data.set(parentPriv, 1);
            data.set(idxBuf, 33);
        } else {
            var pub = nobleSecp256k1.getPublicKey(parentPrivHex, true);
            data.set(typeof pub === 'string' ? hexToBytes(pub) : pub, 0);
            data.set(idxBuf, 33);
        }
        var IL_IR = await hmacSha512(parentChain, data);
        var childBig = (BigInt('0x' + bytesToHex(IL_IR.slice(0, 32))) + BigInt('0x' + parentPrivHex)) % SECP256K1_N;
        return { privkey: childBig.toString(16).padStart(64, '0'), chainCode: IL_IR.slice(32) };
    }

    // Derivar usando ruta, p.ej. "m/44'/1237'/38383'/0/0" (Nostr / Mostro Mobile)
    async function bip32DerivePath(seedBytes, path) {
        var IL_IR = await hmacSha512(new TextEncoder().encode('Bitcoin seed'), seedBytes);
        var cur = { privkey: bytesToHex(IL_IR.slice(0, 32)), chainCode: IL_IR.slice(32) };
        var segs = path.replace('m/', '').split('/');
        for (var i = 0; i < segs.length; i++) {
            var hardened = segs[i].endsWith("'");
            cur = await bip32DeriveChild(cur.privkey, cur.chainCode, parseInt(segs[i]) + (hardened ? 0x80000000 : 0));
        }
        return cur.privkey;
    }

    // ==================== RELAY POOL (simplificado de noxtr) ====================

    var Pool = {
        relays: {}, subs: {}, pending: [], onStatusChange: null,

        connect: function(url) {
            url = url.trim().replace(/\/+$/, '');
            if (this.relays[url]) return;
            this.relays[url] = { ws: null, status: 'connecting', rc: 0, timer: null };
            this._open(url);
        },
        _open: function(url) {
            var self = this, r = this.relays[url]; if (!r) return;
            try {
                r.ws = new WebSocket(url); r.status = 'connecting'; self._notify();
                r.ws.onopen = function() {
                    r.status = 'connected'; r.rc = 0; self._notify();
                    for (var id in self.subs) { var s = self.subs[id]; try { r.ws.send(JSON.stringify(['REQ', id].concat(s.filters))); } catch(e) {} }
                    self._flushPending(r);
                };
                r.ws.onmessage = function(e) { try { self._msg(JSON.parse(e.data), url); } catch(er) {} };
                r.ws.onclose = function() {
                    r.status = 'disconnected'; self._notify();
                    if (r.rc < 20) { r.timer = setTimeout(function() { self._open(url); }, Math.min(30000, 1000 * Math.pow(2, r.rc++))); }
                };
                r.ws.onerror = function() {};
            } catch(e) { r.status = 'error'; self._notify(); }
        },
        disconnectAll: function() {
            for (var url in this.relays) {
                var r = this.relays[url];
                clearTimeout(r.timer); r.rc = 999; if (r.ws) try { r.ws.close(); } catch(e) {}
            }
            this.relays = {}; this.subs = {}; this.pending = []; this._notify();
        },
        _msg: function(msg, url) {
            if (msg[0] === 'EVENT') { var s = this.subs[msg[1]]; if (s && s.onEvent) s.onEvent(msg[2], url); }
        },
        subscribe: function(filters, onEvent) {
            var id = 'sg_' + randomId(); this.subs[id] = { filters: filters, onEvent: onEvent };
            var m = JSON.stringify(['REQ', id].concat(filters));
            for (var u in this.relays) { var r = this.relays[u]; if (r.status === 'connected') try { r.ws.send(m); } catch(e) {} }
            return id;
        },
        unsubscribe: function(id) {
            delete this.subs[id]; var m = JSON.stringify(['CLOSE', id]);
            for (var u in this.relays) { var r = this.relays[u]; if (r.status === 'connected') try { r.ws.send(m); } catch(e) {} }
        },
        publish: function(event) {
            var m = JSON.stringify(['EVENT', event]), sent = false;
            for (var u in this.relays) { var r = this.relays[u]; if (r.status === 'connected') try { r.ws.send(m); sent = true; } catch(e) {} }
            // Sin ningún relay conectado el evento se perdería en silencio (p.ej. la respuesta
            // a una firma recién aprobada tras un microcorte): encolar y reenviar al reconectar.
            if (!sent) this.pending.push({ m: m, exp: Date.now() + 120000 });
        },
        _flushPending: function(r) {
            if (!this.pending.length) return;
            var keep = [];
            for (var i = 0; i < this.pending.length; i++) {
                var p = this.pending[i];
                if (p.exp < Date.now()) continue;
                try { r.ws.send(p.m); } catch(e) { keep.push(p); }
            }
            this.pending = keep;
        },
        _notify: function() { if (this.onStatusChange) try { this.onStatusChange(); } catch(e) {} }
    };

    // ==================== NIP-44 v2 (copiado de noxtr) ====================

    var Nip44 = {
        getConversationKey: async function(privkey, pubkey) {
            var shared = nobleSecp256k1.getSharedSecret(privkey, '02' + pubkey);
            if (typeof shared === 'string') shared = hexToBytes(shared);
            var sharedX = shared.slice(1, 33);
            var saltKey = await crypto.subtle.importKey('raw', new TextEncoder().encode('nip44-v2'), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
            return new Uint8Array(await crypto.subtle.sign('HMAC', saltKey, sharedX));
        },
        _hkdf: async function(prk, info, len) {
            var prkKey = await crypto.subtle.importKey('raw', prk, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
            var okm = new Uint8Array(len);
            var T = new Uint8Array(0);
            var offset = 0, counter = 1;
            while (offset < len) {
                var block = new Uint8Array(T.length + info.length + 1);
                block.set(T);
                block.set(info, T.length);
                block[T.length + info.length] = counter++;
                T = new Uint8Array(await crypto.subtle.sign('HMAC', prkKey, block));
                var copy = Math.min(T.length, len - offset);
                okm.set(T.subarray(0, copy), offset);
                offset += copy;
            }
            return okm;
        },
        _hmac: async function(key, data) {
            var k = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
            return new Uint8Array(await crypto.subtle.sign('HMAC', k, data));
        },
        _calcPadding: function(len) {
            if (len <= 32) return 32;
            var nextPow2 = 1 << (32 - Math.clz32(len - 1));
            var chunk = nextPow2 <= 256 ? 32 : nextPow2 / 8;
            return chunk * (Math.floor((len - 1) / chunk) + 1);
        },
        pad: function(text) {
            var utf8 = new TextEncoder().encode(text);
            var len = utf8.length;
            if (len < 1 || len > 65535) throw new Error('invalid plaintext length');
            var padLen = this._calcPadding(len);
            var padded = new Uint8Array(2 + padLen);
            padded[0] = (len >> 8) & 0xff;
            padded[1] = len & 0xff;
            padded.set(utf8, 2);
            return padded;
        },
        unpad: function(padded) {
            var len = (padded[0] << 8) | padded[1];
            if (len < 1 || 2 + len > padded.length) throw new Error('invalid padding');
            return new TextDecoder().decode(padded.slice(2, 2 + len));
        },
        encrypt: async function(plaintext, conversationKey) {
            var nonce = crypto.getRandomValues(new Uint8Array(32));
            var mk = await this._hkdf(conversationKey, nonce, 76);
            var padded = this.pad(plaintext);
            var ciphertext = nobleCiphers.chacha20(mk.slice(0, 32), mk.slice(32, 44), padded);
            var hmacData = new Uint8Array(nonce.length + ciphertext.length);
            hmacData.set(nonce);
            hmacData.set(ciphertext, nonce.length);
            var mac = await this._hmac(mk.slice(44, 76), hmacData);
            var result = new Uint8Array(1 + 32 + ciphertext.length + 32);
            result[0] = 0x02;
            result.set(nonce, 1);
            result.set(ciphertext, 33);
            result.set(mac, 33 + ciphertext.length);
            return btoa(String.fromCharCode.apply(null, result));
        },
        decrypt: async function(payload, conversationKey) {
            var raw = Uint8Array.from(atob(payload), function(c) { return c.charCodeAt(0); });
            if (raw[0] !== 0x02) throw new Error('unsupported NIP-44 version');
            var nonce = raw.slice(1, 33);
            var mac = raw.slice(raw.length - 32);
            var ciphertext = raw.slice(33, raw.length - 32);
            var mk = await this._hkdf(conversationKey, nonce, 76);
            var hmacData = new Uint8Array(nonce.length + ciphertext.length);
            hmacData.set(nonce);
            hmacData.set(ciphertext, nonce.length);
            var expectedMac = await this._hmac(mk.slice(44, 76), hmacData);
            var match = true;
            for (var i = 0; i < 32; i++) if (mac[i] !== expectedMac[i]) match = false;
            if (!match) throw new Error('invalid MAC');
            return this.unpad(nobleCiphers.chacha20(mk.slice(0, 32), mk.slice(32, 44), ciphertext));
        }
    };

    // ==================== NIP-04 (legacy; AES-256-CBC sobre la X del ECDH) ====================
    // Solo para servir nip04_encrypt/decrypt a clientes antiguos. NIP-44 es el camino preferente.

    var Nip04 = {
        _key: async function(privkey, pubkey) {
            var shared = nobleSecp256k1.getSharedSecret(privkey, '02' + pubkey);
            if (typeof shared === 'string') shared = hexToBytes(shared);
            return shared.slice(1, 33);
        },
        encrypt: async function(privkey, pubkey, text) {
            var iv = crypto.getRandomValues(new Uint8Array(16));
            var key = await crypto.subtle.importKey('raw', await this._key(privkey, pubkey), { name: 'AES-CBC' }, false, ['encrypt']);
            var cipher = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: iv }, key, new TextEncoder().encode(text));
            return toB64(cipher) + '?iv=' + toB64(iv);
        },
        decrypt: async function(privkey, pubkey, payload) {
            var parts = String(payload).split('?iv=');
            if (parts.length !== 2) throw new Error('bad nip04 payload');
            var key = await crypto.subtle.importKey('raw', await this._key(privkey, pubkey), { name: 'AES-CBC' }, false, ['decrypt']);
            var plain = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: fromB64(parts[1]) }, key, fromB64(parts[0]));
            return new TextDecoder().decode(plain);
        }
    };

    // ==================== KEYSTORE (IndexedDB, nsec cifrada en reposo) ====================

    // Multi-identidad: cada registro se indexa por su pubkey (record.id === pubkeyHex) y
    // un puntero en localStorage (ACTIVE) marca cuál está activa. Solo una activa a la vez.
    // El esquema antiguo guardaba un único registro con id fijo 'main' → migrate() lo reubica.
    var KeyStore = {
        DB: 'SignerKeys', STORE: 'keys', ACTIVE: 'signer_active',
        _open: function() {
            return new Promise(function(resolve, reject) {
                var req = indexedDB.open(KeyStore.DB, 1);
                req.onupgradeneeded = function(e) {
                    var db = e.target.result;
                    if (!db.objectStoreNames.contains(KeyStore.STORE)) db.createObjectStore(KeyStore.STORE, { keyPath: 'id' });
                };
                req.onsuccess = function(e) { resolve(e.target.result); };
                req.onerror = function() { reject(req.error); };
            });
        },
        get: async function(id) {
            var db = await this._open();
            return new Promise(function(resolve) {
                var tx = db.transaction(KeyStore.STORE, 'readonly');
                var rq = tx.objectStore(KeyStore.STORE).get(id);
                rq.onsuccess = function() { db.close(); resolve(rq.result || null); };
                rq.onerror = function() { db.close(); resolve(null); };
            });
        },
        list: async function() {
            var db = await this._open();
            return new Promise(function(resolve) {
                var tx = db.transaction(KeyStore.STORE, 'readonly');
                var rq = tx.objectStore(KeyStore.STORE).getAll();
                rq.onsuccess = function() { db.close(); resolve(rq.result || []); };
                rq.onerror = function() { db.close(); resolve([]); };
            });
        },
        save: async function(record) {
            var db = await this._open();
            return new Promise(function(resolve, reject) {
                var tx = db.transaction(KeyStore.STORE, 'readwrite');
                record.id = record.pubkeyHex;   // clave primaria = pubkey de la identidad
                tx.objectStore(KeyStore.STORE).put(record);
                tx.oncomplete = function() { db.close(); resolve(); };
                tx.onerror = function() { db.close(); reject(tx.error); };
            });
        },
        delete: async function(id) {
            var db = await this._open();
            return new Promise(function(resolve) {
                var tx = db.transaction(KeyStore.STORE, 'readwrite');
                tx.objectStore(KeyStore.STORE).delete(id);
                tx.oncomplete = function() { db.close(); resolve(); };
                tx.onerror = function() { db.close(); resolve(); };
            });
        },
        getActiveId: function() {
            try { return localStorage.getItem(this.ACTIVE) || null; } catch(e) { return null; }
        },
        setActiveId: function(id) {
            try { if (id) localStorage.setItem(this.ACTIVE, id); else localStorage.removeItem(this.ACTIVE); } catch(e) {}
        },
        // Migración del esquema monousuario: el registro de id fijo 'main' pasa a indexarse por
        // su pubkey, y sus clientes/actividad globales (claves sin sufijo) al espacio de esa
        // identidad. Idempotente: si ya no hay 'main', no hace nada.
        migrate: async function() {
            var old = await this.get('main');
            if (!old || !old.pubkeyHex) return;
            var pk = old.pubkeyHex;
            await this.save(old);        // re-guarda con id = pubkey
            await this.delete('main');
            if (!this.getActiveId()) this.setActiveId(pk);
            try {
                var c = localStorage.getItem('signer_clients');
                if (c !== null && localStorage.getItem('signer_clients:' + pk) === null)
                    localStorage.setItem('signer_clients:' + pk, c);
                if (c !== null) localStorage.removeItem('signer_clients');
            } catch(e) {}
            try {
                var a = localStorage.getItem('signer_activity');
                if (a !== null && localStorage.getItem('signer_activity:' + pk) === null)
                    localStorage.setItem('signer_activity:' + pk, a);
                if (a !== null) localStorage.removeItem('signer_activity');
            } catch(e) {}
        }
    };

    // Cifrado de la nsec con passphrase: PBKDF2-SHA256 (200k) → AES-GCM 256
    async function encryptPrivkey(privHex, pass) {
        var enc = new TextEncoder();
        var salt = crypto.getRandomValues(new Uint8Array(16));
        var iv = crypto.getRandomValues(new Uint8Array(12));
        var keyMat = await crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveKey']);
        var aesKey = await crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt: salt, iterations: 200000, hash: 'SHA-256' },
            keyMat, { name: 'AES-GCM', length: 256 }, false, ['encrypt']
        );
        var cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, aesKey, enc.encode(privHex));
        return { salt: toB64(salt), iv: toB64(iv), data: toB64(cipher) };
    }
    async function decryptPrivkey(encRec, pass) {
        var enc = new TextEncoder();
        var keyMat = await crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveKey']);
        var aesKey = await crypto.subtle.deriveKey(
            { name: 'PBKDF2', salt: fromB64(encRec.salt), iterations: 200000, hash: 'SHA-256' },
            keyMat, { name: 'AES-GCM', length: 256 }, false, ['decrypt']
        );
        var plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(encRec.iv) }, aesKey, fromB64(encRec.data));
        return new TextDecoder().decode(plain);
    }

    // Desbloqueo automático ("recordar en este dispositivo"): la nsec se cifra con una clave
    // AES-GCM NO extraíble generada por WebCrypto y guardada como CryptoKey en IndexedDB
    // (clonado estructurado). El JS nunca puede leer la clave, solo usarla; el modelo es el
    // de "sesión iniciada": quien use este perfil del navegador puede firmar. La contraseña
    // (opcional) es la capa extra para equipos compartidos. Futuro: passkey WebAuthn+PRF.
    async function deviceWrap(privHex) {
        var key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
        var iv = crypto.getRandomValues(new Uint8Array(12));
        var data = await crypto.subtle.encrypt({ name: 'AES-GCM', iv: iv }, key, new TextEncoder().encode(privHex));
        return { key: key, iv: toB64(iv), data: toB64(data) };
    }
    async function deviceUnwrap(device) {
        var plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(device.iv) }, device.key, fromB64(device.data));
        return new TextDecoder().decode(plain);
    }

    // Backup JSON cifrado de noxtr ({encrypted:true, salt, iv, data}) → objeto data
    // Mismo esquema (PBKDF2-SHA256 200k + AES-GCM) que el Exportar de noxtr.
    async function decryptBackupWrapper(wrapper, pass) {
        var plainJson = await decryptPrivkey({ salt: wrapper.salt, iv: wrapper.iv, data: wrapper.data }, pass);
        return JSON.parse(plainJson);
    }

    // Descarga la identidad como archivo JSON, re-importable con findNsecDeep.
    // Con contraseña: wrapper cifrado {encrypted:true, salt, iv, data} (el de noxtr).
    // Sin contraseña: {"nsec","npub"} EN CLARO (decisión del usuario, confirmada antes;
    // el nombre del archivo lleva -PLAIN- para que se note). Lo usan setup y Exportar.
    async function downloadBackupFile(privHex, npub, pass) {
        var wrapper;
        if (pass) {
            var payload = JSON.stringify({ nsec: nsecEncode(privHex), npub: npub || '' });
            var enc = await encryptPrivkey(payload, pass);
            wrapper = { encrypted: true, app: 'noxtr-signer', created: new Date().toISOString(), salt: enc.salt, iv: enc.iv, data: enc.data };
        } else {
            wrapper = { app: 'noxtr-signer', created: new Date().toISOString(), nsec: nsecEncode(privHex), npub: npub || '' };
        }
        var blob = new Blob([JSON.stringify(wrapper, null, 2)], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'signer-' + (pass ? 'backup-' : 'nsec-PLAIN-') + (npub ? npub.slice(0, 13) : 'nsec') + '.json';
        document.body.appendChild(a); a.click();
        setTimeout(function() { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
        if (typeof notify !== 'undefined') notify(str_sgn_export_done, 'success', 4000); else alert(str_sgn_export_done);
    }

    // Buscar una clave privada Nostr en cualquier JSON (no hay formato estándar en el
    // ecosistema): nsec1... en cualquier valor, o 64-hex bajo una clave que suene a privada.
    function findNsecDeep(obj, keyHint) {
        if (obj == null) return null;
        if (typeof obj === 'string') {
            var s = obj.trim();
            if (/^nsec1[a-z0-9]{20,}$/i.test(s)) return s;
            if (keyHint && /(nsec|priv|seckey|secret|^sk$)/i.test(keyHint) && /^[0-9a-f]{64}$/i.test(s)) return s;
            return null;
        }
        if (typeof obj === 'object') {
            for (var k in obj) {
                var r = findNsecDeep(obj[k], k);
                if (r) return r;
            }
        }
        return null;
    }

    // QR de importación: aceptar nsec directo, JSON con nsec, hex privado exacto
    // o un mnemónico BIP39 de 12/24 palabras. Las palabras usan la ruta NIP-06.
    async function nsecFromImportText(text) {
        var raw = String(text || '').trim();
        if (!raw) throw new Error(str_sgn_scan_key_bad);
        try { raw = decodeURIComponent(raw); } catch(e) {}

        var nsecMatch = raw.match(/nsec1[a-z0-9]{20,}/i);
        if (nsecMatch) return nsecMatch[0];

        var compact = raw.trim();
        if (/^[0-9a-f]{64}$/i.test(compact)) return nsecEncode(compact.toLowerCase());

        if (/^[\[{]/.test(compact)) {
            try {
                var found = findNsecDeep(JSON.parse(compact), '');
                if (found) return found;
            } catch(e) {}
        }

        var words = compact.toLowerCase()
            .replace(/["'`´]/g, '')
            .replace(/[,\n\r\t]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        var parts = words ? words.split(' ') : [];
        if (parts.length === 12 || parts.length === 24) {
            if (window.bip39 && !window.bip39.validateMnemonic(words)) {
                var goOn = await confirm(str_sgn_words_bad_checksum);
                if (!goOn) throw new Error(str_sgn_scan_key_bad);
            }
            var seed = await bip39Seed(words);
            var privHex = await bip32DerivePath(seed, "m/44'/1237'/0'/0/0");
            Keys.derivePub(privHex);
            return nsecEncode(privHex);
        }

        throw new Error(str_sgn_scan_key_bad);
    }

    // ==================== ESTADO DE LA CLAVE (en memoria tras desbloquear) ====================

    var Keys = {
        privkey: null,   // hex; SOLO en memoria, nunca persistido en claro
        pubkey: null,    // hex
        record: null,    // registro IndexedDB { pubkeyHex, npub, encrypted, createdAt }

        derivePub: function(privHex) {
            var pk = nobleSecp256k1.getPublicKey(privHex, true);
            return (typeof pk === 'string' ? pk : bytesToHex(pk)).slice(2);
        },
        // extraBytes (opcional): entropía recolectada del usuario. Se mezcla por hash con el
        // CSPRNG — SHA-256(csprng || extra || intento) — así nunca puede empeorar el resultado.
        generate: async function(extraBytes) {
            for (var i = 0; i < 10; i++) {
                try {
                    var rnd = crypto.getRandomValues(new Uint8Array(32));
                    var priv;
                    if (extraBytes && extraBytes.length) {
                        var mix = new Uint8Array(rnd.length + extraBytes.length + 1);
                        mix.set(rnd);
                        mix.set(extraBytes, rnd.length);
                        mix[mix.length - 1] = i;
                        priv = bytesToHex(await sha256(mix));
                    } else {
                        priv = bytesToHex(rnd);
                    }
                    this.derivePub(priv);  // valida que sea < orden de la curva
                    return priv;
                } catch(e) {}
            }
            throw new Error('keygen failed');
        },
        lock: function() {
            this.privkey = null;
            Bunker.suspend();
        }
    };

    // ==================== GRANTS (auto-firma por (cliente, kind); solo memoria) ====================
    // Fase 3 (PLAN.md §7) los hará persistentes y con caducidad. Por ahora: mueren al recargar.

    var SENSITIVE_KINDS = [0, 5, 1059];  // perfil, borrado, gift wrap (Mostro): SIEMPRE confirman

    // Operaciones de DM: se auto-aprueban SIEMPRE, sin dialogo, sin depender de perms ni de
    // re-emparejar. El firmador ya custodia la nsec; confirmar cada mensaje de una bandeja es
    // inviable. Cubre el cifrado/descifrado (nip04/nip44) y la firma del propio DM (kind 4).
    // NIP-17 usa gift wrap (1059), que es sensible y sigue confirmando (lo usa Mostro).
    var DM_AUTO_METHODS = ['nip04_encrypt', 'nip04_decrypt', 'nip44_encrypt', 'nip44_decrypt'];
    var DM_AUTO_KINDS = [4];

    var Grants = {
        _g: {},  // clientPubkey -> { kind: true }
        allow: function(clientPk, kind) { if (!this._g[clientPk]) this._g[clientPk] = {}; this._g[clientPk][kind] = true; UI.renderClients(); },
        has: function(clientPk, kind) {
            if (SENSITIVE_KINDS.indexOf(kind) !== -1) return false;
            var g = this._g[clientPk];
            if (!g) return false;
            if (g[kind]) return true;
            // Permiso generico 'sign_event' del URI: auto-firma kinds no sensibles (no metodos)
            if (typeof kind === 'number' && g['sign_event']) return true;
            return false;
        },
        revoke: function(clientPk, kind) { if (this._g[clientPk]) delete this._g[clientPk][kind]; UI.renderClients(); },
        of: function(clientPk) { return Object.keys(this._g[clientPk] || {}); },
        clear: function(clientPk) { delete this._g[clientPk]; }
    };

    // ==================== ACTIVIDAD ====================

    var Activity = {
        KEY: 'signer_activity', MAX: 50,
        list: [],
        // La actividad es por-identidad: la clave lleva el sufijo de la pubkey activa.
        _key: function() { return this.KEY + ':' + (Keys.pubkey || 'none'); },
        load: function() {
            try { this.list = JSON.parse(localStorage.getItem(this._key())) || []; } catch(e) { this.list = []; }
        },
        add: function(app, detail, action) {
            this.list.unshift({ ts: Math.floor(Date.now() / 1000), app: app, detail: detail, action: action });
            if (this.list.length > this.MAX) this.list = this.list.slice(0, this.MAX);
            try { localStorage.setItem(this._key(), JSON.stringify(this.list)); } catch(e) {}
            UI.renderActivity();
        }
    };

    // ==================== BUNKER NIP-46 (adaptado de noxtr) ====================

    var KIND_NAMES = { 0: 'profile', 1: 'note', 3: 'contacts', 4: 'DM', 5: 'delete', 6: 'repost', 7: 'reaction', 1059: 'gift wrap', 9734: 'zap request', 22242: 'auth', 24133: 'nip46', 27235: 'HTTP auth (login)', 30023: 'article' };

    var Bunker = {
        STORAGE: 'signer_clients',   // base; la clave real lleva el sufijo de la pubkey activa
        // Los clientes emparejados son por-identidad: cada una recuerda los suyos.
        _key: function() { return this.STORAGE + ':' + (Keys.pubkey || 'none'); },
        // Relays propios del firmador: donde escucha para el pairing bunker:// y donde
        // responde a esos clientes. (Los clientes nostrconnect:// traen los suyos en la URI.)
        // Relays propios: relays.js (raíz, editable por el usuario) puede definir
        // SIGNER_RELAYS; solo se aceptan wss://. Si falta o no es válido → defaults.
        RELAYS: (function() {
            var defaults = ['wss://relay.damus.io', 'wss://nos.lol', 'wss://relay.primal.net'];
            try {
                if (typeof SIGNER_RELAYS !== 'undefined' && Array.isArray(SIGNER_RELAYS)) {
                    var ok = SIGNER_RELAYS.filter(function(r) { return typeof r === 'string' && r.indexOf('wss://') === 0; });
                    if (ok.length) return ok;
                }
            } catch(e) {}
            return defaults;
        })(),
        clients: {},   // clientPubkey -> { convKey, name, secret, relays }
        subId: null,
        active: false,
        pairingSecret: null,  // secret de un solo uso para la URI bunker:// (rota tras cada pairing)
        _seen: {},
        _lastCryptLog: {},  // throttle del log para nip04/44_encrypt/decrypt auto-aprobados
        _approvals: {},     // dialogos de aprobacion en vuelo por (cliente|op): coalesce de rafagas

        accept: async function(uriRaw) {
            if (!Keys.privkey) throw new Error(str_sgn_need_unlock);
            var uri = uriRaw.trim();
            if (uri.indexOf('nostrconnect://') !== 0) { try { uri = decodeURIComponent(uri); } catch(e) {} }
            if (uri.indexOf('nostrconnect://') !== 0) throw new Error('nostrconnect:// URI required');

            var parsed;
            try { parsed = new URL('https://' + uri.slice('nostrconnect://'.length)); } catch(e) { throw new Error('malformed URI'); }

            var clientPubkey = parsed.hostname;
            var relays = parsed.searchParams.getAll('relay');
            var secret = parsed.searchParams.get('secret') || '';
            var name = parsed.searchParams.get('name') || 'Unknown app';
            var perms = parsed.searchParams.get('perms') || '';

            if (!clientPubkey || clientPubkey.length !== 64 || !/^[0-9a-f]+$/i.test(clientPubkey))
                throw new Error('invalid client pubkey');
            if (!relays.length) throw new Error('URI has no relay');

            var convKey = await Nip44.getConversationKey(Keys.privkey, clientPubkey);
            this.clients[clientPubkey] = { convKey: convKey, name: name, secret: secret, relays: relays, perms: perms };
            this._applyPerms(clientPubkey, perms);

            for (var i = 0; i < relays.length; i++) Pool.connect(relays[i]);

            this._subscribe();
            this.active = true;
            this._save();

            await this._waitForRelay(relays, 5000);
            await this._sendConnectRequest(clientPubkey, secret, relays);

            Activity.add(name, 'NIP-46', str_sgn_act_connected);
            UI.renderClients();
            return name;
        },

        stop: function(clientPubkey) {
            if (clientPubkey) {
                Grants.clear(clientPubkey);
                delete this.clients[clientPubkey];
            } else {
                this.clients = {};
            }
            if (!Object.keys(this.clients).length) {
                this.active = false;
                if (this.subId) { Pool.unsubscribe(this.subId); this.subId = null; }
            }
            this._save();
            UI.renderClients();
        },

        // Bloquear la clave: dejar de atender sin olvidar los clientes guardados
        suspend: function() {
            this.clients = {};
            this.active = false;
            this.pairingSecret = null;
            if (this.subId) { Pool.unsubscribe(this.subId); this.subId = null; }
            Pool.disconnectAll();
        },

        // Escuchar en los relays propios para el pairing bunker:// (aunque no haya clientes aún)
        listen: function() {
            if (!Keys.privkey) return;
            if (!this.pairingSecret) this.pairingSecret = bytesToHex(crypto.getRandomValues(new Uint8Array(16)));
            for (var i = 0; i < this.RELAYS.length; i++) Pool.connect(this.RELAYS[i]);
            this._subscribe();
            this.active = true;
        },

        bunkerUri: function() {
            if (!Keys.pubkey || !this.pairingSecret) return '';
            return 'bunker://' + Keys.pubkey + '?'
                + this.RELAYS.map(function(r) { return 'relay=' + encodeURIComponent(r); }).join('&')
                + '&secret=' + this.pairingSecret;
        },

        restore: async function() {
            try {
                if (!Keys.privkey) return false;
                var data = JSON.parse(localStorage.getItem(this._key()));
                if (!data || !data.clients) return false;
                var keys = Object.keys(data.clients);
                if (!keys.length) return false;
                for (var i = 0; i < keys.length; i++) {
                    var pk = keys[i], c = data.clients[pk];
                    var convKey = await Nip44.getConversationKey(Keys.privkey, pk);
                    this.clients[pk] = { convKey: convKey, name: c.name, secret: c.secret, relays: c.relays || [], perms: c.perms || '' };
                    this._applyPerms(pk, c.perms || '');
                    for (var j = 0; j < (c.relays || []).length; j++) Pool.connect(c.relays[j]);
                }
                this._subscribe();
                this.active = true;
                UI.renderClients();
                return true;
            } catch(e) { return false; }
        },

        _save: function() {
            try {
                var toSave = {};
                Object.keys(this.clients).forEach(function(pk) {
                    toSave[pk] = { name: Bunker.clients[pk].name, secret: Bunker.clients[pk].secret, relays: Bunker.clients[pk].relays, perms: Bunker.clients[pk].perms || '' };
                });
                localStorage.setItem(this._key(), JSON.stringify({ clients: toSave }));
            } catch(e) {}
        },

        _subscribe: function() {
            if (this.subId) Pool.unsubscribe(this.subId);
            if (!Keys.pubkey) return;
            var self = this;
            this.subId = Pool.subscribe(
                [{ kinds: [24133], '#p': [Keys.pubkey], limit: 5 }],
                function(ev) { self._handleRequest(ev); }
            );
        },

        _handleRequest: async function(ev) {
            if (ev.kind !== 24133) return;
            if (this._seen[ev.id]) return;
            this._seen[ev.id] = true;
            // Descartar peticiones rancias que los relays re-entregan al (re)conectar
            if (Math.abs(Math.floor(Date.now() / 1000) - (ev.created_at || 0)) > 180) return;
            var client = this.clients[ev.pubkey];
            var convKey;
            try {
                convKey = client ? client.convKey : await Nip44.getConversationKey(Keys.privkey, ev.pubkey);
            } catch(e) { return; }
            var msg;
            try {
                msg = JSON.parse(await Nip44.decrypt(ev.content, convKey));
            } catch(e) { return; }

            var method = msg.method || '', id = msg.id || '', params = msg.params || [];

            // Cliente desconocido: solo se acepta el pairing bunker:// (connect con el secret vigente)
            if (!client) {
                if (method !== 'connect') return;
                var secret = String(params[1] || '');
                if (!this.pairingSecret || !secret || secret !== this.pairingSecret) return;
                var bperms = String(params[2] || '');
                client = this.clients[ev.pubkey] = { convKey: convKey, name: 'bunker ' + shortKey(ev.pubkey), secret: secret, relays: this.RELAYS.slice(), perms: bperms };
                this._applyPerms(ev.pubkey, bperms);
                this.pairingSecret = bytesToHex(crypto.getRandomValues(new Uint8Array(16)));  // un solo uso
                this._save();
                Activity.add(client.name, 'bunker://', str_sgn_act_connected);
                UI.renderClients();
                UI.renderBunkerUri();
                try { await this._sendResponse(ev.pubkey, id, secret, null); } catch(e) {}
                return;
            }

            try {
                if (method === 'connect') {
                    await this._sendResponse(ev.pubkey, id, client.secret || 'ack', null);

                } else if (method === 'ping') {
                    await this._sendResponse(ev.pubkey, id, 'pong', null);

                } else if (method === 'get_public_key') {
                    await this._sendResponse(ev.pubkey, id, Keys.pubkey, null);

                } else if (method === 'get_relays') {
                    var relayMap = {};
                    (client.relays || []).forEach(function(url) { relayMap[url] = { read: true, write: true }; });
                    await this._sendResponse(ev.pubkey, id, JSON.stringify(relayMap), null);

                } else if (method === 'sign_event') {
                    var eventToSign = (typeof params[0] === 'string') ? JSON.parse(params[0]) : params[0];
                    // Siempre nuestro pubkey: con otro, la sig nunca validaría (y el id se calcularía mal)
                    eventToSign.pubkey = Keys.pubkey;
                    if (!eventToSign.created_at) eventToSign.created_at = Math.floor(Date.now() / 1000);
                    if (!eventToSign.tags) eventToSign.tags = [];
                    if (eventToSign.content === undefined || eventToSign.content === null) eventToSign.content = '';

                    var kind = eventToSign.kind;
                    var kindDesc = (KIND_NAMES[kind] ? KIND_NAMES[kind] + ' (' : '') + 'kind ' + kind + (KIND_NAMES[kind] ? ')' : '');

                    // Política (PLAN.md §7, versión mínima Fase 0):
                    //  - kind 27235 (login web NIP-98) → auto-firma
                    //  - grant en memoria (cliente, kind) → auto-firma (nunca para kinds sensibles)
                    //  - resto → confirmar siempre
                    var auto = (kind === 27235) || DM_AUTO_KINDS.indexOf(kind) !== -1 || Grants.has(ev.pubkey, kind);
                    if (!auto) {
                        var preview = eventToSign.content ? String(eventToSign.content).slice(0, 200) : '';
                        var decision = await this._coalesceApproval(ev.pubkey + '|sign:' + kind, function() {
                            return UI.askApproval(client.name, kindDesc, preview, SENSITIVE_KINDS.indexOf(kind) === -1);
                        });
                        if (decision === 'no') {
                            Activity.add(client.name, kindDesc, str_sgn_act_rejected);
                            await this._sendResponse(ev.pubkey, id, null, str_sgn_rejected_by_user);
                            return;
                        }
                        if (decision === 'remember') Grants.allow(ev.pubkey, kind);
                    }

                    // Recalcular SIEMPRE el id: hemos podido normalizar pubkey/created_at/tags
                    eventToSign.id = await sha256hex(JSON.stringify([0, eventToSign.pubkey, eventToSign.created_at, eventToSign.kind, eventToSign.tags, eventToSign.content]));
                    var sig = await nobleSecp256k1.schnorr.sign(eventToSign.id, Keys.privkey);
                    eventToSign.sig = typeof sig === 'string' ? sig : bytesToHex(sig);
                    Activity.add(client.name, kindDesc, auto ? str_sgn_act_auto : str_sgn_act_signed);
                    await this._sendResponse(ev.pubkey, id, JSON.stringify(eventToSign), null);

                } else if (method === 'nip44_encrypt' || method === 'nip44_decrypt' || method === 'nip04_encrypt' || method === 'nip04_decrypt') {
                    var third = String(params[0] || '').toLowerCase();
                    var payload = String(params[1] || '');
                    if (!/^[0-9a-f]{64}$/.test(third)) throw new Error('invalid third-party pubkey');
                    var opDesc = this._methodDesc(method) + ' · ' + shortKey(third);

                    // Misma política que sign_event, con grant por (cliente, método): cifrar/descifrar
                    // DMs va en ráfagas (bandejas enteras) y pedir confirmación por mensaje es inviable.
                    var autoOp = DM_AUTO_METHODS.indexOf(method) !== -1 || Grants.has(ev.pubkey, method);
                    if (!autoOp) {
                        var d = await this._coalesceApproval(ev.pubkey + '|' + method, function() {
                            return UI.askApproval(client.name, opDesc, '', true,
                                { msg: str_sgn_app_wants_op, once: str_sgn_allow, remember: str_sgn_allow_remember });
                        });
                        if (d === 'no') {
                            Activity.add(client.name, opDesc, str_sgn_act_rejected);
                            await this._sendResponse(ev.pubkey, id, null, str_sgn_rejected_by_user);
                            return;
                        }
                        if (d === 'remember') Grants.allow(ev.pubkey, method);
                    }

                    var result;
                    if (method === 'nip44_encrypt')      result = await Nip44.encrypt(payload, await Nip44.getConversationKey(Keys.privkey, third));
                    else if (method === 'nip44_decrypt') result = await Nip44.decrypt(payload, await Nip44.getConversationKey(Keys.privkey, third));
                    else if (method === 'nip04_encrypt') result = await Nip04.encrypt(Keys.privkey, third, payload);
                    else                                 result = await Nip04.decrypt(Keys.privkey, third, payload);

                    this._logCrypt(client.name, ev.pubkey, method, opDesc, autoOp);
                    await this._sendResponse(ev.pubkey, id, result, null);

                } else {
                    await this._sendResponse(ev.pubkey, id, null, 'Unsupported method: ' + method);
                }
            } catch(e) {
                try { await this._sendResponse(ev.pubkey, id, null, e.message || 'Error'); } catch(e2) {}
            }
        },

        _methodDesc: function(method) {
            return ({
                nip44_encrypt: str_sgn_op_n44e, nip44_decrypt: str_sgn_op_n44d,
                nip04_encrypt: str_sgn_op_n04e, nip04_decrypt: str_sgn_op_n04d
            })[method] || method;
        },

        // Coalesce de aprobaciones: una rafaga de peticiones identicas (mismo cliente y misma
        // operacion) comparte UN solo dialogo en vez de apilar N overlays, que llegan a tapar
        // toda la pantalla. El primero lo abre; el resto espera su misma decision.
        _coalesceApproval: function(key, opener) {
            if (this._approvals[key]) return this._approvals[key];
            var self = this;
            var p = opener();
            this._approvals[key] = p;
            p.then(function() { delete self._approvals[key]; }, function() { delete self._approvals[key]; });
            return p;
        },

        // Permisos NIP-46 del URI (param perms): pre-conceder lo que la app pide al conectar
        // para no confirmar cada operacion. Cifrado/descifrado (nip04/nip44) y, si se pide,
        // sign_event generico (kinds no sensibles; 0/5/1059 siguen confirmando). get_public_key
        // no necesita grant. Es lo que hacen Amber/nsec.app y por lo que alli los DM no preguntan.
        _applyPerms: function(clientPk, permsStr) {
            if (!permsStr) return;
            var parts = String(permsStr).split(',');
            for (var i = 0; i < parts.length; i++) {
                var p = parts[i].trim();
                if (p === 'nip04_encrypt' || p === 'nip04_decrypt' || p === 'nip44_encrypt' || p === 'nip44_decrypt' || p === 'sign_event') {
                    Grants.allow(clientPk, p);
                } else if (/^sign_event:\d+$/.test(p)) {
                    Grants.allow(clientPk, parseInt(p.split(':')[1], 10));
                }
            }
        },

        // Las ráfagas auto-aprobadas de cifrado/descifrado se loguean máximo una vez por minuto
        // por (cliente, método) para no expulsar las firmas del log de actividad.
        _logCrypt: function(appName, clientPk, method, desc, auto) {
            var k = clientPk + '|' + method, now = Date.now();
            if (auto && this._lastCryptLog[k] && now - this._lastCryptLog[k] < 60000) return;
            this._lastCryptLog[k] = now;
            Activity.add(appName, desc, auto ? str_sgn_act_auto : str_sgn_act_approved);
        },

        _waitForRelay: function(relayUrls, maxMs) {
            return new Promise(function(resolve) {
                var deadline = Date.now() + maxMs;
                var check = function() {
                    for (var i = 0; i < relayUrls.length; i++) {
                        var r = Pool.relays[relayUrls[i]];
                        if (r && r.status === 'connected') { resolve(); return; }
                    }
                    if (Date.now() >= deadline) { resolve(); return; }
                    setTimeout(check, 100);
                };
                check();
            });
        },

        // Respuesta "connect" al cliente (flujo nostrconnect://): el signer inicia el handshake
        _sendConnectRequest: async function(clientPubkey, secret, uriRelays) {
            if (!Keys.privkey || !Keys.pubkey) return;
            var client = this.clients[clientPubkey];
            if (!client) return;
            var id = bytesToHex(crypto.getRandomValues(new Uint8Array(8)));
            var ev = await this._buildResponseEvent(clientPubkey, { id: id, result: secret || 'ack', error: '' });
            Pool.publish(ev);
            // Re-enviar a cada relay del URI en cuanto conecte (hasta 20s)
            var msg = JSON.stringify(['EVENT', ev]);
            var deadline = Date.now() + 20000;
            (uriRelays || []).forEach(function(url) {
                var sent = false;
                var check = function() {
                    if (sent || Date.now() > deadline) return;
                    var r = Pool.relays[url];
                    if (r && r.status === 'connected') {
                        try { r.ws.send(msg); sent = true; } catch(e) {}
                    } else {
                        setTimeout(check, 400);
                    }
                };
                setTimeout(check, 200);
            });
        },

        _sendResponse: async function(clientPubkey, id, result, error) {
            if (!Keys.privkey || !Keys.pubkey) return;
            var ev = await this._buildResponseEvent(clientPubkey, { id: id, result: result, error: error });
            if (ev) Pool.publish(ev);
        },

        _buildResponseEvent: async function(clientPubkey, payloadObj) {
            var client = this.clients[clientPubkey];
            if (!client) return null;
            var encrypted = await Nip44.encrypt(JSON.stringify(payloadObj), client.convKey);
            var ev = { pubkey: Keys.pubkey, created_at: Math.floor(Date.now() / 1000), kind: 24133, tags: [['p', clientPubkey]], content: encrypted };
            ev.id = await sha256hex(JSON.stringify([0, ev.pubkey, ev.created_at, ev.kind, ev.tags, ev.content]));
            var sig = await nobleSecp256k1.schnorr.sign(ev.id, Keys.privkey);
            ev.sig = typeof sig === 'string' ? sig : bytesToHex(sig);
            return ev;
        }
    };

    // ==================== PERFIL (kind 0 → nombre) ====================
    // Nombre de perfil de la identidad ACTIVA. Es público: NO necesita la nsec, y se consulta
    // en los relays a los que el firmador ya está conectado con esa pubkey, así que no filtra
    // metadatos nuevos. Se cachea en el registro y sirve como etiqueta por defecto del selector
    // cuando no hay alias manual. Solo la activa: nunca se piden a la vez todas las pubkeys
    // (evita correlacionar las identidades en un relay).
    function fetchActiveProfile() {
        if (!Keys.pubkey) return;
        var pk = Keys.pubkey, bestTs = -1, sub;
        function close() { if (sub) { Pool.unsubscribe(sub); sub = null; } }
        sub = Pool.subscribe([{ kinds: [0], authors: [pk], limit: 1 }], function(ev) {
            if (!sub || ev.kind !== 0 || ev.pubkey !== pk) return;
            if ((ev.created_at || 0) <= bestTs) return;   // quedarnos con el más reciente
            bestTs = ev.created_at || 0;
            var name = '';
            try { var m = JSON.parse(ev.content); name = String(m.display_name || m.name || '').trim(); } catch(e) {}
            if (!name) return;
            // aplicar solo si seguimos en la misma identidad activa
            if (Keys.record && Keys.record.id === pk && Keys.record.profileName !== name) {
                Keys.record.profileName = name;
                if (!Keys.record.sessionOnly) KeyStore.save(Keys.record);
                UI.renderSwitcher();
            }
        });
        setTimeout(close, 8000);  // ventana corta; el nombre cacheado se ve al instante la próxima vez
    }

    // ==================== UI ====================

    var UI = {
        show: function(state) {
            document.getElementById('signer-setup').style.display = (state === 'setup') ? '' : 'none';
            document.getElementById('signer-locked').style.display = (state === 'locked') ? '' : 'none';
            document.getElementById('signer-main').style.display = (state === 'main') ? '' : 'none';
            if (state === 'locked') {
                // Sin contraseña configurada el campo no aplica (se desbloquea con la clave de dispositivo)
                var pr = document.getElementById('locked-pass-row');
                if (pr) pr.style.display = (Keys.record && Keys.record.encrypted) ? '' : 'none';
                this.renderSwitcher();   // poder elegir qué identidad desbloquear
            }
        },

        renderIdentity: function() {
            var el = document.getElementById('main-npub');
            if (el && Keys.record) el.textContent = Keys.record.npub;
            var lk = document.getElementById('locked-npub');
            if (lk && Keys.record) lk.textContent = Keys.record.npub;
        },

        // Etiqueta amistosa de una identidad: alias manual > nombre del perfil (kind 0) >
        // npub abreviado. Se recorta para no romper el ancho del selector.
        idLabel: function(r) {
            var name = r && (r.label || r.profileName);
            if (name) return String(name).slice(0, 40);
            if (r && r.npub) return r.npub.slice(0, 10) + '…' + r.npub.slice(-4);
            return r ? shortKey(r.pubkeyHex) : '?';
        },

        // Selector de identidades. Lista las guardadas en IndexedDB y, al elegir otra, dispara
        // el cambio de identidad activa. Se pinta tanto en el panel principal como en la
        // pantalla de bloqueo (poder elegir qué identidad desbloquear sin pasar por la activa).
        renderSwitcher: async function() {
            var boxes = [document.getElementById('identity-switcher'), document.getElementById('locked-switcher')];
            if (!boxes[0] && !boxes[1]) return;
            var list = await KeyStore.list();
            var active = Keys.record ? Keys.record.id : KeyStore.getActiveId();
            var html = '';
            if (list.length) {
                html = '<select class="signer-id-select">';
                list.forEach(function(r) {
                    html += '<option value="' + escapeHtml(r.id) + '"' + (r.id === active ? ' selected' : '') + '>'
                          + escapeHtml(UI.idLabel(r)) + '</option>';
                });
                html += '</select>';
            }
            boxes.forEach(function(box) {
                if (!box) return;
                box.innerHTML = html;
                var sel = box.querySelector('.signer-id-select');
                if (sel) sel.onchange = function() { UI.switchIdentity(sel.value); };
            });
        },

        // Cambiar de identidad activa: baja limpiamente la actual (corta relays y olvida la
        // privkey en memoria) ANTES de cargar la nueva, para que ningún cliente reciba una
        // firma de la identidad equivocada. Si la nueva necesita contraseña, va a la pantalla
        // de bloqueo; si tiene clave de dispositivo, se desbloquea sola.
        switchIdentity: async function(id) {
            if (!id || (Keys.record && Keys.record.id === id)) { await this.renderSwitcher(); return; }
            var rec = await KeyStore.get(id);
            if (!rec) { await this.renderSwitcher(); return; }
            Keys.lock();                    // privkey = null + Bunker.suspend() (corta relays)
            Keys.privkey = null; Keys.pubkey = null;
            Keys.record = rec;
            KeyStore.setActiveId(id);
            if (rec.device && !rec.locked) {
                try {
                    var privHex = await deviceUnwrap(rec.device);
                    Keys.derivePub(privHex);
                    Keys.privkey = privHex;
                    Keys.pubkey = rec.pubkeyHex;
                    await this.enterMain();
                    return;
                } catch(e) {}  // si falla, caer al desbloqueo manual
            }
            this.show('locked');
            this.renderIdentity();
            var up = document.getElementById('unlock-pass'); if (up) up.focus();
        },

        // Renombrar la identidad activa (alias amistoso; no toca la clave).
        renameIdentity: async function() {
            if (!Keys.record) return;
            var name = await prompt(
                (typeof str_sgn_id_rename_prompt !== 'undefined') ? str_sgn_id_rename_prompt : 'Name for this identity:',
                Keys.record.label || ''
            );
            if (name === null || name === false) return;
            Keys.record.label = String(name).trim().slice(0, 40);
            if (!Keys.record.sessionOnly) await KeyStore.save(Keys.record);
            this.renderSwitcher();
        },

        renderRelays: function() {
            var el = document.getElementById('relay-status');
            if (!el) return;
            var urls = Object.keys(Pool.relays);
            if (!urls.length) { el.textContent = ''; return; }
            var ok = urls.filter(function(u) { return Pool.relays[u].status === 'connected'; }).length;
            var html = '<span class="sgn-i sgn-i-wifi"></span> ' + escapeHtml(fmt(str_sgn_relays_connected, ok, urls.length));
            // 0 relays conectados = el firmador está sordo: avisar en grande, no solo "0 de 3"
            if (!ok) html += '<div class="signer-noconn"><span class="sgn-i sgn-i-alert"></span> ' + escapeHtml(str_sgn_no_relays_warn) + '</div>';
            el.innerHTML = html;
        },

        renderClients: function() {
            var el = document.getElementById('clients-list');
            if (!el) return;
            var pks = Object.keys(Bunker.clients);
            if (!pks.length) { el.innerHTML = '<p class="signer-empty">' + escapeHtml(str_sgn_no_clients) + '</p>'; return; }
            var html = '';
            pks.forEach(function(pk) {
                var c = Bunker.clients[pk];
                var grants = Grants.of(pk);
                html += '<div class="signer-client">'
                    + '<div class="signer-client-head">'
                    + '<span class="signer-client-name">' + escapeHtml(c.name) + '</span>'
                    + '<span class="signer-client-pk">' + shortKey(pk) + '</span>'
                    + '<a class="signer-client-ren" data-pk="' + pk + '" title="' + escapeHtml(str_sgn_rename_prompt) + '"><span class="sgn-i sgn-i-edit"></span> ' + escapeHtml(str_sgn_rename) + '</a>'
                    + '<a class="signer-client-x" data-pk="' + pk + '">' + escapeHtml(str_sgn_disconnect) + '</a>'
                    + '</div>';
                if (grants.length) {
                    html += '<div class="signer-client-grants">' + escapeHtml(str_sgn_grants_label) + ' ';
                    grants.forEach(function(k) {
                        var label = /^\d+$/.test(k) ? 'kind ' + k : k;  // grants de método (nip44_encrypt...) van con su nombre
                        html += '<span class="signer-grant">' + escapeHtml(label) + ' <a data-pk="' + pk + '" data-kind="' + escapeHtml(k) + '" class="signer-grant-x">' + escapeHtml(str_sgn_grant_revoke) + '</a></span> ';
                    });
                    html += '</div>';
                }
                html += '</div>';
            });
            el.innerHTML = html;
            el.querySelectorAll('.signer-client-x').forEach(function(a) {
                a.onclick = function() { Bunker.stop(a.dataset.pk); };
            });
            // Renombrar (los clientes bunker:// llegan sin nombre: "bunker xxxx:xxxx")
            el.querySelectorAll('.signer-client-ren').forEach(function(a) {
                a.onclick = async function() {
                    var c = Bunker.clients[a.dataset.pk]; if (!c) return;
                    var name = await prompt(str_sgn_rename_prompt, c.name);
                    if (!name || !String(name).trim()) return;
                    c.name = String(name).trim().slice(0, 60);
                    Bunker._save();
                    UI.renderClients();
                };
            });
            el.querySelectorAll('.signer-grant-x').forEach(function(a) {
                a.onclick = function() { Grants.revoke(a.dataset.pk, a.dataset.kind); };
            });
        },

        renderBunkerUri: function() {
            var uri = Bunker.bunkerUri();
            var el = document.getElementById('bunker-uri');
            if (el) el.value = uri;
            // QR de la URI bunker:// (qrcode.min.js standalone, como en noxtr). Se repinta
            // entero porque el secret rota tras cada conexión.
            var qr = document.getElementById('bunker-qr');
            if (qr) {
                qr.innerHTML = '';
                if (uri && typeof QRCode !== 'undefined') {
                    new QRCode(qr, { text: uri, width: 180, height: 180,
                        colorDark: '#000000', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M });
                }
            }
        },

        // Estado + toggle del desbloqueo automático (clave de dispositivo)
        renderAutoUnlock: function() {
            var el = document.getElementById('autounlock-row');
            if (!el || !Keys.record) return;
            // Modo solo sesión (USB): no hay nada guardado, el toggle no aplica
            if (Keys.record.sessionOnly) {
                el.innerHTML = '<span class="sgn-i sgn-i-clock"></span> ' + escapeHtml(str_sgn_session_only);
                return;
            }
            var on = !!Keys.record.device;
            el.innerHTML = '<span class="sgn-i sgn-i-unlock"></span> ' + escapeHtml(on ? str_sgn_autounlock_on : str_sgn_autounlock_off)
                + ' — <a href="#" id="autounlock-toggle">' + escapeHtml(on ? str_sgn_disable : str_sgn_enable) + '</a>';
            document.getElementById('autounlock-toggle').onclick = async function(e) {
                e.preventDefault();
                if (on) {
                    // Sin contraseña no se puede desactivar: la clave quedaría inaccesible al recargar
                    if (!Keys.record.encrypted) { alert(str_sgn_autounlock_needpass); return; }
                    delete Keys.record.device;
                } else {
                    if (!Keys.privkey) return;
                    Keys.record.device = await deviceWrap(Keys.privkey);
                }
                await KeyStore.save(Keys.record);
                UI.renderAutoUnlock();
            };
        },

        renderActivity: function() {
            var el = document.getElementById('activity-list');
            if (!el) return;
            if (!Activity.list.length) { el.innerHTML = '<p class="signer-empty">' + escapeHtml(str_sgn_no_activity) + '</p>'; return; }
            var html = '';
            Activity.list.forEach(function(a) {
                var d = new Date(a.ts * 1000);
                var hh = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
                var cls = a.action === str_sgn_act_rejected ? 'act-rejected' : 'act-signed';
                html += '<div class="signer-act ' + cls + '"><span class="signer-act-time">' + d.toLocaleDateString() + ' ' + hh + '</span> '
                    + '<b>' + escapeHtml(a.app) + '</b> · ' + escapeHtml(a.detail) + ' · ' + escapeHtml(a.action) + '</div>';
            });
            el.innerHTML = html;
        },

        // Dialog de aprobación: Rechazar / [Firmar y recordar] / Firmar → 'no'|'remember'|'once'
        // opts opcional: { msg, once, remember } para reutilizarlo con cifrar/descifrar.
        askApproval: function(clientName, kindDesc, preview, allowRemember, opts) {
            var o = opts || {};
            return new Promise(function(resolve) {
                var done = false;
                var finish = function(v, overlay) {
                    if (done) return; done = true;
                    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
                    resolve(v);
                };
                var content = '<div class="signer-approve">'
                    + '<p>' + fmt(escapeHtml(o.msg || str_sgn_app_wants_sign), '<b>' + escapeHtml(clientName) + '</b>', escapeHtml(kindDesc)) + '</p>'
                    + (preview ? '<pre class="signer-preview">' + escapeHtml(preview) + '</pre>' : '')
                    + '</div>';
                var buttons = [
                    { text: str_sgn_reject, class: 'btn', action: function(_e, overlay) { finish('no', overlay); } }
                ];
                if (allowRemember) {
                    buttons.push({ text: o.remember || str_sgn_sign_remember, class: 'btn', action: function(_e, overlay) { finish('remember', overlay); } });
                }
                buttons.push({ text: o.once || str_sgn_sign_once, class: 'btn btn-primary', action: function(_e, overlay) { finish('once', overlay); } });
                $("body").dialog({
                    title: str_sgn_sign_request,
                    type: 'html',
                    width: '440px',
                    content: content,
                    onClose: function() { finish('no', null); },
                    buttons: buttons
                });
            });
        },

        wire: function() {
            var self = this;

            // --- entropía adicional opcional (solo afecta al CREAR clave nueva) ---
            // Ratón/touch/movimiento del dispositivo, pintando puntos de colores en un canvas
            // a pantalla completa (estilo bitaddress, como en timextamping y wallet).
            // Se mezcla por hash con el CSPRNG en Keys.generate().
            var Entropy = { buf: [], target: 1024, active: false };
            var entCanvas = document.getElementById('entropy-canvas');
            var entCtx = entCanvas ? entCanvas.getContext('2d') : null;
            function entShowCanvas() {
                if (!entCanvas) return;
                entCanvas.width = window.innerWidth;
                entCanvas.height = window.innerHeight;
                entCanvas.style.display = 'block';
            }
            function entHideCanvas() {
                if (!entCanvas) return;
                entCanvas.style.display = 'none';
                if (entCtx) entCtx.clearRect(0, 0, entCanvas.width, entCanvas.height);
            }
            function entDot(x, y) {
                if (!entCtx || entCanvas.style.display === 'none') return;
                var hue = (Entropy.buf.length * 360 / Entropy.target) % 360;  // arcoíris según progreso
                entCtx.fillStyle = 'hsl(' + hue + ', 70%, 55%)';
                entCtx.beginPath();
                entCtx.arc(x, y, 3, 0, Math.PI * 2);
                entCtx.fill();
            }
            // Mostrar la entropía "en vivo" (como en timextamping): 5 hashes SHA-256 salteados
            // del buffer concatenados (320 chars hex), recalculados con debounce de 150ms.
            var entDispTimer = null;
            function entUpdateDisplay() {
                var ta = document.getElementById('entropy-display');
                if (!ta || !Entropy.buf.length) return;
                var data = new Uint8Array(Entropy.buf);
                (async function() {
                    var out = '';
                    for (var i = 0; i < 5; i++) {
                        var salted = new Uint8Array(data.length + 1);
                        salted.set(data);
                        salted[data.length] = i;
                        out += bytesToHex(await sha256(salted));
                    }
                    ta.value = out;
                })();
            }
            function entCollect(x, y, drawX, drawY) {
                if (!Entropy.active || Entropy.buf.length >= Entropy.target) return;
                var t = performance.now();
                Entropy.buf.push(x & 0xff, y & 0xff, Math.floor(t) & 0xff, Math.floor(t * 1000) & 0xff);
                if (drawX !== undefined) entDot(drawX, drawY);
                var pct = Math.min(100, Math.floor(Entropy.buf.length * 100 / Entropy.target));
                var f = document.getElementById('entropy-fill'); if (f) f.style.width = pct + '%';
                var p = document.getElementById('entropy-pct'); if (p) p.textContent = pct + '%' + (pct >= 100 ? ' ✓' : '');
                if (!entDispTimer) entDispTimer = setTimeout(function() { entDispTimer = null; entUpdateDisplay(); }, 150);
                if (Entropy.buf.length >= Entropy.target) {
                    setTimeout(entHideCanvas, 1000);  // que se vea el 100%
                    if (Entropy.onComplete) { var cb = Entropy.onComplete; Entropy.onComplete = null; cb(); }
                }
            }
            function entMouse(e) { entCollect(e.clientX, e.clientY, e.clientX, e.clientY); }
            function entTouch(e) { var t0 = e.touches && e.touches[0]; if (t0) entCollect(t0.clientX, t0.clientY, t0.clientX, t0.clientY); }
            function entMotion(e) {
                var a = e.accelerationIncludingGravity;
                if (!a) return;
                // Mapear la aceleración a coordenadas: el "pincel" sigue la inclinación del móvil
                var cx = entCanvas ? entCanvas.width / 2 : 0, cy = entCanvas ? entCanvas.height / 2 : 0;
                var dx = Math.max(0, Math.min(cx * 2, cx - (a.x || 0) * 50));
                var dy = Math.max(0, Math.min(cy * 2, cy + (a.y || 0) * 50));
                entCollect(Math.floor((a.x || 0) * 100), Math.floor((a.y || 0) * 100), dx, dy);
            }
            var entArea = document.getElementById('entropy-area');
            var btnGen = document.getElementById('btn-setup-generate');

            function entStart() {
                Entropy.buf = [];
                Entropy.active = true;
                if (entArea) entArea.style.display = '';
                var ta = document.getElementById('entropy-display'); if (ta) ta.value = '';
                var f = document.getElementById('entropy-fill'); if (f) f.style.width = '0%';
                var p = document.getElementById('entropy-pct'); if (p) p.textContent = '0%';
                entShowCanvas();
                document.addEventListener('mousemove', entMouse);
                document.addEventListener('touchmove', entTouch);
                window.addEventListener('devicemotion', entMotion);
            }
            function entStop() {
                Entropy.active = false;
                Entropy.onComplete = null;
                document.removeEventListener('mousemove', entMouse);
                document.removeEventListener('touchmove', entTouch);
                window.removeEventListener('devicemotion', entMotion);
            }
            // Cancelar/limpiar del todo (tras guardar, o si se importa por otra vía a mitad)
            function entReset() {
                entStop();
                Entropy.buf = [];
                entHideCanvas();
                if (entArea) entArea.style.display = 'none';
                var ta = document.getElementById('entropy-display'); if (ta) ta.value = '';
                if (btnGen) btnGen.disabled = false;
            }

            // --- generar clave nueva: la entropía del usuario es OBLIGATORIA ---
            // Al pulsar empieza la recolección (puntos de colores); al llegar al 100%
            // se genera la clave (CSPRNG ‖ entropía) y se rellena el campo nsec.
            if (btnGen) btnGen.onclick = function() {
                if (Entropy.active) return;
                btnGen.disabled = true;
                entStart();
                Entropy.onComplete = async function() {
                    entStop();
                    btnGen.disabled = false;
                    try {
                        var privHex = await Keys.generate(new Uint8Array(Entropy.buf));
                        document.getElementById('setup-nsec').value = nsecEncode(privHex);
                        if (typeof notify !== 'undefined') notify(str_sgn_generated, 'success', 4000); else alert(str_sgn_generated);
                        focusNext();
                    } catch(e) { alert(fmt(str_sgn_derive_error, e.message)); }
                };
            };

            // --- mostrar/ocultar y copiar la nsec del campo ---
            var nsecInput = document.getElementById('setup-nsec');
            var btnEye = document.getElementById('btn-nsec-eye');
            if (btnEye && nsecInput) btnEye.onclick = function() {
                nsecInput.type = (nsecInput.type === 'password') ? 'text' : 'password';
                btnEye.innerHTML = '<span class="sgn-i ' + ((nsecInput.type === 'password') ? 'sgn-i-eye' : 'sgn-i-eye-off') + '"></span>';
            };
            var btnNsecCopy = document.getElementById('btn-nsec-copy');
            if (btnNsecCopy && nsecInput) btnNsecCopy.onclick = function() {
                if (!nsecInput.value) return;
                var done = function() { if (typeof notify !== 'undefined') notify(str_sgn_copied, 'success', 2000); };
                var fallback = function() {
                    var t = nsecInput.type;
                    nsecInput.type = 'text'; nsecInput.select();
                    document.execCommand('copy');
                    nsecInput.type = t; done();
                };
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(nsecInput.value).then(done, fallback);
                } else fallback();
            };

            // --- dónde guardar: navegador (IndexedDB) y/o archivo cifrado (USB); ninguna = solo sesión ---
            var addPass = document.getElementById('setup-addpass');
            var passWrap = document.getElementById('setup-pass-wrap');
            var rememberChk = document.getElementById('setup-remember');
            var storeBrowserChk = document.getElementById('setup-store-browser');
            var storeFileChk = document.getElementById('setup-store-file');
            function storeBrowser() { return storeBrowserChk ? storeBrowserChk.checked : true; }
            function storeFile()    { return storeFileChk ? storeFileChk.checked : false; }
            // La contraseña solo es estructuralmente obligatoria en navegador sin clave de
            // dispositivo (sin ninguna de las dos no habría con qué cifrar). En el archivo
            // es elegible: sin ella va en claro, con confirmación expresa al guardar.
            function passRequired() {
                var rm = rememberChk ? rememberChk.checked : true;
                return storeBrowser() && !rm;
            }
            function showPassWrap(show) {
                if (!passWrap) return;
                passWrap.style.display = show ? '' : 'none';
                if (addPass) addPass.checked = show;
                if (!show) {
                    // Al ocultar se vacía: que no se guarde una contraseña que el usuario ya no ve
                    document.getElementById('setup-pass').value = '';
                    document.getElementById('setup-pass2').value = '';
                }
            }
            // Tras generar/importar la clave: foco a la contraseña si está visible, si no al Guardar
            function focusNext() {
                var visible = passWrap && passWrap.style.display !== 'none';
                var el = visible ? document.getElementById('setup-pass') : document.getElementById('btn-setup-save');
                if (el) el.focus();
            }
            // Panel explicativo del modo elegido según la combinación de casillas
            function renderStoreInfo() {
                var info = document.getElementById('setup-store-info');
                if (!info) return;
                var label, text;
                if (storeBrowser() && storeFile())      { label = str_sgn_mode_both_t;    text = str_sgn_mode_both; }
                else if (storeFile())                   { label = str_sgn_mode_usb_t;     text = str_sgn_mode_usb; }
                else if (storeBrowser())                { label = str_sgn_mode_browser_t; text = str_sgn_mode_browser; }
                else                                    { label = str_sgn_mode_session_t; text = str_sgn_mode_session; }
                info.innerHTML = '<b>' + escapeHtml(label) + ':</b> ' + escapeHtml(text);
            }
            if (addPass) addPass.onchange = function() {
                // No se puede plegar si la contraseña es la única vía (o hay archivo de por medio)
                if (!addPass.checked && passRequired()) { addPass.checked = true; return; }
                showPassWrap(addPass.checked);
                if (addPass.checked) focusNext();
            };
            function syncStore() {
                // "Recordar en este dispositivo" solo tiene sentido guardando en navegador
                if (rememberChk) rememberChk.disabled = !storeBrowser();
                if (passRequired()) showPassWrap(true);
                renderStoreInfo();
            }
            if (rememberChk) rememberChk.onchange = syncStore;
            if (storeBrowserChk) storeBrowserChk.onchange = syncStore;
            if (storeFileChk) storeFileChk.onchange = function() {
                // Marcar archivo despliega la contraseña como sugerencia (plegable: en claro es legal)
                if (storeFileChk.checked) { showPassWrap(true); focusNext(); }
                syncStore();
            };
            renderStoreInfo();

            // --- setup: crear o importar ---
            var btnSave = document.getElementById('btn-setup-save');
            if (btnSave) btnSave.onclick = async function() {
                var nsecIn = document.getElementById('setup-nsec').value.trim();
                if (!nsecIn) { alert(str_sgn_nsec_empty); return; }
                var p1 = document.getElementById('setup-pass').value;
                var p2 = document.getElementById('setup-pass2').value;
                var toBrowser = storeBrowser();
                var toFile = storeFile();
                var remember = toBrowser && (rememberChk ? rememberChk.checked : true);
                // Archivo sin contraseña = nsec en claro: se puede, pero con consentimiento expreso
                if (toFile && !p1) {
                    var okPlain = await confirm('⚠️ ' + str_sgn_file_plain_confirm);
                    if (!okPlain) return;
                }
                // En navegador hace falta al menos una vía: contraseña o clave de dispositivo
                if (toBrowser && !p1 && !remember) { alert(str_sgn_need_pass_or_remember); return; }
                if (p1 && p1 !== p2) { alert(str_sgn_pass_mismatch); return; }
                // Sin destino: modo solo sesión (la nsec vive en esta pestaña y muere con ella)
                if (!toBrowser && !toFile) {
                    var okSession = await confirm('⚠️ ' + str_sgn_session_only_confirm);
                    if (!okSession) return;
                }
                var privHex;
                try {
                    privHex = (nsecIn.indexOf('nsec1') === 0) ? nsecDecode(nsecIn) : (/^[0-9a-f]{64}$/i.test(nsecIn) ? nsecIn.toLowerCase() : null);
                    if (!privHex) throw new Error('bad nsec');
                    Keys.derivePub(privHex); // valida
                } catch(e) { alert(str_sgn_invalid_nsec); return; }

                var pubHex = Keys.derivePub(privHex);
                var record = {
                    pubkeyHex: pubHex,
                    npub: npubEncode(pubHex),
                    createdAt: new Date().toISOString(),
                    locked: false
                };
                if (p1) record.encrypted = await encryptPrivkey(privHex, p1);
                if (remember) record.device = await deviceWrap(privHex);
                if (toBrowser) await KeyStore.save(record);
                else record.sessionOnly = true;  // nada en IndexedDB: vive solo en memoria
                // Si ya había una identidad activa (estamos AÑADIENDO otra), bájala antes de
                // tomar la nueva: corta sus relays y olvida su privkey en memoria.
                if (Keys.privkey) Bunker.suspend();
                Keys.record = record;
                Keys.privkey = privHex;
                Keys.pubkey = pubHex;
                KeyStore.setActiveId(pubHex);
                var cancelBtn = document.getElementById('btn-setup-cancel');
                if (cancelBtn) cancelBtn.style.display = 'none';
                if (toFile) await downloadBackupFile(privHex, record.npub, p1);
                document.getElementById('setup-nsec').value = '';
                document.getElementById('setup-pass').value = '';
                document.getElementById('setup-pass2').value = '';
                entReset();
                if (typeof notify !== 'undefined') notify(str_sgn_saved, 'success', 2500); else alert(str_sgn_saved);
                self.enterMain();
            };

            // --- importar desde backup JSON (rellena el campo nsec) ---
            // Cualquier JSON con una nsec dentro (no hay formato estándar entre clientes);
            // si es el backup cifrado de noxtr ({encrypted:true,...}), pide su contraseña.
            var backupFile = document.getElementById('setup-backup-file');
            var btnBackup = document.getElementById('btn-setup-backup');
            if (btnBackup && backupFile) {
                btnBackup.onclick = function() { backupFile.click(); };
                backupFile.onchange = async function() {
                    var file = this.files[0]; if (!file) return;
                    this.value = '';
                    var wrapper, data;
                    try { wrapper = JSON.parse(await file.text()); } catch(e) { alert(fmt(str_sgn_backup_bad, e.message)); return; }
                    try {
                        if (wrapper.encrypted && wrapper.salt && wrapper.iv && wrapper.data) {
                            var pwd = await prompt(str_sgn_backup_pass);
                            if (!pwd) return;
                            data = await decryptBackupWrapper(wrapper, pwd);
                        } else {
                            data = wrapper;
                        }
                    } catch(e) { alert(str_sgn_backup_wrong_pass); return; }
                    var found = findNsecDeep(data, '');
                    if (!found) { alert(str_sgn_backup_no_nsec); return; }
                    entReset();  // cancela una recolección en marcha: se importa, no se genera
                    document.getElementById('setup-nsec').value = found;
                    if (typeof notify !== 'undefined') notify(str_sgn_nsec_loaded, 'success', 4000); else alert(str_sgn_nsec_loaded);
                    focusNext();
                };
            }

            // --- importar nsec o 12/24 palabras desde un QR ---
            var _setupQrScanner = null;
            function stopSetupScanner() {
                if (_setupQrScanner) {
                    _setupQrScanner.stop().catch(function() {}).finally(function() { _setupQrScanner = null; });
                }
                var box = document.getElementById('setup-qr-scanner');
                if (box) box.style.display = 'none';
            }
            var btnSetupScan = document.getElementById('btn-setup-scan');
            if (btnSetupScan) btnSetupScan.onclick = function() {
                var box = document.getElementById('setup-qr-scanner');
                var st = document.getElementById('setup-scan-status');
                if (!box) return;
                stopSetupScanner();
                box.style.display = '';
                if (typeof Html5Qrcode === 'undefined') { if (st) st.textContent = str_sgn_qr_lib; return; }
                if (st) st.textContent = str_sgn_scan_point;
                _setupQrScanner = new Html5Qrcode('setup-scan-video');
                _setupQrScanner.start(
                    { facingMode: 'environment' },
                    { fps: 10, qrbox: { width: 200, height: 200 } },
                    async function(decodedText) {
                        stopSetupScanner();
                        try {
                            var nsec = await nsecFromImportText(decodedText);
                            entReset();
                            document.getElementById('setup-nsec').value = nsec;
                            if (typeof notify !== 'undefined') notify(str_sgn_nsec_loaded, 'success', 4000); else alert(str_sgn_nsec_loaded);
                            focusNext();
                        } catch(e) {
                            alert(e.message || str_sgn_scan_key_bad);
                        }
                    },
                    function() {}
                ).catch(function() { if (st) st.textContent = str_sgn_scan_failed; });
            };
            var btnSetupScanStop = document.getElementById('btn-setup-scan-stop');
            if (btnSetupScanStop) btnSetupScanStop.onclick = stopSetupScanner;

            // --- importar 12/24 palabras (BIP39) ---
            // Ruta estándar Nostr (NIP-06): m/44'/1237'/0'/0/0. Mostro Mobile usa account 38383'
            // (clave distinta con las mismas palabras), por eso el selector.
            var btnWords = document.getElementById('btn-setup-words');
            if (btnWords) btnWords.onclick = function() {
                var content = '<div class="signer-words">'
                    + '<label>' + escapeHtml(str_sgn_words_prompt) + '</label>'
                    + '<textarea id="words-input" rows="3" autocomplete="off" spellcheck="false"></textarea>'
                    + '<label>' + escapeHtml(str_sgn_words_path) + '</label>'
                    + '<select id="words-path">'
                    + '<option value="m/44\'/1237\'/0\'/0/0">' + escapeHtml(str_sgn_words_path_std) + ' — m/44\'/1237\'/0\'/0/0</option>'
                    + '<option value="m/44\'/1237\'/38383\'/0/0">Mostro Mobile — m/44\'/1237\'/38383\'/0/0</option>'
                    + '</select>'
                    + '</div>';
                $("body").dialog({
                    title: str_sgn_words_title,
                    type: 'html',
                    width: '440px',
                    content: content,
                    buttons: [
                        { text: str_sgn_cancel, class: 'btn', action: function(_e, overlay) {
                            if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
                        } },
                        { text: str_sgn_import, class: 'btn btn-primary', action: async function(_e, overlay) {
                            var parts = String(document.getElementById('words-input').value).trim().toLowerCase().split(/\s+/);
                            if (parts.length !== 12 && parts.length !== 24) { alert(fmt(str_sgn_need_12_words, parts.length)); return; }
                            // Checksum BIP39 (lib bip39 de _lib_/bitcoin): una palabra mal tecleada
                            // deriva una clave válida pero EQUIVOCADA. Se puede forzar (mnemónicos
                            // no estándar existen), pero avisados.
                            if (window.bip39 && !window.bip39.validateMnemonic(parts.join(' '))) {
                                var goOn = await confirm(str_sgn_words_bad_checksum);
                                if (!goOn) return;
                            }
                            var path = document.getElementById('words-path').value;
                            try {
                                var seed = await bip39Seed(parts.join(' '));
                                var privHex = await bip32DerivePath(seed, path);
                                Keys.derivePub(privHex); // valida
                                entReset();  // cancela una recolección en marcha: se importa, no se genera
                                document.getElementById('setup-nsec').value = nsecEncode(privHex);
                                if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
                                if (typeof notify !== 'undefined') notify(str_sgn_nsec_loaded, 'success', 4000); else alert(str_sgn_nsec_loaded);
                                focusNext();
                            } catch(e) { alert(fmt(str_sgn_derive_error, e.message)); }
                        } }
                    ]
                });
            };

            // --- unlock (contraseña si la hay; si no, con la clave de dispositivo) ---
            var btnUnlock = document.getElementById('btn-unlock');
            var unlockGo = async function() {
                var rec = Keys.record;
                if (!rec) return;
                var privHex;
                if (rec.encrypted) {
                    var pass = document.getElementById('unlock-pass').value;
                    if (!pass) return;
                    try {
                        privHex = await decryptPrivkey(rec.encrypted, pass);
                        Keys.derivePub(privHex);
                    } catch(e) { alert(str_sgn_wrong_pass); return; }
                    rec.locked = false;
                    await KeyStore.save(rec);
                } else if (rec.device) {
                    try {
                        privHex = await deviceUnwrap(rec.device);
                        Keys.derivePub(privHex);
                    } catch(e) { alert(str_sgn_wrong_pass); return; }
                } else return;
                Keys.privkey = privHex;
                Keys.pubkey = rec.pubkeyHex;
                document.getElementById('unlock-pass').value = '';
                self.enterMain();
            };
            if (btnUnlock) btnUnlock.onclick = unlockGo;
            var unlockPass = document.getElementById('unlock-pass');
            if (unlockPass) unlockPass.onkeydown = function(e) { if (e.key === 'Enter') unlockGo(); };

            // --- lock (con contraseña, persiste: el auto-desbloqueo no salta hasta volver a ponerla) ---
            var btnLock = document.getElementById('btn-lock');
            if (btnLock) btnLock.onclick = async function() {
                // Modo solo sesión: no hay nada guardado que desbloquear después —
                // bloquear = olvidar (la nsec se re-carga del archivo del USB al volver).
                // Si hay otras identidades guardadas, se salta a una; si no, al alta.
                if (Keys.record && Keys.record.sessionOnly) {
                    Keys.lock();
                    Keys.record = null; Keys.pubkey = null; Keys.privkey = null;
                    KeyStore.setActiveId(null);
                    var rest = await KeyStore.list();
                    if (rest.length) await self.switchIdentity(rest[0].id);
                    else self.show('setup');
                    return;
                }
                Keys.lock();
                if (Keys.record && Keys.record.encrypted) {
                    Keys.record.locked = true;
                    await KeyStore.save(Keys.record);
                }
                self.show('locked');
                self.renderIdentity();
            };

            // --- mostrar nsec: si hay contraseña, se re-pide; si no, solo confirmación ---
            var btnShowNsec = document.getElementById('btn-show-nsec');
            if (btnShowNsec) btnShowNsec.onclick = async function() {
                if (!Keys.privkey) return;
                if (Keys.record && Keys.record.encrypted) {
                    var pwd = await prompt(str_sgn_pass_to_show);
                    if (!pwd) return;
                    try { await decryptPrivkey(Keys.record.encrypted, pwd); } catch(e) { alert(str_sgn_wrong_pass); return; }
                } else {
                    var okShow = await confirm('⚠️ ' + str_sgn_show_nsec_warn);
                    if (!okShow) return;
                }
                var nsec = nsecEncode(Keys.privkey);
                var content = '<div class="signer-nsec-dialog">'
                    + '<p><span class="sgn-i sgn-i-alert"></span> ' + escapeHtml(str_sgn_show_nsec_warn) + '</p>'
                    + '<input type="text" id="nsec-reveal" readonly value="' + escapeHtml(nsec) + '">'
                    + '</div>';
                // sin onclick inline: la CSP (script-src con nonce) bloquea los handlers en atributos
                setTimeout(function() {
                    var inp = document.getElementById('nsec-reveal');
                    if (inp) inp.addEventListener('click', function() { this.select(); });
                }, 0);
                $("body").dialog({
                    title: str_sgn_show_nsec_title,
                    type: 'html',
                    width: '440px',
                    content: content,
                    buttons: [
                        { text: str_sgn_copy, class: 'btn', action: function() {
                            if (navigator.clipboard && navigator.clipboard.writeText) {
                                navigator.clipboard.writeText(nsec).then(function() { if (typeof notify !== 'undefined') notify(str_sgn_copied, 'success', 2000); });
                            } else {
                                var inp = document.getElementById('nsec-reveal');
                                if (inp) { inp.select(); document.execCommand('copy'); if (typeof notify !== 'undefined') notify(str_sgn_copied, 'success', 2000); }
                            }
                        } },
                        { text: str_sgn_close, class: 'btn btn-primary', action: function(_e, overlay) {
                            if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
                        } }
                    ]
                });
            };

            // --- exportar backup cifrado (mismo wrapper {encrypted:true, salt, iv, data} que el
            // Exportar de noxtr; dentro va {"nsec": ...}, así que cualquiera de los dos lo re-importa) ---
            var btnExport = document.getElementById('btn-export-backup');
            if (btnExport) btnExport.onclick = function() {
                if (!Keys.privkey) return;
                var content = '<div class="signer-words">'
                    + '<p class="signer-hint">' + escapeHtml(str_sgn_export_hint) + '</p>'
                    + '<label>' + escapeHtml(str_sgn_backup_pass) + '</label>'
                    + '<input type="password" id="export-pass" autocomplete="new-password">'
                    + '<label>' + escapeHtml(str_sgn_pass_repeat) + '</label>'
                    + '<input type="password" id="export-pass2" autocomplete="new-password">'
                    + '</div>';
                $("body").dialog({
                    title: str_sgn_export_title,
                    type: 'html',
                    width: '440px',
                    content: content,
                    buttons: [
                        { text: str_sgn_cancel, class: 'btn', action: function(_e, overlay) {
                            if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
                        } },
                        { text: str_sgn_export_go, class: 'btn btn-primary', action: async function(_e, overlay) {
                            var p1 = document.getElementById('export-pass').value;
                            var p2 = document.getElementById('export-pass2').value;
                            if (!p1) { alert(str_sgn_export_need_pass); return; }
                            if (p1 !== p2) { alert(str_sgn_pass_mismatch); return; }
                            await downloadBackupFile(Keys.privkey, Keys.record ? Keys.record.npub : '', p1);
                            if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
                        } }
                    ]
                });
            };

            // --- olvidar (eliminar) la identidad activa ---
            // Borra solo la identidad activa y sus datos (clientes, actividad). Si quedan más,
            // activa la primera; si no queda ninguna, vuelve al alta.
            var forget = async function(e) {
                if (e && e.preventDefault) e.preventDefault();
                var ok = await confirm('⚠️ ' + str_sgn_forget_confirm);
                if (!ok) return;
                var goneId = Keys.record ? Keys.record.id : KeyStore.getActiveId();
                Keys.lock();
                Keys.record = null; Keys.privkey = null; Keys.pubkey = null;
                if (goneId) {
                    await KeyStore.delete(goneId);
                    try { localStorage.removeItem('signer_clients:' + goneId); } catch(e) {}
                    try { localStorage.removeItem('signer_activity:' + goneId); } catch(e) {}
                }
                var rest = await KeyStore.list();
                if (rest.length) {
                    await self.switchIdentity(rest[0].id);   // activar otra identidad
                } else {
                    KeyStore.setActiveId(null);
                    var cancel = document.getElementById('btn-setup-cancel');
                    if (cancel) cancel.style.display = 'none';
                    self.show('setup');
                }
            };
            var f1 = document.getElementById('btn-forget-locked');
            var f2 = document.getElementById('btn-forget-main');
            if (f1) f1.onclick = forget;
            if (f2) f2.onclick = forget;

            // --- añadir otra identidad: reutiliza la pantalla de alta sin tocar la activa ---
            var btnAddId = document.getElementById('btn-add-identity');
            if (btnAddId) btnAddId.onclick = function() {
                Bunker.suspend();   // para la activa mientras se da de alta otra (se reanuda al volver)
                document.getElementById('setup-nsec').value = '';
                document.getElementById('setup-pass').value = '';
                document.getElementById('setup-pass2').value = '';
                entReset();
                var cancel = document.getElementById('btn-setup-cancel');
                if (cancel) cancel.style.display = '';   // hay activa → permitir volver
                self.show('setup');
            };

            // --- volver desde el alta sin crear nada (solo si hay una identidad activa) ---
            var btnSetupCancel = document.getElementById('btn-setup-cancel');
            if (btnSetupCancel) btnSetupCancel.onclick = function(e) {
                if (e && e.preventDefault) e.preventDefault();
                if (Keys.privkey) self.enterMain();              // reanuda la identidad activa
                else if (Keys.record) { self.show('locked'); self.renderIdentity(); }
            };

            // --- renombrar la identidad activa ---
            var btnRenameId = document.getElementById('btn-rename-identity');
            if (btnRenameId) btnRenameId.onclick = function() { self.renameIdentity(); };

            // --- pairing ---
            var btnPair = document.getElementById('btn-pair');
            if (btnPair) btnPair.onclick = async function() {
                var uri = document.getElementById('pair-uri').value.trim();
                if (!uri) return;
                btnPair.disabled = true;
                try {
                    var name = await Bunker.accept(uri);
                    document.getElementById('pair-uri').value = '';
                    if (typeof notify !== 'undefined') notify(fmt(str_sgn_pair_connected, escapeHtml(name)), 'success', 4000);
                    else alert(fmt(str_sgn_pair_connected, name));
                } catch(e) {
                    alert(fmt(str_sgn_pair_error, e.message));
                } finally {
                    btnPair.disabled = false;
                }
            };

            // --- escanear QR nostrconnect:// con la cámara (Html5Qrcode sobre jsQR, como noxtr) ---
            var _qrScanner = null;
            function stopScanner() {
                if (_qrScanner) {
                    _qrScanner.stop().catch(function() {}).finally(function() { _qrScanner = null; });
                }
                var box = document.getElementById('pair-qr-scanner');
                if (box) box.style.display = 'none';
            }
            var btnScan = document.getElementById('btn-pair-scan');
            if (btnScan) btnScan.onclick = function() {
                var box = document.getElementById('pair-qr-scanner');
                var st = document.getElementById('pair-scan-status');
                if (!box) return;
                box.style.display = '';
                if (typeof Html5Qrcode === 'undefined') { if (st) st.textContent = str_sgn_qr_lib; return; }
                if (st) st.textContent = str_sgn_scan_point;
                _qrScanner = new Html5Qrcode('pair-scan-video');
                _qrScanner.start(
                    { facingMode: 'environment' },
                    { fps: 10, qrbox: { width: 200, height: 200 } },
                    function(decodedText) {
                        var input = document.getElementById('pair-uri');
                        if (input) input.value = decodedText;
                        stopScanner();
                        if (btnPair) btnPair.click();
                    },
                    function() {}  // error de frame — ignorar
                ).catch(function() { if (st) st.textContent = str_sgn_scan_failed; });
            };
            var btnScanStop = document.getElementById('btn-pair-scan-stop');
            if (btnScanStop) btnScanStop.onclick = stopScanner;

            // --- pestañas de "Conectar una app": Escanear QR (por defecto) / Pegar nostrconnect /
            // Copiar bunker. Cada una muestra su panel; al salir de Escanear se suelta la cámara. ---
            var connectTabs = document.querySelectorAll('.signer-tab');
            var connectPanels = document.querySelectorAll('.signer-tab-panel');
            function showConnectTab(name) {
                for (var i = 0; i < connectTabs.length; i++)
                    connectTabs[i].classList.toggle('active', connectTabs[i].getAttribute('data-tab') === name);
                for (var j = 0; j < connectPanels.length; j++)
                    connectPanels[j].hidden = (connectPanels[j].getAttribute('data-panel') !== name);
                if (name !== 'scan') stopScanner();   // soltar la cámara al salir de Escanear
            }
            for (var ti = 0; ti < connectTabs.length; ti++) {
                (function(tab) {
                    tab.onclick = function(e) { if (e && e.preventDefault) e.preventDefault(); showConnectTab(tab.getAttribute('data-tab')); };
                })(connectTabs[ti]);
            }

            // --- copiar URI bunker:// ---
            var btnCopyBunker = document.getElementById('btn-copy-bunker');
            if (btnCopyBunker) btnCopyBunker.onclick = function() {
                var el = document.getElementById('bunker-uri');
                if (!el || !el.value) return;
                var done = function() { if (typeof notify !== 'undefined') notify(str_sgn_copied, 'success', 2000); };
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(el.value).then(done, function() { el.select(); document.execCommand('copy'); done(); });
                } else {
                    el.select(); document.execCommand('copy'); done();
                }
            };

            // --- banner de apoyo: dialog con QR de la dirección lightning (SIGNER_TIP_LN en relays.js) ---
            var btnDonate = document.getElementById('btn-donate');
            if (btnDonate) btnDonate.onclick = function() {
                var ln = (typeof SIGNER_TIP_LN !== 'undefined' && SIGNER_TIP_LN) ? String(SIGNER_TIP_LN) : '';
                if (!ln || ln.indexOf('example') !== -1) return;  // placeholder sin configurar

                // i18n con fallback: otros idiomas caen a inglés hasta traducir las cadenas nuevas.
                var T = {
                    scan:   str_sgn_tip_scan,
                    choose: (typeof str_sgn_tip_choose     !== 'undefined') ? str_sgn_tip_choose     : 'Choose how much to contribute:',
                    gen:    (typeof str_sgn_tip_generating  !== 'undefined') ? str_sgn_tip_generating  : 'Generating invoice…',
                    payinv: (typeof str_sgn_tip_payinv      !== 'undefined') ? str_sgn_tip_payinv      : 'Scan to pay the invoice:',
                    failed: (typeof str_sgn_tip_failed      !== 'undefined') ? str_sgn_tip_failed      : 'Could not generate the invoice. Scan the QR or copy the address:'
                };

                // Solo una lightning address (user@dominio) permite LNURL-pay con importe;
                // si es un LNURL crudo u otra cosa, se mantiene el QR de la dirección de siempre.
                var isLnAddr = ln.indexOf('@') !== -1;
                var copyText = ln;   // lo que copia el botón "Copiar"; pasa a ser la factura tras generarla

                var presets = [100, 500, 1000, 5000, 21000];
                function label(s) { return (s >= 1000 ? (s / 1000) + 'K' : String(s)) + ' sats'; }

                var chips = '';
                for (var i = 0; isLnAddr && i < presets.length; i++) {
                    chips += '<button type="button" class="signer-donate-chip" data-sats="' + presets[i] + '">' + label(presets[i]) + '</button>';
                }

                var content = '<div class="signer-donate-dialog">'
                    + (isLnAddr
                        ? '<p class="signer-hint" id="donate-prompt">' + escapeHtml(T.choose) + '</p>'
                          + '<div class="signer-donate-amounts">' + chips + '</div>'
                          + '<div class="signer-donate-custom">'
                          +     '<input type="number" id="donate-custom" min="1" step="1" placeholder="sats">'
                          +     '<button type="button" class="btn" id="donate-custom-btn"><span class="sgn-i sgn-i-zap"></span></button>'
                          + '</div>'
                        : '<p class="signer-hint" id="donate-prompt">' + escapeHtml(T.scan) + '</p>')
                    + '<div id="donate-qr" class="signer-bunker-qr"' + (isLnAddr ? ' style="display:none"' : '') + '></div>'
                    + '<div class="signer-bunker-row" id="donate-inv-row"' + (isLnAddr ? ' style="display:none"' : '') + '>'
                    +     '<input type="text" id="donate-ln" readonly value="' + escapeHtml(ln) + '">'
                    + '</div>'
                    + '</div>';

                function renderQR(text) {
                    var qr = document.getElementById('donate-qr');
                    if (!qr) return;
                    qr.innerHTML = '';
                    if (typeof QRCode !== 'undefined') {
                        new QRCode(qr, { text: text, width: 180, height: 180,
                            colorDark: '#000000', colorLight: '#ffffff', correctLevel: QRCode.CorrectLevel.M });
                    }
                    qr.style.display = '';
                }

                // LNURL-pay (cliente, sin backend): dirección lightning -> factura bolt11 del importe elegido.
                async function lnInvoice(addr, sats) {
                    var parts = addr.split('@');
                    if (parts.length !== 2) throw new Error('addr');
                    var meta = await (await fetch('https://' + parts[1] + '/.well-known/lnurlp/' + encodeURIComponent(parts[0]))).json();
                    if (!meta.callback) throw new Error('lnurl');
                    var msat = sats * 1000;
                    if (meta.minSendable && msat < meta.minSendable) msat = meta.minSendable;
                    if (meta.maxSendable && msat > meta.maxSendable) throw new Error('max');
                    var sep = meta.callback.indexOf('?') === -1 ? '?' : '&';
                    var inv = await (await fetch(meta.callback + sep + 'amount=' + msat)).json();
                    if (!inv.pr) throw new Error(inv.reason || 'invoice');
                    return inv.pr;
                }

                async function chooseAmount(sats) {
                    if (!sats || sats < 1) return;
                    var prompt  = document.getElementById('donate-prompt');
                    var amounts = document.querySelector('.signer-donate-amounts');
                    var custom  = document.querySelector('.signer-donate-custom');
                    if (prompt)  prompt.textContent = T.gen;
                    if (amounts) amounts.style.display = 'none';
                    if (custom)  custom.style.display = 'none';
                    try {
                        var pr = await lnInvoice(ln, sats);
                        copyText = pr;
                        var input = document.getElementById('donate-ln');
                        if (input) input.value = pr;
                        document.getElementById('donate-inv-row').style.display = '';
                        renderQR('lightning:' + pr);
                        if (prompt) prompt.textContent = T.payinv;
                    } catch (e) {
                        // Fallback: QR de la dirección (comportamiento anterior), la donación sigue siendo posible.
                        copyText = ln;
                        document.getElementById('donate-inv-row').style.display = '';
                        renderQR('lightning:' + ln);
                        if (prompt) prompt.textContent = T.failed;
                    }
                }

                setTimeout(function() {
                    if (!isLnAddr) renderQR('lightning:' + ln);
                    var chipEls = document.querySelectorAll('.signer-donate-chip');
                    for (var i = 0; i < chipEls.length; i++) {
                        (function(b) { b.onclick = function() { chooseAmount(parseInt(b.getAttribute('data-sats'), 10)); }; })(chipEls[i]);
                    }
                    var cBtn = document.getElementById('donate-custom-btn');
                    var cInp = document.getElementById('donate-custom');
                    if (cBtn && cInp) {
                        cBtn.onclick = function() { chooseAmount(parseInt(cInp.value, 10)); };
                        cInp.onkeydown = function(e) { if (e.key === 'Enter') { e.preventDefault(); cBtn.onclick(); } };
                    }
                    var inp = document.getElementById('donate-ln');
                    if (inp) inp.addEventListener('click', function() { this.select(); });
                }, 0);

                $("body").dialog({
                    title: str_sgn_tip_title,
                    type: 'html',
                    width: '440px',
                    content: content,
                    buttons: [
                        { text: str_sgn_copy, class: 'btn', action: function() {
                            if (navigator.clipboard && navigator.clipboard.writeText) {
                                navigator.clipboard.writeText(copyText).then(function() { if (typeof notify !== 'undefined') notify(str_sgn_copied, 'success', 2000); });
                            } else {
                                var inp = document.getElementById('donate-ln');
                                if (inp) { inp.select(); document.execCommand('copy'); if (typeof notify !== 'undefined') notify(str_sgn_copied, 'success', 2000); }
                            }
                        } },
                        { text: str_sgn_close, class: 'btn btn-primary', action: function(_e, overlay) {
                            if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
                        } }
                    ]
                });
            };

            Pool.onStatusChange = function() { self.renderRelays(); };
        },

        enterMain: async function() {
            this.show('main');
            Activity.load();          // actividad de la identidad activa (clave por-pubkey)
            this.renderIdentity();
            this.renderSwitcher();
            this.renderAutoUnlock();
            this.renderClients();
            this.renderActivity();
            this.renderRelays();
            await Bunker.restore();   // reconectar clientes emparejados previamente
            Bunker.listen();          // escuchar en los relays propios para pairing bunker://
            this.renderBunkerUri();
            this.renderClients();
            fetchActiveProfile();     // nombre del perfil (kind 0) → etiqueta del selector
        }
    };

    // ==================== INIT ====================

    async function init() {
        UI.wire();
        await KeyStore.migrate();   // esquema antiguo (id 'main') → indexado por pubkey
        var list = await KeyStore.list();
        if (!list.length) {
            UI.show('setup');
            return;
        }
        // Resolver la identidad activa: el puntero guardado, validado contra lo que hay.
        var activeId = KeyStore.getActiveId();
        var rec = activeId ? list.filter(function(r) { return r.id === activeId; })[0] : null;
        if (!rec) { rec = list[0]; KeyStore.setActiveId(rec.id); }
        Keys.record = rec;
        // Desbloqueo automático con la clave de dispositivo (salvo bloqueo manual)
        if (rec.device && !rec.locked) {
            try {
                var privHex = await deviceUnwrap(rec.device);
                Keys.derivePub(privHex);
                Keys.privkey = privHex;
                Keys.pubkey = rec.pubkeyHex;
                UI.enterMain();
                return;
            } catch(e) {}  // si falla, caer al desbloqueo manual
        }
        UI.show('locked');
        UI.renderIdentity();
        var up = document.getElementById('unlock-pass');
        if (up) up.focus();
    }

    window.Signer = { init: init };

})();
