
const path = require('path')
const through = require('through2')

/**
 * 1. 获取文件地址
 * 2. 获取当前地址
 * 3. 得到相对地址
 * 4. 解析文件buffer
 * 5. 模块替换
*/

module.exports = function moduleResolve (options) {

    var stream = through.obj(function(file, encoding, callback){
        if( !file.isBuffer() ) {
            this.push(file)
            console.log('module resolver: required')
            return
        }
        
        const fileData = JSON.parse(JSON.stringify(file))

        let srcPath = path.resolve(fileData.cwd, './src')
        let baseUrl = path.resolve(fileData.history[0], '..')

        let relative = path.relative(baseUrl, srcPath)
        var pathReg = /\\.{0}/g
        relative = relative.replace(pathReg, '/')
        let fileContent = new Buffer(fileData._contents.data).toString()

        var pathReg = /\\.{0}/g
        relative = relative.replace(pathReg, '/')

        let reg = /~@\/.{0}/g
        fileContent = fileContent.replace(reg, `${relative}/`)

        file._contents = new Buffer(fileContent)
        this.push(file)

        callback()
    })
    
    return stream
}