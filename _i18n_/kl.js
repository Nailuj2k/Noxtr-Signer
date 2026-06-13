// Noxtr Signer — i18n TLH (tlhIngan Hol / Klingon)
// batlh qI' — firma con honor. Huevo de pascua: klingon romanizado (Okrand),
// términos técnicos (nsec, QR, USB, JSON...) se quedan en estándar galáctico.
// Comillas dobles a propósito: el klingon está lleno de qaghwI' (').

// --- Constantes genéricas del framework ---

const str_of        = "vo'";
const str_row       = "mIr";
const str_item      = "Doch";
const str_copy      = "velqa'";
const str_page      = "nav";
const str_vote      = "wIv";
const str_stars     = "Hovmey";
const str_votes     = "wIvmey";
const str_price     = "DIl";
const str_accept    = "laj";
const str_cancel    = "qIl";
const str_delete    = "Qaw'";
const str_no_rating = "noH tu'lu'be'";

// --- Constantes del módulo signer ---

const str_sgn_pass_mismatch     = "rapbe' pegh mu'mey.";
const str_sgn_need_pass_or_remember = "pegh mu' yIchel pagh \"janvamDaq yIqaw\" yIchu' (wa' DIch poQlu').";
const str_sgn_pass_to_show      = "nsec 'anglu'meH pegh mu':";
const str_sgn_autounlock_on     = "janvamDaq ngaQHa'moH 'emrIlwI': chu'lu'";
const str_sgn_autounlock_off    = "janvamDaq ngaQHa'moH 'emrIlwI': chu'be'lu'";
const str_sgn_disable           = "chu'Ha'";
const str_sgn_enable            = "chu'";
const str_sgn_autounlock_needpass = "pegh mu' Hutlh qa'vam: ngaQHa'moH 'emrIlwI' DachU'Ha'chugh, ngeDbe'choH ngaQwI'. pegh mu' DaneHchugh, qa' yIchenqa'moH.";
const str_sgn_invalid_nsec      = "nsec muj. nsec1... pagh 64 hex DeghmeyDaq 'oHnIS.";
const str_sgn_saved             = "qa' pollu' 'ej ngaQHa'lu'.";
const str_sgn_wrong_pass        = "pegh mu' muj.";
const str_sgn_forget_confirm    = "De' nejwI'vamvo' qa' Qaw''a'? nsec velqa' DaHutlhchugh, reH Dachil. batlh yIqel!";
const str_sgn_show_nsec_warn    = "ngaQwI'lIj pegh. not yImaq:";
const str_sgn_pair_connected    = "\"${0}\" rarlu'. qI'meH pa'vam poSmoHtaH.";
const str_sgn_pair_error        = "rar Qagh: ${0}";
const str_sgn_need_unlock       = "qa' yIngaQHa'moH wa'DIch.";
const str_sgn_no_clients        = "wej App rarlu'.";
const str_sgn_disconnect        = "rarHa'";
const str_sgn_no_activity       = "vang tu'lu'be'.";
const str_sgn_relays_connected  = "relays: ${1} vo' ${0} rarlu'";
const str_sgn_sign_request      = "qI' tlhob";
const str_sgn_app_wants_sign    = "qI' neH \"${0}\": ${1}";
const str_sgn_reject            = "lajQo'";
const str_sgn_sign_once         = "qI'";
const str_sgn_sign_remember     = "qI' 'ej Segh yIqaw (bom)";
const str_sgn_rejected_by_user  = "lajQo' lo'wI'";
const str_sgn_act_signed        = "qI'lu'pu'";
const str_sgn_act_auto          = "'emrIl qI'lu'pu'";
const str_sgn_act_rejected      = "lajQo'lu'pu'";
const str_sgn_act_connected     = "rarlu'pu'";
const str_sgn_grants_label      = "'emrIl qI' (bomvam):";
const str_sgn_grant_revoke      = "teqqa'";
const str_sgn_copied            = "velqa' chenlu'pu'";
const str_sgn_backup_bad        = "backup laD Qagh: ${0}";
const str_sgn_backup_pass       = "backup pegh mu':";
const str_sgn_backup_wrong_pass = "pegh mu' muj pagh backup Duy'.";
const str_sgn_backup_no_nsec    = "nsec ngaSbe' backup.";
const str_sgn_words_prompt      = "12 pagh 24 mu'mey yIghItlh, chevmeH logh:";
const str_sgn_need_12_words     = "12 pagh 24 mu'mey nIqnIS (${0} DaghItlhpu').";
const str_sgn_words_title       = "12/24 mu'meyvo' lI' (BIP39)";
const str_sgn_words_path        = "He chenmoH (DaSovbe'chugh, motlh yIpol):";
const str_sgn_words_path_std    = "Nostr motlh (NIP-06)";
const str_sgn_cancel            = "qIl";
const str_sgn_import            = "lI'";
const str_sgn_generated        = "ngaQwI' chu' chenlu'pu'. \"qa' pol\" yI'uy.";
const str_sgn_nsec_empty        = "ngaQwI' chu' yIchenmoH wa'DIch pagh wa' Sar yIlI'.";
const str_sgn_derive_error      = "ngaQwI' chenmoH Qagh: ${0}";
const str_sgn_nsec_loaded       = "ngaQwI' tebllu'pu'. \"qa' pol\" yI'uy.";
const str_sgn_app_wants_op      = "tlhob \"${0}\": ${1}";
const str_sgn_allow             = "chaw'";
const str_sgn_allow_remember    = "chaw' 'ej yIqaw (bom)";
const str_sgn_act_approved      = "chaw'lu'pu'";
const str_sgn_op_n44e           = "QIn So' (NIP-44)";
const str_sgn_op_n44d           = "QIn So'Ha' (NIP-44)";
const str_sgn_op_n04e           = "QIn So' (NIP-04 tIQ)";
const str_sgn_op_n04d           = "QIn So'Ha' (NIP-04 tIQ)";
const str_sgn_copy              = "velqa'";
const str_sgn_close             = "SoQmoH";
const str_sgn_rename            = "pongqa'";
const str_sgn_rename_prompt     = "Appvam pong chu':";
const str_sgn_words_bad_checksum = "BIP39 checksum muj: mu' mujmoHlu'pu' pagh mIr mujlaw'. lI' 'ach?";
const str_sgn_no_relays_warn    = "relays rarbe'lu': DaH qI'wI' SIchlaHbe' Appmey.";
const str_sgn_show_nsec_title   = "ngaQwI'lIj pegh (nsec)";
const str_sgn_scan_point        = "QR Degh yIbej mIllogh qonwI'...";
const str_sgn_scan_failed       = "mIllogh qonwI' SIchlaHbe'lu'.";
const str_sgn_scan_key_bad      = "QRDaq nsec pagh 12/24 BIP39 mu'mey tu'lu'be'.";
const str_sgn_qr_lib            = "QR ghun teblu'be'.";
const str_sgn_export_title      = "backup So'lu'pu' yItatlh";
const str_sgn_export_hint       = "JSON teywI' SuqlU': nsec So'lu' (AES-GCM + PBKDF2). chenqa'moHmeH pegh mu'vam DapoQ: Dalijchugh, lI'be' backup.";
const str_sgn_export_need_pass  = "backup So'meH pegh mu' yIchel.";
const str_sgn_export_go         = "Suq";
const str_sgn_export_done       = "backup Suqlu'pu'. Daq QaDDaq yIpol.";
const str_sgn_pass_repeat       = "pegh mu' yIqaSqa'moH";
const str_sgn_file_plain_confirm = "pegh mu' Hutlhchugh, nsec So'BE' teywI': laDwI' Hoch qa'lIj ghaj. yIta' neH USB pagh jengva' So'lu'pu'chugh. So'be' Suq'a'?";
const str_sgn_session_only_confirm = "polmeH Daq DawIvbe'pu': pa'vamDaq neH yIntaH qa' 'ej SoQDI' Hegh. nsec pagh teywI' yIlI'qa'nIS. ruch'a'?";
const str_sgn_session_only      = "bomvam neH qa': De'wI'vamDaq pagh pollu'.";

