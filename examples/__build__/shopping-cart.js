webpackJsonp([1],{

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
/**
 * Mocking client-server processing
 */
var _products = [{ "id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2 }, { "id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10 }, { "id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5 }];

exports["default"] = {
  getProducts: function getProducts(cb) {
    setTimeout(function () {
      return cb(_products);
    }, 100);
  },
  buyProducts: function buyProducts(products, cb, errorCb) {
    setTimeout(function () {
      // simulate random checkout failure.
      Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1 ? cb() : errorCb();
    }, 100);
  }
};

/***/ }),

/***/ 18:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _avalonExtend = __webpack_require__(2);

var _avalonExtend2 = _interopRequireDefault(_avalonExtend);

var _App = __webpack_require__(35);

var _App2 = _interopRequireDefault(_App);

var _store = __webpack_require__(41);

var _store2 = _interopRequireDefault(_store);

var _currency = __webpack_require__(38);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_avalonExtend2["default"].filters['currency'] = _currency.currency;

_avalonExtend2["default"].bootstrap({
  el: '#app',
  component: _App2["default"]
});

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = createLogger;

var _util = __webpack_require__(4);

function createLogger() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$collapsed = _ref.collapsed,
      collapsed = _ref$collapsed === undefined ? true : _ref$collapsed,
      _ref$filter = _ref.filter,
      filter = _ref$filter === undefined ? function (mutation, stateBefore, stateAfter) {
    return true;
  } : _ref$filter,
      _ref$transformer = _ref.transformer,
      transformer = _ref$transformer === undefined ? function (state) {
    return state;
  } : _ref$transformer,
      _ref$mutationTransfor = _ref.mutationTransformer,
      mutationTransformer = _ref$mutationTransfor === undefined ? function (mut) {
    return mut;
  } : _ref$mutationTransfor;

  return function (store) {
    var prevState = (0, _util.deepCopy)(store.state);

    store.subscribe(function (mutation, state) {
      if (typeof console === 'undefined') {
        return;
      }
      var nextState = (0, _util.deepCopy)(state);

      if (filter(mutation, prevState, nextState)) {
        var time = new Date();
        var formattedTime = ' @ ' + pad(time.getHours(), 2) + ':' + pad(time.getMinutes(), 2) + ':' + pad(time.getSeconds(), 2) + '.' + pad(time.getMilliseconds(), 3);
        var formattedMutation = mutationTransformer(mutation);
        var message = 'mutation ' + mutation.type + formattedTime;
        var startMessage = collapsed ? console.groupCollapsed : console.group;

        // render
        try {
          startMessage.call(console, message);
        } catch (e) {
          console.log(message);
        }

        console.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
        console.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
        console.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));

        try {
          console.groupEnd();
        } catch (e) {
          console.log('—— log end ——');
        }
      }

      prevState = nextState;
    });
  };
} // Credits: borrowed code from fcomb/redux-logger

function repeat(str, times) {
  return new Array(times + 1).join(str);
}

function pad(num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num;
}

/***/ }),

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _ProductList = __webpack_require__(37);

var _ProductList2 = _interopRequireDefault(_ProductList);

var _Cart = __webpack_require__(36);

