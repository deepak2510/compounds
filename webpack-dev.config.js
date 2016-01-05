const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    path.join(__dirname, './docs/src/app/app.js')
  ],

  output: {
    path: path.join(__dirname, './docs/src/www'),
    publicPath: '/',
    filename: 'app.js'
  },

  resolve: {
    alias: {
      'pearson-compounds': path.join(__dirname, './src'),
      'main.scss': path.join(__dirname, './docs/src/www/scss/main.scss')
    }
  },

  debug: true,

  devtool: '#eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, './docs/src/www'),
    hot: true
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  module: {
    loaders: [
      { test: /\.(woff|ttf|eot|svg)(\?[a-z0-9]+)?$/, loaders: ['file'] },
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
    ]
  }

};
