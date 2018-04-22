'use strict';
const merge = require('webpack-merge');
var webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {

  mode: 'development',

  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },

  devServer: {
    port: 9000,
    historyApiFallback: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
