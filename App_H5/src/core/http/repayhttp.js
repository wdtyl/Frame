import Https from "../js/request";
// http://192.168.1.52:9093 于慧本地
// 还款计划查询（账单详情）
let repayPlan = data => {
    return Https.baseUrl({
        url: "/app/order/repayPlan",
        data
    });
};

//立即还款
let firstRepay =(data) =>{
    return Https.baseUrl({
        url: '/app/order/saveCustInfo',
        data
    });
}

// 提前结清
let repayBefore =(data) =>{
    return Https.baseUrl({
        url: '/app/order/saveRelatives',
        data
    });
}
// 还款成功
let repaySuccess =(data) =>{
    return Https.baseUrl({
        url: '/app/order/saveRelatives',
        data
    });
}
// 还款失败
let repayFail =(data) =>{
    return Https.baseUrl({
        url: '/app/order/saveRelatives',
        data
    });
}
// 还款中
let repayLoading =(data) =>{
    return Https.baseUrl({
        url: '/app/order/saveRelatives',
        data
    });
}
// 借款详情
let orderDetail =(data) =>{
    return Https.baseUrl({
        url: `/app/order/orderDetail`,
        data,
        headers: {
            'Content-Type': 'application/form-data'
        }
    });
}
export default{
    repayPlan,
    firstRepay,
    repayBefore,
    repaySuccess,
    repayFail,
    repayLoading,
    orderDetail
}