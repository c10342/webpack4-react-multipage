
const path = require('path')

const fs = require('fs')

const CopyPlugin = require('copy-webpack-plugin')

const srcRoot = path.resolve(__dirname, '../src')

const pageDir = path.resolve(srcRoot, 'page')

const outputPath = path.resolve(__dirname, '../dist')

const mainFile = 'index.js'

const mainHtml = 'index.html'

// 获取page下的所有入口文件
function getEntry() {
    let entryMap = {}
    // E:\Users\Adminator\Desktop\react-waimai\src\page\index\index.js
    fs.readdirSync(pageDir).forEach(function (pathName) {
        // pathName=index
        // fullPathName=\src\page\index
        const fullPathName = path.resolve(pageDir, pathName)

        let stat = fs.statSync(fullPathName)
        // fileName=\src\page\index\index.js
        let fileName = path.resolve(fullPathName, mainFile)

        if (stat.isDirectory() && fs.existsSync(fileName)) {
            entryMap[pathName] = fileName
        }
    })

    return entryMap
}

const entry = getEntry()

const baseConfig = {
    entry,
    output: {
        path: outputPath,
        filename: 'js/[name].[hash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                include: srcRoot
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name].[hash].[ext]',
                        outputPath: 'images/',
                        limit: 10240
                    }
                }
            }
        ]
    },
    plugins:[
        new CopyPlugin([
            { from: path.resolve(srcRoot,'./static'), to: path.resolve(outputPath,'./static'), force:true},
          ])
    ]
}


module.exports = {
    baseConfig,
    pageDir,
    mainHtml,
    entry,
    srcRoot,
    outputPath
}