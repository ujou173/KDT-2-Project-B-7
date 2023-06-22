const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    index: "./src/component/index.tsx"
  },
  output: {
    path: path.join(__dirname, "..", "server", "public"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: [/\.tsx$/],
        use: [
          "babel-loader",
          "ts-loader"
        ]
      },
      {
        test: [/\.css$/],
        use: [
          "style-loader",
          "css-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      ".js", ".jsx", ".ts", ".tsx", ".css"
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/html/index.html"
    })
  ],
  devServer: {
    port: 8080,
    hot: true
  },
  "devtool": "source-map"
}