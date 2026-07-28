
// 利用content插入自定义css，写法如上实例。
function insert_css (css_content = `
    .example_ {
        font-size: 15px;
    }
`){
    const style = document.createElement('style');
    style.textContent = css_content;
    document.head.appendChild(style);
}

//
function init_dom_insert_css_font(){
    let css_content = "";
    func.get_data('custom_insert_css_font_mode').then(mode =>{
        if (mode === "_replace"){
            css_content = `
                body{
                    font-family: "Noto Sans SC", Roboto, "PingFang SC", "Arial", sans-serif !important;
                }
            `; // 只影响正文内容，保留表单、按钮等组件字体
        }else{ // 默认或为空
            css_content = "";
        }
        insert_css(css_content);
    });
}

// init
(function (){
    // 立即执行初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init_dom_a_target);
    } else {
        init_dom_with_target();
    }

    // 顺便兼容一下可能延迟调用的情况
    function init_dom_with_target() {
        // 确保 body 存在或者加载完成
        if (document.body) {
            init_dom_insert_css_font();
        } else {
            document.addEventListener('DOMContentLoaded', init_dom_insert_css_font);
        }
    }
})();