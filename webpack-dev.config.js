const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
const DESTINATION = path.resolve(__dirname, '.tmp');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',

  devServer: {
    contentBase: [
      path.join(__dirname, '.tmp'),
      path.join(__dirname, 'src/static')
    ],
    compress: true,
    port: 9000
  },

  output: {
    path: DESTINATION,
    filename: 'js/index.js'
  }
});
