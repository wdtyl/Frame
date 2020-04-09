// scheme 文档地址  https://git.pinganzhiyuan.com/doc/panda_tech_doc/wikis/%E6%96%B0%E7%89%88h5%E5%92%8Cnative-app-%E4%BA%A4%E4%BA%92%E7%9A%84%E5%85%B7%E4%BD%93%E5%8F%82%E6%95%B0
import qs from 'qs';
// import service from './service';
import util from '@/core/js/util.js';
const schemeName = 'wode-schema://';

function _invoke (action, data, callback) {
    let scheme = schemeName + action;

    let key;
    for (key in data) {
        if (data.hasOwnProperty(key)) {
            if (scheme.indexOf('?') < 0) {
                scheme += '?' + key + '=' + JSON.stringify(data[key]);
            } else {
                scheme += '&' + key + '=' + JSON.stringify(data[key]);
            }
        }
    }

    let callbackName = '';
    if (callback) {
        if (typeof callback === 'string') {
            callbackName = callback;
        } else {
            callbackName = action + Date.now();
            window[callbackName] = callback;
        }
        scheme += '&callback=' + callbackName;
    }
    _createScheme(scheme);
}

/**
 * 调用scheme
 */
function _createScheme (scheme, action, callback) {
    let callbackName = '';
    if (callback) {
        if (typeof callback === 'string') {
            callbackName = callback;
        } else {
            callbackName = action + Date.now();
            window[callbackName] = callback;
        }
        scheme += '&callback=' + callbackName;
    }
    console.log(scheme);

    let iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = scheme;
    let body = document.body;
    body.appendChild(iframe);
    setTimeout(() => {
        body.removeChild(iframe);
        iframe = null;
    });
}

/**
 * 打开新的 Webview
 * @param {String} url 目标的url
 * @param {String} tag 当前webview的tag，关闭时需要根据tag来进行关闭
 * @param {Function/String} callback 回调函数
 * @param {Boolean} isShowTitleBar 目标页面是否要显示标题栏，title从H5页面中抓取
 * @param {Boolean} isBackEnable 物理back键是否可用
 */
function _openNewWebviewScheme (
    tag,
    params,
    callback,
    isShowTitleBar = false,
    isBackEnable = true,
    href
) {
    let url;
    let link = href || tag;
    let baseUrl = JSON.parse(localStorage.getItem('appInfo')).url;
    if (baseUrl.substr(-1, 1) !== '/') {
        baseUrl += '/';
    }
    if (params && JSON.stringify(params) !== '{}') {
        url =
            baseUrl +
            link +
            '.html' +
            '?' +
            encodeURIComponent(
                (qs.stringify(params) + '&' + util.tstamp).replace(/&/g, '%26')
            );
    } else {
        url = baseUrl + link + '.html?' + util.tstamp;
    }

    // 判断是否命中检测url，如果命中，调用 _openOutUrl
    // if (_isInUrlArr(url)) {
    //     _openOutUrl(url);
    //     return false;
    // }

    let data = {
        url,
        tag,
        isShowTitleBar,
        isBackEnable
    };
    if (util.getQueryStringRegExp('debug')) {
        if (params && JSON.stringify(params) !== '{}') {
            window.location.href =
                'http://' +
                window.location.host +
                '/' +
                link +
                '.html?' +
                qs.stringify(params) +
                '&debug=true';
        } else {
            window.location.href =
                'http://' +
                window.location.host +
                '/' +
                link +
                '.html?' +
                'debug=true';
        }
    } else {
        _invoke('gotoNewWebView', { data }, callback);
    }
}
function _openNewWebviewScheme2 (
    href,
    tag,
    callback,
    isShowTitleBar = false,
    isBackEnable = true
) {
    let url = href;
    let arr = url.split('?');
    let temp;
    if (arr.length > 1) {
        temp = arr[1].split('&');
        for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            if (element.indexOf('%26') > -1 || element.indexOf('%22') > -1) {
                temp[index] = encodeURIComponent(element);
            }
        }
        arr[1] = temp.join('&') + '&' + util.tstamp;
        url = arr[0] + '?' + encodeURIComponent(arr[1].replace(/&/g, '%26'));
    } else {
        url = url + '?' + util.tstamp;
    }

    let data = {
        url,
        tag,
        isShowTitleBar,
        isBackEnable
    };

    // 判断是否命中检测url，如果命中，调用 _openOutUrl
    // if (_isInUrlArr(url)) {
    //     _openOutUrl(url);
    //     return false;
    // }

    // if (util.getQueryStringRegExp('debug')) {
    //     window.location.href = href;
    // } else {
    _invoke('gotoNewWebView', { data }, callback);
    // }
}

/**
 * 关闭 Webview
 * @param {String} tag 需要关闭的webview的tag --- 不传了
 * @param {Function/String} callback 回调函数
 */
