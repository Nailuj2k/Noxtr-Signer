# Noxtr Signer

Repositorio: https://github.com/Nailuj2k/Noxtr-Signer

Firmador NIP-46. 

Funciona servido por cualquier webserver **o abierto con doble clic** (`file://`) — por eso
todos los scripts son clásicos (nada de módulos ES ni `fetch()` de assets locales).
Es una simple web con javascript, no necesita nodejs ni node_modules, ni ná raro ni modelno.

## Estructura

```
index.html        página única (CSP en meta, i18n vía data-i18n)
logo.svg          marca + favicon   // Oki, es un logo pestoso. Pero estamos en ello.
_css_/            reset, style, style.buttons (ex-theme) + signer.css (ex-módulo)
_i18n_/es.js,en.js  todas las cadenas (constantes str_* + diccionario SGN_DOM)
_js_/             wquery (núcleo+draggable+dialog+overrides), script.js (helpers t()...), signer.js (el módulo entero)
_lib_/            noble-secp256k1, noble-ciphers, buffer, bip39, qrcode, jsqr, font-awesome (self-hosted, nada de CDNs)
_images_/         feather/ y feather_white/ (iconos vía CSS mask)
```

## Dónde se guarda la nsec (elección del usuario, v0.7.0)

En el setup hay dos casillas independientes; el panel `#setup-store-info`
explica la combinación elegida (renderStoreInfo en `_js_/signer.js`):

- **Navegador** (IndexedDB, como siempre) — con sus subopciones de
  desbloqueo automático y contraseña.
- **Archivo que se descarga** — para llevarla en un USB y re-entrar con
  "Cargar backup JSON". Con contraseña: wrapper cifrado (AES-GCM + PBKDF2,
  el mismo de "Exportar backup"). Sin contraseña: la nsec va EN CLARO
  (libertad del usuario, con confirmación expresa; el archivo se llama
  `signer-nsec-PLAIN-...json` pa que se note).
- **Ambas** — cómodo + portable + copia de seguridad.
- **Ninguna** = modo solo sesión: la nsec vive en memoria mientras la pestaña
  esté abierta (`record.sessionOnly`); "Bloquear" equivale a olvidar y no
  queda rastro en el equipo. Pensado para equipos ajenos.

## Relays

`relays.js` (raíz) define `SIGNER_RELAYS` y **es editable por el usuario**
(solo `wss://`; si falta o es inválido, `signer.js` usa sus defaults).
Son los relays propios del bunker; los de las apps llegan en su URI.


## Cómo integrar Noxtr Signer en un cliente

Noxtr Signer es un bunker NIP-46: cualquier cliente con Nostr Connect lo usa
sin que el signer tenga que saber nada del cliente. Dos flujos de pairing:

1. **Inicia el cliente** (noxtr: Login → Nostr Connect): genera una URI
   `nostrconnect://<client-pubkey>?relay=...&secret=...` que el usuario pega
   (o escanea con la cámara) en "Conectar una app" del signer.
2. **Inicia el signer**: el usuario copia la URI `bunker://<pubkey>?relay=...&secret=...`
   del panel (o su QR) al cliente. El secret es de un solo uso.

Tras el `connect`, el cliente manda peticiones kind 24133 (cifradas NIP-44)
por el relay y el signer responde. Métodos: `connect`, `ping`,
`get_public_key`, `get_relays`, `sign_event`, `nip44_encrypt/decrypt`,
`nip04_encrypt/decrypt`. Requisitos del lado cliente: implementar NIP-46
(noxtr ya lo tiene en su clase `Nip46`); del lado usuario: la pestaña del
signer abierta y desbloqueada.


## Verificación de copias (modo descargable)

La página entera funciona descargada. Para distribuirla con garantía:
publicar el `shasum -a 256` del árbol (o del futuro `signer.html`
autocontenido) en https://noxtr.net y que el usuario lo compruebe en local.
Esto lo hare ...  hoy no. Mañana XD. 


## CSP (¡leer antes de tocar los inline!)

La CSP viaja en `<meta>` dentro de `index.html`: aplica también descargado.
Los dos `sha256-...` de `script-src` autorizan EXACTAMENTE los dos scripts
inline. Si edita cualquiera de ellos, recalcule su hash (contenido exacto
entre `<script>` y `</script>`, espacios incluidos):

```sh
perl -0777 -ne 'while (/<script>(.*?)<\/script>/gs) { open(F,">","/tmp/i".(++$i).".js"); print F $1 }' index.html
for f in /tmp/i1.js /tmp/i2.js; do echo "sha256-$(openssl dgst -sha256 -binary $f | base64)"; done
```
