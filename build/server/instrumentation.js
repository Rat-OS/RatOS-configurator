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
        const { getLogger  } = await Promise.all(/* import() */[__webpack_require__.e(876), __webpack_require__.e(799)]).then(__webpack_require__.bind(__webpack_require__, 799));
        const { existsSync , mkdirSync  } = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 7147, 23));
        const { regenerateKlipperConfiguration  } = await Promise.all(/* import() */[__webpack_require__.e(323), __webpack_require__.e(876), __webpack_require__.e(680), __webpack_require__.e(815), __webpack_require__.e(945), __webpack_require__.e(377), __webpack_require__.e(96), __webpack_require__.e(140), __webpack_require__.e(390)]).then(__webpack_require__.bind(__webpack_require__, 6390));
        const { serverSchema  } = await __webpack_require__.e(/* import() */ 876).then(__webpack_require__.bind(__webpack_require__, 6165));
        const { symlinkKlippyExtensions  } = await Promise.all(/* import() */[__webpack_require__.e(876), __webpack_require__.e(815), __webpack_require__.e(581), __webpack_require__.e(4)]).then(__webpack_require__.bind(__webpack_require__, 4004));
        const { symlinkMoonrakerExtensions  } = await Promise.all(/* import() */[__webpack_require__.e(876), __webpack_require__.e(815), __webpack_require__.e(581), __webpack_require__.e(974)]).then(__webpack_require__.bind(__webpack_require__, 7974));
        const { klipperRestart  } = await Promise.all(/* import() */[__webpack_require__.e(876), __webpack_require__.e(140), __webpack_require__.e(711)]).then(__webpack_require__.bind(__webpack_require__, 7140));
        const dns = await Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 9523, 23));
        dns.setDefaultResultOrder("ipv4first");
        const logger = getLogger();
        const environment = serverSchema.parse(process.env);
        const dataDir = environment.RATOS_DATA_DIR;
        if (!existsSync(dataDir)) {
            logger.info("Creating RatOS data directory..");
            mkdirSync(dataDir);
        }
        try {
            logger.info("Symlinking klippy extensions...");
            logger.info((await symlinkKlippyExtensions()).report);
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Failed to symlink klippy extensions: ${e.message}`);
            }
        }
        try {
            logger.info("Symlinking moonraker extensions...");
            logger.info((await symlinkMoonrakerExtensions()).report);
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Failed to symlink moonraker extensions: ${e.message}`);
            }
        }
        try {
            logger.info("Regenerating last known config...");
            await regenerateKlipperConfiguration();
            logger.info("Config regenerated!");
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Failed to regenerate config: ${e.message}`);
            }
            return;
        }
        logger.info("Restart klipper..");
        try {
            const restarted = await klipperRestart();
            if (restarted) {
                logger.info("Klipper restarted!");
            } else {
                logger.info(`Klipper was in a busy state. Please restart manually.`);
            }
        } catch (e) {
            if (e instanceof Error) {
                logger.error(`Failed to restart klipper: ${e.message}`);
            }
        }
    }
};


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

/***/ 9523:
/***/ ((module) => {

module.exports = require("dns");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 3292:
/***/ ((module) => {

module.exports = require("fs/promises");

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