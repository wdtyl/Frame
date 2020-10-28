const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const glob = require("glob");
const _pages = {};
const titles = require("./titles.js");
glob.sync("./src/pages/**/*.js").forEach(filePath => {
    let chunk = filePath.split("./src/pages/")[1].split("/")[0];
    _pages[chunk] = {
        entry: filePath,
        template: "public/index.html",
        filename: chunk + ".html",
        title: titles[chunk],
        chunks: ["chunk-vendors","manifest","chunk-common", chunk]
    };
});


module.exports = {
    publicPath: "./",
    outputDir: process.env.outputDir,
    devServer: {
        open: true, // 浏览器自动打开页面
        host: "0.0.0.0", // 如果是真机测试，就使用这个IP
        port: 8081,
        https: false,
        proxy: {
            "/": {
                target: "https://apptest.qinjia001.com/",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "/"
                }
            }
        }
    },
    pages: {
        // 首页单独一个文件
        // index: {
        //   entry: 'src/pages/index/index.js',
        //   template: 'src/pages/index/index.html',
        //   filename: 'index.html',
        //   title: '首页',
        //   chunks: ['chunk-vendors',"manifest", 'chunk-common', 'index']
        // },
        ..._pages,
        // 其他页面使用 vue + vue-router + vant
        main: {
            entry: "src/main.js",
            template: "public/main.html",
            filename: "main.html",
            title: "main",
            chunks: ["chunk-vendors","manifest","chunk-common", "main"]
        }
    },
    configureWebpack: config => {
        // webPac配置
        if (process.env.NODE_ENV === "production") {
            // 为生产环境修改配置...
            return {
                optimization: {
                    runtimeChunk: {
                        name: 'manifest'
                      },
                    minimizer: [
                        new UglifyJsPlugin({
                            uglifyOptions: {
                                warnings: false,
                                compress: {
                                    drop_console: false, // console
                                    pure_funcs: [], // 移除console
                                    drop_debugger: false
                                }
                            }
                        })
                    ]
                },
                plugins: [
                     new BundleAnalyzerPlugin()
                ]
            };
        } else {
            // 为开发环境修改配置...
        }
    },
    chainWebpack: config => {},
    css: {
        loaderOptions: {
            sass: {
                data: '@import "src/core/css/variables.scss";'
            }
        }
    }
};
