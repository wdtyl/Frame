// 获取域名
function baseurl() {
    var hrefurl = window.location.href;
    if (hrefurl.indexOf('localhost') > -1 || hrefurl.indexOf('qinjia001') > -1 || hrefurl.indexOf('192.168') > -1) {
        // 测试环境域名
        return 'http://apptest.qinjia001.com'
    } else {
        // 正式环境域名
        return 'https://qinbei.qinjia2018.com'
    }
}
var host = baseurl();

// 判断是iOS 还是 Android，或其他
var ISAPPLEDEVICE = !!/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
var ANDROIDDEVICE = !!/(Android)/i.test(navigator.userAgent);

/**
 * 截取url参数
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=')
      if (pair[0] == variable) {
        return pair[1]
      }
    }
    return false
  }

/**
 * toast文案提示
 */
var showToase = true;
function toast(msg) {
    if (showToase) {
        showToase = false;
        var toastTag = document.querySelector('.toast-wrap');
        var toastMsg = document.querySelector('.toast-msg');
        setTimeout(function () {
            toastTag.style.display = 'block';
            toastMsg.innerHTML = msg;
            toastTag.className = toastTag.className.replace('toastAnimate', '');
            setTimeout(function () {
                toastTag.className = toastTag.className + ' toastAnimate';
            }, 50);
        }, 100);
        setTimeout(function () {
            toastTag.style.display = 'none';
            showToase = true;
        }, 1500);
    }
};
/**
 * 倒计时
 */
var is_click = true;
function goTime() {
    var timeSpan = document.querySelector(".get-code");
    var TIME_COUNT = 60;
    if (is_click) {
        console.log(1111);
        is_click = false;
        var timer = setInterval(function() {
            if (TIME_COUNT > 0 && TIME_COUNT <= 60) {
                TIME_COUNT--;
                timeSpan.innerHTML = TIME_COUNT + 'S';
            } else {
                clearInterval(timer);
                timer = null;
                TIME_COUNT = 60;
                timeSpan.innerHTML = '重新获取';
                is_click = true;
            }
        }, 1000);
    }
};

/**
 * 手机号正则
 */
var phReg = /^1[3456789]\d{9}$/;

/**
 * 获取验证码校验
 */
function codeStatus(str) {
    switch (str) {
        case '000000':
            toast('已为您发送短信验证码，请注意查收');
            isGetCoe = false;
            goTime();
            setTimeout(function () {
                isGetCoe = true;
            }, 60000);
            break;
        case '000001':
            toast('请输入正确的手机号');
            break;
        case '100008':
            toast('短信验证码今日已达上限');
            break;
        case '100010':
            toast('手机号已注册，请前往亲家app登录');
            break;
        default:
            break;
    }
}

/**
 * 登陆状态码
 */
function loginCodeStatus(str) {
    switch (str) {
        case '000000':
            toast('注册已成功');
            setTimeout(function () {
                window.location.href = './download.html';
            }, 1500);
            break;
        case '100002':
            toast('手机号不能为空');
            break;
        case '100006':
            toast('验证码不正确');
            break;
        case '100007':
            toast('验证码已超时，请重新获取');
            break;
        default:
            break;
    }
}

/**
 * input 限制
 */
function enterNumber(e, num) {
    if (e.target.value.length > num)e.target.value = e.target.value.slice(0,num);
    e.target.value = e.target.value.replace(/[^\d]/g, '');
}