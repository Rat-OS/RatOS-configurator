"use strict";
exports.id = 4;
exports.ids = [4];
exports.modules = {

/***/ 4004:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "klippyExtensionsRouter": () => (/* binding */ klippyExtensionsRouter),
/* harmony export */   "symlinkKlippyExtensions": () => (/* binding */ symlinkKlippyExtensions)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2756);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_trpc_server__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(799);
/* harmony import */ var _trpc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5601);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _env_schema_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6165);
/* harmony import */ var _helpers_file_operations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8145);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_8__);









const klippyExtension = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    fileName: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    path: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    extensionName: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    errorIfExists: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
    isKinematics: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional()
});
const klippyExtensions = zod__WEBPACK_IMPORTED_MODULE_0__.z.array(klippyExtension);
const getExtensions = ()=>{
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_6__.serverSchema.parse(process.env);
    const extensionDir = environment.RATOS_DATA_DIR;
    const klippyExtensionsFile = path__WEBPACK_IMPORTED_MODULE_5___default().join(extensionDir, "klippy-extensions.json");
    if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(extensionDir)) {
        (0,fs__WEBPACK_IMPORTED_MODULE_2__.mkdirSync)(extensionDir);
    }
    if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(klippyExtensionsFile)) {
        (0,fs__WEBPACK_IMPORTED_MODULE_2__.writeFileSync)(klippyExtensionsFile, "[]");
    }
    const currentExtensions = klippyExtensions.parse(JSON.parse((0,fs__WEBPACK_IMPORTED_MODULE_2__.readFileSync)(klippyExtensionsFile).toString()));
    return currentExtensions;
};
const saveExtensions = (extensions)=>{
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_6__.serverSchema.parse(process.env);
    const extensionDir = environment.RATOS_DATA_DIR;
    const klippyExtensionsFile = path__WEBPACK_IMPORTED_MODULE_5___default().join(extensionDir, "klippy-extensions.json");
    if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(extensionDir)) {
        (0,fs__WEBPACK_IMPORTED_MODULE_2__.mkdirSync)(extensionDir);
    }
    (0,fs__WEBPACK_IMPORTED_MODULE_2__.writeFileSync)(klippyExtensionsFile, JSON.stringify(extensions));
};
const symlinkKlippyExtensions = async ()=>{
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_6__.serverSchema.parse(process.env);
    const currentExtensions = getExtensions();
    if (currentExtensions.length === 0) {
        return "No extensions registered, nothing to do.";
    }
    let cleanedUpExtensions = [];
    const gitExcludePath = path__WEBPACK_IMPORTED_MODULE_5___default().resolve(path__WEBPACK_IMPORTED_MODULE_5___default().join(environment.KLIPPER_DIR, ".git", "info", "exclude"));
    const symlinkResults = await Promise.all(currentExtensions.map(async (ext)=>{
        if ((0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(path__WEBPACK_IMPORTED_MODULE_5___default().resolve(path__WEBPACK_IMPORTED_MODULE_5___default().join(ext.path, ext.fileName)))) {
            const relativeDestination = ext.isKinematics ? `klippy/kinematics/${ext.fileName}` : `klippy/extras/${ext.fileName}`;
            const destination = path__WEBPACK_IMPORTED_MODULE_5___default().resolve(path__WEBPACK_IMPORTED_MODULE_5___default().join(environment.KLIPPER_DIR, relativeDestination));
            cleanedUpExtensions.push(ext);
            const excludeLine = new RegExp(`^${relativeDestination}$`);
            const isExcluded = await (0,_helpers_file_operations__WEBPACK_IMPORTED_MODULE_7__/* .searchFileByLine */ .M)(gitExcludePath, excludeLine);
            const symlinkExists = (0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(path__WEBPACK_IMPORTED_MODULE_5___default().resolve(path__WEBPACK_IMPORTED_MODULE_5___default().join(environment.MOONRAKER_DIR, "moonraker/components", ext.fileName)));
            if ((0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(destination)) {
                return {
                    result: "success",
                    message: `Symlink for "${ext.fileName}" already exists`
                };
            }
            try {
                if (symlinkExists === false) {
                    await (0,fs_promises__WEBPACK_IMPORTED_MODULE_8__.symlink)(path__WEBPACK_IMPORTED_MODULE_5___default().resolve(path__WEBPACK_IMPORTED_MODULE_5___default().join(ext.path, ext.fileName)), destination);
                }
                if (isExcluded === false) {
                    await (0,fs_promises__WEBPACK_IMPORTED_MODULE_8__.appendFile)(gitExcludePath, `${relativeDestination}\n`);
                }
                return {
                    result: "success",
                    message: symlinkExists ? `Symlink for "${ext.fileName}" already exists. Skipping.` : `Symlink for "${ext.fileName}" created`
                };
            } catch (e) {
                return {
                    result: "error",
                    message: `Failed to create symlink for "${ext.fileName}"`
                };
            }
        } else {
            return {
                result: "error",
                message: `Extension file "${ext.fileName}" does not exist in ${ext.path} and has been removed from the list of registered extensions`
            };
        }
    }));
    if (cleanedUpExtensions.length !== currentExtensions.length) {
        saveExtensions(cleanedUpExtensions);
    }
    const successCount = symlinkResults.filter((r)=>r.result === "success").length;
    let report = `Symlinked ${successCount}/${symlinkResults.length} extension(s): \n`;
    symlinkResults.forEach((r)=>{
        report += `${r.message} \n`;
    });
    return report;
};
const klippyExtensionsRouter = (0,_trpc__WEBPACK_IMPORTED_MODULE_4__/* .router */ .Nd)({
    register: _trpc__WEBPACK_IMPORTED_MODULE_4__/* .publicProcedure.input */ .$y.input(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        json: klippyExtension
    })).mutation(async ({ input  })=>{
        const currentExtensions = getExtensions();
        const { path: filePath , fileName , errorIfExists  } = input.json;
        const extensionPath = path__WEBPACK_IMPORTED_MODULE_5___default().join(filePath, fileName);
        if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(extensionPath)) {
            (0,_helpers_logger__WEBPACK_IMPORTED_MODULE_3__.getLogger)().error(`File "${extensionPath}" does not exist`);
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
                message: `File "${extensionPath}" does not exist`,
                code: "PRECONDITION_FAILED"
            });
        }
        if (currentExtensions.find((ext)=>ext.fileName === fileName && !!ext.isKinematics === !!input.json.isKinematics)) {
            if (errorIfExists === true) {
                (0,_helpers_logger__WEBPACK_IMPORTED_MODULE_3__.getLogger)().error(`${input.json.isKinematics ? "A kinematic" : "An"} extension with the fileName "${fileName}" is already registered`);
                throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
                    message: `An extension with the fileName "${fileName}" is already registered`,
                    code: "PRECONDITION_FAILED"
                });
            }
            (0,_helpers_logger__WEBPACK_IMPORTED_MODULE_3__.getLogger)().warn(`An extension with the fileName "${fileName}" is already registered, ignoring...`);
            return true;
        }
        currentExtensions.push(input.json);
        saveExtensions(currentExtensions);
        return true;
    }),
    symlink: _trpc__WEBPACK_IMPORTED_MODULE_4__/* .publicProcedure.mutation */ .$y.mutation(symlinkKlippyExtensions),
    list: _trpc__WEBPACK_IMPORTED_MODULE_4__/* .publicProcedure.output */ .$y.output(klippyExtensions).query(async ()=>{
        return getExtensions();
    })
});


/***/ })

};
;