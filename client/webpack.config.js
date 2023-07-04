const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
      },
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
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: './favicon.ico', to: 'favicon.ico'}
      ]
    })
  ],
  devServer: {
    port: 8080,
    hot: true,
    historyApiFallback: true,
    proxy: {
      "/socket.io": {
        target: "http://localhost:4500",
        changeOrigin: true,
        secure: false
      }
    }
  },
  "devtool": "source-map"
}