webpackJsonp([3],{

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _avalonExtend = __webpack_require__(2);

var _avalonExtend2 = _interopRequireDefault(_avalonExtend);

var _store = __webpack_require__(32);

var _store2 = _interopRequireDefault(_store);

var _Counter = __webpack_require__(31);

var _Counter2 = _interopRequireDefault(_Counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_avalonExtend2["default"].bootstrap({
  el: '#app',
  component: _Counter2["default"]
});

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _avalonx = __webpack_require__(0);

var template = '\n  <div>\n    Value: {{ count }}\n    <button :click="increment">+</button>\n    <button :click="decrement">-</button>\n    <button :click="incrementIfOdd">Increment if odd</button>\n    <button :click="incrementAsync">Increment async</button>\n    <div>\n      <div>Recent History (last 5 entries): {{ recentHistory }}</div>\n    </div>\n  </div>\n';

exports["default"] = {
  name: 'counter',
  template: template,
  computed: (0, _avalonx.mapGetters)(['count', 'recentHistory']),
  methods: (0, _avalonx.mapActions)(['increment', 'decrement', 'incrementIfOdd', 'incrementAsync'])
};

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _avalonx = __webpack_require__(0);

var _avalonx2 = _interopRequireDefault(_avalonx);

var _getters = __webpack_require__(6);

var getters = _interopRequireWildcard(_getters);

var _actions = __webpack_require__(5);

var actions = _interopRequireWildcard(_actions);

var _mutations = __webpack_require__(7);

var mutations = _interopRequireWildcard(_mutations);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  count: 0,
  history: []
};

var store = new _avalonx2["default"].Store({
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
});

if (true) {
  module.hot.accept([6, 5, 7], function () {
    store.hotUpdate({
      getters: __webpack_require__(6),
      actions: __webpack_require__(5),
      mutations: __webpack_require__(7)
    });
  });
}

exports["default"] = store;

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var increment = exports.increment = function increment(_ref) {
  var commit = _ref.commit;
  return commit('increment');
};
var decrement = exports.decrement = function decrement(_ref2) {
  var commit = _ref2.commit;
  return commit('decrement');
};

var incrementIfOdd = exports.incrementIfOdd = function incrementIfOdd(_ref3) {
  var commit = _ref3.commit,
      state = _ref3.state;

  if ((state.count + 1) % 2 === 0) {
    commit('increment');
  }
};

var incrementAsync = exports.incrementAsync = function incrementAsync(_ref4) {
  var commit = _ref4.commit;

  setTimeout(function () {
    commit('increment');
  }, 1000);
};

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var count = exports.count = function count(state) {
  return state.count;
};

var limit = 5;

var recentHistory = exports.recentHistory = function recentHistory(state) {
  var end = state.history.length;
  var begin = end - limit < 0 ? 0 : end - limit;
  return state.history.slice(begin, end).toString().replace(/,/g, ', ');
};

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(16);


/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var increment = exports.increment = function increment(state) {
  state.count++;
  state.history.push('increment');
};

var decrement = exports.decrement = function decrement(state) {
  state.count--;
  state.history.push('decrement');
};

/***/ })

},[61]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjb3VudGVyLWhvdC5qcyIsInNvdXJjZVJvb3QiOiIifQ==