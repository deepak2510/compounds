const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack-dev.config');
const bundler = webpack(config);

browserSync({
  server: {
    baseDir: 'docs/src/www',

    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: config.output.publicPath,
        stats: { colors: true }
      }),

      webpackHotMiddleware(bundler)
    ],

    // Watch these files for changes. No need to watch *.js because
    // webpack takes care of it for us with hot module replacement,
    // with fallback to full page reload.
    files: [
      'docs/src/www/scss/*.scss',
      'docs/src/www/*.html'
    ]
  }
});
