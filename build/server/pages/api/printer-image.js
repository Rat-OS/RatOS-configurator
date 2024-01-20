"use strict";
(() => {
var exports = {};
exports.id = 378;
exports.ids = [378];
exports.modules = {

/***/ 8910:
/***/ ((module) => {

module.exports = require("@tanstack/react-query");

/***/ }),

/***/ 5337:
/***/ ((module) => {

module.exports = require("@trpc/client");

/***/ }),

/***/ 7785:
/***/ ((module) => {

module.exports = require("@trpc/react-query");

/***/ }),

/***/ 6185:
/***/ ((module) => {

module.exports = require("@trpc/react-query/shared");

/***/ }),

/***/ 2756:
/***/ ((module) => {

module.exports = require("@trpc/server");

/***/ }),

/***/ 8161:
/***/ ((module) => {

module.exports = require("@trpc/server/shared");

/***/ }),

/***/ 4230:
/***/ ((module) => {

module.exports = require("glob");

/***/ }),

/***/ 8038:
/***/ ((module) => {

module.exports = require("next/dist/compiled/react");

/***/ }),

/***/ 6786:
/***/ ((module) => {

module.exports = require("next/dist/compiled/react/jsx-runtime");

/***/ }),

/***/ 4580:
/***/ ((module) => {

module.exports = require("node-cache");

/***/ }),

/***/ 1569:
/***/ ((module) => {

module.exports = require("object-hash");

/***/ }),

/***/ 8545:
/***/ ((module) => {

module.exports = require("pino");

/***/ }),

/***/ 3009:
/***/ ((module) => {

module.exports = require("pino-pretty");

/***/ }),

/***/ 7636:
/***/ ((module) => {

module.exports = require("react-use-websocket");

/***/ }),

/***/ 9755:
/***/ ((module) => {

module.exports = require("recoil");

/***/ }),

/***/ 4101:
/***/ ((module) => {

module.exports = require("recoil-sync");

/***/ }),

/***/ 8316:
/***/ ((module) => {

module.exports = require("zod");

/***/ }),

/***/ 5140:
/***/ ((module) => {

module.exports = require("zod-refine");

/***/ }),

/***/ 2081:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 3292:
/***/ ((module) => {

module.exports = require("fs/promises");

/***/ }),

/***/ 2254:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 7561:
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ 4492:
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ 2037:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 4521:
/***/ ((module) => {

module.exports = require("readline");

/***/ }),

/***/ 3837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 1647:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3837);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var file_type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5379);
/* harmony import */ var _server_routers_printer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5662);





async function handler(req, res) {
    if (req.method === "GET") {
        if (req.query.printerId == null) {
            return res.status(405).json({
                result: "error",
                data: {
                    message: "printerId parameter missing"
                }
            });
        }
        const printers = await (0,_server_routers_printer__WEBPACK_IMPORTED_MODULE_4__/* .getPrinters */ .VZ)();
        const printer = printers.find((b)=>b.id === req.query.printerId);
        if (printer == null) {
            return res.status(405).json({
                result: "error",
                data: {
                    message: "No supported printer exist with id " + req.query.printerId
                }
            });
        }
        const imgPath = path__WEBPACK_IMPORTED_MODULE_2___default().join(printer.path, printer.image);
        try {
            const buf = await (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)((fs__WEBPACK_IMPORTED_MODULE_0___default().readFile))(imgPath);
            const fileType = await (0,file_type__WEBPACK_IMPORTED_MODULE_3__/* .fileTypeFromBuffer */ .pM)(buf);
            if (fileType == null) {
                return res.status(500).json({
                    result: "error",
                    data: {
                        message: "File is not a valid image."
                    }
                });
            }
            res.setHeader("Content-Type", fileType.mime);
            return res.status(200).send(buf);
        } catch (e) {
            return res.status(200).json({
                result: "error",
                data: {
                    message: "Image file does not exist."
                }
            });
        }
    }
    return res.status(405).json({
        result: "error",
        data: {
            message: "Method not allowed"
        }
    });
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [736,379,112], () => (__webpack_exec__(1647)));
module.exports = __webpack_exports__;

})();