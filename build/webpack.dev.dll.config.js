const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseConfig = require('./dll.base');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
module.exports = merge(
    baseConfig, {
        mode: 'development',
        entry: {
            vendor1: ['vue', 'vue-router', 'axios', 'vue-axios', 'vuex'], //全家桶
            vendor2: ['qs','viewport-units-buggyfill','vue-awesome-swiper','dayjs'], //工具类库
            vendor4:['./src/vendor/antv-f2'],//chart 画报表
            vendor5:['ali-oss']//阿里 oss sdk
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                title: '武侯信易贷',
                filename: 'index.html',
                template: 'index.html',
                inject: 'body'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }),
            new CopyWebpackPlugin([
                {
                    from: "./src/vendor/area.json",
                    to: "./js/area.json"
                }
            ])
            // new BundleAnalyzerPlugin({analyzerPort: 8090})
        ]
    })