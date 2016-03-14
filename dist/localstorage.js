(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.feathers || (g.feathers = {})).localstorage = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/babel-polyfill/lib/index.js":[function(require,module,exports){
(function (global){
/* eslint max-len: 0 */

"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

require("core-js/shim");

require("babel-regenerator-runtime");

// Should be removed in the next major release:

require("core-js/fn/regexp/escape");

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

function define(O, key, value) {
  O[key] || _Object$defineProperty(O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"babel-regenerator-runtime":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/babel-regenerator-runtime/runtime.js","babel-runtime/core-js/object/define-property":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/babel-runtime/core-js/object/define-property.js","core-js/fn/regexp/escape":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/fn/regexp/escape.js","core-js/shim":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/shim.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/babel-regenerator-runtime/runtime.js":[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol =
    typeof Symbol === "function" && Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = Object.create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function(arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    // This invoke function is written in a style that assumes some
    // calling function (or Promise) will handle exceptions.
    function invoke(method, arg) {
      var result = generator[method](arg);
      var value = result.value;
      return value instanceof AwaitArgument
        ? Promise.resolve(value.arg).then(invokeNext, invokeThrow)
        : Promise.resolve(value).then(function(unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration. If the Promise is rejected, however, the
            // result for this iteration will be rejected with the same
            // reason. Note that rejections of yielded Promises are not
            // thrown back into the generator function, as is the case
            // when an awaited Promise is rejected. This difference in
            // behavior between yield and await is important, because it
            // allows the consumer to decide what to do with the yielded
            // rejection (swallow it and continue, manually .throw it back
            // into the generator, abandon iteration, whatever). With
            // await, by contrast, there is no opportunity to examine the
            // rejection reason outside the generator function, so the
            // only option is to throw it from the await expression, and
            // let the generator function handle the exception.
            result.value = unwrapped;
            return result;
          });
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var invokeNext = invoke.bind(generator, "next");
    var invokeThrow = invoke.bind(generator, "throw");
    var invokeReturn = invoke.bind(generator, "return");
    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return invoke(method, arg);
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : new Promise(function (resolve) {
          resolve(callInvokeWithMethodAndArg());
        });
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" ||
              (method === "throw" && delegate.iterator[method] === undefined)) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(
            delegate.iterator[method],
            delegate.iterator,
            arg
          );

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          context._sent = arg;

          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }

        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/process/browser.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/babel-runtime/core-js/object/define-property.js":[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/babel-runtime/node_modules/core-js/library/fn/object/define-property.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/babel-runtime/node_modules/core-js/library/fn/object/define-property.js":[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/babel-runtime/node_modules/core-js/library/modules/$.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/babel-runtime/node_modules/core-js/library/modules/$.js":[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/fn/regexp/escape.js":[function(require,module,exports){
require('../../modules/core.regexp.escape');
module.exports = require('../../modules/_core').RegExp.escape;
},{"../../modules/_core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_core.js","../../modules/core.regexp.escape":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/core.regexp.escape.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_a-function.js":[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_a-number-value.js":[function(require,module,exports){
var cof = require('./_cof');
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};
},{"./_cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_cof.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_add-to-unscopables.js":[function(require,module,exports){
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};
},{"./_hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_hide.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-instance.js":[function(require,module,exports){
module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js":[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-copy-within.js":[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object')
  , toIndex  = require('./_to-index')
  , toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};
},{"./_to-index":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-index.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js","./_to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-fill.js":[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object')
  , toIndex  = require('./_to-index')
  , toLength = require('./_to-length');
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};
},{"./_to-index":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-index.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js","./_to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-from-iterable.js":[function(require,module,exports){
var forOf = require('./_for-of');

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_for-of.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-includes.js":[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-index.js","./_to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-iobject.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-methods.js":[function(require,module,exports){
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = require('./_ctx')
  , IObject  = require('./_iobject')
  , toObject = require('./_to-object')
  , toLength = require('./_to-length')
  , asc      = require('./_array-species-create');
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
},{"./_array-species-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-species-create.js","./_ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_ctx.js","./_iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iobject.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js","./_to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-reduce.js":[function(require,module,exports){
var aFunction = require('./_a-function')
  , toObject  = require('./_to-object')
  , IObject   = require('./_iobject')
  , toLength  = require('./_to-length');

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};
},{"./_a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_a-function.js","./_iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iobject.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js","./_to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-species-create.js":[function(require,module,exports){
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var isObject = require('./_is-object')
  , isArray  = require('./_is-array')
  , SPECIES  = require('./_wks')('species');
module.exports = function(original, length){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return new (C === undefined ? Array : C)(length);
};
},{"./_is-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-array.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_bind.js":[function(require,module,exports){
'use strict';
var aFunction  = require('./_a-function')
  , isObject   = require('./_is-object')
  , invoke     = require('./_invoke')
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};
},{"./_a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_a-function.js","./_invoke":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_invoke.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_classof.js":[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_cof.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_cof.js":[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_collection-strong.js":[function(require,module,exports){
'use strict';
var dP          = require('./_object-dp').f
  , create      = require('./_object-create')
  , hide        = require('./_hide')
  , redefineAll = require('./_redefine-all')
  , ctx         = require('./_ctx')
  , anInstance  = require('./_an-instance')
  , defined     = require('./_defined')
  , forOf       = require('./_for-of')
  , $iterDefine = require('./_iter-define')
  , step        = require('./_iter-step')
  , setSpecies  = require('./_set-species')
  , DESCRIPTORS = require('./_descriptors')
  , fastKey     = require('./_meta').fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./_an-instance":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-instance.js","./_ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_ctx.js","./_defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_defined.js","./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_for-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_for-of.js","./_hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_hide.js","./_iter-define":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-define.js","./_iter-step":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-step.js","./_meta":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_meta.js","./_object-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-create.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_redefine-all":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine-all.js","./_set-species":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-species.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_collection-to-json.js":[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof')
  , from    = require('./_array-from-iterable');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};
},{"./_array-from-iterable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-from-iterable.js","./_classof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_classof.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_collection-weak.js":[function(require,module,exports){
'use strict';
var redefineAll       = require('./_redefine-all')
  , getWeak           = require('./_meta').getWeak
  , anObject          = require('./_an-object')
  , isObject          = require('./_is-object')
  , anInstance        = require('./_an-instance')
  , forOf             = require('./_for-of')
  , createArrayMethod = require('./_array-methods')
  , $has              = require('./_has')
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};
},{"./_an-instance":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-instance.js","./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_array-methods":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-methods.js","./_for-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_for-of.js","./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_meta":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_meta.js","./_redefine-all":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine-all.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_collection.js":[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , $export           = require('./_export')
  , redefine          = require('./_redefine')
  , redefineAll       = require('./_redefine-all')
  , meta              = require('./_meta')
  , forOf             = require('./_for-of')
  , anInstance        = require('./_an-instance')
  , isObject          = require('./_is-object')
  , fails             = require('./_fails')
  , $iterDetect       = require('./_iter-detect')
  , setToStringTag    = require('./_set-to-string-tag')
  , inheritIfRequired = require('./_inherit-if-required');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./_an-instance":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-instance.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_for-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_for-of.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_inherit-if-required":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_inherit-if-required.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_iter-detect":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-detect.js","./_meta":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_meta.js","./_redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine.js","./_redefine-all":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine-all.js","./_set-to-string-tag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-to-string-tag.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_core.js":[function(require,module,exports){
var core = module.exports = {version: '2.1.3'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_ctx.js":[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_a-function.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_defined.js":[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js":[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_dom-create.js":[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_enum-bug-keys.js":[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_enum-keys.js":[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gops.js","./_object-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-keys.js","./_object-pie":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-pie.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js":[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , hide      = require('./_hide')
  , redefine  = require('./_redefine')
  , ctx       = require('./_ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_core.js","./_ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_ctx.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_hide.js","./_redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails-is-regexp.js":[function(require,module,exports){
var MATCH = require('./_wks')('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};
},{"./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js":[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fix-re-wks.js":[function(require,module,exports){
'use strict';
var hide     = require('./_hide')
  , redefine = require('./_redefine')
  , fails    = require('./_fails')
  , defined  = require('./_defined')
  , wks      = require('./_wks');

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};
},{"./_defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_defined.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_hide.js","./_redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_flags.js":[function(require,module,exports){
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_for-of.js":[function(require,module,exports){
var ctx         = require('./_ctx')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , anObject    = require('./_an-object')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_ctx.js","./_is-array-iter":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-array-iter.js","./_iter-call":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-call.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js","./core.get-iterator-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/core.get-iterator-method.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js":[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js":[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_hide.js":[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_property-desc.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_html.js":[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_ie8-dom-define.js":[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_dom-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_dom-create.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_inherit-if-required.js":[function(require,module,exports){
var isObject       = require('./_is-object')
  , setPrototypeOf = require('./_set-proto').set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};
},{"./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_set-proto":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-proto.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_invoke.js":[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iobject.js":[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_cof.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-array-iter.js":[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iterators.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-array.js":[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_cof.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-integer.js":[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object')
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
},{"./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js":[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-regexp.js":[function(require,module,exports){
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object')
  , cof      = require('./_cof')
  , MATCH    = require('./_wks')('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
},{"./_cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_cof.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-call.js":[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-create.js":[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_hide.js","./_object-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-create.js","./_property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_property-desc.js","./_set-to-string-tag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-to-string-tag.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-define.js":[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_hide.js","./_iter-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-create.js","./_iterators":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iterators.js","./_library":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_library.js","./_object-gpo":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gpo.js","./_redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine.js","./_set-to-string-tag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-to-string-tag.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-detect.js":[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ safe = true; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-step.js":[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iterators.js":[function(require,module,exports){
module.exports = {};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_keyof.js":[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-keys.js","./_to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_library.js":[function(require,module,exports){
module.exports = false;
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_math-expm1.js":[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
module.exports = Math.expm1 || function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_math-log1p.js":[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_math-sign.js":[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_meta.js":[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_uid":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_uid.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_metadata.js":[function(require,module,exports){
var Map     = require('./es6.map')
  , $export = require('./_export')
  , shared  = require('./_shared')('metadata')
  , store   = shared.store || (shared.store = new (require('./es6.weak-map')));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_shared":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_shared.js","./es6.map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.map.js","./es6.weak-map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.weak-map.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_microtask.js":[function(require,module,exports){
var global    = require('./_global')
  , macrotask = require('./_task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./_cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, domain, fn;
  if(isNode && (parent = process.domain)){
    process.domain = null;
    parent.exit();
  }
  while(head){
    domain = head.domain;
    fn     = head.fn;
    if(domain)domain.enter();
    fn(); // <- currently we use it only for Promise - try / catch not required
    if(domain)domain.exit();
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
};

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = 1
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = -toggle;
  };
// environments with maybe non-completely correct, but existent Promise
} else if(Promise && Promise.resolve){
  notify = function(){
    Promise.resolve().then(flush);
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function(fn){
  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./_cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_cof.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_task":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_task.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-assign.js":[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./_fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iobject.js","./_object-gops":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gops.js","./_object-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-keys.js","./_object-pie":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-pie.js","./_to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-create.js":[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write('<script>document.F=Object</script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_dom-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_dom-create.js","./_enum-bug-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_enum-bug-keys.js","./_html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_html.js","./_object-dps":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dps.js","./_shared-key":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_shared-key.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js":[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_ie8-dom-define":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_ie8-dom-define.js","./_to-primitive":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-primitive.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dps.js":[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_object-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-keys.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopd.js":[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_ie8-dom-define":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_ie8-dom-define.js","./_object-pie":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-pie.js","./_property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_property-desc.js","./_to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-primitive.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopn-ext.js":[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN.f(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};
},{"./_object-gopn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopn.js","./_to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopn.js":[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_enum-bug-keys.js","./_object-keys-internal":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-keys-internal.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gops.js":[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gpo.js":[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_shared-key":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_shared-key.js","./_to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-keys-internal.js":[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-includes.js","./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_shared-key":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_shared-key.js","./_to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-keys.js":[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_enum-bug-keys.js","./_object-keys-internal":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-keys-internal.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-pie.js":[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-sap.js":[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_core.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-to-array.js":[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject')
  , isEnum    = require('./_object-pie').f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"./_object-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-keys.js","./_object-pie":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-pie.js","./_to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_own-keys.js":[function(require,module,exports){
// all object keys, includes non-enumerable and symbols
var gOPN     = require('./_object-gopn')
  , gOPS     = require('./_object-gops')
  , anObject = require('./_an-object')
  , Reflect  = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_object-gopn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopn.js","./_object-gops":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gops.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_parse-float.js":[function(require,module,exports){
var $parseFloat = require('./_global').parseFloat
  , $trim       = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;
},{"./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_string-trim":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-trim.js","./_string-ws":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-ws.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_parse-int.js":[function(require,module,exports){
var $parseInt = require('./_global').parseInt
  , $trim     = require('./_string-trim').trim
  , ws        = require('./_string-ws')
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;
},{"./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_string-trim":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-trim.js","./_string-ws":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-ws.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_partial.js":[function(require,module,exports){
'use strict';
var path      = require('./_path')
  , invoke    = require('./_invoke')
  , aFunction = require('./_a-function');
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};
},{"./_a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_a-function.js","./_invoke":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_invoke.js","./_path":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_path.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_path.js":[function(require,module,exports){
module.exports = require('./_global');
},{"./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_property-desc.js":[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine-all.js":[function(require,module,exports){
var redefine = require('./_redefine');
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};
},{"./_redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine.js":[function(require,module,exports){
var global    = require('./_global')
  , hide      = require('./_hide')
  , has       = require('./_has')
  , SRC       = require('./_uid')('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
},{"./_core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_core.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_hide.js","./_uid":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_uid.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_replacer.js":[function(require,module,exports){
module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_same-value.js":[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-proto.js":[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_ctx.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_object-gopd":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopd.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-species.js":[function(require,module,exports){
'use strict';
var global      = require('./_global')
  , dP          = require('./_object-dp')
  , DESCRIPTORS = require('./_descriptors')
  , SPECIES     = require('./_wks')('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-to-string-tag.js":[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_shared-key.js":[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_shared.js","./_uid":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_uid.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_shared.js":[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_species-constructor.js":[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./_an-object')
  , aFunction = require('./_a-function')
  , SPECIES   = require('./_wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./_a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_a-function.js","./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_strict-method.js":[function(require,module,exports){
var fails = require('./_fails');

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};
},{"./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-at.js":[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_defined.js","./_to-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-integer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-context.js":[function(require,module,exports){
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp')
  , defined  = require('./_defined');

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
},{"./_defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_defined.js","./_is-regexp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-regexp.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-html.js":[function(require,module,exports){
var $export = require('./_export')
  , fails   = require('./_fails')
  , defined = require('./_defined')
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};
},{"./_defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_defined.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-pad.js":[function(require,module,exports){
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length')
  , repeat   = require('./_string-repeat')
  , defined  = require('./_defined');

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength)return S;
  if(fillStr == '')fillStr = ' ';
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_defined.js","./_string-repeat":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-repeat.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-repeat.js":[function(require,module,exports){
'use strict';
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};
},{"./_defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_defined.js","./_to-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-integer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-trim.js":[function(require,module,exports){
var $export = require('./_export')
  , defined = require('./_defined')
  , fails   = require('./_fails')
  , spaces  = require('./_string-ws')
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
},{"./_defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_defined.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_string-ws":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-ws.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-ws.js":[function(require,module,exports){
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_task.js":[function(require,module,exports){
var ctx                = require('./_ctx')
  , invoke             = require('./_invoke')
  , html               = require('./_html')
  , cel                = require('./_dom-create')
  , global             = require('./_global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./_cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./_cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_cof.js","./_ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_ctx.js","./_dom-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_dom-create.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_html.js","./_invoke":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_invoke.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-index.js":[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-integer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-integer.js":[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-iobject.js":[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_defined.js","./_iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js":[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-integer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-object.js":[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_defined.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-primitive.js":[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed-array.js":[function(require,module,exports){
'use strict';
if(require('./_descriptors')){
  var LIBRARY             = require('./_library')
    , global              = require('./_global')
    , fails               = require('./_fails')
    , $export             = require('./_export')
    , $typed              = require('./_typed')
    , $buffer             = require('./_typed-buffer')
    , ctx                 = require('./_ctx')
    , anInstance          = require('./_an-instance')
    , propertyDesc        = require('./_property-desc')
    , hide                = require('./_hide')
    , redefineAll         = require('./_redefine-all')
    , isInteger           = require('./_is-integer')
    , toInteger           = require('./_to-integer')
    , toLength            = require('./_to-length')
    , toIndex             = require('./_to-index')
    , toPrimitive         = require('./_to-primitive')
    , has                 = require('./_has')
    , same                = require('./_same-value')
    , classof             = require('./_classof')
    , isObject            = require('./_is-object')
    , toObject            = require('./_to-object')
    , isArrayIter         = require('./_is-array-iter')
    , create              = require('./_object-create')
    , getPrototypeOf      = require('./_object-gpo')
    , gOPN                = require('./_object-gopn').f
    , isIterable          = require('./core.is-iterable')
    , getIterFn           = require('./core.get-iterator-method')
    , uid                 = require('./_uid')
    , wks                 = require('./_wks')
    , createArrayMethod   = require('./_array-methods')
    , createArrayIncludes = require('./_array-includes')
    , speciesConstructor  = require('./_species-constructor')
    , ArrayIterators      = require('./es6.array.iterator')
    , Iterators           = require('./_iterators')
    , $iterDetect         = require('./_iter-detect')
    , setSpecies          = require('./_set-species')
    , arrayFill           = require('./_array-fill')
    , arrayCopyWithin     = require('./_array-copy-within')
    , $DP                 = require('./_object-dp')
    , $GOPD               = require('./_object-gopd')
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    slice: function slice(start, end){
      return speciesFromList(this, arraySlice.call(validate(this), start, end));
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);

    setSpecies(NAME);
  };
} else module.exports = function(){ /* empty */ };
},{"./_an-instance":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-instance.js","./_array-copy-within":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-copy-within.js","./_array-fill":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-fill.js","./_array-includes":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-includes.js","./_array-methods":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-methods.js","./_classof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_classof.js","./_ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_ctx.js","./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_hide.js","./_is-array-iter":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-array-iter.js","./_is-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-integer.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_iter-detect":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-detect.js","./_iterators":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iterators.js","./_library":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_library.js","./_object-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-create.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_object-gopd":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopd.js","./_object-gopn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopn.js","./_object-gpo":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gpo.js","./_property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_property-desc.js","./_redefine-all":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine-all.js","./_same-value":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_same-value.js","./_set-species":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-species.js","./_species-constructor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_species-constructor.js","./_to-index":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-index.js","./_to-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-integer.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js","./_to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-object.js","./_to-primitive":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-primitive.js","./_typed":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed.js","./_typed-buffer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed-buffer.js","./_uid":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_uid.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js","./core.get-iterator-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/core.get-iterator-method.js","./core.is-iterable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/core.is-iterable.js","./es6.array.iterator":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.iterator.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed-buffer.js":[function(require,module,exports){
'use strict';
var global         = require('./_global')
  , DESCRIPTORS    = require('./_descriptors')
  , LIBRARY        = require('./_library')
  , $typed         = require('./_typed')
  , hide           = require('./_hide')
  , redefineAll    = require('./_redefine-all')
  , fails          = require('./_fails')
  , anInstance     = require('./_an-instance')
  , toInteger      = require('./_to-integer')
  , toLength       = require('./_to-length')
  , gOPN           = require('./_object-gopn').f
  , dP             = require('./_object-dp').f
  , arrayFill      = require('./_array-fill')
  , setToStringTag = require('./_set-to-string-tag')
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , parseInt       = global.parseInt
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , min            = Math.min
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;
},{"./_an-instance":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-instance.js","./_array-fill":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-fill.js","./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_hide.js","./_library":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_library.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_object-gopn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopn.js","./_redefine-all":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine-all.js","./_set-to-string-tag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-to-string-tag.js","./_to-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-integer.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js","./_typed":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed.js":[function(require,module,exports){
var global = require('./_global')
  , hide   = require('./_hide')
  , uid    = require('./_uid')
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};
},{"./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_hide.js","./_uid":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_uid.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_uid.js":[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js":[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';
module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};
},{"./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_shared":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_shared.js","./_uid":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_uid.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/core.get-iterator-method.js":[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_classof.js","./_core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_core.js","./_iterators":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iterators.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/core.is-iterable.js":[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};
},{"./_classof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_classof.js","./_core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_core.js","./_iterators":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iterators.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/core.regexp.escape.js":[function(require,module,exports){
// https://github.com/benjamingr/RexExp.escape
var $export = require('./_export')
  , $re     = require('./_replacer')(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});

},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_replacer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_replacer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.copy-within.js":[function(require,module,exports){
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', {copyWithin: require('./_array-copy-within')});

require('./_add-to-unscopables')('copyWithin');
},{"./_add-to-unscopables":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_add-to-unscopables.js","./_array-copy-within":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-copy-within.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.every.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $every  = require('./_array-methods')(4);

$export($export.P + $export.F * !require('./_strict-method')([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-methods.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_strict-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_strict-method.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.fill.js":[function(require,module,exports){
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', {fill: require('./_array-fill')});

require('./_add-to-unscopables')('fill');
},{"./_add-to-unscopables":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_add-to-unscopables.js","./_array-fill":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-fill.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.filter.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $filter = require('./_array-methods')(2);

$export($export.P + $export.F * !require('./_strict-method')([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-methods.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_strict-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_strict-method.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.find-index.js":[function(require,module,exports){
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export')
  , $find   = require('./_array-methods')(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);
},{"./_add-to-unscopables":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_add-to-unscopables.js","./_array-methods":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-methods.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.find.js":[function(require,module,exports){
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export')
  , $find   = require('./_array-methods')(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);
},{"./_add-to-unscopables":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_add-to-unscopables.js","./_array-methods":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-methods.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.for-each.js":[function(require,module,exports){
'use strict';
var $export  = require('./_export')
  , $forEach = require('./_array-methods')(0)
  , STRICT   = require('./_strict-method')([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-methods.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_strict-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_strict-method.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.from.js":[function(require,module,exports){
'use strict';
var ctx         = require('./_ctx')
  , $export     = require('./_export')
  , toObject    = require('./_to-object')
  , call        = require('./_iter-call')
  , isArrayIter = require('./_is-array-iter')
  , toLength    = require('./_to-length')
  , getIterFn   = require('./core.get-iterator-method');
$export($export.S + $export.F * !require('./_iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_ctx.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_is-array-iter":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-array-iter.js","./_iter-call":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-call.js","./_iter-detect":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-detect.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js","./_to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-object.js","./core.get-iterator-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/core.get-iterator-method.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.index-of.js":[function(require,module,exports){
'use strict';
var $export  = require('./_export')
  , $indexOf = require('./_array-includes')(false);

$export($export.P + $export.F * !require('./_strict-method')([].indexOf), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return $indexOf(this, searchElement, arguments[1]);
  }
});
},{"./_array-includes":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-includes.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_strict-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_strict-method.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.is-array.js":[function(require,module,exports){
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', {isArray: require('./_is-array')});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_is-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-array.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.iterator.js":[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_add-to-unscopables.js","./_iter-define":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-define.js","./_iter-step":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-step.js","./_iterators":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iterators.js","./_to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.join.js":[function(require,module,exports){
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (require('./_iobject') != Object || !require('./_strict-method')(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iobject.js","./_strict-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_strict-method.js","./_to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.last-index-of.js":[function(require,module,exports){
'use strict';
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , toInteger = require('./_to-integer')
  , toLength  = require('./_to-length');

$export($export.P + $export.F * !require('./_strict-method')([].lastIndexOf), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index;
    return -1;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_strict-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_strict-method.js","./_to-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-integer.js","./_to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-iobject.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.map.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $map    = require('./_array-methods')(1);

$export($export.P + $export.F * !require('./_strict-method')([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-methods.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_strict-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_strict-method.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.of.js":[function(require,module,exports){
'use strict';
var $export = require('./_export');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)result[index] = arguments[index++];
    result.length = aLen;
    return result;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.reduce-right.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});
},{"./_array-reduce":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-reduce.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_strict-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_strict-method.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.reduce.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $reduce = require('./_array-reduce');

$export($export.P + $export.F * !require('./_strict-method')([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});
},{"./_array-reduce":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-reduce.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_strict-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_strict-method.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.slice.js":[function(require,module,exports){
'use strict';
var $export    = require('./_export')
  , html       = require('./_html')
  , cof        = require('./_cof')
  , toIndex    = require('./_to-index')
  , toLength   = require('./_to-length')
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * require('./_fails')(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});
},{"./_cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_cof.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_html.js","./_to-index":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-index.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.some.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $some   = require('./_array-methods')(3);

$export($export.P + $export.F * !require('./_strict-method')([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});
},{"./_array-methods":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-methods.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_strict-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_strict-method.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.sort.js":[function(require,module,exports){
'use strict';
var $export   = require('./_export')
  , aFunction = require('./_a-function')
  , toObject  = require('./_to-object')
  , fails     = require('./_fails')
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});
},{"./_a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_a-function.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_strict-method":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_strict-method.js","./_to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.species.js":[function(require,module,exports){
require('./_set-species')('Array');
},{"./_set-species":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-species.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.date.now.js":[function(require,module,exports){
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = require('./_export');

$export($export.S, 'Date', {now: function(){ return +new Date; }});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.date.to-iso-string.js":[function(require,module,exports){
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = require('./_export')
  , fails   = require('./_fails');

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(this))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.date.to-json.js":[function(require,module,exports){
'use strict';
var $export     = require('./_export')
  , toObject    = require('./_to-object')
  , toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-object.js","./_to-primitive":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-primitive.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.date.to-string.js":[function(require,module,exports){
var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING];
if(new Date(NaN) + '' != INVALID_DATE){
  require('./_redefine')(DateProto, TO_STRING, function toString(){
    var value = +this;
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}
},{"./_redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.function.bind.js":[function(require,module,exports){
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = require('./_export');

$export($export.P, 'Function', {bind: require('./_bind')});
},{"./_bind":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_bind.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.function.has-instance.js":[function(require,module,exports){
'use strict';
var isObject       = require('./_is-object')
  , getPrototypeOf = require('./_object-gpo')
  , HAS_INSTANCE   = require('./_wks')('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))require('./_object-dp').f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});
},{"./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_object-gpo":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gpo.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.function.name.js":[function(require,module,exports){
var dP         = require('./_object-dp').f
  , createDesc = require('./_property-desc')
  , has        = require('./_has')
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';
// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    var match = ('' + this).match(nameRE)
      , name  = match ? match[1] : '';
    has(this, NAME) || dP(this, NAME, createDesc(5, name));
    return name;
  }
});
},{"./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_property-desc.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.map.js":[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.1 Map Objects
module.exports = require('./_collection')('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./_collection":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_collection.js","./_collection-strong":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_collection-strong.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.acosh.js":[function(require,module,exports){
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export')
  , log1p   = require('./_math-log1p')
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

// V8 bug https://code.google.com/p/v8/issues/detail?id=3509
$export($export.S + $export.F * !($acosh && Math.floor($acosh(Number.MAX_VALUE)) == 710), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_math-log1p":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_math-log1p.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.asinh.js":[function(require,module,exports){
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export');

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

$export($export.S, 'Math', {asinh: asinh});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.atanh.js":[function(require,module,exports){
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.cbrt.js":[function(require,module,exports){
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export')
  , sign    = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_math-sign":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_math-sign.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.clz32.js":[function(require,module,exports){
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.cosh.js":[function(require,module,exports){
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.expm1.js":[function(require,module,exports){
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export');

$export($export.S, 'Math', {expm1: require('./_math-expm1')});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_math-expm1":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_math-expm1.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.fround.js":[function(require,module,exports){
// 20.2.2.16 Math.fround(x)
var $export   = require('./_export')
  , sign      = require('./_math-sign')
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_math-sign":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_math-sign.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.hypot.js":[function(require,module,exports){
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export')
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.imul.js":[function(require,module,exports){
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export')
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.log10.js":[function(require,module,exports){
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.log1p.js":[function(require,module,exports){
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', {log1p: require('./_math-log1p')});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_math-log1p":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_math-log1p.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.log2.js":[function(require,module,exports){
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.sign.js":[function(require,module,exports){
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', {sign: require('./_math-sign')});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_math-sign":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_math-sign.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.sinh.js":[function(require,module,exports){
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export')
  , expm1   = require('./_math-expm1')
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_math-expm1":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_math-expm1.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.tanh.js":[function(require,module,exports){
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export')
  , expm1   = require('./_math-expm1')
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_math-expm1":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_math-expm1.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.trunc.js":[function(require,module,exports){
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.constructor.js":[function(require,module,exports){
'use strict';
var global            = require('./_global')
  , has               = require('./_has')
  , cof               = require('./_cof')
  , inheritIfRequired = require('./_inherit-if-required')
  , toPrimitive       = require('./_to-primitive')
  , fails             = require('./_fails')
  , gOPN              = require('./_object-gopn').f
  , gOPD              = require('./_object-gopd').f
  , dP                = require('./_object-dp').f
  , $trim             = require('./_string-trim').trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(require('./_object-create')(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}
},{"./_cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_cof.js","./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_inherit-if-required":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_inherit-if-required.js","./_object-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-create.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_object-gopd":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopd.js","./_object-gopn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopn.js","./_redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine.js","./_string-trim":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-trim.js","./_to-primitive":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-primitive.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.epsilon.js":[function(require,module,exports){
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-finite.js":[function(require,module,exports){
// 20.1.2.2 Number.isFinite(number)
var $export   = require('./_export')
  , _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-integer.js":[function(require,module,exports){
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', {isInteger: require('./_is-integer')});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_is-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-integer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-nan.js":[function(require,module,exports){
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-safe-integer.js":[function(require,module,exports){
// 20.1.2.5 Number.isSafeInteger(number)
var $export   = require('./_export')
  , isInteger = require('./_is-integer')
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_is-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-integer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.max-safe-integer.js":[function(require,module,exports){
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.min-safe-integer.js":[function(require,module,exports){
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.parse-float.js":[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_parse-float":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_parse-float.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.parse-int.js":[function(require,module,exports){
var $export   = require('./_export')
  , $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_parse-int":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_parse-int.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.to-fixed.js":[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , anInstance   = require('./_an-instance')
  , toInteger    = require('./_to-integer')
  , aNumberValue = require('./_a-number-value')
  , repeat       = require('./_string-repeat')
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !require('./_fails')(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});
},{"./_a-number-value":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_a-number-value.js","./_an-instance":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-instance.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_string-repeat":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-repeat.js","./_to-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-integer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.to-precision.js":[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , $fails       = require('./_fails')
  , aNumberValue = require('./_a-number-value')
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});
},{"./_a-number-value":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_a-number-value.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.assign.js":[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_object-assign":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-assign.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.create.js":[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_object-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-create.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.define-properties.js":[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperties: require('./_object-dps')});
},{"./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_object-dps":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dps.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.define-property.js":[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.freeze.js":[function(require,module,exports){
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});
},{"./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_meta":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_meta.js","./_object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-sap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = require('./_to-iobject')
  , $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./_object-gopd":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopd.js","./_object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-sap.js","./_to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.get-own-property-names.js":[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function(){
  return require('./_object-gopn-ext').f;
});
},{"./_object-gopn-ext":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopn-ext.js","./_object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-sap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.get-prototype-of.js":[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gpo.js","./_object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-sap.js","./_to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is-extensible.js":[function(require,module,exports){
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
},{"./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-sap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is-frozen.js":[function(require,module,exports){
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
},{"./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-sap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is-sealed.js":[function(require,module,exports){
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
},{"./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-sap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is.js":[function(require,module,exports){
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', {is: require('./_same-value')});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_same-value":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_same-value.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.keys.js":[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-keys.js","./_object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-sap.js","./_to-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-object.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.prevent-extensions.js":[function(require,module,exports){
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});
},{"./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_meta":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_meta.js","./_object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-sap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.seal.js":[function(require,module,exports){
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object')
  , meta     = require('./_meta').onFreeze;

require('./_object-sap')('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});
},{"./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_meta":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_meta.js","./_object-sap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-sap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.set-prototype-of.js":[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_set-proto":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-proto.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.to-string.js":[function(require,module,exports){
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof')
  , test    = {};
test[require('./_wks')('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  require('./_redefine')(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}
},{"./_classof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_classof.js","./_redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.parse-float.js":[function(require,module,exports){
var $export     = require('./_export')
  , $parseFloat = require('./_parse-float');
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_parse-float":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_parse-float.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.parse-int.js":[function(require,module,exports){
var $export   = require('./_export')
  , $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_parse-int":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_parse-int.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.promise.js":[function(require,module,exports){
'use strict';
var LIBRARY            = require('./_library')
  , global             = require('./_global')
  , ctx                = require('./_ctx')
  , classof            = require('./_classof')
  , $export            = require('./_export')
  , isObject           = require('./_is-object')
  , anObject           = require('./_an-object')
  , aFunction          = require('./_a-function')
  , anInstance         = require('./_an-instance')
  , forOf              = require('./_for-of')
  , setProto           = require('./_set-proto').set
  , speciesConstructor = require('./_species-constructor')
  , task               = require('./_task').set
  , microtask          = require('./_microtask')
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          result = handler === true ? value : handler(value);
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./_a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_a-function.js","./_an-instance":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-instance.js","./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_classof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_classof.js","./_core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_core.js","./_ctx":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_ctx.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_for-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_for-of.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_iter-detect":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-detect.js","./_library":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_library.js","./_microtask":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_microtask.js","./_redefine-all":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine-all.js","./_set-proto":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-proto.js","./_set-species":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-species.js","./_set-to-string-tag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-to-string-tag.js","./_species-constructor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_species-constructor.js","./_task":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_task.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.apply.js":[function(require,module,exports){
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export')
  , _apply  = Function.apply;

$export($export.S, 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    return _apply.call(target, thisArgument, argumentsList);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.construct.js":[function(require,module,exports){
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export   = require('./_export')
  , create    = require('./_object-create')
  , aFunction = require('./_a-function')
  , anObject  = require('./_an-object')
  , isObject  = require('./_is-object')
  , bind      = require('./_bind');

// MS Edge supports only 2 arguments
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
$export($export.S + $export.F * require('./_fails')(function(){
  function F(){}
  return !(Reflect.construct(function(){}, [], F) instanceof F);
}), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      if(args != undefined)switch(anObject(args).length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
},{"./_a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_a-function.js","./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_bind":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_bind.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_object-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-create.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.define-property.js":[function(require,module,exports){
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = require('./_object-dp')
  , $export     = require('./_export')
  , anObject    = require('./_an-object')
  , toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_to-primitive":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-primitive.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.delete-property.js":[function(require,module,exports){
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = require('./_export')
  , gOPD     = require('./_object-gopd').f
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_object-gopd":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopd.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.enumerate.js":[function(require,module,exports){
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export  = require('./_export')
  , anObject = require('./_an-object');
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
require('./_iter-create')(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_iter-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-create.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js":[function(require,module,exports){
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = require('./_object-gopd')
  , $export  = require('./_export')
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_object-gopd":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopd.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.get-prototype-of.js":[function(require,module,exports){
// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = require('./_export')
  , getProto = require('./_object-gpo')
  , anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_object-gpo":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gpo.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.get.js":[function(require,module,exports){
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = require('./_object-gopd')
  , getPrototypeOf = require('./_object-gpo')
  , has            = require('./_has')
  , $export        = require('./_export')
  , isObject       = require('./_is-object')
  , anObject       = require('./_an-object');

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_object-gopd":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gpo.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.has.js":[function(require,module,exports){
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.is-extensible.js":[function(require,module,exports){
// 26.1.10 Reflect.isExtensible(target)
var $export       = require('./_export')
  , anObject      = require('./_an-object')
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.own-keys.js":[function(require,module,exports){
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', {ownKeys: require('./_own-keys')});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_own-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_own-keys.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.prevent-extensions.js":[function(require,module,exports){
// 26.1.12 Reflect.preventExtensions(target)
var $export            = require('./_export')
  , anObject           = require('./_an-object')
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.set-prototype-of.js":[function(require,module,exports){
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = require('./_export')
  , setProto = require('./_set-proto');

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_set-proto":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-proto.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.set.js":[function(require,module,exports){
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = require('./_object-dp')
  , gOPD           = require('./_object-gopd')
  , getPrototypeOf = require('./_object-gpo')
  , has            = require('./_has')
  , $export        = require('./_export')
  , createDesc     = require('./_property-desc')
  , anObject       = require('./_an-object')
  , isObject       = require('./_is-object');

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_object-gopd":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gpo.js","./_property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_property-desc.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.constructor.js":[function(require,module,exports){
var global            = require('./_global')
  , inheritIfRequired = require('./_inherit-if-required')
  , dP                = require('./_object-dp').f
  , gOPN              = require('./_object-gopn').f
  , isRegExp          = require('./_is-regexp')
  , $flags            = require('./_flags')
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function(){
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');
},{"./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_flags":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_flags.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_inherit-if-required":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_inherit-if-required.js","./_is-regexp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-regexp.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_object-gopn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopn.js","./_redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine.js","./_set-species":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-species.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.flags.js":[function(require,module,exports){
// 21.2.5.3 get RegExp.prototype.flags()
if(require('./_descriptors') && /./g.flags != 'g')require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});
},{"./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_flags":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_flags.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.match.js":[function(require,module,exports){
// @@match logic
require('./_fix-re-wks')('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});
},{"./_fix-re-wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fix-re-wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.replace.js":[function(require,module,exports){
// @@replace logic
require('./_fix-re-wks')('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});
},{"./_fix-re-wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fix-re-wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.search.js":[function(require,module,exports){
// @@search logic
require('./_fix-re-wks')('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});
},{"./_fix-re-wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fix-re-wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.split.js":[function(require,module,exports){
// @@split logic
require('./_fix-re-wks')('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = require('./_is-regexp')
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});
},{"./_fix-re-wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fix-re-wks.js","./_is-regexp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-regexp.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.to-string.js":[function(require,module,exports){
'use strict';
require('./es6.regexp.flags');
var anObject    = require('./_an-object')
  , $flags      = require('./_flags')
  , DESCRIPTORS = require('./_descriptors')
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(require('./_fails')(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_flags":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_flags.js","./_redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine.js","./es6.regexp.flags":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.flags.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.set.js":[function(require,module,exports){
'use strict';
var strong = require('./_collection-strong');

// 23.2 Set Objects
module.exports = require('./_collection')('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);
},{"./_collection":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_collection.js","./_collection-strong":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_collection-strong.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.anchor.js":[function(require,module,exports){
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});
},{"./_string-html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-html.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.big.js":[function(require,module,exports){
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});
},{"./_string-html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-html.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.blink.js":[function(require,module,exports){
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});
},{"./_string-html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-html.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.bold.js":[function(require,module,exports){
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});
},{"./_string-html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-html.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.code-point-at.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $at     = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_string-at":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-at.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.ends-with.js":[function(require,module,exports){
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export   = require('./_export')
  , toLength  = require('./_to-length')
  , context   = require('./_string-context')
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails-is-regexp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails-is-regexp.js","./_string-context":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-context.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.fixed.js":[function(require,module,exports){
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});
},{"./_string-html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-html.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.fontcolor.js":[function(require,module,exports){
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});
},{"./_string-html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-html.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.fontsize.js":[function(require,module,exports){
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});
},{"./_string-html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-html.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.from-code-point.js":[function(require,module,exports){
var $export        = require('./_export')
  , toIndex        = require('./_to-index')
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_to-index":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-index.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.includes.js":[function(require,module,exports){
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export  = require('./_export')
  , context  = require('./_string-context')
  , INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails-is-regexp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails-is-regexp.js","./_string-context":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-context.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.italics.js":[function(require,module,exports){
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});
},{"./_string-html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-html.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.iterator.js":[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iter-define.js","./_string-at":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-at.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.link.js":[function(require,module,exports){
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});
},{"./_string-html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-html.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.raw.js":[function(require,module,exports){
var $export   = require('./_export')
  , toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-iobject.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.repeat.js":[function(require,module,exports){
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_string-repeat":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-repeat.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.small.js":[function(require,module,exports){
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});
},{"./_string-html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-html.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.starts-with.js":[function(require,module,exports){
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export     = require('./_export')
  , toLength    = require('./_to-length')
  , context     = require('./_string-context')
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails-is-regexp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails-is-regexp.js","./_string-context":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-context.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.strike.js":[function(require,module,exports){
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});
},{"./_string-html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-html.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.sub.js":[function(require,module,exports){
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});
},{"./_string-html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-html.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.sup.js":[function(require,module,exports){
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});
},{"./_string-html":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-html.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.trim.js":[function(require,module,exports){
'use strict';
// 21.1.3.25 String.prototype.trim()
require('./_string-trim')('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});
},{"./_string-trim":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-trim.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.symbol.js":[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , core           = require('./_core')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , ObjectProto    = Object.prototype
  , USE_NATIVE     = typeof $Symbol == 'function';

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol.prototype);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = function(it){
  return typeof it == 'symbol';
};

var $defineProperty = function defineProperty(it, key, D){
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = gOPD(it = toIObject(it), key = toPrimitive(key, true));
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it){
  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
  var args = [it]
    , i    = 1
    , replacer, $replacer;
  while(arguments.length > i)args.push(arguments[i++]);
  replacer = args[1];
  if(typeof replacer == 'function')$replacer = replacer;
  if($replacer || !isArray(replacer))replacer = function(key, value){
    if($replacer)value = $replacer.call(this, key, value);
    if(!isSymbol(value))return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var BUGGY_JSON = $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
});

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol.prototype, 'toString', function toString(){
    return this._k;
  });

  isSymbol = function(it){
    return it instanceof $Symbol;
  };

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
for(var symbols = (
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; ){
  var key     = symbols[i++]
    , Wrapper = core.Symbol
    , sym     = wks(key);
  if(!(key in Wrapper))dP(Wrapper, key, {value: USE_NATIVE ? sym : wrap(sym)});
};

setter = true;

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || BUGGY_JSON), 'JSON', {stringify: $stringify});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_core.js","./_descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_descriptors.js","./_enum-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_enum-keys.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_is-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-array.js","./_keyof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_keyof.js","./_library":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_library.js","./_meta":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_meta.js","./_object-create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-create.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_object-gopd":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopd.js","./_object-gopn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopn.js","./_object-gopn-ext":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopn-ext.js","./_object-gops":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gops.js","./_object-pie":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-pie.js","./_property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_property-desc.js","./_redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine.js","./_set-to-string-tag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-to-string-tag.js","./_shared":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_shared.js","./_to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-primitive.js","./_uid":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_uid.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.array-buffer.js":[function(require,module,exports){
'use strict';
var $export      = require('./_export')
  , $typed       = require('./_typed')
  , buffer       = require('./_typed-buffer')
  , anObject     = require('./_an-object')
  , toIndex      = require('./_to-index')
  , toLength     = require('./_to-length')
  , isObject     = require('./_is-object')
  , TYPED_ARRAY  = require('./_wks')('typed_array')
  , ArrayBuffer  = require('./_global').ArrayBuffer
  , speciesConstructor = require('./_species-constructor')
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_fails":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_fails.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_set-species":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_set-species.js","./_species-constructor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_species-constructor.js","./_to-index":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-index.js","./_to-length":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-length.js","./_typed":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed.js","./_typed-buffer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed-buffer.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.data-view.js":[function(require,module,exports){
var $export = require('./_export');
$export($export.G + $export.W + $export.F * !require('./_typed').ABV, {
  DataView: require('./_typed-buffer').DataView
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_typed":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed.js","./_typed-buffer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed-buffer.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.float32-array.js":[function(require,module,exports){
require('./_typed-array')('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed-array.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.float64-array.js":[function(require,module,exports){
require('./_typed-array')('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed-array.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.int16-array.js":[function(require,module,exports){
require('./_typed-array')('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed-array.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.int32-array.js":[function(require,module,exports){
require('./_typed-array')('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed-array.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.int8-array.js":[function(require,module,exports){
require('./_typed-array')('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed-array.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.uint16-array.js":[function(require,module,exports){
require('./_typed-array')('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed-array.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.uint32-array.js":[function(require,module,exports){
require('./_typed-array')('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed-array.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.uint8-array.js":[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});
},{"./_typed-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed-array.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.uint8-clamped-array.js":[function(require,module,exports){
require('./_typed-array')('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);
},{"./_typed-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_typed-array.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.weak-map.js":[function(require,module,exports){
'use strict';
var each         = require('./_array-methods')(0)
  , redefine     = require('./_redefine')
  , meta         = require('./_meta')
  , assign       = require('./_object-assign')
  , weak         = require('./_collection-weak')
  , isObject     = require('./_is-object')
  , has          = require('./_has')
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
},{"./_array-methods":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-methods.js","./_collection":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_collection.js","./_collection-weak":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_collection-weak.js","./_has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_has.js","./_is-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_is-object.js","./_meta":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_meta.js","./_object-assign":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-assign.js","./_redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.weak-set.js":[function(require,module,exports){
'use strict';
var weak = require('./_collection-weak');

// 23.4 WeakSet Objects
require('./_collection')('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);
},{"./_collection":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_collection.js","./_collection-weak":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_collection-weak.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.array.includes.js":[function(require,module,exports){
'use strict';
var $export   = require('./_export')
  , $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  // https://github.com/domenic/Array.prototype.includes
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');
},{"./_add-to-unscopables":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_add-to-unscopables.js","./_array-includes":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-includes.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.error.is-error.js":[function(require,module,exports){
// https://github.com/ljharb/proposal-is-error
var $export = require('./_export')
  , cof     = require('./_cof');

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});
},{"./_cof":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_cof.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.map.to-json.js":[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Map', {toJSON: require('./_collection-to-json')('Map')});
},{"./_collection-to-json":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_collection-to-json.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.math.iaddh.js":[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.math.imulh.js":[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.math.isubh.js":[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.math.umulh.js":[function(require,module,exports){
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = require('./_export');

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.object.entries.js":[function(require,module,exports){
// http://goo.gl/XkBrjD
var $export  = require('./_export')
  , $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_object-to-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-to-array.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.object.get-own-property-descriptors.js":[function(require,module,exports){
// https://gist.github.com/WebReflection/9353781
var $export    = require('./_export')
  , ownKeys    = require('./_own-keys')
  , toIObject  = require('./_to-iobject')
  , createDesc = require('./_property-desc')
  , gOPD       = require('./_object-gopd')
  , dP         = require('./_object-dp');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key, D;
    while(keys.length > i){
      D = getDesc(O, key = keys[i++]);
      if(key in result)dP.f(result, key, createDesc(0, D));
      else result[key] = D;
    } return result;
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_object-dp":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-dp.js","./_object-gopd":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gopd.js","./_own-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_own-keys.js","./_property-desc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_property-desc.js","./_to-iobject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_to-iobject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.object.values.js":[function(require,module,exports){
// http://goo.gl/XkBrjD
var $export = require('./_export')
  , $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_object-to-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-to-array.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.define-metadata.js":[function(require,module,exports){
var metadata                  = require('./_metadata')
  , anObject                  = require('./_an-object')
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_metadata.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.delete-metadata.js":[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_metadata.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.get-metadata-keys.js":[function(require,module,exports){
var Set                     = require('./es6.set')
  , from                    = require('./_array-from-iterable')
  , metadata                = require('./_metadata')
  , anObject                = require('./_an-object')
  , getPrototypeOf          = require('./_object-gpo')
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_array-from-iterable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_array-from-iterable.js","./_metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_metadata.js","./_object-gpo":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gpo.js","./es6.set":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.set.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.get-metadata.js":[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , getPrototypeOf         = require('./_object-gpo')
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_metadata.js","./_object-gpo":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gpo.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js":[function(require,module,exports){
var metadata                = require('./_metadata')
  , anObject                = require('./_an-object')
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_metadata.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.get-own-metadata.js":[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_metadata.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.has-metadata.js":[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , getPrototypeOf         = require('./_object-gpo')
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_metadata.js","./_object-gpo":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_object-gpo.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.has-own-metadata.js":[function(require,module,exports){
var metadata               = require('./_metadata')
  , anObject               = require('./_an-object')
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});
},{"./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_metadata.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.metadata.js":[function(require,module,exports){
var metadata                  = require('./_metadata')
  , anObject                  = require('./_an-object')
  , aFunction                 = require('./_a-function')
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});
},{"./_a-function":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_a-function.js","./_an-object":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_an-object.js","./_metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_metadata.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.set.to-json.js":[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./_export');

$export($export.P + $export.R, 'Set', {toJSON: require('./_collection-to-json')('Set')});
},{"./_collection-to-json":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_collection-to-json.js","./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.at.js":[function(require,module,exports){
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = require('./_export')
  , $at     = require('./_string-at')(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_string-at":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-at.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.pad-end.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $pad    = require('./_string-pad');

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_string-pad":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-pad.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.pad-start.js":[function(require,module,exports){
'use strict';
var $export = require('./_export')
  , $pad    = require('./_string-pad');

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_string-pad":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-pad.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.trim-left.js":[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');
},{"./_string-trim":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-trim.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.trim-right.js":[function(require,module,exports){
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');
},{"./_string-trim":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_string-trim.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.system.global.js":[function(require,module,exports){
// https://github.com/ljharb/proposal-global
var $export = require('./_export');

$export($export.S, 'System', {global: require('./_global')});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/web.dom.iterable.js":[function(require,module,exports){
var $iterators    = require('./es6.array.iterator')
  , redefine      = require('./_redefine')
  , global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , wks           = require('./_wks')
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}
},{"./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_hide":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_hide.js","./_iterators":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_iterators.js","./_redefine":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_redefine.js","./_wks":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_wks.js","./es6.array.iterator":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.iterator.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/web.immediate.js":[function(require,module,exports){
var $export = require('./_export')
  , $task   = require('./_task');
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_task":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_task.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/web.timers.js":[function(require,module,exports){
// ie9- setTimeout & setInterval additional parameters fix
var global     = require('./_global')
  , $export    = require('./_export')
  , invoke     = require('./_invoke')
  , partial    = require('./_partial')
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
},{"./_export":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_export.js","./_global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_global.js","./_invoke":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_invoke.js","./_partial":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_partial.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/shim.js":[function(require,module,exports){
require('./modules/es6.symbol');
require('./modules/es6.object.create');
require('./modules/es6.object.define-property');
require('./modules/es6.object.define-properties');
require('./modules/es6.object.get-own-property-descriptor');
require('./modules/es6.object.get-prototype-of');
require('./modules/es6.object.keys');
require('./modules/es6.object.get-own-property-names');
require('./modules/es6.object.freeze');
require('./modules/es6.object.seal');
require('./modules/es6.object.prevent-extensions');
require('./modules/es6.object.is-frozen');
require('./modules/es6.object.is-sealed');
require('./modules/es6.object.is-extensible');
require('./modules/es6.object.assign');
require('./modules/es6.object.is');
require('./modules/es6.object.set-prototype-of');
require('./modules/es6.object.to-string');
require('./modules/es6.function.bind');
require('./modules/es6.function.name');
require('./modules/es6.function.has-instance');
require('./modules/es6.parse-int');
require('./modules/es6.parse-float');
require('./modules/es6.number.constructor');
require('./modules/es6.number.to-fixed');
require('./modules/es6.number.to-precision');
require('./modules/es6.number.epsilon');
require('./modules/es6.number.is-finite');
require('./modules/es6.number.is-integer');
require('./modules/es6.number.is-nan');
require('./modules/es6.number.is-safe-integer');
require('./modules/es6.number.max-safe-integer');
require('./modules/es6.number.min-safe-integer');
require('./modules/es6.number.parse-float');
require('./modules/es6.number.parse-int');
require('./modules/es6.math.acosh');
require('./modules/es6.math.asinh');
require('./modules/es6.math.atanh');
require('./modules/es6.math.cbrt');
require('./modules/es6.math.clz32');
require('./modules/es6.math.cosh');
require('./modules/es6.math.expm1');
require('./modules/es6.math.fround');
require('./modules/es6.math.hypot');
require('./modules/es6.math.imul');
require('./modules/es6.math.log10');
require('./modules/es6.math.log1p');
require('./modules/es6.math.log2');
require('./modules/es6.math.sign');
require('./modules/es6.math.sinh');
require('./modules/es6.math.tanh');
require('./modules/es6.math.trunc');
require('./modules/es6.string.from-code-point');
require('./modules/es6.string.raw');
require('./modules/es6.string.trim');
require('./modules/es6.string.iterator');
require('./modules/es6.string.code-point-at');
require('./modules/es6.string.ends-with');
require('./modules/es6.string.includes');
require('./modules/es6.string.repeat');
require('./modules/es6.string.starts-with');
require('./modules/es6.string.anchor');
require('./modules/es6.string.big');
require('./modules/es6.string.blink');
require('./modules/es6.string.bold');
require('./modules/es6.string.fixed');
require('./modules/es6.string.fontcolor');
require('./modules/es6.string.fontsize');
require('./modules/es6.string.italics');
require('./modules/es6.string.link');
require('./modules/es6.string.small');
require('./modules/es6.string.strike');
require('./modules/es6.string.sub');
require('./modules/es6.string.sup');
require('./modules/es6.date.now');
require('./modules/es6.date.to-string');
require('./modules/es6.date.to-iso-string');
require('./modules/es6.date.to-json');
require('./modules/es6.array.is-array');
require('./modules/es6.array.from');
require('./modules/es6.array.of');
require('./modules/es6.array.join');
require('./modules/es6.array.slice');
require('./modules/es6.array.sort');
require('./modules/es6.array.for-each');
require('./modules/es6.array.map');
require('./modules/es6.array.filter');
require('./modules/es6.array.some');
require('./modules/es6.array.every');
require('./modules/es6.array.reduce');
require('./modules/es6.array.reduce-right');
require('./modules/es6.array.index-of');
require('./modules/es6.array.last-index-of');
require('./modules/es6.array.copy-within');
require('./modules/es6.array.fill');
require('./modules/es6.array.find');
require('./modules/es6.array.find-index');
require('./modules/es6.array.species');
require('./modules/es6.array.iterator');
require('./modules/es6.regexp.constructor');
require('./modules/es6.regexp.to-string');
require('./modules/es6.regexp.flags');
require('./modules/es6.regexp.match');
require('./modules/es6.regexp.replace');
require('./modules/es6.regexp.search');
require('./modules/es6.regexp.split');
require('./modules/es6.promise');
require('./modules/es6.map');
require('./modules/es6.set');
require('./modules/es6.weak-map');
require('./modules/es6.weak-set');
require('./modules/es6.typed.array-buffer');
require('./modules/es6.typed.data-view');
require('./modules/es6.typed.int8-array');
require('./modules/es6.typed.uint8-array');
require('./modules/es6.typed.uint8-clamped-array');
require('./modules/es6.typed.int16-array');
require('./modules/es6.typed.uint16-array');
require('./modules/es6.typed.int32-array');
require('./modules/es6.typed.uint32-array');
require('./modules/es6.typed.float32-array');
require('./modules/es6.typed.float64-array');
require('./modules/es6.reflect.apply');
require('./modules/es6.reflect.construct');
require('./modules/es6.reflect.define-property');
require('./modules/es6.reflect.delete-property');
require('./modules/es6.reflect.enumerate');
require('./modules/es6.reflect.get');
require('./modules/es6.reflect.get-own-property-descriptor');
require('./modules/es6.reflect.get-prototype-of');
require('./modules/es6.reflect.has');
require('./modules/es6.reflect.is-extensible');
require('./modules/es6.reflect.own-keys');
require('./modules/es6.reflect.prevent-extensions');
require('./modules/es6.reflect.set');
require('./modules/es6.reflect.set-prototype-of');
require('./modules/es7.array.includes');
require('./modules/es7.string.at');
require('./modules/es7.string.pad-start');
require('./modules/es7.string.pad-end');
require('./modules/es7.string.trim-left');
require('./modules/es7.string.trim-right');
require('./modules/es7.object.get-own-property-descriptors');
require('./modules/es7.object.values');
require('./modules/es7.object.entries');
require('./modules/es7.map.to-json');
require('./modules/es7.set.to-json');
require('./modules/es7.system.global');
require('./modules/es7.error.is-error');
require('./modules/es7.math.iaddh');
require('./modules/es7.math.isubh');
require('./modules/es7.math.imulh');
require('./modules/es7.math.umulh');
require('./modules/es7.reflect.define-metadata');
require('./modules/es7.reflect.delete-metadata');
require('./modules/es7.reflect.get-metadata');
require('./modules/es7.reflect.get-metadata-keys');
require('./modules/es7.reflect.get-own-metadata');
require('./modules/es7.reflect.get-own-metadata-keys');
require('./modules/es7.reflect.has-metadata');
require('./modules/es7.reflect.has-own-metadata');
require('./modules/es7.reflect.metadata');
require('./modules/web.timers');
require('./modules/web.immediate');
require('./modules/web.dom.iterable');
module.exports = require('./modules/_core');
},{"./modules/_core":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/_core.js","./modules/es6.array.copy-within":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.copy-within.js","./modules/es6.array.every":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.every.js","./modules/es6.array.fill":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.fill.js","./modules/es6.array.filter":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.filter.js","./modules/es6.array.find":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.find.js","./modules/es6.array.find-index":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.find-index.js","./modules/es6.array.for-each":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.for-each.js","./modules/es6.array.from":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.from.js","./modules/es6.array.index-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.index-of.js","./modules/es6.array.is-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.is-array.js","./modules/es6.array.iterator":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.iterator.js","./modules/es6.array.join":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.join.js","./modules/es6.array.last-index-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.last-index-of.js","./modules/es6.array.map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.map.js","./modules/es6.array.of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.of.js","./modules/es6.array.reduce":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.reduce.js","./modules/es6.array.reduce-right":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.reduce-right.js","./modules/es6.array.slice":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.slice.js","./modules/es6.array.some":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.some.js","./modules/es6.array.sort":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.sort.js","./modules/es6.array.species":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.array.species.js","./modules/es6.date.now":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.date.now.js","./modules/es6.date.to-iso-string":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.date.to-iso-string.js","./modules/es6.date.to-json":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.date.to-json.js","./modules/es6.date.to-string":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.date.to-string.js","./modules/es6.function.bind":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.function.bind.js","./modules/es6.function.has-instance":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.function.has-instance.js","./modules/es6.function.name":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.function.name.js","./modules/es6.map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.map.js","./modules/es6.math.acosh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.acosh.js","./modules/es6.math.asinh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.asinh.js","./modules/es6.math.atanh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.atanh.js","./modules/es6.math.cbrt":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.cbrt.js","./modules/es6.math.clz32":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.clz32.js","./modules/es6.math.cosh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.cosh.js","./modules/es6.math.expm1":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.expm1.js","./modules/es6.math.fround":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.fround.js","./modules/es6.math.hypot":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.hypot.js","./modules/es6.math.imul":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.imul.js","./modules/es6.math.log10":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.log10.js","./modules/es6.math.log1p":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.log1p.js","./modules/es6.math.log2":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.log2.js","./modules/es6.math.sign":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.sign.js","./modules/es6.math.sinh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.sinh.js","./modules/es6.math.tanh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.tanh.js","./modules/es6.math.trunc":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.math.trunc.js","./modules/es6.number.constructor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.constructor.js","./modules/es6.number.epsilon":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.epsilon.js","./modules/es6.number.is-finite":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-finite.js","./modules/es6.number.is-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-integer.js","./modules/es6.number.is-nan":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-nan.js","./modules/es6.number.is-safe-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.is-safe-integer.js","./modules/es6.number.max-safe-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.max-safe-integer.js","./modules/es6.number.min-safe-integer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.min-safe-integer.js","./modules/es6.number.parse-float":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.parse-float.js","./modules/es6.number.parse-int":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.parse-int.js","./modules/es6.number.to-fixed":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.to-fixed.js","./modules/es6.number.to-precision":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.number.to-precision.js","./modules/es6.object.assign":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.assign.js","./modules/es6.object.create":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.create.js","./modules/es6.object.define-properties":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.define-properties.js","./modules/es6.object.define-property":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.define-property.js","./modules/es6.object.freeze":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.freeze.js","./modules/es6.object.get-own-property-descriptor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.get-own-property-descriptor.js","./modules/es6.object.get-own-property-names":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.get-own-property-names.js","./modules/es6.object.get-prototype-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.get-prototype-of.js","./modules/es6.object.is":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is.js","./modules/es6.object.is-extensible":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is-extensible.js","./modules/es6.object.is-frozen":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is-frozen.js","./modules/es6.object.is-sealed":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.is-sealed.js","./modules/es6.object.keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.keys.js","./modules/es6.object.prevent-extensions":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.prevent-extensions.js","./modules/es6.object.seal":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.seal.js","./modules/es6.object.set-prototype-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.set-prototype-of.js","./modules/es6.object.to-string":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.object.to-string.js","./modules/es6.parse-float":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.parse-float.js","./modules/es6.parse-int":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.parse-int.js","./modules/es6.promise":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.promise.js","./modules/es6.reflect.apply":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.apply.js","./modules/es6.reflect.construct":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.construct.js","./modules/es6.reflect.define-property":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.define-property.js","./modules/es6.reflect.delete-property":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.delete-property.js","./modules/es6.reflect.enumerate":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.enumerate.js","./modules/es6.reflect.get":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.get.js","./modules/es6.reflect.get-own-property-descriptor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js","./modules/es6.reflect.get-prototype-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.get-prototype-of.js","./modules/es6.reflect.has":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.has.js","./modules/es6.reflect.is-extensible":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.is-extensible.js","./modules/es6.reflect.own-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.own-keys.js","./modules/es6.reflect.prevent-extensions":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.prevent-extensions.js","./modules/es6.reflect.set":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.set.js","./modules/es6.reflect.set-prototype-of":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.reflect.set-prototype-of.js","./modules/es6.regexp.constructor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.constructor.js","./modules/es6.regexp.flags":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.flags.js","./modules/es6.regexp.match":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.match.js","./modules/es6.regexp.replace":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.replace.js","./modules/es6.regexp.search":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.search.js","./modules/es6.regexp.split":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.split.js","./modules/es6.regexp.to-string":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.regexp.to-string.js","./modules/es6.set":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.set.js","./modules/es6.string.anchor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.anchor.js","./modules/es6.string.big":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.big.js","./modules/es6.string.blink":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.blink.js","./modules/es6.string.bold":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.bold.js","./modules/es6.string.code-point-at":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.code-point-at.js","./modules/es6.string.ends-with":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.ends-with.js","./modules/es6.string.fixed":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.fixed.js","./modules/es6.string.fontcolor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.fontcolor.js","./modules/es6.string.fontsize":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.fontsize.js","./modules/es6.string.from-code-point":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.from-code-point.js","./modules/es6.string.includes":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.includes.js","./modules/es6.string.italics":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.italics.js","./modules/es6.string.iterator":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.iterator.js","./modules/es6.string.link":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.link.js","./modules/es6.string.raw":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.raw.js","./modules/es6.string.repeat":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.repeat.js","./modules/es6.string.small":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.small.js","./modules/es6.string.starts-with":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.starts-with.js","./modules/es6.string.strike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.strike.js","./modules/es6.string.sub":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.sub.js","./modules/es6.string.sup":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.sup.js","./modules/es6.string.trim":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.string.trim.js","./modules/es6.symbol":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.symbol.js","./modules/es6.typed.array-buffer":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.array-buffer.js","./modules/es6.typed.data-view":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.data-view.js","./modules/es6.typed.float32-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.float32-array.js","./modules/es6.typed.float64-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.float64-array.js","./modules/es6.typed.int16-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.int16-array.js","./modules/es6.typed.int32-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.int32-array.js","./modules/es6.typed.int8-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.int8-array.js","./modules/es6.typed.uint16-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.uint16-array.js","./modules/es6.typed.uint32-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.uint32-array.js","./modules/es6.typed.uint8-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.uint8-array.js","./modules/es6.typed.uint8-clamped-array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.typed.uint8-clamped-array.js","./modules/es6.weak-map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.weak-map.js","./modules/es6.weak-set":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es6.weak-set.js","./modules/es7.array.includes":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.array.includes.js","./modules/es7.error.is-error":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.error.is-error.js","./modules/es7.map.to-json":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.map.to-json.js","./modules/es7.math.iaddh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.math.iaddh.js","./modules/es7.math.imulh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.math.imulh.js","./modules/es7.math.isubh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.math.isubh.js","./modules/es7.math.umulh":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.math.umulh.js","./modules/es7.object.entries":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.object.entries.js","./modules/es7.object.get-own-property-descriptors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.object.get-own-property-descriptors.js","./modules/es7.object.values":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.object.values.js","./modules/es7.reflect.define-metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.define-metadata.js","./modules/es7.reflect.delete-metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.delete-metadata.js","./modules/es7.reflect.get-metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.get-metadata.js","./modules/es7.reflect.get-metadata-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.get-metadata-keys.js","./modules/es7.reflect.get-own-metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.get-own-metadata.js","./modules/es7.reflect.get-own-metadata-keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.get-own-metadata-keys.js","./modules/es7.reflect.has-metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.has-metadata.js","./modules/es7.reflect.has-own-metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.has-own-metadata.js","./modules/es7.reflect.metadata":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.reflect.metadata.js","./modules/es7.set.to-json":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.set.to-json.js","./modules/es7.string.at":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.at.js","./modules/es7.string.pad-end":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.pad-end.js","./modules/es7.string.pad-start":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.pad-start.js","./modules/es7.string.trim-left":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.trim-left.js","./modules/es7.string.trim-right":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.string.trim-right.js","./modules/es7.system.global":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/es7.system.global.js","./modules/web.dom.iterable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/web.dom.iterable.js","./modules/web.immediate":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/web.immediate.js","./modules/web.timers":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/core-js/modules/web.timers.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/debug/browser.js":[function(require,module,exports){

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

},{"ms":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/ms/index.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-errors/lib/index.js":[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

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

var FeathersError = (function (_extendableBuiltin2) {
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
})(_extendableBuiltin(Error));

var BadRequest = (function (_FeathersError) {
  _inherits(BadRequest, _FeathersError);

  function BadRequest(message, data) {
    _classCallCheck(this, BadRequest);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BadRequest).call(this, message, 'BadRequest', 400, 'bad-request', data));
  }

  return BadRequest;
})(FeathersError);

var NotAuthenticated = (function (_FeathersError2) {
  _inherits(NotAuthenticated, _FeathersError2);

  function NotAuthenticated(message, data) {
    _classCallCheck(this, NotAuthenticated);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotAuthenticated).call(this, message, 'NotAuthenticated', 401, 'not-authenticated', data));
  }

  return NotAuthenticated;
})(FeathersError);

var PaymentError = (function (_FeathersError3) {
  _inherits(PaymentError, _FeathersError3);

  function PaymentError(message, data) {
    _classCallCheck(this, PaymentError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PaymentError).call(this, message, 'PaymentError', 402, 'payment-error', data));
  }

  return PaymentError;
})(FeathersError);

var Forbidden = (function (_FeathersError4) {
  _inherits(Forbidden, _FeathersError4);

  function Forbidden(message, data) {
    _classCallCheck(this, Forbidden);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Forbidden).call(this, message, 'Forbidden', 403, 'forbidden', data));
  }

  return Forbidden;
})(FeathersError);

var NotFound = (function (_FeathersError5) {
  _inherits(NotFound, _FeathersError5);

  function NotFound(message, data) {
    _classCallCheck(this, NotFound);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotFound).call(this, message, 'NotFound', 404, 'not-found', data));
  }

  return NotFound;
})(FeathersError);

var MethodNotAllowed = (function (_FeathersError6) {
  _inherits(MethodNotAllowed, _FeathersError6);

  function MethodNotAllowed(message, data) {
    _classCallCheck(this, MethodNotAllowed);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(MethodNotAllowed).call(this, message, 'MethodNotAllowed', 405, 'method-not-allowed', data));
  }

  return MethodNotAllowed;
})(FeathersError);

var NotAcceptable = (function (_FeathersError7) {
  _inherits(NotAcceptable, _FeathersError7);

  function NotAcceptable(message, data) {
    _classCallCheck(this, NotAcceptable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotAcceptable).call(this, message, 'NotAcceptable', 406, 'not-acceptable', data));
  }

  return NotAcceptable;
})(FeathersError);

var Timeout = (function (_FeathersError8) {
  _inherits(Timeout, _FeathersError8);

  function Timeout(message, data) {
    _classCallCheck(this, Timeout);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Timeout).call(this, message, 'Timeout', 408, 'timeout', data));
  }

  return Timeout;
})(FeathersError);

var Conflict = (function (_FeathersError9) {
  _inherits(Conflict, _FeathersError9);

  function Conflict(message, data) {
    _classCallCheck(this, Conflict);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Conflict).call(this, message, 'Conflict', 409, 'conflict', data));
  }

  return Conflict;
})(FeathersError);

var Unprocessable = (function (_FeathersError10) {
  _inherits(Unprocessable, _FeathersError10);

  function Unprocessable(message, data) {
    _classCallCheck(this, Unprocessable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Unprocessable).call(this, message, 'Unprocessable', 422, 'unprocessable', data));
  }

  return Unprocessable;
})(FeathersError);

var GeneralError = (function (_FeathersError11) {
  _inherits(GeneralError, _FeathersError11);

  function GeneralError(message, data) {
    _classCallCheck(this, GeneralError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GeneralError).call(this, message, 'GeneralError', 500, 'general-error', data));
  }

  return GeneralError;
})(FeathersError);

var NotImplemented = (function (_FeathersError12) {
  _inherits(NotImplemented, _FeathersError12);

  function NotImplemented(message, data) {
    _classCallCheck(this, NotImplemented);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(NotImplemented).call(this, message, 'NotImplemented', 501, 'not-implemented', data));
  }

  return NotImplemented;
})(FeathersError);

var Unavailable = (function (_FeathersError13) {
  _inherits(Unavailable, _FeathersError13);

  function Unavailable(message, data) {
    _classCallCheck(this, Unavailable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Unavailable).call(this, message, 'Unavailable', 503, 'unavailable', data));
  }

  return Unavailable;
})(FeathersError);

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
(function (global){
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

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

if (!global._babelPolyfill) {
  require('babel-polyfill');
}

var _ = {
  values: require('lodash/values'),
  isEmpty: require('lodash/isEmpty'),
  where: require('lodash/filter'),
  extend: require('lodash/extend'),
  omit: require('lodash/omit'),
  pick: require('lodash/pick')
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

      var values = (0, _utils.filterSpecials)(_.values(this.store), query);

      if (!_.isEmpty(query)) {
        values = _.where(values, query);
      }

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
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-memory/lib/utils.js","babel-polyfill":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/babel-polyfill/lib/index.js","feathers-errors":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-errors/lib/index.js","feathers-query-filters":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-query-filters/lib/index.js","lodash/extend":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/extend.js","lodash/filter":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/filter.js","lodash/isEmpty":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isEmpty.js","lodash/omit":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/omit.js","lodash/pick":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/pick.js","lodash/values":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/values.js","uberproto":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/uberproto/lib/proto.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-memory/lib/utils.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterSpecials = filterSpecials;
exports.sorter = sorter;
var _ = {
  some: require('lodash/some'),
  isMatch: require('lodash/isMatch'),
  each: require('lodash/each'),
  isObject: require('lodash/isObject')
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

function filterSpecials(values, query) {
  if (query.$or) {
    values = values.filter(function (current) {
      return _.some(query.$or, function (or) {
        return _.isMatch(current, or);
      });
    });
    delete query.$or;
  }

  _.each(query, function (value, key) {
    if (_.isObject(value)) {
      _.each(value, function (target, prop) {
        if (specialFilters[prop]) {
          values = values.filter(specialFilters[prop](key, target));
        }
      });

      delete query[key];
    }
  });

  return values;
}

function sorter($sort) {
  return function (first, second) {
    var comparator = 0;
    _.each($sort, function (modifier, key) {
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
},{"lodash/each":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/each.js","lodash/isMatch":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isMatch.js","lodash/isObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObject.js","lodash/some":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/some.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/feathers-query-filters/lib/index.js":[function(require,module,exports){
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
},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Hash.js":[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Creates an hash object.
 *
 * @private
 * @constructor
 * @returns {Object} Returns the new hash object.
 */
function Hash() {}

// Avoid inheriting from `Object.prototype` when possible.
Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

module.exports = Hash;

},{"./_nativeCreate":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_nativeCreate.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Map.js":[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getNative.js","./_root":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_root.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_MapCache.js":[function(require,module,exports){
var mapClear = require('./_mapClear'),
    mapDelete = require('./_mapDelete'),
    mapGet = require('./_mapGet'),
    mapHas = require('./_mapHas'),
    mapSet = require('./_mapSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function MapCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.clear();
  while (++index < length) {
    var entry = values[index];
    this.set(entry[0], entry[1]);
  }
}

// Add functions to the `MapCache`.
MapCache.prototype.clear = mapClear;
MapCache.prototype['delete'] = mapDelete;
MapCache.prototype.get = mapGet;
MapCache.prototype.has = mapHas;
MapCache.prototype.set = mapSet;

module.exports = MapCache;

},{"./_mapClear":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapClear.js","./_mapDelete":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapDelete.js","./_mapGet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapGet.js","./_mapHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapHas.js","./_mapSet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapSet.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Reflect.js":[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Reflect = root.Reflect;

module.exports = Reflect;

},{"./_root":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_root.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Set.js":[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getNative.js","./_root":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_root.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_SetCache.js":[function(require,module,exports){
var MapCache = require('./_MapCache'),
    cachePush = require('./_cachePush');

/**
 *
 * Creates a set cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.push(values[index]);
  }
}

// Add functions to the `SetCache`.
SetCache.prototype.push = cachePush;

module.exports = SetCache;

},{"./_MapCache":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_MapCache.js","./_cachePush":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_cachePush.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Stack.js":[function(require,module,exports){
var stackClear = require('./_stackClear'),
    stackDelete = require('./_stackDelete'),
    stackGet = require('./_stackGet'),
    stackHas = require('./_stackHas'),
    stackSet = require('./_stackSet');

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function Stack(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.clear();
  while (++index < length) {
    var entry = values[index];
    this.set(entry[0], entry[1]);
  }
}

// Add functions to the `Stack` cache.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

},{"./_stackClear":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackClear.js","./_stackDelete":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackDelete.js","./_stackGet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackGet.js","./_stackHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackHas.js","./_stackSet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackSet.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Symbol.js":[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_root.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Uint8Array.js":[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

},{"./_root":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_root.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_WeakMap.js":[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;

},{"./_getNative":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getNative.js","./_root":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_root.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_apply.js":[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {...*} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  var length = args.length;
  switch (length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayEach.js":[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayFilter.js":[function(require,module,exports){
/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayIncludes.js":[function(require,module,exports){
var baseIndexOf = require('./_baseIndexOf');

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  return !!array.length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;

},{"./_baseIndexOf":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIndexOf.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayIncludesWith.js":[function(require,module,exports){
/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayMap.js":[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayPush.js":[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayReduce.js":[function(require,module,exports){
/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array.length;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

module.exports = arrayReduce;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arraySome.js":[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assignValue.js":[function(require,module,exports){
var eq = require('./eq');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

module.exports = assignValue;

},{"./eq":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/eq.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocDelete.js":[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the associative array.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function assocDelete(array, key) {
  var index = assocIndexOf(array, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = array.length - 1;
  if (index == lastIndex) {
    array.pop();
  } else {
    splice.call(array, index, 1);
  }
  return true;
}

module.exports = assocDelete;

},{"./_assocIndexOf":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocIndexOf.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocGet.js":[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the associative array value for `key`.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function assocGet(array, key) {
  var index = assocIndexOf(array, key);
  return index < 0 ? undefined : array[index][1];
}

module.exports = assocGet;

},{"./_assocIndexOf":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocIndexOf.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocHas.js":[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if an associative array value for `key` exists.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function assocHas(array, key) {
  return assocIndexOf(array, key) > -1;
}

module.exports = assocHas;

},{"./_assocIndexOf":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocIndexOf.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocIndexOf.js":[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the first occurrence of `key` is found in `array`
 * of key-value pairs.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/eq.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocSet.js":[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the associative array `key` to `value`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 */
function assocSet(array, key, value) {
  var index = assocIndexOf(array, key);
  if (index < 0) {
    array.push([key, value]);
  } else {
    array[index][1] = value;
  }
}

module.exports = assocSet;

},{"./_assocIndexOf":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocIndexOf.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseCastFunction.js":[function(require,module,exports){
var identity = require('./identity');

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the array-like object.
 */
function baseCastFunction(value) {
  return typeof value == 'function' ? value : identity;
}

module.exports = baseCastFunction;

},{"./identity":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/identity.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseCastPath.js":[function(require,module,exports){
var isArray = require('./isArray'),
    stringToPath = require('./_stringToPath');

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function baseCastPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

module.exports = baseCastPath;

},{"./_stringToPath":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stringToPath.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseDifference.js":[function(require,module,exports){
var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    arrayMap = require('./_arrayMap'),
    baseUnary = require('./_baseUnary'),
    cacheHas = require('./_cacheHas');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of methods like `_.difference` without support for
 * excluding multiple arrays or iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      isCommon = true,
      length = array.length,
      result = [],
      valuesLength = values.length;

  if (!length) {
    return result;
  }
  if (iteratee) {
    values = arrayMap(values, baseUnary(iteratee));
  }
  if (comparator) {
    includes = arrayIncludesWith;
    isCommon = false;
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas;
    isCommon = false;
    values = new SetCache(values);
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    if (isCommon && computed === computed) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

},{"./_SetCache":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_SetCache.js","./_arrayIncludes":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayIncludes.js","./_arrayIncludesWith":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayIncludesWith.js","./_arrayMap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayMap.js","./_baseUnary":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseUnary.js","./_cacheHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_cacheHas.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseEach.js":[function(require,module,exports){
var baseForOwn = require('./_baseForOwn'),
    createBaseEach = require('./_createBaseEach');

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"./_baseForOwn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseForOwn.js","./_createBaseEach":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_createBaseEach.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseFilter.js":[function(require,module,exports){
var baseEach = require('./_baseEach');

/**
 * The base implementation of `_.filter` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function baseFilter(collection, predicate) {
  var result = [];
  baseEach(collection, function(value, index, collection) {
    if (predicate(value, index, collection)) {
      result.push(value);
    }
  });
  return result;
}

module.exports = baseFilter;

},{"./_baseEach":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseEach.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseFlatten.js":[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLikeObject = require('./isArrayLikeObject');

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, isStrict, result) {
  result || (result = []);

  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && isArrayLikeObject(value) &&
        (isStrict || isArray(value) || isArguments(value))) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"./_arrayPush":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayPush.js","./isArguments":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArguments.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js","./isArrayLikeObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLikeObject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseFor.js":[function(require,module,exports){
var createBaseFor = require('./_createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./_createBaseFor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_createBaseFor.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseForOwn.js":[function(require,module,exports){
var baseFor = require('./_baseFor'),
    keys = require('./keys');

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"./_baseFor":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseFor.js","./keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keys.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseGet.js":[function(require,module,exports){
var baseCastPath = require('./_baseCastPath'),
    isKey = require('./_isKey');

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path + ''] : baseCastPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./_baseCastPath":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseCastPath.js","./_isKey":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKey.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseHas.js":[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var getPrototypeOf = Object.getPrototypeOf;

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
  // that are composed entirely of index properties, return `false` for
  // `hasOwnProperty` checks of them.
  return hasOwnProperty.call(object, key) ||
    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
}

module.exports = baseHas;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseHasIn.js":[function(require,module,exports){
/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return key in Object(object);
}

module.exports = baseHasIn;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIndexOf.js":[function(require,module,exports){
var indexOfNaN = require('./_indexOfNaN');

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./_indexOfNaN":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_indexOfNaN.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsEqual.js":[function(require,module,exports){
var baseIsEqualDeep = require('./_baseIsEqualDeep'),
    isObject = require('./isObject'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

module.exports = baseIsEqual;

},{"./_baseIsEqualDeep":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsEqualDeep.js","./isObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObject.js","./isObjectLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObjectLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsEqualDeep.js":[function(require,module,exports){
var Stack = require('./_Stack'),
    equalArrays = require('./_equalArrays'),
    equalByTag = require('./_equalByTag'),
    equalObjects = require('./_equalObjects'),
    getTag = require('./_getTag'),
    isArray = require('./isArray'),
    isHostObject = require('./_isHostObject'),
    isTypedArray = require('./isTypedArray');

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG = 2;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      stack || (stack = new Stack);
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

module.exports = baseIsEqualDeep;

},{"./_Stack":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Stack.js","./_equalArrays":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_equalArrays.js","./_equalByTag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_equalByTag.js","./_equalObjects":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_equalObjects.js","./_getTag":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getTag.js","./_isHostObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isHostObject.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js","./isTypedArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isTypedArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsMatch.js":[function(require,module,exports){
var Stack = require('./_Stack'),
    baseIsEqual = require('./_baseIsEqual');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack,
          result = customizer ? customizer(objValue, srcValue, key, object, source, stack) : undefined;

      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./_Stack":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Stack.js","./_baseIsEqual":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsEqual.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIteratee.js":[function(require,module,exports){
var baseMatches = require('./_baseMatches'),
    baseMatchesProperty = require('./_baseMatchesProperty'),
    identity = require('./identity'),
    isArray = require('./isArray'),
    property = require('./property');

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  var type = typeof value;
  if (type == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (type == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

module.exports = baseIteratee;

},{"./_baseMatches":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseMatches.js","./_baseMatchesProperty":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseMatchesProperty.js","./identity":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/identity.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js","./property":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/property.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseKeys.js":[function(require,module,exports){
/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = Object.keys;

/**
 * The base implementation of `_.keys` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  return nativeKeys(Object(object));
}

module.exports = baseKeys;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseKeysIn.js":[function(require,module,exports){
var Reflect = require('./_Reflect'),
    iteratorToArray = require('./_iteratorToArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var enumerate = Reflect ? Reflect.enumerate : undefined,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * The base implementation of `_.keysIn` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  object = object == null ? object : Object(object);

  var result = [];
  for (var key in object) {
    result.push(key);
  }
  return result;
}

// Fallback for IE < 9 with es6-shim.
if (enumerate && !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf')) {
  baseKeysIn = function(object) {
    return iteratorToArray(enumerate(object));
  };
}

module.exports = baseKeysIn;

},{"./_Reflect":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Reflect.js","./_iteratorToArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_iteratorToArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseMatches.js":[function(require,module,exports){
var baseIsMatch = require('./_baseIsMatch'),
    getMatchData = require('./_getMatchData');

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    var key = matchData[0][0],
        value = matchData[0][1];

    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === value &&
        (value !== undefined || (key in Object(object)));
    };
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

module.exports = baseMatches;

},{"./_baseIsMatch":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsMatch.js","./_getMatchData":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getMatchData.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseMatchesProperty.js":[function(require,module,exports){
var baseIsEqual = require('./_baseIsEqual'),
    get = require('./get'),
    hasIn = require('./hasIn');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(path, srcValue) {
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

module.exports = baseMatchesProperty;

},{"./_baseIsEqual":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsEqual.js","./get":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/get.js","./hasIn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/hasIn.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_basePick.js":[function(require,module,exports){
var arrayReduce = require('./_arrayReduce');

/**
 * The base implementation of `_.pick` without support for individual
 * property names.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property names to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, props) {
  object = Object(object);
  return arrayReduce(props, function(result, key) {
    if (key in object) {
      result[key] = object[key];
    }
    return result;
  }, {});
}

module.exports = basePick;

},{"./_arrayReduce":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayReduce.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseProperty.js":[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_basePropertyDeep.js":[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

module.exports = basePropertyDeep;

},{"./_baseGet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseGet.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseSlice.js":[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseSome.js":[function(require,module,exports){
var baseEach = require('./_baseEach');

/**
 * The base implementation of `_.some` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
 */
function baseSome(collection, predicate) {
  var result;

  baseEach(collection, function(value, index, collection) {
    result = predicate(value, index, collection);
    return !result;
  });
  return !!result;
}

module.exports = baseSome;

},{"./_baseEach":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseEach.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseTimes.js":[function(require,module,exports){
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseToPairs.js":[function(require,module,exports){
var arrayMap = require('./_arrayMap');

/**
 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
 * of key-value pairs for `object` corresponding to the property names of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the new array of key-value pairs.
 */
function baseToPairs(object, props) {
  return arrayMap(props, function(key) {
    return [key, object[key]];
  });
}

module.exports = baseToPairs;

},{"./_arrayMap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayMap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseUnary.js":[function(require,module,exports){
/**
 * The base implementation of `_.unary` without support for storing wrapper metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseValues.js":[function(require,module,exports){
var arrayMap = require('./_arrayMap');

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

module.exports = baseValues;

},{"./_arrayMap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayMap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_cacheHas.js":[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Checks if `value` is in `cache`.
 *
 * @private
 * @param {Object} cache The set cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function cacheHas(cache, value) {
  var map = cache.__data__;
  if (isKeyable(value)) {
    var data = map.__data__,
        hash = typeof value == 'string' ? data.string : data.hash;

    return hash[value] === HASH_UNDEFINED;
  }
  return map.has(value);
}

module.exports = cacheHas;

},{"./_isKeyable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKeyable.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_cachePush.js":[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the set cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var map = this.__data__;
  if (isKeyable(value)) {
    var data = map.__data__,
        hash = typeof value == 'string' ? data.string : data.hash;

    hash[value] = HASH_UNDEFINED;
  }
  else {
    map.set(value, HASH_UNDEFINED);
  }
}

module.exports = cachePush;

},{"./_isKeyable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKeyable.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_checkGlobal.js":[function(require,module,exports){
/**
 * Checks if `value` is a global object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
 */
function checkGlobal(value) {
  return (value && value.Object === Object) ? value : null;
}

module.exports = checkGlobal;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_copyObject.js":[function(require,module,exports){
var copyObjectWith = require('./_copyObjectWith');

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object) {
  return copyObjectWith(source, props, object);
}

module.exports = copyObject;

},{"./_copyObjectWith":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_copyObjectWith.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_copyObjectWith.js":[function(require,module,exports){
var assignValue = require('./_assignValue');

/**
 * This function is like `copyObject` except that it accepts a function to
 * customize copied values.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObjectWith(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : source[key];

    assignValue(object, key, newValue);
  }
  return object;
}

module.exports = copyObjectWith;

},{"./_assignValue":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assignValue.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_createAssigner.js":[function(require,module,exports){
var isIterateeCall = require('./_isIterateeCall'),
    rest = require('./rest');

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return rest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = typeof customizer == 'function'
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"./_isIterateeCall":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIterateeCall.js","./rest":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/rest.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_createBaseEach.js":[function(require,module,exports){
var isArrayLike = require('./isArrayLike');

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    if (collection == null) {
      return collection;
    }
    if (!isArrayLike(collection)) {
      return eachFunc(collection, iteratee);
    }
    var length = collection.length,
        index = fromRight ? length : -1,
        iterable = Object(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"./isArrayLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_createBaseFor.js":[function(require,module,exports){
/**
 * Creates a base function for methods like `_.forIn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_equalArrays.js":[function(require,module,exports){
var arraySome = require('./_arraySome');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var index = -1,
      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked) {
    return stacked == other;
  }
  var result = true;
  stack.set(array, other);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isUnordered) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
          })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  return result;
}

module.exports = equalArrays;

},{"./_arraySome":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arraySome.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_equalByTag.js":[function(require,module,exports){
var Symbol = require('./_Symbol'),
    Uint8Array = require('./_Uint8Array'),
    equalArrays = require('./_equalArrays'),
    mapToArray = require('./_mapToArray'),
    setToArray = require('./_setToArray');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object) ? other != +other : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      // Recursively compare objects (susceptible to call stack limits).
      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask | UNORDERED_COMPARE_FLAG, stack.set(object, other));

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;

},{"./_Symbol":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Symbol.js","./_Uint8Array":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Uint8Array.js","./_equalArrays":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_equalArrays.js","./_mapToArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapToArray.js","./_setToArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_setToArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_equalObjects.js":[function(require,module,exports){
var baseHas = require('./_baseHas'),
    keys = require('./keys');

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : baseHas(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  return result;
}

module.exports = equalObjects;

},{"./_baseHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseHas.js","./keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keys.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getLength.js":[function(require,module,exports){
var baseProperty = require('./_baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./_baseProperty":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseProperty.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getMatchData.js":[function(require,module,exports){
var isStrictComparable = require('./_isStrictComparable'),
    toPairs = require('./toPairs');

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = toPairs(object),
      length = result.length;

  while (length--) {
    result[length][2] = isStrictComparable(result[length][1]);
  }
  return result;
}

module.exports = getMatchData;

},{"./_isStrictComparable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isStrictComparable.js","./toPairs":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toPairs.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getNative.js":[function(require,module,exports){
var isNative = require('./isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./isNative":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isNative.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getTag.js":[function(require,module,exports){
var Map = require('./_Map'),
    Set = require('./_Set'),
    WeakMap = require('./_WeakMap');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect maps, sets, and weakmaps. */
var mapCtorString = Map ? funcToString.call(Map) : '',
    setCtorString = Set ? funcToString.call(Set) : '',
    weakMapCtorString = WeakMap ? funcToString.call(WeakMap) : '';

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
  return objectToString.call(value);
}

// Fallback for IE 11 providing `toStringTag` values for maps, sets, and weakmaps.
if ((Map && getTag(new Map) != mapTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : null,
        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case mapCtorString: return mapTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;

},{"./_Map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Map.js","./_Set":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Set.js","./_WeakMap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_WeakMap.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hasPath.js":[function(require,module,exports){
var baseCastPath = require('./_baseCastPath'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isIndex = require('./_isIndex'),
    isKey = require('./_isKey'),
    isLength = require('./isLength'),
    isString = require('./isString'),
    last = require('./last'),
    parent = require('./_parent');

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  if (object == null) {
    return false;
  }
  var result = hasFunc(object, path);
  if (!result && !isKey(path)) {
    path = baseCastPath(path);
    object = parent(object, path);
    if (object != null) {
      path = last(path);
      result = hasFunc(object, path);
    }
  }
  var length = object ? object.length : undefined;
  return result || (
    !!length && isLength(length) && isIndex(path, length) &&
    (isArray(object) || isString(object) || isArguments(object))
  );
}

module.exports = hasPath;

},{"./_baseCastPath":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseCastPath.js","./_isIndex":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIndex.js","./_isKey":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKey.js","./_parent":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_parent.js","./isArguments":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArguments.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js","./isLength":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isLength.js","./isString":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isString.js","./last":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/last.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashDelete.js":[function(require,module,exports){
var hashHas = require('./_hashHas');

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(hash, key) {
  return hashHas(hash, key) && delete hash[key];
}

module.exports = hashDelete;

},{"./_hashHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashHas.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashGet.js":[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @param {Object} hash The hash to query.
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(hash, key) {
  if (nativeCreate) {
    var result = hash[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_nativeCreate.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashHas.js":[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @param {Object} hash The hash to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(hash, key) {
  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
}

module.exports = hashHas;

},{"./_nativeCreate":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_nativeCreate.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashSet.js":[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 */
function hashSet(hash, key, value) {
  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
}

module.exports = hashSet;

},{"./_nativeCreate":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_nativeCreate.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_indexKeys.js":[function(require,module,exports){
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isLength = require('./isLength'),
    isString = require('./isString');

/**
 * Creates an array of index keys for `object` values of arrays,
 * `arguments` objects, and strings, otherwise `null` is returned.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array|null} Returns index keys, else `null`.
 */
function indexKeys(object) {
  var length = object ? object.length : undefined;
  if (isLength(length) &&
      (isArray(object) || isString(object) || isArguments(object))) {
    return baseTimes(length, String);
  }
  return null;
}

module.exports = indexKeys;

},{"./_baseTimes":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseTimes.js","./isArguments":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArguments.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js","./isLength":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isLength.js","./isString":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isString.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_indexOfNaN.js":[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isHostObject.js":[function(require,module,exports){
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

module.exports = isHostObject;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIndex.js":[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIterateeCall.js":[function(require,module,exports){
var eq = require('./eq'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject');

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;

},{"./_isIndex":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIndex.js","./eq":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/eq.js","./isArrayLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLike.js","./isObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKey.js":[function(require,module,exports){
var isArray = require('./isArray');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (typeof value == 'number') {
    return true;
  }
  return !isArray(value) &&
    (reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object)));
}

module.exports = isKey;

},{"./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKeyable.js":[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'number' || type == 'boolean' ||
    (type == 'string' && value != '__proto__') || value == null;
}

module.exports = isKeyable;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isPrototype.js":[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isStrictComparable.js":[function(require,module,exports){
var isObject = require('./isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

},{"./isObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_iteratorToArray.js":[function(require,module,exports){
/**
 * Converts `iterator` to an array.
 *
 * @private
 * @param {Object} iterator The iterator to convert.
 * @returns {Array} Returns the converted array.
 */
function iteratorToArray(iterator) {
  var data,
      result = [];

  while (!(data = iterator.next()).done) {
    result.push(data.value);
  }
  return result;
}

module.exports = iteratorToArray;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapClear.js":[function(require,module,exports){
var Hash = require('./_Hash'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': Map ? new Map : [],
    'string': new Hash
  };
}

module.exports = mapClear;

},{"./_Hash":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Hash.js","./_Map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Map.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapDelete.js":[function(require,module,exports){
var Map = require('./_Map'),
    assocDelete = require('./_assocDelete'),
    hashDelete = require('./_hashDelete'),
    isKeyable = require('./_isKeyable');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapDelete(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
}

module.exports = mapDelete;

},{"./_Map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Map.js","./_assocDelete":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocDelete.js","./_hashDelete":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashDelete.js","./_isKeyable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKeyable.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapGet.js":[function(require,module,exports){
var Map = require('./_Map'),
    assocGet = require('./_assocGet'),
    hashGet = require('./_hashGet'),
    isKeyable = require('./_isKeyable');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapGet(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map.get(key) : assocGet(data.map, key);
}

module.exports = mapGet;

},{"./_Map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Map.js","./_assocGet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocGet.js","./_hashGet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashGet.js","./_isKeyable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKeyable.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapHas.js":[function(require,module,exports){
var Map = require('./_Map'),
    assocHas = require('./_assocHas'),
    hashHas = require('./_hashHas'),
    isKeyable = require('./_isKeyable');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapHas(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map.has(key) : assocHas(data.map, key);
}

module.exports = mapHas;

},{"./_Map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Map.js","./_assocHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocHas.js","./_hashHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashHas.js","./_isKeyable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKeyable.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapSet.js":[function(require,module,exports){
var Map = require('./_Map'),
    assocSet = require('./_assocSet'),
    hashSet = require('./_hashSet'),
    isKeyable = require('./_isKeyable');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache object.
 */
function mapSet(key, value) {
  var data = this.__data__;
  if (isKeyable(key)) {
    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
  } else if (Map) {
    data.map.set(key, value);
  } else {
    assocSet(data.map, key, value);
  }
  return this;
}

module.exports = mapSet;

},{"./_Map":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Map.js","./_assocSet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocSet.js","./_hashSet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hashSet.js","./_isKeyable":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKeyable.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_mapToArray.js":[function(require,module,exports){
/**
 * Converts `map` to an array.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the converted array.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_nativeCreate.js":[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getNative.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_parent.js":[function(require,module,exports){
var baseSlice = require('./_baseSlice'),
    get = require('./get');

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length == 1 ? object : get(object, baseSlice(path, 0, -1));
}

module.exports = parent;

},{"./_baseSlice":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseSlice.js","./get":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/get.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_root.js":[function(require,module,exports){
(function (global){
var checkGlobal = require('./_checkGlobal');

/** Used to determine if values are of the language type `Object`. */
var objectTypes = {
  'function': true,
  'object': true
};

/** Detect free variable `exports`. */
var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
  ? exports
  : undefined;

/** Detect free variable `module`. */
var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
  ? module
  : undefined;

/** Detect free variable `global` from Node.js. */
var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

/** Detect free variable `self`. */
var freeSelf = checkGlobal(objectTypes[typeof self] && self);

/** Detect free variable `window`. */
var freeWindow = checkGlobal(objectTypes[typeof window] && window);

/** Detect `this` as the global object. */
var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

/**
 * Used as a reference to the global object.
 *
 * The `this` value is used if it's the global object to avoid Greasemonkey's
 * restricted `window` object, otherwise the `window` object is used.
 */
var root = freeGlobal ||
  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
    freeSelf || thisGlobal || Function('return this')();

module.exports = root;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_checkGlobal":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_checkGlobal.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_setToArray.js":[function(require,module,exports){
/**
 * Converts `set` to an array.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the converted array.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackClear.js":[function(require,module,exports){
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = { 'array': [], 'map': null };
}

module.exports = stackClear;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackDelete.js":[function(require,module,exports){
var assocDelete = require('./_assocDelete');

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocDelete(array, key) : data.map['delete'](key);
}

module.exports = stackDelete;

},{"./_assocDelete":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocDelete.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackGet.js":[function(require,module,exports){
var assocGet = require('./_assocGet');

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocGet(array, key) : data.map.get(key);
}

module.exports = stackGet;

},{"./_assocGet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocGet.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackHas.js":[function(require,module,exports){
var assocHas = require('./_assocHas');

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocHas(array, key) : data.map.has(key);
}

module.exports = stackHas;

},{"./_assocHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocHas.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stackSet.js":[function(require,module,exports){
var MapCache = require('./_MapCache'),
    assocSet = require('./_assocSet');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache object.
 */
function stackSet(key, value) {
  var data = this.__data__,
      array = data.array;

  if (array) {
    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
      assocSet(array, key, value);
    } else {
      data.array = null;
      data.map = new MapCache(array);
    }
  }
  var map = data.map;
  if (map) {
    map.set(key, value);
  }
  return this;
}

module.exports = stackSet;

},{"./_MapCache":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_MapCache.js","./_assocSet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assocSet.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_stringToPath.js":[function(require,module,exports){
var toString = require('./toString');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
function stringToPath(string) {
  var result = [];
  toString(string).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
}

module.exports = stringToPath;

},{"./toString":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toString.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/assignIn.js":[function(require,module,exports){
var assignValue = require('./_assignValue'),
    copyObject = require('./_copyObject'),
    createAssigner = require('./_createAssigner'),
    isArrayLike = require('./isArrayLike'),
    isPrototype = require('./_isPrototype'),
    keysIn = require('./keysIn');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

/**
 * This method is like `_.assign` except that it iterates over own and
 * inherited source properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * function Bar() {
 *   this.d = 4;
 * }
 *
 * Foo.prototype.c = 3;
 * Bar.prototype.e = 5;
 *
 * _.assignIn({ 'a': 1 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5 }
 */
var assignIn = createAssigner(function(object, source) {
  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keysIn(source), object);
    return;
  }
  for (var key in source) {
    assignValue(object, key, source[key]);
  }
});

module.exports = assignIn;

},{"./_assignValue":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_assignValue.js","./_copyObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_copyObject.js","./_createAssigner":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_createAssigner.js","./_isPrototype":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isPrototype.js","./isArrayLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLike.js","./keysIn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keysIn.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/each.js":[function(require,module,exports){
module.exports = require('./forEach');

},{"./forEach":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/forEach.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/eq.js":[function(require,module,exports){
/**
 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/extend.js":[function(require,module,exports){
module.exports = require('./assignIn');

},{"./assignIn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/assignIn.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/filter.js":[function(require,module,exports){
var arrayFilter = require('./_arrayFilter'),
    baseFilter = require('./_baseFilter'),
    baseIteratee = require('./_baseIteratee'),
    isArray = require('./isArray');

/**
 * Iterates over elements of `collection`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three arguments:
 * (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @example
 *
 * var users = [
 *   { 'user': 'barney', 'age': 36, 'active': true },
 *   { 'user': 'fred',   'age': 40, 'active': false }
 * ];
 *
 * _.filter(users, function(o) { return !o.active; });
 * // => objects for ['fred']
 *
 * // The `_.matches` iteratee shorthand.
 * _.filter(users, { 'age': 36, 'active': true });
 * // => objects for ['barney']
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.filter(users, ['active', false]);
 * // => objects for ['fred']
 *
 * // The `_.property` iteratee shorthand.
 * _.filter(users, 'active');
 * // => objects for ['barney']
 */
function filter(collection, predicate) {
  var func = isArray(collection) ? arrayFilter : baseFilter;
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = filter;

},{"./_arrayFilter":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayFilter.js","./_baseFilter":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseFilter.js","./_baseIteratee":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIteratee.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/forEach.js":[function(require,module,exports){
var arrayEach = require('./_arrayEach'),
    baseCastFunction = require('./_baseCastFunction'),
    baseEach = require('./_baseEach'),
    isArray = require('./isArray');

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length" property
 * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
 * for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(value) {
 *   console.log(value);
 * });
 * // => logs `1` then `2`
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => logs 'a' then 'b' (iteration order is not guaranteed)
 */
function forEach(collection, iteratee) {
  return (typeof iteratee == 'function' && isArray(collection))
    ? arrayEach(collection, iteratee)
    : baseEach(collection, baseCastFunction(iteratee));
}

module.exports = forEach;

},{"./_arrayEach":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayEach.js","./_baseCastFunction":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseCastFunction.js","./_baseEach":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseEach.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/get.js":[function(require,module,exports){
var baseGet = require('./_baseGet');

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined` the `defaultValue` is used in its place.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

module.exports = get;

},{"./_baseGet":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseGet.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/hasIn.js":[function(require,module,exports){
var baseHasIn = require('./_baseHasIn'),
    hasPath = require('./_hasPath');

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b.c');
 * // => true
 *
 * _.hasIn(object, ['a', 'b', 'c']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return hasPath(object, path, baseHasIn);
}

module.exports = hasIn;

},{"./_baseHasIn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseHasIn.js","./_hasPath":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_hasPath.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/identity.js":[function(require,module,exports){
/**
 * This method returns the first argument given to it.
 *
 * @static
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArguments.js":[function(require,module,exports){
var isArrayLikeObject = require('./isArrayLikeObject');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

module.exports = isArguments;

},{"./isArrayLikeObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLikeObject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js":[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLike.js":[function(require,module,exports){
var getLength = require('./_getLength'),
    isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value)) && !isFunction(value);
}

module.exports = isArrayLike;

},{"./_getLength":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getLength.js","./isFunction":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isFunction.js","./isLength":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isLength.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLikeObject.js":[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

},{"./isArrayLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLike.js","./isObjectLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObjectLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isEmpty.js":[function(require,module,exports){
var isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLike = require('./isArrayLike'),
    isFunction = require('./isFunction'),
    isString = require('./isString');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if `value` is an empty collection or object. A value is considered
 * empty if it's an `arguments` object, array, string, or jQuery-like collection
 * with a length of `0` or has no own enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (isArrayLike(value) &&
      (isArray(value) || isString(value) ||
        isFunction(value.splice) || isArguments(value))) {
    return !value.length;
  }
  for (var key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  return true;
}

module.exports = isEmpty;

},{"./isArguments":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArguments.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js","./isArrayLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLike.js","./isFunction":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isFunction.js","./isString":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isString.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isFunction.js":[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

module.exports = isFunction;

},{"./isObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isLength.js":[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isMatch.js":[function(require,module,exports){
var baseIsMatch = require('./_baseIsMatch'),
    getMatchData = require('./_getMatchData');

/**
 * Performs a partial deep comparison between `object` and `source` to
 * determine if `object` contains equivalent property values. This method is
 * equivalent to a `_.matches` function when `source` is partially applied.
 *
 * **Note:** This method supports comparing the same values as `_.isEqual`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 * @example
 *
 * var object = { 'user': 'fred', 'age': 40 };
 *
 * _.isMatch(object, { 'age': 40 });
 * // => true
 *
 * _.isMatch(object, { 'age': 36 });
 * // => false
 */
function isMatch(object, source) {
  return object === source || baseIsMatch(object, source, getMatchData(source));
}

module.exports = isMatch;

},{"./_baseIsMatch":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIsMatch.js","./_getMatchData":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_getMatchData.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isNative.js":[function(require,module,exports){
var isFunction = require('./isFunction'),
    isHostObject = require('./_isHostObject'),
    isObjectLike = require('./isObjectLike');

/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(funcToString.call(value));
  }
  return isObjectLike(value) &&
    (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
}

module.exports = isNative;

},{"./_isHostObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isHostObject.js","./isFunction":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isFunction.js","./isObjectLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObjectLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObject.js":[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObjectLike.js":[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isString.js":[function(require,module,exports){
var isArray = require('./isArray'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

module.exports = isString;

},{"./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js","./isObjectLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObjectLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isSymbol.js":[function(require,module,exports){
var isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

module.exports = isSymbol;

},{"./isObjectLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObjectLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isTypedArray.js":[function(require,module,exports){
var isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

module.exports = isTypedArray;

},{"./isLength":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isLength.js","./isObjectLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObjectLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keys.js":[function(require,module,exports){
var baseHas = require('./_baseHas'),
    baseKeys = require('./_baseKeys'),
    indexKeys = require('./_indexKeys'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isPrototype = require('./_isPrototype');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  var isProto = isPrototype(object);
  if (!(isProto || isArrayLike(object))) {
    return baseKeys(object);
  }
  var indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  for (var key in object) {
    if (baseHas(object, key) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(isProto && key == 'constructor')) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"./_baseHas":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseHas.js","./_baseKeys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseKeys.js","./_indexKeys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_indexKeys.js","./_isIndex":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIndex.js","./_isPrototype":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isPrototype.js","./isArrayLike":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArrayLike.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keysIn.js":[function(require,module,exports){
var baseKeysIn = require('./_baseKeysIn'),
    indexKeys = require('./_indexKeys'),
    isIndex = require('./_isIndex'),
    isPrototype = require('./_isPrototype');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  var index = -1,
      isProto = isPrototype(object),
      props = baseKeysIn(object),
      propsLength = props.length,
      indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  while (++index < propsLength) {
    var key = props[index];
    if (!(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"./_baseKeysIn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseKeysIn.js","./_indexKeys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_indexKeys.js","./_isIndex":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIndex.js","./_isPrototype":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isPrototype.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/last.js":[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/omit.js":[function(require,module,exports){
var arrayMap = require('./_arrayMap'),
    baseDifference = require('./_baseDifference'),
    baseFlatten = require('./_baseFlatten'),
    basePick = require('./_basePick'),
    keysIn = require('./keysIn'),
    rest = require('./rest');

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable properties of `object` that are not omitted.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property names to omit, specified
 *  individually or in arrays.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.omit(object, ['a', 'c']);
 * // => { 'b': '2' }
 */
var omit = rest(function(object, props) {
  if (object == null) {
    return {};
  }
  props = arrayMap(baseFlatten(props, 1), String);
  return basePick(object, baseDifference(keysIn(object), props));
});

module.exports = omit;

},{"./_arrayMap":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arrayMap.js","./_baseDifference":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseDifference.js","./_baseFlatten":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseFlatten.js","./_basePick":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_basePick.js","./keysIn":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keysIn.js","./rest":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/rest.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/pick.js":[function(require,module,exports){
var baseFlatten = require('./_baseFlatten'),
    basePick = require('./_basePick'),
    rest = require('./rest');

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [props] The property names to pick, specified
 *  individually or in arrays.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = rest(function(object, props) {
  return object == null ? {} : basePick(object, baseFlatten(props, 1));
});

module.exports = pick;

},{"./_baseFlatten":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseFlatten.js","./_basePick":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_basePick.js","./rest":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/rest.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/property.js":[function(require,module,exports){
var baseProperty = require('./_baseProperty'),
    basePropertyDeep = require('./_basePropertyDeep'),
    isKey = require('./_isKey');

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': { 'c': 2 } } },
 *   { 'a': { 'b': { 'c': 1 } } }
 * ];
 *
 * _.map(objects, _.property('a.b.c'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
}

module.exports = property;

},{"./_baseProperty":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseProperty.js","./_basePropertyDeep":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_basePropertyDeep.js","./_isKey":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isKey.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/rest.js":[function(require,module,exports){
var apply = require('./_apply'),
    toInteger = require('./toInteger');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.rest(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function rest(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, array);
      case 1: return func.call(this, args[0], array);
      case 2: return func.call(this, args[0], args[1], array);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

module.exports = rest;

},{"./_apply":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_apply.js","./toInteger":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toInteger.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/some.js":[function(require,module,exports){
var arraySome = require('./_arraySome'),
    baseIteratee = require('./_baseIteratee'),
    baseSome = require('./_baseSome'),
    isArray = require('./isArray'),
    isIterateeCall = require('./_isIterateeCall');

/**
 * Checks if `predicate` returns truthy for **any** element of `collection`.
 * Iteration is stopped once `predicate` returns truthy. The predicate is
 * invoked with three arguments: (value, index|key, collection).
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
 * @param- {Object} [guard] Enables use as an iteratee for functions like `_.map`.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
 * @example
 *
 * _.some([null, 0, 'yes', false], Boolean);
 * // => true
 *
 * var users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ];
 *
 * // The `_.matches` iteratee shorthand.
 * _.some(users, { 'user': 'barney', 'active': false });
 * // => false
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.some(users, ['active', false]);
 * // => true
 *
 * // The `_.property` iteratee shorthand.
 * _.some(users, 'active');
 * // => true
 */
function some(collection, predicate, guard) {
  var func = isArray(collection) ? arraySome : baseSome;
  if (guard && isIterateeCall(collection, predicate, guard)) {
    predicate = undefined;
  }
  return func(collection, baseIteratee(predicate, 3));
}

module.exports = some;

},{"./_arraySome":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_arraySome.js","./_baseIteratee":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseIteratee.js","./_baseSome":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseSome.js","./_isIterateeCall":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_isIterateeCall.js","./isArray":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isArray.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toInteger.js":[function(require,module,exports){
var toNumber = require('./toNumber');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to an integer.
 *
 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3');
 * // => 3
 */
function toInteger(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  var remainder = value % 1;
  return value === value ? (remainder ? value - remainder : value) : 0;
}

module.exports = toInteger;

},{"./toNumber":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toNumber.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toNumber.js":[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObject = require('./isObject');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3);
 * // => 3
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3');
 * // => 3
 */
function toNumber(value) {
  if (isObject(value)) {
    var other = isFunction(value.valueOf) ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isFunction":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isFunction.js","./isObject":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isObject.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toPairs.js":[function(require,module,exports){
var baseToPairs = require('./_baseToPairs'),
    keys = require('./keys');

/**
 * Creates an array of own enumerable key-value pairs for `object` which
 * can be consumed by `_.fromPairs`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the new array of key-value pairs.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.toPairs(new Foo);
 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
 */
function toPairs(object) {
  return baseToPairs(object, keys(object));
}

module.exports = toPairs;

},{"./_baseToPairs":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseToPairs.js","./keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keys.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/toString.js":[function(require,module,exports){
var Symbol = require('./_Symbol'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (value == null) {
    return '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

module.exports = toString;

},{"./_Symbol":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_Symbol.js","./isSymbol":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/isSymbol.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/values.js":[function(require,module,exports){
var baseValues = require('./_baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return object ? baseValues(object, keys(object)) : [];
}

module.exports = values;

},{"./_baseValues":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/_baseValues.js","./keys":"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/lodash/keys.js"}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/ms/index.js":[function(require,module,exports){
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

},{}],"/Users/eric/Development/feathersjs/feathers-localstorage/node_modules/process/browser.js":[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

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
    key: 'create',
    value: function create() {
      var _this5 = this;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this.execute.apply(this, ['create'].concat(args)).then(function (data) {
        return _this5.flush(data);
      });
    }
  }, {
    key: 'patch',
    value: function patch() {
      var _this6 = this;

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this.execute.apply(this, ['patch'].concat(args)).then(function (data) {
        return _this6.flush(data);
      });
    }
  }, {
    key: 'update',
    value: function update() {
      var _this7 = this;

      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return this.execute.apply(this, ['update'].concat(args)).then(function (data) {
        return _this7.flush(data);
      });
    }
  }, {
    key: 'remove',
    value: function remove() {
      var _this8 = this;

      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
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