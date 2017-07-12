webpackJsonp([0],{

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var SWITCH_THREAD = exports.SWITCH_THREAD = 'SWITCH_THREAD';
var RECEIVE_ALL = exports.RECEIVE_ALL = 'RECEIVE_ALL';
var RECEIVE_MESSAGE = exports.RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _avalonExtend = __webpack_require__(2);

var _avalonExtend2 = _interopRequireDefault(_avalonExtend);

var _App = __webpack_require__(23);

var _App2 = _interopRequireDefault(_App);

var _store = __webpack_require__(29);

var _store2 = _interopRequireDefault(_store);

var _actions = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_avalonExtend2["default"].filters['time'] = function (timestamp) {
  return new Date(timestamp).toLocaleTimeString();
};

_avalonExtend2["default"].bootstrap({
  el: '#app',
  component: _App2["default"]
});

(0, _actions.getAllMessages)(_store2["default"]);

/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.getAllMessages = getAllMessages;
exports.createMessage = createMessage;
var data = __webpack_require__(22);
var LATENCY = 16;

function getAllMessages(cb) {
  setTimeout(function () {
    cb(data);
  }, LATENCY);
}

function createMessage(_ref, cb) {
  var text = _ref.text,
      thread = _ref.thread;

  var timestamp = Date.now();
  var id = 'm_' + timestamp;
  var message = {
    id: id,
    text: text,
    timestamp: timestamp,
    threadID: thread.id,
    threadName: thread.name,
    authorName: 'hmhao'
  };
  setTimeout(function () {
    cb(message);
  }, LATENCY);
}

/***/ }),

/***/ 22:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = [{
  id: 'm_1',
  threadID: 't_1',
  threadName: 'Jing and Bill',
  authorName: 'Bill',
  text: 'Hey Jing, want to give a Flux talk at ForwardJS?',
  timestamp: Date.now() - 99999
}, {
  id: 'm_2',
  threadID: 't_1',
  threadName: 'Jing and Bill',
  authorName: 'Bill',
  text: 'Seems like a pretty cool conference.',
  timestamp: Date.now() - 89999
}, {
  id: 'm_3',
  threadID: 't_1',
  threadName: 'Jing and Bill',
  authorName: 'Jing',
  text: 'Sounds good.  Will they be serving dessert?',
  timestamp: Date.now() - 79999
}, {
  id: 'm_4',
  threadID: 't_2',
  threadName: 'Dave and Bill',
  authorName: 'Bill',
  text: 'Hey Dave, want to get a beer after the conference?',
  timestamp: Date.now() - 69999
}, {
  id: 'm_5',
  threadID: 't_2',
  threadName: 'Dave and Bill',
  authorName: 'Dave',
  text: 'Totally!  Meet you at the hotel bar.',
  timestamp: Date.now() - 59999
}, {
  id: 'm_6',
  threadID: 't_3',
  threadName: 'Functional Heads',
  authorName: 'Bill',
  text: 'Hey Brian, are you going to be talking about functional stuff?',
  timestamp: Date.now() - 49999
}, {
  id: 'm_7',
  threadID: 't_3',
  threadName: 'Bill and Brian',
  authorName: 'Brian',
  text: 'At ForwardJS?  Yeah, of course.  See you there!',
  timestamp: Date.now() - 39999
}];

/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _ThreadSection = __webpack_require__(27);

var _ThreadSection2 = _interopRequireDefault(_ThreadSection);

var _MessageSection = __webpack_require__(25);

