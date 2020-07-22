const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const baseConfig = require('./dll.base');
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
module.exports = merge(
    baseConfig, {
        mode: 'development',
        entry: {
            vendor3: ['./src/vendor/vant', 'vant/lib/index.css'], //ui库
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: '金牛邦',
                filename: 'index.html',
                template: './dist/static/index.html',
                inject: 'body'
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development')
            }),
            new webpack.DllReferencePlugin({
                manifest: require(path.join(__dirname, '..', 'vendor1-manifest.json'))
            }),
            // new BundleAnalyzerPlugin({analyzerPort: 8090})
        ]
    })