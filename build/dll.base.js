const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});

module.exports = {
    context: path.resolve(__dirname, '..'),
    output: {
        path: path.resolve(__dirname, '../dist/static'),
        filename: "js/[name].[contenthash:8].js",
        library: "[name]",
        publicPath: '/static'
    },
    module: {
        rules: [{
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                exclude: /node_modules/,
                // flags to apply these rules, even if they are overridden (advanced option)
                use: "happypack/loader?id=babel"
                // options for the loader
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ],
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "url-loader",
                // options for the loader
                options: {
                    limit: 10000,
                    name: 'images/[name].[contenthash:8].[ext]'
                },
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            },
            {
                test: /\.(ttf|woff|eot)$/,
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "url-loader",
                // options for the loader
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[contenthash:8].[ext]'
                },
                include: [
                    path.resolve(__dirname, "../node_modules")
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, '..', "[name]-manifest.json"),
            name: "[name]"
        }),
        new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: 'babel',
            //如何处理  用法和loader 的配置一样
            loaders: ['babel-loader?cacheDirectory=true'],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        })
    ]
};