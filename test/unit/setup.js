import 'babel-polyfill'
import avalon from 'avalon2/dist/avalon.js'
import Avalonx from '../../dist/avalonx.js'

global.name = ''//avalon的bug,这里要设置一下

avalon.config({debug: true})
var avalonDefine = avalon.define
avalon.define = function (definition) {
  if(definition.computed){
    definition['$computed'] = definition['$computed'] || {}
    avalon.mix(definition['$computed'], definition.computed)
      delete definition.computed
  }
  if(definition.methods){
    avalon.mix(definition, definition.methods)
    delete definition.methods
  }
  return avalonDefine.call(avalon, definition)
}