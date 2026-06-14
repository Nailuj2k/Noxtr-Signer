# Noxtr Signer

Repo: https://github.com/Nailuj2k/Noxtr-Signer

NIP-46 signer (bunker). Plain web — no Node, no build. Works served by any web
server **or opened with a double-click** (`file://`), so every script is classic
(no ES modules, no `fetch()` of local assets).

## English

**Layout:** `index.html` (single page, CSP in meta, i18n via `data-i18n`) ·
`_css_/`, `_i18n_/` (es/en), `_js_/` (wquery, script.js, signer.js) ·
`_lib_/` (self-hosted noble, buffer, bip39, qrcode, jsqr — no CDNs) · `_images_/`.

**Where the nsec lives** (user picks at setup, two independent checkboxes;
`renderStoreInfo` in `_js_/signer.js`): *Browser* (IndexedDB, with auto-unlock /
password) · *Downloaded file* (USB portability, re-enter via "Load JSON backup";
with password = AES-GCM + PBKDF2 wrapper, without = nsec in PLAINTEXT, explicit
confirm, file named `signer-nsec-PLAIN-...json`) · *Both* · *Neither* =
session-only (in memory while the tab is open, "Lock" forgets it; for shared
machines).

**Recommended — install it on mobile (as an app):** open `signer.noxtr.net` on
your phone and use **"Add to Home Screen"**. It runs full-screen like a native
app, always within reach, and with *Browser* + *Remember on this device* the
identity is ready the moment you open it. For most people this is handier than
carrying the nsec on a USB stick.

**Relays:** `relays.js` (root) sets `SIGNER_RELAYS`, user-editable (`wss://` only;
falls back to defaults if missing/invalid). These are the bunker's own relays;
app relays arrive in their URI.

**Integration:** any Nostr Connect client works. Pairing either way —
client-started `nostrconnect://...` pasted/scanned into "Connect an app", or
signer-started `bunker://...` (one-time secret) copied to the client. After
`connect`, kind 24133 requests (NIP-44 encrypted) flow over the relay. Methods:
`connect`, `ping`, `get_public_key`, `get_relays`, `sign_event`,
`nip44_encrypt/decrypt`, `nip04_encrypt/decrypt`. Requires the signer tab open
and unlocked.

**Copy verification:** the page runs fully downloaded. To distribute with a
guarantee, publish `shasum -a 256` of the tree on https://noxtr.net for users to
check locally.

### CSP (read before touching the inline scripts!)

The CSP rides in a `<meta>` inside `index.html` (applies downloaded too). The two
`sha256-...` in `script-src` authorize EXACTLY the two inline scripts. If you edit
either, recompute its hash (exact content between `<script>` and `</script>`,
spaces included):

```sh
perl -0777 -ne 'while (/<script>(.*?)<\/script>/gs) { open(F,">","/tmp/i".(++$i).".js"); print F $1 }' index.html
for f in /tmp/i1.js /tmp/i2.js; do echo "sha256-$(openssl dgst -sha256 -binary $f | base64)"; done
```

## Español

**Estructura:** `index.html` (página única, CSP en meta, i18n vía `data-i18n`) ·
`_css_/`, `_i18n_/` (es/en), `_js_/` (wquery, script.js, signer.js) ·
`_lib_/` (noble, buffer, bip39, qrcode, jsqr self-hosted — sin CDNs) · `_images_/`.

**Dónde se guarda la nsec** (lo elige el usuario en el setup, dos casillas
independientes; `renderStoreInfo` en `_js_/signer.js`): *Navegador* (IndexedDB,
con desbloqueo automático / contraseña) · *Archivo descargado* (portable en USB,
re-entrar con "Cargar backup JSON"; con contraseña = wrapper AES-GCM + PBKDF2,
sin contraseña = nsec EN CLARO, confirmación expresa, archivo
`signer-nsec-PLAIN-...json`) · *Ambas* · *Ninguna* = solo sesión (en memoria
mientras la pestaña esté abierta, "Bloquear" la olvida; para equipos ajenos).

**Recomendado — instálalo en el móvil (como app):** abre `signer.noxtr.net` en el
móvil y usa **"Añadir a pantalla de inicio"**. Funciona a pantalla completa como
una app nativa, siempre a mano, y con *Navegador* + *Recordar en este dispositivo*
la identidad queda lista al abrir. Para la mayoría es más práctico que llevar la
nsec en un USB.

**Relays:** `relays.js` (raíz) define `SIGNER_RELAYS`, editable por el usuario
(solo `wss://`; usa defaults si falta o es inválido). Son los relays propios del
bunker; los de las apps llegan en su URI.

**Integración:** lo usa cualquier cliente con Nostr Connect. Pairing en ambos
sentidos — `nostrconnect://...` del cliente pegado/escaneado en "Conectar una
app", o `bunker://...` (secret de un solo uso) del signer copiado al cliente.
Tras el `connect`, las peticiones kind 24133 (cifradas NIP-44) van por el relay.
Métodos: `connect`, `ping`, `get_public_key`, `get_relays`, `sign_event`,
`nip44_encrypt/decrypt`, `nip04_encrypt/decrypt`. Requiere la pestaña del signer
abierta y desbloqueada.

**Verificación de copias:** la página funciona descargada. Para distribuirla con
garantía, publicar el `shasum -a 256` del árbol en https://noxtr.net y que el
usuario lo compruebe en local.

### CSP (¡leer antes de tocar los inline!)

La CSP viaja en un `<meta>` dentro de `index.html` (aplica también descargado).
Los dos `sha256-...` de `script-src` autorizan EXACTAMENTE los dos scripts
inline. Si edita cualquiera, recalcule su hash (contenido exacto entre
`<script>` y `</script>`, espacios incluidos):

```sh
perl -0777 -ne 'while (/<script>(.*?)<\/script>/gs) { open(F,">","/tmp/i".(++$i).".js"); print F $1 }' index.html
for f in /tmp/i1.js /tmp/i2.js; do echo "sha256-$(openssl dgst -sha256 -binary $f | base64)"; done
```
