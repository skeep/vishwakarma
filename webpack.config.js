var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    APP_DIR + '/index.js'
  ],
  output: {
    path: BUILD_DIR,
    publicPath: BUILD_DIR + '/',
    filename: 'bundle.js'
  },
  debug: true,
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js?/,
        include: APP_DIR,
        loaders: ['babel']
      }
    ]
  }
};

module.exports = config;
