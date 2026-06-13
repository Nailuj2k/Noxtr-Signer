// Noxtr Signer — i18n DE (Deutsch)
// index.html lädt die Sprachdatei laut _LANG_; alle definieren dieselben Namen.

// --- Constantes genéricas del framework ---

const str_of        = 'von';
const str_row       = 'Zeile';
const str_item      = 'Artikel';
const str_copy      = 'Kopieren';
const str_page      = 'Seite';
const str_vote      = 'Stimme';
const str_stars     = 'Sterne';
const str_votes     = 'Stimmen';
const str_price     = 'Preis';
const str_accept    = 'Akzeptieren';
const str_cancel    = 'Abbrechen';
const str_delete    = 'Löschen';
const str_no_rating = 'Keine Bewertung';

// --- Constantes del módulo signer ---

const str_sgn_pass_mismatch     = 'Die Passwörter stimmen nicht überein.';
const str_sgn_need_pass_or_remember = 'Setze ein Passwort oder aktiviere "Auf diesem Gerät merken" (mindestens eines ist nötig).';
const str_sgn_pass_to_show      = 'Passwort, um die nsec anzuzeigen:';
const str_sgn_autounlock_on     = 'Automatisches Entsperren auf diesem Gerät: aktiviert';
const str_sgn_autounlock_off    = 'Automatisches Entsperren auf diesem Gerät: deaktiviert';
const str_sgn_disable           = 'deaktivieren';
const str_sgn_enable            = 'aktivieren';
const str_sgn_autounlock_needpass = 'Diese Identität hat kein Passwort: Wenn du das automatische Entsperren deaktivierst, wird der Schlüssel unzugänglich. Erstelle die Identität mit Passwort neu, wenn du diesen Modus willst.';
const str_sgn_invalid_nsec      = 'Ungültige nsec. Muss nsec1... oder 64 Hex-Zeichen sein.';
const str_sgn_saved             = 'Identität gespeichert und entsperrt.';
const str_sgn_wrong_pass        = 'Falsches Passwort.';
const str_sgn_forget_confirm    = 'Identität aus diesem Browser entfernen? Ohne Kopie der nsec verlierst du sie FÜR IMMER.';
const str_sgn_show_nsec_warn    = 'Dein privater Schlüssel. Teile ihn NIEMALS:';
const str_sgn_pair_connected    = 'Verbunden mit "${0}". Lass diesen Tab zum Signieren offen.';
const str_sgn_pair_error        = 'Verbindungsfehler: ${0}';
const str_sgn_need_unlock       = 'Entsperre zuerst die Identität.';
const str_sgn_no_clients        = 'Noch keine App verbunden.';
const str_sgn_disconnect        = 'Trennen';
const str_sgn_no_activity       = 'Keine Aktivität.';
const str_sgn_relays_connected  = 'Relays: ${0} von ${1} verbunden';
const str_sgn_sign_request      = 'Signaturanfrage';
const str_sgn_app_wants_sign    = '"${0}" will signieren: ${1}';
const str_sgn_reject            = 'Ablehnen';
const str_sgn_sign_once         = 'Signieren';
const str_sgn_sign_remember     = 'Signieren und diesen Typ merken (Sitzung)';
const str_sgn_rejected_by_user  = 'Vom Benutzer abgelehnt';
const str_sgn_act_signed        = 'signiert';
const str_sgn_act_auto          = 'auto-signiert';
const str_sgn_act_rejected      = 'abgelehnt';
const str_sgn_act_connected     = 'verbunden';
const str_sgn_grants_label      = 'Auto-Signatur (diese Sitzung):';
const str_sgn_grant_revoke      = 'widerrufen';
const str_sgn_copied            = 'Kopiert';
const str_sgn_backup_bad        = 'Fehler beim Lesen des Backups: ${0}';
const str_sgn_backup_pass       = 'Backup-Passwort:';
const str_sgn_backup_wrong_pass = 'Falsches Passwort oder beschädigtes Backup.';
const str_sgn_backup_no_nsec    = 'Das Backup enthält keine nsec.';
const str_sgn_words_prompt      = 'Schreibe die 12 oder 24 Wörter, durch Leerzeichen getrennt:';
const str_sgn_need_12_words     = 'Es müssen 12 oder 24 Wörter sein (du hast ${0} geschrieben).';
const str_sgn_words_title       = 'Aus 12/24 Wörtern importieren (BIP39)';
const str_sgn_words_path        = 'Ableitungspfad (im Zweifel den Standard lassen):';
const str_sgn_words_path_std    = 'Nostr-Standard (NIP-06)';
const str_sgn_cancel            = 'Abbrechen';
const str_sgn_import            = 'Importieren';
const str_sgn_generated        = 'Neuer Schlüssel erzeugt. Drücke "Identität speichern".';
const str_sgn_nsec_empty        = 'Erzeuge zuerst einen neuen Schlüssel oder importiere einen bestehenden.';
const str_sgn_derive_error      = 'Fehler bei der Schlüsselableitung: ${0}';
const str_sgn_nsec_loaded       = 'Schlüssel geladen. Drücke "Identität speichern".';
const str_sgn_app_wants_op      = '"${0}" fordert an: ${1}';
const str_sgn_allow             = 'Erlauben';
const str_sgn_allow_remember    = 'Erlauben und merken (Sitzung)';
const str_sgn_act_approved      = 'erlaubt';
const str_sgn_op_n44e           = 'eine Nachricht verschlüsseln (NIP-44)';
const str_sgn_op_n44d           = 'eine Nachricht entschlüsseln (NIP-44)';
const str_sgn_op_n04e           = 'eine Nachricht verschlüsseln (NIP-04, alt)';
const str_sgn_op_n04d           = 'eine Nachricht entschlüsseln (NIP-04, alt)';
const str_sgn_copy              = 'Kopieren';
const str_sgn_close             = 'Schließen';
const str_sgn_rename            = 'umbenennen';
const str_sgn_rename_prompt     = 'Neuer Name für diese App:';
const str_sgn_words_bad_checksum = 'Ungültige BIP39-Prüfsumme: sehr wahrscheinlich ist ein Wort falsch geschrieben oder in falscher Reihenfolge. Trotzdem importieren?';
const str_sgn_no_relays_warn    = 'Keine Verbindung zu den Relays: Apps können den Signer gerade nicht erreichen.';
const str_sgn_show_nsec_title   = 'Dein privater Schlüssel (nsec)';
const str_sgn_scan_point        = 'Richte die Kamera auf den QR-Code...';
const str_sgn_scan_failed       = 'Kein Zugriff auf die Kamera möglich.';
const str_sgn_scan_key_bad      = 'Der QR-Code enthält keine erkennbare nsec und keine 12/24 BIP39-Wörter.';
const str_sgn_qr_lib            = 'QR-Bibliothek nicht geladen.';
const str_sgn_export_title      = 'Verschlüsseltes Backup exportieren';
const str_sgn_export_hint       = 'Eine JSON-Datei mit deiner verschlüsselten nsec (AES-GCM + PBKDF2) wird heruntergeladen. Zum Wiederherstellen brauchst du dieses Passwort: Wenn du es vergisst, ist das Backup nutzlos.';
const str_sgn_export_need_pass  = 'Setze ein Passwort, um das Backup zu verschlüsseln.';
const str_sgn_export_go         = 'Herunterladen';
const str_sgn_export_done       = 'Backup heruntergeladen. Bewahre es sicher auf.';
const str_sgn_pass_repeat       = 'Passwort wiederholen';
const str_sgn_file_plain_confirm = 'Ohne Passwort enthält die Datei deine nsec IM KLARTEXT: Wer sie liest, kontrolliert deine Identität. Tu das nur, wenn das Ziel (USB, Festplatte) bereits verschlüsselt oder gut verwahrt ist. Im Klartext herunterladen?';
const str_sgn_session_only_confirm = 'Du hast keinen Speicherort gewählt: Die Identität lebt NUR in diesem Tab und verschwindet beim Schließen. Beim nächsten Mal musst du die nsec oder die Datei erneut laden. Fortfahren?';
const str_sgn_session_only      = 'Identität nur für diese Sitzung: Nichts wurde auf diesem Rechner gespeichert.';

