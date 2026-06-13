// Noxtr Signer — i18n ZH (简体中文)
// index.html 根据 _LANG_ 加载语言文件；所有文件定义相同的名称。

// --- Constantes genéricas del framework ---

const str_of        = '/';
const str_row       = '行';
const str_item      = '项目';
const str_copy      = '复制';
const str_page      = '页';
const str_vote      = '票';
const str_stars     = '星';
const str_votes     = '票';
const str_price     = '价格';
const str_accept    = '接受';
const str_cancel    = '取消';
const str_delete    = '删除';
const str_no_rating = '暂无评分';

// --- Constantes del módulo signer ---

const str_sgn_pass_mismatch     = '两次输入的密码不一致。';
const str_sgn_need_pass_or_remember = '请设置密码或启用"在此设备上记住"（至少需要其中一项）。';
const str_sgn_pass_to_show      = '显示 nsec 需要输入密码：';
const str_sgn_autounlock_on     = '此设备上的自动解锁：已启用';
const str_sgn_autounlock_off    = '此设备上的自动解锁：已停用';
const str_sgn_disable           = '停用';
const str_sgn_enable            = '启用';
const str_sgn_autounlock_needpass = '此身份没有密码：如果停用自动解锁，密钥将无法访问。如需此模式，请用密码重新创建身份。';
const str_sgn_invalid_nsec      = 'nsec 无效。必须是 nsec1... 或 64 位十六进制字符。';
const str_sgn_saved             = '身份已保存并解锁。';
const str_sgn_wrong_pass        = '密码错误。';
const str_sgn_forget_confirm    = '从此浏览器中删除身份？如果没有 nsec 的副本，你将永远失去它。';
const str_sgn_show_nsec_warn    = '你的私钥。绝对不要分享：';
const str_sgn_pair_connected    = '已连接到"${0}"。保持此标签页打开以便签名。';
const str_sgn_pair_error        = '连接错误：${0}';
const str_sgn_need_unlock       = '请先解锁身份。';
const str_sgn_no_clients        = '尚无已连接的应用。';
const str_sgn_disconnect        = '断开连接';
const str_sgn_no_activity       = '暂无活动。';
const str_sgn_relays_connected  = '中继：已连接 ${0}/${1}';
const str_sgn_sign_request      = '签名请求';
const str_sgn_app_wants_sign    = '"${0}" 想要签名：${1}';
const str_sgn_reject            = '拒绝';
const str_sgn_sign_once         = '签名';
const str_sgn_sign_remember     = '签名并记住此类型（本次会话）';
const str_sgn_rejected_by_user  = '已被用户拒绝';
const str_sgn_act_signed        = '已签名';
const str_sgn_act_auto          = '自动签名';
const str_sgn_act_rejected      = '已拒绝';
const str_sgn_act_connected     = '已连接';
const str_sgn_grants_label      = '自动签名（本次会话）：';
const str_sgn_grant_revoke      = '撤销';
const str_sgn_copied            = '已复制';
const str_sgn_backup_bad        = '读取备份出错：${0}';
const str_sgn_backup_pass       = '备份密码：';
const str_sgn_backup_wrong_pass = '密码错误或备份已损坏。';
const str_sgn_backup_no_nsec    = '备份中不包含 nsec。';
const str_sgn_words_prompt      = '请输入 12 或 24 个助记词，用空格分隔：';
const str_sgn_need_12_words     = '必须是 12 或 24 个词（你输入了 ${0} 个）。';
const str_sgn_words_title       = '从 12/24 个助记词导入（BIP39）';
const str_sgn_words_path        = '派生路径（如果不确定，请保留标准路径）：';
const str_sgn_words_path_std    = 'Nostr 标准（NIP-06）';
const str_sgn_cancel            = '取消';
const str_sgn_import            = '导入';
const str_sgn_generated        = '新密钥已生成。请点击"保存身份"。';
const str_sgn_nsec_empty        = '请先生成新密钥或导入现有密钥。';
const str_sgn_derive_error      = '派生密钥出错：${0}';
const str_sgn_nsec_loaded       = '密钥已加载。请点击"保存身份"。';
const str_sgn_app_wants_op      = '"${0}" 请求：${1}';
const str_sgn_allow             = '允许';
const str_sgn_allow_remember    = '允许并记住（本次会话）';
const str_sgn_act_approved      = '已允许';
const str_sgn_op_n44e           = '加密一条消息（NIP-44）';
const str_sgn_op_n44d           = '解密一条消息（NIP-44）';
const str_sgn_op_n04e           = '加密一条消息（NIP-04 旧版）';
const str_sgn_op_n04d           = '解密一条消息（NIP-04 旧版）';
const str_sgn_copy              = '复制';
const str_sgn_close             = '关闭';
const str_sgn_rename            = '重命名';
const str_sgn_rename_prompt     = '此应用的新名称：';
const str_sgn_words_bad_checksum = 'BIP39 校验和无效：几乎可以肯定有一个词拼写错误或顺序不对。仍然导入？';
const str_sgn_no_relays_warn    = '无法连接到中继：应用目前无法联系签名器。';
const str_sgn_show_nsec_title   = '你的私钥（nsec）';
const str_sgn_scan_point        = '将相机对准二维码...';
const str_sgn_scan_failed       = '无法访问相机。';
const str_sgn_scan_key_bad      = '二维码不包含可识别的 nsec 或 12/24 个 BIP39 助记词。';
const str_sgn_qr_lib            = '二维码库未加载。';
const str_sgn_export_title      = '导出加密备份';
const str_sgn_export_hint       = '将下载一个包含加密 nsec 的 JSON 文件（AES-GCM + PBKDF2）。恢复时需要此密码：如果忘记，备份将无法使用。';
const str_sgn_export_need_pass  = '请设置密码以加密备份。';
const str_sgn_export_go         = '下载';
const str_sgn_export_done       = '备份已下载。请妥善保管。';
const str_sgn_pass_repeat       = '重复密码';
const str_sgn_file_plain_confirm = '不设密码，文件将以明文包含你的 nsec：任何读到它的人都能控制你的身份。仅当目标位置（U盘、磁盘）已加密或保管妥当时才这样做。以明文下载？';
const str_sgn_session_only_confirm = '你没有选择保存位置：身份将只存在于此标签页中，关闭后即消失。下次需要重新加载 nsec 或文件。继续？';
const str_sgn_session_only      = '身份仅限本次会话：此电脑上未保存任何内容。';