var _Cart2 = _interopRequireDefault(_Cart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var template = '\n  <div>\n    <h1>Shopping Cart Example</h1>\n    <hr>\n    <h2>Products</h2>\n    <product-list :widget="{is: \'product-list\'}"></product-list>\n    <hr>\n    <cart :widget="{is: \'cart\'}"></cart>\n  </div>\n';

exports["default"] = {
  name: 'app',
  template: template,
  components: { ProductList: _ProductList2["default"], Cart: _Cart2["default"] }
};

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _avalonx = __webpack_require__(0);

var template = '\n  <div class="cart">\n    <h2>Your Cart</h2>\n    <p :visible="!products.length"><i>Please add some products to cart.</i></p>\n    <ul>\n      <li :for="p in products">\n        {{ p.title }} - {{ p.price | currency }} x {{ p.quantity }}\n      </li>\n    </ul>\n    <p>Total: {{ total | currency }}</p>\n    <p><button :attr="{disabled:!products.length}" :click="checkout(products)">Checkout</button></p>\n    <p :visible="checkoutStatus">Checkout {{ checkoutStatus }}.</p>\n  </div>\n';

exports["default"] = {
  name: 'cart',
  template: template,
  computed: _extends({}, (0, _avalonx.mapGetters)({
    products: 'cartProducts',
    checkoutStatus: 'checkoutStatus'
  }), {
    total: function total() {
      return this.products.reduce(function (total, p) {
        return total + p.price * p.quantity;
      }, 0);
    }
  }),
  methods: {
    checkout: function checkout(products) {
      this.$store.dispatch('checkout', products);
    }
  }
};

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _avalonx = __webpack_require__(0);

var template = '\n  <ul>\n    <li :for="p in products">\n      {{ p.title }} - {{ p.price | currency }}\n      <br>\n      <button\n        :attr="{disabled:!p.inventory}"\n        :click="addToCart(p)">\n        Add to cart\n      </button>\n    </li>\n  </ul>\n';

exports["default"] = {
  name: 'product-list',
  template: template,
  computed: (0, _avalonx.mapGetters)({
    products: 'allProducts'
  }),
  methods: _extends({}, (0, _avalonx.mapActions)(['addToCart']), {
    onReady: function onReady() {
      this.$store.dispatch('getAllProducts');
    }
  })
};

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.currency = currency;
var digitsRE = /(\d{3})(?=\d)/g;

function currency(value, currency, decimals) {
  value = parseFloat(value);
  if (!isFinite(value) || !value && value !== 0) return '';
  currency = currency != null ? currency : '$';
  decimals = decimals != null ? decimals : 2;
  var stringified = Math.abs(value).toFixed(decimals);
  var _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  var i = _int.length % 3;
  var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
  var _float = decimals ? stringified.slice(-1 - decimals) : '';
  var sign = value < 0 ? '-' : '';
  return sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
}

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.addToCart = undefined;

var _mutationTypes = __webpack_require__(8);

var types = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var addToCart = exports.addToCart = function addToCart(_ref, product) {
  var commit = _ref.commit;

  if (product.inventory > 0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    });
  }
};

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.deepCopy = deepCopy;
exports.forEachValue = forEachValue;
exports.isObject = isObject;
exports.isPromise = isPromise;
exports.assert = assert;
/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find(list, f) {
  return list.filter(f)[0];
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy(obj) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  // just return if obj is immutable value
  if (obj === null || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
    return obj;
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) {
    return c.original === obj;
  });
  if (hit) {
    return hit.copy;
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    if (avalon.msie < 9 && /^\$\w+$/.test(key)) return;
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
}

/**
 * forEach for object
 */
function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function (key) {
    return key !== '__esModule' && fn(obj[key], key);
  });
}

function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function assert(condition, msg) {
  if (!condition) throw new Error('[avalonx] ' + msg);
}

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var cartProducts = exports.cartProducts = function cartProducts(state) {
  return state.cart.added.map(function (_ref) {
    var id = _ref.id,
        quantity = _ref.quantity;

    var product = state.products.all.find(function (p) {
      return p.id === id;
    });
    return {
      title: product.title,
      price: product.price,
      quantity: quantity
    };
  });
};

/***/ }),

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _avalonx = __webpack_require__(0);

var _avalonx2 = _interopRequireDefault(_avalonx);

var _actions = __webpack_require__(39);

var actions = _interopRequireWildcard(_actions);

var _getters = __webpack_require__(40);

var getters = _interopRequireWildcard(_getters);

var _cart = __webpack_require__(42);

var _cart2 = _interopRequireDefault(_cart);

var _products = __webpack_require__(43);

