
//
function task_new_tab(){
    func.get_data("custom_new_tab_href").then(href => {
        if (!href){href = config.default_new_tab_href;}else{href = func.unicode_to_string(href);}
        //
        if (func.is_url(href)){
            func.goto_href(href, "_replace");
        }else{
            document.getElementsByClassName("index-msg")[0].innerHTML = "Error Href: " + href;
        }
    });
}

// 页面起始函数
function page_start(e){
    // console.log("Index信息=", e, [navigator.languages, func.get_theme(), func.get_language("test"), func.is_extension()]);
    // 页面翻译
    func.set_language_title("index");
    func.set_language_span();
    //
    task_new_tab();
}

// 页面加载完成后
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", page_start);
} else {
    page_start(2);
}

