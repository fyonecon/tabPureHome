// dom_a_target.js - 注入到每个网页内容的脚本
// 负责实际修改a标签链接的target属性，只对a标签有用，js跳转无用

let currentRadioMode = '_default'; // 取值范围：'_default' '_blank' '_self'
let observer = null; // 观察动态网页

// 校验是否是合法的、需要修改 target 的链接
function shouldModifyLink(link) {
    const href = link.getAttribute('href');
    if (!href) return false;

    // 转为小写方便统一判断
    const lowerHref = href.trim().toLowerCase();

    // 排除特殊用途的链接：伪协议、锚点、空链接
    if (
        lowerHref.startsWith('javascript:') || lowerHref.startsWith('#') ||
        lowerHref.startsWith('mailto:') || lowerHref.startsWith('tel:') || lowerHref.startsWith('sms:') ||
        lowerHref.startsWith('ftp:') || lowerHref.startsWith('ftps:') ||
        lowerHref === ''
    ) {
        return false;
    }
    return true;
}

// 更新链接的 target 属性
function modifyLinkTarget(link, mode) {
    if (mode === '_self' || mode === '_blank') {
        // 性能微优化：如果已经是目标 target，则不上火（减少 DOM 修改引发的重绘）
        if (link.target !== mode) {
            link.target = mode;
            return true;
        }
    }
    return false;
}

// 扫描并更新静态网页中链接的target属性
function updateStaticLinks(mode) {
    if (mode === '_default') return 0; // 默认模式下不需要遍历静态链接

    const allLinks = document.querySelectorAll('a');
    let updatedACount = 0;

    allLinks.forEach(link => {
        if (shouldModifyLink(link)) {
            if (modifyLinkTarget(link, mode)) {
                updatedACount++;
            }
        }
    });

    func.console_log(`[LinkTarget] 静态扫描完成。已更新 ${updatedACount} 个链接，目标模式: ${mode}`);
    return updatedACount;
}

// 监听动态链接，安装MutationObserver
function observerAliveLinks() {
    if (observer) { observer.disconnect(); }

    // 如果是默认模式，其实都不需要启动监听，节省浏览器性能
    if (currentRadioMode === '_default') return;

    observer = new MutationObserver((mutations) => {
        // 使用 Set 存储需要处理的 A 标签，自动去重
        const linksToUpdate = new Set();

        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // 情况1：添加的节点本身就是 A 标签
                    if (node.tagName === 'A') {
                        linksToUpdate.add(node);
                    }
                    // 情况2：添加的是容器，查找其内部的所有 A 标签
                    // 优化：只有当容器可能包含子节点时才去 query
                    if (node.children && node.children.length > 0) {
                        const nestedLinks = node.querySelectorAll('a');
                        nestedLinks.forEach(link => linksToUpdate.add(link));
                    }
                }
            });
        });

        // 统一批量处理
        if (linksToUpdate.size > 0) {
            let dynamicUpdatedCount = 0;
            linksToUpdate.forEach(link => {
                if (shouldModifyLink(link)) {
                    if (modifyLinkTarget(link, currentRadioMode)) {
                        dynamicUpdatedCount++;
                    }
                }
            });
            if (dynamicUpdatedCount > 0) {
                func.console_log(`[LinkTarget] 动态处理完成：检测到 ${linksToUpdate.size} 个新标签，实际修改了 ${dynamicUpdatedCount} 个`);
            }
        }
    });

    // 开始观察
    if (document.body) {
        observer.observe(document.body, { childList: true, subtree: true });
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            if (document.body) {
                observer.observe(document.body, { childList: true, subtree: true });
            }
        });
    }
}

// 应用模式
function applyMode(mode) {
    if (mode === '_self' || mode === '_blank' || mode === '_default') {
        func.console_log("[LinkTarget] 当前获取的 mode =", mode);

        // 1. 先处理现有的静态链接
        updateStaticLinks(mode);
        // 2. 启动动态监听
        observerAliveLinks();
        return true;
    } else {
        console.error('[LinkTarget] 无效的模式:', mode);
        return false;
    }
}

// 初始化入口
function init_dom_a_target() {
    func.get_data('custom_a_target_mode').then(mode => {
        const savedMode = mode || '_default';
        currentRadioMode = savedMode;
        applyMode(savedMode);
    }).catch(err => {
        console.error('[LinkTarget] 获取存储数据失败:', err);
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
            init_dom_a_target();
        } else {
            document.addEventListener('DOMContentLoaded', init_dom_a_target);
        }
    }
})();