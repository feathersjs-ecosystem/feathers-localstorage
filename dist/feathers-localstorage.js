(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["feathers"] = factory();
	else
		root["feathers"] = root["feathers"] || {}, root["feathers"]["localstorage"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _require = __webpack_require__(/*! @feathersjs/memory */ "./node_modules/@feathersjs/memory/lib/index.js"),
    MemoryService = _require.MemoryService;

var usedKeys = [];

var LocalStorage = /*#__PURE__*/function (_MemoryService) {
  _inherits(LocalStorage, _MemoryService);

  var _super = _createSuper(LocalStorage);

  function LocalStorage() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, LocalStorage);

    _this = _super.call(this, options);
    _this._storageKey = options.name || 'feathers';
    _this._storage = options.storage || typeof window !== 'undefined' && window.localStorage;
    _this._throttle = options.throttle || 200;
    _this._reuseKeys = options.reuseKeys || false;
    _this.store = null;

    if (!_this._storage) {
      throw new Error('The `storage` option needs to be provided');
    }

    if (usedKeys.indexOf(_this._storageKey) === -1) {
      usedKeys.push(_this._storageKey);
    } else {
      if (!_this._reuseKeys) {
        throw new Error("The storage name '".concat(_this._storageKey, "' is already in use by another instance."));
      }
    }

    _this.ready();

    return _this;
  }

  _createClass(LocalStorage, [{
    key: "ready",
    value: function ready() {
      var _this2 = this;

      if (!this.store) {
        return Promise.resolve(this._storage.getItem(this._storageKey)).then(function (str) {
          return JSON.parse(str || '{}');
        }).then(function (store) {
          var keys = Object.keys(store);
          var last = store[keys[keys.length - 1]]; // Current id is the id of the last item

          _this2._uId = keys.length && typeof last[_this2.id] !== 'undefined' ? last[_this2.id] + 1 : _this2._uId;
          return _this2.store = store;
        });
      }

      return Promise.resolve(this.store);
    }
  }, {
    key: "flush",
    value: function flush(data) {
      var _this3 = this;

      if (!this._timeout) {
        this._timeout = setTimeout(function () {
          _this3._storage.setItem(_this3._storageKey, JSON.stringify(_this3.store));

          delete _this3._timeout;
        }, this._throttle);
      }

      return data;
    }
  }, {
    key: "execute",
    value: function execute(method) {
      var _this4 = this;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return this.ready().then(function () {
        var _get2;

        return (_get2 = _get(_getPrototypeOf(LocalStorage.prototype), method, _this4)).call.apply(_get2, [_this4].concat(args));
      });
    }
  }, {
    key: "$find",
    value: function $find() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.execute.apply(this, ['$find'].concat(args));
    }
  }, {
    key: "$get",
    value: function $get() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this.execute.apply(this, ['$get'].concat(args));
    }
  }, {
    key: "$create",
    value: function $create() {
      var _this5 = this;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this.execute.apply(this, ['$create'].concat(args)).then(function (data) {
        return _this5.flush(data);
      });
    }
  }, {
    key: "$patch",
    value: function $patch() {
      var _this6 = this;

      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return this.execute.apply(this, ['$patch'].concat(args)).then(function (data) {
        return _this6.flush(data);
      });
    }
  }, {
    key: "$update",
    value: function $update() {
      var _this7 = this;

      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return this.execute.apply(this, ['$update'].concat(args)).then(function (data) {
        return _this7.flush(data);
      });
    }
  }, {
    key: "$remove",
    value: function $remove() {
      var _this8 = this;

      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }

      return this.execute.apply(this, ['$remove'].concat(args)).then(function (data) {
        return _this8.flush(data);
      });
    }
  }]);

  return LocalStorage;
}(MemoryService);

module.exports = function init(options) {
  return new LocalStorage(options);
};

module.exports.Service = MemoryService;

/***/ }),

/***/ "./node_modules/@feathersjs/adapter-commons/lib/declarations.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@feathersjs/adapter-commons/lib/declarations.js ***!
  \**********************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

/***/ }),

/***/ "./node_modules/@feathersjs/adapter-commons/lib/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/@feathersjs/adapter-commons/lib/index.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.select = exports.OPERATORS = exports.FILTERS = exports.filterQuery = void 0;

var commons_1 = __webpack_require__(/*! @feathersjs/commons */ "./node_modules/@feathersjs/commons/lib/index.js");

__exportStar(__webpack_require__(/*! ./declarations */ "./node_modules/@feathersjs/adapter-commons/lib/declarations.js"), exports);

__exportStar(__webpack_require__(/*! ./service */ "./node_modules/@feathersjs/adapter-commons/lib/service.js"), exports);

var query_1 = __webpack_require__(/*! ./query */ "./node_modules/@feathersjs/adapter-commons/lib/query.js");

Object.defineProperty(exports, "filterQuery", ({
  enumerable: true,
  get: function get() {
    return query_1.filterQuery;
  }
}));
Object.defineProperty(exports, "FILTERS", ({
  enumerable: true,
  get: function get() {
    return query_1.FILTERS;
  }
}));
Object.defineProperty(exports, "OPERATORS", ({
  enumerable: true,
  get: function get() {
    return query_1.OPERATORS;
  }
}));

__exportStar(__webpack_require__(/*! ./sort */ "./node_modules/@feathersjs/adapter-commons/lib/sort.js"), exports); // Return a function that filters a result object or array
// and picks only the fields passed as `params.query.$select`
// and additional `otherFields`


function select(params) {
  var _a;

  var queryFields = (_a = params === null || params === void 0 ? void 0 : params.query) === null || _a === void 0 ? void 0 : _a.$select;

  if (!queryFields) {
    return function (result) {
      return result;
    };
  }

  for (var _len = arguments.length, otherFields = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    otherFields[_key - 1] = arguments[_key];
  }

  var resultFields = queryFields.concat(otherFields);

  var convert = function convert(result) {
    var _commons_1$_;

    return (_commons_1$_ = commons_1._).pick.apply(_commons_1$_, [result].concat(_toConsumableArray(resultFields)));
  };

  return function (result) {
    if (Array.isArray(result)) {
      return result.map(convert);
    }

    return convert(result);
  };
}

exports.select = select;

/***/ }),

/***/ "./node_modules/@feathersjs/adapter-commons/lib/query.js":
/*!***************************************************************!*\
  !*** ./node_modules/@feathersjs/adapter-commons/lib/query.js ***!
  \***************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.filterQuery = exports.FILTERS = exports.OPERATORS = void 0;

var commons_1 = __webpack_require__(/*! @feathersjs/commons */ "./node_modules/@feathersjs/commons/lib/index.js");

var errors_1 = __webpack_require__(/*! @feathersjs/errors */ "./node_modules/@feathersjs/errors/lib/index.js");

var parse = function parse(value) {
  return typeof value !== 'undefined' ? parseInt(value, 10) : value;
};

var isPlainObject = function isPlainObject(value) {
  return commons_1._.isObject(value) && value.constructor === {}.constructor;
};

var validateQueryProperty = function validateQueryProperty(query) {
  var operators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (!isPlainObject(query)) {
    return query;
  }

  for (var _i = 0, _Object$keys = Object.keys(query); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];

    if (key.startsWith('$') && !operators.includes(key)) {
      throw new errors_1.BadRequest("Invalid query parameter ".concat(key), query);
    }

    var value = query[key];

    if (isPlainObject(value)) {
      query[key] = validateQueryProperty(value, operators);
    }
  }

  return _objectSpread({}, query);
};

var getFilters = function getFilters(query, settings) {
  var filterNames = Object.keys(settings.filters);
  return filterNames.reduce(function (current, key) {
    var queryValue = query[key];
    var filter = settings.filters[key];

    if (filter) {
      var value = typeof filter === 'function' ? filter(queryValue, settings) : queryValue;

      if (value !== undefined) {
        current[key] = value;
      }
    }

    return current;
  }, {});
};

var getQuery = function getQuery(query, settings) {
  var keys = Object.keys(query).concat(Object.getOwnPropertySymbols(query));
  return keys.reduce(function (result, key) {
    if (typeof key === 'string' && key.startsWith('$')) {
      if (settings.filters[key] === undefined) {
        throw new errors_1.BadRequest("Invalid filter value ".concat(key));
      }
    } else {
      result[key] = validateQueryProperty(query[key], settings.operators);
    }

    return result;
  }, {});
};

