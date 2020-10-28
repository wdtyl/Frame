import Vue from 'vue'
import App from './App.vue'
import router from "./router/index.js"
import "./core/config/index.js"
import store from './store'


if (process.env.VUE_APP_ENV === "DEV") {
  // 测试环境
  let vconsoleScript = document.getElementById("vconsole-script");
  vconsoleScript.src = "vconsole.min.js";
  vconsoleScript.onload = function() {
      // init vConsole
       var vConsole = new VConsole(); // eslint-disable-line
      console.log("当前页面地址:", window.location.href);
      console.log("后端接口地址:", process.env.VUE_APP_API);
  };
}
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
