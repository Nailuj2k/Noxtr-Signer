// Noxtr Signer — i18n JA (日本語)
// index.html は _LANG_ に応じて言語ファイルを読み込む。全ファイルが同じ名前を定義する。

// --- Constantes genéricas del framework ---

const str_of        = '/';
const str_row       = '行';
const str_item      = 'アイテム';
const str_copy      = 'コピー';
const str_page      = 'ページ';
const str_vote      = '票';
const str_stars     = '星';
const str_votes     = '票';
const str_price     = '価格';
const str_accept    = '承認';
const str_cancel    = 'キャンセル';
const str_delete    = '削除';
const str_no_rating = '評価なし';

// --- Constantes del módulo signer ---

const str_sgn_pass_mismatch     = 'パスワードが一致しません。';
const str_sgn_need_pass_or_remember = 'パスワードを設定するか「このデバイスで記憶する」を有効にしてください（少なくともどちらか一方が必要です）。';
const str_sgn_pass_to_show      = 'nsec を表示するためのパスワード：';
const str_sgn_autounlock_on     = 'このデバイスでの自動アンロック：有効';
const str_sgn_autounlock_off    = 'このデバイスでの自動アンロック：無効';
const str_sgn_disable           = '無効にする';
const str_sgn_enable            = '有効にする';
const str_sgn_autounlock_needpass = 'このアイデンティティにはパスワードがありません：自動アンロックを無効にすると、鍵にアクセスできなくなります。このモードを使うには、パスワード付きでアイデンティティを作り直してください。';
const str_sgn_invalid_nsec      = '無効な nsec です。nsec1... または 64 文字の16進数である必要があります。';
const str_sgn_saved             = 'アイデンティティを保存し、アンロックしました。';
const str_sgn_wrong_pass        = 'パスワードが違います。';
const str_sgn_forget_confirm    = 'このブラウザからアイデンティティを削除しますか？nsec のコピーがなければ、永遠に失われます。';
const str_sgn_show_nsec_warn    = 'あなたの秘密鍵です。絶対に共有しないでください：';
const str_sgn_pair_connected    = '「${0}」と接続しました。署名するにはこのタブを開いたままにしてください。';
const str_sgn_pair_error        = '接続エラー：${0}';
const str_sgn_need_unlock       = 'まずアイデンティティをアンロックしてください。';
const str_sgn_no_clients        = 'まだ接続されたアプリはありません。';
const str_sgn_disconnect        = '切断';
const str_sgn_no_activity       = 'アクティビティはありません。';
const str_sgn_relays_connected  = 'リレー：${1} 中 ${0} 接続中';
const str_sgn_sign_request      = '署名リクエスト';
const str_sgn_app_wants_sign    = '「${0}」が署名を求めています：${1}';
const str_sgn_reject            = '拒否';
const str_sgn_sign_once         = '署名';
const str_sgn_sign_remember     = '署名してこの種類を記憶（セッション中）';
const str_sgn_rejected_by_user  = 'ユーザーにより拒否されました';
const str_sgn_act_signed        = '署名済み';
const str_sgn_act_auto          = '自動署名';
const str_sgn_act_rejected      = '拒否済み';
const str_sgn_act_connected     = '接続済み';
const str_sgn_grants_label      = '自動署名（このセッション）：';
const str_sgn_grant_revoke      = '取り消す';
const str_sgn_copied            = 'コピーしました';
const str_sgn_backup_bad        = 'バックアップの読み込みエラー：${0}';
const str_sgn_backup_pass       = 'バックアップのパスワード：';
const str_sgn_backup_wrong_pass = 'パスワードが違うか、バックアップが破損しています。';
const str_sgn_backup_no_nsec    = 'バックアップに nsec が含まれていません。';
const str_sgn_words_prompt      = '12 または 24 の単語をスペース区切りで入力してください：';
const str_sgn_need_12_words     = '12 または 24 の単語が必要です（${0} 個入力されました）。';
const str_sgn_words_title       = '12/24 の単語からインポート（BIP39）';
const str_sgn_words_path        = '導出パス（わからなければ標準のままにしてください）：';
const str_sgn_words_path_std    = 'Nostr 標準（NIP-06）';
const str_sgn_cancel            = 'キャンセル';
const str_sgn_import            = 'インポート';
const str_sgn_generated        = '新しい鍵を生成しました。「アイデンティティを保存」を押してください。';
const str_sgn_nsec_empty        = 'まず新しい鍵を生成するか、既存の鍵をインポートしてください。';
const str_sgn_derive_error      = '鍵の導出エラー：${0}';
const str_sgn_nsec_loaded       = '鍵を読み込みました。「アイデンティティを保存」を押してください。';
const str_sgn_app_wants_op      = '「${0}」のリクエスト：${1}';
const str_sgn_allow             = '許可';
const str_sgn_allow_remember    = '許可して記憶（セッション中）';
const str_sgn_act_approved      = '許可済み';
const str_sgn_op_n44e           = 'メッセージの暗号化（NIP-44）';
const str_sgn_op_n44d           = 'メッセージの復号（NIP-44）';
const str_sgn_op_n04e           = 'メッセージの暗号化（NIP-04 レガシー）';
const str_sgn_op_n04d           = 'メッセージの復号（NIP-04 レガシー）';
const str_sgn_copy              = 'コピー';
const str_sgn_close             = '閉じる';
const str_sgn_rename            = '名前を変更';
const str_sgn_rename_prompt     = 'このアプリの新しい名前：';
const str_sgn_words_bad_checksum = 'BIP39 チェックサムが無効です：ほぼ確実に単語の綴りか順序が間違っています。それでもインポートしますか？';
const str_sgn_no_relays_warn    = 'リレーに接続できません：アプリは現在署名者に到達できません。';
const str_sgn_show_nsec_title   = 'あなたの秘密鍵（nsec）';
const str_sgn_scan_point        = 'カメラを QR コードに向けてください...';
const str_sgn_scan_failed       = 'カメラにアクセスできませんでした。';
const str_sgn_scan_key_bad      = 'QR に認識できる nsec または 12/24 個の BIP39 単語が含まれていません。';
const str_sgn_qr_lib            = 'QR ライブラリが読み込まれていません。';
const str_sgn_export_title      = '暗号化バックアップをエクスポート';
const str_sgn_export_hint       = '暗号化された nsec を含む JSON ファイル（AES-GCM + PBKDF2）がダウンロードされます。復元にはこのパスワードが必要です：忘れるとバックアップは使えません。';
const str_sgn_export_need_pass  = 'バックアップを暗号化するパスワードを設定してください。';
const str_sgn_export_go         = 'ダウンロード';
const str_sgn_export_done       = 'バックアップをダウンロードしました。安全な場所に保管してください。';
const str_sgn_pass_repeat       = 'パスワードを再入力';
const str_sgn_file_plain_confirm = 'パスワードなしでは、ファイルに nsec が平文で含まれます：読んだ人は誰でもあなたのアイデンティティを支配できます。保存先（USB、ディスク）が既に暗号化されているか厳重に管理されている場合のみにしてください。平文でダウンロードしますか？';
const str_sgn_session_only_confirm = '保存場所が選ばれていません：アイデンティティはこのタブの中だけに存在し、閉じると消えます。次回は nsec かファイルを再読み込みする必要があります。続行しますか？';
const str_sgn_session_only      = 'このセッション限りのアイデンティティ：このコンピュータには何も保存されていません。';

