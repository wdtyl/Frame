// scheme 文档地址  https://git.pinganzhiyuan.com/doc/panda_tech_doc/wikis/%E6%96%B0%E7%89%88h5%E5%92%8Cnative-app-%E4%BA%A4%E4%BA%92%E7%9A%84%E5%85%B7%E4%BD%93%E5%8F%82%E6%95%B0
var schemeName = 'wode-schema://'

function _invoke(action, data, callback) {
    var scheme = schemeName + action

    var key
    for (key in data) {
        if (data.hasOwnProperty(key)) {
            if (scheme.indexOf('?') < 0) {
                scheme += '?' + key + '=' + JSON.stringify(data[key])
            } else {
                scheme += '&' + key + '=' + JSON.stringify(data[key])
            }
        }
    }

    var callbackName = ''
    if (callback) {
        if (typeof callback === 'string') {
            callbackName = callback
        } else {
            callbackName = action + Date.now()
            window[callbackName] = callback
        }
        scheme += '&callback=' + callbackName
    }
    _createScheme(scheme)
    console.log(scheme)
}

/**
 * 调用scheme
 */
function _createScheme(scheme) {
    var iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = scheme
    var body = document.body
    body.appendChild(iframe)
    setTimeout(function() {
        body.removeChild(iframe)
        iframe = null
    })
}

/**
 * 关闭 Webview
 * @param {String} tag 需要关闭的webview的tag
 * @param {Function/String} callback 回调函数
 */
function _closeWebviewScheme(tag, callback) {
    var data = {
        tag: tag
    }
    _invoke('closeNewWebview', { data: data }, callback)
}

window.xms = {
    close: _closeWebviewScheme
}
