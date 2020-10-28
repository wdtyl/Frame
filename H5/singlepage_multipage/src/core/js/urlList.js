const env = process.env.VUE_APP_ENV ? process.env.VUE_APP_ENV : "DEV";
function getQinJiaUrls(environment) {
    const envDict = {
        PRO: PROUrls,
        DEV: DEVUrls
    };
    return envDict[environment];
}
// let host = window.localStorage.getItem("hostUrl");
// 非特定标识域名，统一使用 baseUrl
const DEVUrls = {
    // baseUrl: host ? host : "http://apptest.qinjia001.com",
    // baseUrl: "https://app.qinjia2018.com",
    baseUrl: "/",
    contentIp: "http://tianyan.qinjia001.com:9090/api-cms" // 内容域名
    // contentIp: "http://tianyan.qinjia001.com:9090/api-cms",
    // creditIp: "http://12222222/",
    // coreIp: "http://12222222/"
};

const PROUrls = {
    baseUrl: "https://app.qinjia2018.com",
    contentIp: "https://cms.qinjia2018.com/api-cms" // 内容域名
    // contentIp: "http://1222222234534534/",
    // creditIp: "http://12222222/",
    // coreIp: "http://12222222/"
};

function getServiceUrls(type = "qinbeiIp") {
    // 可手动改变开发环境
    

    let serviceList = {
        //是列
        demo: {
            qinbeiIp: "http://12222222/",
            contentIp: "http://12222222/",
            creditIp: "http://12222222/",
            coreIp: "http://12222222/"
        }
    };
    serviceList[env] = getQinJiaUrls(env);
    return serviceList[env][type];
}
let serviceType = Object.keys(PROUrls);

export default {
    getServiceUrls,
    serviceType
};
