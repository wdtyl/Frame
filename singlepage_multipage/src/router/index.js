import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const routes = [
    // 个人信息
    {
        path: "/personalinfo",
        name: "personalinfo",
        component: () =>
            import(
                /* webpackChunkName: "personalinfo" */ "../views/person/index.vue"
            )
    },
    {
      path: "/tt",
      name: "tt",
      component: () =>
          import(
              /* webpackChunkName: "personalinfo" */ "../views/tt/tt.vue"
          )
  }
];

// 路由跳转判断
// router.beforeEach((to, from, next) => {
//   console.log('tag', '')
//   // 关于我们， 贷款指南不需要登陆校验
//   if (to.name === 'aboutus' || to.name === 'repayguide' || to.name === 'transition' || to.name === 'login') {
//     next()
//   } else {

//     next()
//     // if (util.getCookie('uid')) {
//     //   next()
//     //   axios.defaults.headers.common['uid'] = util.getCookie('uid')
//     //   axios.defaults.headers.common['token'] = util.getCookie('token')
//     // } else {
//     //   window.location = './index.html'
//     // }
//   }
// })

let router = new VueRouter({
    routes
});
export default router;