exports.OPERATORS = ['$in', '$nin', '$lt', '$lte', '$gt', '$gte', '$ne', '$or'];
exports.FILTERS = {
  $skip: function $skip(value) {
    return parse(value);
  },
  $sort: function $sort(sort) {
    if (_typeof(sort) !== 'object' || Array.isArray(sort)) {
      return sort;
    }

    return Object.keys(sort).reduce(function (result, key) {
      result[key] = _typeof(sort[key]) === 'object' ? sort[key] : parse(sort[key]);
      return result;
    }, {});
  },
  $limit: function $limit(_limit, _ref) {
    var paginate = _ref.paginate;
    var limit = parse(_limit);

    if (paginate && (paginate.default || paginate.max)) {
      var base = paginate.default || 0;
      var lower = typeof limit === 'number' && !isNaN(limit) && limit >= 0 ? limit : base;
      var upper = typeof paginate.max === 'number' ? paginate.max : Number.MAX_VALUE;
      return Math.min(lower, upper);
    }

    return limit;
  },
  $select: function $select(select) {
    if (Array.isArray(select)) {
      return select.map(function (current) {
        return "".concat(current);
      });
    }

    return select;
  },
  $or: function $or(or, _ref2) {
    var operators = _ref2.operators;

    if (Array.isArray(or)) {
      return or.map(function (current) {
        return validateQueryProperty(current, operators);
      });
    }

    return or;
  }
};
/**
 * Converts Feathers special query parameters and pagination settings
 * and returns them separately as `filters` and the rest of the query
 * as `query`. `options` also gets passed the pagination settings and
 * a list of additional `operators` to allow when querying properties.
 *
 * @param query The initial query
 * @param options Options for filtering the query
 * @returns An object with `query` which contains the query without `filters`
 * and `filters` which contains the converted values for each filter.
 */

function filterQuery(_query) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var query = _query || {};

  var settings = _objectSpread(_objectSpread({}, options), {}, {
    filters: _objectSpread(_objectSpread({}, exports.FILTERS), options.filters),
    operators: exports.OPERATORS.concat(options.operators || [])
  });

  return {
    filters: getFilters(query, settings),
    query: getQuery(query, settings)
  };
}

exports.filterQuery = filterQuery;

/***/ }),

/***/ "./node_modules/@feathersjs/adapter-commons/lib/service.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@feathersjs/adapter-commons/lib/service.js ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _excluded = ["$limit"],
    _excluded2 = ["$limit"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.AdapterBase = void 0;

var errors_1 = __webpack_require__(/*! @feathersjs/errors */ "./node_modules/@feathersjs/errors/lib/index.js");

var query_1 = __webpack_require__(/*! ./query */ "./node_modules/@feathersjs/adapter-commons/lib/query.js");

var alwaysMulti = {
  find: true,
  get: false,
  update: false
};
/**
 * An abstract base class that a database adapter can extend from to implement the
 * `__find`, `__get`, `__update`, `__patch` and `__remove` methods.
 */

var AdapterBase = /*#__PURE__*/function () {
  function AdapterBase(options) {
    _classCallCheck(this, AdapterBase);

    this.options = _objectSpread({
      id: 'id',
      events: [],
      paginate: false,
      multi: false,
      filters: {},
      operators: []
    }, options);
  }

  _createClass(AdapterBase, [{
    key: "id",
    get: function get() {
      return this.options.id;
    }
  }, {
    key: "events",
    get: function get() {
      return this.options.events;
    }
    /**
     * Check if this adapter allows multiple updates for a method.
     * @param method The method name to check.
     * @param params The service call params.
     * @returns Wether or not multiple updates are allowed.
     */

  }, {
    key: "allowsMulti",
    value: function allowsMulti(method) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var always = alwaysMulti[method];

      if (typeof always !== 'undefined') {
        return always;
      }

      var _this$getOptions = this.getOptions(params),
          multi = _this$getOptions.multi;

      if (multi === true || multi === false) {
        return multi;
      }

      return multi.includes(method);
    }
    /**
     * Returns the combined options for a service call. Options will be merged
     * with `this.options` and `params.adapter` for dynamic overrides.
     *
     * @param params The parameters for the service method call
     * @returns The actual options for this call
     */

  }, {
    key: "getOptions",
    value: function getOptions(params) {
      var paginate = params.paginate !== undefined ? params.paginate : this.options.paginate;
      return _objectSpread(_objectSpread({}, this.options), {}, {
        paginate: paginate
      }, params.adapter);
    }
    /**
     * Sanitize the incoming data, e.g. removing invalid keywords etc.
     *
     * @param data The data to sanitize
     * @param _params Service call parameters
     * @returns The sanitized data
     */

  }, {
    key: "sanitizeData",
    value: function () {
      var _sanitizeData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(data, _params) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", data);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function sanitizeData(_x, _x2) {
        return _sanitizeData.apply(this, arguments);
      }

      return sanitizeData;
    }()
    /**
     * Returns a sanitized version of `params.query`, converting filter values
     * (like $limit and $skip) into the expected type. Will throw an error if
     * a `$` prefixed filter or operator value that is not allowed in `filters`
     * or `operators` is encountered.
     *
     * @param params The service call parameter.
     * @returns A new object containing the sanitized query.
     */

  }, {
    key: "sanitizeQuery",
    value: function () {
      var _sanitizeQuery = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var params,
            options,
            _ref,
            query,
            filters,
            _args2 = arguments;

        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                options = this.getOptions(params);
                _ref = (0, query_1.filterQuery)(params.query, options), query = _ref.query, filters = _ref.filters;
                return _context2.abrupt("return", _objectSpread(_objectSpread({}, filters), query));

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function sanitizeQuery() {
        return _sanitizeQuery.apply(this, arguments);
      }

      return sanitizeQuery;
    }()
  }, {
    key: "_find",
    value: function () {
      var _find2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(params) {
        var query;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.sanitizeQuery(params);

              case 2:
                query = _context3.sent;
                return _context3.abrupt("return", this.$find(_objectSpread(_objectSpread({}, params), {}, {
                  query: query
                })));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function _find(_x3) {
        return _find2.apply(this, arguments);
      }

      return _find;
    }()
    /**
     * Retrieve a single resource matching the given ID, skipping any service-level hooks but sanitize the query
     * with allowed filters and properties by calling `sanitizeQuery`.
     *
     * @param id - ID of the resource to locate
     * @param params - Service call parameters {@link Params}
     * @see {@link HookLessServiceMethods}
     * @see {@link https://docs.feathersjs.com/api/services.html#get-id-params|Feathers API Documentation: .get(id, params)}
     */

  }, {
    key: "_get",
    value: function () {
      var _get2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(id, params) {
        var query;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.sanitizeQuery(params);

              case 2:
                query = _context4.sent;
                return _context4.abrupt("return", this.$get(id, _objectSpread(_objectSpread({}, params), {}, {
                  query: query
                })));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function _get(_x4, _x5) {
        return _get2.apply(this, arguments);
      }

      return _get;
    }()
  }, {
    key: "_create",
    value: function () {
      var _create2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(data, params) {
        var _this = this;

        var payload;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(Array.isArray(data) && !this.allowsMulti('create', params))) {
                  _context5.next = 2;
                  break;
                }

                throw new errors_1.MethodNotAllowed('Can not create multiple entries');

              case 2:
                if (!Array.isArray(data)) {
                  _context5.next = 8;
                  break;
                }

                _context5.next = 5;
                return Promise.all(data.map(function (current) {
                  return _this.sanitizeData(current, params);
                }));

              case 5:
                _context5.t0 = _context5.sent;
                _context5.next = 11;
                break;

              case 8:
                _context5.next = 10;
                return this.sanitizeData(data, params);

              case 10:
                _context5.t0 = _context5.sent;

              case 11:
                payload = _context5.t0;
                return _context5.abrupt("return", this.$create(payload, params));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _create(_x6, _x7) {
        return _create2.apply(this, arguments);
      }

      return _create;
    }()
    /**
     * Replace any resources matching the given ID with the given data, skipping any service-level hooks.
     *
     * @param id - ID of the resource to be updated
     * @param data - Data to be put in place of the current resource.
     * @param params - Service call parameters {@link Params}
     * @see {@link HookLessServiceMethods}
     * @see {@link https://docs.feathersjs.com/api/services.html#update-id-data-params|Feathers API Documentation: .update(id, data, params)}
     */

  }, {
    key: "_update",
    value: function () {
      var _update2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id, data, params) {
        var payload, query;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(id === null || Array.isArray(data))) {
                  _context6.next = 2;
                  break;
                }

                throw new errors_1.BadRequest("You can not replace multiple instances. Did you mean 'patch'?");

              case 2:
                _context6.next = 4;
                return this.sanitizeData(data, params);

              case 4:
                payload = _context6.sent;
                _context6.next = 7;
                return this.sanitizeQuery(params);

              case 7:
                query = _context6.sent;
                return _context6.abrupt("return", this.$update(id, payload, _objectSpread(_objectSpread({}, params), {}, {
                  query: query
                })));

              case 9:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function _update(_x8, _x9, _x10) {
        return _update2.apply(this, arguments);
      }

      return _update;
    }()
  }, {
    key: "_patch",
    value: function () {
      var _patch2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id, data, params) {
        var _yield$this$sanitizeQ, $limit, query, payload;

        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(id === null && !this.allowsMulti('patch', params))) {
                  _context7.next = 2;
                  break;
                }

                throw new errors_1.MethodNotAllowed('Can not patch multiple entries');

              case 2:
                _context7.next = 4;
                return this.sanitizeQuery(params);

              case 4:
                _yield$this$sanitizeQ = _context7.sent;
                $limit = _yield$this$sanitizeQ.$limit;
                query = _objectWithoutProperties(_yield$this$sanitizeQ, _excluded);
                _context7.next = 9;
                return this.sanitizeData(data, params);

              case 9:
                payload = _context7.sent;
                return _context7.abrupt("return", this.$patch(id, payload, _objectSpread(_objectSpread({}, params), {}, {
                  query: query
                })));

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _patch(_x11, _x12, _x13) {
        return _patch2.apply(this, arguments);
      }

      return _patch;
    }()
  }, {
    key: "_remove",
    value: function () {
      var _remove2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(id, params) {
        var _yield$this$sanitizeQ2, $limit, query;

        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(id === null && !this.allowsMulti('remove', params))) {
                  _context8.next = 2;
                  break;
                }

                throw new errors_1.MethodNotAllowed('Can not remove multiple entries');

              case 2:
                _context8.next = 4;
                return this.sanitizeQuery(params);

              case 4:
                _yield$this$sanitizeQ2 = _context8.sent;
                $limit = _yield$this$sanitizeQ2.$limit;
                query = _objectWithoutProperties(_yield$this$sanitizeQ2, _excluded2);
                return _context8.abrupt("return", this.$remove(id, _objectSpread(_objectSpread({}, params), {}, {
                  query: query
                })));

              case 8:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function _remove(_x14, _x15) {
        return _remove2.apply(this, arguments);
      }

      return _remove;
    }()
  }]);

  return AdapterBase;
}();

