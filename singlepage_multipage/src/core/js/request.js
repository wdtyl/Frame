import axios from "axios";
import inject from "./inject";
import getUrl from "./urlList";
const serviceType = Array.isArray(getUrl.serviceType) ? getUrl.serviceType : []; //服务列表名
const serviceList = {};
// headers userId公共参数
// 733734380906041344
const userId = window.localStorage.getItem("userId") || "736255780661317632";
const token =
    window.localStorage.getItem("token") ||
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzM3MzQzODA5MDYwNDEzNDQifQ.k_EUlscX2p-gFZhiF7fGkFmUOmlYKuyD7A5aaU5Wo60";
serviceType.forEach((item, index) => {
    serviceList[item] = axios.create({
        baseURL: getUrl.getServiceUrls(item), // api的base_url
        timeout: 10000, // 请求超时时间
        method: "post",
        headers: {
            "Content-Type": "application/json;",
            userId: userId,
            token: token
        }
    });
    inject(serviceList[item]);
});
export default serviceList;
