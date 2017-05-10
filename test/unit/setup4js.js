global.name = ''//avalon的bug,这里要设置一下

require('babel-polyfill')
var avalon = require('avalon2/dist/avalon.js')
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

var Jasmine = require('jasmine');
var jasmine = new Jasmine();

jasmine.loadConfigFile(__dirname + '/jasmine.json');
jasmine.execute();