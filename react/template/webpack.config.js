
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//设置添加到每个scss文件中的变量值
module.exports = {
    entry: {
        'main': './src/main.tsx'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            '@': '/src'
        },
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                auto: /\.m\.\w+$/i
                            }
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            { 
                test: /\.tsx?$/, 
                use: ['babel-loader']
                // loader: 'awesome-typescript-loader' 
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}