// Panel "wo speichern?": Titel + Erklärung je Modus (renderStoreInfo)
const str_sgn_mode_browser_t    = 'Browser-Modus';
const str_sgn_mode_browser      = 'Die Identität bleibt verschlüsselt in diesem Browser und wird hier entsperrt. Empfohlen auf deinem persönlichen Rechner. Mach zusätzlich eine Kopie (Datei oder notierte nsec), falls du diesen Browser verlierst.';
const str_sgn_mode_usb_t        = 'USB-Modus';
const str_sgn_mode_usb          = 'Eine Datei mit deiner Identität wird heruntergeladen (verschlüsselt mit Passwort; sonst im Klartext) und NICHTS wird auf diesem Rechner gespeichert. Leg sie auf deinen USB-Stick neben den Signer; zum Wiederverwenden: "JSON-Backup laden". Nach dem Schließen des Tabs bleibt keine Spur.';
const str_sgn_mode_both_t       = 'Gemischter Modus';
const str_sgn_mode_both        = 'Wird in diesem Browser gespeichert UND als Datei für den USB-Stick heruntergeladen: bequem hier, portabel anderswo, und die Datei dient als Backup.';
const str_sgn_mode_session_t    = 'Nur-Sitzung-Modus';
const str_sgn_mode_session      = 'Wird nirgends gespeichert: Die Identität lebt, solange dieser Tab offen ist, und geht beim Schließen verloren. Nützlich an fremden Rechnern, wenn du die nsec oder die Datei dabei hast.';

