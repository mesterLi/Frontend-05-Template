const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VuePlugin = require("vue-loader/lib/plugin");

module.exports = {
  entry: "./main.js",
  mode: "development",
  output: {
    filename: '[name].[hash].js',
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader', "style-loader", "css-loader"],
      }
    ],
  },
  devServer: {
    contentBase: "dist",
    port: "8888",
    host: "0.0.0.0"
  },
  plugins: [
    new VuePlugin(),
    new CleanWebpackPlugin({
      
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html"
    })
  ],
};
