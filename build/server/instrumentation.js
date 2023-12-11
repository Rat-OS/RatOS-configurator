"use strict";
(() => {
var exports = {};
exports.id = 118;
exports.ids = [118];
exports.modules = {

/***/ 6082:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "register": () => (/* binding */ register)
/* harmony export */ });
const register = async ()=>{
    if (true) {
        const { existsSync , mkdirSync  } = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 7147, 23));
        const { regenerateKlipperConfiguration  } = await Promise.all(/* import() */[__webpack_require__.e(323), __webpack_require__.e(680), __webpack_require__.e(876), __webpack_require__.e(945), __webpack_require__.e(312), __webpack_require__.e(96), __webpack_require__.e(103)]).then(__webpack_require__.bind(__webpack_require__, 3103));
        const { serverSchema  } = await __webpack_require__.e(/* import() */ 876).then(__webpack_require__.bind(__webpack_require__, 6165));
        const environment = serverSchema.parse(process.env);
        const dataDir = environment.RATOS_DATA_DIR;
        if (!existsSync(dataDir)) {
            console.log("Creating RatOS data directory..");
            mkdirSync(dataDir);
        }
        console.log("Regenerating last known config");
        try {
            await regenerateKlipperConfiguration();
        } catch (e) {
            if (e instanceof Error) {
                console.log("Failed to regenerate config: ", e.message);
            }
        }
    }
};


/***/ }),

/***/ 7856:
/***/ ((module) => {

module.exports = require("@recoiljs/refine");

/***/ }),

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

/***/ 8545:
/***/ ((module) => {

module.exports = require("pino");

/***/ }),

/***/ 3009:
/***/ ((module) => {

module.exports = require("pino-pretty");

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

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 3837:
/***/ ((module) => {

module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("./webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(6082));
module.exports = __webpack_exports__;

})();