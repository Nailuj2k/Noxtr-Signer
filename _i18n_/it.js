// Noxtr Signer — i18n IT (Italiano)
// index.html carica il file di lingua secondo _LANG_; tutti definiscono gli stessi nomi.

// --- Constantes genéricas del framework ---

const str_of        = 'di';
const str_row       = 'riga';
const str_item      = 'Articolo';
const str_copy      = 'Copia';
const str_page      = 'Pagina';
const str_vote      = 'voto';
const str_stars     = 'stelle';
const str_votes     = 'voti';
const str_price     = 'Prezzo';
const str_accept    = 'Accetta';
const str_cancel    = 'Annulla';
const str_delete    = 'Elimina';
const str_no_rating = 'Nessuna valutazione';

// --- Constantes del módulo signer ---

const str_sgn_pass_mismatch     = 'Le password non coincidono.';
const str_sgn_need_pass_or_remember = 'Imposta una password o attiva "Ricorda su questo dispositivo" (ne serve almeno una).';
const str_sgn_pass_to_show      = 'Password per mostrare la nsec:';
const str_sgn_autounlock_on     = 'Sblocco automatico su questo dispositivo: attivo';
const str_sgn_autounlock_off    = 'Sblocco automatico su questo dispositivo: disattivato';
const str_sgn_disable           = 'disattivare';
const str_sgn_enable            = 'attivare';
const str_sgn_autounlock_needpass = 'Questa identità non ha password: disattivando lo sblocco automatico la chiave diventerebbe inaccessibile. Ricrea l\'identità con password se vuoi questa modalità.';
const str_sgn_invalid_nsec      = 'nsec non valida. Deve essere nsec1... o 64 caratteri esadecimali.';
const str_sgn_saved             = 'Identità salvata e sbloccata.';
const str_sgn_wrong_pass        = 'Password errata.';
const str_sgn_forget_confirm    = 'Eliminare l\'identità da questo browser? Senza una copia della nsec la perderai PER SEMPRE.';
const str_sgn_show_nsec_warn    = 'La tua chiave privata. Non condividerla MAI:';
const str_sgn_pair_connected    = 'Connesso con "${0}". Tieni questa scheda aperta per firmare.';
const str_sgn_pair_error        = 'Errore di connessione: ${0}';
const str_sgn_need_unlock       = 'Sblocca prima l\'identità.';
const str_sgn_no_clients        = 'Nessuna app ancora connessa.';
const str_sgn_disconnect        = 'Disconnetti';
const str_sgn_no_activity       = 'Nessuna attività.';
const str_sgn_relays_connected  = 'relay: ${0} di ${1} connessi';
const str_sgn_sign_request      = 'Richiesta di firma';
const str_sgn_app_wants_sign    = '"${0}" vuole firmare: ${1}';
const str_sgn_reject            = 'Rifiuta';
const str_sgn_sign_once         = 'Firma';
const str_sgn_sign_remember     = 'Firma e ricorda questo tipo (sessione)';
const str_sgn_rejected_by_user  = 'Rifiutato dall\'utente';
const str_sgn_act_signed        = 'firmato';
const str_sgn_act_auto          = 'auto-firmato';
const str_sgn_act_rejected      = 'rifiutato';
const str_sgn_act_connected     = 'connessa';
const str_sgn_grants_label      = 'auto-firma (questa sessione):';
const str_sgn_grant_revoke      = 'revoca';
const str_sgn_copied            = 'Copiato';
const str_sgn_backup_bad        = 'Errore nella lettura del backup: ${0}';
const str_sgn_backup_pass       = 'Password del backup:';
const str_sgn_backup_wrong_pass = 'Password errata o backup corrotto.';
const str_sgn_backup_no_nsec    = 'Il backup non contiene nsec.';
const str_sgn_words_prompt      = 'Scrivi le 12 o 24 parole separate da spazi:';
const str_sgn_need_12_words     = 'Devono essere 12 o 24 parole (ne hai scritte ${0}).';
const str_sgn_words_title       = 'Importa da 12/24 parole (BIP39)';
const str_sgn_words_path        = 'Percorso di derivazione (se non sai cos\'è, lascia lo standard):';
const str_sgn_words_path_std    = 'Nostr standard (NIP-06)';
const str_sgn_cancel            = 'Annulla';
const str_sgn_import            = 'Importa';
const str_sgn_generated        = 'Nuova chiave generata. Premi "Salva identità".';
const str_sgn_nsec_empty        = 'Prima genera una chiave nuova o importane una esistente.';
const str_sgn_derive_error      = 'Errore nella derivazione della chiave: ${0}';
const str_sgn_nsec_loaded       = 'Chiave caricata. Premi "Salva identità".';
const str_sgn_app_wants_op      = '"${0}" richiede: ${1}';
const str_sgn_allow             = 'Consenti';
const str_sgn_allow_remember    = 'Consenti e ricorda (sessione)';
const str_sgn_act_approved      = 'consentito';
const str_sgn_op_n44e           = 'cifrare un messaggio (NIP-44)';
const str_sgn_op_n44d           = 'decifrare un messaggio (NIP-44)';
const str_sgn_op_n04e           = 'cifrare un messaggio (NIP-04 legacy)';
const str_sgn_op_n04d           = 'decifrare un messaggio (NIP-04 legacy)';
const str_sgn_copy              = 'Copia';
const str_sgn_close             = 'Chiudi';
const str_sgn_rename            = 'rinomina';
const str_sgn_rename_prompt     = 'Nuovo nome per questa app:';
const str_sgn_words_bad_checksum = 'Checksum BIP39 non valido: quasi sicuramente una parola è scritta male o in ordine sbagliato. Importare comunque?';
const str_sgn_no_relays_warn    = 'Nessuna connessione con i relay: le app non possono raggiungere il firmatore in questo momento.';
const str_sgn_show_nsec_title   = 'La tua chiave privata (nsec)';
const str_sgn_scan_point        = 'Punta la fotocamera sul codice QR...';
const str_sgn_scan_failed       = 'Impossibile accedere alla fotocamera.';
const str_sgn_scan_key_bad      = 'Il QR non contiene una nsec né 12/24 parole BIP39 riconoscibili.';
const str_sgn_qr_lib            = 'Libreria QR non caricata.';
const str_sgn_export_title      = 'Esporta backup cifrato';
const str_sgn_export_hint       = 'Verrà scaricato un JSON con la tua nsec cifrata (AES-GCM + PBKDF2). Ti servirà questa password per ripristinarlo: se la dimentichi, il backup è inutile.';
const str_sgn_export_need_pass  = 'Imposta una password per cifrare il backup.';
const str_sgn_export_go         = 'Scarica';
const str_sgn_export_done       = 'Backup scaricato. Conservalo in un luogo sicuro.';
const str_sgn_pass_repeat       = 'Ripeti la password';
const str_sgn_file_plain_confirm = 'Senza password il file conterrà la tua nsec IN CHIARO: chiunque lo legga controlla la tua identità. Fallo solo se la destinazione (USB, disco) è già cifrata o ben custodita. Scaricare in chiaro?';
const str_sgn_session_only_confirm = 'Non hai scelto dove salvare: l\'identità vivrà SOLO in questa scheda e sparirà alla chiusura. La prossima volta dovrai ricaricare la nsec o il file. Continuare?';
const str_sgn_session_only      = 'Identità solo per questa sessione: niente è stato salvato su questo computer.';