// 「どこに保存？」パネル：各モードのラベル + 説明（renderStoreInfo）
const str_sgn_mode_browser_t    = 'ブラウザモード';
const str_sgn_mode_browser      = 'アイデンティティはこのブラウザに暗号化されて残り、ここでアンロックされます。個人のコンピュータでおすすめです。このブラウザを失った場合に備えて、コピー（ファイルか書き留めた nsec）も作ってください。';
const str_sgn_mode_usb_t        = 'USBモード';
const str_sgn_mode_usb          = 'アイデンティティを含むファイルがダウンロードされ（パスワードを設定すれば暗号化、なければ平文）、このコンピュータには何も保存されません。署名者と一緒に USB メモリに入れてください。再利用するには「JSON バックアップを読み込む」。タブを閉じれば痕跡は残りません。';
const str_sgn_mode_both_t       = '混合モード';
const str_sgn_mode_both        = 'このブラウザに保存され、かつ USB 用ファイルもダウンロードされます：ここでは便利、他の場所では携帯可能、ファイルはバックアップにもなります。';
const str_sgn_mode_session_t    = 'セッション限定モード';
const str_sgn_mode_session      = 'どこにも保存されません：アイデンティティはこのタブが開いている間だけ存在し、閉じると失われます。nsec かファイルを持ち歩いていれば、他人のコンピュータで便利です。';

