
// 页面起始函数
function page_start(e){
    page_init_data("page-popup");

    // 页面翻译
    func.set_language_title("popup");
    func.set_language_span();
    func.set_language_input_placeholder();

    // 初始化1
    show_a_target_radio();

    //
    // let sys_platform = func.get_runtime_info()["sys_platform"];
    let browser_name = func.get_runtime_info()["browser_name"];
    // 其他
    document.getElementById("settings-item-title-version").innerText = "v"+config.app_version + " for " + browser_name;

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