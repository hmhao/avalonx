const buble = require('rollup-plugin-buble')
const replace = require('rollup-plugin-replace')
const version = process.env.VERSION || require('../package.json').version

module.exports = {
  entry: process.env.ESM ? 'src/index.esm.js' : 'src/index.js',
  dest: process.env.ESM ? 'dist/avalonx.esm.js' : 'dist/avalonx.js',
  format: process.env.ESM ? 'es' : 'umd',
  moduleName: 'Avalonx',
  plugins: [
    replace({ __VERSION__: version }),
    buble()
  ],
  banner:
`/**
 * avalonx v${version}
 * (c) ${new Date().getFullYear()} hmhao
 * @license MIT
 */`
}
