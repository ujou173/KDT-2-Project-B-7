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
        test: [/\.tsx$/, /\.ts/],
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
    hot: true,
    proxy: {
      "/api": {
        target: "http://localhost:3500",
        changeOrigin: true,
        secure: false
      },
      "/data": {
        target: "http://localhost:3500",
        changeOrigin: true,
        secure: false
      }
    }
  },
  "devtool": "source-map"
}