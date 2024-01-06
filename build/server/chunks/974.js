"use strict";
exports.id = 974;
exports.ids = [974];
exports.modules = {

/***/ 7974:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "moonrakerExtensionsRouter": () => (/* binding */ moonrakerExtensionsRouter),
/* harmony export */   "symlinkMoonrakerExtensions": () => (/* binding */ symlinkMoonrakerExtensions)
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








const moonrakerExtension = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    fileName: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    path: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    extensionName: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    errorIfExists: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional()
});
const moonrakerExtensions = zod__WEBPACK_IMPORTED_MODULE_0__.z.array(moonrakerExtension);
const getExtensions = ()=>{
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_6__.serverSchema.parse(process.env);
    const extensionDir = environment.RATOS_DATA_DIR;
    const moonrakerExtensionsFile = path__WEBPACK_IMPORTED_MODULE_5___default().join(extensionDir, "moonraker-extensions.json");
    if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(extensionDir)) {
        (0,fs__WEBPACK_IMPORTED_MODULE_2__.mkdirSync)(extensionDir);
    }
    if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(moonrakerExtensionsFile)) {
        (0,fs__WEBPACK_IMPORTED_MODULE_2__.writeFileSync)(moonrakerExtensionsFile, "[]");
    }
    const currentExtensions = moonrakerExtensions.parse(JSON.parse((0,fs__WEBPACK_IMPORTED_MODULE_2__.readFileSync)(moonrakerExtensionsFile).toString()));
    return currentExtensions;
};
const saveExtensions = (extensions)=>{
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_6__.serverSchema.parse(process.env);
    const extensionDir = environment.RATOS_DATA_DIR;
    const moonrakerExtensionsFile = path__WEBPACK_IMPORTED_MODULE_5___default().join(extensionDir, "moonraker-extensions.json");
    if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(extensionDir)) {
        (0,fs__WEBPACK_IMPORTED_MODULE_2__.mkdirSync)(extensionDir);
    }
    (0,fs__WEBPACK_IMPORTED_MODULE_2__.writeFileSync)(moonrakerExtensionsFile, JSON.stringify(extensions));
};
const symlinkMoonrakerExtensions = async (errorIfExists)=>{
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_6__.serverSchema.parse(process.env);
    const currentExtensions = getExtensions();
    return await (0,_helpers_extensions__WEBPACK_IMPORTED_MODULE_7__/* .symlinkExtensions */ .b)({
        extensions: currentExtensions,
        options: {
            errorIfExists: errorIfExists
        },
        gitRepoPath: environment.MOONRAKER_DIR,
        relativePath: ()=>`moonraker/components`,
        saveExtensions
    });
};
const moonrakerExtensionsRouter = (0,_trpc__WEBPACK_IMPORTED_MODULE_4__/* .router */ .Nd)({
    register: _trpc__WEBPACK_IMPORTED_MODULE_4__/* .publicProcedure.input */ .$y.input(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        json: moonrakerExtension
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
        if (currentExtensions.find((ext)=>ext.fileName === fileName)) {
            if (errorIfExists === true) {
                (0,_helpers_logger__WEBPACK_IMPORTED_MODULE_3__.getLogger)().error(`An extension with the fileName "${fileName}" is already registered`);
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
    symlink: _trpc__WEBPACK_IMPORTED_MODULE_4__/* .publicProcedure.input */ .$y.input(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        errorIfExists: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional()
    })).mutation(async ({ input  })=>await symlinkMoonrakerExtensions(input.errorIfExists)),
    unlink: _trpc__WEBPACK_IMPORTED_MODULE_4__/* .publicProcedure.mutation */ .$y.mutation(async ()=>{
        const currentExtensions = getExtensions();
        const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_6__.serverSchema.parse(process.env);
        return await Promise.all(currentExtensions.map(async (ext)=>{
            const res = await (0,_helpers_extensions__WEBPACK_IMPORTED_MODULE_7__/* .unlinkExtension */ .Y)({
                extension: ext,
                gitRepoPath: environment.MOONRAKER_DIR,
                relativePath: "moonraker/components"
            });
            return res;
        }));
    }),
    unregister: _trpc__WEBPACK_IMPORTED_MODULE_4__/* .publicProcedure.input */ .$y.input(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        extensionName: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
        errorIfNotExists: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional()
    })).mutation(async ({ input  })=>{
        const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_6__.serverSchema.parse(process.env);
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
                message: `Extension with the name "${extensionName}" is not registered`
            };
        }
        const ext = currentExtensions.splice(extensionIndex, 1);
        if (ext.length !== 1) {
            throw new Error("Failed to remove extension");
        }
        const res = await (0,_helpers_extensions__WEBPACK_IMPORTED_MODULE_7__/* .unlinkExtension */ .Y)({
            extension: ext[0],
            gitRepoPath: environment.MOONRAKER_DIR,
            relativePath: "moonraker/components"
        });
        if (res.result === "success") {
            saveExtensions(currentExtensions);
        }
        return res;
    }),
    list: _trpc__WEBPACK_IMPORTED_MODULE_4__/* .publicProcedure.output */ .$y.output(moonrakerExtensions).query(async ()=>{
        return getExtensions();
    })
});


/***/ })

};
;