// "保存位置"面板：每种模式的标签 + 说明（renderStoreInfo）
const str_sgn_mode_browser_t    = '浏览器模式';
const str_sgn_mode_browser      = '身份加密保存在此浏览器中并在此解锁。推荐在个人电脑上使用。另外请做一份副本（文件或抄写的 nsec），以防丢失此浏览器。';
const str_sgn_mode_usb_t        = 'U盘模式';
const str_sgn_mode_usb          = '将下载一个包含你身份的文件（设置密码则加密；否则为明文），此电脑上不会保存任何内容。把它和签名器一起放进U盘；再次使用时："加载 JSON 备份"。关闭标签页后不留痕迹。';
const str_sgn_mode_both_t       = '混合模式';
const str_sgn_mode_both        = '既保存在此浏览器中，又下载U盘文件：在这里方便，在别处便携，文件还可作为备份。';
const str_sgn_mode_session_t    = '仅会话模式';
const str_sgn_mode_session      = '不保存在任何地方：身份只在此标签页打开期间存在，关闭即丢失。如果随身携带 nsec 或文件，在别人的电脑上很有用。';

// 支持横幅（sats 小费；地址在 relays.js 中）
const str_sgn_tip_title         = '支持这个项目';
const str_sgn_tip_scan          = '扫描二维码或复制 lightning 地址：';
const str_sgn_tip_choose        = '选择你想贡献的金额：';
const str_sgn_tip_generating    = '正在生成发票…';
const str_sgn_tip_payinv        = '扫描以支付发票：';
const str_sgn_tip_failed        = '无法生成发票。请扫描二维码或复制地址：';

// --- Textos del DOM ---

