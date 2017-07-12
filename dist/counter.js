webpackJsonp([4],{

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _avalonExtend = __webpack_require__(2);

var _avalonExtend2 = _interopRequireDefault(_avalonExtend);

var _store = __webpack_require__(34);

var _store2 = _interopRequireDefault(_store);

var _Counter = __webpack_require__(33);

var _Counter2 = _interopRequireDefault(_Counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_avalonExtend2["default"].bootstrap({
  el: '#app',
  component: _Counter2["default"]
});

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _avalonx = __webpack_require__(0);

var template = '\n  <div id="app">\n    Clicked: {{ $store.state.count }} times, count is {{ evenOrOdd }}.\n    <button :click="increment">+</button>\n    <button :click="decrement">-</button>\n    <button :click="incrementIfOdd">Increment if odd</button>\n    <button :click="incrementAsync">Increment async</button>\n  </div>\n';

exports["default"] = {
  name: 'counter',
  template: template,
  computed: (0, _avalonx.mapGetters)(['evenOrOdd']),
  methods: (0, _avalonx.mapActions)(['increment', 'decrement', 'incrementIfOdd', 'incrementAsync'])
};

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _avalonx = __webpack_require__(0);

var _avalonx2 = _interopRequireDefault(_avalonx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// root state object.
// each Vuex instance is just a single state tree.
var state = {
  count: 0
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
var mutations = {
  increment: function increment(state) {
    state.count++;
  },
  decrement: function decrement(state) {
    state.count--;
  }
};

// actions are functions that causes side effects and can involve
// asynchronous operations.
var actions = {
  increment: function increment(_ref) {
    var commit = _ref.commit;
    return commit('increment');
  },
  decrement: function decrement(_ref2) {
    var commit = _ref2.commit;
    return commit('decrement');
  },
  incrementIfOdd: function incrementIfOdd(_ref3) {
    var commit = _ref3.commit,
        state = _ref3.state;

    if ((state.count + 1) % 2 === 0) {
      commit('increment');
    }
  },
  incrementAsync: function incrementAsync(_ref4) {
    var commit = _ref4.commit;

    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        commit('increment');
        resolve();
      }, 1000);
    });
  }
};

// getters are functions
var getters = {
  evenOrOdd: function evenOrOdd(state) {
    return state.count % 2 === 0 ? 'even' : 'odd';
  }
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
exports["default"] = new _avalonx2["default"].Store({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
});

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(17);


/***/ })

},[62]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb3VudGVyLmpzIiwic291cmNlUm9vdCI6IiJ9