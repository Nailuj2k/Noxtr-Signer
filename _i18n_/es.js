// Noxtr Signer — i18n ES (estático)
// Antes: PHP t() resolvía estas cadenas al renderizar (head.php, i18n.php, run.php).
// index.html carga es.js o en.js según _LANG_; ambos definen los mismos nombres.
// En el .js se usan directamente (str_xxx) o con t(str_xxx, arg) que sustituye ${0}, ${1}...

// --- Constantes genéricas del framework (antes _includes_/head.php) ---

const str_of        = 'de';
const str_row       = 'fila';
const str_item      = 'Artículo';
const str_copy      = 'Copiar';
const str_page      = 'Página';
const str_vote      = 'voto';
const str_stars     = 'estrellas';
const str_votes     = 'votos';
const str_price     = 'Precio';
const str_accept    = 'Aceptar';
const str_cancel    = 'Cancelar';
const str_delete    = 'Borrar';
const str_no_rating = 'Sin calificación';

// --- Constantes del módulo signer (antes _modules_/signer/i18n.php) ---

const str_sgn_pass_mismatch     = 'Las contraseñas no coinciden.';
const str_sgn_need_pass_or_remember = 'Pon una contraseña o activa "Recordar en este dispositivo" (hace falta al menos una de las dos).';
const str_sgn_pass_to_show      = 'Contraseña para mostrar la nsec:';
const str_sgn_autounlock_on     = 'Desbloqueo automático en este dispositivo: activado';
const str_sgn_autounlock_off    = 'Desbloqueo automático en este dispositivo: desactivado';
const str_sgn_disable           = 'desactivar';
const str_sgn_enable            = 'activar';
const str_sgn_autounlock_needpass = 'Esta identidad no tiene contraseña: si desactivas el desbloqueo automático, la clave quedaría inaccesible. Re-crea la identidad con contraseña si quieres este modo.';
const str_sgn_invalid_nsec      = 'nsec inválida. Debe ser nsec1... o 64 caracteres hex.';
const str_sgn_saved             = 'Identidad guardada y desbloqueada.';
const str_sgn_wrong_pass        = 'Contraseña incorrecta.';
const str_sgn_forget_confirm    = '¿Eliminar la identidad de este navegador? Si no tienes copia de la nsec, la perderás PARA SIEMPRE.';
const str_sgn_show_nsec_warn    = 'Tu clave privada. NUNCA la compartas:';
const str_sgn_pair_connected    = 'Conectado con "${0}". Mantén esta pestaña abierta para firmar.';
const str_sgn_pair_error        = 'Error al conectar: ${0}';
const str_sgn_need_unlock       = 'Desbloquea la identidad primero.';
const str_sgn_no_clients        = 'Ninguna app conectada todavía.';
const str_sgn_disconnect        = 'Desconectar';
const str_sgn_no_activity       = 'Sin actividad.';
const str_sgn_relays_connected  = 'relays: ${0} de ${1} conectados';
const str_sgn_sign_request      = 'Petición de firma';
const str_sgn_app_wants_sign    = '"${0}" quiere firmar: ${1}';
const str_sgn_reject            = 'Rechazar';
const str_sgn_sign_once         = 'Firmar';
const str_sgn_sign_remember     = 'Firmar y recordar este tipo (sesión)';
const str_sgn_rejected_by_user  = 'Rechazado por el usuario';
const str_sgn_act_signed        = 'firmado';
const str_sgn_act_auto          = 'auto-firmado';
const str_sgn_act_rejected      = 'rechazado';
const str_sgn_act_connected     = 'conectada';
const str_sgn_grants_label      = 'auto-firma (esta sesión):';
const str_sgn_grant_revoke      = 'revocar';
const str_sgn_copied            = 'Copiado';
const str_sgn_backup_bad        = 'Error al leer el backup: ${0}';
const str_sgn_backup_pass       = 'Contraseña del backup:';
const str_sgn_backup_wrong_pass = 'Contraseña incorrecta o backup corrupto.';
const str_sgn_backup_no_nsec    = 'El backup no contiene nsec.';
const str_sgn_words_prompt      = 'Escribe las 12 o 24 palabras separadas por espacios:';
const str_sgn_need_12_words     = 'Deben ser 12 o 24 palabras (has escrito ${0}).';
const str_sgn_words_title       = 'Importar desde 12/24 palabras (BIP39)';
const str_sgn_words_path        = 'Ruta de derivación (si no sabes qué es, deja la estándar):';
const str_sgn_words_path_std    = 'Nostr estándar (NIP-06)';
const str_sgn_cancel            = 'Cancelar';
const str_sgn_import            = 'Importar';
const str_sgn_generated        = 'Clave nueva generada. Pulsa "Guardar identidad".';
const str_sgn_nsec_empty        = 'Primero genera una clave nueva o importa una existente.';
const str_sgn_derive_error      = 'Error derivando la clave: ${0}';
const str_sgn_nsec_loaded       = 'Clave cargada. Pulsa "Guardar identidad".';
const str_sgn_app_wants_op      = '"${0}" solicita: ${1}';
const str_sgn_allow             = 'Permitir';
const str_sgn_allow_remember    = 'Permitir y recordar (sesión)';
const str_sgn_act_approved      = 'permitido';
const str_sgn_op_n44e           = 'cifrar un mensaje (NIP-44)';
const str_sgn_op_n44d           = 'descifrar un mensaje (NIP-44)';
const str_sgn_op_n04e           = 'cifrar un mensaje (NIP-04 legacy)';
const str_sgn_op_n04d           = 'descifrar un mensaje (NIP-04 legacy)';
const str_sgn_copy              = 'Copiar';
const str_sgn_close             = 'Cerrar';
const str_sgn_rename            = 'renombrar';
const str_sgn_rename_prompt     = 'Nuevo nombre para esta app:';
const str_sgn_words_bad_checksum = 'Checksum BIP39 inválido: casi seguro hay una palabra mal escrita o en otro orden. ¿Importar de todas formas?';
const str_sgn_no_relays_warn    = 'Sin conexión con los relays: las apps no pueden contactar con el firmador ahora mismo.';
const str_sgn_show_nsec_title   = 'Tu clave privada (nsec)';
const str_sgn_scan_point        = 'Apunta la cámara al código QR...';
const str_sgn_scan_failed       = 'No se pudo acceder a la cámara.';
const str_sgn_scan_key_bad      = 'El QR no contiene una nsec ni 12/24 palabras BIP39 reconocibles.';
const str_sgn_qr_lib            = 'Librería QR no cargada.';
const str_sgn_export_title      = 'Exportar backup cifrado';
const str_sgn_export_hint       = 'Se descargará un JSON con tu nsec cifrada (AES-GCM + PBKDF2). Necesitarás esta contraseña para restaurarlo: si la olvidas, el backup no sirve.';
const str_sgn_export_need_pass  = 'Pon una contraseña para cifrar el backup.';
const str_sgn_export_go         = 'Descargar';
const str_sgn_export_done       = 'Backup descargado. Guárdalo en lugar seguro.';
const str_sgn_pass_repeat       = 'Repite la contraseña';
const str_sgn_file_plain_confirm = 'Sin contraseña, el archivo llevará tu nsec EN CLARO: quien lo lea controla tu identidad. Hazlo solo si el destino (USB, disco) ya está cifrado o bien custodiado. ¿Descargar en claro?';
const str_sgn_session_only_confirm = 'No has elegido dónde guardar: la identidad vivirá SOLO en esta pestaña y desaparecerá al cerrarla. La próxima vez tendrás que volver a cargar la nsec o el archivo. ¿Continuar?';
const str_sgn_session_only      = 'Identidad solo en esta sesión: no hay nada guardado en este equipo.';

