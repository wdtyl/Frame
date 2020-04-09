import axios from "axios";
import inject from "./inject";
import getUrl from "./urlList";
import util from './util';
const serviceType =  Array.isArray(getUrl.serviceType)?getUrl.serviceType:[]; //服务列表名
const serviceList = {};
// headers userId公共参数
// 2003161152439531516
const appInfo = JSON.parse(window.localStorage.getItem('appInfo'));
// const userId = util.getQueryStringRegExp('userId') ?  util.getQueryStringRegExp('userId') : appInfo.userId;
const _userId = "2003161152439531516";

serviceType.forEach((item, index) => {
    let _baseUrl = getUrl.getServiceUrls(item);
    serviceList[item] = axios.create({
        baseURL: _baseUrl, // api的base_url
        timeout: 30000, // 请求超时时间
        method: 'post',
        headers: {
            'Content-Type': 'application/json;',
            'userId': _userId
        }
    });
    inject(serviceList[item]);
});
export default serviceList
