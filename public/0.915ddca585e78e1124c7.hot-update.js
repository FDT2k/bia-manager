self["webpackHotUpdate"](0,[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _karsegard_composite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _karsegard_composite_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_karsegard_composite_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _karsegard_composite_js_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _karsegard_composite_js_ObjectUtils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_karsegard_composite_js_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof$1(obj) {
      return typeof obj;
    };
  } else {
    _typeof$1 = function _typeof$1(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof$1(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
/**
 * Compose several unary function into one function. Execution is done from right to left
 *
 * @func
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 */


var compose = function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
};
/**
 * Compose several unary function into one function. Execution is done left to right
 *
 * @func
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 */


var pipe = function pipe() {
  for (var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    funcs[_key2] = arguments[_key2];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return b(a.apply(void 0, arguments));
    };
  });
};
/**
* The core of curry
*
* @func
* @category Function
* @sig Function -> Number -> Function -> ...Arguments -> Function
* @param {Function}
* @param {Integer}
* @param {Function}
* @param {...Any}
* @return {Function}

*/


var callCurry = function callCurry(namedCurryFunction) {
  return function (arity) {
    return function (fn) {
      return function () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        if (args.length < arity) {
          return namedCurryFunction.bind.apply(namedCurryFunction, [null].concat(args));
        }

        return fn.call.apply(fn, [null].concat(args));
      };
    };
  };
};
/**
 * Curryify a function. Allow the function to be called with less parameters that it needs and return a function with the
 * remaining parameters
 *
 * @func
 * @category Function
 * @sig ((a, b, ...) -> c) -> a -> b -> ... -> c
 * @param {Function} function the function to currify
 * @return {Function}
 */


var curry = function curry(fn) {
  var arity = fn.length;
  return function $curry() {
    return callCurry($curry)(arity)(fn).apply(void 0, arguments);
  };
}; // curry that allow empty args


var curryNull = function curryNull(fn) {
  var arity = fn.length;
  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    var idx = 0;
    var prevArgs = [];

    var curr = function $curryNull() {
      if (prevArgs.length === 0 && idx === 0) {
        // never called
        if (args.length == 0) args = [null];
        idx += args.length;
        console.log('first call', 'new idx = ', idx, 'remaining', arity - prevArgs.length - args.length);
      }

      if (prevArgs.length > 0) {
        if (args.length == 0 && prevArgs.length + 1 <= arity) {
          args.push(null);
        }
      }

      console.log('call', 'new idx = ', idx, 'remaining', arity - prevArgs.length - args.length, prevArgs);
      return callCurry($curryNull)(arity)(fn).apply(void 0, _toConsumableArray(args));
    };

    var res = curr();
    prevArgs = [].concat(_toConsumableArray(prevArgs), _toConsumableArray(args));
    return res;
  };
}; // curryN :: ((a, b, ...),(a, b, ...)) ->(a, b, ...) -> c) -> a -> b -> ... -> c

/**
 *   Generating a N-arity curry from another non-variadic defined Function.
 *
 *   Idea to help composing variadics
 *
 *
 * @func
 * @category Function
 * @sig ((a, b, ...) -> c) -> a -> b -> ... -> c
 * @param {Function} funcWithArgs the function to take args from
 * @param {Function} variadicFunc the variadic function to currify
 * @return {Function}
 * @see curry
 */


var curryN = function curryN(fn, callFn) {
  var arity = fn.length;
  return function $curryN() {
    return callCurry($curryN)(arity)(callFn).apply(void 0, arguments);
  };
};
/**
 * Generating a curry with a static arity while calling another function
 *
 * @func
 * @category Function
 * @sig ((a, b, ...) -> c) -> a -> b -> ... -> c
 * @param {Integer} arity The arity
 * @param {Function} variadicFunc the variadic function to currify
 * @return {Function}
 * @see curry
 */


var curryX = function curryX(_arity, fn) {
  var arity = _arity;
  return function $curryX() {
    return callCurry($curryX)(arity)(fn).apply(void 0, arguments);
  };
};
/**
 * Returns a function that accept one argument. The argument  will be passed to every function in parameter and given back as an array
 * AKA. Parallelized composition. I'm not even sure this is a thing.
 * It's a mix between compose and spec
 *
 * @func
 * @category Function
 * @sig ((a->b),(a->c),...,(a->z)) => x => [b(x),c(x),...,z(x)]
 * @param {...Functions} functions the functions to diverge
 * @return {Function}
 * @see compose
 * @example
 *
 * let fn1 = compose (uppercase,prop('key'))
 * let fn2 = compose (reverse,prop('another_key'))
 * let fn3 = diverge (fn1,fn2);
 * fn3 ( {'key':'foo', 'another_key':'bar'})
 * //  ['rab','FOO']
 *
 * diverge (fnA,fnB)(x) == [ fnA(x) , fnB(x) ]
 *
 */


var diverge = function diverge() {
  for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }

  return function (x) {
    return args.map(function (arg) {
      return arg(x);
    });
  };
};
/**
 * compose a diverge with another function
 *
 * @func
 * @category Function
 * @sig
 * @param {Functions} function to compose
 * @param {...Functions} functions the function to diverge
 * @return {Function}
 * @see compose
 * @see diverge
 * @example
 *
 * let upKey =  key=> compose(asProp(key),uppercase,prop(key))
 * let lowKey =  key=> compose(asProp(key),lowercase,prop(key))
 * let merge = divergeThen(mergeAll)
 * let normalize = merge (upKey('firstname'),lowKey('lastname'))
 * normalize({firstname:'Bob',lastname:'Doe'})
 * // {firstname:'BOB',lastname:'doe'}
 *
 */


var divergeThen = function divergeThen(z) {
  return function () {
    return compose(z, diverge.apply(void 0, arguments));
  };
}; // identity :: a -> a