exports.AdapterBase = AdapterBase;

/***/ }),

/***/ "./node_modules/@feathersjs/adapter-commons/lib/sort.js":
/*!**************************************************************!*\
  !*** ./node_modules/@feathersjs/adapter-commons/lib/sort.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";
 // Sorting algorithm taken from NeDB (https://github.com/louischatriot/nedb)
// See https://github.com/louischatriot/nedb/blob/e3f0078499aa1005a59d0c2372e425ab789145c1/lib/model.js#L189

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.sorter = exports.compare = exports.compareArrays = exports.compareNSB = void 0;

function compareNSB(a, b) {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
}

exports.compareNSB = compareNSB;

function compareArrays(a, b) {
  for (var i = 0, l = Math.min(a.length, b.length); i < l; i++) {
    var comparison = compare(a[i], b[i]);

    if (comparison !== 0) {
      return comparison;
    }
  } // Common section was identical, longest one wins


  return compareNSB(a.length, b.length);
}

exports.compareArrays = compareArrays;

function compare(a, b) {
  var compareStrings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : compareNSB;

  if (a === b) {
    return 0;
  } // undefined


  if (a === undefined) {
    return -1;
  }

  if (b === undefined) {
    return 1;
  } // null


  if (a === null) {
    return -1;
  }

  if (b === null) {
    return 1;
  } // Numbers


  if (typeof a === 'number') {
    return typeof b === 'number' ? compareNSB(a, b) : -1;
  }

  if (typeof b === 'number') {
    return 1;
  } // Strings


  if (typeof a === 'string') {
    return typeof b === 'string' ? compareStrings(a, b) : -1;
  }

  if (typeof b === 'string') {
    return 1;
  } // Booleans


  if (typeof a === 'boolean') {
    return typeof b === 'boolean' ? compareNSB(a, b) : -1;
  }

  if (typeof b === 'boolean') {
    return 1;
  } // Dates


  if (a instanceof Date) {
    return b instanceof Date ? compareNSB(a.getTime(), b.getTime()) : -1;
  }

  if (b instanceof Date) {
    return 1;
  } // Arrays (first element is most significant and so on)


  if (Array.isArray(a)) {
    return Array.isArray(b) ? compareArrays(a, b) : -1;
  }

  if (Array.isArray(b)) {
    return 1;
  } // Objects


  var aKeys = Object.keys(a).sort();
  var bKeys = Object.keys(b).sort();

  for (var i = 0, l = Math.min(aKeys.length, bKeys.length); i < l; i++) {
    var comparison = compare(a[aKeys[i]], b[bKeys[i]]);

    if (comparison !== 0) {
      return comparison;
    }
  }

  return compareNSB(aKeys.length, bKeys.length);
}

exports.compare = compare; // An in-memory sorting function according to the
// $sort special query parameter

function sorter($sort) {
  var get = function get(value, path) {
    return path.reduce(function (value, key) {
      return value[key];
    }, value);
  };

  var compares = Object.keys($sort).map(function (key) {
    var direction = $sort[key];
    var path = key.split('.');

    if (path.length === 1) {
      return function (a, b) {
        return direction * compare(a[key], b[key]);
      };
    } else {
      return function (a, b) {
        return direction * compare(get(a, path), get(b, path));
      };
    }
  });
  return function (a, b) {
    var _iterator = _createForOfIteratorHelper(compares),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _compare = _step.value;

        var comparasion = _compare(a, b);

        if (comparasion !== 0) {
          return comparasion;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return 0;
  };
}

exports.sorter = sorter;

/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/debug.js":
/*!*******************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/debug.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createDebug = exports.setDebug = exports.noopDebug = void 0;
var debuggers = {};

function noopDebug() {
  return function () {};
}

exports.noopDebug = noopDebug;
var defaultInitializer = noopDebug;

function setDebug(debug) {
  defaultInitializer = debug;
  Object.keys(debuggers).forEach(function (name) {
    debuggers[name] = debug(name);
  });
}

exports.setDebug = setDebug;

function createDebug(name) {
  if (!debuggers[name]) {
    debuggers[name] = defaultInitializer(name);
  }

  return function () {
    return debuggers[name].apply(debuggers, arguments);
  };
}

exports.createDebug = createDebug;

/***/ }),

/***/ "./node_modules/@feathersjs/commons/lib/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/@feathersjs/commons/lib/index.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function get() {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) {
    if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
  }
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.createSymbol = exports.isPromise = exports._ = exports.stripSlashes = void 0; // Removes all leading and trailing slashes from a path

function stripSlashes(name) {
  return name.replace(/^(\/+)|(\/+)$/g, '');
}

exports.stripSlashes = stripSlashes; // A set of lodash-y utility functions that use ES6

exports._ = {
  each: function each(obj, callback) {
    if (obj && typeof obj.forEach === 'function') {
      obj.forEach(callback);
    } else if (exports._.isObject(obj)) {
      Object.keys(obj).forEach(function (key) {
        return callback(obj[key], key);
      });
    }
  },
  some: function some(value, callback) {
    return Object.keys(value).map(function (key) {
      return [value[key], key];
    }).some(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          val = _ref2[0],
          key = _ref2[1];

      return callback(val, key);
    });
  },
  every: function every(value, callback) {
    return Object.keys(value).map(function (key) {
      return [value[key], key];
    }).every(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
          val = _ref4[0],
          key = _ref4[1];

      return callback(val, key);
    });
  },
  keys: function keys(obj) {
    return Object.keys(obj);
  },
  values: function values(obj) {
    return exports._.keys(obj).map(function (key) {
      return obj[key];
    });
  },
  isMatch: function isMatch(obj, item) {
    return exports._.keys(item).every(function (key) {
      return obj[key] === item[key];
    });
  },
  isEmpty: function isEmpty(obj) {
    return exports._.keys(obj).length === 0;
  },
  isObject: function isObject(item) {
    return _typeof(item) === 'object' && !Array.isArray(item) && item !== null;
  },
  isObjectOrArray: function isObjectOrArray(value) {
    return _typeof(value) === 'object' && value !== null;
  },
  extend: function extend(first) {
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    return Object.assign.apply(Object, [first].concat(rest));
  },
  omit: function omit(obj) {
    var result = exports._.extend({}, obj);

    for (var _len2 = arguments.length, keys = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      keys[_key2 - 1] = arguments[_key2];
    }

    keys.forEach(function (key) {
      return delete result[key];
    });
    return result;
  },
  pick: function pick(source) {
    for (var _len3 = arguments.length, keys = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      keys[_key3 - 1] = arguments[_key3];
    }

    return keys.reduce(function (result, key) {
      if (source[key] !== undefined) {
        result[key] = source[key];
      }

      return result;
    }, {});
  },
  // Recursively merge the source object into the target object
  merge: function merge(target, source) {
    if (exports._.isObject(target) && exports._.isObject(source)) {
      Object.keys(source).forEach(function (key) {
        if (exports._.isObject(source[key])) {
          if (!target[key]) {
            Object.assign(target, _defineProperty({}, key, {}));
          }

          exports._.merge(target[key], source[key]);
        } else {
          Object.assign(target, _defineProperty({}, key, source[key]));
        }
      });
    }

    return target;
  }
}; // Duck-checks if an object looks like a promise

function isPromise(result) {
  return exports._.isObject(result) && typeof result.then === 'function';
}

exports.isPromise = isPromise;

function createSymbol(name) {
  return typeof Symbol !== 'undefined' ? Symbol(name) : name;
}

exports.createSymbol = createSymbol;

__exportStar(__webpack_require__(/*! ./debug */ "./node_modules/@feathersjs/commons/lib/debug.js"), exports);

/***/ }),

/***/ "./node_modules/@feathersjs/errors/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@feathersjs/errors/lib/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports) {

"use strict";


