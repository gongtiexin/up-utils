const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    },
    entry: {
        'up-utils': path.resolve(__dirname, './src/index.js')
    },
    output: {
        filename: '[name].production.js',
        chunkFilename: '[name].production.min.js',
        library: 'up-utils',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, './src')
            }
        ]
    },
    optimization: {
        minimizer: [new TerserPlugin()]
    },
    plugins: [new CleanWebpackPlugin()]
};
