const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const px2rpx = require('./gulp-px2rpx')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const babel = require('gulp-babel')
const changed = require('gulp-changed')
const replace = require('gulp-replace')
const moduleResolve = require('./module-resolver')
const watch = require('gulp-watch')
const batch = require('gulp-batch')
const ts = require("gulp-typescript")
const tsProject = ts.createProject("tsconfig.json")
const plumber = require('gulp-plumber')
const fs = require('fs')

const SRC_PATH = './src/**'
const paths = {
    npmPath: `${SRC_PATH}/npm/*.js`,
    wxmlPath: `${SRC_PATH}/*.wxml`,
    jsonPath: `${SRC_PATH}/*.json`,
    wxsPath: `${SRC_PATH}/*.wxs`,
    jsPath: `${SRC_PATH}/*.js`,
    tsPath: `${SRC_PATH}/*.ts`,
    imgPath: [`${SRC_PATH}/*.png`, `${SRC_PATH}/*.jpg`, `${SRC_PATH}/*.jpeg`, `${SRC_PATH}/*.gif`, `${SRC_PATH}/*.svg`],
    wxssPath: [`${SRC_PATH}/*.wxss`, `${SRC_PATH}/*.scss`],
    dest: './dist'
}

const webpackConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
        ]
    },
    output: {
        filename: 'index.js',
        libraryTarget: 'commonjs2',
    }
}

// 通过webpack把所有npm包打包在一起
gulp.task('npm', () => {
    gulp.src(paths.npmPath)
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest(`${paths.dest}/npm`))
})
   
// 直接copy wxml
gulp.task('wxml', () => {
    gulp.src(paths.wxmlPath)
    .pipe(changed(paths.dest))
    .pipe(gulp.dest(paths.dest))
})

// 直接copy json
gulp.task('json', () => {
    gulp.src(paths.jsonPath)
    .pipe(changed(paths.dest))
    .pipe(gulp.dest(paths.dest))
})
// 直接copy wxs
gulp.task('wxs', () => {
    gulp.src(paths.wxsPath)
    .pipe(gulp.dest(paths.dest))
})

gulp.task('js', () => {
    gulp.src([paths.jsPath, `!${paths.npmPath}`])
    .pipe(plumber())
    .pipe(changed(paths.dest))
    .pipe(babel({
        "presets": [
            ["env", {
              "modules": false,
              "targets": {
                "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
              }
            }],
            "stage-2"
          ],
        "plugins": [
            ["module-resolver", {
                "alias": {
                    "@": './src'
                }
            }]
        ]
    }))
    .pipe(replace('process.env.NODE_ENV', `'${process.env.NODE_ENV}'`))
    .pipe(replace('process.env.CUSTOM_ENV', `'${process.env.CUSTOM_ENV}'`))
    .pipe(gulp.dest(paths.dest))
})

// 直接copy 图片
gulp.task('image', () => {
    gulp.src(paths.imgPath)
    .pipe(changed(paths.dest))
    .pipe(gulp.dest(paths.dest))
})

// 编译 scss 到 wxss
gulp.task('wxss', () => {
    gulp.src(paths.wxssPath)
    .pipe(plumber())
    .pipe(changed(paths.dest))
    .pipe(moduleResolve())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(px2rpx({
        screenWidth: 750, // 设计稿屏幕, 默认750
        wxappScreenWidth: 750, // 微信小程序屏幕, 默认750
        remPrecision: 6 // 小数精度, 默认6
    }))
    // pass in options to the stream
    .pipe(rename((path) => path.extname = '.wxss'))
    .pipe(gulp.dest(paths.dest))
})

gulp.task('template', () => {

    let type = process.argv.find(item => {
        return item == '--page' || item == '--component'
    })
    let typeFlagIndex = process.argv.findIndex(item => {
        return item == '--page' || item == '--component'
    })

    let templateName = type.slice(2)

    let rawName = process.argv[typeFlagIndex + 1]

    // 深层路径处理, 如 /log/paylogComponent,  只是创建组件的时候, 页面不会有深层页面
    let names = rawName.split('/')
    let name = names[names.length - 1]

    let newFilePath = ''

    let path = process.argv.find(item => {
        return item == '--path'
    })
    if( path ) {
        let argvPath = getPath()
        newFilePath = `./src/${argvPath}/${templateName}s/${rawName}`
    } else {
        newFilePath = `./src/${templateName}s/${rawName}`
    }

    try {
        let subPackageName = getPath()
        let page = `${templateName}s/${name}/${name}`

        let appJson = fs.readFileSync('./src/app.json')
        appJson = JSON.parse(appJson.toString())

        // 创建子模块页面
        if( path ) {

            if( !appJson.subPackages ) {
                appJson.subPackages = []
            }

            let subPackage = appJson.subPackages.find(item => item.root == subPackageName)
            if( !subPackage ) {
                subPackage = {
                    root: subPackageName,
                    pages: []
                }
                appJson.subPackages.push(subPackage)
            }
            let pageExist = subPackage.pages.find(item => item == page)
            if ( !pageExist ) {
                subPackage.pages.push(page)
            }

        // 创建根模块页面
        } else {
            if( !appJson.pages ) {
                appJson.pages = []
            }

            let pageExist = appJson.pages.find(item => item == page)
            if ( !pageExist ) {
                appJson.pages.push(page)
            }
        }

        appJson = JSON.stringify(appJson, null, 4)
        fs.writeFileSync('./src/app.json', appJson)
    } catch (error) {
        console.error('生成app.json失败', error)
    }

    gulp.src(`./template/${templateName}/*`)
    .pipe(rename((path) => path.basename = name))
    .pipe(gulp.dest(newFilePath))
})

function getPath () {
    let argvPathIndex = process.argv.findIndex(item => {
        return item == '--path'
    })
    return process.argv[argvPathIndex + 1]
}

gulp.task('tsc', () => {
    tsProject.src()
    .pipe(plumber())
    .pipe(changed(paths.dest))
    .pipe(tsProject())
    .pipe(babel({
        "presets": [
            ["env", {
              "modules": false,
              "targets": {
                "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
              }
            }],
            "stage-2"
          ],
        "plugins": [
            ["module-resolver", {
                "alias": {
                    "@": './src'
                }
            }]
        ]
    }))
    .pipe(replace('process.env.NODE_ENV', `'${process.env.NODE_ENV}'`))
    .pipe(replace('process.env.CUSTOM_ENV', `'${process.env.CUSTOM_ENV}'`))
    .pipe(gulp.dest(paths.dest))
})


//监听任务
gulp.task('watch', () => {

    watch(paths.wxssPath, batch(function (events, done) {
        gulp.start('wxss', done);
    }))

    watch(paths.wxmlPath, batch(function (events, done) {
        gulp.start('wxml', done);
    }))

    watch(paths.jsonPath, batch(function (events, done) {
        gulp.start('json', done);
    }))
    watch(paths.jsonPath, batch(function (events, done) {
        gulp.start('json', done);
    }))

    watch(paths.jsPath, batch(function (events, done) {
        gulp.start('js', done);
    }))
    watch(paths.tsPath, batch(function (events, done) {
        gulp.start('tsc', done);
    }))

    watch(paths.wxsPath, batch(function (events, done) {
        gulp.start('wxs', done);
    }))

    watch(paths.imgPath, batch(function (events, done) {
        gulp.start('image', done);
    }))

})

// 执行打包任务
gulp.task('build', ['wxml', 'json', 'js', 'tsc', 'wxss', 'image', 'wxs', 'npm', 'watch'])