var _excluded = ["message", "errors"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.convert = exports.errors = exports.Unavailable = exports.BadGateway = exports.NotImplemented = exports.GeneralError = exports.TooManyRequests = exports.Unprocessable = exports.LengthRequired = exports.Gone = exports.Conflict = exports.Timeout = exports.NotAcceptable = exports.MethodNotAllowed = exports.NotFound = exports.Forbidden = exports.PaymentError = exports.NotAuthenticated = exports.BadRequest = exports.FeathersError = void 0;

var FeathersError = /*#__PURE__*/function (_Error) {
  _inherits(FeathersError, _Error);

  var _super = _createSuper(FeathersError);

  function FeathersError(err, name, code, className, _data) {
    var _this;

    _classCallCheck(this, FeathersError);

    var msg = typeof err === 'string' ? err : 'Error';
    var properties = {
      name: name,
      code: code,
      className: className,
      type: 'FeathersError'
    };

    if (Array.isArray(_data)) {
      properties.data = _data;
    } else if (_typeof(err) === 'object' || _data !== undefined) {
      var _ref = _typeof(err) === 'object' ? err : _data,
          message = _ref.message,
          errors = _ref.errors,
          rest = _objectWithoutProperties(_ref, _excluded);

      msg = message || msg;
      properties.errors = errors;
      properties.data = rest;
    }

    _this = _super.call(this, msg);
    Object.assign(_assertThisInitialized(_this), properties);
    return _this;
  }

  _createClass(FeathersError, [{
    key: "toJSON",
    value: function toJSON() {
      var result = {
        name: this.name,
        message: this.message,
        code: this.code,
        className: this.className
      };

      if (this.data !== undefined) {
        result.data = this.data;
      }

      if (this.errors !== undefined) {
        result.errors = this.errors;
      }

      return result;
    }
  }]);

  return FeathersError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.FeathersError = FeathersError;

var BadRequest = /*#__PURE__*/function (_FeathersError) {
  _inherits(BadRequest, _FeathersError);

  var _super2 = _createSuper(BadRequest);

  function BadRequest(message, data) {
    _classCallCheck(this, BadRequest);

    return _super2.call(this, message, 'BadRequest', 400, 'bad-request', data);
  }

  return _createClass(BadRequest);
}(FeathersError);

exports.BadRequest = BadRequest; // 401 - Not Authenticated

var NotAuthenticated = /*#__PURE__*/function (_FeathersError2) {
  _inherits(NotAuthenticated, _FeathersError2);

  var _super3 = _createSuper(NotAuthenticated);

  function NotAuthenticated(message, data) {
    _classCallCheck(this, NotAuthenticated);

    return _super3.call(this, message, 'NotAuthenticated', 401, 'not-authenticated', data);
  }

  return _createClass(NotAuthenticated);
}(FeathersError);

exports.NotAuthenticated = NotAuthenticated; // 402 - Payment Error

var PaymentError = /*#__PURE__*/function (_FeathersError3) {
  _inherits(PaymentError, _FeathersError3);

  var _super4 = _createSuper(PaymentError);

  function PaymentError(message, data) {
    _classCallCheck(this, PaymentError);

    return _super4.call(this, message, 'PaymentError', 402, 'payment-error', data);
  }

  return _createClass(PaymentError);
}(FeathersError);

exports.PaymentError = PaymentError; // 403 - Forbidden

var Forbidden = /*#__PURE__*/function (_FeathersError4) {
  _inherits(Forbidden, _FeathersError4);

  var _super5 = _createSuper(Forbidden);

  function Forbidden(message, data) {
    _classCallCheck(this, Forbidden);

    return _super5.call(this, message, 'Forbidden', 403, 'forbidden', data);
  }

  return _createClass(Forbidden);
}(FeathersError);

exports.Forbidden = Forbidden; // 404 - Not Found

var NotFound = /*#__PURE__*/function (_FeathersError5) {
  _inherits(NotFound, _FeathersError5);

  var _super6 = _createSuper(NotFound);

  function NotFound(message, data) {
    _classCallCheck(this, NotFound);

    return _super6.call(this, message, 'NotFound', 404, 'not-found', data);
  }

  return _createClass(NotFound);
}(FeathersError);

exports.NotFound = NotFound; // 405 - Method Not Allowed

var MethodNotAllowed = /*#__PURE__*/function (_FeathersError6) {
  _inherits(MethodNotAllowed, _FeathersError6);

  var _super7 = _createSuper(MethodNotAllowed);

  function MethodNotAllowed(message, data) {
    _classCallCheck(this, MethodNotAllowed);

    return _super7.call(this, message, 'MethodNotAllowed', 405, 'method-not-allowed', data);
  }

  return _createClass(MethodNotAllowed);
}(FeathersError);

exports.MethodNotAllowed = MethodNotAllowed; // 406 - Not Acceptable

var NotAcceptable = /*#__PURE__*/function (_FeathersError7) {
  _inherits(NotAcceptable, _FeathersError7);

  var _super8 = _createSuper(NotAcceptable);

  function NotAcceptable(message, data) {
    _classCallCheck(this, NotAcceptable);

    return _super8.call(this, message, 'NotAcceptable', 406, 'not-acceptable', data);
  }

  return _createClass(NotAcceptable);
}(FeathersError);

exports.NotAcceptable = NotAcceptable; // 408 - Timeout

var Timeout = /*#__PURE__*/function (_FeathersError8) {
  _inherits(Timeout, _FeathersError8);

  var _super9 = _createSuper(Timeout);

  function Timeout(message, data) {
    _classCallCheck(this, Timeout);

    return _super9.call(this, message, 'Timeout', 408, 'timeout', data);
  }

  return _createClass(Timeout);
}(FeathersError);

exports.Timeout = Timeout; // 409 - Conflict

var Conflict = /*#__PURE__*/function (_FeathersError9) {
  _inherits(Conflict, _FeathersError9);

  var _super10 = _createSuper(Conflict);

  function Conflict(message, data) {
    _classCallCheck(this, Conflict);

    return _super10.call(this, message, 'Conflict', 409, 'conflict', data);
  }

  return _createClass(Conflict);
}(FeathersError);

exports.Conflict = Conflict; // 410 - Gone

var Gone = /*#__PURE__*/function (_FeathersError10) {
  _inherits(Gone, _FeathersError10);

  var _super11 = _createSuper(Gone);

  function Gone(message, data) {
    _classCallCheck(this, Gone);

    return _super11.call(this, message, 'Gone', 410, 'gone', data);
  }

  return _createClass(Gone);
}(FeathersError);

exports.Gone = Gone; // 411 - Length Required

var LengthRequired = /*#__PURE__*/function (_FeathersError11) {
  _inherits(LengthRequired, _FeathersError11);

  var _super12 = _createSuper(LengthRequired);

  function LengthRequired(message, data) {
    _classCallCheck(this, LengthRequired);

    return _super12.call(this, message, 'LengthRequired', 411, 'length-required', data);
  }

  return _createClass(LengthRequired);
}(FeathersError);

exports.LengthRequired = LengthRequired; // 422 Unprocessable

var Unprocessable = /*#__PURE__*/function (_FeathersError12) {
  _inherits(Unprocessable, _FeathersError12);

  var _super13 = _createSuper(Unprocessable);

  function Unprocessable(message, data) {
    _classCallCheck(this, Unprocessable);

    return _super13.call(this, message, 'Unprocessable', 422, 'unprocessable', data);
  }

  return _createClass(Unprocessable);
}(FeathersError);

exports.Unprocessable = Unprocessable; // 429 Too Many Requests

var TooManyRequests = /*#__PURE__*/function (_FeathersError13) {
  _inherits(TooManyRequests, _FeathersError13);

  var _super14 = _createSuper(TooManyRequests);

  function TooManyRequests(message, data) {
    _classCallCheck(this, TooManyRequests);

    return _super14.call(this, message, 'TooManyRequests', 429, 'too-many-requests', data);
  }

  return _createClass(TooManyRequests);
}(FeathersError);

exports.TooManyRequests = TooManyRequests; // 500 - General Error

var GeneralError = /*#__PURE__*/function (_FeathersError14) {
  _inherits(GeneralError, _FeathersError14);

  var _super15 = _createSuper(GeneralError);

  function GeneralError(message, data) {
    _classCallCheck(this, GeneralError);

    return _super15.call(this, message, 'GeneralError', 500, 'general-error', data);
  }

  return _createClass(GeneralError);
}(FeathersError);

exports.GeneralError = GeneralError; // 501 - Not Implemented

var NotImplemented = /*#__PURE__*/function (_FeathersError15) {
  _inherits(NotImplemented, _FeathersError15);

  var _super16 = _createSuper(NotImplemented);

  function NotImplemented(message, data) {
    _classCallCheck(this, NotImplemented);

    return _super16.call(this, message, 'NotImplemented', 501, 'not-implemented', data);
  }

  return _createClass(NotImplemented);
}(FeathersError);

exports.NotImplemented = NotImplemented; // 502 - Bad Gateway

var BadGateway = /*#__PURE__*/function (_FeathersError16) {
  _inherits(BadGateway, _FeathersError16);

  var _super17 = _createSuper(BadGateway);

  function BadGateway(message, data) {
    _classCallCheck(this, BadGateway);

    return _super17.call(this, message, 'BadGateway', 502, 'bad-gateway', data);
  }

  return _createClass(BadGateway);
}(FeathersError);

exports.BadGateway = BadGateway; // 503 - Unavailable

var Unavailable = /*#__PURE__*/function (_FeathersError17) {
  _inherits(Unavailable, _FeathersError17);

  var _super18 = _createSuper(Unavailable);

  function Unavailable(message, data) {
    _classCallCheck(this, Unavailable);

    return _super18.call(this, message, 'Unavailable', 503, 'unavailable', data);
  }

  return _createClass(Unavailable);
}(FeathersError);

exports.Unavailable = Unavailable;
exports.errors = {
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
  LengthRequired: LengthRequired,
  Unprocessable: Unprocessable,
  TooManyRequests: TooManyRequests,
  GeneralError: GeneralError,
  NotImplemented: NotImplemented,
  BadGateway: BadGateway,
  Unavailable: Unavailable,
  400: BadRequest,
  401: NotAuthenticated,
  402: PaymentError,
  403: Forbidden,
  404: NotFound,
  405: MethodNotAllowed,
  406: NotAcceptable,
  408: Timeout,
  409: Conflict,
  410: Gone,
  411: LengthRequired,
  422: Unprocessable,
  429: TooManyRequests,
  500: GeneralError,
  501: NotImplemented,
  502: BadGateway,
  503: Unavailable
};

function convert(error) {
  if (!error) {
    return error;
  }

  var FeathersError = exports.errors[error.name];
  var result = FeathersError ? new FeathersError(error.message, error.data) : new Error(error.message || error);

  if (_typeof(error) === 'object') {
    Object.assign(result, error);
  }

  return result;
}

exports.convert = convert;

/***/ }),