/**
 * Identity function
 *
 * @func
 * @category Function
 * @sig
 * @param {Any}
 * @return {Any}
 * @see compose
 * @see diverge
 *
 */


var identity = function identity(x) {
  return x;
}; // flip :: ((a,b)->c)  -> a -> b -> (b,a) -> c
// flip :: (a -> b -> c) -> b -> a -> c

/**
 * flip two arguments of a function
 *
 * @func
 * @category Function
 * @sig ( FN -> b -> c)  ->
 * @param {Function}
 * @return {Curry}
 * @see compose
 * @see curry
 *
 */


var flip = curry(function (fn, a, b) {
  return fn(b, a);
}); // map :: fn f => (a -> b) -> f a -> f b
// map :: Functor f => (a -> b) -> f a -> f b

var map = curry(function (fn, f) {
  return f.map(fn);
}); // join :: Monad m => m (m a) -> m a

var join = function join(m) {
  return m.join();
}; // chain :: Monad m => (a -> m b) -> m a -> m b


var chain = function chain(f) {
  return compose(join, map(f));
}; // maybe :: b -> (a -> b) -> Maybe a -> b


var maybe = curry(function (value, fn, functor) {
  if (functor.isNothing) {
    return value;
  }

  return fn(functor.$value);
}); // curry that allow empty args

/*export const curryNull = (fn)=>{
  const arity = fn.length;
  return (...args)=>{
    let idx = 0;
    let prevArgs = null
    let curr =  function $curryNull() {

      console.log(prevArgs,args,idx,arity)

      if(prevArgs == null ){ // never called
        if(args.length == 0)
          args = [null]
        idx += args.length
      }


      if(prevArgs != null){
        if(args.length < arity){
          args.push(null)
        }
      }


      return callCurry($curryNull)(arity)(fn)(...args)

    }
    let res = curr()
    prevArgs = args

    return res;
  }
}
*/

function make_curry(arity) {
  return function $curry() {
    var _fn;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length < arity) {
      return $curry.bind.apply($curry, [null].concat(args));
    }

    return (_fn = fn).call.apply(_fn, [null].concat(args));
  };
}
/*
pipe

let piped = pipe(funca,funcb,funcc )

is the same as

piped = ()=>funcc(funcb(funca()))

 all arguments are passed through

let piped = pipeA(middleware1,middleware2,final_function)

piped('name','lastname','age')

*/


var pipeA = function pipeA() {
  for (var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    funcs[_key2] = arguments[_key2];
  }

  if (funcs.length === 0) {
    return function () {
      for (var _len3 = arguments.length, arg = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        arg[_key3] = arguments[_key3];
      }

      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return b.apply(void 0, _toConsumableArray(a.apply(void 0, arguments)));
    };
  });
};
/*compose
Reverse of pipe

let composed = compose(
                  funca,
                  funcb,
                  funcc
                )

is the same as funca(funcb(funcc(...args)))
initially from redux,
The behavior has been altered for 0 parameter and to call all parameters
*/


var composeA = function composeA() {
  for (var _len4 = arguments.length, funcs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    funcs[_key4] = arguments[_key4];
  }

  if (funcs.length === 0) {
    return function () {
      for (var _len5 = arguments.length, arg = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        arg[_key5] = arguments[_key5];
      }

      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a.apply(void 0, _toConsumableArray(b.apply(void 0, arguments)));
    };
  });
};
/*
Kind of supercompose. Apply Fn to each item in ...fns

configure :: Fn(x(a),x(b),x(c),...,x(z)) -> a -> z  ==  Fn(x)(a,b,c,...,z) -> a -> z
*/


var distribute = function distribute(z) {
  return function (fn) {
    return function () {
      for (var _len6 = arguments.length, funcs = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        funcs[_key6] = arguments[_key6];
      }

      return z.apply(void 0, _toConsumableArray(funcs.map(function (x) {
        return fn(x);
      })));
    };
  };
};

var Maybe = /*#__PURE__*/function () {
  function Maybe(x) {
    _classCallCheck(this, Maybe);

    this.$value = x;
  }
  /*[util.inspect.custom]() {
    return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`;
  }*/
  // ----- Pointed Maybe


  _createClass(Maybe, [{
    key: "isNothing",
    get: function get() {
      return this.$value === null || this.$value === undefined;
    }
  }, {
    key: "isJust",
    get: function get() {
      return !this.isNothing;
    }
  }, {
    key: "map",
    value: // ----- Functor Maybe
    function map(fn) {
      return this.isNothing ? this : Maybe.of(fn(this.$value));
    } // ----- Applicative Maybe

  }, {
    key: "ap",
    value: function ap(f) {
      return this.isNothing ? this : f.map(this.$value);
    } // ----- Monad Maybe

  }, {
    key: "chain",
    value: function chain(fn) {
      return this.map(fn).join();
    }
  }, {
    key: "join",
    value: function join() {
      return this.isNothing ? this : this.$value;
    } // ----- Traversable Maybe

  }, {
    key: "sequence",
    value: function sequence(of) {
      return this.traverse(of, identity);
    }
  }, {
    key: "traverse",
    value: function traverse(of, fn) {
      return this.isNothing ? of(this) : fn(this.$value).map(Maybe.of);
    }
  }], [{
    key: "of",
    value: function of(x) {
      return new Maybe(x);
    }
  }]);

  return Maybe;
}();

var trace = curry(function (tag, value) {
  console.log(tag, value);
  return value;
});
var trace_keys = curry(function (tag, value) {
  console.log(tag, Object.keys(value));
  return value;
});
var supertrace = curry(function (prefix, tag, value) {
  return trace(prefix + ' ' + tag, value);
});
var trace_prop = curry(function (tag, prop, value) {
  console.log(tag, value[prop]);
  return value;
});
/*holds execution if inspector enabled*/

