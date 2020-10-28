import Https from "../js/request";
// 根据userid获取token
// 授信进度查询
export async function getToken(data) {
    return await Https.baseUrl({
        url: "/app/user/getToken",
        data
    });
}
