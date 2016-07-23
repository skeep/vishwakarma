/**
 * Created by suman on 20/07/16.
 */

var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

console.log(__dirname, config.output.publicPath);

new webpackDevServer(webpack(config), {
  contentBase: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: {
    colors: true,
    chunks: false
  }
}).listen(8080, 'localhost', function(err) {
  if (err) {
    return console.error(err)
  }
  console.log('Server listening at http://localhost:8080/');
});