var SGN_DOM = {
    SIGNER_INTRO: '将你的 Nostr 密钥（nsec）加密保管在此浏览器中，并通过 NIP-46（Nostr Connect）为其他应用签名事件。你的密钥永远不会离开此页面。',
    SIGNER_HELP_TITLE: '使用方法',
    SIGNER_HELP_1T: '创建或导入你的身份。',
    SIGNER_HELP_1: '点击"生成新密钥"（移动鼠标或手机直到 100%），或导入现有的 nsec：粘贴、从 JSON 备份或从你的 12/24 个助记词。把 nsec 的副本保存在安全的地方：如果丢失此浏览器又没有副本，身份将永久丢失。',
    SIGNER_HELP_2T: '保护它。',
    SIGNER_HELP_2: '启用"在此设备上记住"后，打开页面时会自动解锁（如同已登录的会话）。密码是额外的一层保护，建议在共用电脑上使用。',
    SIGNER_HELP_3T: '连接应用。',
    SIGNER_HELP_3: '两种方式：(a) 应用向你展示 nostrconnect:// 地址——复制它（或用相机按钮扫描其二维码）并粘贴到这里的"连接应用"（在 noxtr：Login、Nostr Connect）；或 (b) 复制本面板的 bunker:// 地址，或从应用扫描其二维码（一次性有效：每次连接后更新）。',
    SIGNER_HELP_4T: '审批签名。',
    SIGNER_HELP_4: '当应用想要发布内容时，这里会出现带有内容的通知。你可以签名一次、拒绝，或为该应用"记住此类型"（记住的权限在页面刷新后清除）。',
    SIGNER_HELP_5T: '重要：保持此标签页打开。',
    SIGNER_HELP_5: '签名器只在页面打开且解锁时工作。如果关闭页面或点击"锁定"，已连接的应用将无法签名，直到你回来。',
    SIGNER_HELP_6T: '保持掌控。',
    SIGNER_HELP_6: '在"已连接的应用"中可以重命名应用、撤销其权限或断开连接；在"活动"中可以看到所有已签名或已拒绝的记录。',
    SIGNER_SETUP_TITLE: '创建或导入你的身份',
    SIGNER_SETUP_NSEC2: '私钥（nsec）',
    SIGNER_SETUP_NSEC_PH: 'nsec1...（生成新的或用按钮导入）',
    SIGNER_SHOW_HIDE: '显示/隐藏',
    SIGNER_COPY: '复制',
    SIGNER_GENERATE_NEW: '生成新密钥',
    SIGNER_LOAD_BACKUP2: '加载 JSON 备份',
    SIGNER_LOAD_WORDS2: '12/24 个助记词（BIP39）',
    SIGNER_SCAN_KEY_QR: '扫描 nsec/12 个词',
    SIGNER_ENTROPY_MOVE: '在屏幕上移动鼠标/设备直到 100%（会画出彩色圆点）：',
    SIGNER_ENTROPY_PH: '熵将在这里实时显示...',
    SIGNER_STORE_TITLE: '把你的身份保存在哪里？',
    SIGNER_STORE_BROWSER: '在此浏览器中（加密保存在此电脑上）',
    SIGNER_STORE_FILE: '在下载的文件中（可放在U盘里随身携带）',
    SIGNER_REMEMBER_DEVICE: '在此设备上记住（自动解锁，推荐）',
    SIGNER_ADD_PASS: '添加加密密码（可选：共用电脑上的额外保护层）',
    SIGNER_SETUP_PASS4: '密码',
    SIGNER_SETUP_PASS2: '重复密码',
    SIGNER_SETUP_SAVE: '保存身份',
    SIGNER_SETUP_HINT2: 'nsec 始终加密保存在此浏览器中。使用自动解锁时，用浏览器内部不可提取的密钥加密：使用此浏览器配置文件的任何人都能签名，如同已登录的会话。密码是额外的一层保护（建议在共用电脑上使用），显示 nsec 时总是需要输入。请把 nsec 的副本保存在安全的地方。',
    SIGNER_LOCKED_TITLE: '身份已锁定',
    SIGNER_LOCKED_PASS: '密码',
    SIGNER_UNLOCK: '解锁',
    SIGNER_FORGET: '从此浏览器中删除此身份',
    SIGNER_IDENTITY_TITLE: '你的身份',
    SIGNER_LOCK: '锁定',
    SIGNER_SHOW_NSEC: '显示 nsec',
    SIGNER_EXPORT_BACKUP: '导出加密备份',
    SIGNER_PAIR_TITLE: '连接应用',
    SIGNER_PAIR_HINT: '把客户端应用显示的 nostrconnect:// URI 粘贴到这里（在 noxtr：Login → Nostr Connect）。',
    SIGNER_PAIR: '连接',
    SIGNER_SCAN_QR: '扫描二维码',
    SIGNER_SCAN_STOP: '关闭相机',
    SIGNER_BUNKER_HINT: '...或复制此 bunker:// 地址并粘贴到客户端应用中（一次性有效：每次连接后更新）：',
    SIGNER_CLIENTS_TITLE: '已连接的应用',
    SIGNER_ACTIVITY_TITLE: '活动',
    SIGNER_BETA_WARNING: '测试版：签名器已在独立域名上隔离运行，但仍在开发中。请始终保留密钥的备份。',
    SIGNER_FLOSS: 'noxtr signer 是自由开源软件，并将永远如此。如果它对你有用，可以用 sats 小费支持它的开发。',
    SIGNER_SUPPORT: '支持这个项目'
};
