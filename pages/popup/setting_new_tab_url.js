// 保存新标签网址
function watch_save_href(){
    //
    const ele_input_href = document.getElementById("input-custom_new_tab_href");
    const ele_input_href_alert = document.getElementById("input-custom_new_tab_href-alert");
    const ele_input_href_alert_example = document.getElementById("input-custom_new_tab_href-alert-example");
    const ele_btn_href = document.getElementById("input-custom_new_tab_btn");
    let timer_input_href_alert = 0;
    // 监听保存事件
    ele_btn_href.addEventListener("click", function(){
        let href = ele_input_href.value.trim(); // 取值范围：""填入值, "about:blank"init或将使用默认网址, "-正常链接-"填入值
        //
        let alert_txt_old = func.get_language("custom_new_tab_alert");
        let alert_txt_yes = func.get_language("custom_new_tab_alert_yes");
        let alert_txt_no = func.get_language("custom_new_tab_alert_no");
        let alert_txt_default= func.get_language("custom_new_tab_alert_default");
        let alert_txt_blank = func.get_language("custom_new_tab_alert_blank");
        clearTimeout(timer_input_href_alert);

        //
        function remove_input_href_alert_font_color(){
            ele_input_href_alert.classList.remove("font-gray");
            ele_input_href_alert.classList.remove("font-blue");
            ele_input_href_alert.classList.remove("font-red");
        }

        //
        if (!func.is_url(href)){ // 错误
            if (!href){ // 空URL（可以填入空值，新标签页将是空白）
                ele_input_href_alert.innerText = alert_txt_old;
                ele_input_href_alert_example.classList.add("hide");
                remove_input_href_alert_font_color();
                ele_input_href_alert.classList.add("font-gray");
                // save
                func.set_data("custom_new_tab_href", "").then(_href => {
                    ele_input_href.value = "";
                });
                // alert
                ele_input_href_alert.innerText = alert_txt_blank;
                timer_input_href_alert = setInterval(function(){
                    ele_input_href_alert.innerText = alert_txt_old;
                    ele_input_href_alert_example.classList.remove("hide");
                    remove_input_href_alert_font_color();
                    ele_input_href_alert.classList.add("font-gray");
                    //
                    ele_input_href.focus();
                }, 5000);
            }else{ // 错误格式的URL
                remove_input_href_alert_font_color();
                ele_input_href_alert.classList.add("font-red");
                // alert
                ele_input_href_alert.innerText = alert_txt_no;
                ele_input_href_alert_example.classList.add("hide");
                timer_input_href_alert = setInterval(function(){
                    ele_input_href_alert.innerText = alert_txt_old;
                    ele_input_href_alert_example.classList.remove("hide");
                    remove_input_href_alert_font_color();
                    ele_input_href_alert.classList.add("font-gray");
                    //
                    ele_input_href.value = "";
                    ele_input_href.focus();
                }, 5000);
            }
        }else{ // URL正确
            remove_input_href_alert_font_color();
            ele_input_href_alert.classList.add("font-blue");
            // Save
            func.set_data("custom_new_tab_href", func.string_to_unicode(href)).then(_href => {
                ele_input_href.value = func.unicode_to_string(_href);
            });
            // alert
            ele_input_href_alert.innerText = alert_txt_yes;
            ele_input_href_alert_example.classList.add("hide");
            timer_input_href_alert = setInterval(function(){
                ele_input_href_alert.innerText = alert_txt_old;
                ele_input_href_alert_example.classList.remove("hide");
                remove_input_href_alert_font_color();
                ele_input_href_alert.classList.add("font-gray");
                //
            }, 5000);
        }
    });
}

// 展示已经设置的href
function show_href() {
    func.get_data("custom_new_tab_href").then(href => {
        if(href){href = func.unicode_to_string(href);}  // 已设置的正确数据
        // 在input里面显示网址
        const ele_input_href = document.getElementById("input-custom_new_tab_href");
        ele_input_href.value = href;
    });
}