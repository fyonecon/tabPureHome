const div_index_new_tab = document.getElementById("div_index_new_tab");
const index_new_tab_msg = document.getElementById("index_new_tab_msg");

// 手动打开页面
function click_open_href(href){
    div_index_new_tab.addEventListener('click', async () => {
        func.goto_href(href, "_replace");
    });
}

//
function task_new_tab(){
    func.get_data("custom_new_tab_href").then(href => {
        if (href){href = func.unicode_to_string(href);}
        let msg = "";
        //
        if (func.is_url(href)){
            msg = func.get_language("opening")+" 👉 " + href;
        }else{ // 空值或不符合规范的href
            href = "about:blank"; // "about:blank"，不能为""
            msg = "Error Opening 👉 " + href;
        }
        //
        document.title = msg;
        index_new_tab_msg.innerText = msg;
        // 页面故障时，可以手动打开页面
        click_open_href(href);
        // 自动打开页面
        func.goto_href(href, "_replace");
    });
}

// 页面起始函数
function page_start(e){
    popup_init_data("page-index_new_tab");

    // 页面翻译
    func.set_language_title("index_new_tab");
    func.set_language_span();
    // 执行跳转
    task_new_tab();

    // 其他
}

// 页面加载完成后或页面可见时
(function (){
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", page_start);
    } else {
        page_start(2);
    }
    //
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) { // onHide
            //
        } else { // onShow
            page_start(3);
        }
    });
})();

