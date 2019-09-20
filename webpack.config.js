const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production'
  return {
    entry: [
      "@babel/polyfill",
      path.join(__dirname, './src/index.js')
    ],
    devServer: {
      port: 3001, //端口号
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          use: [{
              loader: "html-loader",
              options: {
                  minimize: true
              }
          }]
        },
        // {
        //   test: /\.js$/,
        //   exclude: /node_modules/,
        //   loader: 'babel-loader',
        //   options: {}
        // },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
              loader: "babel-loader"
          }
        },
        {
          test: /\.(less|css)$/,
          use: [
              devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'less-loader',
          ]
        },
        // {
        //   test: /\.css$/,
        //   use: [
        //     devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        //     'css-loader',
        //     'postcss-loader'
        //   ] 
        // },
        {
          test: /\.(png|jpg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        }
      ],
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new CleanWebpackPlugin(),
    ]
  }
}