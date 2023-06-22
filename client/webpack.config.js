const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    index: "./index.tsx"
  },
  output: {
    path: path.join(__dirname, "build"),
    fileName: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: [/\.tsx/],
        use: [
          "babel-loader",
          "ts-loader"
        ]
      }
    ]
  },
  resolve: {
    extentions: [
      "js", "jsx", "ts", "tsx"
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  devServer: {
    port: 8080,
    hot: true
  }
}