var debug_trace = function debug_trace(x) {
  debugger;
  return x;
};

var inspect = console.log; //export const empty = string=> string.length==0;
// BOOL => BOOL
//export const notEmpty = compose(not,empty)

var not = function not(x) {
  return !x;
};

var _OR_ = curry(function (a, b, x) {
  return a(x) || b(x);
});

var _AND_ = curry(function (a, b, x) {
  return a(x) && b(x);
});

var _NOT_ = curry(function (a, x) {
  return !a(x);
}); //export const isStrictlyEqual = curry((value,item)=> value===item)


var isStrictlyEqual = curry(function (value, item) {
  return value === item;
});

var isStrictlyNotEqual = function isStrictlyNotEqual(value) {
  return compose(not, isStrictlyEqual(value));
};

var _typeof = function _typeof(value) {
  return _typeof$1(value);
};

var is_type = function is_type(val) {
  return compose(isStrictlyEqual(val), _typeof);
};

var is_type_object = function is_type_object(x) {
  return is_type('object')(x) && x !== null && !is_array(x);
};

var is_type_string = is_type('string');
var is_type_function = is_type('function');
var is_type_number = is_type('number');
var is_undefined = is_type('undefined');

var isNull = function isNull(x) {
  return x === null;
};

var is_array = function is_array(o) {
  return Array.isArray(o);
}; // a -> Bool


var is_type_bool = is_type('boolean');

var is_error = function is_error(x) {
  return x instanceof Error;
};

var isNil = _OR_(isNull, is_undefined);

var is_nil = isNil; //fucky number test in js can suck on this shit ..!..

var is_nan = Number.isNaN;

var is_numeric = function is_numeric(v) {
  return not(is_nan(v)) && is_type_number(v);
};

var is_type_scalar = function is_type_scalar(o) {
  return is_type_string(o) || is_type_number(o) || is_type_bool(o);
}; // default a value to something if null || undefined -> cf. Maybe


var defaultTo = function defaultTo(val) {
  return compose(maybe(val, identity), Maybe.of);
};
/*
  if(cond is met, return right else return left)
*/


var either = curry(function (cond, left, right, val) {
  return cond(val) ? right(val) : left(val);
});
var eitherUndefined = either(is_undefined);

var _throw = function _throw(x) {
  return function (val) {
    throw new Error(x);
  };
}; //interrupt everything


var eitherThrow = curry(function (cond, error) {
  return either(cond, _throw(error), identity);
});
var tryCatcher = curry(function (catcher, tryer, arg) {
  try {
    return tryer(arg);
  } catch (err) {
    return catcher(arg, err);
  }
});
var assign2 = curry(function (x, y) {
  return Object.assign({}, x, y);
});

var _merge = curry(function (a, b) {
  return assign2(a, b);
});

var merge = _merge;
var prop = curry(function (prop, obj) {
  return obj[prop];
});

var keys = function keys(o) {
  return Object.keys(o);
}; // String => Object => Object


var omit_key = curry(function (_omit, obj) {
  var o = {};
  Object.keys(obj).map(function (key) {
    if (key !== _omit) {
      o[key] = obj[key];
    }
  });
  return o;
}); // String => Object => Object

var omit_keys = curry(function (_omit, obj) {
  var o = {};
  Object.keys(obj).map(function (key) {
    if (_omit.indexOf(key) === -1) {
      o[key] = obj[key];
    }
  });
  return o;
});
var filter_keys = curry(function (fn, obj) {
  var o = {};
  map(either(fn, identity, function (k) {
    return o[k] = obj[k];
  }), keys(obj));
  return o;
});
var ensure_object_copy = assign2({});
/*
  String -> String -> Object -> Object
*/

var as_object_prop = curry(function (key, value, object) {
  var o = _objectSpread2({}, object);

  o[key] = value;
  return o;
}); //  a -> b -> Object

var as_prop = curry(function (key, value) {
  return flip(as_object_prop(key), defaultTo({}), value);
});
/*
 Spec
  for a given object for which values are function  returns a new object with

  {
    x: fn(a,b),
    y: fn(a,b,c),
  }

  spec(obj,a)
  => {
    x: fn(a,b)(a)
    y: fn(a,b,c)(a)
  }

*/
//Object -> List

var enlist = curry(function (obj) {
  return pipe(keys, map(function (x) {
    return as_prop(x, obj[x]);
  }))(obj);
});

var colorSet8 = function colorSet8(_) {
  return {
    black: "\x1B[30m",
    red: "\x1B[31m",
    green: "\x1B[32m",
    yellow: "\x1B[33m",
    blue: "\x1B[34m",
    magenta: "\x1B[35m",
    cyan: "\x1B[36m",
    white: "\x1B[37m",
    reset: "\x1B[0m"
  };
};

var colorSetBackground8 = function colorSetBackground8(_) {
  return {
    black: "\x1B[40m",
    red: "\x1B[41m",
    green: "\x1B[42m",
    yellow: "\x1B[43m",
    blue: "\x1B[44m",
    magenta: "\x1B[45m",
    cyan: "\x1B[46m",
    white: "\x1B[47m",
    reset: "\x1B[0m"
  };
};

var colorSet16 = function colorSet16(_) {
  return _objectSpread2(_objectSpread2({}, colorSet8), {}, {
    brightBlack: "\x1B[30;1m",
    brightRed: "\x1B[31;1m",
    brightGreen: "\x1B[32;1m",
    brightYellow: "\x1B[33;1m",
    brightBlue: "\x1B[34;1m",
    brightMagenta: "\x1B[35;1m",
    brightCyan: "\x1B[36;1m",
    brightWhite: "\x1B[37;1m"
  });
};

