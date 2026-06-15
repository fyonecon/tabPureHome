
//
function task_new_tab(){
    func.get_data("custom_new_tab_href").then(href => {
        if (!href){href = config.default_new_tab_href;}else{href = func.unicode_to_string(href);}
        //
        if (func.is_url(href)){
            func.goto_href(href, "_replace");
        }else{
            document.getElementsByClassName("index_new_tab-msg")[0].innerText = "Error Href: " + href;
        }
    });
}

// 页面起始函数
function page_start(e){
    // 生成随机UID（注意，此值仅用于匿名调试）
    // func.get_data("app_uid").then(uid => {
    //     if (!uid){func.set_data("app_uid", func.make_app_uid()).then(res =>{}) ;}
    // });
    // 页面翻译
    func.set_language_title("index_new_tab");
    func.set_language_span();
    // 执行跳转
    task_new_tab();

    // 其他
}

// 页面加载完成后
(function (){
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", page_start);
    } else {
        page_start(2);
    }
})();

