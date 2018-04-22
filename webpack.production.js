const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

 module.exports = merge(common, {
   mode: 'production',

   output: {
     filename: '[name].[hash].bundle.js',
     chunkFilename: '[name].[chunkhash].bundle.js'
   },

   plugins: [
   	new SWPrecacheWebpackPlugin(),
    new CompressionPlugin()
   ],

   optimization: {
   	minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
              global_defs: {
                  "process.env.NODE_ENV": "production"
              }
          },
          mangle: true,
          keep_fnames: true,
          output: {
            beautify: false,
            comments: false
          }
        }
      })
    ]
   }
   
 });