// Panel "¿dónde guardar?": etiqueta + explicación de cada modo (renderStoreInfo)
const str_sgn_mode_browser_t    = 'Modo navegador';
const str_sgn_mode_browser      = 'La identidad queda cifrada en este navegador y se desbloquea aquí. Recomendado en tu equipo personal. Haz también una copia (archivo o nsec apuntada) por si pierdes este navegador.';
const str_sgn_mode_usb_t        = 'Modo USB';
const str_sgn_mode_usb          = 'Se descargará un archivo con tu identidad (cifrado si pones contraseña; en claro si no) y NO se guardará nada en este equipo. Ponlo en tu USB junto al signer; para volver a usarla: "Cargar backup JSON". Al cerrar la pestaña no queda rastro.';
const str_sgn_mode_both_t       = 'Modo mixto';
const str_sgn_mode_both        = 'Se guarda en este navegador Y se descarga el archivo para el USB: cómodo en este equipo, portable a otros, y el archivo te sirve de copia de seguridad.';
const str_sgn_mode_session_t    = 'Modo solo sesión';
const str_sgn_mode_session      = 'No se guarda en ningún sitio: la identidad vive mientras esta pestaña esté abierta y se pierde al cerrarla. Útil en equipos ajenos si ya llevas la nsec o el archivo contigo.';

