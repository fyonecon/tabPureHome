// 页面起始函数
function page_start(e){
    // console.log("page_start=", func.get_language("text"), func.get_theme());
    // 页面翻译
    func.set_language_title("example");
    func.set_language_span();
}

// 页面加载完成后
(function (){
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", page_start);
    } else {
        page_start(2);
    }
})();