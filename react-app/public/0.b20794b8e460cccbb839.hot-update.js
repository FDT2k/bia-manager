self["webpackHotUpdate"](0,[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _karsegard_composite_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _karsegard_composite_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_karsegard_composite_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _karsegard_composite_js_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _karsegard_composite_js_ObjectUtils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_karsegard_composite_js_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bia_layout_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var progress = function progress(total, current) {
  return postMessage({
    progress: Math.round(current * 100 / total)
  });
};

var remap = function remap(obj, mapping) {
  return function (carry, item) {
    var _key = Object(_karsegard_composite_js_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__["key"])(item);

    var _mapped = mapping[_key];

    if (_mapped && Object(_karsegard_composite_js__WEBPACK_IMPORTED_MODULE_0__["is_type_string"])(_mapped)) {
      carry[_mapped] = Object(_karsegard_composite_js_ObjectUtils__WEBPACK_IMPORTED_MODULE_1__["value"])(item);
    } else if (Object(_karsegard_composite_js__WEBPACK_IMPORTED_MODULE_0__["is_type_object"])(_mapped)) {
      var name = _mapped.name,
          transform = _mapped.transform;

      if (!Object(_karsegard_composite_js__WEBPACK_IMPORTED_MODULE_0__["is_type_function"])(transform)) {
        transform = eval(transform);
      }

      carry[name] = transform(carry[name], obj);
    }

    return carry;
  };
};

var parse = function parse(_ref) {
  var text = _ref.text,
      line_separator = _ref.line_separator,
      mapping = _ref.mapping,
      separator = _ref.separator,
      identifier = _ref.identifier;
  console.log('parsing');
  var data = text.split(line_separator);
  var fields = data[0].split(separator);
  console.log(fields);
  var total = data.length;
  var report_every = 2000;
  var count = 0;
  progress(total, 0);
  data.shift();
  data = data.map(function (line) {
    var values = line.split(separator);
    return values.reduce(function (carry, item, key) {
      carry[fields[key]] = item;
      return carry;
    }, {});
  }).reduce(function (carry, item, idx) {
    count++;

    if (count > report_every) {
      progress(total, idx);
      count = 0;
    }

    var patient_keys = Object.keys(mapping.patient);

    var _filterPropPresentIn = Object(bia_layout_utils__WEBPACK_IMPORTED_MODULE_2__["filterPropPresentIn"])(patient_keys, item),
        _filterPropPresentIn2 = _slicedToArray(_filterPropPresentIn, 2),
        patient = _filterPropPresentIn2[0],
        mesure = _filterPropPresentIn2[1];

    var index_key = item[identifier];

    if (typeof carry.data[index_key] == "undefined") {
      var p = Object(_karsegard_composite_js__WEBPACK_IMPORTED_MODULE_0__["enlist"])(patient).reduce(remap(patient, mapping.patient), {});
      carry.data[index_key] = p;
      carry.list.push(p);
      carry.countPatient++;
    }

    if (typeof carry.data[index_key].mesures == "undefined") {
      carry.data[index_key]['mesures'] = [];
    }

    console.log(remap(mesure, mapping.mesure));
    carry.data[index_key].mesures.push(Object(_karsegard_composite_js__WEBPACK_IMPORTED_MODULE_0__["enlist"])(mesure).reduce(remap(mesure, mapping.mesure), {}));
    carry.countMesure++;
    return carry;
  }, {
    data: {},
    list: [],
    countPatient: 0,
    countMesure: 0
  });
  progress(total, 100);
  postMessage({
    result: data
  });
};

onmessage = function onmessage(e) {
  return parse(e.data);
};

/***/ })
])