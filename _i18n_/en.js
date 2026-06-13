// Noxtr Signer — i18n EN (static)
// Before: PHP t() resolved these strings at render time (head.php, i18n.php, run.php).
// index.html loads es.js or en.js depending on _LANG_; both define the same names.
// In the .js they are used directly (str_xxx) or via t(str_xxx, arg) replacing ${0}, ${1}...

// --- Generic framework constants (before: _includes_/head.php) ---

const str_of        = 'of';
const str_row       = 'row';
const str_item      = 'Item';
const str_copy      = 'Copy';
const str_page      = 'Page';
const str_vote      = 'vote';
const str_stars     = 'stars';
const str_votes     = 'votes';
const str_price     = 'Price';
const str_accept    = 'Accept';
const str_cancel    = 'Cancel';
const str_delete    = 'Delete';
const str_no_rating = 'No rating';

// --- Signer module constants (before: _modules_/signer/i18n.php) ---

const str_sgn_pass_mismatch     = 'Passwords do not match.';
const str_sgn_need_pass_or_remember = 'Set a password or enable "Remember on this device" (at least one is required).';
const str_sgn_pass_to_show      = 'Password to reveal the nsec:';
const str_sgn_autounlock_on     = 'Automatic unlock on this device: enabled';
const str_sgn_autounlock_off    = 'Automatic unlock on this device: disabled';
const str_sgn_disable           = 'disable';
const str_sgn_enable            = 'enable';
const str_sgn_autounlock_needpass = 'This identity has no password: disabling automatic unlock would make the key inaccessible. Re-create the identity with a password if you want this mode.';
const str_sgn_invalid_nsec      = 'Invalid nsec. Must be nsec1... or 64 hex chars.';
const str_sgn_saved             = 'Identity saved and unlocked.';
const str_sgn_wrong_pass        = 'Wrong password.';
const str_sgn_forget_confirm    = 'Remove the identity from this browser? If you have no copy of the nsec you will lose it FOREVER.';
const str_sgn_show_nsec_warn    = 'Your private key. NEVER share it:';
const str_sgn_pair_connected    = 'Connected to "${0}". Keep this tab open to sign.';
const str_sgn_pair_error        = 'Connection error: ${0}';
const str_sgn_need_unlock       = 'Unlock the identity first.';
const str_sgn_no_clients        = 'No apps connected yet.';
const str_sgn_disconnect        = 'Disconnect';
const str_sgn_no_activity       = 'No activity.';
const str_sgn_relays_connected  = 'relays: ${0} of ${1} connected';
const str_sgn_sign_request      = 'Signature request';
const str_sgn_app_wants_sign    = '"${0}" wants to sign: ${1}';
const str_sgn_reject            = 'Reject';
const str_sgn_sign_once         = 'Sign';
const str_sgn_sign_remember     = 'Sign and remember this kind (session)';
const str_sgn_rejected_by_user  = 'Rejected by user';
const str_sgn_act_signed        = 'signed';
const str_sgn_act_auto          = 'auto-signed';
const str_sgn_act_rejected      = 'rejected';
const str_sgn_act_connected     = 'connected';
const str_sgn_grants_label      = 'auto-sign (this session):';
const str_sgn_grant_revoke      = 'revoke';
const str_sgn_copied            = 'Copied';
const str_sgn_backup_bad        = 'Backup read error: ${0}';
const str_sgn_backup_pass       = 'Backup password:';
const str_sgn_backup_wrong_pass = 'Wrong password or corrupted backup.';
const str_sgn_backup_no_nsec    = 'Backup has no nsec.';
const str_sgn_words_prompt      = 'Type the 12 or 24 words separated by spaces:';
const str_sgn_need_12_words     = 'Must be 12 or 24 words (you typed ${0}).';
const str_sgn_words_title       = 'Import from 12/24 words (BIP39)';
const str_sgn_words_path        = 'Derivation path (if unsure, keep the standard one):';
const str_sgn_words_path_std    = 'Standard Nostr (NIP-06)';
const str_sgn_cancel            = 'Cancel';
const str_sgn_import            = 'Import';
const str_sgn_generated        = 'New key generated. Press "Save identity".';
const str_sgn_nsec_empty        = 'First generate a new key or import an existing one.';
const str_sgn_derive_error      = 'Key derivation error: ${0}';
const str_sgn_nsec_loaded       = 'Key loaded. Press "Save identity".';
const str_sgn_app_wants_op      = '"${0}" requests: ${1}';
const str_sgn_allow             = 'Allow';
const str_sgn_allow_remember    = 'Allow and remember (session)';
const str_sgn_act_approved      = 'allowed';
const str_sgn_op_n44e           = 'encrypt a message (NIP-44)';
const str_sgn_op_n44d           = 'decrypt a message (NIP-44)';
const str_sgn_op_n04e           = 'encrypt a message (legacy NIP-04)';
const str_sgn_op_n04d           = 'decrypt a message (legacy NIP-04)';
const str_sgn_copy              = 'Copy';
const str_sgn_close             = 'Close';
const str_sgn_rename            = 'rename';
const str_sgn_rename_prompt     = 'New name for this app:';
const str_sgn_words_bad_checksum = 'Invalid BIP39 checksum: almost surely a word is misspelled or out of order. Import anyway?';
const str_sgn_no_relays_warn    = 'No relay connection: apps cannot reach the signer right now.';
const str_sgn_show_nsec_title   = 'Your private key (nsec)';
const str_sgn_scan_point        = 'Point the camera at the QR code...';
const str_sgn_scan_failed       = 'Could not access the camera.';
const str_sgn_scan_key_bad      = 'The QR does not contain a recognizable nsec or 12/24 BIP39 words.';
const str_sgn_qr_lib            = 'QR library not loaded.';
const str_sgn_export_title      = 'Export encrypted backup';
const str_sgn_export_hint       = 'A JSON file with your encrypted nsec (AES-GCM + PBKDF2) will be downloaded. You will need this password to restore it: if you forget it, the backup is useless.';
const str_sgn_export_need_pass  = 'Set a password to encrypt the backup.';
const str_sgn_export_go         = 'Download';
const str_sgn_export_done       = 'Backup downloaded. Keep it somewhere safe.';
const str_sgn_pass_repeat       = 'Repeat password';
const str_sgn_file_plain_confirm = 'Without a password the file will contain your nsec IN THE CLEAR: anyone who reads it controls your identity. Do this only if the destination (USB, disk) is already encrypted or well guarded. Download in the clear?';
const str_sgn_session_only_confirm = 'You did not choose where to store it: the identity will live ONLY in this tab and will vanish when you close it. Next time you will need to load the nsec or the file again. Continue?';
const str_sgn_session_only      = 'Identity for this session only: nothing is stored on this computer.';