function _closeWebviewScheme (tag, callback) {
    // let data = {
    //     tag
    // };
    let data = {};
    if (util.getQueryStringRegExp('debug')) {
        window.history.back();
    } else {
        _invoke('closeNewWebview', { data }, callback);
    }
}

// /**
//  * 调用指定页面的指定方法（原生不能实现）
//  * @param {String} tag 调用指定的webview的tag
//  * @param {Object} params 传递的参数
//  * @param {String} callback 回调函数的名字
//  */
// function _invokeTagCallbackScheme (tag, data, callback) {
//     let params = {
//         tag,
//         data
//     };
//     _invoke('invokeTagCallback', { data: params }, callback);
// }

/**
 * 调用 OCR
 * @param {String} idCardType front:正面,back:反面
 * @param {String} idCardUploadUrl 图片上传的地址
 * @param {Function/String} callback 回调函数
 */
function _ocrScheme (idCardType, idCardUploadUrl, callback) {
    let urls = decodeURIComponent(idCardUploadUrl).split('?');

    let jsonValue = {
        idCardType,
        idCardUploadUrl: urls[0] + '?' + urls[1].replace(/&/g, '%26')
    };
    let value = encodeURIComponent(JSON.stringify(jsonValue));

    let scheme = 'wode-schema://ocr?data=' + value;

    _createScheme(scheme, 'ocr', callback);
}

/*
 *  获取用户信息
 *  @param {Function/String} callback 回调函数
 */
function _appInfoScheme (callback) {
    let data = {};
    _invoke('appInfo', { data }, callback);
}

/**
 * 登陆
 * @param {Boolean} isMustBeLoginValue true:不显示关闭按钮，并且禁用物理back键，false：显示关闭按钮，无需屏蔽物理 back键
 * @param {Function/String} callback 回调函数
 */
function _callLoginScheme (
    isMustBeLoginValue = true,
    callback = 'loginSuccessCallback'
) {
    let data = {
        isMustBeLoginValue
    };
    _invoke('callLogin', { data }, callback);
}

/**
 * 退出登陆
 * @param {*} isMustBeLogin true:不显示关闭按钮，并且禁用物理back键，false：显示关闭按钮，无需屏蔽物理 back键
 * @param {*} loginSuccessCallback 再次登陆成功后的回调
 * @param {Function/String} callback 回调函数
 */
function _loggoutScheme (callback) {
    let data = {};
    _invoke('loggout', { data }, callback);
}

/*
 * gps
 * @param {Function/String} callback 回调函数
 */
function _gpsScheme (callback) {
    let data = {};
    _invoke('gps', { data }, callback);
}

/*
 * 联系人
 * @param {Function/String} callback 回调函数
 */
function _contactScheme (callback) {
    let data = {};
    _invoke('contact', { data }, callback);
}

/*
 *  获取应用缓存
 */
function _getCacheSizeScheme (callback) {
    let data = {};
    _invoke('getCacheSize', { data }, callback);
}

/*
 * 清除应用缓存
 * @param {Function/String} callback 回调函数
 */
function _clearCacheScheme (callback) {
    let data = {};
    _invoke('clearCache', { data }, callback);
}

/*
 * 跳转系统设置页面
 * @param {Function/String} callback 回调函数
 */
function _goSystemSettingScheme (callback) {
    let data = {};
    _invoke('gotoSetting', { data }, callback);
}

/*
 *  跳转微信
 * @param {Function/String} callback 回调函数
 */
function _goWechatScheme (callback) {
    let data = {};
    _invoke('gotoWx', { data }, callback);
}

/*
 *  app评价/鼓励一下
 * @param {Function/String} callback 回调函数
 */
function _appEvaluationScheme (callback) {
    let data = {};
    _invoke('appEvaluation', { data }, callback);
}

/**
 * 复制文字
 * @param {String} textInfo 复制的文字
 * @param {Function/String} callback 回调函数
 */
function _copyTextScheme (textInfo, callback) {
    let data = {
        textInfo
    };
    _invoke('copyText', { data }, callback);
}

/**
 * 甲方产品详情页
 * @param {String} productCode 产品code
 * @param {Function/String} callback 回调函数
 */
function _productDetailScheme (productCode, isDetail, redirectUrl, callback) {
    if (isDetail !== 'detail') {
        util.setProducts(productCode);
    }
    let {
        packageName,
        channelKey,
        version,
        platform,
        deviceToken,
        uid
    } = service.baseParams;
    // 添加跳转甲方字段
    let stringmeg = {
        packageName,
        channelKey,
        version,
        platform,
        deviceToken,
        uid,
        productCode,
        shownav: true
    };
    if (redirectUrl) {
        stringmeg.partnerUrl = redirectUrl;
    }
    let data = {
        url:
            process.env.VUE_APP_API +
            service.goFirstParty +
            '?' +
            qs.stringify(stringmeg).replace(/&/g, '%26')
    };
    let scheme =
        'wode-schema://productDetail?data=' +
        encodeURIComponent(JSON.stringify(data));

    _createScheme(scheme);
}
/**
 * 跳转外部地址
 * @href
 *
 */
