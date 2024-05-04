const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package');

const port = 3030; // dev port

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port,
    headers: {
        'Access-Control-Allow-Origin': '*', // 允许所有源跨域 
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },

})