var colorSetBackground16 = function colorSetBackground16(_) {
  return _objectSpread2(_objectSpread2({}, backgroundColorSet8), {}, {
    brightBlack: "\x1B[40;1m",
    brightRed: "\x1B[41;1m",
    brightGreen: "\x1B[42;1m",
    brightYellow: "\x1B[43;1m",
    brightBlue: "\x1B[44;1m",
    brightMagenta: "\x1B[45;1m",
    brightCyan: "\x1B[46;1m",
    brightWhite: "\x1B[47;1m"
  });
};

var generateAll256Colors = function generateAll256Colors(_) {
  return j;
};

var replace = curry(function (re, rpl, str) {
  return str.replace(re, rpl);
}); // test :: RegEx -> String -> Boolean

var test = curry(function (re, str) {
  return re.test(str);
}); // match :: Regex -> String -> List

var match = curry(function (re, str) {
  return str.match(re);
});

var regex = function regex(str) {
  return new RegExp(str);
}; // concat :: String -> String


var concat = curry(function (a, b) {
  return a.concat(b);
}); // append :: String -> String

var append = flip(concat); // length :: String -> Number

var length = function length(str) {
  return str.length;
};

var split = curry(function (sep, str) {
  return str.split(sep);
});

var lcase = function lcase(string) {
  return string.toLowerCase();
};

var ucase = function ucase(string) {
  return string.toUpperCase();
};

var repeat = curry(function (times, string) {
  return string.repeat(times);
});

var trim = function trim(string) {
  return string.trim();
};

var lcfirst = function lcfirst(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

var ucfirst = function ucfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

var isCapitalLetter = function isCapitalLetter(_char) {
  return _char.charCodeAt(0) >= 65 && _char.charCodeAt(0) <= 90;
};

var isLowerCaseLetter = function isLowerCaseLetter(_char2) {
  return _char2.charCodeAt(0) >= 97 && _char2.charCodeAt(0) <= 122;
};

var substract = curry(function (a, b) {
  return a - b;
});
var decrement = flip(substract)(1);

var flatten = function flatten(a) {
  return [].concat.apply([], a);
};

var joinList = curry(function (sep, array) {
  return array.join(sep);
}); //Function -> List -> List

var filter = curry(function (fn, array) {
  return array.filter(fn);
}); // a -> Function -> List -> a

var reduce = curry(function (initial_value, reducer, array) {
  return array.reduce(reducer, initial_value);
}); // Function -> List -> Number

var findIndex = curry(function (fn, array) {
  return array.findIndex(fn);
}); // value => List => Number

var findIndexEqual = compose(findIndex, isStrictlyEqual); // value => List => Number

var findIndexNotEqual = compose(findIndex, isStrictlyNotEqual); // value => List => List

var filterNotEqual = compose(filter, isStrictlyNotEqual); // value => List => List

var filterEqual = compose(filter, isStrictlyEqual);
var indexOf = curry(function (v, a) {
  return a.indexOf(v);
}); // reduce an array of subObjects to a merged object of all subObjects

var reduceToObject = reduce({}, merge);
var divergeThenReduce = divergeThen(reduceToObject);
/*Recursively call a Curried FN  with each array item of args

same as  spreading args fn (...args)

spread(fn)(args) == fn(...args)
*/
//spread :: fn -> [a,b,c...] -> fn(a,b,c,...)

var spread = curry(function (fn, args) {
  return reduce(fn, function (_fn, arg) {
    return _fn(arg);
  }, args);
}); // apply result of fn on the group
// ObjectReducer
// groupListByKey :: Object -> item -> Object

var groupListByKey = function groupListByKey(key) {
  return curry(function (result, item) {
    if (typeof result[item[key]] === 'undefined') result[item[key]] = [];
    result[item[key]].push(item);
    return result;
  });
};

var listLength = function listLength(arr) {
  return arr.length;
};

var tail = function tail(arr) {
  return arr.slice(1);
};

var head = function head(arr) {
  return arr[0];
};

var listIndex = function listIndex(arr) {
  return function (index) {
    return arr[index];
  };
};

var last = function last(arr) {
  return compose(listIndex(arr), decrement, listLength);
};

var slice = curry(function (x, a) {
  return a.slice(x);
});
var range = curry(function (start, length, a) {
  return a.slice(start, length);
});

var reverse = function reverse(a) {
  return slice(0, a).reverse();
};

var safeTail = defaultTo([])(tail);
var safeHead = defaultTo(null)(head); // ReduceListToObject:: ObjectReducer => key => Object => Object
//export const reduceListToObject = objectReducer => key => c.compose(as_prop(key),c.reduce({},objectReducer))

var reduceListByKey = function reduceListByKey(key) {
  return reduce({}, groupListByKey(key));
}; //shuffle [a] -> [a]


var shuffle = function shuffle(arr) {
  var res = _toConsumableArray(arr);

  var ctr = res.length;
  var temp;
  var index;

  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = res[ctr];
    res[ctr] = res[index];
    res[index] = temp;
  }

  return res;
}; // reduceListByKey :: [a] -> [{a,b,c}] -> {a:{a,b}}


var reduceListByKeys = curry(function (_keys, list) {
  if (_keys.length == 0) return list;
  var h = head(_keys);
  var rest = safeTail(_keys);
  var res = reduceListByKey(h)(list);

  for (var key in res) {
    res[key] = reduceListByKeys(rest)(res[key]);
  }

  return res;
});

var groupByKey = function groupByKey(key) {
  return curry(function (result, item) {
    result[item[key]] = item;
    return result;
  });
};

var sort = curry(function (fn, array) {
  return array.sort(fn);
});

var _sortAsc = curry(function (fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});

