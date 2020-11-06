
const path = require('path');
const fs = require('fs');
// const ExtractTextPlugin = require('extract-text-webpack-plugin')

//js压缩（webpack4.x版本生成的chunk会自动压缩）
// const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const VueLoaderPlugin = require('vue-loader/lib/plugin');

//单页面插件(可以chunk或本地文件中的js、css插入进生成的html中的script、link中)
const { WebPlugin, AutoWebPlugin } = require('web-webpack-plugin');

//模块热替换更新文件名
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

console.log(__dirname)
console.log(process.env.NODE_ENV, 'env')

function getEntryFilesRelativePath(cPath) {
    let files = fs.readdirSync(cPath)    

    return files.reduce((pre, cur) => {
        let fPath = path.join(cPath, cur)

        if (fs.statSync(fPath).isFile() && path.extname(cur) == '.js') {
            pre = pre.concat('./' + fPath)
        }

        return pre
    }, [])
}

// const autoWebPlugin = new AutoWebPlugin('pages', {
//     template: './template.html',
//     postEntrys: ['./common.js'],
//     stylePublicPath: './style.css'
// })


module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        main: getEntryFilesRelativePath('./entry'),
        // ...autoWebPlugin.entry()
    },
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
            },
            //加载图片
            {
                test: /\.(png|JPG|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //小于30k才转换成base64编码
                            limit: 1024 * 30,
                            //否则用file-loader加载(默认)
                            // fallback: 'file-loader'
                        }
                    }
                ]
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
        // new WebPlugin({
        //     template: './template.html',
        //     filename: 'web.html'
        // }),
        new VueLoaderPlugin(),  ///15版本的vue-loader需要加
        // autoWebPlugin

        new NamedModulesPlugin()
    ],
    devServer: {
        // host: '192.168.31.246',
        // open: true   //自动用默认浏览器打开
        // historyApiFallback: true
        // disableHostCheck: true  //允许其他设备通过IP地址访问(设置不设置都可以访问)
    },
    // devtool: 'source-map' 在生产环境下会暴露源码
}