function inject(service, option) {
    // request拦截器
    service.interceptors.request.use(
        config => {
            let method = config.method;
            if (method === "post") {
                // config.headers["Content-Type"] = "application/json";
                // if (typeof config.data === 'undefined') {
                //     config.data = {};
                // }
                // config.data = qs.stringify(config.data);
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
            // console.log("Axios Response ==>", response);
            if (
                response.status === 200 &&
                response.data &&
                response.data.retCode === "000000"
            ) {
                return response.data;
            } else {
                //response.data.message && Message.error(response.data.message);
                //错误的响应码交由ErrorHandler处理
                return errorHandler(response.data);
            }
            return Promise.reject(new Error("请求响应码错误!"));
        },
        error => {
            //返回的异常统一交由错误处理器决定处理
            return errorHandler
                ? errorHandler(error.response)
                : Promise.reject(error);
        }
    );
}
const errorHandler = response => {
    if (!response) {
        return Promise.reject(new Error("服务器无响应,请检查您的网络状态!"));
    }
    switch (response.retCode) {
        case 401:
            break;
        case 403:
            console.log("404:访问的资源不存在!");
            break;
        case 404:
            console.log("404:访问的资源不存在!");
            break;
        default:
            return Promise.reject(response);
    }
};
export default inject;