/***/ "./node_modules/@feathersjs/memory/lib/index.js":
/*!******************************************************!*\
  !*** ./node_modules/@feathersjs/memory/lib/index.js ***!
  \******************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _excluded = ["$skip", "$sort", "$limit", "$select"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.memory = exports.MemoryService = exports.MemoryAdapter = void 0;

var errors_1 = __webpack_require__(/*! @feathersjs/errors */ "./node_modules/@feathersjs/errors/lib/index.js");

var commons_1 = __webpack_require__(/*! @feathersjs/commons */ "./node_modules/@feathersjs/commons/lib/index.js");

var adapter_commons_1 = __webpack_require__(/*! @feathersjs/adapter-commons */ "./node_modules/@feathersjs/adapter-commons/lib/index.js");

var sift_1 = __importDefault(__webpack_require__(/*! sift */ "./node_modules/sift/es5m/index.js"));

var _select = function _select(data, params) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var base = (0, adapter_commons_1.select).apply(void 0, [params].concat(args));
  return base(JSON.parse(JSON.stringify(data)));
};

var MemoryAdapter = /*#__PURE__*/function (_adapter_commons_1$Ad) {
  _inherits(MemoryAdapter, _adapter_commons_1$Ad);

  var _super = _createSuper(MemoryAdapter);

  function MemoryAdapter() {
    var _this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MemoryAdapter);

    _this = _super.call(this, _objectSpread({
      id: 'id',
      matcher: sift_1.default,
      sorter: adapter_commons_1.sorter,
      store: {},
      startId: 0
    }, options));
    _this._uId = _this.options.startId;
    _this.store = _objectSpread({}, _this.options.store);
    return _this;
  }

  _createClass(MemoryAdapter, [{
    key: "getEntries",
    value: function () {
      var _getEntries = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_params) {
        var params;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _params || {};
                return _context.abrupt("return", this.$find(_objectSpread(_objectSpread({}, params), {}, {
                  paginate: false
                })));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getEntries(_x) {
        return _getEntries.apply(this, arguments);
      }

      return getEntries;
    }()
  }, {
    key: "getQuery",
    value: function getQuery(params) {
      var _ref = params.query || {},
          $skip = _ref.$skip,
          $sort = _ref.$sort,
          $limit = _ref.$limit,
          $select = _ref.$select,
          query = _objectWithoutProperties(_ref, _excluded);

      return {
        query: query,
        filters: {
          $skip: $skip,
          $sort: $sort,
          $limit: $limit,
          $select: $select
        }
      };
    }
  }, {
    key: "$find",
    value: function () {
      var _$find = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var params,
            _this$getOptions,
            paginate,
            _this$getQuery,
            query,
            filters,
            values,
            total,
            result,
            _args2 = arguments;

        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                _this$getOptions = this.getOptions(params), paginate = _this$getOptions.paginate;
                _this$getQuery = this.getQuery(params), query = _this$getQuery.query, filters = _this$getQuery.filters;
                values = commons_1._.values(this.store).filter(this.options.matcher(query));
                total = values.length;

                if (filters.$sort !== undefined) {
                  values.sort(this.options.sorter(filters.$sort));
                }

                if (filters.$skip !== undefined) {
                  values = values.slice(filters.$skip);
                }

                if (filters.$limit !== undefined) {
                  values = values.slice(0, filters.$limit);
                }

                result = {
                  total: total,
                  limit: filters.$limit,
                  skip: filters.$skip || 0,
                  data: values.map(function (value) {
                    return _select(value, params);
                  })
                };

                if (paginate) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt("return", result.data);

              case 11:
                return _context2.abrupt("return", result);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function $find() {
        return _$find.apply(this, arguments);
      }

      return $find;
    }()
  }, {
    key: "$get",
    value: function () {
      var _$get = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id) {
        var params,
            _this$getQuery2,
            query,
            value,
            _args3 = arguments;

        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                params = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
                _this$getQuery2 = this.getQuery(params), query = _this$getQuery2.query;

                if (!(id in this.store)) {
                  _context3.next = 6;
                  break;
                }

                value = this.store[id];

                if (!this.options.matcher(query)(value)) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt("return", _select(value, params, this.id));

              case 6:
                throw new errors_1.NotFound("No record found for id '".concat(id, "'"));

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function $get(_x2) {
        return _$get.apply(this, arguments);
      }

      return $get;
    }()
  }, {
    key: "$create",
    value: function () {
      var _$create = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(data) {
        var _this2 = this;

        var params,
            id,
            current,
            result,
            _args4 = arguments;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                params = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};

                if (!Array.isArray(data)) {
                  _context4.next = 3;
                  break;
                }

                return _context4.abrupt("return", Promise.all(data.map(function (current) {
                  return _this2.$create(current, params);
                })));

              case 3:
                id = data[this.id] || this._uId++;
                current = commons_1._.extend({}, data, _defineProperty({}, this.id, id));
                result = this.store[id] = current;
                return _context4.abrupt("return", _select(result, params, this.id));

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function $create(_x3) {
        return _$create.apply(this, arguments);
      }

      return $create;
    }()
  }, {
    key: "$update",
    value: function () {
      var _$update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id, data) {
        var params,
            oldEntry,
            oldId,
            _args5 = arguments;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                params = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
                _context5.next = 3;
                return this.$get(id);

              case 3:
                oldEntry = _context5.sent;
                // We don't want our id to change type if it can be coerced
                oldId = oldEntry[this.id]; // eslint-disable-next-line eqeqeq

                id = oldId == id ? oldId : id;
                this.store[id] = commons_1._.extend({}, data, _defineProperty({}, this.id, id));
                return _context5.abrupt("return", this.$get(id, params));

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function $update(_x4, _x5) {
        return _$update.apply(this, arguments);
      }

      return $update;
    }()
  }, {
    key: "$patch",
    value: function () {
      var _$patch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(id, data) {
        var _this3 = this;

        var params,
            _this$getQuery3,
            query,
            patchEntry,
            entries,
            _args6 = arguments;

        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                params = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
                _this$getQuery3 = this.getQuery(params), query = _this$getQuery3.query;

                patchEntry = function patchEntry(entry) {
                  var currentId = entry[_this3.id];
                  _this3.store[currentId] = commons_1._.extend(_this3.store[currentId], commons_1._.omit(data, _this3.id));
                  return _select(_this3.store[currentId], params, _this3.id);
                };

                if (!(id === null)) {
                  _context6.next = 8;
                  break;
                }

                _context6.next = 6;
                return this.getEntries(_objectSpread(_objectSpread({}, params), {}, {
                  query: query
                }));

              case 6:
                entries = _context6.sent;
                return _context6.abrupt("return", entries.map(patchEntry));

              case 8:
                _context6.t0 = patchEntry;
                _context6.next = 11;
                return this.$get(id, params);

              case 11:
                _context6.t1 = _context6.sent;
                return _context6.abrupt("return", (0, _context6.t0)(_context6.t1));

              case 13:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function $patch(_x6, _x7) {
        return _$patch.apply(this, arguments);
      }

      return $patch;
    }()
  }, {
    key: "$remove",
    value: function () {
      var _$remove = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(id) {
        var _this4 = this;

        var params,
            _this$getQuery4,
            query,
            entries,
            entry,
            _args7 = arguments;

        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                params = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
                _this$getQuery4 = this.getQuery(params), query = _this$getQuery4.query;

                if (!(id === null)) {
                  _context7.next = 7;
                  break;
                }

                _context7.next = 5;
                return this.getEntries(_objectSpread(_objectSpread({}, params), {}, {
                  query: query
                }));

              case 5:
                entries = _context7.sent;
                return _context7.abrupt("return", Promise.all(entries.map(function (current) {
                  return _this4.$remove(current[_this4.id], params);
                })));

              case 7:
                _context7.next = 9;
                return this.$get(id, params);

              case 9:
                entry = _context7.sent;
                delete this.store[id];
                return _context7.abrupt("return", entry);

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function $remove(_x8) {
        return _$remove.apply(this, arguments);
      }

      return $remove;
    }()
  }]);

  return MemoryAdapter;
}(adapter_commons_1.AdapterBase);

exports.MemoryAdapter = MemoryAdapter;

var MemoryService = /*#__PURE__*/function (_MemoryAdapter) {
  _inherits(MemoryService, _MemoryAdapter);

  var _super2 = _createSuper(MemoryService);

  function MemoryService() {
    _classCallCheck(this, MemoryService);

    return _super2.apply(this, arguments);
  }

  _createClass(MemoryService, [{
    key: "find",
    value: function () {
      var _find = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(params) {
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                return _context8.abrupt("return", this._find(params));

              case 1:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function find(_x9) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(id, params) {
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                return _context9.abrupt("return", this._get(id, params));

              case 1:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function get(_x10, _x11) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(data, params) {
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                return _context10.abrupt("return", this._create(data, params));

              case 1:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function create(_x12, _x13) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(id, data, params) {
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                return _context11.abrupt("return", this._update(id, data, params));

              case 1:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function update(_x14, _x15, _x16) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "patch",
    value: function () {
      var _patch = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(id, data, params) {
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                return _context12.abrupt("return", this._patch(id, data, params));

              case 1:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function patch(_x17, _x18, _x19) {
        return _patch.apply(this, arguments);
      }

      return patch;
    }()
  }, {
    key: "remove",
    value: function () {
      var _remove = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(id, params) {
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                return _context13.abrupt("return", this._remove(id, params));

              case 1:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function remove(_x20, _x21) {
        return _remove.apply(this, arguments);
      }

      return remove;
    }()
  }]);

  return MemoryService;
}(MemoryAdapter);

exports.MemoryService = MemoryService;

function memory() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new MemoryService(options);
}

exports.memory = memory;

/***/ }),

/***/ "./node_modules/sift/es5m/index.js":
/*!*****************************************!*\
  !*** ./node_modules/sift/es5m/index.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$Size": function() { return /* binding */ $Size; },
/* harmony export */   "$all": function() { return /* binding */ $all; },
/* harmony export */   "$and": function() { return /* binding */ $and; },
/* harmony export */   "$elemMatch": function() { return /* binding */ $elemMatch; },
/* harmony export */   "$eq": function() { return /* binding */ $eq; },
/* harmony export */   "$exists": function() { return /* binding */ $exists; },
/* harmony export */   "$gt": function() { return /* binding */ $gt; },
/* harmony export */   "$gte": function() { return /* binding */ $gte; },
/* harmony export */   "$in": function() { return /* binding */ $in; },
/* harmony export */   "$lt": function() { return /* binding */ $lt; },
/* harmony export */   "$lte": function() { return /* binding */ $lte; },
/* harmony export */   "$mod": function() { return /* binding */ $mod; },
/* harmony export */   "$ne": function() { return /* binding */ $ne; },
/* harmony export */   "$nin": function() { return /* binding */ $nin; },
/* harmony export */   "$nor": function() { return /* binding */ $nor; },
/* harmony export */   "$not": function() { return /* binding */ $not; },
/* harmony export */   "$options": function() { return /* binding */ $options; },
/* harmony export */   "$or": function() { return /* binding */ $or; },
/* harmony export */   "$regex": function() { return /* binding */ $regex; },
/* harmony export */   "$size": function() { return /* binding */ $size; },
/* harmony export */   "$type": function() { return /* binding */ $type; },
/* harmony export */   "$where": function() { return /* binding */ $where; },
/* harmony export */   "EqualsOperation": function() { return /* binding */ EqualsOperation; },
/* harmony export */   "createDefaultQueryOperation": function() { return /* binding */ createDefaultQueryOperation; },
/* harmony export */   "createEqualsOperation": function() { return /* binding */ createEqualsOperation; },
/* harmony export */   "createOperationTester": function() { return /* binding */ createOperationTester; },
/* harmony export */   "createQueryOperation": function() { return /* binding */ createQueryOperation; },
/* harmony export */   "createQueryTester": function() { return /* binding */ createQueryTester; }
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    }
  };

  return _extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");

  _extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var typeChecker = function typeChecker(type) {
  var typeString = "[object " + type + "]";
  return function (value) {
    return getClassName(value) === typeString;
  };
};

var getClassName = function getClassName(value) {
  return Object.prototype.toString.call(value);
};

var comparable = function comparable(value) {
  if (value instanceof Date) {
    return value.getTime();
  } else if (isArray(value)) {
    return value.map(comparable);
  } else if (value && typeof value.toJSON === "function") {
    return value.toJSON();
  }

  return value;
};

var isArray = typeChecker("Array");
var isObject = typeChecker("Object");
var isFunction = typeChecker("Function");

var isVanillaObject = function isVanillaObject(value) {
  return value && (value.constructor === Object || value.constructor === Array || value.constructor.toString() === "function Object() { [native code] }" || value.constructor.toString() === "function Array() { [native code] }") && !value.toJSON;
};

var equals = function equals(a, b) {
  if (a == null && a == b) {
    return true;
  }

  if (a === b) {
    return true;
  }

  if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
    return false;
  }

  if (isArray(a)) {
    if (a.length !== b.length) {
      return false;
    }

    for (var i = 0, length_1 = a.length; i < length_1; i++) {
      if (!equals(a[i], b[i])) return false;
    }

    return true;
  } else if (isObject(a)) {
    if (Object.keys(a).length !== Object.keys(b).length) {
      return false;
    }

    for (var key in a) {
      if (!equals(a[key], b[key])) return false;
    }

    return true;
  }

  return false;
};
/**
 * Walks through each value given the context - used for nested operations. E.g:
 * { "person.address": { $eq: "blarg" }}
 */


var walkKeyPathValues = function walkKeyPathValues(item, keyPath, next, depth, key, owner) {
  var currentKey = keyPath[depth]; // if array, then try matching. Might fall through for cases like:
  // { $eq: [1, 2, 3] }, [ 1, 2, 3 ].

  if (isArray(item) && isNaN(Number(currentKey))) {
    for (var i = 0, length_1 = item.length; i < length_1; i++) {
      // if FALSE is returned, then terminate walker. For operations, this simply
      // means that the search critera was met.
      if (!walkKeyPathValues(item[i], keyPath, next, depth, i, item)) {
        return false;
      }
    }
  }

  if (depth === keyPath.length || item == null) {
    return next(item, key, owner, depth === 0);
  }

  return walkKeyPathValues(item[currentKey], keyPath, next, depth + 1, currentKey, item);
};

var BaseOperation =
/** @class */
function () {
  function BaseOperation(params, owneryQuery, options, name) {
    this.params = params;
    this.owneryQuery = owneryQuery;
    this.options = options;
    this.name = name;
    this.init();
  }

  BaseOperation.prototype.init = function () {};

  BaseOperation.prototype.reset = function () {
    this.done = false;
    this.keep = false;
  };

  return BaseOperation;
}();

var GroupOperation =
/** @class */
function (_super) {
  __extends(GroupOperation, _super);

  function GroupOperation(params, owneryQuery, options, children) {
    var _this = _super.call(this, params, owneryQuery, options) || this;

    _this.children = children;
    return _this;
  }
  /**
   */


  GroupOperation.prototype.reset = function () {
    this.keep = false;
    this.done = false;

    for (var i = 0, length_2 = this.children.length; i < length_2; i++) {
      this.children[i].reset();
    }
  };
  /**
   */


  GroupOperation.prototype.childrenNext = function (item, key, owner, root) {
    var done = true;
    var keep = true;

    for (var i = 0, length_3 = this.children.length; i < length_3; i++) {
      var childOperation = this.children[i];

      if (!childOperation.done) {
        childOperation.next(item, key, owner, root);
      }

      if (!childOperation.keep) {
        keep = false;
      }

      if (childOperation.done) {
        if (!childOperation.keep) {
          break;
        }
      } else {
        done = false;
      }
    }

    this.done = done;
    this.keep = keep;
  };

  return GroupOperation;
}(BaseOperation);

var NamedGroupOperation =
/** @class */
function (_super) {
  __extends(NamedGroupOperation, _super);

  function NamedGroupOperation(params, owneryQuery, options, children, name) {
    var _this = _super.call(this, params, owneryQuery, options, children) || this;

    _this.name = name;
    return _this;
  }

  return NamedGroupOperation;
}(GroupOperation);

var QueryOperation =
/** @class */
function (_super) {
  __extends(QueryOperation, _super);

  function QueryOperation() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.propop = true;
    return _this;
  }
  /**
   */


  QueryOperation.prototype.next = function (item, key, parent, root) {
    this.childrenNext(item, key, parent, root);
  };

  return QueryOperation;
}(GroupOperation);

