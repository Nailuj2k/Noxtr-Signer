// Noxtr Signer — i18n FR (Français)
// index.html charge le fichier de langue selon _LANG_ ; tous définissent les mêmes noms.

// --- Constantes genéricas del framework ---

const str_of        = 'de';
const str_row       = 'ligne';
const str_item      = 'Article';
const str_copy      = 'Copier';
const str_page      = 'Page';
const str_vote      = 'vote';
const str_stars     = 'étoiles';
const str_votes     = 'votes';
const str_price     = 'Prix';
const str_accept    = 'Accepter';
const str_cancel    = 'Annuler';
const str_delete    = 'Supprimer';
const str_no_rating = 'Pas de note';

// --- Constantes del módulo signer ---

const str_sgn_pass_mismatch     = 'Les mots de passe ne correspondent pas.';
const str_sgn_need_pass_or_remember = 'Définis un mot de passe ou active « Mémoriser sur cet appareil » (au moins l\'un des deux est requis).';
const str_sgn_pass_to_show      = 'Mot de passe pour afficher la nsec :';
const str_sgn_autounlock_on     = 'Déverrouillage automatique sur cet appareil : activé';
const str_sgn_autounlock_off    = 'Déverrouillage automatique sur cet appareil : désactivé';
const str_sgn_disable           = 'désactiver';
const str_sgn_enable            = 'activer';
const str_sgn_autounlock_needpass = 'Cette identité n\'a pas de mot de passe : si tu désactives le déverrouillage automatique, la clé deviendra inaccessible. Recrée l\'identité avec un mot de passe si tu veux ce mode.';
const str_sgn_invalid_nsec      = 'nsec invalide. Doit être nsec1... ou 64 caractères hexadécimaux.';
const str_sgn_saved             = 'Identité enregistrée et déverrouillée.';
const str_sgn_wrong_pass        = 'Mot de passe incorrect.';
const str_sgn_forget_confirm    = 'Supprimer l\'identité de ce navigateur ? Sans copie de la nsec, tu la perdras POUR TOUJOURS.';
const str_sgn_show_nsec_warn    = 'Ta clé privée. Ne la partage JAMAIS :';
const str_sgn_pair_connected    = 'Connecté à « ${0} ». Garde cet onglet ouvert pour signer.';
const str_sgn_pair_error        = 'Erreur de connexion : ${0}';
const str_sgn_need_unlock       = 'Déverrouille d\'abord l\'identité.';
const str_sgn_no_clients        = 'Aucune app connectée pour le moment.';
const str_sgn_disconnect        = 'Déconnecter';
const str_sgn_no_activity       = 'Aucune activité.';
const str_sgn_relays_connected  = 'relais : ${0} sur ${1} connectés';
const str_sgn_sign_request      = 'Demande de signature';
const str_sgn_app_wants_sign    = '« ${0} » veut signer : ${1}';
const str_sgn_reject            = 'Refuser';
const str_sgn_sign_once         = 'Signer';
const str_sgn_sign_remember     = 'Signer et mémoriser ce type (session)';
const str_sgn_rejected_by_user  = 'Refusé par l\'utilisateur';
const str_sgn_act_signed        = 'signé';
const str_sgn_act_auto          = 'auto-signé';
const str_sgn_act_rejected      = 'refusé';
const str_sgn_act_connected     = 'connectée';
const str_sgn_grants_label      = 'auto-signature (cette session) :';
const str_sgn_grant_revoke      = 'révoquer';
const str_sgn_copied            = 'Copié';
const str_sgn_backup_bad        = 'Erreur de lecture de la sauvegarde : ${0}';
const str_sgn_backup_pass       = 'Mot de passe de la sauvegarde :';
const str_sgn_backup_wrong_pass = 'Mot de passe incorrect ou sauvegarde corrompue.';
const str_sgn_backup_no_nsec    = 'La sauvegarde ne contient pas de nsec.';
const str_sgn_words_prompt      = 'Écris les 12 ou 24 mots séparés par des espaces :';
const str_sgn_need_12_words     = 'Il faut 12 ou 24 mots (tu en as écrit ${0}).';
const str_sgn_words_title       = 'Importer depuis 12/24 mots (BIP39)';
const str_sgn_words_path        = 'Chemin de dérivation (en cas de doute, garde le standard) :';
const str_sgn_words_path_std    = 'Nostr standard (NIP-06)';
const str_sgn_cancel            = 'Annuler';
const str_sgn_import            = 'Importer';
const str_sgn_generated        = 'Nouvelle clé générée. Appuie sur « Enregistrer l\'identité ».';
const str_sgn_nsec_empty        = 'Génère d\'abord une nouvelle clé ou importes-en une existante.';
const str_sgn_derive_error      = 'Erreur de dérivation de la clé : ${0}';
const str_sgn_nsec_loaded       = 'Clé chargée. Appuie sur « Enregistrer l\'identité ».';
const str_sgn_app_wants_op      = '« ${0} » demande : ${1}';
const str_sgn_allow             = 'Autoriser';
const str_sgn_allow_remember    = 'Autoriser et mémoriser (session)';
const str_sgn_act_approved      = 'autorisé';
const str_sgn_op_n44e           = 'chiffrer un message (NIP-44)';
const str_sgn_op_n44d           = 'déchiffrer un message (NIP-44)';
const str_sgn_op_n04e           = 'chiffrer un message (NIP-04, ancien)';
const str_sgn_op_n04d           = 'déchiffrer un message (NIP-04, ancien)';
const str_sgn_copy              = 'Copier';
const str_sgn_close             = 'Fermer';
const str_sgn_rename            = 'renommer';
const str_sgn_rename_prompt     = 'Nouveau nom pour cette app :';
const str_sgn_words_bad_checksum = 'Somme de contrôle BIP39 invalide : un mot est presque sûrement mal écrit ou dans le mauvais ordre. Importer quand même ?';
const str_sgn_no_relays_warn    = 'Aucune connexion aux relais : les apps ne peuvent pas joindre le signeur en ce moment.';
const str_sgn_show_nsec_title   = 'Ta clé privée (nsec)';
const str_sgn_scan_point        = 'Pointe la caméra vers le code QR...';
const str_sgn_scan_failed       = 'Impossible d\'accéder à la caméra.';
const str_sgn_scan_key_bad      = 'Le QR ne contient pas de nsec ni 12/24 mots BIP39 reconnaissables.';
const str_sgn_qr_lib            = 'Bibliothèque QR non chargée.';
const str_sgn_export_title      = 'Exporter une sauvegarde chiffrée';
const str_sgn_export_hint       = 'Un JSON avec ta nsec chiffrée (AES-GCM + PBKDF2) sera téléchargé. Ce mot de passe sera nécessaire pour le restaurer : si tu l\'oublies, la sauvegarde est inutilisable.';
const str_sgn_export_need_pass  = 'Définis un mot de passe pour chiffrer la sauvegarde.';
const str_sgn_export_go         = 'Télécharger';
const str_sgn_export_done       = 'Sauvegarde téléchargée. Garde-la en lieu sûr.';
const str_sgn_pass_repeat       = 'Répète le mot de passe';
const str_sgn_file_plain_confirm = 'Sans mot de passe, le fichier contiendra ta nsec EN CLAIR : quiconque le lit contrôle ton identité. Fais-le seulement si la destination (USB, disque) est déjà chiffrée ou bien gardée. Télécharger en clair ?';
const str_sgn_session_only_confirm = 'Tu n\'as pas choisi où enregistrer : l\'identité ne vivra QUE dans cet onglet et disparaîtra à sa fermeture. La prochaine fois, il faudra recharger la nsec ou le fichier. Continuer ?';
const str_sgn_session_only      = 'Identité pour cette session seulement : rien n\'a été enregistré sur cet ordinateur.';

