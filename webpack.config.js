const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
module.exports = {
    entry: {
        app: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),  //__dirname its a shorthand that brings the actual path directory of this file
        filename: 'js/[name].js',
        publicPath: 'http://localhost:3001/',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                ]
            },
            {
                test: /\.(jpg|png|gif|woff|eot|ttf|svg|mp4|webm|wav)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 1000
                    }
                },
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
        }),
        new webpack.DllReferencePlugin({
            manifest: require('./modules-manifest.json'),
            context: path.resolve(__dirname, "src")
        }),
        new AddAssetHtmlPlugin({
            filepath: path.resolve(__dirname, 'dist/js/*.dll.js'),
            outputPath: 'js',
            publicPath: 'http://localhost:3001/js'
        })
    ],
}
