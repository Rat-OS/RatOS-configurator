"use strict";
(() => {
var exports = {};
exports.id = 920;
exports.ids = [920];
exports.modules = {

/***/ 81:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 17:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 528:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(81);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);


async function handler(req, res) {
    if (req.method !== 'POST') {
        console.log('wrong method', req.method);
        return res.status(405);
    }
    // This is ... not great.. come up with something better
    const scriptRoot = __dirname.split('configurator/')[0] + 'configurator/';
    const body = req.body;
    return new Promise((resolve, reject)=>{
        (0,child_process__WEBPACK_IMPORTED_MODULE_0__.exec)(`sudo ${path__WEBPACK_IMPORTED_MODULE_1___default().join(scriptRoot, 'scripts/add-wifi-network.sh')} ${body.ssid} ${body.passphrase} ${body.country ?? 'GB'}`, (err, stdout)=>{
            if (err) {
                console.log(err);
                return reject(res.status(200).json({
                    result: 'error',
                    type: 'UnknownError',
                    data: {
                        message: 'failed to add network'
                    }
                }));
            }
            resolve(res.status(200).json({
                result: 'success'
            }));
        });
    });
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(528));
module.exports = __webpack_exports__;

})();