// Panneau « où enregistrer ? » : étiquette + explication de chaque mode (renderStoreInfo)
const str_sgn_mode_browser_t    = 'Mode navigateur';
const str_sgn_mode_browser      = 'L\'identité reste chiffrée dans ce navigateur et se déverrouille ici. Recommandé sur ton ordinateur personnel. Fais aussi une copie (fichier ou nsec notée) au cas où tu perdrais ce navigateur.';
const str_sgn_mode_usb_t        = 'Mode USB';
const str_sgn_mode_usb          = 'Un fichier avec ton identité sera téléchargé (chiffré si tu mets un mot de passe ; en clair sinon) et RIEN ne sera enregistré sur cet ordinateur. Mets-le sur ta clé USB à côté du signeur ; pour la réutiliser : « Charger une sauvegarde JSON ». Onglet fermé, aucune trace.';
const str_sgn_mode_both_t       = 'Mode mixte';
const str_sgn_mode_both        = 'Enregistré dans ce navigateur ET téléchargé comme fichier pour la clé USB : pratique ici, portable ailleurs, et le fichier sert de sauvegarde.';
const str_sgn_mode_session_t    = 'Mode session seule';
const str_sgn_mode_session      = 'Enregistré nulle part : l\'identité vit tant que cet onglet est ouvert et se perd à sa fermeture. Utile sur les ordinateurs d\'autrui si tu portes la nsec ou le fichier avec toi.';