// "nuqDaq pol?" tej: per Segh QIj (renderStoreInfo)
const str_sgn_mode_browser_t    = "De' nejwI' Segh";
const str_sgn_mode_browser      = "De' nejwI'vamDaq So'lu' qa' 'ej naDev ngaQHa'lu'. De'wI'lIjDaq 'utlh. velqa' yIchenmoH je (teywI' pagh nsec ghItlhlu'pu') De' nejwI' DachIlchugh.";
const str_sgn_mode_usb_t        = "USB Segh";
const str_sgn_mode_usb          = "qa'lIj ngaS teywI' DaSuq (pegh mu' Dachelchugh So'lu'; Dachelbe'chugh So'be') 'ej De'wI'vamDaq pagh pollu'. qI'wI' retlhDaq USBlIjDaq yIlan; lo'qa'meH: \"backup JSON lI'\". pa' SoQDI', pagh ghu' ratlh.";
const str_sgn_mode_both_t       = "Segh DuD";
const str_sgn_mode_both        = "De' nejwI'vamDaq pollu' 'EJ USB teywI' Suqlu': naDev ngeD, latlh DaqDaq leng, 'ej backup 'oH teywI''e'.";
const str_sgn_mode_session_t    = "bom neH Segh";
const str_sgn_mode_session      = "pagh DaqDaq pollu': pa' poStaHvIS neH yIntaH qa', SoQDI' Hegh. De'wI' nov lo'lu'DI' lI', nsec pagh teywI' Daqengchugh.";

