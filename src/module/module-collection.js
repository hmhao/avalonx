import Module from './module'
import { forEachValue } from '../util'

if (!Array.prototype.reduce) {
  Array.prototype.reduce = function(callback /*, initialValue*/) {
    'use strict';
    if (this == null) {
      throw new TypeError('Array.prototype.reduce called on null or undefined')
    }
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function')
    }
    var t = Object(this), len = t.length >>> 0, k = 0, value;
    if (arguments.length == 2) {
      value = arguments[1]
    } else {
      while (k < len && !(k in t)) {
        k++
      }
      if (k >= len) {
        throw new TypeError('Reduce of empty array with no initial value')
      }
      value = t[k++]
    }
    for (; k < len; k++) {
      if (k in t) {
        value = callback(value, t[k], k, t)
      }
    }
    return value
  }
}

export default class ModuleCollection {
  constructor (rawRootModule) {
    // register root module (Avalon.Store options)
    this.root = new Module(rawRootModule, false)

    // register all nested modules
    if (rawRootModule.modules) {
      forEachValue(rawRootModule.modules, (rawModule, key) => {
        this.register([key], rawModule, false)
      })
    }
  }

  get (path) {
    return path.reduce((module, key) => {
      return module.getChild(key)
    }, this.root)
  }

  getNamespace (path) {
    let module = this.root
    return path.reduce((namespace, key) => {
      module = module.getChild(key)
      return namespace + (module.getNamespaced() ? key + '/' : '')
    }, '')
  }

  update (rawRootModule) {
    update(this.root, rawRootModule)
  }

  register (path, rawModule, runtime = true) {
    const parent = this.get(path.slice(0, -1))
    const newModule = new Module(rawModule, runtime)
    parent.addChild(path[path.length - 1], newModule)

    // register nested modules
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime)
      })
    }
  }

  unregister (path) {
    const parent = this.get(path.slice(0, -1))
    const key = path[path.length - 1]
    if (!parent.getChild(key).runtime) return

    parent.removeChild(key)
  }
}

function update (targetModule, newModule) {
  // update target module
  targetModule.update(newModule)

  // update nested modules
  if (newModule.modules) {
    for (const key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        console.warn(
          `[avalonx] trying to add a new module '${key}' on hot reloading, ` +
          'manual reload is needed'
        )
        return
      }
      update(targetModule.getChild(key), newModule.modules[key])
    }
  }
}
