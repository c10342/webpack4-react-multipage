
const path = require('path')

const CopyPlugin = require('copy-webpack-plugin')

const {srcRoot,outputPath,entry} = require('./config')

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
    plugins: [
        new CopyPlugin([
            { from: path.resolve(srcRoot, './static'), to: path.resolve(outputPath, './static'), force: true },
        ])
    ]
}

module.exports = baseConfig