

const path = require('path')

const DllPlugin = require('webpack/lib/DllPlugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        'react': ['react', 'react-dom'],
        'vue': ['vue', 'vue-template-compiler']
    },

    output: {
        filename: () => {
            return '[name].dll.js'
        },
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]' //全局变量名
    },

    plugins: [
        new DllPlugin({
            name: '_dll_[name]',
            path: path.join(__dirname, 'dist', '[name].manifest.json')
        })
    ]
}