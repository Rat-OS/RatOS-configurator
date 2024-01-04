"use strict";
exports.id = 581;
exports.ids = [581];
exports.modules = {

/***/ 5581:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ unlinkExtension),
/* harmony export */   "b": () => (/* binding */ symlinkExtensions)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _file_operations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8145);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2756);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_trpc_server__WEBPACK_IMPORTED_MODULE_5__);






const extension = zod__WEBPACK_IMPORTED_MODULE_3__.z.object({
    fileName: zod__WEBPACK_IMPORTED_MODULE_3__.z.string(),
    path: zod__WEBPACK_IMPORTED_MODULE_3__.z.string(),
    extensionName: zod__WEBPACK_IMPORTED_MODULE_3__.z.string()
});
const options = zod__WEBPACK_IMPORTED_MODULE_3__.z.object({
    errorIfExists: zod__WEBPACK_IMPORTED_MODULE_3__.z.boolean().optional(),
    errorIfNotExists: zod__WEBPACK_IMPORTED_MODULE_3__.z.boolean().optional()
});
const symlinkExtensions = async (props)=>{
    const currentExtensions = props.extensions.slice();
    let cleanedUpExtensions = [];
    if (currentExtensions.length === 0) {
        return {
            report: "No extensions registered, nothing to do.",
            cleanedUpExtensions,
            symlinkResults: []
        };
    }
    const gitExcludePath = path__WEBPACK_IMPORTED_MODULE_2___default().resolve(path__WEBPACK_IMPORTED_MODULE_2___default().join(props.gitRepoPath, ".git", "info", "exclude"));
    const symlinkResults = await Promise.all(currentExtensions.map(async (ext)=>{
        if ((0,fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)(path__WEBPACK_IMPORTED_MODULE_2___default().resolve(path__WEBPACK_IMPORTED_MODULE_2___default().join(ext.path, ext.fileName)))) {
            cleanedUpExtensions.push(ext);
            const relativeDestination = path__WEBPACK_IMPORTED_MODULE_2___default().join(typeof props.relativePath === "function" ? props.relativePath(ext) : props.relativePath, ext.fileName);
            const destination = path__WEBPACK_IMPORTED_MODULE_2___default().resolve(path__WEBPACK_IMPORTED_MODULE_2___default().join(props.gitRepoPath, relativeDestination));
            const excludeLine = new RegExp(`^${relativeDestination}$`);
            const isExcluded = await (0,_file_operations__WEBPACK_IMPORTED_MODULE_4__/* .searchFileByLine */ .M)(gitExcludePath, excludeLine);
            const symlinkExists = (0,fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)(destination);
            try {
                if (symlinkExists === false) {
                    await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.symlink)(path__WEBPACK_IMPORTED_MODULE_2___default().resolve(path__WEBPACK_IMPORTED_MODULE_2___default().join(ext.path, ext.fileName)), destination);
                } else if (props.options?.errorIfExists) {
                    throw new _trpc_server__WEBPACK_IMPORTED_MODULE_5__.TRPCError({
                        code: "PRECONDITION_FAILED",
                        message: `Symlink for "${ext.fileName}" already exists.`
                    });
                }
                if (isExcluded === false) {
                    await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.appendFile)(gitExcludePath, `${relativeDestination}\n`);
                }
                return {
                    result: "success",
                    message: symlinkExists ? `Symlink for "${ext.fileName}" already exists. Skipping.` : `Symlink for "${ext.fileName}" created`
                };
            } catch (e) {
                return {
                    result: "error",
                    message: `Failed to create symlink for "${ext.fileName}"${e instanceof Error ? `:\n\t${e.message}` : ""}`
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
        props.saveExtensions(cleanedUpExtensions);
    }
    const successCount = symlinkResults.filter((r)=>r.result === "success").length;
    let report = `Symlinked ${successCount}/${symlinkResults.length} extension(s): \n`;
    symlinkResults.forEach((r)=>{
        report += `${r.message} \n`;
    });
    return {
        report,
        cleanedUpExtensions,
        symlinkResults
    };
};
const unlinkExtension = async (props)=>{
    const ext = props.extension;
    const relativeDestination = path__WEBPACK_IMPORTED_MODULE_2___default().join(typeof props.relativePath === "function" ? props.relativePath(ext) : props.relativePath, ext.fileName);
    const gitExcludePath = path__WEBPACK_IMPORTED_MODULE_2___default().resolve(props.gitRepoPath, ".git", "info", "exclude");
    const destination = path__WEBPACK_IMPORTED_MODULE_2___default().resolve(path__WEBPACK_IMPORTED_MODULE_2___default().join(props.gitRepoPath, relativeDestination));
    if ((0,fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)(path__WEBPACK_IMPORTED_MODULE_2___default().resolve(path__WEBPACK_IMPORTED_MODULE_2___default().join(ext.path, ext.fileName)))) {
        const excludeLine = new RegExp(`^${relativeDestination}$`);
        // Remove extension from git exclude file
        await (0,_file_operations__WEBPACK_IMPORTED_MODULE_4__/* .replaceInFileByLine */ .u)(gitExcludePath, excludeLine, null);
        const symlinkExists = (0,fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)(destination);
        try {
            if (symlinkExists === true) {
                await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.unlink)(destination);
            } else if (props.options?.errorIfNotExists) {
                throw new _trpc_server__WEBPACK_IMPORTED_MODULE_5__.TRPCError({
                    code: "PRECONDITION_FAILED",
                    message: `Symlink for "${ext.fileName}" doesn't exist.`
                });
            }
            return {
                result: "success",
                message: symlinkExists ? `Symlink for "${ext.fileName}" has been removed.` : `Symlink for "${ext.fileName}" doesn't exist. Skipping.`
            };
        } catch (e) {
            return {
                result: "error",
                message: `Failed to remove symlink for "${ext.fileName}"`
            };
        }
    } else {
        return {
            result: "success",
            message: `Extension file "${ext.fileName}" does not exist in ${ext.path}. Nothing to do.`
        };
    }
};


/***/ })

};
;