function _openOutUrl (href) {
    let url = href;
    let arr = url.split('?');
    let temp;

    if (arr.length > 1) {
        temp = arr[1].split('&');
        for (let index = 0; index < temp.length; index++) {
            const element = temp[index];
            if (element.indexOf('%26') > -1 || element.indexOf('%22') > -1) {
                temp[index] = encodeURIComponent(element);
            }
        }
        arr[1] = temp.join('&');
        url = arr[0] + '?' + encodeURIComponent(arr[1].replace(/&/g, '%26'));
    }

    let scheme =
        'wode-schema://productDetail?data=' +
        encodeURIComponent(JSON.stringify({ url }));

    _createScheme(scheme);
}

/**
 * 保存图片到本地
 * @param {String} url 保存图片到本地
 * @param {Function/String} callback 回调函数
 */
function _saveImageToAlbumScheme (url, callback) {
    let data = {
        url
    };
    _invoke('saveImageToAlbum', { data }, callback);
}
/**
 * 打开页面
 * callback nativelog为bankcard时用了，其他没用
 * reload 操作成功后是否需要刷新h5页面,true-->刷新 false-->不刷新
 * xms.openNativePage('identity'); // 实名认证
 * xms.openNativePage('repayment'); // 客户端还款
 * xms.openNativePage('creditCheck'); // 跳转前置校验
 * xms.openNativePage('bankcard'); // 跳转绑定银行卡
 */
function _openNativePage (nativelog, callback, reload) {
    let data = {
        reload
    };
    _invoke(nativelog, { data }, callback);
}

/**
 * 原生发送验证码
 *
 *
 */
function _sendCode (bankCardId, callback) {
    let data = {
        bankCardId
    };
    _invoke('sendCode', { data }, callback);
}

/**
 * 三大检测调用原生支付宝支付
 * @param {String} transactionalCode 订单code
 * @param {String} extend
 * @param {Function/String} callback 回调函数
 */
function _detection (transactionalCode, extend, callback) {
    let data = {
        transactionalCode,
        extend
    };
    _invoke('detection', { data }, callback);
}

/**
 * 跳转首页贷款
 */
function _showList () {
    _invoke('showList');
}

/*
 *  关闭webview刷新
 */
function _goBackReload () {
    _invoke('goBackReload');
}
/*
 *  关闭两层页面 页面可配置
 * xms.backTwoPage('identity'); 打开实名认证页面，如果用户没有实名认证，点击左上角关掉实名认证页面，就把当前的webview也关闭
 */
function _backTwoPage (nativePage, callback) {
    let data = {
        nativePage
    };
    _invoke('backTwoPage', { data }, callback);
}

/**
 *  分享
 */
function _shareUri (
    url = '',
    title = '分享到',
    shareTitle = '给你推荐一款优质贷款产品',
    shareDescription = '快点击看看吧'
) {
    if (url) {
        let data = {
            url: encodeURIComponent(url.replace(/&/g, '%26')),
            title,
            shareTitle,
            shareDescription
        };
        _invoke('shareUri', { data });
    } else {
        _invoke('shareUri');
    }
}

/**
 * 跳转贷款列表
 */
function _goLoanList () {
    _invoke('loanList');
}

/**
 * 量化派 身份认证和人脸识别
 * ocr 1 : 进行身份认证  2 : 跳过身份认证进行人脸识别
 */
function _identityAuth (ocr, productCode) {
    let data = { ocr, productCode };
    _invoke('identityAuth', { data });
}

window.xms = {
    open2: _openNewWebviewScheme2,
    open: _openNewWebviewScheme,
    close: _closeWebviewScheme,
    ocr: _ocrScheme,
    appInfo: _appInfoScheme,
    login: _callLoginScheme,
    logout: _loggoutScheme,
    gps: _gpsScheme,
    concact: _contactScheme,
    getCacheSize: _getCacheSizeScheme,
    clearCache: _clearCacheScheme,
    goSystemSetting: _goSystemSettingScheme,
    goWechat: _goWechatScheme,
    appEvaluation: _appEvaluationScheme,
    copyText: _copyTextScheme,
    productDetail: _productDetailScheme,
    saveImageToAlbum: _saveImageToAlbumScheme,
    openOutUrl: _openOutUrl,
    openNativePage: _openNativePage,
    detection: _detection,
    showList: _showList,
    goBackReload: _goBackReload,
    sendCode: _sendCode,
    backTwoPage: _backTwoPage,
    shareUri: _shareUri,
    goLoanList: _goLoanList,
    identityAuth: _identityAuth
};
