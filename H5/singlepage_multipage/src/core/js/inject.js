import qs from "qs";
import Vue from "vue";
import { Toast } from "vant";
let time = null;
Vue.use(Toast);

let vm = new Vue();
function inject(service, option) {
    // request拦截器
    service.interceptors.request.use(
        config => {
            if (
                config.method === "post" &&
                config.headers["Content-Type"] ===
                    "application/x-www-form-urlencoded"
            ) {
                config.data = qs.stringify(config.data);
            }
            return config;
        },
        error => {
            // Do something with request error
            return Promise.reject(error);
        }
    );
    // response拦截器
    service.interceptors.response.use(
        response => {
            // console.log("%c" + ":" + response, "color:green");
            // console.error("Axios Response ==>", response);
            if (
                response.status === 200 &&
                response.data &&
                response.data.retCode === "000000"
            ) {
                return response.data;
            } else {
                //response.data.message && Message.error(response.data.message);
                //错误的响应码交由ErrorHandler处理
                if (
                    (response.status === 200 &&
                        response.data &&
                        response.data.retCode &&
                        response.data.retCode !== "000000") ||
                    response.data === null
                ) {
                    return errorBusiness(response.data);
                } else if (!response || response.status !== 200) {
                    return errorHandle(response);
                } else {
                    return response.data;
                }
            }
        },
        error => {
            //返回的异常统一交由错误处理器决定处理
            return errorHandle
                ? errorHandle(error.response)
                : Promise.reject(error);
        }
    );
}
const errorBusiness = response => {
    if (!response) {
        showMes("网络暂时无法连接，请稍后再试");
        return Promise.reject(new Error("服务器无响应,请检查您的网络状态!"));
    }
    if (response.retCode == "400001") {
        return response;
    } else if (response.retCode == "999999") {
        showMes(response.retMsg);
        return response;
    } else if (response.retCode === "111111") {
        // 未登录跳转客户端登录
        showMes(response.retMsg);
        window.localStorage.removeItem("token");
        return response;
    } else if (response.retCode === "100100") {
        return response;
    } else {
        showMes(response.retMsg);
    }
    return Promise.reject(response.retMsg);
};

const errorHandle = response => {
    if (!response) {
        showMes("网络暂时无法连接，请稍后再试");
        return Promise.reject(new Error("服务器无响应,请检查您的网络状态!"));
    }
    switch (response.status) {
        case 400:
            //错误请求
            showMes("网络错误");
            return Promise.reject("错误请求");
        case 401:
            showMes("未授权，请重新登陆");
            //未授权，请重新登陆
            return Promise.reject("未授权，请重新登陆");
        case 403:
            //拒绝访问
            showMes("拒绝访问");
            return Promise.reject("拒绝访问");
        case 404:
            //请求错误，未找到资源
            showMes("请求错误，未找到资源");
            return Promise.reject("请求错误，未找到资源");
        case 405:
            //未请求方法未允许
            showMes("未请求方法未允许");
            return Promise.reject("未请求方法未允许");
        case 408:
            showMes("请求超时");
            return Promise.reject("请求超时");
        //请求超时
        case 500:
            //服务端出错
            showMes("服务端出错");
            return Promise.reject("服务端出错");
        case 501:
            //网络未实现
            showMes("网络未实现");
            return Promise.reject("网络未实现");
        case 502:
            //网络错误
            showMes("网络错误");
            return Promise.reject("网络错误");
        case 503:
            //服务不可用
            showMes("服务不可用");
            return Promise.reject("服务不可用");
        case 504:
            //网络超时
            showMes("网络超时");
            return Promise.reject("网络超时");
        case 505:
            //http版本不支持该请求
            showMes("http版本不支持该请求");
            return Promise.reject("http版本不支持该请求");
        default:
            showMes(response.statusText);
            return Promise.reject(response.statusText);
    }
};
const showMes = res => {
    clearTimeout(time);
    time = setTimeout(() => {
        vm.$toast(res);
    }, 0);
};
export default inject;
