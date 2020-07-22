const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const baseConfig = require('./dll.base');
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
module.exports = merge(
    baseConfig, {
        mode: 'production',
        devtool: false,
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
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            new CompressionPlugin({}),
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css'
            }),
            new webpack.DllReferencePlugin({
                manifest: require(path.join(__dirname, '..', 'vendor1-manifest.json'))
            }),
            // new BundleAnalyzerPlugin({analyzerPort: 8090})
        ]
    })