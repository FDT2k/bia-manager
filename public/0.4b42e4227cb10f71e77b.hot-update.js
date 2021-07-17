self["webpackHotUpdate"](0,[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var hooks_dexie_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);



onmessage = event => {

    const {data}  = event;
    // The object that the web page sent is stored in the event.data property.
    var fromNumber = event.data.from;
    var toNumber = event.data.to;

    // Using that number range, perform the prime number search.
    var primes = findPrimes(fromNumber, toNumber);

    // Now the search is finished. Send back the results.
    postMessage(primes);
};

function findPrimes(fromNumber, toNumber) {
    // (The boring prime number calculations go in this function.)

    return 12;
}


/***/ })
])