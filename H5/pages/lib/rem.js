(function (win, doc) {
    var UA = navigator.userAgent,
        isAndroid = /android|adr/gi.test(UA),
        isIos = /iphone|ipod|ipad/gi.test(UA) && !isAndroid;
    var docEl = doc.documentElement;
    var refreshRem = function refreshRem() {
            var w = docEl.getBoundingClientRect().width || 375;
            var fs = w / 375 * 20;
            fs = fs > 46.875 ? 46.875 : fs;
            docEl.style.fontSize = fs + 'px';
        },
        refreshRemId;
    win.addEventListener('resize', function () {
        clearTimeout(refreshRemId);
        refreshRemId = setTimeout(refreshRem, 100);
    }, false);
    win.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            clearTimeout(refreshRemId);
            refreshRemId = setTimeout(refreshRem, 100);
        }
    }, false);
    refreshRem();
})(window, document);