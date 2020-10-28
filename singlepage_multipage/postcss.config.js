module.exports = {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: [
                'Android 4.1',
                'iOS 7.1',
                'Chrome > 31',
                'ff > 31',
                'ie >= 8'
            ]
        },
        'postcss-pxtorem': {
            rootValue: 75,
            propList: [
                '*',
                '!border',
                '!border-top',
                '!border-right',
                '!border-bottom',
                '!border-left'
            ],
            selectorBlackList: [
                'no-rem-',
                'van-swipe',
                'van-toast',
                'van-picker',
                'van-progress',
                'van-tabs',
                'van-list',
                'van-cel',
                'van-tab',
                'van-pull-refresh'
            ]
        }
    }
};
