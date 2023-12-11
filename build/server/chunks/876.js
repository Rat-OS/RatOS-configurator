"use strict";
exports.id = 876;
exports.ids = [876];
exports.modules = {

/***/ 6165:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clientEnv": () => (/* binding */ clientEnv),
/* harmony export */   "clientSchema": () => (/* binding */ clientSchema),
/* harmony export */   "serverSchema": () => (/* binding */ serverSchema)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8316);
// @ts-check

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */ const serverSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    NODE_ENV: zod__WEBPACK_IMPORTED_MODULE_0__.z["enum"]([
        "development",
        "test",
        "production"
    ]),
    RATOS_CONFIGURATION_PATH: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    RATOS_SCRIPT_DIR: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    KLIPPER_CONFIG_PATH: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    KLIPPER_DIR: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    KLIPPER_ENV: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    MOONRAKER_DIR: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    LOG_FILE: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    RATOS_DATA_DIR: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */ const clientSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    NEXT_PUBLIC_KLIPPER_HOSTNAME: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional()
});
/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */ const clientEnv = {
    NEXT_PUBLIC_KLIPPER_HOSTNAME: ""
};


/***/ })

};
;