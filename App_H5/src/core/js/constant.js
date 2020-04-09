export default {
    // 请求成功code码
    SUCCESS_CODE: 100000,
    // 信德已经认证code
    XINDE_DONE_CODE: 700100,
    // 身份证号正则验证
    ID_REG: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    // 手机号正则验证
    PHONE_REG: /^1\d{10}$/,
    // 匹配中文
    CHINESE_REG: /^[\u4e00-\u9fa5]{2,20}$/,
    // 去除所有空格
    DELETE_ALL_BLANK: /\s+/g
};
