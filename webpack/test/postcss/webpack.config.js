
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env, argv) => {
    console.log(env, '看看数据')
    return {
        entry: './main.js',
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin()
        ]
    }
}