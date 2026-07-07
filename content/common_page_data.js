
// 跨页面公共参数生成
function page_init_data(where="page-popup"){
    let p1 = new Promise(resolve => {
        func.get_data("app_uid").then(uid => {
            resolve(uid);
        });
    });
    let p2 = new Promise(resolve => {
        func.get_data("custom_new_tab_href").then(href => {
            if (href){href = func.unicode_to_string(href);}
            resolve(href);
        });
    });
    Promise.all([p1, p2]).then((res_array) => {
        let uid = res_array[0];
        let href = res_array[1];
        //
        if (!uid){ // 空UID则init数据或覆盖数据
            let pp1 = new Promise(resolve => {
                func.set_data("app_uid", func.make_app_uid()).then(_uid =>{
                    resolve(_uid);
                }); // 生成随机UID
            });
            let pp2 = new Promise(resolve => {
                func.set_data("custom_new_tab_href", func.string_to_unicode(config.default_new_tab_href)).then(_href => {
                    resolve(_href);
                }); // 生成初始化input地址
            });
            Promise.all([pp1, pp2]).then((_res_array) => {
                // 初始化2
                if (where === "page-popup"){
                    try {
                        show_href();
                        watch_save_href();
                    }catch(err){}
                }
            });
        }else{
            // 初始化3
            if (where === "page-popup"){
                try {
                    show_href();
                    watch_save_href();
                }catch(err){}
            }
        }
    });
}