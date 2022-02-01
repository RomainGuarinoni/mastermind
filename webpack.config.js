const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
require('@babel/register');

module.exports = () => {
  return {
    entry: ['./src/index.ts', './src/style/global.css'],
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    plugins: [
      new htmlWebpackPlugin({
        template: 'public/index.html',
        filename: 'index.html',
        hash: true,
      }),
      new MiniCssExtractPlugin(),
    ],
  };
};
