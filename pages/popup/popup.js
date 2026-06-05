// 页面起始函数
function page_start(e){
    // 页面翻译
    func.set_language_title("popup");
    func.set_language_span();
    func.set_language_input_placeholder();

}

// 页面加载完成后
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", page_start);
} else {
    page_start(2);
}