// "Where to store?" panel: label + explanation for each mode (renderStoreInfo)
const str_sgn_mode_browser_t    = 'Browser mode';
const str_sgn_mode_browser      = 'The identity is stored encrypted in this browser and unlocks here. Recommended on your personal computer. Also keep a copy (file or written-down nsec) in case you lose this browser.';
const str_sgn_mode_usb_t        = 'USB mode';
const str_sgn_mode_usb          = 'A file with your identity will be downloaded (encrypted if you set a password; in the clear if not) and NOTHING will be stored on this computer. Put it on your USB stick next to the signer; to use it again: "Load JSON backup". When you close the tab, no trace is left.';
const str_sgn_mode_both_t       = 'Mixed mode';
const str_sgn_mode_both        = 'Stored in this browser AND downloaded as a file for the USB: convenient on this computer, portable to others, and the file doubles as a backup.';
const str_sgn_mode_session_t    = 'Session-only mode';
const str_sgn_mode_session      = 'Stored nowhere: the identity lives while this tab is open and is lost when you close it. Useful on other people\'s computers if you carry the nsec or the file with you.';

// Support banner (tips in sats; address in relays.js)
const str_sgn_tip_title         = 'Support this development';
const str_sgn_tip_scan          = 'Scan the QR or copy the lightning address:';
const str_sgn_tip_choose        = 'Choose how much to contribute:';
const str_sgn_tip_generating    = 'Generating invoice…';
const str_sgn_tip_payinv        = 'Scan to pay the invoice:';
const str_sgn_tip_failed        = 'Could not generate the invoice. Scan the QR or copy the address:';

// --- DOM texts (before: inline t() in _modules_/signer/run.php) ---
// index.html applies them over [data-i18n] / [data-i18n-ph] / [data-i18n-title].

