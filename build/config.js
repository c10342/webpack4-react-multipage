
const path = require('path')

const fs = require('fs')

const srcRoot = path.resolve(__dirname, '../src')

const pageDir = path.resolve(srcRoot, 'page')

const outputPath = path.resolve(__dirname, '../dist')

const mainFile = 'index.js'

const mainHtml = 'index.html'

const proVariablePath = path.resolve(__dirname,'../.pro')

const devVariablePath = path.resolve(__dirname,'../.dev')


function readFileContentToEnvObj(pathStr) {
    let obj = {}
    if (fs.existsSync(pathStr) && fs.statSync(pathStr).isFile()) {
        const result = fs.readFileSync(pathStr).toString()
        if (result) {
            const envArr = result.split('\r\n')
            if (envArr.length > 0) {
                for (let i = 0; i < envArr.length; i++) {
                    try {
                        const envItem = envArr[i].split('=')
                        if (envItem.length > 0) {
                            const a = envItem[0].trim()
                            const b = envItem[1].trim()
                            if (a && b) {
                                obj[a] = JSON.stringify(b)
                            }
                        }
                    } catch (error) { }
                }
            }
        }

    }
    return obj
}


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

const devObj = readFileContentToEnvObj(devVariablePath)

const proObj = readFileContentToEnvObj(proVariablePath)

module.exports = {
    mainHtml,
    mainFile,
    outputPath,
    pageDir,
    srcRoot,
    entry,
    devObj,
    proObj
}