
// 保存新标签网址
function save_href(){
    //
    const ele_input_href = document.getElementById("input-custom_new_tab_href");
    const ele_input_href_alert = document.getElementById("input-custom_new_tab_href-alert");
    const ele_btn_href = document.getElementById("input-custom_new_tab_btn");
    let timer_input_href_alert = 0;
    // 监听保存事件
    ele_btn_href.addEventListener("click", function(){
        let href = ele_input_href.value;
        //
        let alert_txt_old = func.get_language("custom_new_tab_alert");
        let alert_txt_yes = func.get_language("custom_new_tab_alert_yes");
        let alert_txt_no = func.get_language("custom_new_tab_alert_no");
        clearTimeout(timer_input_href_alert);
        //
        function remove_input_href_alert_font_color(){
            ele_input_href_alert.classList.remove("font-gray");
            ele_input_href_alert.classList.remove("font-blue");
            ele_input_href_alert.classList.remove("font-red");
        }
        //
        if (!func.is_url(href)){
            remove_input_href_alert_font_color();
            ele_input_href_alert.classList.add("font-red");
            //
            ele_input_href_alert.innerText = alert_txt_no;
            timer_input_href_alert = setInterval(function(){
                ele_input_href_alert.innerText = alert_txt_old;
                remove_input_href_alert_font_color();
                ele_input_href_alert.classList.add("font-gray");
                //
                ele_input_href.value = "";
                ele_input_href.focus();
            }, 3000);
        }else{
            remove_input_href_alert_font_color();
            ele_input_href_alert.classList.add("font-blue");
            //
            func.set_data("custom_new_tab_href", func.string_to_unicode(href)).then(value => {
                show_href();
            });
            //
            ele_input_href_alert.innerText = alert_txt_yes;
            timer_input_href_alert = setInterval(function(){
                ele_input_href_alert.innerText = alert_txt_old;
                remove_input_href_alert_font_color();
                ele_input_href_alert.classList.add("font-gray");
                //
            }, 6000);
        }
    });
}

// 展示已经设置的href
function show_href() {
    func.get_data("custom_new_tab_href").then(href => {
        if (href){href = func.unicode_to_string(href);}
        const ele_input_href = document.getElementById("input-custom_new_tab_href");
        ele_input_href.value = href;
    });
}


// 页面起始函数
function page_start(e){
    // 页面翻译
    func.set_language_title("popup");
    func.set_language_span();
    func.set_language_input_placeholder();

    //
    document.getElementById("settings-item-title-version").innerText = "v"+config.app_version;

    show_href();
    save_href();
}

// 页面加载完成后
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", page_start);
} else {
    page_start(2);
}