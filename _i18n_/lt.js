// Noxtr Signer — i18n LA (Latine)
// index.html loads es.js, en.js or la.js depending on _LANG_; all define the same names.
// In the .js they are used directly (str_xxx) or via t(str_xxx, arg) replacing ${0}, ${1}...

// --- Generic framework constants (before: _includes_/head.php) ---

const str_of        = 'de';
const str_row       = 'linea';
const str_item      = 'Res';
const str_copy      = 'Exscribe';
const str_page      = 'Pagina';
const str_vote      = 'suffragium';
const str_stars     = 'stellae';
const str_votes     = 'suffragia';
const str_price     = 'Pretium';
const str_accept    = 'Accipe';
const str_cancel    = 'Cancella';
const str_delete    = 'Dele';
const str_no_rating = 'Nulla aestimatio';

// --- Signer module constants (before: _modules_/signer/i18n.php) ---

const str_sgn_pass_mismatch     = 'Signa non congruunt.';
const str_sgn_need_pass_or_remember = 'Pone signum vel enable "Memento in hac machina" (saltem unum necessarium est).';
const str_sgn_pass_to_show      = 'Signum ad nsec revelandum:';
const str_sgn_autounlock_on     = 'Resolutio automatica in hac machina: activata';
const str_sgn_autounlock_off    = 'Resolutio automatica in hac machina: deactivata';
const str_sgn_disable           = 'deactiva';
const str_sgn_enable            = 'activa';
const str_sgn_autounlock_needpass = 'Haec identitas signum non habet: deactivare resolutionem automaticam clavem inaccessibilem redderet. Recrea identitatem cum signo si hunc modum vis.';
const str_sgn_invalid_nsec      = 'nsec invalidus. Debet esse nsec1... vel 64 hex characteres.';
const str_sgn_saved             = 'Identitas servata et resoluta.';
const str_sgn_wrong_pass        = 'Signum falsum.';
const str_sgn_forget_confirm    = 'Removere identitatem ex hoc navigatro? Si nullum exemplum nsec habes, eam IN AETERNUM perdes.';
const str_sgn_show_nsec_warn    = 'Clavis tua privata. NUNQUAM eam communices:';
const str_sgn_pair_connected    = 'Conexus ad "${0}". Hanc tabulam apertam tene ad signandum.';
const str_sgn_pair_error        = 'Error conexionis: ${0}';
const str_sgn_need_unlock       = 'Primo resolve identitatem.';
const str_sgn_no_clients        = 'Nullae applicationes adhuc conexae.';
const str_sgn_disconnect        = 'Disconexum';
const str_sgn_no_activity       = 'Nulla actio.';
const str_sgn_relays_connected  = 'relais: ${0} ex ${1} conexa';
const str_sgn_sign_request      = 'Petitio signaturae';
const str_sgn_app_wants_sign    = '"${0}" vult signare: ${1}';
const str_sgn_reject            = 'Reice';
const str_sgn_sign_once         = 'Signa';
const str_sgn_sign_remember     = 'Signa et memento huius generis (sessio)';
const str_sgn_rejected_by_user  = 'Reiectum ab utente';
const str_sgn_act_signed        = 'signatum';
const str_sgn_act_auto          = 'auto-signatum';
const str_sgn_act_rejected      = 'reiectum';
const str_sgn_act_connected     = 'conexum';
const str_sgn_grants_label      = 'auto-signa (haec sessio):';
const str_sgn_grant_revoke      = 'revoca';
const str_sgn_copied            = 'Exscriptum';
const str_sgn_backup_bad        = 'Error lectionis tergoris: ${0}';
const str_sgn_backup_pass       = 'Signum tergoris:';
const str_sgn_backup_wrong_pass = 'Signum falsum vel tergum corruptum.';
const str_sgn_backup_no_nsec    = 'Tergus nsec non habet.';
const str_sgn_words_prompt      = 'Typus 12 vel 24 verba spatiis separata:';
const str_sgn_need_12_words     = 'Debent esse 12 vel 24 verba (tu typusisti ${0}).';
const str_sgn_words_title       = 'Importare ex 12/24 verbis (BIP39)';
const str_sgn_words_path        = 'Via derivationis (si dubitas, serva normalem):';
const str_sgn_words_path_std    = 'Nostr normalis (NIP-06)';
const str_sgn_cancel            = 'Cancella';
const str_sgn_import            = 'Importa';
const str_sgn_generated         = 'Clavis nova generata. Preme "Serva identitatem".';
const str_sgn_nsec_empty        = 'Primo gener novam clavem vel importa exstantem.';
const str_sgn_derive_error      = 'Error derivationis clavis: ${0}';
const str_sgn_nsec_loaded       = 'Clavis加载. Preme "Serva identitatem".';
const str_sgn_app_wants_op      = '"${0}" petit: ${1}';
const str_sgn_allow             = 'Permitte';
const str_sgn_allow_remember    = 'Permitte et memento (sessio)';
const str_sgn_act_approved      = 'permissum';
const str_sgn_op_n44e           = 'nuntium cryptare (NIP-44)';
const str_sgn_op_n44d           = 'nuntium decryptare (NIP-44)';
const str_sgn_op_n04e           = 'nuntium cryptare (NIP-04 priscus)';
const str_sgn_op_n04d           = 'nuntium decryptare (NIP-04 priscus)';
const str_sgn_copy              = 'Exscribe';
const str_sgn_close             = 'Claude';
const str_sgn_rename            = 'renomina';
const str_sgn_rename_prompt     = 'Nomen novum huic applicationi:';
const str_sgn_words_bad_checksum = 'Summa checksum BIP39 invalida: verisimiliter verbum male scriptum vel ordine errato est. Importare tamen?';
const str_sgn_no_relays_warn    = 'Nulla conexio relay: applicationes nunc signatorem attingere non possunt.';
const str_sgn_show_nsec_title   = 'Clavis tua privata (nsec)';
const str_sgn_scan_point        = 'Dirige cameram ad codicem QR...';
const str_sgn_scan_failed       = 'Camera accedi non potuit.';
const str_sgn_scan_key_bad      = 'QR non continet nsec vel 12/24 verba BIP39 recognoscibilia.';
const str_sgn_qr_lib            = 'Bibliotheca QR non加载.';
const str_sgn_export_title      = 'Exportare tergum cryptatum';
const str_sgn_export_hint       = 'Fasciculus JSON cum nsec tuo cryptato (AES-GCM + PBKDF2) descendet. Hoc signo opus erit ad restituendum: si illud oblivisceris, tergus inutile est.';
const str_sgn_export_need_pass  = 'Pone signum ad tergum cryptandum.';
const str_sgn_export_go         = 'Descende';
const str_sgn_export_done       = 'Tergus descensum. Serva eum loco tuto.';
const str_sgn_pass_repeat       = 'Repete signum';
const str_sgn_file_plain_confirm = 'Sine signo fasciculus tuum nsec IN PLANO continebit: quicumque eum legerit tuam identitatem controllabit. Hoc fac solum si destinatio (USB, discus) iam cryptata est vel bene custodita. Descendere in plano?';
const str_sgn_session_only_confirm = 'Non elegisti ubi servaretur: identitas SOLUM in hac tabula vivet et evanescet cum eam claudes. Proxima vice opus erit nsec vel fasciculum iterum加载. Pergere?';
const str_sgn_session_only      = 'Identitas huic sessioni tantum: nihil in hac machina servatur.';
const str_sgn_mode_browser_t    = 'Modus navigatri';
const str_sgn_mode_browser      = 'Identitas cryptate servatur in hoc navigatro et hic resolvitur. Commendatur in computatro personali. Serva etiam exemplum (fasciculum vel nsec scriptum) ne navigatrum perdas.';
const str_sgn_mode_usb_t        = 'Modus USB';
const str_sgn_mode_usb          = 'Fasciculus cum tua identitate descendet (cryptatus si signum posuisti; in plano si non) et NIHIL in hoc computatro servabitur. Pone eum in tuo USB iuxta signatorem; ut iterum utaris: "Load JSON backup". Cum tabulam claudes, nulla vestigia remanent.';
const str_sgn_mode_both_t       = 'Modus mixtus';
const str_sgn_mode_both         = 'Servatur in hoc navigatro ET descendit ut fasciculus ad USB: commodus in hoc computatro, portabilis ad alios, et fasciculus duplex est tergus.';
const str_sgn_mode_session_t    = 'Modus sessionis tantum';
const str_sgn_mode_session      = 'Nusquam servatur: identitas vivit dum haec tabula aperta est et amittitur cum eam claudes. Utilis in computatris alienis si nsec vel fasciculum tecum portas.';