var NestedOperation =
/** @class */
function (_super) {
  __extends(NestedOperation, _super);

  function NestedOperation(keyPath, params, owneryQuery, options, children) {
    var _this = _super.call(this, params, owneryQuery, options, children) || this;

    _this.keyPath = keyPath;
    _this.propop = true;
    /**
     */

    _this._nextNestedValue = function (value, key, owner, root) {
      _this.childrenNext(value, key, owner, root);

      return !_this.done;
    };

    return _this;
  }
  /**
   */


  NestedOperation.prototype.next = function (item, key, parent) {
    walkKeyPathValues(item, this.keyPath, this._nextNestedValue, 0, key, parent);
  };

  return NestedOperation;
}(GroupOperation);

var createTester = function createTester(a, compare) {
  if (a instanceof Function) {
    return a;
  }

  if (a instanceof RegExp) {
    return function (b) {
      var result = typeof b === "string" && a.test(b);
      a.lastIndex = 0;
      return result;
    };
  }

  var comparableA = comparable(a);
  return function (b) {
    return compare(comparableA, comparable(b));
  };
};

var EqualsOperation =
/** @class */
function (_super) {
  __extends(EqualsOperation, _super);

  function EqualsOperation() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.propop = true;
    return _this;
  }

  EqualsOperation.prototype.init = function () {
    this._test = createTester(this.params, this.options.compare);
  };

  EqualsOperation.prototype.next = function (item, key, parent) {
    if (!Array.isArray(parent) || parent.hasOwnProperty(key)) {
      if (this._test(item, key, parent)) {
        this.done = true;
        this.keep = true;
      }
    }
  };

  return EqualsOperation;
}(BaseOperation);

