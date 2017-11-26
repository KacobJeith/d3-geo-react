'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,

  target: 'web',

  entry: ['./src/index.jsx'],

  output: {
    path: path.resolve(__dirname, "public"),
    filename: 'bundle.js',
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  module: {
    loaders: [
      { 
        exclude: /(node_modules|bower_components)/,
        test: /\.js$/, 
        loader: 'babel-loader',
      },
      { test: /\.jsx?$/, 
        loaders: ['babel-loader'], 
        exclude: /node_modules/ 
      }
    ],

  }
};