// Qutlh vexillum (sats HuchHom; Daq: relays.js)
const str_sgn_tip_title         = "He'vam yIQutlh";
const str_sgn_tip_scan          = "QR yIqon pagh lightning Daq yIvelqa'moH:";
const str_sgn_tip_choose        = "'ar DanobrupmeH yIwIv:";
const str_sgn_tip_generating    = "DIlmeH jabbI'ID chenmoHlu'taH…";
const str_sgn_tip_payinv        = "DIlmeH jabbI'ID yIDIl; QR yIqon:";
const str_sgn_tip_failed        = "jabbI'ID chenmoHlu'laHbe'. QR yIqon pagh Daq yIvelqa'moH:";

// --- Textos del DOM ---

var SGN_DOM = {
    SIGNER_INTRO: "Nostr ngaQwI'lIj (nsec) So'lu'pu' De' nejwI'vamDaq 'avtaH 'ej latlh Appmey qI'meH NIP-46 (Nostr Connect) lo'. not navvam mej ngaQwI'lIj.",
    SIGNER_HELP_TITLE: "chay' lo'lu'",
    SIGNER_HELP_1T: "qa'lIj yIchenmoH pagh yIlI'.",
    SIGNER_HELP_1: "\"ngaQwI' chu' chenmoH\" yI'uy (100% SIchpa' mouse pagh telephone yIvIH) pagh nsec Sar yIlI': yIlan, backup JSONvo' pagh 12/24 mu'meylIjvo'. nsec velqa' Daq QaDDaq yIpol: De' nejwI'vam DachIlchugh 'ej velqa' DaHutlhchugh, qa' DachIl.",
    SIGNER_HELP_2T: "yI'av.",
    SIGNER_HELP_2: "\"janvamDaq yIqaw\" lo'lu'chugh, nav poSDI' nIteb ngaQHa''egh (bom poS rur). pegh mu' 'aqroS 'oH, De'wI' boqlu'bogh 'utlh.",
    SIGNER_HELP_3T: "App yIrar.",
    SIGNER_HELP_3: "cha' Hemey: (a) nostrconnect:// Daq DU'ang App — yIvelqa'moH (pagh QR yIqon mIllogh qonwI' leQ) 'ej naDev \"App rar\"Daq yIlan (noxtrDaq: Login, Nostr Connect); pagh (b) tejvam bunker:// Daq yIvelqa'moH, pagh QR yIqon Appvo' (wa'logh neH: rarchugh choHqa').",
    SIGNER_HELP_4T: "qI'mey yIchaw'.",
    SIGNER_HELP_4: "vay' maq neHchugh App, naDev ghum ngaS 'ang'eghmoH. wa'logh qI', lajQo', pagh \"Seghvam qaw\" Appvad (nav teblu'qa'DI' chaw'mey qawlu'pu'bogh Qaw'lu').",
    SIGNER_HELP_5T: "potlh: pa'vam poSmoHtaH.",
    SIGNER_HELP_5: "nav poStaHvIS 'ej ngaQHa'taHvIS neH vum qI'wI'. DaSoQmoHchugh pagh \"ngaQmoH\" DA'uychugh, qI'laHbe' Appmey rarlu'pu'bogh bIcheghpa'.",
    SIGNER_HELP_6T: "yISeH.",
    SIGNER_HELP_6: "\"Appmey rarlu'pu'\"Daq App Dapongqa'laH, chaw'mey Dateqqa'laH pagh DararHa'laH; \"vang\"Daq Hoch qI'lu'pu'bogh pagh lajQo'lu'pu'bogh Dalegh.",
    SIGNER_SETUP_TITLE: "qa'lIj chenmoH pagh lI'",
    SIGNER_SETUP_NSEC2: "ngaQwI' pegh (nsec)",
    SIGNER_SETUP_NSEC_PH: "nsec1... (chu' yIchenmoH pagh leQmey yIlo')",
    SIGNER_SHOW_HIDE: "'ang/So'",
    SIGNER_COPY: "velqa'",
    SIGNER_GENERATE_NEW: "ngaQwI' chu' chenmoH",
    SIGNER_LOAD_BACKUP2: "backup JSON lI'",
    SIGNER_LOAD_WORDS2: "12/24 mu'mey (BIP39)",
    SIGNER_SCAN_KEY_QR: "nsec/12 mu'mey qon",
    SIGNER_ENTROPY_MOVE: "100% SIchpa' mouse / jan yIvIH (rItlh Doqqu' ngoqlu'):",
    SIGNER_ENTROPY_PH: "naDev entropy 'anglu' poH teH...",
    SIGNER_STORE_TITLE: "nuqDaq qa'lIj pollu'?",
    SIGNER_STORE_BROWSER: "De' nejwI'vamDaq (De'wI'vamDaq So'lu'taH)",
    SIGNER_STORE_FILE: "teywI' Suqlu'boghDaq (USBDaq qengmeH)",
    SIGNER_REMEMBER_DEVICE: "janvamDaq yIqaw (ngaQHa'moH 'emrIlwI', 'utlh)",
    SIGNER_ADD_PASS: "pegh mu' So' yIchel (DuH: 'aqroS De'wI' boqlu'boghvad)",
    SIGNER_SETUP_PASS4: "pegh mu'",
    SIGNER_SETUP_PASS2: "pegh mu' yIqaSqa'moH",
    SIGNER_SETUP_SAVE: "qa' pol",
    SIGNER_SETUP_HINT2: "reH So'lu' nsec De' nejwI'vamDaq. ngaQHa'moH 'emrIlwI' lo'lu'chugh, De' nejwI' ngaQwI' qarDaq (teqlaHbe'lu'bogh) So'lu': De' nejwI' profile lo'bogh Hoch qI'laH, bom poS rur. pegh mu' 'aqroS 'oH (De'wI' boqlu'bogh 'utlh) 'ej nsec 'angmeH reH tlhoblu'. nsec velqa' Daq QaDDaq yIpol.",
    SIGNER_LOCKED_TITLE: "qa' ngaQlu'",
    SIGNER_LOCKED_PASS: "pegh mu'",
    SIGNER_UNLOCK: "ngaQHa'moH",
    SIGNER_FORGET: "De' nejwI'vamvo' qa'vam Qaw'",
    SIGNER_IDENTITY_TITLE: "qa'lIj",
    SIGNER_LOCK: "ngaQmoH",
    SIGNER_SHOW_NSEC: "nsec 'ang",
    SIGNER_EXPORT_BACKUP: "backup So'lu'pu' tatlh",
    SIGNER_PAIR_TITLE: "App rar",
    SIGNER_PAIR_HINT: "nostrconnect:// URI 'angbogh App naDev yIlan (noxtrDaq: Login → Nostr Connect).",
    SIGNER_PAIR: "rar",
    SIGNER_SCAN_QR: "QR qon",
    SIGNER_SCAN_STOP: "mIllogh qonwI' SoQmoH",
    SIGNER_BUNKER_HINT: "...pagh bunker:// Daqvam yIvelqa'moH 'ej App clientDaq yIlan (wa'logh neH: rarchugh choHqa'):",
    SIGNER_CLIENTS_TITLE: "Appmey rarlu'pu'",
    SIGNER_ACTIVITY_TITLE: "vang",
    SIGNER_BETA_WARNING: "beta: DaH mob qI'wI' juHDaq vumtaH, 'ach wej rInlu'. reH ngaQwI'lIj backup yIpol. Qapla'!",
    SIGNER_FLOSS: "ghun tlhab 'ej poS 'oH noxtr signer'e' — reH 'oHtaH. DulI'chugh, sats HuchHom DanobmeH He'vam DaQutlhlaH.",
    SIGNER_SUPPORT: "He'vam yIQutlh"
};