var SGN_DOM = {
    SIGNER_INTRO: 'Holds your Nostr key (nsec) encrypted in this browser and signs events for other apps via NIP-46 (Nostr Connect). Your key never leaves this page.',
    SIGNER_HELP_TITLE: 'How to use it',
    SIGNER_HELP_1T: 'Create or import your identity.',
    SIGNER_HELP_1: 'Press "Generate new key" (move the mouse or the phone until 100%) or import your existing nsec: by pasting it, from a JSON backup or from your 12/24 words. Keep a copy of the nsec somewhere safe: if you lose this browser and have no copy, you lose the identity.',
    SIGNER_HELP_2T: 'Protect it.',
    SIGNER_HELP_2: 'With "Remember on this device" it unlocks automatically when the page opens (like a logged-in session). The password is an extra layer, recommended on shared computers.',
    SIGNER_HELP_3T: 'Connect an app.',
    SIGNER_HELP_3: 'Two ways: (a) the app shows you a nostrconnect:// address — copy it (or scan its QR with the camera button) and paste it here in "Connect an app" (in noxtr: Login, Nostr Connect); or (b) copy the bunker:// address from this panel, or scan its QR from the app (single use: it renews after each connection).',
    SIGNER_HELP_4T: 'Approve signatures.',
    SIGNER_HELP_4: 'When the app wants to publish something, a notice with the content will appear here. You can sign once, reject, or "remember this kind" for that app (remembered permissions are cleared when the page reloads).',
    SIGNER_HELP_5T: 'Important: keep this tab open.',
    SIGNER_HELP_5: 'The signer only works while the page is open and unlocked. If you close it or press "Lock", connected apps will not be able to sign until you come back.',
    SIGNER_HELP_6T: 'Stay in control.',
    SIGNER_HELP_6: 'In "Connected apps" you can rename an app, revoke its permissions or disconnect it; in "Activity" you can see everything that has been signed or rejected.',
    SIGNER_SETUP_TITLE: 'Create or import your identity',
    SIGNER_SETUP_NSEC2: 'Private key (nsec)',
    SIGNER_SETUP_NSEC_PH: 'nsec1... (generate a new one or import it with the buttons)',
    SIGNER_SHOW_HIDE: 'Show/Hide',
    SIGNER_COPY: 'Copy',
    SIGNER_GENERATE_NEW: 'Generate new key',
    SIGNER_LOAD_BACKUP2: 'Load JSON backup',
    SIGNER_LOAD_WORDS2: '12/24 words (BIP39)',
    SIGNER_SCAN_KEY_QR: 'Scan nsec/12 words',
    SIGNER_ENTROPY_MOVE: 'Move the mouse / device around the screen until 100% (colored dots will be painted):',
    SIGNER_ENTROPY_PH: 'Entropy will be displayed here in real time...',
    SIGNER_STORE_TITLE: 'Where to keep your identity?',
    SIGNER_STORE_BROWSER: 'In this browser (stored encrypted on this computer)',
    SIGNER_STORE_FILE: 'In a downloaded file (to carry it on a USB stick)',
    SIGNER_REMEMBER_DEVICE: 'Remember on this device (automatic unlock, recommended)',
    SIGNER_ADD_PASS: 'Add an encryption password (optional: extra layer for shared computers)',
    SIGNER_SETUP_PASS4: 'Password',
    SIGNER_SETUP_PASS2: 'Repeat password',
    SIGNER_SETUP_SAVE: 'Save identity',
    SIGNER_SETUP_HINT2: 'The nsec is always stored encrypted in this browser. With automatic unlock it is encrypted with an internal non-extractable browser key: anyone using this browser profile will be able to sign, like a logged-in session. The password is an extra layer (recommended on shared computers) and is always required to reveal the nsec. Keep a copy of the nsec somewhere safe.',
    SIGNER_LOCKED_TITLE: 'Identity locked',
    SIGNER_LOCKED_PASS: 'Password',
    SIGNER_UNLOCK: 'Unlock',
    SIGNER_FORGET: 'Remove this identity from this browser',
    SIGNER_IDENTITY_TITLE: 'Your identity',
    SIGNER_LOCK: 'Lock',
    SIGNER_SHOW_NSEC: 'Show nsec',
    SIGNER_EXPORT_BACKUP: 'Export encrypted backup',
    SIGNER_PAIR_TITLE: 'Connect an app',
    SIGNER_PAIR_HINT: 'Paste here the nostrconnect:// URI shown by the client app (in noxtr: Login → Nostr Connect).',
    SIGNER_PAIR: 'Connect',
    SIGNER_SCAN_QR: 'Scan QR',
    SIGNER_SCAN_STOP: 'Close camera',
    SIGNER_BUNKER_HINT: '...or copy this bunker:// address and paste it into the client app (single-use: it renews after each connection):',
    SIGNER_CLIENTS_TITLE: 'Connected apps',
    SIGNER_ACTIVITY_TITLE: 'Activity',
    SIGNER_BETA_WARNING: 'Beta version: the signer now runs isolated on its own domain, but is still under development. Always keep a backup of your key.',
    SIGNER_FLOSS: 'noxtr signer is free and open-source software, and always will be. If you find it useful, you can support its development with a tip in sats.',
    SIGNER_SUPPORT: 'Support this development'
};
