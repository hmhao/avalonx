import { mapState, mapMutations, mapGetters, mapActions, } from './helpers'
import ModuleCollection from './module/module-collection'
import { forEachValue, isObject, isPromise, assert } from './util'

export class Store {
  constructor (options = {}) {
    assert(typeof Promise !== 'undefined', `avalonx requires a Promise polyfill in this browser.`)

    const {
      plugins = []
    } = options

    let {
      state = {}
    } = options
    if (typeof state === 'function') {
      state = state()
    }

    // store internal state
    this._committing = false // 是否在进行提交状态标识，作用是保证对 avalonx 中 state 的修改只能在 mutation 的回调函数中，而不能在外部随意修改 state。
    this._actions = Object.create(null) // acitons操作对象
    this._mutations = Object.create(null) // mutations操作对象
    this._wrappedGetters = Object.create(null) // 封装后的getters集合对象
    this._modules = new ModuleCollection(options) // 支持store分模块传入，存储分析后的modules
    this._modulesNamespaceMap = Object.create(null) // 模块命名空间map
    this._subscribers = [] // 订阅函数集合，Store提供了subscribe功能
    this._watchers = [] // 用于watch组件变化

    // bind commit and dispatch to self
    const store = this
    const { dispatch, commit } = this
    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    }

    // avalonx 的初始化核心
    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    installModule(this, state, [], this._modules.root)

    // initialize the store vm, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    resetStoreVM(this, state)

    store.mapState = mapState
    store.mapGetters = mapGetters
    store.mapMutations = mapMutations
    store.mapActions = mapActions
    avalon.store = store

    // apply plugins
    plugins.forEach(plugin => plugin(this))
  }

  getState () {
    return this._vm._data.state
  }

  commit (_type, _payload, _options) {
    // check object-style commit
    const {
      type,
      payload,
      options
    } = unifyObjectStyle(_type, _payload, _options)

    const mutation = { type, payload }
    const entry = this._mutations[type]
    if (!entry) {
      console.error(`[avalonx] unknown mutation type: ${type}`)
      return
    }
    this._withCommit(() => {
      entry.forEach(function commitIterator (handler) {
        handler(payload)
      })
    })
    this._subscribers.forEach(sub => sub(mutation, this.state))
  }

  dispatch (_type, _payload) {
    // check object-style dispatch
    const {
      type,
      payload
    } = unifyObjectStyle(_type, _payload)

    const entry = this._actions[type]
    if (!entry) {
      console.error(`[avalonx] unknown action type: ${type}`)
      return
    }
    return entry.length > 1
      ? Promise.all(entry.map(handler => handler(payload)))
      : entry[0](payload)
  }

  subscribe (fn) {
    const subs = this._subscribers
    if (subs.indexOf(fn) < 0) {
      subs.push(fn)
    }
    return () => {
      const i = subs.indexOf(fn)
      if (i > -1) {
        subs.splice(i, 1)
      }
    }
  }

  watch (getter, cb) {
    assert(typeof getter === 'string', `store.watch only accepts a string.`)
    assert(!/^\s*$/.test(getter), `store.watch only accepts a non-empty string.`)
    let expr = '_data.state.' + getter
    let w = this._vm.$watch(expr, cb)
    w.expr = expr
    w.cb = cb
    this._watchers.push(w)
    return () => {
      let index = this._watchers.indexOf(w)
      if (index != -1) {
        let uw = this._watchers.splice(index, 1)[0]
        delete uw.expr
        delete uw.cb
        uw()
      }
    }
  }

  unwatch (getter, cb) {
    let uw
    if (getter) {
      assert(typeof getter === 'string', `store.watch only accepts a string.`)
      assert(!/^\s*$/.test(getter), `store.watch only accepts a non-empty string.`)
      let expr = '_data.state.' + getter
      for (let i = 0; i < this._watchers.length; ) {
        uw = this.watchers[i]
        if(uw.expr === expr && (!cb || cb === uw.cb)){
          this._watchers.splice(i, 1)
          delete uw.expr
          delete uw.cb
          uw()
        }else{
          i++
        }
      }
    } else {
      while (this._watchers.length) {
        uw = this._watchers.pop()
        delete uw.expr
        delete uw.cb
        uw()
      }
    }
  }

  replaceState (state) {
    this._withCommit(() => {
      let _data = this._vm._data
      _data.state = state
      this.state = _data.state
    })
  }

  registerModule (path, rawModule) {
    if (typeof path === 'string') path = [path]
    assert(Array.isArray(path), `module path must be a string or an Array.`)
    this._modules.register(path, rawModule)
    let state = this.state.$model
    installModule(this, state, path, this._modules.get(path))
    // reset store to update getters...
    resetStoreVM(this, state)
  }

  unregisterModule (path) {
    if (typeof path === 'string') path = [path]
    assert(Array.isArray(path), `module path must be a string or an Array.`)
    this._modules.unregister(path)
    this._withCommit(() => {
      const parentState = getNestedState(this.state, path.slice(0, -1))
      const moduleName = path[path.length - 1]
      try{
        delete parentState[moduleName]
      }catch(e){
        parentState[moduleName] = null
      }
    })
    resetStore(this)
  }

  hotUpdate (newOptions) {
    this._modules.update(newOptions)
    resetStore(this, true)
  }

  _withCommit (fn) {
    const committing = this._committing // 保存之前的提交状态
    this._committing = true // 进行本次提交
    fn() // 执行state的修改操作
    this._committing = committing // 修改完成，还原本次修改之前的状态
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null)
  store._mutations = Object.create(null)
  store._wrappedGetters = Object.create(null)
  store._modulesNamespaceMap = Object.create(null)
  const state = store.state
  // init all modules
  installModule(store, state, [], store._modules.root, true)
  // reset vm
  resetStoreVM(store, state, hot)
}

