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
    index: {
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
    custom_new_tab_title:{
        zh: "自定义新标签网址",
        en: "Customize New Tab URL",
        jp: "新規タブWebアドレスのカスタマイズ",
        de: "Neue Label-URL anpassen",
        vi: "Tùy chỉnh URL thẻ mới",
    },
    custom_new_tab_alert: {
        zh: "https:// 或 http:// 开头的完整网址",
        en: "The URL starting with https:// or http://",
        jp: "https:// または http:// 先頭の完全なURLサイト",
        de: "Vollständige URL, die mit https:// oder http:// beginnt",
        vi: "https:// hoặc http:// địa chỉ URL đầy đủ bắt đầu",
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
    help_msg_browser_set_change: {
        zh: "💡 初次开启本扩展时，浏览器会提示“保持更改”，请点击同意更改。",
        en: "💡 When first enabling this extension, the browser will prompt \"Keep change\", please click to agree to the change. ",
        jp: "💡 最初にこの拡張を開くと、ブラウザから「変更を保持する」というメッセージが表示されますので、変更に同意するをクリックしてください。",
        de: "💡 Wenn Sie diese Erweiterung zum ersten Mal aktivieren, wird der Browser aufgefordert, Änderungen beizubehalten. Bitte klicken Sie auf Änderungen zustimmen.",
        vi: "💡 Khi bạn mở tiện ích mở rộng này lần đầu tiên, trình duyệt sẽ nhắc \"Giữ thay đổi\" và nhấn Đồng ý thay đổi.",
    },
};