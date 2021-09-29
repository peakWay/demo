
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'lib'),
        libraryTarget: 'commonjs2',
        library: 'peakWay-Hello'
    },
    externals: /^(react|babel-runtime|css-loader|mini-css-extract-plugin|babel-plugin-transform-runtime|babel-preset-env|babel-preset-react|babel-core)/,
    module: {
        rules: [
            {
                test: /\.css/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'index.css'
        })
    ],
    devtools: 'source-map'
}