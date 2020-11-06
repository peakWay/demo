
const path = require('path');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const UglifyEsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        main: './main.js'
    },

    output: {
        filename: () => {
            return '[name].js'
        },
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname)
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
            // {
            //     test: /\.css$/,
            //     use: ['style-loader', 'css-loader']
            // },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: path.resolve(__dirname, 'node_module')
            },
            {
                test: /\.vue$/,
                use: ['vue-loader']
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
        new VueLoaderPlugin(),  
        new NamedModulesPlugin(),
        new DllReferencePlugin({
            manifest: require('./dist/vue.manifest.json')
        }),

        new DllReferencePlugin({
            manifest: require('./dist/react.manifest.json')
        }),

        new UglifyEsPlugin({
            uglifyOptions: {
                warnings: false,
                compress: {
                    drop_console: true,
                    collapse_vars: true,
                    reduce_vars: true
                },
                output: {
                    beautify: false,
                    comments: false
                }
            }
        })
    ],

    watchOptions: {
        // ignored: /node_module/
        // aggregateTimeout: 400,
        // poll: 10
    }
}