var createEqualsOperation = function createEqualsOperation(params, owneryQuery, options) {
  return new EqualsOperation(params, owneryQuery, options);
};

var NopeOperation =
/** @class */
function (_super) {
  __extends(NopeOperation, _super);

  function NopeOperation() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.propop = true;
    return _this;
  }

  NopeOperation.prototype.next = function () {
    this.done = true;
    this.keep = false;
  };

  return NopeOperation;
}(BaseOperation);

var numericalOperationCreator = function numericalOperationCreator(createNumericalOperation) {
  return function (params, owneryQuery, options, name) {
    if (params == null) {
      return new NopeOperation(params, owneryQuery, options, name);
    }

    return createNumericalOperation(params, owneryQuery, options, name);
  };
};

var numericalOperation = function numericalOperation(createTester) {
  return numericalOperationCreator(function (params, owneryQuery, options, name) {
    var typeofParams = _typeof(comparable(params));

    var test = createTester(params);
    return new EqualsOperation(function (b) {
      return _typeof(comparable(b)) === typeofParams && test(b);
    }, owneryQuery, options, name);
  });
};

var createNamedOperation = function createNamedOperation(name, params, parentQuery, options) {
  var operationCreator = options.operations[name];

  if (!operationCreator) {
    throwUnsupportedOperation(name);
  }

  return operationCreator(params, parentQuery, options, name);
};

var throwUnsupportedOperation = function throwUnsupportedOperation(name) {
  throw new Error("Unsupported operation: " + name);
};

var containsOperation = function containsOperation(query, options) {
  for (var key in query) {
    if (options.operations.hasOwnProperty(key) || key.charAt(0) === "$") return true;
  }

  return false;
};

var createNestedOperation = function createNestedOperation(keyPath, nestedQuery, parentKey, owneryQuery, options) {
  if (containsOperation(nestedQuery, options)) {
    var _a = createQueryOperations(nestedQuery, parentKey, options),
        selfOperations = _a[0],
        nestedOperations = _a[1];

    if (nestedOperations.length) {
      throw new Error("Property queries must contain only operations, or exact objects.");
    }

    return new NestedOperation(keyPath, nestedQuery, owneryQuery, options, selfOperations);
  }

  return new NestedOperation(keyPath, nestedQuery, owneryQuery, options, [new EqualsOperation(nestedQuery, owneryQuery, options)]);
};

var createQueryOperation = function createQueryOperation(query, owneryQuery, _a) {
  if (owneryQuery === void 0) {
    owneryQuery = null;
  }

  var _b = _a === void 0 ? {} : _a,
      compare = _b.compare,
      operations = _b.operations;

  var options = {
    compare: compare || equals,
    operations: Object.assign({}, operations || {})
  };

  var _c = createQueryOperations(query, null, options),
      selfOperations = _c[0],
      nestedOperations = _c[1];

  var ops = [];

  if (selfOperations.length) {
    ops.push(new NestedOperation([], query, owneryQuery, options, selfOperations));
  }

  ops.push.apply(ops, nestedOperations);

  if (ops.length === 1) {
    return ops[0];
  }

  return new QueryOperation(query, owneryQuery, options, ops);
};

var createQueryOperations = function createQueryOperations(query, parentKey, options) {
  var selfOperations = [];
  var nestedOperations = [];

  if (!isVanillaObject(query)) {
    selfOperations.push(new EqualsOperation(query, query, options));
    return [selfOperations, nestedOperations];
  }

  for (var key in query) {
    if (options.operations.hasOwnProperty(key)) {
      var op = createNamedOperation(key, query[key], query, options);

      if (op) {
        if (!op.propop && parentKey && !options.operations[parentKey]) {
          throw new Error("Malformed query. " + key + " cannot be matched against property.");
        }
      } // probably just a flag for another operation (like $options)


      if (op != null) {
        selfOperations.push(op);
      }
    } else if (key.charAt(0) === "$") {
      throwUnsupportedOperation(key);
    } else {
      nestedOperations.push(createNestedOperation(key.split("."), query[key], key, query, options));
    }
  }

  return [selfOperations, nestedOperations];
};

var createOperationTester = function createOperationTester(operation) {
  return function (item, key, owner) {
    operation.reset();
    operation.next(item, key, owner);
    return operation.keep;
  };
};

var createQueryTester = function createQueryTester(query, options) {
  if (options === void 0) {
    options = {};
  }

  return createOperationTester(createQueryOperation(query, null, options));
};

var $Ne =
/** @class */
function (_super) {
  __extends($Ne, _super);

  function $Ne() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.propop = true;
    return _this;
  }

  $Ne.prototype.init = function () {
    this._test = createTester(this.params, this.options.compare);
  };

  $Ne.prototype.reset = function () {
    _super.prototype.reset.call(this);

    this.keep = true;
  };

  $Ne.prototype.next = function (item) {
    if (this._test(item)) {
      this.done = true;
      this.keep = false;
    }
  };

  return $Ne;
}(BaseOperation); // https://docs.mongodb.com/manual/reference/operator/query/elemMatch/


var $ElemMatch =
/** @class */
function (_super) {
  __extends($ElemMatch, _super);

  function $ElemMatch() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.propop = true;
    return _this;
  }

  $ElemMatch.prototype.init = function () {
    if (!this.params || _typeof(this.params) !== "object") {
      throw new Error("Malformed query. $elemMatch must by an object.");
    }

    this._queryOperation = createQueryOperation(this.params, this.owneryQuery, this.options);
  };

  $ElemMatch.prototype.reset = function () {
    _super.prototype.reset.call(this);

    this._queryOperation.reset();
  };

  $ElemMatch.prototype.next = function (item) {
    if (isArray(item)) {
      for (var i = 0, length_1 = item.length; i < length_1; i++) {
        // reset query operation since item being tested needs to pass _all_ query
        // operations for it to be a success
        this._queryOperation.reset();

        var child = item[i];

        this._queryOperation.next(child, i, item, false);

        this.keep = this.keep || this._queryOperation.keep;
      }

      this.done = true;
    } else {
      this.done = false;
      this.keep = false;
    }
  };

  return $ElemMatch;
}(BaseOperation);

var $Not =
/** @class */
function (_super) {
  __extends($Not, _super);

  function $Not() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.propop = true;
    return _this;
  }

  $Not.prototype.init = function () {
    this._queryOperation = createQueryOperation(this.params, this.owneryQuery, this.options);
  };

  $Not.prototype.reset = function () {
    _super.prototype.reset.call(this);

    this._queryOperation.reset();
  };

  $Not.prototype.next = function (item, key, owner, root) {
    this._queryOperation.next(item, key, owner, root);

    this.done = this._queryOperation.done;
    this.keep = !this._queryOperation.keep;
  };

  return $Not;
}(BaseOperation);

var $Size =
/** @class */
function (_super) {
  __extends($Size, _super);

  function $Size() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.propop = true;
    return _this;
  }

  $Size.prototype.init = function () {};

  $Size.prototype.next = function (item) {
    if (isArray(item) && item.length === this.params) {
      this.done = true;
      this.keep = true;
    } // if (parent && parent.length === this.params) {
    //   this.done = true;
    //   this.keep = true;
    // }

  };

  return $Size;
}(BaseOperation);