// Pannello "dove salvare?": etichetta + spiegazione di ogni modalità (renderStoreInfo)
const str_sgn_mode_browser_t    = 'Modalità browser';
const str_sgn_mode_browser      = 'L\'identità resta cifrata in questo browser e si sblocca qui. Consigliata sul tuo computer personale. Fai anche una copia (file o nsec annotata) nel caso perdessi questo browser.';
const str_sgn_mode_usb_t        = 'Modalità USB';
const str_sgn_mode_usb          = 'Verrà scaricato un file con la tua identità (cifrato se metti una password; in chiaro altrimenti) e NON verrà salvato nulla su questo computer. Mettilo nella tua USB accanto al signer; per riusarla: "Carica backup JSON". Chiusa la scheda, nessuna traccia.';
const str_sgn_mode_both_t       = 'Modalità mista';
const str_sgn_mode_both        = 'Si salva in questo browser E si scarica il file per la USB: comodo qui, portabile altrove, e il file fa da copia di sicurezza.';
const str_sgn_mode_session_t    = 'Modalità solo sessione';
const str_sgn_mode_session      = 'Non si salva da nessuna parte: l\'identità vive finché questa scheda è aperta e si perde alla chiusura. Utile su computer altrui se porti con te la nsec o il file.';

// Banner di sostegno (mance in sats; indirizzo in relays.js)
const str_sgn_tip_title         = 'Sostieni questo sviluppo';
const str_sgn_tip_scan          = 'Scansiona il QR o copia l\'indirizzo lightning:';
const str_sgn_tip_choose        = 'Scegli quanto vuoi contribuire:';
const str_sgn_tip_generating    = 'Generazione della fattura…';
const str_sgn_tip_payinv        = 'Scansiona per pagare la fattura:';
const str_sgn_tip_failed        = 'Impossibile generare la fattura. Scansiona il QR o copia l\'indirizzo:';

