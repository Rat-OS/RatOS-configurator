"use strict";
exports.id = 799;
exports.ids = [799];
exports.modules = {

/***/ 799:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLogger": () => (/* binding */ getLogger)
/* harmony export */ });
/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8545);
/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pino__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pino_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3009);
/* harmony import */ var pino_pretty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pino_pretty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _env_schema_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6165);



const stream = pino_pretty__WEBPACK_IMPORTED_MODULE_1___default()({
    levelFirst: true,
    colorize: true,
    ignore: "time,hostname,pid"
});
let logger = null;
const getLogger = ()=>{
    if (logger != null) {
        return logger;
    }
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_2__.serverSchema.parse(process.env);
    const transportOption =  false ? 0 : {
        target: "pino/file",
        options: {
            destination: environment.LOG_FILE,
            append: true
        }
    };
    logger = pino__WEBPACK_IMPORTED_MODULE_0___default()({
        timestamp: true,
        transport: transportOption
    });
    return logger;
};


/***/ })

};
;