var _sortDesc = curry(function (fn, a, b) {
  return _sortAsc(fn, b, a);
});

var _sortBy = curry(function (_sort, fn, array) {
  return slice(0, array).sort(_sort(fn));
});

var sortByA = _sortBy(_sortAsc);

var sortByD = _sortBy(_sortDesc);

var sortBy = sortByA;
var sortAsCaseInsensitive = lcase;

var sortAsKeyCaseInsensitive = function sortAsKeyCaseInsensitive(key) {
  return compose(lcase, prop(key));
};

var sortAsKeyNumberFloat = function sortAsKeyNumberFloat(key) {
  return compose(parseFloat, prop(key));
};

var safe_push = curry(function (array, item) {
  return [].concat(_toConsumableArray(array), [item]);
});
var safe_stack = curry(function (array, item) {
  return [item].concat(_toConsumableArray(array));
});
exports._AND_ = _AND_;
exports._NOT_ = _NOT_;
exports._OR_ = _OR_;
exports._merge = _merge;
exports._sortAsc = _sortAsc;
exports._sortBy = _sortBy;
exports._sortDesc = _sortDesc;
exports._throw = _throw;
exports._typeof = _typeof;
exports.append = append;
exports.as_object_prop = as_object_prop;
exports.as_prop = as_prop;
exports.assign2 = assign2;
exports.chain = chain;
exports.colorSet16 = colorSet16;
exports.colorSet8 = colorSet8;
exports.colorSetBackground16 = colorSetBackground16;
exports.colorSetBackground8 = colorSetBackground8;
exports.compose = compose;
exports.composeA = composeA;
exports.concat = concat;
exports.curry = curry;
exports.curryN = curryN;
exports.curryNull = curryNull;
exports.curryX = curryX;
exports.debug_trace = debug_trace;
exports.defaultTo = defaultTo;
exports.distribute = distribute;
exports.diverge = diverge;
exports.divergeThen = divergeThen;
exports.divergeThenReduce = divergeThenReduce;
exports.either = either;
exports.eitherThrow = eitherThrow;
exports.eitherUndefined = eitherUndefined;
exports.enlist = enlist;
exports.ensure_object_copy = ensure_object_copy;
exports.filter = filter;
exports.filterEqual = filterEqual;
exports.filterNotEqual = filterNotEqual;
exports.filter_keys = filter_keys;
exports.findIndex = findIndex;
exports.findIndexEqual = findIndexEqual;
exports.findIndexNotEqual = findIndexNotEqual;
exports.flatten = flatten;
exports.flip = flip;
exports.generateAll256Colors = generateAll256Colors;
exports.groupByKey = groupByKey;
exports.groupListByKey = groupListByKey;
exports.head = head;
exports.identity = identity;
exports.indexOf = indexOf;
exports.inspect = inspect;
exports.isCapitalLetter = isCapitalLetter;
exports.isLowerCaseLetter = isLowerCaseLetter;
exports.isNil = isNil;
exports.isNull = isNull;
exports.isStrictlyEqual = isStrictlyEqual;
exports.isStrictlyNotEqual = isStrictlyNotEqual;
exports.is_array = is_array;
exports.is_error = is_error;
exports.is_nan = is_nan;
exports.is_nil = is_nil;
exports.is_numeric = is_numeric;
exports.is_type = is_type;
exports.is_type_bool = is_type_bool;
exports.is_type_function = is_type_function;
exports.is_type_number = is_type_number;
exports.is_type_object = is_type_object;
exports.is_type_scalar = is_type_scalar;
exports.is_type_string = is_type_string;
exports.is_undefined = is_undefined;
exports.join = join;
exports.joinList = joinList;
exports.keys = keys;
exports.last = last;
exports.lcase = lcase;
exports.lcfirst = lcfirst;
exports.length = length;
exports.listIndex = listIndex;
exports.listLength = listLength;
exports.make_curry = make_curry;
exports.map = map;
exports.match = match;
exports.maybe = maybe;
exports.merge = merge;
exports.not = not;
exports.omit_key = omit_key;
exports.omit_keys = omit_keys;
exports.pipe = pipe;
exports.pipeA = pipeA;
exports.prop = prop;
exports.range = range;
exports.reduce = reduce;
exports.reduceListByKey = reduceListByKey;
exports.reduceListByKeys = reduceListByKeys;
exports.reduceToObject = reduceToObject;
exports.regex = regex;
exports.repeat = repeat;
exports.replace = replace;
exports.reverse = reverse;
exports.safeHead = safeHead;
exports.safeTail = safeTail;
exports.safe_push = safe_push;
exports.safe_stack = safe_stack;
exports.shuffle = shuffle;
exports.slice = slice;
exports.sort = sort;
exports.sortAsCaseInsensitive = sortAsCaseInsensitive;
exports.sortAsKeyCaseInsensitive = sortAsKeyCaseInsensitive;
exports.sortAsKeyNumberFloat = sortAsKeyNumberFloat;
exports.sortBy = sortBy;
exports.sortByA = sortByA;
exports.sortByD = sortByD;
exports.split = split;
exports.spread = spread;
exports.supertrace = supertrace;
exports.tail = tail;
exports.test = test;
exports.trace = trace;
exports.trace_keys = trace_keys;
exports.trace_prop = trace_prop;
exports.trim = trim;
exports.tryCatcher = tryCatcher;
exports.ucase = ucase;
exports.ucfirst = ucfirst;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof$1(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof$1 = function _typeof$1(obj) {
      return typeof obj;
    };
  } else {
    _typeof$1 = function _typeof$1(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof$1(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
/**
 * Compose several unary function into one function. Execution is done from right to left
 *
 * @func
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 */


var compose = function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
};
/**
 * Compose several unary function into one function. Execution is done left to right
 *
 * @func
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 */


var pipe = function pipe() {
  for (var _len2 = arguments.length, funcs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    funcs[_key2] = arguments[_key2];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return b(a.apply(void 0, arguments));
    };
  });
};
/**
* The core of curry
*
* @func
* @category Function
* @sig Function -> Number -> Function -> ...Arguments -> Function
* @param {Function}
* @param {Integer}
* @param {Function}
* @param {...Any}
* @return {Function}

*/


