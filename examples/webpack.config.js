const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const es3ifyPlugin = require('es3ify-webpack-plugin')
const ReplacePlugin = require('replace-bundle-webpack-plugin')

module.exports = {

  devtool: 'inline-source-map',

  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.js')
    if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }

    return entries
  }, {}),

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/dist/'
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },

  resolve: {
    alias: {
      avalonx: path.resolve(__dirname, '../dist/avalonx.esm.js')
    }
  },

  plugins: [
    new es3ifyPlugin(),
    new ReplacePlugin([{
      partten: /Object\.defineProperty\((__webpack_exports__|exports),\s*"__esModule",\s*\{\s*value:\s*true\s*\}\);/g,
      replacement: function (str, p1) {
        return p1 + '.__esModule = true;';
      }
    },{
      partten: /\/\**\/\s*Object\.defineProperty\(exports,\s*name,\s*\{[^})]*\}\);/g,
      replacement: function () {
        return '/******/            exports[name] = getter;';
      }
    },{
      partten: /,\s*hotCreateRequire\(moduleId\)/g,
      replacement: function () {
        return ', (this.noHotCreateRequire ? __webpack_require__ : hotCreateRequire(moduleId))'
      }
    },{
      partten: /return\s*?(hotCreateRequire\(\d+\)\((.*)\))/g,
      replacement: function (str, p1, p2) {
        return `return this.noHotCreateRequire ? __webpack_require__(${p2}) : ${p1}`
      }
    },{
      partten: /\(function\(module\)\s*{\/\*eslint-env browser\*\//g,
      replacement: function (str) {
        return '\nif (window.noHotCreateRequire) { return }\n' + str
      }
    }]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'shared',
      filename: 'shared.js'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]

}
