webpackJsonp([2],{

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var STORAGE_KEY = exports.STORAGE_KEY = 'todos-avalon';

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear();
}

var state = exports.state = {
  todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
};

var mutations = exports.mutations = {
  addTodo: function addTodo(state, _ref) {
    var text = _ref.text;

    state.todos.push({
      text: text,
      done: false
    });
  },
  deleteTodo: function deleteTodo(state, _ref2) {
    var todo = _ref2.todo;

    state.todos.removeAt(state.todos.indexOf(todo));
  },
  toggleTodo: function toggleTodo(state, _ref3) {
    var todo = _ref3.todo;

    todo.done = !todo.done;
  },
  editTodo: function editTodo(state, _ref4) {
    var todo = _ref4.todo,
        value = _ref4.value;

    todo.text = value;
  },
  toggleAll: function toggleAll(state, _ref5) {
    var done = _ref5.done;

    state.todos.forEach(function (todo) {
      todo.done = done;
    });
  },
  clearCompleted: function clearCompleted(state) {
    state.todos = state.todos.filter(function (todo) {
      return !todo.done;
    });
  }
};

/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _avalonExtend = __webpack_require__(2);

var _avalonExtend2 = _interopRequireDefault(_avalonExtend);

var _store = __webpack_require__(46);

var _store2 = _interopRequireDefault(_store);

var _App = __webpack_require__(44);

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _avalonx = __webpack_require__(0);

var _Todo = __webpack_require__(45);

var _Todo2 = _interopRequireDefault(_Todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var template = '\n  <div class="todoapp">\n    <!-- header -->\n    <div class="header">\n      <h1>todos</h1>\n      <input class="new-todo"\n        autofocus\n        autocomplete="off"\n        placeholder="What needs to be done?"\n        :keyup="addTodo | enter">\n    </div>\n    <!-- main section -->\n    <div class="main" :visible="todos.length">\n      <input class="toggle-all"\n        type="checkbox"\n        :attr="{checked:allChecked}">\n      <label :click="toggleAll({ done: !allChecked })"></label>\n      <ul class="todo-list">\n        <todo :for="(index, todo) in filteredTodos" :widget="{is: \'todo\', key:index, todo: todo}"></todo>\n      </ul>\n    </div>\n    <!-- footer -->\n    <div class="footer" :visible="todos.length">\n      <span class="todo-count">\n        <strong>{{ remaining }}</strong>\n        {{ remaining | pluralize(\'item\') }} left\n      </span>\n      <ul class="filters">\n        <li :for="(key, val) in $filters">\n          <a :attr="{href:\'#/\' + key}"\n            :class="{ selected: visibility === key }"\n            :click="visibility = key">{{ key | capitalize }}</a>\n        </li>\n      </ul>\n      <button class="clear-completed"\n        :visible="todos.length > remaining"\n        :click="clearCompleted">\n        Clear completed\n      </button>\n    </div>\n  </div>\n';

var filters = {
  all: function all(todos) {
    return todos;
  },
  active: function active(todos) {
    return todos.filter(function (todo) {
      return !todo.done;
    });
  },
  completed: function completed(todos) {
    return todos.filter(function (todo) {
      return todo.done;
    });
  }
};

exports["default"] = {
  name: 'app',
  template: template,
  components: { Todo: _Todo2["default"] },
  data: function data() {
    return {
      visibility: 'all',
      $filters: filters
    };
  },

  computed: {
    todos: function todos() {
      return this.$store.state.todos;
    },
    allChecked: function allChecked() {
      return this.todos.every(function (todo) {
        return todo.done;
      });
    },
    filteredTodos: function filteredTodos() {
      return this.$filters[this.visibility](this.todos);
    },
    remaining: function remaining() {
      return this.todos.filter(function (todo) {
        return !todo.done;
      }).length;
    }
  },
  methods: _extends({
    addTodo: function addTodo(e) {
      var text = e.target.value;
      if (text.trim()) {
        this.$store.commit('addTodo', { text: text });
      }
      e.target.value = '';
    }
  }, (0, _avalonx.mapMutations)(['toggleAll', 'clearCompleted'])),
  filters: {
    pluralize: function pluralize(n, w) {
      return n === 1 ? w : w + 's';
    },
    capitalize: function capitalize(s) {
      return s.charAt(0).toUpperCase() + s.slice(1);
    }
  }
};

/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _avalonx = __webpack_require__(0);

var template = '\n  <li class="todo" :class="{ completed: todo.done, editing: editing }">\n    <div class="view">\n      <!--avalon\u7684bug\uFF0Cclick\u6307\u4EE4\u9700\u8981\u5728dblclick\u6307\u4EE4\u524D\u6267\u884C\uFF0C\u5426\u5219click\u6307\u4EE4\u5C06\u4F1A\u7ED1\u5B9A\u5931\u8D25-->\n      <button class="destroy" :click="deleteTodo({ todo: todo })"></button>\n      <input class="toggle"\n        type="checkbox"\n        :attr="{checked:todo.done}"\n        :click="toggleTodo({ todo: todo })">\n      <label :dblclick="editing = true">{{todo.text}}</label>\n    </div>\n    <input class="edit"\n      :visible="editing"\n      :attr="{value: todo.text}"\n      :keyup-0="doneEdit | enter"\n      :keyup-1="cancelEdit | esc"\n      :blur="doneEdit">\n  </li>\n';

exports["default"] = {
  name: 'todo',
  template: template,
  props: {
    todo: {
      done: false,
      text: ''
    }
  },
  data: function data() {
    return {
      editing: false
    };
  },

  methods: _extends({}, (0, _avalonx.mapMutations)(['editTodo', 'toggleTodo', 'deleteTodo']), {
    doneEdit: function doneEdit(e) {
      var value = e.target.value.trim();
      var todo = this.todo;

      if (!value) {
        this.deleteTodo({
          todo: todo
        });
      } else if (this.editing) {
        this.editTodo({
          todo: todo,
          value: value
        });
        this.editing = false;
      }
    },
    cancelEdit: function cancelEdit(e) {
      e.target.value = this.todo.text;
      this.editing = false;
    }
  }),
  watch: {
    editing: function editing(value) {
      if (value) {
        var els = this.$element.getElementsByTagName('input');
        var el = els[1];
        el.focus();
      }
    }
  }
};

/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _avalonx = __webpack_require__(0);

var _avalonx2 = _interopRequireDefault(_avalonx);

var _mutations = __webpack_require__(12);

var _plugins = __webpack_require__(47);

var _plugins2 = _interopRequireDefault(_plugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = new _avalonx2["default"].Store({
  state: _mutations.state,
  mutations: _mutations.mutations,
  plugins: _plugins2["default"]
});

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _mutations = __webpack_require__(12);

var _logger = __webpack_require__(3);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var localStoragePlugin = function localStoragePlugin(store) {
  store.subscribe(function (mutation, _ref) {
    var todos = _ref.todos;

    window.localStorage.setItem(_mutations.STORAGE_KEY, JSON.stringify(todos));
  });
};

exports["default"] =  false ? [(0, _logger2["default"])(), localStoragePlugin] : [localStoragePlugin];

/***/ }),

/***/ 64:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(19);


/***/ })

},[64]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0b2RvbXZjLmpzIiwic291cmNlUm9vdCI6IiJ9