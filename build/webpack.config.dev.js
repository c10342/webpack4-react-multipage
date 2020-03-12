
const path = require('path')

const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpack = require('webpack');

const webpackMerge = require('webpack-merge')

const {baseConfig,pageDir,mainHtml,entry,outputPath,srcRoot} = require('./webpack.config.base')


function getHtmlArray(entryMap) {
    let htmls = []

    Object.keys(entryMap).forEach(function (key) {
        const fullPathName = path.resolve(pageDir, key)

        const fileName = path.resolve(fullPathName, mainHtml)

        if (fs.existsSync(fileName)) {
            htmls.push(new HtmlWebpackPlugin({
                filename: key + '.html',
                template: fileName,
                chunks: [key]
            }))
        }
    })

    return htmls
}

const htmlArray = getHtmlArray(entry)


const devConfig = {
    mode: 'development',
    devServer: {
        open: true,
        contentBase: outputPath,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
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
                    'style-loader',
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
            }
        ]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ].concat(htmlArray)
}

module.exports = webpackMerge(baseConfig,devConfig)