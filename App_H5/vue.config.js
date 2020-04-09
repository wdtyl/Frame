const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const glob = require('glob');
const pages = {};
const titles = require('./titles.js');
glob.sync('./src/pages/**/*.js').forEach((filePath) => {
    let chunk = filePath.split('./src/pages/')[1].split('/')[0];
    pages[chunk] = {
        entry: filePath,
        template: 'public/index.html',
        filename: chunk + '.html',
        title: titles[chunk],
        chunks: ['chunk-vendors', 'chunk-common', chunk]
    };
});

// 打包分析工具，可选用
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // devServer: {
    //     host: '192.168.2.124',
    //     port: '8888'
    // },
    publicPath: './',
    outputDir: process.env.outputDir,
    pages,
    configureWebpack: config => {
        // webPac配置
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            return {
                optimization: {
                    minimizer: [
                        new UglifyJsPlugin({
                            uglifyOptions: {
                                warnings: false,
                                compress: {
                                    drop_console: true, // console
                                    drop_debugger: false,
                                    pure_funcs: ['console.log'] // 移除console
                                }
                            }
                        })
                    ]
                },
                plugins: [
                    // new BundleAnalyzerPlugin()
                ]
            };
        } else {
            // 为开发环境修改配置...
        }
    },
    chainWebpack: config => {},
    css: {
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: '@import "@/variables.scss";'
            }
        }
    }
};
