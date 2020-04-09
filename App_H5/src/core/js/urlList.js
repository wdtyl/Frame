function getQinJiaUrls(environment) {
    const envDict = {
        PRO: PROUrls,
        DEV: DEVUrls
    };
    return envDict[environment];
}
// 非特定标识域名，统一使用 baseUrl
const DEVUrls = {
    baseUrl: 'http://apptest.qinjia001.com',
    contentIp: 'http://tianyan.qinjia001.com:9090/api-cms', // 内容域名
    // contentIp: "http://tianyan.qinjia001.com:9090/api-cms",
    // creditIp: "http://12222222/",
    // coreIp: "http://12222222/"
};

const PROUrls = {
    baseUrl: 'http://apptest.qinjia001.com',
    contentIp: 'http://tianyan.qinjia001.com:9090/api-cms', // 内容域名
    // contentIp: "http://1222222234534534/",
    // creditIp: "http://12222222/",
    // coreIp: "http://12222222/"
};

 function getServiceUrls(type = "qinbeiIp") {
    // 可手动改变开发环境
    const env = process.env.VUE_APP_ENV
        ? process.env.VUE_APP_ENV
        : "DEV";

    const serviceList = {
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

export default{
    getServiceUrls,
    serviceType

}