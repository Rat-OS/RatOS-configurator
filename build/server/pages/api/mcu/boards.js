"use strict";
(() => {
var exports = {};
exports.id = 684;
exports.ids = [684];
exports.modules = {

/***/ 464:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 81:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 187:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ handler),
  "getBoards": () => (/* binding */ getBoards)
});

// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(81);
;// CONCATENATED MODULE: external "fs"
const external_fs_namespaceObject = require("fs");
// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(464);
;// CONCATENATED MODULE: ./pages/api/mcu/boards.ts



const getBoards = async ()=>{
    const defs = await (0,external_util_.promisify)(external_child_process_.exec)(`ls ${process.env.RATOS_CONFIGURATION_PATH}/boards/*/board-definition.json`);
    return defs.stdout.split('\n').map((f)=>f.trim() === '' ? null : {
            ...JSON.parse((0,external_fs_namespaceObject.readFileSync)(f).toString()),
            dir: f.replace('board-definition.json', '')
        }
    ).filter((f)=>f != null
    );
};
async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            res.status(200).json({
                result: 'success',
                data: {
                    boards: await getBoards()
                }
            });
        } catch (e) {
            res.status(200).json({
                result: 'error',
                data: {
                    message: `No boards found in ${process.env.RATOS_CONFIGURATION_PATH}/boards`
                }
            });
        }
    }
    return res.status(405);
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(187));
module.exports = __webpack_exports__;

})();