var callCurry = function callCurry(namedCurryFunction) {
  return function (arity) {
    return function (fn) {
      return function () {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        if (args.length < arity) {
          return namedCurryFunction.bind.apply(namedCurryFunction, [null].concat(args));
        }

        return fn.call.apply(fn, [null].concat(args));
      };
    };
  };
};
/**
 * Curryify a function. Allow the function to be called with less parameters that it needs and return a function with the
 * remaining parameters
 *
 * @func
 * @category Function
 * @sig ((a, b, ...) -> c) -> a -> b -> ... -> c
 * @param {Function} function the function to currify
 * @return {Function}
 */


var curry = function curry(fn) {
  var arity = fn.length;
  return function $curry() {
    return callCurry($curry)(arity)(fn).apply(void 0, arguments);
  };
}; // curry that allow empty args

/**
 * Returns a function that accept one argument. The argument  will be passed to every function in parameter and given back as an array
 * AKA. Parallelized composition. I'm not even sure this is a thing.
 * It's a mix between compose and spec
 *
 * @func
 * @category Function
 * @sig ((a->b),(a->c),...,(a->z)) => x => [b(x),c(x),...,z(x)]
 * @param {...Functions} functions the functions to diverge
 * @return {Function}
 * @see compose
 * @example
 *
 * let fn1 = compose (uppercase,prop('key'))
 * let fn2 = compose (reverse,prop('another_key'))
 * let fn3 = diverge (fn1,fn2);
 * fn3 ( {'key':'foo', 'another_key':'bar'})
 * //  ['rab','FOO']
 *
 * diverge (fnA,fnB)(x) == [ fnA(x) , fnB(x) ]
 *
 */


var diverge = function diverge() {
  for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
    args[_key5] = arguments[_key5];
  }

  return function (x) {
    return args.map(function (arg) {
      return arg(x);
    });
  };
};
/**
 * Identity function
 *
 * @func
 * @category Function
 * @sig
 * @param {Any}
 * @return {Any}
 * @see compose
 * @see diverge
 *
 */


var identity = function identity(x) {
  return x;
}; // flip :: ((a,b)->c)  -> a -> b -> (b,a) -> c
// flip :: (a -> b -> c) -> b -> a -> c

/**
 * flip two arguments of a function
 *
 * @func
 * @category Function
 * @sig ( FN -> b -> c)  ->
 * @param {Function}
 * @return {Curry}
 * @see compose
 * @see curry
 *
 */


var flip = curry(function (fn, a, b) {
  return fn(b, a);
}); // map :: fn f => (a -> b) -> f a -> f b
// map :: Functor f => (a -> b) -> f a -> f b

var map = curry(function (fn, f) {
  return f.map(fn);
}); // join :: Monad m => m (m a) -> m a

var maybe = curry(function (value, fn, functor) {
  if (functor.isNothing) {
    return value;
  }

  return fn(functor.$value);
});
curry(function (re, rpl, str) {
  return str.replace(re, rpl);
}); // test :: RegEx -> String -> Boolean

var test = curry(function (re, str) {
  return re.test(str);
}); // match :: Regex -> String -> List

curry(function (re, str) {
  return str.match(re);
});
var concat = curry(function (a, b) {
  return a.concat(b);
}); // append :: String -> String

flip(concat); // length :: String -> Number

curry(function (sep, str) {
  return str.split(sep);
});
curry(function (times, string) {
  return string.repeat(times);
});
var trace = curry(function (tag, value) {
  console.log(tag, value);
  return value;
});
curry(function (tag, value) {
  console.log(tag, Object.keys(value));
  return value;
});
curry(function (prefix, tag, value) {
  return trace(prefix + ' ' + tag, value);
});
curry(function (tag, prop, value) {
  console.log(tag, value[prop]);
  return value;
});

var Maybe = /*#__PURE__*/function () {
  function Maybe(x) {
    _classCallCheck(this, Maybe);

    this.$value = x;
  }
  /*[util.inspect.custom]() {
    return this.isNothing ? 'Nothing' : `Just(${inspect(this.$value)})`;
  }*/
  // ----- Pointed Maybe


  _createClass(Maybe, [{
    key: "isNothing",
    get: function get() {
      return this.$value === null || this.$value === undefined;
    }
  }, {
    key: "isJust",
    get: function get() {
      return !this.isNothing;
    }
  }, {
    key: "map",
    value: // ----- Functor Maybe
    function map(fn) {
      return this.isNothing ? this : Maybe.of(fn(this.$value));
    } // ----- Applicative Maybe

  }, {
    key: "ap",
    value: function ap(f) {
      return this.isNothing ? this : f.map(this.$value);
    } // ----- Monad Maybe

  }, {
    key: "chain",
    value: function chain(fn) {
      return this.map(fn).join();
    }
  }, {
    key: "join",
    value: function join() {
      return this.isNothing ? this : this.$value;
    } // ----- Traversable Maybe

  }, {
    key: "sequence",
    value: function sequence(of) {
      return this.traverse(of, identity);
    }
  }, {
    key: "traverse",
    value: function traverse(of, fn) {
      return this.isNothing ? of(this) : fn(this.$value).map(Maybe.of);
    }
  }], [{
    key: "of",
    value: function of(x) {
      return new Maybe(x);
    }
  }]);

  return Maybe;
}(); //export const empty = string=> string.length==0;
// BOOL => BOOL
//export const notEmpty = compose(not,empty)


