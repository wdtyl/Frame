var channel = getQueryVariable('channel');

// 获取手机验证码
var isGetCoe = true;
function getCode () {
    if (isGetCoe) {
        var phVal = document.querySelector('.phval').value;
        if (phVal === '' || !phReg.test(phVal)) {
            toast('请输入正确手机号');
        } else {
            axios.post(host + '/app/user/getCode', {
                mobile: phVal,
                useType: '2'
            }).then(res => {
                let retCode = res.data.retCode;
                codeStatus(retCode);
            })
        }
    }
}
// 同意协议
var isBtnStyle = true;
var t = '';
function agreeFn() {
    var btn = document.querySelector('.agreebtn');
    t = new Date().getTime();
    if (isBtnStyle) {
        btn.classList.add('active');
        isBtnStyle = false;
    } else {
        btn.classList.remove('active');
        isBtnStyle = true;
    }
}
// 登陆
function submit() {
    var phVal = document.querySelector('.phval').value;
    var code = document.querySelector('.codeval').value;
    if (phVal === ''){
        toast('请输入正确的手机号');
    } else if (code === ''){
        toast('请输入验证码');
    } else if (isBtnStyle) {
        toast('请您阅读并同意《亲家服务协议》和《个人信息查询和使用授权书》');
    } else {
        axios.post(host + '/app/user/loginCode', {
            mobile: phVal,
            verifyCode: code,
            loginDevice: '30',
            registChannel: channel,
            agreementViewTime: t
        }).then(res => {
            let retCode = res.data.retCode;
            loginCodeStatus(retCode);
        })
    }
}