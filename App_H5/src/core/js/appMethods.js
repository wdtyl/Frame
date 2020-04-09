// ios 方法

/**
 * 关闭view
 */
function closeView () {
    window.webkit.messageHandlers.OffWebview.postMessage(null);
}

/**
 * 打开view
 */
function openView () {
    window.webkit.messageHandlers.OpenNewWebview.postMessage(null);
}

/**
 * 跳转身份认证
 */
function jumpOCR () {
    window.webkit.messageHandlers.QJTurnOCR.postMessage(null);
}

/**
 * 跳转人脸识别
 */
function jumpFace() {
    window.webkit.messageHandlers.QJTurnAction.postMessage(null);
}

/**
 * 跳转通讯录
 * @param {Number} num  1 获取直系联系信息 ，2 获取朋友联系信息
 */
function jumpCantact(num) {
    window.webkit.messageHandlers.QJOpenAdressBook.postMessage(num);
}

/**
 * 返回首页
 */
function jumpIndex() {
    window.webkit.messageHandlers.QJReturnOCHome.postMessage(null);
}

export default {
    closeView,
    openView,
    jumpOCR,
    jumpFace,
    jumpCantact,
    jumpIndex
}