var assertGroupNotEmpty = function assertGroupNotEmpty(values) {
  if (values.length === 0) {
    throw new Error("$and/$or/$nor must be a nonempty array");
  }
};

var $Or =
/** @class */
function (_super) {
  __extends($Or, _super);

  function $Or() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.propop = false;
    return _this;
  }

  $Or.prototype.init = function () {
    var _this = this;

    assertGroupNotEmpty(this.params);
    this._ops = this.params.map(function (op) {
      return createQueryOperation(op, null, _this.options);
    });
  };

  $Or.prototype.reset = function () {
    this.done = false;
    this.keep = false;

    for (var i = 0, length_2 = this._ops.length; i < length_2; i++) {
      this._ops[i].reset();
    }
  };

  $Or.prototype.next = function (item, key, owner) {
    var done = false;
    var success = false;

    for (var i = 0, length_3 = this._ops.length; i < length_3; i++) {
      var op = this._ops[i];
      op.next(item, key, owner);

      if (op.keep) {
        done = true;
        success = op.keep;
        break;
      }
    }

    this.keep = success;
    this.done = done;
  };

  return $Or;
}(BaseOperation);

var $Nor =
/** @class */
function (_super) {
  __extends($Nor, _super);

  function $Nor() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.propop = false;
    return _this;
  }

  $Nor.prototype.next = function (item, key, owner) {
    _super.prototype.next.call(this, item, key, owner);

    this.keep = !this.keep;
  };

  return $Nor;
}($Or);

var $In =
/** @class */
function (_super) {
  __extends($In, _super);

  function $In() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.propop = true;
    return _this;
  }

  $In.prototype.init = function () {
    var _this = this;

    this._testers = this.params.map(function (value) {
      if (containsOperation(value, _this.options)) {
        throw new Error("cannot nest $ under " + _this.name.toLowerCase());
      }

      return createTester(value, _this.options.compare);
    });
  };

  $In.prototype.next = function (item, key, owner) {
    var done = false;
    var success = false;

    for (var i = 0, length_4 = this._testers.length; i < length_4; i++) {
      var test = this._testers[i];

      if (test(item)) {
        done = true;
        success = true;
        break;
      }
    }

    this.keep = success;
    this.done = done;
  };

  return $In;
}(BaseOperation);

var $Nin =
/** @class */
function (_super) {
  __extends($Nin, _super);

  function $Nin(params, ownerQuery, options, name) {
    var _this = _super.call(this, params, ownerQuery, options, name) || this;

    _this.propop = true;
    _this._in = new $In(params, ownerQuery, options, name);
    return _this;
  }

  $Nin.prototype.next = function (item, key, owner, root) {
    this._in.next(item, key, owner);

    if (isArray(owner) && !root) {
      if (this._in.keep) {
        this.keep = false;
        this.done = true;
      } else if (key == owner.length - 1) {
        this.keep = true;
        this.done = true;
      }
    } else {
      this.keep = !this._in.keep;
      this.done = true;
    }
  };

  $Nin.prototype.reset = function () {
    _super.prototype.reset.call(this);

    this._in.reset();
  };

  return $Nin;
}(BaseOperation);

var $Exists =
/** @class */
function (_super) {
  __extends($Exists, _super);

  function $Exists() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.propop = true;
    return _this;
  }

  $Exists.prototype.next = function (item, key, owner) {
    if (owner.hasOwnProperty(key) === this.params) {
      this.done = true;
      this.keep = true;
    }
  };

  return $Exists;
}(BaseOperation);

var $And =
/** @class */
function (_super) {
  __extends($And, _super);

  function $And(params, owneryQuery, options, name) {
    var _this = _super.call(this, params, owneryQuery, options, params.map(function (query) {
      return createQueryOperation(query, owneryQuery, options);
    }), name) || this;

    _this.propop = false;
    assertGroupNotEmpty(params);
    return _this;
  }

  $And.prototype.next = function (item, key, owner, root) {
    this.childrenNext(item, key, owner, root);
  };

  return $And;
}(NamedGroupOperation);

var $All =
/** @class */
function (_super) {
  __extends($All, _super);

  function $All(params, owneryQuery, options, name) {
    var _this = _super.call(this, params, owneryQuery, options, params.map(function (query) {
      return createQueryOperation(query, owneryQuery, options);
    }), name) || this;

    _this.propop = true;
    return _this;
  }

  $All.prototype.next = function (item, key, owner, root) {
    this.childrenNext(item, key, owner, root);
  };

  return $All;
}(NamedGroupOperation);

var $eq = function $eq(params, owneryQuery, options) {
  return new EqualsOperation(params, owneryQuery, options);
};

var $ne = function $ne(params, owneryQuery, options, name) {
  return new $Ne(params, owneryQuery, options, name);
};

var $or = function $or(params, owneryQuery, options, name) {
  return new $Or(params, owneryQuery, options, name);
};

var $nor = function $nor(params, owneryQuery, options, name) {
  return new $Nor(params, owneryQuery, options, name);
};

var $elemMatch = function $elemMatch(params, owneryQuery, options, name) {
  return new $ElemMatch(params, owneryQuery, options, name);
};

var $nin = function $nin(params, owneryQuery, options, name) {
  return new $Nin(params, owneryQuery, options, name);
};

var $in = function $in(params, owneryQuery, options, name) {
  return new $In(params, owneryQuery, options, name);
};

var $lt = numericalOperation(function (params) {
  return function (b) {
    return b < params;
  };
});
var $lte = numericalOperation(function (params) {
  return function (b) {
    return b <= params;
  };
});
var $gt = numericalOperation(function (params) {
  return function (b) {
    return b > params;
  };
});
var $gte = numericalOperation(function (params) {
  return function (b) {
    return b >= params;
  };
});

var $mod = function $mod(_a, owneryQuery, options) {
  var mod = _a[0],
      equalsValue = _a[1];
  return new EqualsOperation(function (b) {
    return comparable(b) % mod === equalsValue;
  }, owneryQuery, options);
};

var $exists = function $exists(params, owneryQuery, options, name) {
  return new $Exists(params, owneryQuery, options, name);
};

var $regex = function $regex(pattern, owneryQuery, options) {
  return new EqualsOperation(new RegExp(pattern, owneryQuery.$options), owneryQuery, options);
};

var $not = function $not(params, owneryQuery, options, name) {
  return new $Not(params, owneryQuery, options, name);
};

var typeAliases = {
  number: function number(v) {
    return typeof v === "number";
  },
  string: function string(v) {
    return typeof v === "string";
  },
  bool: function bool(v) {
    return typeof v === "boolean";
  },
  array: function array(v) {
    return Array.isArray(v);
  },
  null: function _null(v) {
    return v === null;
  },
  timestamp: function timestamp(v) {
    return v instanceof Date;
  }
};

var $type = function $type(clazz, owneryQuery, options) {
  return new EqualsOperation(function (b) {
    if (typeof clazz === "string") {
      if (!typeAliases[clazz]) {
        throw new Error("Type alias does not exist");
      }

      return typeAliases[clazz](b);
    }

    return b != null ? b instanceof clazz || b.constructor === clazz : false;
  }, owneryQuery, options);
};

var $and = function $and(params, ownerQuery, options, name) {
  return new $And(params, ownerQuery, options, name);
};

var $all = function $all(params, ownerQuery, options, name) {
  return new $All(params, ownerQuery, options, name);
};

var $size = function $size(params, ownerQuery, options) {
  return new $Size(params, ownerQuery, options, "$size");
};

var $options = function $options() {
  return null;
};

var $where = function $where(params, ownerQuery, options) {
  var test;

  if (isFunction(params)) {
    test = params;
  } else if (!process.env.CSP_ENABLED) {
    test = new Function("obj", "return " + params);
  } else {
    throw new Error("In CSP mode, sift does not support strings in \"$where\" condition");
  }

  return new EqualsOperation(function (b) {
    return test.bind(b)(b);
  }, ownerQuery, options);
};

var defaultOperations = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $Size: $Size,
  $eq: $eq,
  $ne: $ne,
  $or: $or,
  $nor: $nor,
  $elemMatch: $elemMatch,
  $nin: $nin,
  $in: $in,
  $lt: $lt,
  $lte: $lte,
  $gt: $gt,
  $gte: $gte,
  $mod: $mod,
  $exists: $exists,
  $regex: $regex,
  $not: $not,
  $type: $type,
  $and: $and,
  $all: $all,
  $size: $size,
  $options: $options,
  $where: $where
});

var createDefaultQueryOperation = function createDefaultQueryOperation(query, ownerQuery, _a) {
  var _b = _a === void 0 ? {} : _a,
      compare = _b.compare,
      operations = _b.operations;

  return createQueryOperation(query, ownerQuery, {
    compare: compare,
    operations: Object.assign({}, defaultOperations, operations || {})
  });
};

var createDefaultQueryTester = function createDefaultQueryTester(query, options) {
  if (options === void 0) {
    options = {};
  }

  var op = createDefaultQueryOperation(query, null, options);
  return createOperationTester(op);
};

/* harmony default export */ __webpack_exports__["default"] = (createDefaultQueryTester);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./lib/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=feathers-localstorage.js.map