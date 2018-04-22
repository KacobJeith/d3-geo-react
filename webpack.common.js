'use strict';

var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var WebpackPwaManifest = require('webpack-pwa-manifest')

module.exports = {
  target: 'web',

  entry: [
    path.join(__dirname, 'src/index.js')
  ],

  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'index_template.html')
    }),
    // new BundleAnalyzerPlugin(),
    new WebpackPwaManifest({
        name: 'HeepWebsite',
        filename: "manifest.json",
        short_name: 'Heep',
        description: 'Main Heep Website & Webstore',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        fingerprints: false,
        orientation: "landscape",
    })
  ],

  optimization: {
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendors",
                chunks: "initial"
            }
        }
    }
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js']
  },

  module: {
    rules: [
      {
        include: /(node_modules)/,
        sideEffects: false
      },
      { 
        exclude: /(node_modules)/,
        test: /\.jsx?$/, 
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|mov|mp4)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          } 
        }
      }
    ],

  }
};