var _products2 = _interopRequireDefault(_products);

var _logger = __webpack_require__(3);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var debug = "production" !== 'production';

exports["default"] = new _avalonx2["default"].Store({
  actions: actions,
  getters: getters,
  modules: {
    cart: _cart2["default"],
    products: _products2["default"]
  },
  plugins: debug ? [(0, _logger2["default"])()] : []
});

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _mutations;

var _shop = __webpack_require__(11);

var _shop2 = _interopRequireDefault(_shop);

var _mutationTypes = __webpack_require__(8);

var types = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// initial state
// shape: [{ id, quantity }]
var state = {
  added: [],
  checkoutStatus: '',
  lastCheckout: ''
};

// getters
var getters = {
  checkoutStatus: function checkoutStatus(state) {
    return state.checkoutStatus;
  }
};

// actions
var actions = {
  checkout: function checkout(_ref, products) {
    var commit = _ref.commit,
        state = _ref.state;

    var savedCartItems = [].concat(_toConsumableArray(state.added));
    commit(types.CHECKOUT_REQUEST);
    _shop2["default"].buyProducts(products, function () {
      return commit(types.CHECKOUT_SUCCESS);
    }, function () {
      return commit(types.CHECKOUT_FAILURE, { savedCartItems: savedCartItems });
    });
  }
};

// mutations
var mutations = (_mutations = {}, _defineProperty(_mutations, types.ADD_TO_CART, function (state, _ref2) {
  var id = _ref2.id;

  state.lastCheckout = '';
  var record = state.added.find(function (p) {
    return p.id === id;
  });
  if (!record) {
    state.added.push({
      id: id,
      quantity: 1
    });
  } else {
    record.quantity++;
  }
}), _defineProperty(_mutations, types.CHECKOUT_REQUEST, function (state) {
  // clear cart
  state.added = [];
  state.checkoutStatus = '';
}), _defineProperty(_mutations, types.CHECKOUT_SUCCESS, function (state) {
  state.checkoutStatus = 'successful';
}), _defineProperty(_mutations, types.CHECKOUT_FAILURE, function (state, _ref3) {
  var savedCartItems = _ref3.savedCartItems;

  // rollback to the cart saved before sending the request
  state.added = savedCartItems;
  state.checkoutStatus = 'failed';
}), _mutations);

exports["default"] = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _mutations;

var _shop = __webpack_require__(11);

var _shop2 = _interopRequireDefault(_shop);

var _mutationTypes = __webpack_require__(8);

var types = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// initial state
var state = {
  all: []
};

// getters
var getters = {
  allProducts: function allProducts(state) {
    return state.all;
  }
};

// actions
var actions = {
  getAllProducts: function getAllProducts(_ref) {
    var commit = _ref.commit;

    _shop2["default"].getProducts(function (products) {
      commit(types.RECEIVE_PRODUCTS, { products: products });
    });
  }
};

// mutations
var mutations = (_mutations = {}, _defineProperty(_mutations, types.RECEIVE_PRODUCTS, function (state, _ref2) {
  var products = _ref2.products;

  state.all = products;
}), _defineProperty(_mutations, types.ADD_TO_CART, function (state, _ref3) {
  var id = _ref3.id;

  state.all.find(function (p) {
    return p.id === id;
  }).inventory--;
}), _mutations);

exports["default"] = {
  state: state,
  getters: getters,
  actions: actions,
  mutations: mutations
};

/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(18);


/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var ADD_TO_CART = exports.ADD_TO_CART = 'ADD_TO_CART';
var CHECKOUT_REQUEST = exports.CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
var CHECKOUT_SUCCESS = exports.CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
var CHECKOUT_FAILURE = exports.CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';
var RECEIVE_PRODUCTS = exports.RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

/***/ })

},[63]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzaG9wcGluZy1jYXJ0LmpzIiwic291cmNlUm9vdCI6IiJ9