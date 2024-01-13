"use strict";
exports.id = 815;
exports.ids = [815,799,711];
exports.modules = {

/***/ 8145:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ searchFileByLine),
/* harmony export */   "u": () => (/* binding */ replaceInFileByLine)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2037);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var readline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4521);
/* harmony import */ var readline__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(readline__WEBPACK_IMPORTED_MODULE_3__);




const replaceInFileByLine = async (filePath, search, replace)=>{
    if (!(0,fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)(filePath)) {
        throw new Error("Firmware config file does not exist: " + filePath);
    }
    const fileStream = (0,fs__WEBPACK_IMPORTED_MODULE_0__.createReadStream)(filePath);
    const writeStream = (0,fs__WEBPACK_IMPORTED_MODULE_0__.createWriteStream)(filePath + ".tmp");
    const rl = (0,readline__WEBPACK_IMPORTED_MODULE_3__.createInterface)({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl){
        if (replace == null) {
            if (search instanceof RegExp ? line.match(search) : line.includes(search)) {
                continue;
            }
            writeStream.write(line + os__WEBPACK_IMPORTED_MODULE_2__.EOL);
            continue;
        }
        writeStream.write(line.replace(search, replace) + os__WEBPACK_IMPORTED_MODULE_2__.EOL);
    }
    rl.close();
    await new Promise((resolve, reject)=>{
        writeStream.close((err)=>{
            if (err) {
                throw reject(err);
            }
            resolve(null);
        });
    });
    await new Promise((resolve, reject)=>{
        fileStream.close((err)=>{
            if (err) {
                throw reject(err);
            }
            resolve(null);
        });
    });
    await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.copyFile)(filePath + ".tmp", filePath);
    await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.unlink)(filePath + ".tmp");
};
const searchFileByLine = async (filePath, search)=>{
    if (!(0,fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)(filePath)) {
        throw new Error("Firmware config file does not exist: " + filePath);
    }
    const fileStream = (0,fs__WEBPACK_IMPORTED_MODULE_0__.createReadStream)(filePath);
    const rl = (0,readline__WEBPACK_IMPORTED_MODULE_3__.createInterface)({
        input: fileStream,
        crlfDelay: Infinity
    });
    let result = false;
    let lineNumber = 0;
    for await (const line of rl){
        if (result) continue;
        lineNumber++;
        if (search instanceof RegExp ? line.match(search) : line.includes(search)) {
            result = lineNumber;
        }
    }
    await new Promise((resolve, reject)=>{
        fileStream.close((err)=>{
            if (err) {
                throw reject(err);
            }
            resolve(null);
        });
    });
    return result;
};


/***/ }),

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


/***/ }),

/***/ 5601:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$y": () => (/* binding */ publicProcedure),
/* harmony export */   "Nd": () => (/* binding */ router),
/* harmony export */   "qR": () => (/* binding */ middleware)
/* harmony export */ });
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2756);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_trpc_server__WEBPACK_IMPORTED_MODULE_0__);

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = _trpc_server__WEBPACK_IMPORTED_MODULE_0__.initTRPC.context().meta().create();
// Base router and procedure helpers
const router = t.router;
const publicProcedure = t.procedure;
const middleware = t.middleware;


/***/ })

};
;