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
/* harmony import */ var _helpers_extensions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5581);








const klippyExtension = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    fileName: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    path: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    extensionName: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    errorIfExists: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
    errorIfNotExists: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
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
const symlinkKlippyExtensions = async (errorIfExists)=>{
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_6__.serverSchema.parse(process.env);
    const currentExtensions = getExtensions();
    return await (0,_helpers_extensions__WEBPACK_IMPORTED_MODULE_7__/* .symlinkExtensions */ .b)({
        extensions: currentExtensions,
        options: {
            errorIfExists: errorIfExists
        },
        gitRepoPath: environment.KLIPPER_DIR,
        relativePath,
        saveExtensions
    });
};
const relativePath = (ext)=>{
    return ext.isKinematics ? `klippy/kinematics` : `klippy/extras`;
};
const klippyExtensionsRouter = (0,_trpc__WEBPACK_IMPORTED_MODULE_4__/* .router */ .Nd)({
    register: _trpc__WEBPACK_IMPORTED_MODULE_4__/* .publicProcedure.input */ .$y.input(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        json: klippyExtension
    })).mutation(async ({ input  })=>{
        const currentExtensions = getExtensions();
        const { path: filePath , fileName , errorIfExists , extensionName  } = input.json;
        const extensionPath = path__WEBPACK_IMPORTED_MODULE_5___default().join(filePath, fileName);
        if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(extensionPath)) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
                message: `File "${extensionPath}" does not exist`,
                code: "PRECONDITION_FAILED"
            });
        }
        if (currentExtensions.find((ext)=>ext.extensionName === extensionName || ext.fileName === fileName && !!ext.isKinematics === !!input.json.isKinematics)) {
            if (errorIfExists === true) {
                throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
                    message: `${input.json.isKinematics ? "A kinematic" : "An"} extension called "${extensionName}" with fileName "${fileName}" is already registered`,
                    code: "PRECONDITION_FAILED"
                });
            }
            (0,_helpers_logger__WEBPACK_IMPORTED_MODULE_3__.getLogger)().warn(`${input.json.isKinematics ? "A kinematic" : "An"} extension called "${extensionName}" with the fileName "${fileName}" is already registered, ignoring...`);
            return true;
        }
        currentExtensions.push(input.json);
        saveExtensions(currentExtensions);
        return true;
    }),
    unregister: _trpc__WEBPACK_IMPORTED_MODULE_4__/* .publicProcedure.input */ .$y.input(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        extensionName: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
        errorIfNotExists: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional()
    })).mutation(async ({ input  })=>{
        const currentExtensions = getExtensions();
        const { extensionName  } = input;
        const extensionIndex = currentExtensions.findIndex((ext)=>ext.extensionName === extensionName);
        if (extensionIndex === -1) {
            if (input.errorIfNotExists === true) {
                throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
                    message: `Extension with the name "${extensionName}" is not registered`,
                    code: "PRECONDITION_FAILED"
                });
            }
            (0,_helpers_logger__WEBPACK_IMPORTED_MODULE_3__.getLogger)().warn(`Extension with the name "${extensionName}" is not registered, ignoring...`);
            return {
                result: "success",
                message: `Extension file "${extensionName}" does not exist. Nothing to do.`
            };
        }
        const ext = currentExtensions.splice(extensionIndex, 1);
        if (ext.length !== 1) {
            throw new Error("Failed to remove extension");
        }
        const res = await (0,_helpers_extensions__WEBPACK_IMPORTED_MODULE_7__/* .unlinkExtension */ .Y)({
            extension: ext[0],
            gitRepoPath: _env_schema_mjs__WEBPACK_IMPORTED_MODULE_6__.serverSchema.parse(process.env).KLIPPER_DIR,
            relativePath
        });
        if (res.result === "success") {
            saveExtensions(currentExtensions);
        }
        return res;
    }),
    symlink: _trpc__WEBPACK_IMPORTED_MODULE_4__/* .publicProcedure.input */ .$y.input(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        errorIfExists: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional()
    })).mutation(async ({ input  })=>await symlinkKlippyExtensions(input.errorIfExists)),
    unlink: _trpc__WEBPACK_IMPORTED_MODULE_4__/* .publicProcedure.mutation */ .$y.mutation(async ()=>{
        const currentExtensions = getExtensions();
        return await Promise.all(currentExtensions.map(async (ext)=>{
            const res = await (0,_helpers_extensions__WEBPACK_IMPORTED_MODULE_7__/* .unlinkExtension */ .Y)({
                extension: ext,
                gitRepoPath: _env_schema_mjs__WEBPACK_IMPORTED_MODULE_6__.serverSchema.parse(process.env).KLIPPER_DIR,
                relativePath
            });
            return res;
        }));
    }),
    list: _trpc__WEBPACK_IMPORTED_MODULE_4__/* .publicProcedure.output */ .$y.output(klippyExtensions).query(async ()=>{
        return getExtensions();
    })
});


/***/ })

};
;