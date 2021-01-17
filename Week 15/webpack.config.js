const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./timeline-test.js",
  output: {
    filename: "timeline-test.js"
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "Timeline.html",
      template: "./Timeline.html"
    })
  ]
}