var not = function not(x) {
  return !x;
};

var _OR_ = curry(function (a, b, x) {
  return a(x) || b(x);
});

curry(function (a, b, x) {
  return a(x) && b(x);
});
curry(function (a, x) {
  return !a(x);
}); //export const isStrictlyEqual = curry((value,item)=> value===item)

var isStrictlyEqual = curry(function (value, item) {
  return value === item;
});

var isStrictlyNotEqual = function isStrictlyNotEqual(value) {
  return compose(not, isStrictlyEqual(value));
};

var _typeof = function _typeof(value) {
  return _typeof$1(value);
};

var is_type = function is_type(val) {
  return compose(isStrictlyEqual(val), _typeof);
};

is_type('string');
is_type('function');
is_type('number');
var is_undefined = is_type('undefined');

var isNull = function isNull(x) {
  return x === null;
};

is_type('boolean');

_OR_(isNull, is_undefined);

var defaultTo = function defaultTo(val) {
  return compose(maybe(val, identity), Maybe.of);
};
/*
  if(cond is met, return right else return left)
*/


var either = curry(function (cond, left, right, val) {
  return cond(val) ? right(val) : left(val);
});
either(is_undefined);

var _throw = function _throw(x) {
  return function (val) {
    throw new Error(x);
  };
}; //interrupt everything


curry(function (cond, error) {
  return either(cond, _throw(error), identity);
});
curry(function (catcher, tryer, arg) {
  try {
    return tryer(arg);
  } catch (err) {
    return catcher(arg, err);
  }
});
var assign2 = curry(function (x, y) {
  return Object.assign({}, x, y);
});

var _merge = curry(function (a, b) {
  return assign2(a, b);
});

var merge = _merge;
var prop = curry(function (prop, obj) {
  return obj[prop];
});

var keys = function keys(o) {
  return Object.keys(o);
}; // String => Object => Object


curry(function (_omit, obj) {
  var o = {};
  Object.keys(obj).map(function (key) {
    if (key !== _omit) {
      o[key] = obj[key];
    }
  });
  return o;
}); // String => Object => Object

curry(function (_omit, obj) {
  var o = {};
  Object.keys(obj).map(function (key) {
    if (_omit.indexOf(key) === -1) {
      o[key] = obj[key];
    }
  });
  return o;
});
curry(function (fn, obj) {
  var o = {};
  map(either(fn, identity, function (k) {
    return o[k] = obj[k];
  }), keys(obj));
  return o;
});
var ensure_object_copy = assign2({});
/*
  String -> String -> Object -> Object
*/

var as_object_prop = curry(function (key, value, object) {
  var o = _objectSpread2({}, object);

  o[key] = value;
  return o;
}); //  a -> b -> Object

var as_prop = curry(function (key, value) {
  return flip(as_object_prop(key), defaultTo({}), value);
});
/*
 Spec
  for a given object for which values are function  returns a new object with

  {
    x: fn(a,b),
    y: fn(a,b,c),
  }

  spec(obj,a)
  => {
    x: fn(a,b)(a)
    y: fn(a,b,c)(a)
  }

*/
//Object -> List

var enlist = curry(function (obj) {
  return pipe(keys, map(function (x) {
    return as_prop(x, obj[x]);
  }))(obj);
});
var substract = curry(function (a, b) {
  return a - b;
});
flip(substract)(1);
curry(function (sep, array) {
  return array.join(sep);
}); //Function -> List -> List

var filter = curry(function (fn, array) {
  return array.filter(fn);
}); // a -> Function -> List -> a

var reduce = curry(function (initial_value, reducer, array) {
  return array.reduce(reducer, initial_value);
}); // Function -> List -> Number

var findIndex = curry(function (fn, array) {
  return array.findIndex(fn);
}); // value => List => Number

compose(findIndex, isStrictlyEqual); // value => List => Number

compose(findIndex, isStrictlyNotEqual); // value => List => List

compose(filter, isStrictlyNotEqual); // value => List => List

compose(filter, isStrictlyEqual);
var indexOf = curry(function (v, a) {
  return a.indexOf(v);
}); // reduce an array of subObjects to a merged object of all subObjects

reduce({}, merge);
/*Recursively call a Curried FN  with each array item of args

same as  spreading args fn (...args)

spread(fn)(args) == fn(...args)
*/
//spread :: fn -> [a,b,c...] -> fn(a,b,c,...)

curry(function (fn, args) {
  return reduce(fn, function (_fn, arg) {
    return _fn(arg);
  }, args);
}); // apply result of fn on the group
// ObjectReducer
// groupListByKey :: Object -> item -> Object

var groupListByKey = function groupListByKey(key) {
  return curry(function (result, item) {
    if (typeof result[item[key]] === 'undefined') result[item[key]] = [];
    result[item[key]].push(item);
    return result;
  });
};

var tail = function tail(arr) {
  return arr.slice(1);
};

var head = function head(arr) {
  return arr[0];
};

var slice = curry(function (x, a) {
  return a.slice(x);
});
curry(function (start, length, a) {
  return a.slice(start, length);
});
var safeTail = defaultTo([])(tail);
defaultTo(null)(head); // ReduceListToObject:: ObjectReducer => key => Object => Object
//export const reduceListToObject = objectReducer => key => c.compose(as_prop(key),c.reduce({},objectReducer))

var reduceListByKey = function reduceListByKey(key) {
  return reduce({}, groupListByKey(key));
}; //shuffle [a] -> [a]


var reduceListByKeys = curry(function (_keys, list) {
  if (_keys.length == 0) return list;
  var h = head(_keys);
  var rest = safeTail(_keys);
  var res = reduceListByKey(h)(list);

  for (var key in res) {
    res[key] = reduceListByKeys(rest)(res[key]);
  }

  return res;
});
curry(function (fn, array) {
  return array.sort(fn);
});

