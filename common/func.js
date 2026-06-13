// 公共函数
const func = {
    get_data:function(key="") { // 读取数据
        key = config.app_class + key;
        return new Promise((resolve)=>{
            if (typeof chrome !== 'undefined'){
                chrome.storage.local.get([key], (res) => {
                    if (res[key] !== undefined) {
                        resolve(res[key]);
                    } else {
                        resolve("");
                    }
                });
            }else{
                resolve("");
            }
        });
    },
    set_data:function(key="", value=null) { // 保存数据
        key = config.app_class + key;
        return new Promise((resolve)=>{
            if (typeof chrome !== 'undefined'){
                chrome.storage.local.set({ [key]: value }, () => {
                    resolve(value);
                });
            }else{
                resolve("");
            }
        });
    },
    del_data: function(key="") { // 删除数据
        key = config.app_class + key;
        return new Promise((resolve)=>{
            if (typeof chrome !== 'undefined'){
                chrome.storage.local.remove([key], () => {
                    resolve(true);
                });
            }else{
                resolve(false);
            }
        });
    },
    clear_data: function() { // 清空数据
        return new Promise((resolve)=>{
            if (typeof chrome !== 'undefined'){
                chrome.storage.local.clear(() => {
                    resolve(true);
                });
            }else{
                resolve(false);
            }
        });
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
                the_span.innerText = func.get_language(the_key);
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
    string_to_unicode: function(string) {
        let that = this;
        // 处理非字符串输入
        if (typeof string !== 'string') {
            string = String(string);
        }
        if (string.length === 0) return "";

        // 使用数组收集编码，然后join，效率更高
        let codes = [""]; // 默认一个空值可以避免多次转换丢失一个值
        for (let i = 0; i < string.length; i++) {
            codes.push(string.charCodeAt(i));
        }
        return codes.join(',');
    },
    unicode_to_string: function(unicode) {
        let that = this;
        // 处理无效输入
        if (unicode === null || unicode === undefined) {
            return "";
        }

        // 如果是数字，直接转换
        if (typeof unicode === 'number') {
            return String.fromCharCode(unicode);
        }

        // 确保是字符串
        unicode = String(unicode).trim();
        if (unicode === "") return "";

        try {
            // 处理逗号分隔的Unicode序列
            if (unicode.indexOf(',') !== -1) {
                let parts = unicode.split(',');
                let result = [];

                for (let i = 0; i < parts.length; i++) {
                    let part = parts[i].trim();
                    // 跳过空部分
                    if (part === "") continue;

                    // 转换为数字
                    let code = Number(part);
                    // 验证是否为有效Unicode码点
                    if (isNaN(code) || code < 0 || code > 0x10FFFF) {
                        // 无效编码，返回原字符串
                        return unicode;
                    }
                    result.push(String.fromCharCode(code));
                }

                return result.join('');
            } else {
                // 处理单个Unicode码点
                let code = Number(unicode);
                let _unicode = "";
                // 验证是否为有效Unicode码点
                if (!isNaN(code) && code >= 0 && code <= 0x10FFFF) {
                    _unicode = String.fromCharCode(code);
                }else{
                    _unicode = unicode;
                }
                // 比较值
                if (that.string_to_unicode(unicode) === unicode){
                    return _unicode;
                }else{
                    return unicode;
                }
            }
        } catch (e) {
            // 任何错误都返回原字符串
            return unicode;
        }
    },

};