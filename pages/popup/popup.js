
// 页面起始函数
function page_start(e){
    // 生成随机UID（注意，此值仅用于匿名调试）
    // func.get_data("app_uid").then(uid => {
    //     if (!uid){func.set_data("app_uid", func.make_app_uid()).then(res =>{}) ;}
    // });
    // 页面翻译
    func.set_language_title("popup");
    func.set_language_span();
    func.set_language_input_placeholder();

    // 初始化
    show_href();
    save_href();
    show_a_target_radio();

    // 其他
    document.getElementById("settings-item-title-version").innerText = "v"+config.app_version;

}

// 页面加载完成后
(function (){
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", page_start);
    } else {
        page_start(2);
    }
})();