require('babel-core/register');

const webpack = require('webpack');
const config = require('../webpack.config.js').prod;

const bundler = webpack(config);

bundler.run(function(err, stats) {
  if (err) {
    console.error(err);
  }
  console.log(stats.toString());
});
