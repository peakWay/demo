
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: {
        'event': './event.js',
        'this': './this.js'
    },
    output: {
        filename: () => {
            return '[name].js'
        },
        path: path.resolve(__dirname, './dist')
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
                use: ['babel-loader'],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new htmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}