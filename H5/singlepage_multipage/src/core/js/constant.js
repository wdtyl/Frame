export default {
    // 请求成功code码
    SUCCESS_CODE: "000000",
    // 身份证号正则验证
    ID_REG: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
    // 手机号正则验证
    PHONE_REG: /^1[3456789]\d{9}$/,
    // 匹配中文
    CHINESE_REG: /^[\u4e00-\u9fa5]+$/,
    // 去除所有空格
    DELETE_ALL_BLANK: /\s+/g,
    // 邮箱验证
    EMAIL_REG: /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/,
    // 姓名验证
    NAME_REG: /^[\u4e00-\u9fa5_a-zA-Z]+$/
};
