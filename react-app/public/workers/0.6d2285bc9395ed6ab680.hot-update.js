self["webpackHotUpdate"](0,[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_parser__WEBPACK_IMPORTED_MODULE_0__);


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
false,
/* 10 */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/babel-loader/lib/index.js):\nSyntaxError: /home/fabien/work/bia-manager/react-app/src/components/DatabaseImport/parser.js: Unexpected reserved word 'await'. (87:12)\n\n\u001b[0m \u001b[90m 85 |\u001b[39m             \u001b[0m\n\u001b[0m \u001b[90m 86 |\u001b[39m             carry\u001b[33m.\u001b[39mcountMesure\u001b[33m++\u001b[39m\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 87 |\u001b[39m             \u001b[36mawait\u001b[39m sleep(\u001b[35m1\u001b[39m)\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m    |\u001b[39m             \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 88 |\u001b[39m             \u001b[36mreturn\u001b[39m carry\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 89 |\u001b[39m         }\u001b[33m,\u001b[39m { data\u001b[33m:\u001b[39m {}\u001b[33m,\u001b[39mlist\u001b[33m:\u001b[39m[]\u001b[33m,\u001b[39m countPatient\u001b[33m:\u001b[39m \u001b[35m0\u001b[39m\u001b[33m,\u001b[39m countMesure\u001b[33m:\u001b[39m \u001b[35m0\u001b[39m })\u001b[33m;\u001b[39m\u001b[0m\n\u001b[0m \u001b[90m 90 |\u001b[39m         progress(total\u001b[33m,\u001b[39m\u001b[35m100\u001b[39m)\u001b[33m;\u001b[39m\u001b[0m\n    at Object._raise (/home/fabien/work/bia-manager/react-app/node_modules/@babel/parser/lib/index.js:816:17)\n    at Object.raiseWithData (/home/fabien/work/bia-manager/react-app/node_modules/@babel/parser/lib/index.js:809:17)\n    at Object.raise (/home/fabien/work/bia-manager/react-app/node_modules/@babel/parser/lib/index.js:770:17)\n    at Object.checkReservedWord (/home/fabien/work/bia-manager/react-app/node_modules/@babel/parser/lib/index.js:12158:12)\n    at Object.parseIdentifierName (/home/fabien/work/bia-manager/react-app/node_modules/@babel/parser/lib/index.js:12112:12)\n    at Object.parseIdentifier (/home/fabien/work/bia-manager/react-app/node_modules/@babel/parser/lib/index.js:12084:23)\n    at Object.parseExprAtom (/home/fabien/work/bia-manager/react-app/node_modules/@babel/parser/lib/index.js:11140:27)\n    at Object.parseExprAtom (/home/fabien/work/bia-manager/react-app/node_modules/@babel/parser/lib/index.js:5241:20)\n    at Object.parseExprSubscripts (/home/fabien/work/bia-manager/react-app/node_modules/@babel/parser/lib/index.js:10881:23)\n    at Object.parseUpdate (/home/fabien/work/bia-manager/react-app/node_modules/@babel/parser/lib/index.js:10861:21)");

/***/ })
])