// Vexillum subsidii (stips in sats; inscriptio in relays.js)
const str_sgn_tip_title         = 'Progressum adiuva';
const str_sgn_tip_scan          = 'QR scanne aut inscriptionem lightning exscribe:';
const str_sgn_tip_choose        = 'Elige quantum conferre velis:';
const str_sgn_tip_generating    = 'Syngrapha generatur…';
const str_sgn_tip_payinv        = 'Scanne ut syngrapham solvas:';
const str_sgn_tip_failed        = 'Syngrapha generari non potuit. QR scanne aut inscriptionem exscribe:';

// --- DOM texts (before: inline t() in _modules_/signer/run.php) ---
// index.html applies them over [data-i18n] / [data-i18n-ph] / [data-i18n-title].

var SGN_DOM = {
    SIGNER_INTRO: 'Tuam clavem Nostr (nsec) cryptate in hoc navigatro tenet et eventus aliis applicationibus per NIP-46 (Nostr Connect) signat. Clavis tua hanc paginam numquam relinquit.',
    SIGNER_HELP_TITLE: 'Quomodo ea utaris',
    SIGNER_HELP_1T: 'Crea vel importa tuam identitatem.',
    SIGNER_HELP_1: 'Preme "Generare novam clavem" (move murem vel telephonum donec 100%) vel importa tuum nsec exstantem: eum premendo, ex tergo JSON vel ex 12/24 verbis tuis. Serva exemplum nsec alicubi tuto: si hoc navigatrum perdis et nullum exemplum habes, identitatem perdis.',
    SIGNER_HELP_2T: 'Protege eam.',
    SIGNER_HELP_2: 'Cum "Memento in hac machina" se automatice resolvit cum pagina aperitur (sicut sessio inita). Signum est stratum additum, commendatum in computatris communibus.',
    SIGNER_HELP_3T: 'Conecte applicationem.',
    SIGNER_HELP_3: 'Duae viae: (a) applicatio tibi ostendit inscriptionem nostrconnect:// — eam exscribe (vel eius codicem QR scane cum bulla camerae) et hic in "Conecte applicationem" preme (in noxtr: Login, Nostr Connect); vel (b) exscribe inscriptionem bunker:// ex hoc tabulato, vel scane eius codicem QR ex applicatione (semel tantum: renovatur post quamque conexionem).',
    SIGNER_HELP_4T: 'Approbationes signaturae.',
    SIGNER_HELP_4: 'Cum applicatio vult aliquid publicare, notitia cum contento hic apparebit. Potes semel signare, reicere, vel "memento huius generis" pro illa applicatione (permissiones memoratae purgantur cum pagina recolitur).',
    SIGNER_HELP_5T: 'Magni momenti: serva hanc tabulam apertam.',
    SIGNER_HELP_5: 'Signator tantum operatur dum pagina aperta et resoluta est. Si eam claudis vel premis "Claude", applicationes conexae signare non poterunt donec redeas.',
    SIGNER_HELP_6T: 'Mane in potestate.',
    SIGNER_HELP_6: 'In "Applicationes conexae" potes applicationem renominare, eius permissiones revocare vel eam disconectere; in "Actio" videre potes omnia quae signata vel reiecta sunt.',
    SIGNER_SETUP_TITLE: 'Crea vel importa tuam identitatem',
    SIGNER_SETUP_NSEC2: 'Clavis privata (nsec)',
    SIGNER_SETUP_NSEC_PH: 'nsec1... (genera novam vel importa eam cum bullis)',
    SIGNER_SHOW_HIDE: 'Ostende/Absconde',
    SIGNER_COPY: 'Exscribe',
    SIGNER_GENERATE_NEW: 'Generare novam clavem',
    SIGNER_LOAD_BACKUP2: 'Load tergum JSON',
    SIGNER_LOAD_WORDS2: '12/24 verba (BIP39)',
    SIGNER_SCAN_KEY_QR: 'Scane nsec/12 verba',
    SIGNER_ENTROPY_MOVE: 'Move murem / machinam circa screen donec 100% (puncta colorata pingentur):',
    SIGNER_ENTROPY_PH: 'Entropia hic in tempore reali ostendetur...',
    SIGNER_STORE_TITLE: 'Ubi servare tuam identitatem?',
    SIGNER_STORE_BROWSER: 'In hoc navigatro (cryptate servatur in hac machina)',
    SIGNER_STORE_FILE: 'In fasciculo descenso (ut eam in USB baculo portes)',
    SIGNER_REMEMBER_DEVICE: 'Memento in hac machina (resolutio automatica, commendatur)',
    SIGNER_ADD_PASS: 'Adde signum cryptationis (optio: stratum additum pro computatris communibus)',
    SIGNER_SETUP_PASS4: 'Signum',
    SIGNER_SETUP_PASS2: 'Repete signum',
    SIGNER_SETUP_SAVE: 'Serva identitatem',
    SIGNER_SETUP_HINT2: 'Nsec semper cryptate servatur in hoc navigatro. Cum resolutione automatica cryptatur cum clave interna non extractabili navigatri: quicumque hoc navigatri profilo utens poterit signare, sicut sessio inita. Signum est stratum additum (commendatur in computatris communibus) et semper necessarium est ad nsec revelandum. Serva exemplum nsec alicubi tuto.',
    SIGNER_LOCKED_TITLE: 'Identitas clausa',
    SIGNER_LOCKED_PASS: 'Signum',
    SIGNER_UNLOCK: 'Resolve',
    SIGNER_FORGET: 'Removere hanc identitatem ex hoc navigatro',
    SIGNER_IDENTITY_TITLE: 'Tua identitas',
    SIGNER_LOCK: 'Claude',
    SIGNER_SHOW_NSEC: 'Ostende nsec',
    SIGNER_EXPORT_BACKUP: 'Exportare tergum cryptatum',
    SIGNER_PAIR_TITLE: 'Conecte applicationem',
    SIGNER_PAIR_HINT: 'Preme hic inscriptionem nostrconnect:// quam applicatio clientis ostendit (in noxtr: Login → Nostr Connect).',
    SIGNER_PAIR: 'Conecte',
    SIGNER_SCAN_QR: 'Scane QR',
    SIGNER_SCAN_STOP: 'Claude cameram',
    SIGNER_BUNKER_HINT: '...vel exscribe hanc inscriptionem bunker:// et preme eam in applicationem clientis (semel tantum: renovatur post quamque conexionem):',
    SIGNER_CLIENTS_TITLE: 'Applicationes conexae',
    SIGNER_ACTIVITY_TITLE: 'Actio',
    SIGNER_BETA_WARNING: 'Versio Beta: signator nunc solitarie in suo dominio currit, sed adhuc in evolutione est. Semper serva tergum tuae clavis.',
    SIGNER_FLOSS: 'noxtr signer programma liberum et fonte aperto est, semperque erit. Si tibi utile est, progressum eius stipe in sats adiuvare potes.',
    SIGNER_SUPPORT: 'Progressum adiuva'
};
