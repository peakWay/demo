
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './main.tsx'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        alias: {
            "@": "/src"
        },
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: path.resolve(__dirname, 'src/styles'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader?modules',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                include: path.resolve(__dirname, 'src/styles'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
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