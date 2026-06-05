// 公共函数
const func = {
    get_data: function(key="") { // 读取数据
        key = config.app_class + key;
        if (typeof chrome !== 'undefined'){
            chrome.storage.local.get([key], (res) => {
               return res[key] || "";
            });
        }else{
            return "";
        }
    },
    set_data: function(key="", value=null) { // 保存数据
        key = config.app_class + key;
        if (typeof chrome !== 'undefined'){
            chrome.storage.local.set({ [key]: value }, () => {
                return value;
            });
        }else{
            return "";
        }
    },
    del_data: function(key="") { // 删除数据
        key = config.app_class + key;
        if (typeof chrome !== 'undefined'){
            chrome.storage.local.remove([key], () => {
                return true;
            });
        }else{
            return false;
        }
    },
    clear_data: function() { // 清空数据
        if (typeof chrome !== 'undefined'){
            chrome.storage.local.clear(() => {
                return true;
            });
        }else{
            return false;
        }
    },
    is_url: function (string=""){ // http(s) ftp(s) file
        string = string.toLowerCase();
        if (
            string.indexOf("http:") === 0
            || string.indexOf("https:") === 0
            || string.indexOf("ftp:") === 0
            || string.indexOf("ftps:") === 0
            || string.indexOf("file:") === 0
            // || string.indexOf("view-source:") === 0
            || string.indexOf("mailto:") === 0
            || string.indexOf("rtsp:") === 0
            || string.indexOf("tel:") === 0
            || string.indexOf("sms:") === 0
        ){ // 严格限制协议开头
            try {
                new URL(string);
                return true;
            } catch (err) {
                return false;
            }
        }else{
            return false;
        }
    },
    get_language: function(key="_null") {
        // 获取语言
        function sys_lang(){
            return (navigator.language || "en").toLowerCase();
        }
        // 将语言转换成可用的数组索引标记
        function make_lang_index(_language){
            if (_language.indexOf("zh") >= 0) { // 简体中文（包含繁体）
                return "zh";
            }
            else if (_language.indexOf("en") >= 0){ // 英文
                return "en";
            }
            // else if (_language.indexOf("jp") >= 0){ // 日文
            //     return "jp";
            // }
            // else if (_language.indexOf("fr") >= 0){ // 法语
            //     return "fr";
            // }
            // else if (_language.indexOf("de") >= 0){ // 德语
            //     return "de";
            // }
            // else if (_language.indexOf("ru") >= 0){ // 俄语或乌克兰语
            //     return "ru";
            // }
            // else if (_language.indexOf("es") >= 0){ // 西班牙语
            //     return "es";
            // }
            // else if (_language.indexOf("ko") >= 0){ // 韩语或朝鲜语
            //     return "ko";
            // }
            // else if (_language.indexOf("vi") >= 0){ // 越语
            //     return "vi";
            // }
            else{ // 默认英文
                return "en"
            }
        }
        // 简化的语言
        const index_lang = make_lang_index(sys_lang());
        // 确保有值返回
        const key_lang = language_dict[key];
        if (!key_lang){ // 无key
            return "_[" + key + "]_";
        }else{
            const value_lang = language_dict[key][index_lang];
            if (!value_lang){
                return language_dict[key]["en"];
            }else{
                return value_lang;
            }
        }
    },
    get_theme: function () { // 获取主题
        // 确保 window.matchMedia 存在
        if (typeof window !== "undefined" && window.matchMedia) {
            const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            return isDark?"dark":"light";
        } else {
            return "light";
        }
    },
    is_extension: function (){ // 页面处于浏览器插件运行环境
        if (typeof chrome !== 'undefined'){
            return !!chrome.runtime.id;
        }else{
            return false;
        }
    },
    get_extension_id: function(){
        if (typeof chrome !== 'undefined'){
            return chrome.runtime.id;
        }else{
            return "";
        }
    },
    get_pathname: function(){ // 路由
        if (typeof window !== "undefined"){
            const url = new URL(window.location.href);
            return url.pathname;
        }else {
            return "";
        }
    },
    get_search: function(){ // 路由参数
        if (typeof window !== "undefined"){
            const url = new URL(window.location.href);
            return url.search;
        }else {
            return "";
        }
    },
    set_language_span: function(){ // span类型的翻译
        if (typeof document !== 'undefined'){
            const spans = document.getElementsByClassName("language-span");
            for (let i = 0; i < spans.length; i++) {
                const the_span = spans[i];
                const the_key = the_span.getAttribute("data-language_key");
                the_span.innerHTML = func.get_language(the_key);
            }
        }else{
            console.warn("document is not supported!");
        }
    },
    set_language_input_placeholder: function(){ // input placeholder类型翻译
        if (typeof document !== 'undefined') {
            const inputs = document.getElementsByClassName("language-input");
            for (let i = 0; i < inputs.length; i++) {
                const the_input = inputs[i];
                const the_key = the_input.getAttribute("data-language_key");
                the_input.setAttribute("placeholder", func.get_language(the_key));
            }
        }else{
            console.warn("document is not supported!");
        }
    },
    set_language_textarea_placeholder: function(){ // textarea placeholder类型翻译
        if (typeof document !== 'undefined') {
            const textareas = document.getElementsByClassName("language-textarea");
            for (let i = 0; i < textareas.length; i++) {
                const the_textarea = textareas[i];
                const the_key = the_textarea.getAttribute("data-language_key");
                the_textarea.setAttribute("placeholder", func.get_language(the_key));
            }
        }else{
            console.warn("document is not supported!");
        }
    },
    set_language_title: function(key){ // title类型翻译
        if (typeof document !== 'undefined' && document.title !== undefined) {
            document.title = func.get_language(key);
        }else{
            console.warn("document is not supported!");
        }
    },
    goto_href: function(href, target="_replace"){ // 打开网址
        let that = this;
        //
        if (typeof window !== 'undefined') {
            if (target === "_self"){
                window.location.href = href;
            }else if (target === "_blank"){
                window.open(href, "_blank");
            }else{
                window.location.replace(href);
            }
        }
    },
};