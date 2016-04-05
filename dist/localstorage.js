(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.feathers || (g.feathers = {})).localstorage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/debug/browser.js":[function(require,module,exports){

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // is webkit? http://stackoverflow.com/a/16459606/376773
  return ('WebkitAppearance' in document.documentElement.style) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (window.console && (console.firebug || (console.exception && console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  return JSON.stringify(v);
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return args;

  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
  return args;
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage(){
  try {
    return window.localStorage;
  } catch (e) {}
}

},{"./debug":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/debug/debug.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/debug/debug.js":[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/ms/index.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-commons/lib/utils.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.stripSlashes = stripSlashes;
exports.each = each;
exports.matcher = matcher;
exports.sorter = sorter;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function stripSlashes(name) {
  return name.replace(/^(\/*)|(\/*)$/g, '');
}

function each(obj, callback) {
  if (obj && typeof obj.forEach === 'function') {
    obj.forEach(callback);
  } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
    Object.keys(obj).forEach(function (key) {
      return callback(obj[key], key);
    });
  }
}

var _ = exports._ = {
  some: function some(value, callback) {
    return Object.keys(value).map(function (key) {
      return [value[key], key];
    }).some(function (current) {
      return callback.apply(undefined, _toConsumableArray(current));
    });
  },
  every: function every(value, callback) {
    return Object.keys(value).map(function (key) {
      return [value[key], key];
    }).every(function (current) {
      return callback.apply(undefined, _toConsumableArray(current));
    });
  },
  isMatch: function isMatch(obj, item) {
    return Object.keys(item).every(function (key) {
      return obj[key] === item[key];
    });
  },
  omit: function omit(obj) {
    var result = _extends({}, obj);

    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      keys[_key - 1] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        delete result[key];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return result;
  }
};

var specialFilters = exports.specialFilters = {
  $in: function $in(key, ins) {
    return function (current) {
      return ins.indexOf(current[key]) !== -1;
    };
  },
  $nin: function $nin(key, nins) {
    return function (current) {
      return nins.indexOf(current[key]) === -1;
    };
  },
  $lt: function $lt(key, value) {
    return function (current) {
      return current[key] < value;
    };
  },
  $lte: function $lte(key, value) {
    return function (current) {
      return current[key] <= value;
    };
  },
  $gt: function $gt(key, value) {
    return function (current) {
      return current[key] > value;
    };
  },
  $gte: function $gte(key, value) {
    return function (current) {
      return current[key] >= value;
    };
  },
  $ne: function $ne(key, value) {
    return function (current) {
      return current[key] !== value;
    };
  }
};

function matcher(originalQuery) {
  var query = _.omit(originalQuery, '$limit', '$skip', '$sort');

  return function (item) {
    if (query.$or && _.some(query.$or, function (or) {
      return _.isMatch(item, or);
    })) {
      return true;
    }

    return _.every(query, function (value, key) {
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
        return _.every(value, function (target, filterType) {
          if (specialFilters[filterType]) {
            var filter = specialFilters[filterType](key, target);
            return filter(item);
          }

          return false;
        });
      } else if (typeof item[key] !== 'undefined') {
        return item[key] === query[key];
      }

      return false;
    });
  };
}

function sorter($sort) {
  return function (first, second) {
    var comparator = 0;
    each($sort, function (modifier, key) {
      modifier = parseInt(modifier, 10);

      if (first[key] < second[key]) {
        comparator -= 1 * modifier;
      }

      if (first[key] > second[key]) {
        comparator += 1 * modifier;
      }
    });
    return comparator;
  };
}
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-errors/lib/index.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _extendableBuiltin(cls) {
  function ExtendableBuiltin() {
    var instance = Reflect.construct(cls, Array.from(arguments));
    Object.setPrototypeOf(instance, Object.getPrototypeOf(this));
    return instance;
  }

  ExtendableBuiltin.prototype = Object.create(cls.prototype, {
    constructor: {
      value: cls,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(ExtendableBuiltin, cls);
  } else {
    ExtendableBuiltin.__proto__ = cls;
  }

  return ExtendableBuiltin;
}

var debug = require('debug')('feathers-errors');

// NOTE (EK): Babel doesn't properly support extending
// some classes in ES6. The Error class being one of them.
// Node v5.0+ does support this but until we want to drop support
// for older versions we need this hack.
// http://stackoverflow.com/questions/33870684/why-doesnt-instanceof-work-on-instances-of-error-subclasses-under-babel-node
// https://github.com/loganfsmyth/babel-plugin-transform-builtin-extend

var FeathersError = function (_extendableBuiltin2) {
  _inherits(FeathersError, _extendableBuiltin2);

  function FeathersError(msg, name, code, className, data) {
    _classCallCheck(this, FeathersError);

    msg = msg || 'Error';

    var errors = undefined;
    var message = undefined;
    var newData = undefined;

    if (msg instanceof Error) {
      message = msg.message || 'Error';

      // NOTE (EK): This is typically to handle validation errors
      if (msg.errors) {
        errors = msg.errors;
      }
    }
    // Support plain old objects
    else if ((typeof msg === 'undefined' ? 'undefined' : _typeof(msg)) === 'object') {
        message = msg.message || 'Error';
        data = msg;
      }
      // message is just a string
      else {
          message = msg;
        }

    if (data) {
      // NOTE(EK): To make sure that we are not messing
      // with immutable data, just make a copy.
      // https://github.com/feathersjs/feathers-errors/issues/19
      newData = _extends({}, data);

      if (newData.errors) {
        errors = newData.errors;
        delete newData.errors;
      }
    }

    // NOTE (EK): Babel doesn't support this so
    // we have to pass in the class name manually.
    // this.name = this.constructor.name;

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(FeathersError).call(this, message));

    _this.type = 'FeathersError';
    _this.name = name;
    _this.message = message;
    _this.code = code;
    _this.className = className;
    _this.data = newData;
    _this.errors = errors || {};

    debug(_this.name + '(' + _this.code + '): ' + _this.message);
    return _this;
  }

  // NOTE (EK): A little hack to get around `message` not
  // being included in the default toJSON call.


  _createClass(FeathersError, [{
    key: 'toJSON',
    value: function toJSON() {
      return {
        name: this.name,
        message: this.message,
        code: this.code,
        className: this.className,
        data: this.data,
        errors: this.errors
      };
    }
  }]);

  return FeathersError;
}(_extendableBuiltin(Error));

var BadRequest = function (_FeathersError) {
  _inherits(BadRequest, _FeathersError);

  function BadRequest(message, data) {
    _classCallCheck(this, BadRequest);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BadRequest).call(this, message, 'BadRequest', 400, 'bad-request', data));
  }

  return BadRequest;
}(FeathersError);

var NotAuthenticated = function (_FeathersError2) {
  _inherits(NotAuthenticated, _FeathersError2);

  function NotAuthenticated(message, data) {
    _classCallCheck(this, NotAuthenticated);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotAuthenticated).call(this, message, 'NotAuthenticated', 401, 'not-authenticated', data));
  }

  return NotAuthenticated;
}(FeathersError);

var PaymentError = function (_FeathersError3) {
  _inherits(PaymentError, _FeathersError3);

  function PaymentError(message, data) {
    _classCallCheck(this, PaymentError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PaymentError).call(this, message, 'PaymentError', 402, 'payment-error', data));
  }

  return PaymentError;
}(FeathersError);

var Forbidden = function (_FeathersError4) {
  _inherits(Forbidden, _FeathersError4);

  function Forbidden(message, data) {
    _classCallCheck(this, Forbidden);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Forbidden).call(this, message, 'Forbidden', 403, 'forbidden', data));
  }

  return Forbidden;
}(FeathersError);

var NotFound = function (_FeathersError5) {
  _inherits(NotFound, _FeathersError5);

  function NotFound(message, data) {
    _classCallCheck(this, NotFound);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotFound).call(this, message, 'NotFound', 404, 'not-found', data));
  }

  return NotFound;
}(FeathersError);

var MethodNotAllowed = function (_FeathersError6) {
  _inherits(MethodNotAllowed, _FeathersError6);

  function MethodNotAllowed(message, data) {
    _classCallCheck(this, MethodNotAllowed);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MethodNotAllowed).call(this, message, 'MethodNotAllowed', 405, 'method-not-allowed', data));
  }

  return MethodNotAllowed;
}(FeathersError);

var NotAcceptable = function (_FeathersError7) {
  _inherits(NotAcceptable, _FeathersError7);

  function NotAcceptable(message, data) {
    _classCallCheck(this, NotAcceptable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotAcceptable).call(this, message, 'NotAcceptable', 406, 'not-acceptable', data));
  }

  return NotAcceptable;
}(FeathersError);

var Timeout = function (_FeathersError8) {
  _inherits(Timeout, _FeathersError8);

  function Timeout(message, data) {
    _classCallCheck(this, Timeout);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Timeout).call(this, message, 'Timeout', 408, 'timeout', data));
  }

  return Timeout;
}(FeathersError);

var Conflict = function (_FeathersError9) {
  _inherits(Conflict, _FeathersError9);

  function Conflict(message, data) {
    _classCallCheck(this, Conflict);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Conflict).call(this, message, 'Conflict', 409, 'conflict', data));
  }

  return Conflict;
}(FeathersError);

var Unprocessable = function (_FeathersError10) {
  _inherits(Unprocessable, _FeathersError10);

  function Unprocessable(message, data) {
    _classCallCheck(this, Unprocessable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Unprocessable).call(this, message, 'Unprocessable', 422, 'unprocessable', data));
  }

  return Unprocessable;
}(FeathersError);

var GeneralError = function (_FeathersError11) {
  _inherits(GeneralError, _FeathersError11);

  function GeneralError(message, data) {
    _classCallCheck(this, GeneralError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GeneralError).call(this, message, 'GeneralError', 500, 'general-error', data));
  }

  return GeneralError;
}(FeathersError);

var NotImplemented = function (_FeathersError12) {
  _inherits(NotImplemented, _FeathersError12);

  function NotImplemented(message, data) {
    _classCallCheck(this, NotImplemented);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotImplemented).call(this, message, 'NotImplemented', 501, 'not-implemented', data));
  }

  return NotImplemented;
}(FeathersError);

var Unavailable = function (_FeathersError13) {
  _inherits(Unavailable, _FeathersError13);

  function Unavailable(message, data) {
    _classCallCheck(this, Unavailable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Unavailable).call(this, message, 'Unavailable', 503, 'unavailable', data));
  }

  return Unavailable;
}(FeathersError);

var errors = {
  FeathersError: FeathersError,
  BadRequest: BadRequest,
  NotAuthenticated: NotAuthenticated,
  PaymentError: PaymentError,
  Forbidden: Forbidden,
  NotFound: NotFound,
  MethodNotAllowed: MethodNotAllowed,
  NotAcceptable: NotAcceptable,
  Timeout: Timeout,
  Conflict: Conflict,
  Unprocessable: Unprocessable,
  GeneralError: GeneralError,
  NotImplemented: NotImplemented,
  Unavailable: Unavailable
};

exports.default = _extends({ types: errors, errors: errors }, errors);
module.exports = exports['default'];
},{"debug":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/debug/browser.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-memory/lib/index.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = init;

var _uberproto = require('uberproto');

var _uberproto2 = _interopRequireDefault(_uberproto);

var _feathersQueryFilters = require('feathers-query-filters');

var _feathersQueryFilters2 = _interopRequireDefault(_feathersQueryFilters);

var _feathersErrors = require('feathers-errors');

var _feathersErrors2 = _interopRequireDefault(_feathersErrors);

var _utils = require('feathers-commons/lib/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = {
  values: function values(obj) {
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  },
  isEmpty: function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  },
  extend: function extend() {
    return Object.assign.apply(Object, arguments);
  },
  omit: function omit(obj) {
    var result = Object.assign({}, obj);

    for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      keys[_key - 1] = arguments[_key];
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        delete result[key];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return result;
  },
  pick: function pick(source) {
    var result = {};

    for (var _len2 = arguments.length, keys = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      keys[_key2 - 1] = arguments[_key2];
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = keys[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var key = _step2.value;

        result[key] = source[key];
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return result;
  }
};

var Service = function () {
  function Service() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Service);

    this.paginate = options.paginate || {};
    this._id = options.idField || 'id';
    this._uId = options.startId || 0;
    this.store = options.store || {};
  }

  _createClass(Service, [{
    key: 'extend',
    value: function extend(obj) {
      return _uberproto2.default.extend(obj, this);
    }

    // Find without hooks and mixins that can be used internally and always returns
    // a pagination object

  }, {
    key: '_find',
    value: function _find(params) {
      var getFilter = arguments.length <= 1 || arguments[1] === undefined ? _feathersQueryFilters2.default : arguments[1];

      var query = params.query || {};
      var filters = getFilter(query);

      var values = _.values(this.store).filter((0, _utils.matcher)(query));

      var total = values.length;

      if (filters.$sort) {
        values.sort((0, _utils.sorter)(filters.$sort));
      }

      if (filters.$skip) {
        values = values.slice(filters.$skip);
      }

      if (filters.$limit) {
        values = values.slice(0, filters.$limit);
      }

      if (filters.$select) {
        values = values.map(function (value) {
          return _.pick(value, filters.$select);
        });
      }

      return Promise.resolve({
        total: total,
        limit: filters.$limit,
        skip: filters.$skip || 0,
        data: values
      });
    }
  }, {
    key: 'find',
    value: function find(params) {
      var _this = this;

      // Call the internal find with query parameter that include pagination
      var result = this._find(params, function (query) {
        return (0, _feathersQueryFilters2.default)(query, _this.paginate);
      });

      if (!this.paginate.default) {
        return result.then(function (page) {
          return page.data;
        });
      }

      return result;
    }
  }, {
    key: 'get',
    value: function get(id) {
      if (id in this.store) {
        return Promise.resolve(this.store[id]);
      }

      return Promise.reject(new _feathersErrors2.default.NotFound('No record found for id \'' + id + '\''));
    }

    // Create without hooks and mixins that can be used internally

  }, {
    key: '_create',
    value: function _create(data) {
      var id = data[this._id] || this._uId++;
      var current = _.extend({}, data, _defineProperty({}, this._id, id));

      if (this.store[id]) {
        return Promise.reject(new _feathersErrors2.default.Conflict('A record with id: ' + id + ' already exists'));
      }

      return Promise.resolve(this.store[id] = current);
    }
  }, {
    key: 'create',
    value: function create(data) {
      var _this2 = this;

      if (Array.isArray(data)) {
        return Promise.all(data.map(function (current) {
          return _this2._create(current);
        }));
      }

      return this._create(data);
    }

    // Update without hooks and mixins that can be used internally

  }, {
    key: '_update',
    value: function _update(id, data) {
      if (id in this.store) {
        data = _.extend({}, data, _defineProperty({}, this._id, id));
        this.store[id] = data;

        return Promise.resolve(this.store[id]);
      }

      return Promise.reject(new _feathersErrors2.default.NotFound('No record found for id \'' + id + '\''));
    }
  }, {
    key: 'update',
    value: function update(id, data) {
      if (id === null || Array.isArray(data)) {
        return Promise.reject(new _feathersErrors2.default.BadRequest('You can not replace multiple instances. Did you mean \'patch\'?'));
      }

      return this._update(id, data);
    }

    // Patch without hooks and mixins that can be used internally

  }, {
    key: '_patch',
    value: function _patch(id, data) {
      if (id in this.store) {
        _.extend(this.store[id], _.omit(data, this._id));

        return Promise.resolve(this.store[id]);
      }

      return Promise.reject(new _feathersErrors2.default.NotFound('No record found for id \'' + id + '\''));
    }
  }, {
    key: 'patch',
    value: function patch(id, data, params) {
      var _this3 = this;

      if (id === null) {
        return this._find(params).then(function (page) {
          return Promise.all(page.data.map(function (current) {
            return _this3._patch(current[_this3._id], data, params);
          }));
        });
      }

      return this._patch(id, data, params);
    }

    // Remove without hooks and mixins that can be used internally

  }, {
    key: '_remove',
    value: function _remove(id) {
      if (id in this.store) {
        var deleted = this.store[id];
        delete this.store[id];

        return Promise.resolve(deleted);
      }

      return Promise.reject(new _feathersErrors2.default.NotFound('No record found for id \'' + id + '\''));
    }
  }, {
    key: 'remove',
    value: function remove(id, params) {
      var _this4 = this;

      if (id === null) {
        return this._find(params).then(function (page) {
          return Promise.all(page.data.map(function (current) {
            return _this4._remove(current[_this4._id]);
          }));
        });
      }

      return this._remove(id);
    }
  }]);

  return Service;
}();

function init(options) {
  return new Service(options);
}

init.Service = Service;
module.exports = exports['default'];
},{"feathers-commons/lib/utils":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-commons/lib/utils.js","feathers-errors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-errors/lib/index.js","feathers-query-filters":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-query-filters/lib/index.js","uberproto":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/uberproto/lib/proto.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-query-filters/lib/index.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (query, paginate) {
  var filters = {
    $sort: query.$sort,
    $limit: getLimit(parse(query.$limit), paginate),
    $skip: parse(query.$skip),
    $select: query.$select,
    $populate: query.$populate
  };

  // Remove the params from the query's conditions.
  delete query.$sort;
  delete query.$limit;
  delete query.$skip;
  delete query.$select;
  delete query.$populate;

  return filters;
};

/**
 *
 *  Sets up the query properly if $limit, $skip, $sort, or $select is passed in params.
 *  Those same parameters are then removed from _conditions so that we aren't searching
 *  for data with a $limit parameter.
 */
function parse(number) {
  if (typeof number !== 'undefined') {
    return parseInt(number, 10);
  }
}

function getLimit(limit, paginate) {
  if (paginate && paginate.default) {
    return Math.min(limit || paginate.default, paginate.max || Number.MAX_VALUE);
  }

  return limit;
}

module.exports = exports['default'];
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/ms/index.js":[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/uberproto/lib/proto.js":[function(require,module,exports){
/* global define */
/**
 * A base object for ECMAScript 5 style prototypal inheritance.
 *
 * @see https://github.com/rauschma/proto-js/
 * @see http://ejohn.org/blog/simple-javascript-inheritance/
 * @see http://uxebu.com/blog/2011/02/23/object-based-inheritance-for-ecmascript-5/
 */
(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory();
	} else {
		root.Proto = factory();
	}
}(this, function () {

	function makeSuper(_super, old, name, fn) {
		return function () {
			var tmp = this._super;

			// Add a new ._super() method that is the same method
			// but either pointing to the prototype method
			// or to the overwritten method
			this._super = (typeof old === 'function') ? old : _super[name];

			// The method only need to be bound temporarily, so we
			// remove it when we're done executing
			var ret = fn.apply(this, arguments);
			this._super = tmp;

			return ret;
		};
	}

	function legacyMixin(prop, obj) {
		var self = obj || this;
		var fnTest = /\b_super\b/;
		var _super = Object.getPrototypeOf(self) || self.prototype;
		var _old;

		// Copy the properties over
		for (var name in prop) {
			// store the old function which would be overwritten
			_old = self[name];

			// Check if we're overwriting an existing function
			if(
					((
						typeof prop[name] === 'function' &&
						typeof _super[name] === 'function'
					) || (
						typeof _old === 'function' &&
						typeof prop[name] === 'function'
					)) && fnTest.test(prop[name])
			) {
				self[name] = makeSuper(_super, _old, name, prop[name]);
			} else {
				self[name] = prop[name];
			}
		}

		return self;
	}

	function es5Mixin(prop, obj) {
		var self = obj || this;
		var fnTest = /\b_super\b/;
		var _super = Object.getPrototypeOf(self) || self.prototype;
		var descriptors = {};
		var proto = prop;
		var processProperty = function(name) {
			if(!descriptors[name]) {
				descriptors[name] = Object.getOwnPropertyDescriptor(proto, name);
			}
		};

		// Collect all property descriptors
		do {
			Object.getOwnPropertyNames(proto).forEach(processProperty);
    } while((proto = Object.getPrototypeOf(proto)) && Object.getPrototypeOf(proto));
		
		Object.keys(descriptors).forEach(function(name) {
			var descriptor = descriptors[name];

			if(typeof descriptor.value === 'function' && fnTest.test(descriptor.value)) {
				descriptor.value = makeSuper(_super, self[name], name, descriptor.value);
			}

			Object.defineProperty(self, name, descriptor);
		});

		return self;
	}

	return {
		/**
		 * Create a new object using Object.create. The arguments will be
		 * passed to the new instances init method or to a method name set in
		 * __init.
		 */
		create: function () {
			var instance = Object.create(this);
			var init = typeof instance.__init === 'string' ? instance.__init : 'init';

			if (typeof instance[init] === 'function') {
				instance[init].apply(instance, arguments);
			}
			return instance;
		},
		/**
		 * Mixin a given set of properties
		 * @param prop The properties to mix in
		 * @param obj [optional] The object to add the mixin
		 */
		mixin: typeof Object.defineProperty === 'function' ? es5Mixin : legacyMixin,
		/**
		 * Extend the current or a given object with the given property
		 * and return the extended object.
		 * @param prop The properties to extend with
		 * @param obj [optional] The object to extend from
		 * @returns The extended object
		 */
		extend: function (prop, obj) {
			return this.mixin(prop, Object.create(obj || this));
		},
		/**
		 * Return a callback function with this set to the current or a given context object.
		 * @param name Name of the method to proxy
		 * @param args... [optional] Arguments to use for partial application
		 */
		proxy: function (name) {
			var fn = this[name];
			var args = Array.prototype.slice.call(arguments, 1);

			args.unshift(this);
			return fn.bind.apply(fn, args);
		}
	};

}));

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/src/index.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.default = init;

var _feathersMemory = require('feathers-memory');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocalStorage = function (_Service) {
  _inherits(LocalStorage, _Service);

  function LocalStorage() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, LocalStorage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LocalStorage).call(this, options));

    _this._storageKey = options.name || 'feathers';
    _this._storage = options.storage || typeof window !== 'undefined' && window.localStorage;
    _this._throttle = options.throttle || 200;
    _this.store = null;

    if (!_this._storage) {
      throw new Error('The `storage` option needs to be provided');
    }
    return _this;
  }

  _createClass(LocalStorage, [{
    key: 'ready',
    value: function ready() {
      var _this2 = this;

      if (!this.store) {
        return Promise.resolve(this._storage.getItem(this._storageKey)).then(function (str) {
          return JSON.parse(str || '{}');
        }).then(function (store) {
          var keys = Object.keys(store);
          var last = store[keys[keys.length - 1]];

          // Current id is the id of the last item
          _this2._uId = keys.length ? last[_this2._id] + 1 : 0;

          return _this2.store = store;
        });
      }

      return Promise.resolve(this.store);
    }
  }, {
    key: 'flush',
    value: function flush(data) {
      var _this3 = this;

      if (!this._timeout) {
        this._timeout = setTimeout(function () {
          _this3._storage.setItem(_this3._storageKey, JSON.stringify(_this3.store));
          delete _this3._timeout;
        }, this.throttle);
      }

      return data;
    }
  }, {
    key: 'execute',
    value: function execute(method) {
      var _this4 = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return this.ready().then(function () {
        var _get2;

        return (_get2 = _get(Object.getPrototypeOf(LocalStorage.prototype), method, _this4)).call.apply(_get2, [_this4].concat(args));
      });
    }
  }, {
    key: 'find',
    value: function find() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.execute.apply(this, ['find'].concat(args));
    }
  }, {
    key: 'get',
    value: function get() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this.execute.apply(this, ['get'].concat(args));
    }
  }, {
    key: 'create',
    value: function create() {
      var _this5 = this;

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this.execute.apply(this, ['create'].concat(args)).then(function (data) {
        return _this5.flush(data);
      });
    }
  }, {
    key: 'patch',
    value: function patch() {
      var _this6 = this;

      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return this.execute.apply(this, ['patch'].concat(args)).then(function (data) {
        return _this6.flush(data);
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var _this7 = this;

      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return this.execute.apply(this, ['update'].concat(args)).then(function (data) {
        return _this7.flush(data);
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this8 = this;

      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return this.execute.apply(this, ['remove'].concat(args)).then(function (data) {
        return _this8.flush(data);
      });
    }
  }]);

  return LocalStorage;
}(_feathersMemory.Service);

function init(options) {
  return new LocalStorage(options);
}

init.Service = _feathersMemory.Service;
module.exports = exports['default'];

},{"feathers-memory":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-memory/lib/index.js"}]},{},["/Users/eric/Development/feathersjs/feathers-localstorage/src/index.js"])("/Users/eric/Development/feathersjs/feathers-localstorage/src/index.js")
});