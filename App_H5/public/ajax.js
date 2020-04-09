function formsParams(data) {
    var arr = []
    for (var prop in data) {
        arr.push(prop + '=' + data[prop])
    }
    return arr.join('&')
}

function _ajax(options) {
    var request = new XMLHttpRequest()
    var params
    if (options.data) {
        if (typeof options.data === 'object') {
            params = formsParams(options.data)
        } else {
            params = options.data
        }
    }

    if (options.type.toLowerCase() === 'post') {
        request.open(options.type.toUpperCase(), options.url, true)
    } else {
        if (params) {
            request.open(
                options.type.toUpperCase(),
                options.url + '?' + params,
                true
            )
        } else {
            request.open(options.type.toUpperCase(), options.url, true)
        }
    }

    request.onload = function(data) {
        if (request.status == 200) {
            try {
                var data = JSON.parse(request.responseText)
            } catch (error) {
                var data = request.responseText
            }
            options.success && options.success(data)
        } else {
            var error = request
            try {
                error.responseJSON = JSON.parse(request.responseText)
            } catch (error) {
                error.responseJSON = request.responseText
            }
            options.fail && options.fail(error)
        }
    }
    request.onerror = function() {
        var error = request
        try {
            error.responseJSON = JSON.parse(request.responseText)
        } catch (error) {
            error.responseJSON = request.responseText
        }
        options.fail && options.fail(error)
    }
    if (options.type.toLowerCase() === 'post') {
        if (options.contentType) {
            request.setRequestHeader('Content-Type', options.contentType)
        } else {
            request.setRequestHeader(
                'Content-Type',
                'application/x-www-form-urlencoded'
            )
        }
        if (params) {
            request.send(params)
        } else {
            request.send()
        }
    } else {
        request.send()
    }
}
