const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const glob = require("glob")

const _CONFIG = {
    dist: path.resolve(__dirname, '.build/')
}

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    stats: { warnings: false },
    output: {
        path: _CONFIG.dist,
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                },
                extractComments: false,
                cache: true
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'webfonts',
                        publicPath: '../webfonts',
                    },
                }
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: _CONFIG.dist
        }),
        new CopyPlugin([
            { from: "public/fonts", to: "fonts" },
            { from: "public/images", to: "images" },
            { context: path.resolve(__dirname, 'public/'), from: "*", to: "" },
            { context: path.resolve(__dirname, 'public/'), from: ".htaccess", to: "" },
        ]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html'
        }),
        new UglifyJsPlugin(),
    ],
}