
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HappyPack = require('happypack')

//webpack-bundle-analyzer [jsonFilePath] 可视化 

module.exports =  {
    mode: 'development',
    entry: {
        'a': './entry/a.js',
        'b': './entry/b.js',
        'c': './entry/c.js',
        'd': './entry/d.js'
    },
    output: {
        filename: () => {
            return '[name].js'
        },
        chunkFilename: '[name].js',
        // (e) => {
        //     console.log(e)
        //     // return
        // },
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        mainFields: ['jsnext:main', 'main'],
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                use: 
                ['babel-loader'],
                // ['happyPack/loader?id=babel'],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
            },
        ]
    },
    plugins: [
        // new HappyPack({
        //     id: 'babel',
        //     loaders: ['babel-loader?cacheDirectory']
        // }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new VueLoaderPlugin(),
    ],
    optimization: {
        splitChunks: {
            /* 默认配置 */
            // chunks: "async",
            // minSize: 30000,
            // minChunks: 1,
            // maxAsyncRequests: 5,
            // maxInitialRequests: 3,
            // automaticNameDelimiter: '~',
            // name: true,
            /* 默认配置 */
            chunks: "all",
            minChunks: 2,
            cacheGroups: {
                vendor: {
                    name: 'verdor',
                    // filename: '[name].js',  //出口文件名,与权重比output.chunkFilename高
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    priority: 10,
                },
                common: {
                    name: 'common',
                    minSize: 1,
                    test: /[\\/](utils|styles)[\\/]/,
                    priority: 5
                }
                /* 默认配置 */
                // default: {
                //     minChunks: 2,
                //     priority: -20,
                //     reuseExistingChunk: true
                // }
                /* 默认配置 */
            }
        },
    }
}