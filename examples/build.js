process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

webpackConfig.output.publicPath = '/avalonx' + webpackConfig.output.publicPath

webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  console.log('  Build complete.\n')
  console.log(
    '  Tip: built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
  )
})