function resetStoreVM (store, state, hot) {
  const oldVm = store._vm // 缓存前vm组件

  const newWatchers = []
  store._watchers.forEach((w) => {
    newWatchers.push({
      expr: w.expr.replace('_data.state.', ''),
      cb: w.cb
    })
  })
  store.unwatch()

  const wrappedGetters = store._wrappedGetters
  const computed = {}
  // 循环所有处理过的getters，并新建computed对象进行存储
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = () => fn(store)
  })
  // bind store public getters
  // 为getters对象建立属性，使得我们通过avalon.store.getters.xxxgetter能够访问到该getters
  store.getters = avalon.define({
    $id: avalon.makeHashCode('getters'),
    $computed: computed
  })

  // 设置新的storeVm
  store._vm = avalon.define({
    $id: avalon.makeHashCode('store'),
    _data: {
      state: state
    }
  })
  store.state = store._vm._data.state

  newWatchers.forEach((w) => {
    store.watch(w.expr, w.cb)
  })

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldVm._data.state = null
      })
    }
    setTimeout(()=>{
      delete avalon.vmodels[oldVm.$id]
    }, 1)
  }
}

function installModule (store, rootState, path, module, hot) {
  const isRoot = !path.length
  const namespace = store._modules.getNamespace(path)

  // register in namespace map
  if (module.getNamespaced()) {
    store._modulesNamespaceMap[namespace] = module
  }

  // 非根组件设置 state 方法
  // set state
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1))
    const moduleName = path[path.length - 1]
    store._withCommit(() => {
      parentState[moduleName] = module.state
    })
  }

  // module上下文环境设置
  const local = module.context = makeLocalContext(store, namespace, path)
  // 注册对应模块的mutation，供state修改使用
  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key
    registerMutation(store, namespacedType, mutation, local)
  })
  // 注册对应模块的action，供数据操作、提交mutation等异步操作使用
  module.forEachAction((action, key) => {
    const namespacedType = namespace + key
    registerAction(store, namespacedType, action, local)
  })
  // 注册对应模块的getters，供state读取使用
  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key
    registerGetter(store, namespacedType, getter, local)
  })

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot)
  })
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  const noNamespace = namespace === ''

  const local = {
    dispatch: noNamespace ? store.dispatch : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (!store._actions[type]) {
          console.error(`[avalonx] unknown local action type: ${args.type}, global type: ${type}`)
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : (_type, _payload, _options) => {
      const args = unifyObjectStyle(_type, _payload, _options)
      const { payload, options } = args
      let { type } = args

      if (!options || !options.root) {
        type = namespace + type
        if (!store._mutations[type]) {
          console.error(`[avalonx] unknown local mutation type: ${args.type}, global type: ${type}`)
          return
        }
      }

      store.commit(type, payload, options)
    }
  }

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  local.getters = noNamespace
    ? () => store.getters
    : () => makeLocalGetters(store, namespace)

  local.getState = () => getNestedState(store.getState(), path)
  return local
}

const gettersCache = {}
function makeLocalGetters (store, namespace) {
  const gettersProxy = {}

  const splitPos = namespace.length

  const gettersKeys = Object.keys(store._wrappedGetters)
  if (gettersKeys.length) {
    const gettersUUID = store._vm.$id + ':' + gettersKeys.join(':')
    if (!gettersCache[gettersUUID]) {
      const computed = {}
      gettersKeys.forEach(type => {
        // skip if the target getter is not match this namespace
        if (type.slice(0, splitPos) !== namespace) return

        // extract local getter type
        const localType = type.slice(splitPos)

        // Add a port to the getters proxy.
        // Define as getter property because
        // we do not want to evaluate the getters in this time.
        computed[localType] = () => store._wrappedGetters[type](store)
      })
      gettersCache[gettersUUID] = avalon.define({
        $id: avalon.makeHashCode('localgetters'),
        $computed: computed
      })
    }
    return gettersCache[gettersUUID]
  } else {
    return {}
  }
}

function registerMutation (store, type, handler, local) {
  // 取出对应type的mutations-handler集合
  const entry = store._mutations[type] || (store._mutations[type] = [])
  // commit实际调用的不是我们传入的handler，而是经过封装的
  entry.push(function wrappedMutationHandler (payload) {
    handler(local.getState(), payload)
  })
}

function registerAction (store, type, handler, local) {
  // 取出对应type的actions-handler集合
  const entry = store._actions[type] || (store._actions[type] = [])
  // 存储新的封装过的action-handler
  entry.push(function wrappedActionHandler (payload, cb) {
    let res = handler({
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters(),
      state: local.getState(),
      rootGetters: store.getters,
      rootState: store.getState()
    }, payload, cb)
    if (!isPromise(res)) {
      res = Promise.resolve(res)
    }
    return res
  })
}

function registerGetter (store, type, rawGetter, local) {
  // getters只允许存在一个处理函数，若重复需要报错
  if (store._wrappedGetters[type]) {
    console.error(`[avalonx] duplicate getter key: ${type}`)
    return
  }
  // 存储封装过的getters处理函数
  store._wrappedGetters[type] = function wrappedGetter (store, isLocal) {
    // 为原getters传入对应状态
    return rawGetter(
      local.getState(), // local state
      local.getters(), // local getters
      store.getState(), // root state
      store.getters // root getters
    )
  }
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce((state, key) => state[key], state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload
    payload = type
    type = type.type
  }

  assert(typeof type === 'string', `Expects string as the type, but found ${typeof type}.`)

  return { type, payload, options }
}
