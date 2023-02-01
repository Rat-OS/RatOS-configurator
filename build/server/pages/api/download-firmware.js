"use strict";
(() => {
var exports = {};
exports.id = 951;
exports.ids = [951];
exports.modules = {

/***/ 2756:
/***/ ((module) => {

module.exports = require("@trpc/server");

/***/ }),

/***/ 4475:
/***/ ((module) => {

module.exports = import("file-type");;

/***/ }),

/***/ 9926:
/***/ ((module) => {

module.exports = import("zod");;

/***/ }),

/***/ 2081:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 3837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 4369:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
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
/* harmony import */ var _server_router_mcu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8455);
/* harmony import */ var file_type__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4475);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_server_router_mcu__WEBPACK_IMPORTED_MODULE_3__, file_type__WEBPACK_IMPORTED_MODULE_4__]);
([_server_router_mcu__WEBPACK_IMPORTED_MODULE_3__, file_type__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);





async function handler(req, res) {
  if (req.method === 'GET') {
    if (req.query.boardPath == null) {
      return res.status(405).json({
        result: 'error',
        data: {
          message: 'boardPath parameter missing'
        }
      });
    }

    const boards = await (0,_server_router_mcu__WEBPACK_IMPORTED_MODULE_3__/* .getBoards */ .DC)();
    const board = boards.find(b => b.path === req.query.boardPath);

    if (board == null) {
      return res.status(405).json({
        result: 'error',
        data: {
          message: 'No board exists for given boardPath'
        }
      });
    }

    if (process.env.RATOS_CONFIGURATION_PATH == null) {
      return res.status(500).json({
        result: 'error',
        data: {
          message: 'RATOS_CONFIGURATION_PATH environment variable not set'
        }
      });
    }

    const firmwarePath = path__WEBPACK_IMPORTED_MODULE_2___default().join(process.env.RATOS_CONFIGURATION_PATH, '..', 'firmware_binaries', board.firmwareBinaryName);

    try {
      const buf = await (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)((fs__WEBPACK_IMPORTED_MODULE_0___default().readFile))(firmwarePath);
      res.setHeader('Content-Type', (await (0,file_type__WEBPACK_IMPORTED_MODULE_4__.fileTypeFromFile)(firmwarePath))?.mime ?? 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename=firmware.bin`);
      return res.status(200).send(buf);
    } catch (e) {
      return res.status(200).json({
        result: 'error',
        data: {
          message: `Firmware binary for ${board.name} does not exist.`
        }
      });
    }
  }
}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [455], () => (__webpack_exec__(4369)));
module.exports = __webpack_exports__;

})();