var _sortAsc = curry(function (fn, a, b) {
  var aa = fn(a);
  var bb = fn(b);
  return aa < bb ? -1 : aa > bb ? 1 : 0;
});

var _sortDesc = curry(function (fn, a, b) {
  return _sortAsc(fn, b, a);
});

var _sortBy = curry(function (_sort, fn, array) {
  return slice(0, array).sort(_sort(fn));
});

_sortBy(_sortAsc);

_sortBy(_sortDesc);

curry(function (array, item) {
  return [].concat(_toConsumableArray(array), [item]);
});
curry(function (array, item) {
  return [item].concat(_toConsumableArray(array));
});

var mergeAll = function mergeAll(list) {
  return reduce({}, assign2, list);
};

curry(function (state, action) {
  return filter(function (item) {
    return item.id != action.payload;
  }, state);
});
curry(function (state, action) {
  return [].concat(_toConsumableArray(state), [action.payload]);
});
var item_prop_is_equal = curry(function (prop, value, item) {
  return item[prop] == value;
});
curry(function (state, action) {
  return [].concat(_toConsumableArray(state), [action.payload]);
}); // del_from_list :: List -> Object-> List

curry(function (state, action) {
  return filter(function (item) {
    return item.id != action.payload;
  }, state);
}); // update_object :: Object->Object->Object

curry(function (list, itemIdValue, updateFn) {
  return update_list(list, item_prop_is_equal('id', itemIdValue), updateFn);
}); // update_list :: List -> Fn -> Fn -> List

var update_list = curry(function (list, itemPredicate, updateFn) {
  return list.map(function (item) {
    return either(itemPredicate, identity, updateFn, item);
  });
});
var propIsEqual = curry(function (prop, value, item) {
  return item[prop] === value;
});
var propIsNotEqual = curry(function (prop, value, item) {
  return item[prop] !== value;
});
var delByProp = curry(function (prop, list, val) {
  return filter(propIsNotEqual(prop, val), list);
});
delByProp('id');
curry(function (list, item) {
  return [].concat(_toConsumableArray(list), [item]);
});
curry(function (prop, list, val) {
  return filter(propIsEqual(prop, val), list);
});
var update = curry(function (cond, val, list, fn) {
  return map(either(cond(val), identity, fn))(list);
});
curry(function (prop, val, list, fn) {
  return update(propIsEqual(prop), val, list, fn);
});
var compare = curry(function (listA, listB) {
  if (!listB) return false;
  if (listA.length != listB.length) return false;

  for (var i = 0; i < listA.length; i++) {
    if (listA[i] instanceof Array && listB[i] instanceof Array) {
      if (!compare(listA[i], listB[i])) return false;
    } else if (listA[i] != listB[i]) {
      return false;
    }
  }

  return true;
}); // {a:b} -> a
// {a:b, c:d} -> a

var key = compose(head, keys);

var value = function value(obj) {
  return obj[key(obj)];
}; //export const objectReduce = reduce({});  //<--- never do this unless you want to keep the accumulator .... forever !!
//  String -> a -> Object -> Bool


var isPropStrictlyEqual = curry(function (_prop, value, item) {
  return compose(isStrictlyEqual(value), prop(_prop))(item);
});
var isPropStrictlyNotEqual = curry(function (prop, value, item) {
  return compose(not, isPropStrictlyEqual(prop, value))(item);
}); // filter an object and returns key that matches
// regex -> string -> Object -> Bool

var propMatch = curry(function (re, key) {
  return compose(test(re), prop(key));
});

var makeHasKey = function makeHasKey(k) {
  return compose(function (x) {
    return x !== -1;
  }, indexOf(k), keys);
};

var hasKey = curry(function (k, o) {
  return makeHasKey(k)(o);
}); // Object -> Object -> Object

var matchReducer = function matchReducer(match) {
  return function (acc, item) {
    //  console.log(head(keys(item)))
    if (match(key(item))) {
      return assign2(acc, item);
    }

    return acc;
  };
}; //


var keepMatching = function keepMatching(match) {
  return reduce({}, matchReducer(match));
};

var filterByKey = function filterByKey(match) {
  return compose(keepMatching(match), trace('x'), enlist, ensure_object_copy);
};
/*
  perform a match function on every item of an object and returns an array like this:
  [matching, notmatching]

  //MatchFunction => Object => List
*/


var makeSpreadFilterByKey = function makeSpreadFilterByKey(transformMatching) {
  return function (transformNotMatching) {
    return function (match) {
      return compose(diverge(transformMatching(match), transformNotMatching(compose(not, match))), enlist, ensure_object_copy);
    };
  };
};
/*
  perform a match function on every item of an object and returns an array like this:
  [matching, notmatching]

  //MatchFunction => Object => List
*/


var spreadFilterByKey = makeSpreadFilterByKey(keepMatching)(keepMatching);
var spec = curry(function (obj, arg) {
  return pipe(keys, map(function (x) {
    return as_prop(x, obj[x](arg));
  }), mergeAll)(obj);
});
exports.filterByKey = filterByKey;
exports.hasKey = hasKey;
exports.isPropStrictlyEqual = isPropStrictlyEqual;
exports.isPropStrictlyNotEqual = isPropStrictlyNotEqual;
exports.keepMatching = keepMatching;
exports.key = key;
exports.makeHasKey = makeHasKey;
exports.makeSpreadFilterByKey = makeSpreadFilterByKey;
exports.matchReducer = matchReducer;
exports.propMatch = propMatch;
exports.spec = spec;
exports.spreadFilterByKey = spreadFilterByKey;
exports.value = value;

/***/ })
])