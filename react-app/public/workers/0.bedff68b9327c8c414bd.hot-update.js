self["webpackHotUpdate"](0,[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);


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
  return Object(_parser__WEBPACK_IMPORTED_MODULE_0__["parse"])(e.data, progress, total_count, postMessage);
};

/***/ }),
/* 1 */
false,
/* 2 */
false,
/* 3 */
false,
/* 4 */
false,
/* 5 */
false,
/* 6 */
false,
/* 7 */
false,
/* 8 */
false,
/* 9 */
false
])