// --- Textos del DOM ---

var SGN_DOM = {
    SIGNER_INTRO: 'Custodisce la tua chiave Nostr (nsec) cifrata in questo browser e firma eventi per altre app via NIP-46 (Nostr Connect). La tua chiave non lascia mai questa pagina.',
    SIGNER_HELP_TITLE: 'Come si usa',
    SIGNER_HELP_1T: 'Crea o importa la tua identità.',
    SIGNER_HELP_1: 'Premi "Genera nuova chiave" (muovi il mouse o il telefono fino al 100%) o importa la tua nsec esistente: incollandola, da un backup JSON o dalle tue 12/24 parole. Conserva una copia della nsec in un luogo sicuro: se perdi questo browser e non hai copia, perdi l\'identità.',
    SIGNER_HELP_2T: 'Proteggila.',
    SIGNER_HELP_2: 'Con "Ricorda su questo dispositivo" si sblocca da sola all\'apertura della pagina (come una sessione attiva). La password è uno strato extra, consigliato su computer condivisi.',
    SIGNER_HELP_3T: 'Connetti un\'app.',
    SIGNER_HELP_3: 'Due strade: (a) l\'app ti mostra un indirizzo nostrconnect:// — copialo (o scansiona il suo QR col pulsante della fotocamera) e incollalo qui in "Connetti un\'app" (in noxtr: Login, Nostr Connect); oppure (b) copia l\'indirizzo bunker:// di questo pannello, o scansiona il suo QR dall\'app (vale una sola volta: si rinnova dopo ogni connessione).',
    SIGNER_HELP_4T: 'Approva le firme.',
    SIGNER_HELP_4: 'Quando l\'app vuole pubblicare qualcosa, qui apparirà un avviso con il contenuto. Puoi firmare una volta, rifiutare, o "ricordare questo tipo" per quell\'app (i permessi ricordati si cancellano ricaricando la pagina).',
    SIGNER_HELP_5T: 'Importante: lascia questa scheda aperta.',
    SIGNER_HELP_5: 'Il firmatore funziona solo mentre la pagina è aperta e sbloccata. Se la chiudi o premi "Blocca", le app connesse non potranno firmare finché non torni.',
    SIGNER_HELP_6T: 'Mantieni il controllo.',
    SIGNER_HELP_6: 'In "App connesse" puoi rinominare un\'app, revocarne i permessi o disconnetterla; in "Attività" vedi tutto ciò che è stato firmato o rifiutato.',
    SIGNER_SETUP_TITLE: 'Crea o importa la tua identità',
    SIGNER_SETUP_NSEC2: 'Chiave privata (nsec)',
    SIGNER_SETUP_NSEC_PH: 'nsec1... (generane una nuova o importala con i pulsanti)',
    SIGNER_SHOW_HIDE: 'Mostra/Nascondi',
    SIGNER_COPY: 'Copia',
    SIGNER_GENERATE_NEW: 'Genera nuova chiave',
    SIGNER_LOAD_BACKUP2: 'Carica backup JSON',
    SIGNER_LOAD_WORDS2: '12/24 parole (BIP39)',
    SIGNER_SCAN_KEY_QR: 'Scansiona nsec/12 parole',
    SIGNER_ENTROPY_MOVE: 'Muovi il mouse / il telefono sullo schermo fino al 100% (si dipingeranno punti colorati):',
    SIGNER_ENTROPY_PH: 'L\'entropia verrà mostrata qui in tempo reale...',
    SIGNER_STORE_TITLE: 'Dove salvare la tua identità?',
    SIGNER_STORE_BROWSER: 'In questo browser (resta cifrata su questo computer)',
    SIGNER_STORE_FILE: 'In un file scaricato (per portarla su una USB)',
    SIGNER_REMEMBER_DEVICE: 'Ricorda su questo dispositivo (sblocco automatico, consigliato)',
    SIGNER_ADD_PASS: 'Aggiungi password di cifratura (opzionale: strato extra per computer condivisi)',
    SIGNER_SETUP_PASS4: 'Password',
    SIGNER_SETUP_PASS2: 'Ripeti la password',
    SIGNER_SETUP_SAVE: 'Salva identità',
    SIGNER_SETUP_HINT2: 'La nsec viene salvata sempre cifrata in questo browser. Con lo sblocco automatico viene cifrata con una chiave interna del browser (non estraibile): chiunque usi questo profilo del browser potrà firmare, come una sessione attiva. La password è uno strato extra (consigliato su computer condivisi) e viene sempre richiesta per mostrare la nsec. Conserva una copia della nsec in un luogo sicuro.',
    SIGNER_LOCKED_TITLE: 'Identità bloccata',
    SIGNER_LOCKED_PASS: 'Password',
    SIGNER_UNLOCK: 'Sblocca',
    SIGNER_FORGET: 'Elimina questa identità da questo browser',
    SIGNER_IDENTITY_TITLE: 'La tua identità',
    SIGNER_LOCK: 'Blocca',
    SIGNER_SHOW_NSEC: 'Mostra nsec',
    SIGNER_EXPORT_BACKUP: 'Esporta backup cifrato',
    SIGNER_PAIR_TITLE: 'Connetti un\'app',
    SIGNER_PAIR_HINT: 'Incolla qui la URI nostrconnect:// che ti mostra l\'app client (in noxtr: Login → Nostr Connect).',
    SIGNER_PAIR: 'Connetti',
    SIGNER_SCAN_QR: 'Scansiona QR',
    SIGNER_SCAN_STOP: 'Chiudi fotocamera',
    SIGNER_BUNKER_HINT: '...oppure copia questo indirizzo bunker:// e incollalo nell\'app client (monouso: si rinnova dopo ogni connessione):',
    SIGNER_CLIENTS_TITLE: 'App connesse',
    SIGNER_ACTIVITY_TITLE: 'Attività',
    SIGNER_BETA_WARNING: 'Versione beta: il firmatore gira già isolato sul proprio dominio, ma è ancora in sviluppo. Conserva sempre una copia di sicurezza della tua chiave.',
    SIGNER_FLOSS: 'noxtr signer è software libero e open source, e lo sarà sempre. Se ti è utile, puoi sostenere il suo sviluppo con una mancia in sats.',
    SIGNER_SUPPORT: 'Sostieni questo sviluppo'
};
