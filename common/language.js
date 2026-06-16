// 翻译对照表
const language_dict = {
    test: {
        zh: "测试", // 中文（包含繁体）
        en: "Test", // 英文（或默认英语）
        jp: "テスト", // 日文
        de: "Test", // 德语
        vi: "kiểm tra", // 越语
    },
    _null: {
        zh: "-空-",
        en: "-Null-",
        jp: "-空-",
        de: "-Leer-",
        vi: "-Trống rỗng-",
    },
    example: {
        zh: "举例页面",
        en: "Example Page",
        jp: "サンプルページ",
        de: "Beispielseite",
        vi: "Ví dụ trang",
    },
    index_new_tab: {
        zh: "新标签",
        en: "New Tab",
        jp: "新しいラベル",
        de: "Neues Tab",
        vi: "Thẻ mới",
    },
    popup: {
        zh: "tabPureHome：设置",
        en: "tabPureHome: Settings",
        jp: "tabPureHome：設定",
        de: "tabPureHome: Einstellung",
        vi: "tabPureHome: thiết lập",
    },
    app_name: {
        zh: "tabPureHome",
        en: "tabPureHome",
        jp: "tabPureHome",
        de: "tabPureHome",
        vi: "tabPureHome",
    },
    //
    opening: {
        zh: "正在打开",
        en: "Opening",
        jp: "開いています",
        de: "Wird geöffnet",
        vi: "Đang mở",
    },
    custom_new_tab_title:{
        zh: "自定义新标签网址",
        en: "Customize New Tab URL",
        jp: "新規タブWebアドレスのカスタマイズ",
        de: "Neue Label-URL anpassen",
        vi: "Tùy chỉnh URL thẻ mới",
    },
    input_placeholder_custom_new_tab_href: {
        zh: "输入完整网址",
        en: "Enter the complete URL",
        jp: "完全なWebアドレスを入力",
        de: "Geben Sie die vollständige URL ein",
        vi: "Nhập địa chỉ URL đầy đủ",
    },
    custom_new_tab_btn: {
        zh: "保 存",
        en: "Save",
        jp: "保存＃ホゾン＃",
        de: "Speichern",
        vi: "Tiết kiệm",
    },
    custom_new_tab_alert: {
        zh: "https:// 或 http:// 开头的完整网址，如 https://datathink.top/purehome ",
        en: "A fully qualified URL beginning with either \"https://\" or \"http://\", e.g., https://datathink.top/purehome ",
        jp: "\"https://\" または \"http://\" で始まる完全修飾URL（FQDN付きURL）。例: https://datathink.top/purehome ",
        de: "Eine vollqualifizierte URL, die mit \"https://\" oder \"http://\" beginnt, z. B. https://datathink.top/purehome ",
        vi: "Một URL đầy đủ (fully qualified URL) bắt đầu bằng \"https://\" hoặc \"http://\", ví dụ: https://datathink.top/purehome ",
    },
    custom_new_tab_alert_yes: {
        zh: "✅ 已保存",
        en: "✅ Saved",
        jp: "✅ 保存済み",
        de: "✅ Speichert",
        vi: "✅ Đã lưu",
    },
    custom_new_tab_alert_no: {
        zh: "❌ 更新失败",
        en: "❌ Save Failed",
        jp: "❌ 更新に失敗しました",
        de: "❌ Aktualisierung fehlgeschlagen",
        vi: "❌ Cập nhật thất bại",
    },
    custom_new_tab_alert_default: {
        zh: "✅ 已设置为默认网址",
        en: "✅ Using default URL",
        jp: "✅ デフォルトの URL アドレスに設定されています",
        de: "✅ Als Standard-URL festgelegt",
        vi: "✅ Nó được đặt làm địa chỉ URL mặc định.",
    },
    custom_new_tab_alert_blank: {
        zh: "✅ 填入空值时新标签页将为空",
        en: "✅ Input empty value, the new tab page will be blank.",
        jp: "✅ 値を空にすると、新しいタブページは空白になります。",
        de: "✅ Wenn Sie den Wert leer lassen, wird die neue Registerkarte leer sein.",
        vi: "✅ Nếu bạn để trống giá trị, trang tab mới sẽ trống.",
    },
    help_msg_browser_set_change: {
        zh: "💡 初次开启本扩展时，浏览器会提示“保持更改”，请点击同意更改。",
        en: "💡 When first enabling this extension, the browser will prompt \"Keep change\", please click to agree to the change. ",
        jp: "💡 最初にこの拡張を開くと、ブラウザから「変更を保持する」というメッセージが表示されますので、変更に同意するをクリックしてください。",
        de: "💡 Wenn Sie diese Erweiterung zum ersten Mal aktivieren, wird der Browser aufgefordert, Änderungen beizubehalten. Bitte klicken Sie auf Änderungen zustimmen.",
        vi: "💡 Khi bạn mở tiện ích mở rộng này lần đầu tiên, trình duyệt sẽ nhắc \"Giữ thay đổi\" và nhấn Đồng ý thay đổi.",
    },
    custom_a_target: {
        zh: "自定义页面链接的打开方式",
        en: "Customize the opening method of page links",
        jp: "ページリンクの開き方をカスタマイズする",
        de: "Anpassen Sie, wie Seitenlinks geöffnet werden",
        vi: "Cách mở liên kết trang tùy chỉnh",
    },
    custom_a_target_txt_default: {
        zh: "默认方式",
        en: "Default method",
        jp: "ページのデフォルトの開き方",
        de: "Standard-Öffnungsmethode der Seite",
        vi: "Cách mở trang mặc định",
    },
    custom_a_target_txt_self: {
        zh: "当前页面（_self）",
        en: "Current page (_self)",
        jp: "現在のページ (_self)",
        de: "Aktuelle Seite (_self)",
        vi: "Trang hiện tại (_self)",
    },
    custom_a_target_txt_blank: {
        zh: "新标签（_blank）",
        en: "New tab (_blank)",
        jp: "新しいタブ (_blank)",
        de: "Neue Registerkarte (_blank)",
        vi: "Tab mới (_blank)",
    },
    custom_a_target_alert: {
        zh: "✅ 已设置。手动刷新你的标签网页可启用。",
        en: "✅ Already set. Manually refreshing your tagged webpage can be enabled.",
        jp: "✅ 設定済み。タグページの手動更新で有効化できます。",
        de: "✅ Einrichtet. Die manuelle Aktualisierung Ihrer Tab-Seite ist aktiviert.",
        vi: "✅ Đã cài đặt. Bạn có thể bật nó bằng cách làm mới trang nhãn của bạn thủ công.",
    },
    help_msg_browser_set_a_target: {
        zh: "💡 修改页面所有 <a> 链接的 target 属性，对 JS 点击属性无效。",
        en: "💡 Modify the target attribute of all<a>links on the page, which is invalid for JS click attributes.",
        jp: "💡 ページのすべての＜a＞リンクのtarget属性を修正して、JSクリック属性に対して無効です。",
        de: "💡 Ändern Sie das target-Attribut für alle <a>-Links auf der Seite, so dass das JS-Klick-Attribut ungültig ist.",
        vi: "💡 Sửa đổi thuộc tính target của tất cả các liên kết<a>trên trang, không hợp lệ với thuộc tính JS Click.",
    },

};