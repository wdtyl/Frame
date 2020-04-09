import Vue from 'vue';
import 'amfe-flexible';
// import '@/core/js/api'; // 封装axios
import '@/core/js/scheme'; // scheme
import '@/core/js/util'; // util
import '@/app.scss'; // 全局css样式
import  '@/core/js/localstorage.js';//列子：this.$localList.setItem('application',{name:'小王',age:232})，this.$localList.getItem('application');
// import CompLoading from '@/components/Loading.vue';
import { Lazyload, Toast,Field,Image,Icon ,Button} from 'vant';
import util from './core/js/util';

Vue.use(Lazyload).use(Toast).use(Button).use(Field).use(Image).use(Icon);

Vue.config.productionTip = false;

// vue全局组件的数据
Vue.mixin({
    components: {
        // CompLoading
    },
    data: function () {
        return {
            showGLLoading: false
        };
    }
});
// 金额过滤器
Vue.filter('number', util.formatNumber);
// 解决ios返回上一页不刷新
function onReady (callback) {
    document.addEventListener(
        'DOMContentLoaded',
        function () {
            callback();
        },
        false
    );
}

onReady(function () {
    var isPageHide = false;
    window.addEventListener('pageshow', function () {
        if (isPageHide) {
            window.location.reload();
        }
    });
    window.addEventListener('pagehide', function () {
        isPageHide = true;
    });
});

// 初始化vue
window.initApp = function (app) {
    // 测试环境动态引入vconsole调试
    loadVconsole().then(() => {
        // 给html 100% 高度
        const browserHeight = document.documentElement.clientHeight;
        document.querySelector('html').style.height = browserHeight + 'px';
        new Vue({
            render: h => h(app)
        }).$mount('#app');
    });
};

// 测试环境加载vconsole
function loadVconsole () {
    return new Promise(resolve => {
        if (process.env.VUE_APP_ENV === 'DEV') {
            // 测试环境
            let vconsoleScript = document.getElementById('vconsole-script');
            vconsoleScript.src = 'vconsole.min.js';
            vconsoleScript.onload = function () {
                // init vConsole
                var vConsole = new VConsole() // eslint-disable-line
                console.log('当前页面地址:', window.location.href);
                console.log('后端接口地址:', process.env.VUE_APP_API);
                resolve();
            };
        } else {
            // 非测试环境
            resolve();
        }
    });
}