// Banner de apoyo (propinas en sats; dirección en relays.js)
const str_sgn_tip_title         = 'Apoya este desarrollo';
const str_sgn_tip_scan          = 'Escanea el QR o copia la dirección lightning:';
const str_sgn_tip_choose        = 'Elige cuánto quieres aportar:';
const str_sgn_tip_generating    = 'Generando factura…';
const str_sgn_tip_payinv        = 'Escanea para pagar la factura:';
const str_sgn_tip_failed        = 'No se pudo generar la factura. Escanea el QR o copia la dirección:';

// --- Textos del DOM (antes t() inline en _modules_/signer/run.php) ---
// index.html los aplica sobre [data-i18n] / [data-i18n-ph] / [data-i18n-title].

var SGN_DOM = {
    SIGNER_INTRO: 'Custodia tu clave Nostr (nsec) cifrada en este navegador y firma eventos para otras apps vía NIP-46 (Nostr Connect). Tu clave nunca sale de esta página.',
    SIGNER_HELP_TITLE: 'Cómo se usa',
    SIGNER_HELP_1T: 'Crea o importa tu identidad.',
    SIGNER_HELP_1: 'Pulsa "Generar clave nueva" (mueve el ratón o el móvil hasta el 100%) o importa tu nsec existente: pegándola, desde un backup JSON o desde tus 12/24 palabras. Guarda una copia de la nsec en lugar seguro: si pierdes este navegador y no tienes copia, pierdes la identidad.',
    SIGNER_HELP_2T: 'Protégela.',
    SIGNER_HELP_2: 'Con "Recordar en este dispositivo" se desbloquea sola al abrir la página (como una sesión iniciada). La contraseña es una capa extra, recomendada en equipos compartidos.',
    SIGNER_HELP_3T: 'Conecta una app.',
    SIGNER_HELP_3: 'Dos caminos: (a) la app te muestra una dirección nostrconnect:// — cópiala (o escanea su QR con el botón de la cámara) y pégala aquí en "Conectar una app" (en noxtr: Login, Nostr Connect); o (b) copia la dirección bunker:// de este panel, o escanea su QR desde la app (vale una sola vez: se renueva tras cada conexión).',
    SIGNER_HELP_4T: 'Aprueba las firmas.',
    SIGNER_HELP_4: 'Cuando la app quiera publicar algo, aquí aparecerá un aviso con el contenido. Puedes firmar una vez, rechazar, o "recordar este tipo" para esa app (los permisos recordados se borran al recargar la página).',
    SIGNER_HELP_5T: 'Importante: deja esta pestaña abierta.',
    SIGNER_HELP_5: 'El firmador solo atiende mientras la página está abierta y desbloqueada. Si la cierras o pulsas "Bloquear", las apps conectadas dejarán de poder firmar hasta que vuelvas.',
    SIGNER_HELP_6T: 'Controla.',
    SIGNER_HELP_6: 'En "Apps conectadas" puedes renombrar una app, revocar sus permisos o desconectarla; en "Actividad" ves todo lo que se ha firmado o rechazado.',
    SIGNER_SETUP_TITLE: 'Crear o importar tu identidad',
    SIGNER_SETUP_NSEC2: 'Clave privada (nsec)',
    SIGNER_SETUP_NSEC_PH: 'nsec1... (genérala nueva o impórtala con los botones)',
    SIGNER_SHOW_HIDE: 'Mostrar/Ocultar',
    SIGNER_COPY: 'Copiar',
    SIGNER_GENERATE_NEW: 'Generar clave nueva',
    SIGNER_LOAD_BACKUP2: 'Cargar backup JSON',
    SIGNER_LOAD_WORDS2: '12/24 palabras (BIP39)',
    SIGNER_SCAN_KEY_QR: 'Escanear nsec/12 palabras',
    SIGNER_ENTROPY_MOVE: 'Mueve el ratón / el móvil por la pantalla hasta el 100% (se pintarán puntos de colores):',
    SIGNER_ENTROPY_PH: 'La entropía se mostrará aquí en tiempo real...',
    SIGNER_STORE_TITLE: '¿Dónde guardar tu identidad?',
    SIGNER_STORE_BROWSER: 'En este navegador (queda cifrada en este equipo)',
    SIGNER_STORE_FILE: 'En un archivo que se descarga (para llevarla en un USB)',
    SIGNER_REMEMBER_DEVICE: 'Recordar en este dispositivo (desbloqueo automático, recomendado)',
    SIGNER_ADD_PASS: 'Añadir contraseña de cifrado (opcional: capa extra para equipos compartidos)',
    SIGNER_SETUP_PASS4: 'Contraseña',
    SIGNER_SETUP_PASS2: 'Repite la contraseña',
    SIGNER_SETUP_SAVE: 'Guardar identidad',
    SIGNER_SETUP_HINT2: 'La nsec se guarda siempre cifrada en este navegador. Con el desbloqueo automático se cifra con una clave interna del navegador (no extraíble): quien use este perfil del navegador podrá firmar, como una sesión iniciada. La contraseña es una capa extra (recomendada en equipos compartidos) y se pide siempre para mostrar la nsec. Guarda una copia de la nsec en lugar seguro.',
    SIGNER_LOCKED_TITLE: 'Identidad bloqueada',
    SIGNER_LOCKED_PASS: 'Contraseña',
    SIGNER_UNLOCK: 'Desbloquear',
    SIGNER_FORGET: 'Eliminar esta identidad de este navegador',
    SIGNER_IDENTITY_TITLE: 'Tu identidad',
    SIGNER_LOCK: 'Bloquear',
    SIGNER_SHOW_NSEC: 'Mostrar nsec',
    SIGNER_EXPORT_BACKUP: 'Exportar backup cifrado',
    SIGNER_PAIR_TITLE: 'Conectar una app',
    SIGNER_PAIR_HINT: 'Pega aquí la URI nostrconnect:// que te muestra la app cliente (en noxtr: Login → Nostr Connect).',
    SIGNER_PAIR: 'Conectar',
    SIGNER_SCAN_QR: 'Escanear QR',
    SIGNER_SCAN_STOP: 'Cerrar cámara',
    SIGNER_BUNKER_HINT: '...o copia esta dirección bunker:// y pégala en la app cliente (de un solo uso: se renueva tras cada conexión):',
    SIGNER_CLIENTS_TITLE: 'Apps conectadas',
    SIGNER_ACTIVITY_TITLE: 'Actividad',
    SIGNER_BETA_WARNING: 'Versión beta: el firmador ya corre aislado en su propio dominio, pero sigue en desarrollo. Guarda siempre una copia de seguridad de tu clave.',
    SIGNER_FLOSS: 'noxtr signer es software libre y de código abierto, y siempre lo será. Si te resulta útil, puedes apoyar su desarrollo con una propina en sats.',
    SIGNER_SUPPORT: 'Apoya este desarrollo'
};
