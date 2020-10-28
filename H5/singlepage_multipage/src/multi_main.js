import Vue from "vue";
import "amfe-flexible";
import VConsole from 'vconsole';
import "./core/config/index.js"

// 初始化vue;

window.initApp = function(app) {
    // 测试环境动态引入vconsole调试
    loadVconsole().then(() => {
        const browserHeight = document.documentElement.clientHeight;
        document.querySelector("html").style.height = browserHeight + "px";
        new Vue({
            render: h => h(app)
        }).$mount("#app");
    });
};

// 测试环境加载vconsole
function loadVconsole() {
    return new Promise(resolve => {
        if (process.env.VUE_APP_ENV === "DEV") {
            // 测试环境
            let vconsoleScript = document.getElementById("vconsole-script");
            vconsoleScript.src = "vconsole.min.js";
            vconsoleScript.onload = function() {
                // init vConsole
                 var vConsole = new VConsole(); // eslint-disable-line
                console.log("当前页面地址:", window.location.href);
                console.log("后端接口地址:", process.env.VUE_APP_API);
                resolve();
            };
        } else {
            // 非测试环境
            resolve();
        }
    });
}
