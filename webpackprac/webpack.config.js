const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    mode: "development", // So we don't need "--mode production" in the build script in package.json
    entry: {
        bundle: path.resolve(__dirname, 'src/index.js'), // __dirname to get to curr dir
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js', // dynamic for entry name, adds hash for caching
        clean: true, // prevents multiple "bundle" files
        assetModuleFilename: '[name][ext]' // retains orig asset name
    },
    devtool: 'source-map', // shows error line num for source debugging
    devServer: {
        static: { // not contentBase
            directory: path.resolve(__dirname, 'dist')
        },
        port: 3000,
        open: true, // npm run dev automatically opens browser
        hot: true, // hot reloading
        compress: true, // gzip compression
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // backwards browser compatability
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            filename: 'index.html',
            template: 'src/template.html',
        }),
        new BundleAnalyzerPlugin(),
    ]
}