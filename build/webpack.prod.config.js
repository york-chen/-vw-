const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const HappyPack = require("happypack");
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const CompressionPlugin = require("compression-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
require("./common");
module.exports = {
  mode: "production", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: "./src/index", // string | object | array  // defaults to './src'
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "../dist/resource"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "app.[contenthash:8].js", // string
    // the filename template for entry chunks
    publicPath: "/resource/", // string    // the url to the output directory resolved relative to the HTML page
    chunkFilename: "[name].[contenthash:8].js"
  },
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.vue$/,
        include: [path.resolve(__dirname, "../src")],
        // flags to apply these rules, even if they are overridden (advanced option)
        loader: "vue-loader",
        // options for the loader
        options: {
          transformAssetUrls: {
            video: ["src", "poster"],
            source: "src",
            img: "src",
            image: "xlink:href"
          },
          loaders: {
            js: "happypack/loader?id=babel"
          }
        }
      },
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "../src")],
        // flags to apply these rules, even if they are overridden (advanced option)
        use: "happypack/loader?id=babel"
        // options for the loader
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        include: [path.resolve(__dirname, "../src")],
        // flags to apply these rules, even if they are overridden (advanced option)
        loader: "url-loader",
        // options for the loader
        options: {
          limit: 10000,
          name: "resource/images/[name].[contenthash:8].[ext]"
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        // flags to apply these rules, even if they are overridden (advanced option)
        loader: "url-loader",
        // options for the loader
        options: {
          limit: 10000,
          name: "resource/fonts/[name].[contenthash:8].[ext]"
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
    /* Advanced module configuration (click to show) */
    /* Advanced module configuration (click to show) */
    /*
        下面的配置只是为了让动态require 不报警告
         */
    // require
    // unknownContextRegExp: /$^/,
    // unknownContextCritical: false,

    // require(expr)
    // exprContextRegExp: /$^/,
    // exprContextCritical: false,

        // require("prefix" + expr + "surfix")
        // wrappedContextRegExp: /$^/,
        // wrappedContextCritical: false
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
        modules: [
            path.resolve(__dirname, "../src"),
            "node_modules"
        ],
        // directories where to look for modules
        extensions: [".js", ".vue"],
        // extensions that are used
        alias: {
            // a list of module name aliases
            "@": path.resolve(__dirname, '../src'),
            'vue$': 'vue/dist/vue.esm.js'
        },
        /* alternative alias syntax (click to show) */
        /* Advanced resolve configuration (click to show) */
    },
    performance: {
        hints: "warning", // enum    maxAssetSize: 200000, // int (in bytes),
        maxEntrypointSize: 200000, // int (in bytes)
        assetFilter: function (assetFilename) {
            // Function predicate that provides asset filenames
            return assetFilename.endsWith('.js');
        }
    },
    devtool: false, // enum  // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
    context: path.resolve(__dirname, '../'), // string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option
    //   is resolved relative to this directory
    target: "web", // enum  // the environment in which the bundle should run
    // lets you provide options for webpack-serve
    stats: "errors-only",  // lets you precisely control what bundle information gets displayed
    // optimization: {
    //     splitChunks: {
    //         chunks: "all",  // async、 initial 、 all
    //         name: 'common'
    //     },
    //     runtimeChunk: 'single'
    // },
    plugins: [
        new CleanWebpackPlugin(),
        new CompressionPlugin(),
        // new BundleAnalyzerPlugin({analyzerPort: 8919}),
        new VueLoaderPlugin(),
        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, '..', 'vendor1-manifest.json')),
        }),
        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, '..', 'vendor2-manifest.json'))
        }),
        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, '..', 'vendor3-manifest.json'))
        }),
        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, '..', 'vendor4-manifest.json'))
        }),
        new webpack.DllReferencePlugin({
            manifest: require(path.join(__dirname, '..', 'vendor5-manifest.json'))
        }),
        new MiniCssExtractPlugin({
            filename: 'app.[contenthash:8].css',
            chunkFilename: "[name].[contenthash:8].css",
        }),
        new HtmlWebpackPlugin({
            title: '金牛邦',
            filename: "../index.html",
            template: 'dist/static/index.html',
            minify: {
                removeAttributeQuotes: true//压缩 去掉引号
            },
            favicon:'src/assets/images/fav.png'
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
