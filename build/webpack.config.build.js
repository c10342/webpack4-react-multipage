
const path = require('path')

const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackMerge = require('webpack-merge')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const { baseConfig, pageDir, mainHtml, entry,srcRoot } = require('./webpack.config.base')


function getHtmlArray(entryMap) {
    let htmls = []

    Object.keys(entryMap).forEach(function (key) {
        const fullPathName = path.resolve(pageDir, key)

        const fileName = path.resolve(fullPathName, mainHtml)

        if (fs.existsSync(fileName)) {
            htmls.push(new HtmlWebpackPlugin({
                filename: key + '.html',
                template: fileName,
                chunks: [`vendors.${key}`, `default.${key}`, key]
            }))
        }
    })
    return htmls
}


const htmlArray = getHtmlArray(entry)


const proConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ],
                include: srcRoot
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: srcRoot + '/public/css/style.scss'
                        }
                    }
                ],
                include: srcRoot
            },
        ]
    },
    plugins: [
        ...htmlArray,
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
            chunkFilename: 'css/[name].[contenthash].chunk.css',
        }),
    ],
    optimization: {
        // 使package.json中sideEffects的文件不会被Tree Shaking掉
        usedExports: true,
        // 抽离第三方代码库
        splitChunks: {
            // 同步代码和异步代码都进行代码分割
            chunks: 'all',
            // 第三方库大于30kb才会被抽离出来
            minSize: 30000,
            // 组和文件名连接符
            automaticNameDelimiter: '.',
            // 分组内有filename就使用filename
            name: true,
            // 分组，符合上面的代码分割要求的都会跑到这里来进行分组
            cacheGroups: {
                vendors: {
                    // 在node_modules中的第三方库都会被抽离到这个分组中
                    test: /[\\/]node_modules[\\/]/,
                    // 当被抽离的代码符合多个分组时，会优先打包到priority值比较大的分组中
                    priority: -10,
                    // 打包后的文件名，使用懒加载（异步加载）的时候不能写文件名，否则会有冲突
                    // filename: 'js/venders.js'
                },
                default: { // 默认分组，所有没有匹配到分组的都会被放到这里来
                    priority: -20,
                    // 已经被打包过的文件不会被再次打包，会复用前面已经打包过的文件
                    reuseExistingChunk: true,
                }
            }
        }
    }
}


module.exports = webpackMerge(baseConfig, proConfig)