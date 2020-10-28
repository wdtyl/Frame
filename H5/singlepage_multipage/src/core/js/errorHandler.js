import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);

let vm = new Vue();

/**
 * 默认的通用处理
 */
const defaultErrorHandler = {
    /**
   * 处理网络异常
   */
    network: function () {
        vm.$toast('网络异常');
    },

    /**
   * 处理 http 服务器异常
   */
    httpError: function (status) {
        vm.$toast('出错了');
        console.log('%c http状态码：%c' + status, 'color:red', 'color:green');
    },

    /**
   * 用户未登录，需要登陆的接口跳转登陆页面
   */
    noLogin: function () {},

    /**
   * 处理其他异常操作
   */
    other: function (err) {
        let code = err.response && err.response.data.stateCode;
        let message = err.response && err.response.data.message;
        // if (code === constants.ERROR.FAILURE) {
        //     env.getVm().$alert(message);
        // } else {
        //     env.getVm().$alert(constants.ERROR_MESSAGE.get(code) + '');
        // }
        console.log('%c' + code + ':' + message, 'color:green');
    }
};

function errorResponse (err, errorHandler) {
    let response = err.response||{};
    let message = err.message||{};
    console.log(message);

    if (response) {
        let status = response.status;
        if (status === 200) {
            // todo
            // http请求成功，但是业务状态码不是101
            // let stateCode = response.data.stateCode;
            // if (stateCode === constants.ERROR.NO_LOGIN) {
            //     errorHandler.noLogin && errorHandler.noLogin(err);
            // } else {
            //     errorHandler.other && errorHandler.other(err);
            // }
        } else if (status < 200 || status > 300) {
            errorHandler.httpError && errorHandler.httpError(status);
        }
    } else if (message === 'Network Error') {
        errorHandler.network && errorHandler.network();
    } else {
    // TODO 此处脚本异常
        console.log('%c' + err.stack, 'color:green');
    }
}

export default function (customErrorHandler = {}) {
    let errorHandle = Object.assign({}, defaultErrorHandler);
    Object.assign(errorHandle, customErrorHandler);

    return function (err) {
        errorResponse(err, errorHandle);
    };
}
