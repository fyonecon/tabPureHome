// 设置 target mode 选中

let custom_insert_css_font_alert_timer = 0;

// ele
const modeFontDefault = document.getElementById('modeFontDefault');
const modeFontReplace = document.getElementById('modeFontReplace');
const custom_insert_css_font_alert = document.getElementById('radio-custom_insert_css_font-alert');
const radioAlert2 = document.getElementById('radioAlert2');

// 渲染选中UI
function show_insert_css_font_radio() {
    func.get_data("custom_insert_css_font_mode").then(mode => {
        // 更新UI选中样式
        if (mode === '_replace') {
            modeFontReplace.checked = true;
        } else { // _default or ""
            modeFontDefault.checked = true;
        }
        console.log("show=", mode);
    });
}

// 保存模式数据
function set_insert_css_font_radio_mode(mode) {
    console.log("set=", mode);
    clearTimeout(custom_insert_css_font_alert_timer);
    func.set_data('custom_insert_css_font_mode', mode).then(mode => {
        // alert
        custom_insert_css_font_alert.classList.remove('font-gray');
        custom_insert_css_font_alert.classList.add('font-blue');
        //
        custom_insert_css_font_alert.innerText = func.get_language("custom_insert_css_font_alert") + ": " + mode.toUpperCase();
        radioAlert2.classList.remove("hide");
        custom_insert_css_font_alert_timer = setInterval(() => {
            custom_insert_css_font_alert.classList.remove('font-blue');
            custom_insert_css_font_alert.classList.add('font-gray');
            //
            custom_insert_css_font_alert.innerText = "";
            radioAlert2.classList.add("hide");
        }, 5000);
        //
        show_insert_css_font_radio();
    });
}

// 监听Radio单选
modeFontDefault.addEventListener('change', async () => {
    if (modeFontDefault.checked) {
        set_insert_css_font_radio_mode('_default');
    }
});
modeFontReplace.addEventListener('change', async () => {
    if (modeFontReplace.checked) {
        set_insert_css_font_radio_mode('_replace');
    }
});