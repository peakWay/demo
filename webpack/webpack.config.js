
const path = require('path')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

//js压缩（webpack4.x版本生成的chunk会自动压缩）
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

//单页面插件(可以chunk或本地文件中的js、css插入进生成的html中的script、link中)
const { WebPlugin } = require('web-webpack-plugin')

console.log(__dirname)
console.log(process.env.NODE_ENV, 'env')

module.exports = {
    entry: {
        main: './main.js',
        entry: './entry.js'
    },
    // './main.js'
    output: {
        filename: () => {
            return '[name].js'
        },
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname)
        }
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
                //从后到前编译
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: ['vue-loader'],
                // exclude: path.resolve(__dirname, 'node_modules')
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: (e) => {
                return '[name].css'
            },
            chunkFilename: '[id].css'
        }),
        //生成单页面文件
        new WebPlugin({
            template: './template.html',
            filename: 'web.html'
        }),
        new VueLoaderPlugin()  ///15版本的vue-loader需要加
    ],
    devServer: {
        // host: '192.168.31.246',
        // open: true   //自动用默认浏览器打开
        // historyApiFallback: true
        // disableHostCheck: true  //允许其他设备通过IP地址访问(设置不设置都可以访问)
    },
}