// Bannière de soutien (pourboires en sats ; adresse dans relays.js)
const str_sgn_tip_title         = 'Soutiens ce développement';
const str_sgn_tip_scan          = 'Scanne le QR ou copie l\'adresse lightning :';
const str_sgn_tip_choose        = 'Choisis combien tu veux contribuer :';
const str_sgn_tip_generating    = 'Génération de la facture…';
const str_sgn_tip_payinv        = 'Scanne pour payer la facture :';
const str_sgn_tip_failed        = 'Impossible de générer la facture. Scanne le QR ou copie l\'adresse :';

// --- Textos del DOM ---

var SGN_DOM = {
    SIGNER_INTRO: 'Garde ta clé Nostr (nsec) chiffrée dans ce navigateur et signe des événements pour d\'autres apps via NIP-46 (Nostr Connect). Ta clé ne quitte jamais cette page.',
    SIGNER_HELP_TITLE: 'Comment ça marche',
    SIGNER_HELP_1T: 'Crée ou importe ton identité.',
    SIGNER_HELP_1: 'Appuie sur « Générer une nouvelle clé » (bouge la souris ou le téléphone jusqu\'à 100 %) ou importe ta nsec existante : en la collant, depuis une sauvegarde JSON ou depuis tes 12/24 mots. Garde une copie de la nsec en lieu sûr : si tu perds ce navigateur sans copie, tu perds l\'identité.',
    SIGNER_HELP_2T: 'Protège-la.',
    SIGNER_HELP_2: 'Avec « Mémoriser sur cet appareil », elle se déverrouille toute seule à l\'ouverture de la page (comme une session active). Le mot de passe est une couche en plus, recommandée sur les ordinateurs partagés.',
    SIGNER_HELP_3T: 'Connecte une app.',
    SIGNER_HELP_3: 'Deux chemins : (a) l\'app te montre une adresse nostrconnect:// — copie-la (ou scanne son QR avec le bouton caméra) et colle-la ici dans « Connecter une app » (dans noxtr : Login, Nostr Connect) ; ou (b) copie l\'adresse bunker:// de ce panneau, ou scanne son QR depuis l\'app (valable une seule fois : elle se renouvelle après chaque connexion).',
    SIGNER_HELP_4T: 'Approuve les signatures.',
    SIGNER_HELP_4: 'Quand l\'app veut publier quelque chose, un avis avec le contenu apparaîtra ici. Tu peux signer une fois, refuser, ou « mémoriser ce type » pour cette app (les permissions mémorisées s\'effacent au rechargement de la page).',
    SIGNER_HELP_5T: 'Important : laisse cet onglet ouvert.',
    SIGNER_HELP_5: 'Le signeur ne fonctionne que tant que la page est ouverte et déverrouillée. Si tu la fermes ou appuies sur « Verrouiller », les apps connectées ne pourront plus signer jusqu\'à ton retour.',
    SIGNER_HELP_6T: 'Garde le contrôle.',
    SIGNER_HELP_6: 'Dans « Apps connectées », tu peux renommer une app, révoquer ses permissions ou la déconnecter ; dans « Activité », tu vois tout ce qui a été signé ou refusé.',
    SIGNER_SETUP_TITLE: 'Créer ou importer ton identité',
    SIGNER_SETUP_NSEC2: 'Clé privée (nsec)',
    SIGNER_SETUP_NSEC_PH: 'nsec1... (génères-en une nouvelle ou importe-la avec les boutons)',
    SIGNER_SHOW_HIDE: 'Afficher/Masquer',
    SIGNER_COPY: 'Copier',
    SIGNER_GENERATE_NEW: 'Générer une nouvelle clé',
    SIGNER_LOAD_BACKUP2: 'Charger une sauvegarde JSON',
    SIGNER_LOAD_WORDS2: '12/24 mots (BIP39)',
    SIGNER_SCAN_KEY_QR: 'Scanner nsec/12 mots',
    SIGNER_ENTROPY_MOVE: 'Bouge la souris / l\'appareil sur l\'écran jusqu\'à 100 % (des points colorés seront peints) :',
    SIGNER_ENTROPY_PH: 'L\'entropie s\'affichera ici en temps réel...',
    SIGNER_STORE_TITLE: 'Où enregistrer ton identité ?',
    SIGNER_STORE_BROWSER: 'Dans ce navigateur (elle reste chiffrée sur cet ordinateur)',
    SIGNER_STORE_FILE: 'Dans un fichier téléchargé (pour l\'emporter sur une clé USB)',
    SIGNER_REMEMBER_DEVICE: 'Mémoriser sur cet appareil (déverrouillage automatique, recommandé)',
    SIGNER_ADD_PASS: 'Ajouter un mot de passe de chiffrement (optionnel : couche en plus pour ordinateurs partagés)',
    SIGNER_SETUP_PASS4: 'Mot de passe',
    SIGNER_SETUP_PASS2: 'Répète le mot de passe',
    SIGNER_SETUP_SAVE: 'Enregistrer l\'identité',
    SIGNER_SETUP_HINT2: 'La nsec est toujours enregistrée chiffrée dans ce navigateur. Avec le déverrouillage automatique, elle est chiffrée avec une clé interne du navigateur (non extractible) : quiconque utilise ce profil du navigateur pourra signer, comme une session active. Le mot de passe est une couche en plus (recommandée sur les ordinateurs partagés) et il est toujours demandé pour afficher la nsec. Garde une copie de la nsec en lieu sûr.',
    SIGNER_LOCKED_TITLE: 'Identité verrouillée',
    SIGNER_LOCKED_PASS: 'Mot de passe',
    SIGNER_UNLOCK: 'Déverrouiller',
    SIGNER_FORGET: 'Supprimer cette identité de ce navigateur',
    SIGNER_IDENTITY_TITLE: 'Ton identité',
    SIGNER_LOCK: 'Verrouiller',
    SIGNER_SHOW_NSEC: 'Afficher la nsec',
    SIGNER_EXPORT_BACKUP: 'Exporter une sauvegarde chiffrée',
    SIGNER_PAIR_TITLE: 'Connecter une app',
    SIGNER_PAIR_HINT: 'Colle ici l\'URI nostrconnect:// que te montre l\'app cliente (dans noxtr : Login → Nostr Connect).',
    SIGNER_PAIR: 'Connecter',
    SIGNER_SCAN_QR: 'Scanner le QR',
    SIGNER_SCAN_STOP: 'Fermer la caméra',
    SIGNER_BUNKER_HINT: '...ou copie cette adresse bunker:// et colle-la dans l\'app cliente (usage unique : elle se renouvelle après chaque connexion) :',
    SIGNER_CLIENTS_TITLE: 'Apps connectées',
    SIGNER_ACTIVITY_TITLE: 'Activité',
    SIGNER_BETA_WARNING: 'Version bêta : le signeur tourne déjà isolé sur son propre domaine, mais il est encore en développement. Garde toujours une sauvegarde de ta clé.',
    SIGNER_FLOSS: 'noxtr signer est un logiciel libre et open source, et le restera toujours. S\'il t\'est utile, tu peux soutenir son développement avec un pourboire en sats.',
    SIGNER_SUPPORT: 'Soutiens ce développement'
};
