const webpack = require("webpack");
const LodashModuleReplacementPlugin = require("lodash-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const path = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "./src/index"),
  },
  output: {
    path: path.resolve(__dirname, "./lib"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "./src"),
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new LodashModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
