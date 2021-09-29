
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        'main': './main.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-typescript",
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ]
                        }
                    },
                ]
            }
        ]
    },
    // devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ]
}