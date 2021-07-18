self["webpackHotUpdate"](0,[
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dexie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);

/* harmony default export */ __webpack_exports__["default"] = (function (name) {
  var db = new dexie__WEBPACK_IMPORTED_MODULE_0__["default"](name);
  db.version(1).stores({
    patients: "++id,lastname,firstname,birthdate,*groups,search_terms",
    import_mapping: "++id,name"
  });
  db.patients.hook("creating", function (primKey, obj, trans) {
    obj.search_terms = obj.lastname + ' ' + obj.firstname + ' ' + obj.birthdate + ' ' + obj.groups.path;
  });
  db.patients.hook("updating", function (mods, primKey, obj, trans) {
    obj.search_terms = obj.lastname + ' ' + obj.firstname + ' ' + obj.birthdate + ' ' + obj.groups.path;
  });
  return db;
});

/***/ })
])