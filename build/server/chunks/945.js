"use strict";
exports.id = 945;
exports.ids = [945];
exports.modules = {

/***/ 945:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SX": () => (/* binding */ trpc),
/* harmony export */   "uF": () => (/* binding */ proxyClient)
/* harmony export */ });
/* unused harmony export getBaseUrl */
/* harmony import */ var _trpc_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5337);
/* harmony import */ var _trpc_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_trpc_client__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _trpc_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5323);


function getBaseUrl() {
    if (false) // browser should use relative path
    {}
    if (process.env.RENDER_INTERNAL_HOSTNAME) // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}/configure`;
    // assume localhost
    return `http://127.0.0.1:${process.env.PORT ?? 3000}/configure`;
}
const trpc = (0,_trpc_next__WEBPACK_IMPORTED_MODULE_1__/* .createTRPCNext */ .t)({
    config () {
        return {
            links: [
                (0,_trpc_client__WEBPACK_IMPORTED_MODULE_0__.httpBatchLink)({
                    /**
					 * @link https://trpc.io/docs/ssr
					 **/ url: `${getBaseUrl()}/api/trpc`,
                    maxURLLength: 2083
                })
            ]
        };
    },
    /**
	 * @link https://trpc.io/docs/ssr
	 **/ ssr: false
});
const proxyClient = (0,_trpc_client__WEBPACK_IMPORTED_MODULE_0__.createTRPCProxyClient)({
    links: [
        (0,_trpc_client__WEBPACK_IMPORTED_MODULE_0__.httpBatchLink)({
            /**
			 * @link https://trpc.io/docs/ssr
			 **/ url: `${getBaseUrl()}/api/trpc`,
            maxURLLength: 2083
        })
    ]
});


/***/ })

};
;