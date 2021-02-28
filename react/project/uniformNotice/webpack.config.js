
const path = require('path');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'main': './src/main.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '/dist')
    },
    resolve: {
        alias: {
            '@': '/src'
        }
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss/,
                use: [
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new miniCssExtractPlugin(),
        new htmlWebpackPlugin({
            template: './index.html'
        })
    ]
}