// Unterstützungsbanner (Trinkgeld in Sats; Adresse in relays.js)
const str_sgn_tip_title         = 'Unterstütze diese Entwicklung';
const str_sgn_tip_scan          = 'Scanne den QR oder kopiere die Lightning-Adresse:';
const str_sgn_tip_choose        = 'Wähle, wie viel du beitragen möchtest:';
const str_sgn_tip_generating    = 'Rechnung wird erstellt…';
const str_sgn_tip_payinv        = 'Scanne, um die Rechnung zu bezahlen:';
const str_sgn_tip_failed        = 'Rechnung konnte nicht erstellt werden. Scanne den QR oder kopiere die Adresse:';

// --- Textos del DOM ---

var SGN_DOM = {
    SIGNER_INTRO: 'Verwahrt deinen Nostr-Schlüssel (nsec) verschlüsselt in diesem Browser und signiert Events für andere Apps über NIP-46 (Nostr Connect). Dein Schlüssel verlässt diese Seite nie.',
    SIGNER_HELP_TITLE: 'So funktioniert es',
    SIGNER_HELP_1T: 'Erstelle oder importiere deine Identität.',
    SIGNER_HELP_1: 'Drücke "Neuen Schlüssel erzeugen" (bewege Maus oder Handy bis 100%) oder importiere deine bestehende nsec: durch Einfügen, aus einem JSON-Backup oder aus deinen 12/24 Wörtern. Bewahre eine Kopie der nsec sicher auf: Verlierst du diesen Browser ohne Kopie, verlierst du die Identität.',
    SIGNER_HELP_2T: 'Schütze sie.',
    SIGNER_HELP_2: 'Mit "Auf diesem Gerät merken" entsperrt sie sich beim Öffnen der Seite von selbst (wie eine aktive Sitzung). Das Passwort ist eine Extraschicht, empfohlen an geteilten Rechnern.',
    SIGNER_HELP_3T: 'Verbinde eine App.',
    SIGNER_HELP_3: 'Zwei Wege: (a) die App zeigt dir eine nostrconnect://-Adresse — kopiere sie (oder scanne ihren QR mit dem Kamera-Knopf) und füge sie hier bei "App verbinden" ein (in noxtr: Login, Nostr Connect); oder (b) kopiere die bunker://-Adresse dieses Panels oder scanne ihren QR aus der App (einmal gültig: erneuert sich nach jeder Verbindung).',
    SIGNER_HELP_4T: 'Genehmige die Signaturen.',
    SIGNER_HELP_4: 'Wenn die App etwas veröffentlichen will, erscheint hier ein Hinweis mit dem Inhalt. Du kannst einmal signieren, ablehnen oder "diesen Typ merken" für diese App (gemerkte Berechtigungen werden beim Neuladen gelöscht).',
    SIGNER_HELP_5T: 'Wichtig: Lass diesen Tab offen.',
    SIGNER_HELP_5: 'Der Signer arbeitet nur, solange die Seite offen und entsperrt ist. Wenn du sie schließt oder "Sperren" drückst, können verbundene Apps nicht mehr signieren, bis du zurückkommst.',
    SIGNER_HELP_6T: 'Behalte die Kontrolle.',
    SIGNER_HELP_6: 'Unter "Verbundene Apps" kannst du eine App umbenennen, ihre Berechtigungen widerrufen oder sie trennen; unter "Aktivität" siehst du alles, was signiert oder abgelehnt wurde.',
    SIGNER_SETUP_TITLE: 'Deine Identität erstellen oder importieren',
    SIGNER_SETUP_NSEC2: 'Privater Schlüssel (nsec)',
    SIGNER_SETUP_NSEC_PH: 'nsec1... (neu erzeugen oder mit den Knöpfen importieren)',
    SIGNER_SHOW_HIDE: 'Anzeigen/Verbergen',
    SIGNER_COPY: 'Kopieren',
    SIGNER_GENERATE_NEW: 'Neuen Schlüssel erzeugen',
    SIGNER_LOAD_BACKUP2: 'JSON-Backup laden',
    SIGNER_LOAD_WORDS2: '12/24 Wörter (BIP39)',
    SIGNER_SCAN_KEY_QR: 'nsec/12 Wörter scannen',
    SIGNER_ENTROPY_MOVE: 'Bewege Maus / Gerät über den Bildschirm bis 100% (bunte Punkte werden gemalt):',
    SIGNER_ENTROPY_PH: 'Die Entropie wird hier in Echtzeit angezeigt...',
    SIGNER_STORE_TITLE: 'Wo soll deine Identität gespeichert werden?',
    SIGNER_STORE_BROWSER: 'In diesem Browser (bleibt verschlüsselt auf diesem Rechner)',
    SIGNER_STORE_FILE: 'In einer heruntergeladenen Datei (zum Mitnehmen auf USB)',
    SIGNER_REMEMBER_DEVICE: 'Auf diesem Gerät merken (automatisches Entsperren, empfohlen)',
    SIGNER_ADD_PASS: 'Verschlüsselungspasswort hinzufügen (optional: Extraschicht für geteilte Rechner)',
    SIGNER_SETUP_PASS4: 'Passwort',
    SIGNER_SETUP_PASS2: 'Passwort wiederholen',
    SIGNER_SETUP_SAVE: 'Identität speichern',
    SIGNER_SETUP_HINT2: 'Die nsec wird in diesem Browser immer verschlüsselt gespeichert. Mit automatischem Entsperren wird sie mit einem internen, nicht extrahierbaren Browserschlüssel verschlüsselt: Wer dieses Browserprofil benutzt, kann signieren, wie bei einer aktiven Sitzung. Das Passwort ist eine Extraschicht (empfohlen an geteilten Rechnern) und wird zum Anzeigen der nsec immer verlangt. Bewahre eine Kopie der nsec sicher auf.',
    SIGNER_LOCKED_TITLE: 'Identität gesperrt',
    SIGNER_LOCKED_PASS: 'Passwort',
    SIGNER_UNLOCK: 'Entsperren',
    SIGNER_FORGET: 'Diese Identität aus diesem Browser entfernen',
    SIGNER_IDENTITY_TITLE: 'Deine Identität',
    SIGNER_LOCK: 'Sperren',
    SIGNER_SHOW_NSEC: 'nsec anzeigen',
    SIGNER_EXPORT_BACKUP: 'Verschlüsseltes Backup exportieren',
    SIGNER_PAIR_TITLE: 'App verbinden',
    SIGNER_PAIR_HINT: 'Füge hier die nostrconnect://-URI ein, die dir die Client-App zeigt (in noxtr: Login → Nostr Connect).',
    SIGNER_PAIR: 'Verbinden',
    SIGNER_SCAN_QR: 'QR scannen',
    SIGNER_SCAN_STOP: 'Kamera schließen',
    SIGNER_BUNKER_HINT: '...oder kopiere diese bunker://-Adresse und füge sie in die Client-App ein (einmal gültig: erneuert sich nach jeder Verbindung):',
    SIGNER_CLIENTS_TITLE: 'Verbundene Apps',
    SIGNER_ACTIVITY_TITLE: 'Aktivität',
    SIGNER_BETA_WARNING: 'Beta-Version: Der Signer läuft bereits isoliert auf eigener Domain, ist aber noch in Entwicklung. Bewahre immer ein Backup deines Schlüssels auf.',
    SIGNER_FLOSS: 'noxtr signer ist freie und quelloffene Software – und wird es immer bleiben. Wenn er dir nützlich ist, kannst du die Entwicklung mit einem Trinkgeld in Sats unterstützen.',
    SIGNER_SUPPORT: 'Unterstütze diese Entwicklung'
};
