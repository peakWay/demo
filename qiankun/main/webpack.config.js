const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-react-jsx'],
                  },
                },
            },
            {
                test: /.(le|c)ss$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
    ],
    devtool: 'source-map',
    devServer: {
        // port: '8070',
        // allowedHosts: 'all',
        // headers: {
        //     'Access-Control-Allow-Origin': '*', // 允许所有源跨域
        // },
        // static: {
        //     directory: path.join(__dirname, 'public'),
        // },
        
        // compress: true,
        open: true,
        port: '8070',
        // clientLogLevel: 'warning',
        // disableHostCheck: true,
        compress: true,
        headers: {
        'Access-Control-Allow-Origin': '*',
        },
        historyApiFallback: true,
    }
}