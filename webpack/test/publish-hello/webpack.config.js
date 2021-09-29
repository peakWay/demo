
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib'),
        // libraryTarget: 'commonjs2'
    },
    externals: /^(react|babel-runtime|css-loader|mini-css-extract-plugin|babel-plugin-transform-runtime|babel-preset-env|babel-preset-react|babel-core)/,
    module: {
        rules: [
            {
                test: /\.js/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}



