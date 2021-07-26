self["webpackHotUpdate"](0,{

/***/ 3:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return e; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeBEM", function() { return makeBEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wrapComponent", function() { return wrapComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divElement", function() { return divElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sectionElement", function() { return sectionElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asideElement", function() { return asideElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseElement", function() { return baseElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "modifiersToCeX", function() { return modifiersToCeX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withBaseClass", function() { return withBaseClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getClasseNames", function() { return getClasseNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withBEM", function() { return withBEM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withModifiers", function() { return withModifiers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reduceVariables", function() { return reduceVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withVariables", function() { return withVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "propsToCeX", function() { return propsToCeX; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTransformedProps", function() { return withTransformedProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyModifiers", function() { return applyModifiers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kebabize", function() { return kebabize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "snakize", function() { return snakize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "camelize", function() { return camelize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bem", function() { return bem; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makePropsFilter", function() { return makePropsFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _karsegard_composite_js_ReactUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _karsegard_composite_js_ReactUtils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_karsegard_composite_js_ReactUtils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterPropStartingWith", function() { return _karsegard_composite_js_ReactUtils__WEBPACK_IMPORTED_MODULE_1__["spreadObjectBeginWith"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "filterPropPresentIn", function() { return _karsegard_composite_js_ReactUtils__WEBPACK_IMPORTED_MODULE_1__["spreadObjectPresentIn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "forwardProps", function() { return _karsegard_composite_js_ReactUtils__WEBPACK_IMPORTED_MODULE_1__["forwardPropsRemovingHeader"]; });

/* harmony import */ var _karsegard_composite_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var _karsegard_composite_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_karsegard_composite_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "compose", function() { return _karsegard_composite_js__WEBPACK_IMPORTED_MODULE_2__["compose"]; });

/* harmony import */ var _karsegard_composite_js_ObjectUtils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2);
/* harmony import */ var _karsegard_composite_js_ObjectUtils__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_karsegard_composite_js_ObjectUtils__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _karsegard_cex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _karsegard_cex__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_karsegard_cex__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cEx", function() { return _karsegard_cex__WEBPACK_IMPORTED_MODULE_4__["cEx"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "classNames", function() { return _karsegard_cex__WEBPACK_IMPORTED_MODULE_4__["cEx"]; });

var _excluded = ["children"],
    _excluded2 = ["children"],
    _excluded3 = ["children"],
    _excluded4 = ["children"],
    _excluded5 = ["children"],
    _excluded6 = ["className"],
    _excluded7 = ["className"],
    _excluded8 = ["className"],
    _excluded9 = ["className"],
    _excluded10 = ["style"],
    _excluded11 = ["className"];

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






var e = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

var bem = function bem(main) {
  return [main, function (block) {
    return "".concat(main, "__").concat(block);
  }, function (modifier) {
    return "".concat(main, "--").concat(modifier);
  }];
};

var makeBEM = function makeBEM(current) {
  return {
    current: current,
    make: {
      block: function block(_block) {
        return makeBEM("".concat(current, "-").concat(_block));
      },
      element: function element(_element) {
        return makeBEM("".concat(current, "__").concat(_element));
      },
      modifier: function modifier(_modifier) {
        return makeBEM("".concat(current, "--").concat(_modifier));
      }
    },
    block: function block(_block2) {
      return "".concat(current, "-").concat(_block2);
    },
    element: function element(_element2) {
      return "".concat(current, "__").concat(_element2);
    },
    modifier: function modifier(_modifier2) {
      return "".concat(current, "--").concat(_modifier2);
    }
  };
};
var wrapComponent = function wrapComponent(Wrap) {
  return function (Component) {
    return function (_ref) {
      var children = _ref.children,
          rest = _objectWithoutProperties(_ref, _excluded);

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Wrap, rest, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, null, children));
    };
  };
};
var divElement = function divElement(_ref2) {
  var children = _ref2.children,
      rest = _objectWithoutProperties(_ref2, _excluded2);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", rest, children);
};
var sectionElement = function sectionElement(_ref3) {
  var children = _ref3.children,
      rest = _objectWithoutProperties(_ref3, _excluded3);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("section", rest, children);
};
var asideElement = function asideElement(_ref4) {
  var children = _ref4.children,
      rest = _objectWithoutProperties(_ref4, _excluded4);

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("aside", rest, children);
};
var baseElement = Object(_karsegard_composite_js__WEBPACK_IMPORTED_MODULE_2__["curry"])(function (_e, _ref5) {
  var children = _ref5.children,
      rest = _objectWithoutProperties(_ref5, _excluded5);

  return e(_e, rest, children);
});
var modifiersToCeX = function modifiersToCeX(keyEnhancer, list, modifiers) {
  return list.reduce(function (acc, item) {
    var _type = _typeof(modifiers[item]);

    acc[keyEnhancer(item, modifiers[item])] = function (_) {
      return _type !== 'undefined' && modifiers[item] !== false;
    };

    return acc;
  }, {});
};
var withBaseClass = function withBaseClass(BaseClass) {
  return function (Component) {
    return function (props) {
      var className = props.className,
          rest = _objectWithoutProperties(props, _excluded6);

      var classes = Object(_karsegard_cex__WEBPACK_IMPORTED_MODULE_4__["cEx"])([BaseClass, className]);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _extends({}, rest, {
        className: classes
      }));
    };
  };
};
var getClasseNames = function getClasseNames(BaseClass, props) {
  var className = props.className,
      rest = _objectWithoutProperties(props, _excluded7);

  var classes = Object(_karsegard_cex__WEBPACK_IMPORTED_MODULE_4__["cEx"])([BaseClass, className]);
  return _objectSpread({
    className: classes
  }, rest);
};
var withBEM = function withBEM(bem) {
  return function (Component) {
    return function (props) {
      var className = props.className,
          rest = _objectWithoutProperties(props, _excluded8);

      var classes = Object(_karsegard_cex__WEBPACK_IMPORTED_MODULE_4__["cEx"])([bem.current, className]);
      rest.parentBEM = bem; //   return <Component {...rest} parentBEM={bem} className={classes} />

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _extends({}, rest, {
        className: classes
      }));
    };
  };
};
var withModifiers = function withModifiers(namer, modifiers) {
  return function (Component) {
    return function (props) {
      var className = props.className,
          rest = _objectWithoutProperties(props, _excluded9); //ensure to preserve classNames


      var _spreadObjectPresentI = Object(_karsegard_composite_js_ReactUtils__WEBPACK_IMPORTED_MODULE_1__["spreadObjectPresentIn"])(modifiers, rest),
          _spreadObjectPresentI2 = _slicedToArray(_spreadObjectPresentI, 2),
          presentModifiers = _spreadObjectPresentI2[0],
          _props = _spreadObjectPresentI2[1];

      var classes = Object(_karsegard_cex__WEBPACK_IMPORTED_MODULE_4__["cEx"])([className, modifiersToCeX(namer, modifiers, presentModifiers)]);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _extends({
        className: classes
      }, _props));
    };
  };
};
var reduceVariables = function reduceVariables(keyEnhancer, valEnhancer, list, variables) {
  return list.reduce(function (acc, item) {
    if (typeof variables[item] !== 'undefined') {
      acc[keyEnhancer(item, variables[item])] = valEnhancer(variables[item]);
    }

    return acc;
  }, {});
};
var withVariables = function withVariables(keyEnhancer, valEnhancer, variables) {
  return function (Component) {
    return function (props) {
      var style = props.style,
          rest = _objectWithoutProperties(props, _excluded10); //ensure to preserve styles


      var _style = style || {};

      var _spreadObjectPresentI3 = Object(_karsegard_composite_js_ReactUtils__WEBPACK_IMPORTED_MODULE_1__["spreadObjectPresentIn"])(variables, rest),
          _spreadObjectPresentI4 = _slicedToArray(_spreadObjectPresentI3, 2),
          presentVars = _spreadObjectPresentI4[0],
          _props = _spreadObjectPresentI4[1];

      var styles = _objectSpread(_objectSpread({}, _style), reduceVariables(keyEnhancer, valEnhancer, variables, presentVars));

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _extends({
        style: styles
      }, _props));
    };
  };
};
var propsToCeX = function propsToCeX(keyEnhancer, list, modifiers) {
  return list.reduce(function (acc, item) {
    if (modifiers[item]) {
      acc.push(function (_) {
        return keyEnhancer(modifiers[item]);
      });
    }

    return acc;
  }, []);
};
var withTransformedProps = function withTransformedProps(namer, modifiers) {
  return function (Component) {
    return function (props) {
      var className = props.className,
          rest = _objectWithoutProperties(props, _excluded11); //ensure to preserve classNames


      var _spreadObjectPresentI5 = Object(_karsegard_composite_js_ReactUtils__WEBPACK_IMPORTED_MODULE_1__["spreadObjectPresentIn"])(modifiers, rest),
          _spreadObjectPresentI6 = _slicedToArray(_spreadObjectPresentI5, 2),
          presentModifiers = _spreadObjectPresentI6[0],
          _props = _spreadObjectPresentI6[1]; // console.error( enlist(presentModifiers),modifiers)
      //console.log(propsToCeX(namer,modifiers, presentModifiers))


      var classes = Object(_karsegard_cex__WEBPACK_IMPORTED_MODULE_4__["cEx"])([className].concat(_toConsumableArray(propsToCeX(namer, modifiers, presentModifiers))));
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _extends({
        className: classes
      }, _props));
    };
  };
}; // apply modifiers if none of unless is present in props

var applyModifiers = function applyModifiers(modifiers, unless) {
  return function (Component) {
    return function (props) {
      var _m;

      if (unless && unless.length > 0) {
        var __m = {};
        var found = false;

        for (var _i2 = 0, _Object$keys = Object.keys(props); _i2 < _Object$keys.length; _i2++) {
          var prop = _Object$keys[_i2];

          if (unless.indexOf(prop) !== -1) {
            found = true;
          }
        }

        if (!found) {
          _m = modifiers;
        }
      } else {
        _m = modifiers;
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _extends({}, _m, props));
    };
  };
};

var makePropsFilter = function makePropsFilter(prefix) {
  return [Object(_karsegard_composite_js_ReactUtils__WEBPACK_IMPORTED_MODULE_1__["spreadObjectBeginWith"])(prefix), Object(_karsegard_composite_js_ReactUtils__WEBPACK_IMPORTED_MODULE_1__["forwardPropsRemovingHeader"])(prefix)];
};

var kebabize = function kebabize(str) {
  return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, function ($, ofs) {
    return (ofs ? "-" : "") + $.toLowerCase();
  });
};
var snakize = function snakize(str) {
  return str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, function ($, ofs) {
    return (ofs ? "_" : "") + $.toLowerCase();
  });
};
var camelize = function camelize(text) {
  return text.replace(/^([A-Z])|[\s-_]+(\w)/g, function (_, p1, p2, __) {
    return p2 ? p2.toUpperCase() : p1.toLowerCase();
  });
};



/***/ })

})