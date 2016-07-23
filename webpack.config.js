import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

const basicConfigs = {
  dev: {
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      APP_DIR + '/index.js'
    ],
    debug: true,
    devtool: 'source-map'
  },
  prod: {
    entry: [
      APP_DIR + '/index.js'
    ],
    debug: false,
    devtool: 'cheap-module-source-map'
  }
};

const HtmlWebpackPluginConfig = {
  template: 'src/index.html.tpl',
  inject: 'body'
};

const plugins = {
  dev: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(HtmlWebpackPluginConfig)
  ],
  prod: [
    new HtmlWebpackPlugin({
      ...HtmlWebpackPluginConfig,
      minify: {
        html5: true,
        collapseWhitespace: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    })
  ]
};

const commonConfig = {
  output: {
    path: BUILD_DIR,
    publicPath: './',
    filename: 'bundle.js'
  },
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

const dev = {
  ...commonConfig,
  ...basicConfigs.dev,
  plugins: plugins.dev
};

const prod = {
  ...commonConfig,
  ...basicConfigs.prod,
  plugins: plugins.prod,
  output: {
    ...commonConfig.output,
    filename: 'bundle-[hash].js'
  }
};

export { dev, prod }
