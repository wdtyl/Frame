// import service from './service';
// import Vue from 'vue';
// import constant from '@/core/js/constant';
// 判断是iOS 还是 Android，或其他
const ISAPPLEDEVICE = !!/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
const ANDROIDDEVICE = !!/(Android)/i.test(navigator.userAgent);
/**
 * 根据参数名获取地址栏参数值
 * @param {String} name 参数名
 * @param {String} s 指定的查询字符串
 * @return {String} 返回参数值
 */
function _getQueryStringRegExp(name, s) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    var uri = "";
    if (s) {
        uri = s;
    } else {
        uri = window.location.search;
    }
    if (reg.test(uri)) {
        var result = decodeURIComponent(RegExp.$2.replace(/\+/g, " "));
        return result === "" ? "" : result;
    }
    return "";
}

/**
 * 获取参数数组
 * @param {Boolean} isDecode 是否对参数进行解码操作，默认true
 * @return {Array}
 */
function _getQueryStringArgs(isDecode) {
    // 取得查询字符串并去掉开头的问号
    var location = window.location;
    var qs = location.search.length > 0 ? location.search.substring(1) : "";

    // 保存数据的对象
    var args = {};

    // 取得每一项
    var items = qs.split("&");
    var item = null;
    var name = null;
    var value = null;
    var i;

    // 逐个将每一项添加到args对象中
    for (i = 0; i < items.length; i++) {
        item = items[i].split("=");
        if (arguments.length === 1 && !isDecode) {
            name = item[0];
            value = item[1];
        } else {
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
        }
        args[name] = value;
    }

    return args;
}

// 返回值：arg1减去arg2的精确结果
function _accSub(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    // last modify by deeka
    // 动态控制精度长度
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 浮点数乘法计算
function _accMul(arg1, arg2) {
    var m = 0;

    var s1 = arg1.toString();

    var s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    } catch (e) {}
    try {
        m += s2.split(".")[1].length;
    } catch (e) {}
    return (
        (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
        Math.pow(10, m)
    );
}

/**
 * 两个日期间的时间差
 * @param {*} dateOld
 * @param {*} dateNow
 */
function _daysBetween(dateOld, dateNow) {
    var oldMonth = dateOld.substring(5, dateOld.lastIndexOf("-"));
    var oldDay = dateOld.substring(
        dateOld.length,
        dateOld.lastIndexOf("-") + 1
    );
    var oldYear = dateOld.substring(0, dateOld.indexOf("-"));

    var nowMonth = dateNow.substring(5, dateNow.lastIndexOf("-"));
    var nowDay = dateNow.substring(
        dateNow.length,
        dateNow.lastIndexOf("-") + 1
    );
    var nowYear = dateNow.substring(0, dateNow.indexOf("-"));

    var dif =
        (Date.parse(oldMonth + "/" + oldDay + "/" + oldYear) -
            Date.parse(nowMonth + "/" + nowDay + "/" + nowYear)) /
        86400000;

    return Math.abs(dif);
}

function _dateFormat() {
    let date = new Date();

    let Y = date.getFullYear() + "-";
    let M =
        (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
    let D = date.getDate() + " ";
    let dateStr = Y + M + D;
    return dateStr;
}

// 数字转大写
function _amountInWords(n) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return "数据非法";
    var unit = "仟百拾亿仟百拾万仟百拾元角分";

    var str = "";
    n += "00";
    var p = n.indexOf(".");
    if (p >= 0) n = n.substring(0, p) + n.substr(p + 1, 2);
    unit = unit.substr(unit.length - n.length);
    for (var i = 0; i < n.length; i++) {
        str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i);
    }
    return str
        .replace(/零(仟|百|拾|角)/g, "零")
        .replace(/(零)+/g, "零")
        .replace(/零(万|亿|元)/g, "$1")
        .replace(/(亿)万|壹(拾)/g, "$1$2")
        .replace(/^元零?|零分/g, "")
        .replace(/元$/g, "元");
}

// 金额格式化
function _amountT(b) {
    let newN = "";
    let n = b.toString();
    let w = n.length - 4;
    let q = n.length - 3;
    if (n.length === 4 && n.slice(q) === "000") {
        newN = n.slice(0, 1) + "千";
    } else if (n.length >= 5 && n.slice(w) === "0000") {
        let l = n.length - 4;
        newN = n.slice(0, l) + "万";
    } else {
        newN = n;
    }
    return newN;
}

// 时间戳
function _ts() {
    let t = "_t=" + new Date().getTime();
    return t;
}

function _formatNumber(number, decimals, point, thousands) {
    number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
    let n = !isFinite(+number) ? 0 : +number;
    let prec = !isFinite(+decimals) ? 3 : Math.abs(decimals);
    let sep = thousands || ",";
    let dec = point || ".";
    let s;
    let toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return "" + (Math.round(n * k) / k).toFixed(prec);
    };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
    }
    return s.join(dec);
}
/**
 * 根据参数名获取地址栏参数值
 * @param {Object｜｜Array} obj 对象，若为数组则元素为对象
 * @param {Array} key 指定的查询的键[key&&alue],key,value为对象里面的键名
 * @return {Object} 返回参数值
 */
function getObjectKeyValue(obj, keys = []) {
    let _obj = {};
    if (Array.isArray(obj)) {
        obj.forEach(item => {
            keys.forEach(_key => {
                
                if (_key.indexOf("&&") != -1) {
                    let __key = _key.split("&&");
                    _obj[item[__key[0]]] = item[__key[1]];
                } else{
                    _obj[_key] = item['key'];
                }
            });
        });
        return _obj;
    }
    keys.forEach(_key => {
        if (_key.indexOf("&&") != -1) {
            let __key = _key.split("&&");
            _obj[obj[__key[0]]] = obj[__key[1]];
        } else if (typeof _key === "string") {
            _obj[_key] = obj[_key];
        }
    });
    return _obj;
}
//手机号校验
function phoneReg(phone) {
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/;
    if (phone == "" || phone == undefined) {
        return false;
    } else if (!reg.test(phone)) {
        return false;
    }
    return true;
}
//
function _matchCode(obj, value) {
    return Object.keys(obj).find(function(key) {
        return value === obj[key];
    });
}
//隐藏姓名后两位和隐藏银行卡中间8位
class HideInfo {
    constructor() {}
    static hideName(name) {
        return name
            ? name.substring(0, 1) + name.substring(1).replace(/.?/g, "*")
            : "";
    }
    static hideMBank(cardCode) {
        let _cardcode;
        if (typeof cardCode === "number" && cardCode) {
            _cardcode = cardCode.toString();
        }
        return _cardcode
            ? _cardcode.substring(0, 6) +
                  _cardcode
                      .substring(6, _cardcode.length - 4)
                      .replace(/.?/g, "*") +
                  _cardcode.substring(_cardcode.length - 4)
            : "";
    }
}
export default {
    tstamp: _ts(),
    isIos: ISAPPLEDEVICE,
    isAndroid: ANDROIDDEVICE,
    getQueryStringRegExp: _getQueryStringRegExp,
    getQueryStringArgs: _getQueryStringArgs,
    accMul: _accMul,
    dateFormat: _dateFormat,
    dayDiff: _daysBetween,
    amountInWords: _amountInWords,
    amountT: _amountT,
    accSub: _accSub,
    formatNumber: _formatNumber,
    getObjectKeyValue: getObjectKeyValue,
    matchCode: _matchCode,
    phoneReg,
    HideInfo
};