// 支援バナー（sats のチップ；アドレスは relays.js に）
const str_sgn_tip_title         = 'この開発を支援する';
const str_sgn_tip_scan          = 'QR をスキャンするか lightning アドレスをコピーしてください：';
const str_sgn_tip_choose        = 'いくら支援するか選んでください：';
const str_sgn_tip_generating    = '請求書を生成中…';
const str_sgn_tip_payinv        = 'QR をスキャンして請求書を支払ってください：';
const str_sgn_tip_failed        = '請求書を生成できませんでした。QR をスキャンするかアドレスをコピーしてください：';

// --- Textos del DOM ---

var SGN_DOM = {
    SIGNER_INTRO: 'あなたの Nostr 鍵（nsec）をこのブラウザに暗号化して保管し、NIP-46（Nostr Connect）経由で他のアプリのイベントに署名します。あなたの鍵がこのページを離れることはありません。',
    SIGNER_HELP_TITLE: '使い方',
    SIGNER_HELP_1T: 'アイデンティティを作成またはインポートする。',
    SIGNER_HELP_1: '「新しい鍵を生成」を押す（マウスやスマホを 100% まで動かす）か、既存の nsec をインポートします：貼り付け、JSON バックアップ、または 12/24 の単語から。nsec のコピーを安全な場所に保管してください：このブラウザを失ってコピーがなければ、アイデンティティを失います。',
    SIGNER_HELP_2T: '保護する。',
    SIGNER_HELP_2: '「このデバイスで記憶する」を使うと、ページを開いたときに自動でアンロックされます（ログイン済みセッションのように）。パスワードは追加の保護層で、共用コンピュータでおすすめです。',
    SIGNER_HELP_3T: 'アプリを接続する。',
    SIGNER_HELP_3: '2 つの方法：(a) アプリが nostrconnect:// アドレスを表示します — それをコピーして（またはカメラボタンで QR をスキャンして）ここの「アプリを接続」に貼り付けます（noxtr では：Login、Nostr Connect）；または (b) このパネルの bunker:// アドレスをコピーするか、アプリからその QR をスキャンします（1 回限り有効：接続のたびに更新されます）。',
    SIGNER_HELP_4T: '署名を承認する。',
    SIGNER_HELP_4: 'アプリが何かを公開しようとすると、ここに内容付きの通知が表示されます。1 回だけ署名、拒否、またはそのアプリに対して「この種類を記憶」できます（記憶された権限はページの再読み込みで消えます）。',
    SIGNER_HELP_5T: '重要：このタブを開いたままにする。',
    SIGNER_HELP_5: '署名者はページが開いていてアンロックされている間だけ動作します。閉じるか「ロック」を押すと、接続されたアプリはあなたが戻るまで署名できなくなります。',
    SIGNER_HELP_6T: 'コントロールを保つ。',
    SIGNER_HELP_6: '「接続済みアプリ」ではアプリの名前変更、権限の取り消し、切断ができます。「アクティビティ」では署名・拒否されたすべてが見られます。',
    SIGNER_SETUP_TITLE: 'アイデンティティを作成またはインポート',
    SIGNER_SETUP_NSEC2: '秘密鍵（nsec）',
    SIGNER_SETUP_NSEC_PH: 'nsec1...（新しく生成するかボタンでインポート）',
    SIGNER_SHOW_HIDE: '表示/非表示',
    SIGNER_COPY: 'コピー',
    SIGNER_GENERATE_NEW: '新しい鍵を生成',
    SIGNER_LOAD_BACKUP2: 'JSON バックアップを読み込む',
    SIGNER_LOAD_WORDS2: '12/24 の単語（BIP39）',
    SIGNER_SCAN_KEY_QR: 'nsec/12 単語をスキャン',
    SIGNER_ENTROPY_MOVE: '画面上でマウス/デバイスを 100% まで動かしてください（色付きの点が描かれます）：',
    SIGNER_ENTROPY_PH: 'エントロピーがここにリアルタイムで表示されます...',
    SIGNER_STORE_TITLE: 'アイデンティティをどこに保存しますか？',
    SIGNER_STORE_BROWSER: 'このブラウザに（このコンピュータに暗号化されて残ります）',
    SIGNER_STORE_FILE: 'ダウンロードするファイルに（USB メモリで持ち運ぶため）',
    SIGNER_REMEMBER_DEVICE: 'このデバイスで記憶する（自動アンロック、推奨）',
    SIGNER_ADD_PASS: '暗号化パスワードを追加（任意：共用コンピュータ向けの追加保護層）',
    SIGNER_SETUP_PASS4: 'パスワード',
    SIGNER_SETUP_PASS2: 'パスワードを再入力',
    SIGNER_SETUP_SAVE: 'アイデンティティを保存',
    SIGNER_SETUP_HINT2: 'nsec は常に暗号化されてこのブラウザに保存されます。自動アンロックでは、ブラウザ内部の取り出し不可能な鍵で暗号化されます：このブラウザのプロファイルを使う人は誰でも署名できます（ログイン済みセッションのように）。パスワードは追加の保護層で（共用コンピュータで推奨）、nsec の表示時には必ず要求されます。nsec のコピーを安全な場所に保管してください。',
    SIGNER_LOCKED_TITLE: 'アイデンティティはロック中',
    SIGNER_LOCKED_PASS: 'パスワード',
    SIGNER_UNLOCK: 'アンロック',
    SIGNER_FORGET: 'このアイデンティティをこのブラウザから削除',
    SIGNER_IDENTITY_TITLE: 'あなたのアイデンティティ',
    SIGNER_LOCK: 'ロック',
    SIGNER_SHOW_NSEC: 'nsec を表示',
    SIGNER_EXPORT_BACKUP: '暗号化バックアップをエクスポート',
    SIGNER_PAIR_TITLE: 'アプリを接続',
    SIGNER_PAIR_HINT: 'クライアントアプリが表示する nostrconnect:// URI をここに貼り付けてください（noxtr では：Login → Nostr Connect）。',
    SIGNER_PAIR: '接続',
    SIGNER_SCAN_QR: 'QR をスキャン',
    SIGNER_SCAN_STOP: 'カメラを閉じる',
    SIGNER_BUNKER_HINT: '...またはこの bunker:// アドレスをコピーしてクライアントアプリに貼り付けてください（1 回限り：接続のたびに更新されます）：',
    SIGNER_CLIENTS_TITLE: '接続済みアプリ',
    SIGNER_ACTIVITY_TITLE: 'アクティビティ',
    SIGNER_BETA_WARNING: 'ベータ版：署名者はすでに独自ドメインで隔離されて動作していますが、まだ開発中です。鍵のバックアップを常に保管してください。',
    SIGNER_FLOSS: 'noxtr signer は自由なオープンソースソフトウェアであり、これからもずっとそうです。役に立ったら、sats のチップで開発を支援できます。',
    SIGNER_SUPPORT: 'この開発を支援する'
};
