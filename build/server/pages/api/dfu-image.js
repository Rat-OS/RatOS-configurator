"use strict";
(() => {
var exports = {};
exports.id = 510;
exports.ids = [510];
exports.modules = {

/***/ 6368:
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

/***/ 5400:
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
/* harmony import */ var _server_router_mcu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5089);
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

    if ((board === null || board === void 0 ? void 0 : board.dfu) == null) {
      return res.status(405).json({
        result: 'error',
        data: {
          message: 'No DFU capable board exists for given boardPath'
        }
      });
    }

    const imgPath = path__WEBPACK_IMPORTED_MODULE_2___default().join(board.path, board.dfu.dfuBootImage);

    try {
      const buf = await (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)((fs__WEBPACK_IMPORTED_MODULE_0___default().readFile))(imgPath);
      const fileType = await (0,file_type__WEBPACK_IMPORTED_MODULE_4__.fileTypeFromBuffer)(buf);

      if (fileType == null) {
        return res.status(500).json({
          result: 'error',
          data: {
            message: 'File is not a valid image.'
          }
        });
      }

      res.setHeader('Content-Type', fileType.mime);
      return res.status(200).send(buf);
    } catch (e) {
      return res.status(200).json({
        result: 'error',
        data: {
          message: 'Image file does not exist.'
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
var __webpack_exports__ = __webpack_require__.X(0, [89], () => (__webpack_exec__(5400)));
module.exports = __webpack_exports__;

})();