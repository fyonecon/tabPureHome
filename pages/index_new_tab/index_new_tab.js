const div_index_new_tab = document.getElementById("div_index_new_tab");
const index_new_tab_msg = document.getElementById("index_new_tab_msg");
const index_new_tab_iframe = document.getElementById("index_new_tab_iframe");
let nav_info_timer = 0;
let iframe_onerror_timer = 0;

// 手动打开页面
function click_open_href(href){
    div_index_new_tab.addEventListener('click', async () => {
        func.goto_href(href, "_replace");
    });
}

// 用iframe打开白名单链接
function iframe_open_default_url(href= config.default_new_tab_href){
    index_new_tab_iframe.setAttribute("data-src", href);
    index_new_tab_iframe.src = href;

    // 失败时就直接window.open页面。解决iframe无onerror函数的问题。
    iframe_onerror_timer = setTimeout(()=>{
        clearTimeout(nav_info_timer);
        index_new_tab_msg.innerText = "Error ⚠️ " + href;
        // 自动更换方式打开页面
        div_index_new_tab.classList.remove("hide");
        index_new_tab_iframe.classList.add("hide");
        func.goto_href(href, "_replace");
    }, 8*1000); // 默认[6, 15]s

    // 网址成功或有状态返回就直接iframe页面。iframe的onload事件包括onload和onerror。
    index_new_tab_iframe.onload = (e) => {
        clearTimeout(nav_info_timer);
        clearTimeout(iframe_onerror_timer);
        // 成功或有状态返回
        div_index_new_tab.classList.add("hide");
        index_new_tab_iframe.classList.remove("hide");
        //
        document.title = func.get_language("app_name_iframe");
    };

}

//
function task_new_tab(){
    func.get_data("custom_new_tab_href").then(href => {
        if (href){href = func.unicode_to_string(href);}
        let msg = "";

        // 显示链接文字
        if (func.is_url(href)){
            msg = func.get_language("opening")+" 👉 " + href;
        }else{ // 空值或不符合规范的href
            href = "about:blank"; // "about:blank"，不能为""
            msg = "Error Opening 👉 " + href;
        }

        // init 定时器
        clearTimeout(nav_info_timer);
        clearTimeout(iframe_onerror_timer);

        // 提示信息
        index_new_tab_msg.innerText = msg;
        nav_info_timer = setTimeout(()=>{
            div_index_new_tab.classList.remove("hide");
            index_new_tab_iframe.classList.add("hide");
        }, 2*1000); // 默认[1, 4]s

        // 页面故障时，可以手动打开页面
        click_open_href(href);

        // 处理默认链接
        if( (href === config.default_new_tab_href || href.indexOf(config.app_class.toLowerCase())>-1 ) && func.support_min_js() ){ // 白名单链接或默认链接，同时确保功能在最小ES支持下可以正常运行
            document.title = func.get_language("app_name") + " ... ";
            // 此标记仅用于反爬虫识别链接，不用于统计用户数据
            let browser_name = func.get_runtime_info()["browser_name"];
            if(href.indexOf("?")>-1){
                href = href+"&ap="+func.md5(func.string_to_unicode(("tph_iframe_custom_"+browser_name+"_"+config.app_version)).toLowerCase());
            }else{
                href = href+"?ap="+func.md5(func.string_to_unicode(("tph_iframe_default_"+browser_name+"_"+config.app_version).toLowerCase()));
            }
            // 用iframe的方式打开
            iframe_open_default_url(href);
        }else{ // 用户自定义的链接
            document.title = msg;
            // 自动打开页面
            func.goto_href(href, "_replace");
        }

    });
}

// 页面起始函数
function page_start(e){
    page_init_data("page-index_new_tab");

    // 页面翻译
    func.set_language_title("index_new_tab");
    func.set_language_span();

    // 执行跳转
    task_new_tab();

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
            // page_start(3);
        }
    });
})();