var _MessageSection2 = _interopRequireDefault(_MessageSection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var template = '\n  <div class="chatapp">\n    <thread-section :widget="{is: \'thread-section\'}"></thread-section>\n    <message-section :widget="{is: \'message-section\'}"></message-section>\n  </div>\n';

exports["default"] = {
  name: 'app',
  template: template,
  components: {
    ThreadSection: _ThreadSection2["default"],
    MessageSection: _MessageSection2["default"]
  }
};

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var template = '\n  <li class="message-list-item">\n    <h5 class="message-author-name">{{ message.authorName }}</h5>\n    <div class="message-time">\n      {{ message.timestamp | time }}\n    </div>\n    <div class="message-text">{{ message.text }}</div>\n  </li>\n';

exports["default"] = {
  name: 'message',
  template: template,
  props: {
    message: {}
  }
};

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Message = __webpack_require__(24);

var _Message2 = _interopRequireDefault(_Message);

var _avalonx = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var template = '\n  <div class="message-section">\n    <h3 class="message-thread-heading">{{ thread.name }}</h3>\n    <ul class="message-list">\n      <message\n        :for="message in sortedMessages"\n        :widget="{is: \'message\', key:message.id, message:message}">\n      </message>\n    </ul>\n    <textarea class="message-composer" :keyup="sendMessage | enter"></textarea>\n  </div>\n';

exports["default"] = {
  name: 'message-section',
  template: template,
  components: { Message: _Message2["default"] },
  computed: _extends({}, (0, _avalonx.mapGetters)({
    thread: 'currentThread',
    messages: 'currentMessages'
  }), {
    sortedMessages: function sortedMessages() {
      return this.messages.slice().sort(function (a, b) {
        return a.timestamp - b.timestamp;
      });
    }
  }),
  watch: {
    'thread.lastMessage': function threadLastMessage() {
      var _this = this;

      setTimeout(function () {
        var ul = _this.$element.getElementsByTagName('ul')[0];
        ul.scrollTop = ul.scrollHeight;
      }, 1);
    }
  },
  methods: {
    sendMessage: function sendMessage(e) {
      var text = e.target.value;
      if (text.trim()) {
        this.$store.dispatch('sendMessage', {
          text: text,
          thread: this.thread
        });
        e.target.value = '';
      }
    }
  }
};

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var template = '\n  <li\n    class="thread-list-item"\n    :class="{ active: active }"\n    :click="emit(thread.id)">\n    <h5 class="thread-name">{{ thread.name }}</h5>\n    <div class="thread-time">\n      {{ thread.lastMessage.timestamp | time }}\n    </div>\n    <div class="thread-last-message">\n      {{ thread.lastMessage.text }}\n    </div>\n  </li>\n';

exports["default"] = {
  name: 'thread',
  template: template,
  props: {
    thread: {},
    active: false
  },
  methods: {
    emit: function emit(id) {
      this.switchThread && this.switchThread(id);
    }
  },
  events: ['switchThread']
};

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Thread = __webpack_require__(26);

var _Thread2 = _interopRequireDefault(_Thread);

var _avalonx = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var template = '\n  <div class="thread-section">\n    <div class="thread-count">\n      <span :visible="unreadCount">\n        Unread threads: {{ unreadCount }}\n      </span>\n    </div>\n    <ul class="thread-list">\n      <thread\n        :for="thread in threads"\n        :widget="{is: \'thread\', key:thread.id, thread:thread, active:thread.id === currentThread.id, \'switchThread\':switchThread}">\n      </thread>\n    </ul>\n  </div>\n';

exports["default"] = {
  name: 'thread-section',
  template: template,
  components: { Thread: _Thread2["default"] },
  computed: _extends({}, (0, _avalonx.mapGetters)(['threads', 'currentThread']), {
    unreadCount: function unreadCount() {
      var threads = this.threads;
      var arr = Object.keys(threads);
      if (avalon.msie < 9) {
        arr = arr.filter(function (key) {
          return !/^\$\w+$|hasOwnProperty/.test(key);
        });
      }
      return arr.reduce(function (count, id) {
        return threads[id].lastMessage.isRead ? count : count + 1;
      }, 0);
    }
  }),
  methods: {
    switchThread: function switchThread(id) {
      this.$store.dispatch('switchThread', { id: id });
    }
  }
};

/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
var threads = exports.threads = function threads(state) {
  return state.threads;
};

var currentThread = exports.currentThread = function currentThread(state) {
  return state.currentThreadID ? state.threads[state.currentThreadID] : {};
};

var currentMessages = exports.currentMessages = function currentMessages(state) {
  var thread = currentThread(state);
  return thread.messages ? thread.messages : [];
};

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _avalonx = __webpack_require__(0);

var _avalonx2 = _interopRequireDefault(_avalonx);

var _getters = __webpack_require__(28);

var getters = _interopRequireWildcard(_getters);

var _actions = __webpack_require__(9);

var actions = _interopRequireWildcard(_actions);

var _mutations = __webpack_require__(30);

var _mutations2 = _interopRequireDefault(_mutations);

var _logger = __webpack_require__(3);

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var state = {
  currentThreadID: '',
  threads: {
    /*
    id: {
      id
      name
      messages: [...ids]
      lastMessage
    }
    */
  }
};

exports["default"] = new _avalonx2["default"].Store({
  state: state,
  getters: getters,
  actions: actions,
  mutations: _mutations2["default"],
  plugins:  false ? [(0, _logger2["default"])()] : []
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

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _types$RECEIVE_ALL$ty;

var _mutationTypes = __webpack_require__(10);

var types = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports["default"] = (_types$RECEIVE_ALL$ty = {}, _defineProperty(_types$RECEIVE_ALL$ty, types.RECEIVE_ALL, function (state, _ref) {
  var messages = _ref.messages;

  var $threads = state.threads.$model;
  var latestMessage = void 0;
  messages.forEach(function (message) {
    // create new thread if the thread doesn't exist
    if (!$threads[message.threadID]) {
      createThread($threads, message.threadID, message.threadName);
    }
    // mark the latest message
    if (!latestMessage || message.timestamp > latestMessage.timestamp) {
      latestMessage = message;
    }
    // add message
    addMessage($threads, state.currentThreadID, message);
  });
  state.threads = $threads;
  // set initial thread to the one with the latest message
  setCurrentThread(state, latestMessage.threadID);
}), _defineProperty(_types$RECEIVE_ALL$ty, types.RECEIVE_MESSAGE, function (state, _ref2) {
  var message = _ref2.message;

  addMessage(state.threads, state.currentThreadID, message);
}), _defineProperty(_types$RECEIVE_ALL$ty, types.SWITCH_THREAD, function (state, _ref3) {
  var id = _ref3.id;

  setCurrentThread(state, id);
}), _types$RECEIVE_ALL$ty);


function createThread(threads, id, name) {
  threads[id] = {
    id: id,
    name: name,
    messages: [],
    lastMessage: ''
  };
}

function addMessage(threads, threadID, message) {
  // add a `isRead` field before adding the message
  message.isRead = message.threadID === threadID;
  // add it to the thread it belongs to
  var thread = threads[message.threadID];
  if (!thread.messages.some(function (id) {
    return id === message.id;
  })) {
    thread.messages.push(message);
    thread.lastMessage = message;
  }
}

function setCurrentThread(state, id) {
  state.currentThreadID = id;
  if (!state.threads[id]) {
    debugger;
  }
  // mark thread as read
  state.threads[id].lastMessage.isRead = true;
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

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(15);


/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.switchThread = exports.sendMessage = exports.getAllMessages = undefined;

var _api = __webpack_require__(21);

var api = _interopRequireWildcard(_api);

var _mutationTypes = __webpack_require__(10);

var types = _interopRequireWildcard(_mutationTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var getAllMessages = exports.getAllMessages = function getAllMessages(_ref) {
  var commit = _ref.commit;

  api.getAllMessages(function (messages) {
    commit(types.RECEIVE_ALL, {
      messages: messages
    });
  });
};

var sendMessage = exports.sendMessage = function sendMessage(_ref2, payload) {
  var commit = _ref2.commit;

  api.createMessage(payload, function (message) {
    commit(types.RECEIVE_MESSAGE, {
      message: message
    });
  });
};

var switchThread = exports.switchThread = function switchThread(_ref3, payload) {
  var commit = _ref3.commit;

  commit(types.SWITCH_THREAD, payload);
};

/***/ })

},[60]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjaGF0LmpzIiwic291cmNlUm9vdCI6IiJ9