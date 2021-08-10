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




var progress = function progress(total, current) {
  return postMessage({
    progress: Math.round(current * 100 / total)
  });
};

var total_count = function total_count(total) {
  return postMessage({
    total: total
  });
};

onmessage = function onmessage(e) {
  return parse(e.data, progress, total_count, postMessage);
};

/***/ })
])