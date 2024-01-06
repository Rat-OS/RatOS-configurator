"use strict";
(() => {
var exports = {};
exports.id = 829;
exports.ids = [829];
exports.modules = {

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

/***/ }),

/***/ 1350:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _trpc_)
});

// EXTERNAL MODULE: ./server/helpers/logger.ts
var logger = __webpack_require__(4279);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(7147);
// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(3837);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(2081);
// EXTERNAL MODULE: ./helpers/util.ts
var util = __webpack_require__(2633);
;// CONCATENATED MODULE: ./server/helpers/iw.ts
/*
 * Copyright (c) 2015 Christopher M. Baker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Modified and converted to TS by Mikkel Schmidt.
 */ 

/**
 * Returns a truthy if the network has an ssid; falsy otherwise.
 *
 * @private
 * @static
 * @category iw
 * @param {object} network The scanned network object.
 * @returns {string} The ssid.
 *
 */ const hasSsid = (network)=>{
    return network.ssid;
};
/**
 * Returns a truthy if the network has any key; falsy otherwise.
 *
 * @private
 * @static
 * @category iw
 * @param {object} network The scanned network object.
 * @returns {boolean} True if any key.
 *
 */ const hasKeys = (network)=>{
    return Object.keys(network).length !== 0;
};
/**
 * A comparison function to sort networks ordered by signal strength.
 *
 * @private
 * @static
 * @category iw
 * @param {object} a A scanned network object.
 * @param {object} b Another scanned network object.
 * @returns {number} The comparison value.
 *
 */ const bySignal = (a, b)=>{
    return b.signal - a.signal;
};
/**
 * Parses a scanned wireless network cell.
 *
 * @private
 * @static
 * @category iw
 * @param {string} cell The section of stdout for the cell.
 * @returns {object} The scanned network object.
 *
 */ const parseCell = (cell)=>{
    var parsed = {};
    var match;
    if (match = cell.match(/BSS ([0-9A-Fa-f:-]{17})\(on/)) {
        parsed.address = match[1].toLowerCase();
    }
    if (match = cell.match(/freq: ([0-9]+)/)) {
        parsed.frequency = parseInt(match[1], 10);
    }
    if (match = cell.match(/signal: (-?[0-9.]+) dBm/)) {
        parsed.signal = parseFloat(match[1]);
    }
    if (match = cell.match(/last seen: ([0-9]+) ms ago/)) {
        parsed.lastSeenMs = parseInt(match[1], 10);
    }
    if (match = cell.match(/SSID: \\x00/)) {
        delete parsed.ssid;
    } else if (match = cell.match(/SSID: ([^\n]*)/)) {
        parsed.ssid = match[1];
    }
    if (match = cell.match(/Country: ([^\t]*)/)) {
        parsed.country = match[1];
    }
    if (match = cell.match(/DS Parameter set: channel ([0-9]+)/)) {
        parsed.channel = parseInt(match[1], 10);
    } else if (match = cell.match(/\* primary channel: ([0-9]+)/)) {
        parsed.channel = parseInt(match[1], 10);
    }
    if (match = cell.match(/RSN:[\s*]+Version: 1/)) {
        parsed.security = "wpa2";
    } else if (match = cell.match(/WPA:[\s*]+Version: 1/)) {
        parsed.security = "wpa";
    } else if (match = cell.match(/capability: ESS Privacy/)) {
        parsed.security = "wep";
    } else if (match = cell.match(/capability: ESS/)) {
        parsed.security = "open";
    }
    return parsed;
};
/**
 * Parses all scanned wireless network cells.
 *
 * @private
 * @static
 * @category iw
 * @param {function} callback The callback function.
 *
 */ const parseScan = (show_hidden)=>{
    return function({ stdout , stderr  }) {
        if (show_hidden) {
            return stdout.split(/(^|\n)(?=BSS )/).map(parseCell).filter(hasKeys).sort(bySignal);
        } else {
            return stdout.split(/(^|\n)(?=BSS )/).map(parseCell).filter(hasSsid).sort(bySignal);
        }
    };
};
const getWirelessInterface = async ()=>{
    const wifiInterface = await (0,external_util_.promisify)(external_child_process_.exec)(`iw dev | awk '$1=="Interface"{print $2}' | head -n1`);
    return wifiInterface.stdout.trim();
};
/**
 * The **iw scan** command is used to scan for wireless networks
 * visible to a wireless interface. For convenience, the networks are
 * sorted by signal strength.
 */ const scan = async (interfaceName, options)=>{
    const apForce = options.apForce ? " ap-force" : "";
    const iwResult = await (0,external_util_.promisify)(external_child_process_.exec)("sudo iw dev " + interfaceName + " scan" + apForce);
    return parseScan(options.showHidden ?? false)(iwResult);
};
/**
 * The **iw** command is used to control nl80211 radios.
 *
 * @static
 * @category iw
 *
 */ const iw = {
    scan: scan
};
/* harmony default export */ const helpers_iw = ((/* unused pure expression or super */ null && (iw)));

// EXTERNAL MODULE: external "zod"
var external_zod_ = __webpack_require__(8316);
;// CONCATENATED MODULE: ./helpers/validators/wifi.ts

const hostnameInput = external_zod_.z.object({
    hostname: external_zod_.z.string().min(2).regex(/^([a-zA-Z0-9]|-)+$/, "Hostname can only include a-Z, 0-9 and dashes.")
});
const joinInput = external_zod_.z.object({
    ssid: external_zod_.z.string(),
    passphrase: external_zod_.z.string().min(8).max(63),
    country: external_zod_.z.string().optional()
});

// EXTERNAL MODULE: ./server/helpers/run-script.ts
var run_script = __webpack_require__(1554);
// EXTERNAL MODULE: ./server/trpc.ts
var trpc = __webpack_require__(8199);
// EXTERNAL MODULE: external "@trpc/server"
var server_ = __webpack_require__(2756);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1017);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);
;// CONCATENATED MODULE: ./server/routers/wifi.ts










const wifiRouter = (0,trpc/* router */.Nd)({
    hostname: trpc/* publicProcedure.input */.$y.input(hostnameInput).mutation(async ({ input  })=>{
        const scriptRoot = (0,util/* getScriptRoot */.x)();
        try {
            const result = await (0,external_util_.promisify)(external_child_process_.exec)(`sudo ${external_path_default().join(scriptRoot, "change-hostname.sh")} ${input.hostname}`);
        } catch (e) {
            if (e instanceof Error) {
                (0,logger/* getLogger */.j)().error(e.message);
            }
            throw new server_.TRPCError({
                message: "An error occured while attempting to change the hostname",
                code: "INTERNAL_SERVER_ERROR",
                cause: e
            });
        }
        return {
            result: "success"
        };
    }),
    join: trpc/* publicProcedure.input */.$y.input(joinInput).mutation(async ({ input  })=>{
        try {
            await (0,run_script/* runSudoScript */.$)("add-wifi-network.sh", input.ssid, input.passphrase, input.country ?? "GB");
        } catch (e) {
            if (e instanceof Error) {
                (0,logger/* getLogger */.j)().error(e.message);
            }
            throw new server_.TRPCError({
                message: "Invalid wifi credentials",
                code: "PRECONDITION_FAILED",
                cause: e
            });
        }
        return {
            result: "success"
        };
    }),
    scan: trpc/* publicProcedure.query */.$y.query(async ()=>{
        const wirelessInterface = await getWirelessInterface();
        if (wirelessInterface == null || wirelessInterface.trim() === "") {
            throw new server_.TRPCError({
                message: "No wifi interface available on device, if you're connected via ethernet you can skip this step.",
                code: "INTERNAL_SERVER_ERROR"
            });
        }
        try {
            // if (process.env.NODE_ENV === 'development') {
            // 	return [];
            // }
            return await scan(wirelessInterface, {
                apForce: true
            });
        } catch (e) {
            if (e instanceof Error) {
                (0,logger/* getLogger */.j)().error(e.message);
            }
            throw new server_.TRPCError({
                message: "Failed to scan wifi networks",
                code: "INTERNAL_SERVER_ERROR",
                cause: e
            });
        }
    })
});

// EXTERNAL MODULE: ./server/routers/mcu.ts
var mcu = __webpack_require__(3459);
// EXTERNAL MODULE: ./env/schema.mjs
var schema = __webpack_require__(954);
// EXTERNAL MODULE: external "fs/promises"
var promises_ = __webpack_require__(3292);
// EXTERNAL MODULE: ./server/helpers/file-operations.ts
var file_operations = __webpack_require__(8736);
;// CONCATENATED MODULE: ./server/helpers/extensions.ts






const extension = external_zod_.z.object({
    fileName: external_zod_.z.string(),
    path: external_zod_.z.string(),
    extensionName: external_zod_.z.string()
});
const options = external_zod_.z.object({
    errorIfExists: external_zod_.z.boolean().optional(),
    errorIfNotExists: external_zod_.z.boolean().optional()
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
    const gitExcludePath = external_path_default().resolve(external_path_default().join(props.gitRepoPath, ".git", "info", "exclude"));
    const symlinkResults = await Promise.all(currentExtensions.map(async (ext)=>{
        if ((0,external_fs_.existsSync)(external_path_default().resolve(external_path_default().join(ext.path, ext.fileName)))) {
            cleanedUpExtensions.push(ext);
            const relativeDestination = external_path_default().join(typeof props.relativePath === "function" ? props.relativePath(ext) : props.relativePath, ext.fileName);
            const destination = external_path_default().resolve(external_path_default().join(props.gitRepoPath, relativeDestination));
            const excludeLine = new RegExp(`^${relativeDestination}$`);
            const isExcluded = await (0,file_operations/* searchFileByLine */.M)(gitExcludePath, excludeLine);
            const symlinkExists = (0,external_fs_.existsSync)(destination);
            try {
                if (symlinkExists === false) {
                    await (0,promises_.symlink)(external_path_default().resolve(external_path_default().join(ext.path, ext.fileName)), destination);
                } else if (props.options?.errorIfExists) {
                    throw new server_.TRPCError({
                        code: "PRECONDITION_FAILED",
                        message: `Symlink for "${ext.fileName}" already exists.`
                    });
                }
                if (isExcluded === false) {
                    await (0,promises_.appendFile)(gitExcludePath, `${relativeDestination}\n`);
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
    const relativeDestination = external_path_default().join(typeof props.relativePath === "function" ? props.relativePath(ext) : props.relativePath, ext.fileName);
    const gitExcludePath = external_path_default().resolve(props.gitRepoPath, ".git", "info", "exclude");
    const destination = external_path_default().resolve(external_path_default().join(props.gitRepoPath, relativeDestination));
    if ((0,external_fs_.existsSync)(external_path_default().resolve(external_path_default().join(ext.path, ext.fileName)))) {
        const excludeLine = new RegExp(`^${relativeDestination}$`);
        // Remove extension from git exclude file
        await (0,file_operations/* replaceInFileByLine */.u)(gitExcludePath, excludeLine, null);
        const symlinkExists = (0,external_fs_.existsSync)(destination);
        try {
            if (symlinkExists === true) {
                await (0,promises_.unlink)(destination);
            } else if (props.options?.errorIfNotExists) {
                throw new server_.TRPCError({
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

;// CONCATENATED MODULE: ./server/routers/klippy-extensions.ts








const klippyExtension = external_zod_.z.object({
    fileName: external_zod_.z.string(),
    path: external_zod_.z.string(),
    extensionName: external_zod_.z.string(),
    errorIfExists: external_zod_.z.boolean().optional(),
    errorIfNotExists: external_zod_.z.boolean().optional(),
    isKinematics: external_zod_.z.boolean().optional()
});
const klippyExtensions = external_zod_.z.array(klippyExtension);
const getExtensions = ()=>{
    const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
    const extensionDir = environment.RATOS_DATA_DIR;
    const klippyExtensionsFile = external_path_default().join(extensionDir, "klippy-extensions.json");
    if (!(0,external_fs_.existsSync)(extensionDir)) {
        (0,external_fs_.mkdirSync)(extensionDir);
    }
    if (!(0,external_fs_.existsSync)(klippyExtensionsFile)) {
        (0,external_fs_.writeFileSync)(klippyExtensionsFile, "[]");
    }
    const currentExtensions = klippyExtensions.parse(JSON.parse((0,external_fs_.readFileSync)(klippyExtensionsFile).toString()));
    return currentExtensions;
};
const saveExtensions = (extensions)=>{
    const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
    const extensionDir = environment.RATOS_DATA_DIR;
    const klippyExtensionsFile = external_path_default().join(extensionDir, "klippy-extensions.json");
    if (!(0,external_fs_.existsSync)(extensionDir)) {
        (0,external_fs_.mkdirSync)(extensionDir);
    }
    (0,external_fs_.writeFileSync)(klippyExtensionsFile, JSON.stringify(extensions));
};
const symlinkKlippyExtensions = async (errorIfExists)=>{
    const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
    const currentExtensions = getExtensions();
    return await symlinkExtensions({
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
const klippyExtensionsRouter = (0,trpc/* router */.Nd)({
    register: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        json: klippyExtension
    })).mutation(async ({ input  })=>{
        const currentExtensions = getExtensions();
        const { path: filePath , fileName , errorIfExists , extensionName  } = input.json;
        const extensionPath = external_path_default().join(filePath, fileName);
        if (!(0,external_fs_.existsSync)(extensionPath)) {
            throw new server_.TRPCError({
                message: `File "${extensionPath}" does not exist`,
                code: "PRECONDITION_FAILED"
            });
        }
        if (currentExtensions.find((ext)=>ext.extensionName === extensionName || ext.fileName === fileName && !!ext.isKinematics === !!input.json.isKinematics)) {
            if (errorIfExists === true) {
                throw new server_.TRPCError({
                    message: `${input.json.isKinematics ? "A kinematic" : "An"} extension called "${extensionName}" with fileName "${fileName}" is already registered`,
                    code: "PRECONDITION_FAILED"
                });
            }
            (0,logger/* getLogger */.j)().warn(`${input.json.isKinematics ? "A kinematic" : "An"} extension called "${extensionName}" with the fileName "${fileName}" is already registered, ignoring...`);
            return true;
        }
        currentExtensions.push(input.json);
        saveExtensions(currentExtensions);
        return true;
    }),
    unregister: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        extensionName: external_zod_.z.string(),
        errorIfNotExists: external_zod_.z.boolean().optional()
    })).mutation(async ({ input  })=>{
        const currentExtensions = getExtensions();
        const { extensionName  } = input;
        const extensionIndex = currentExtensions.findIndex((ext)=>ext.extensionName === extensionName);
        if (extensionIndex === -1) {
            if (input.errorIfNotExists === true) {
                throw new server_.TRPCError({
                    message: `Extension with the name "${extensionName}" is not registered`,
                    code: "PRECONDITION_FAILED"
                });
            }
            (0,logger/* getLogger */.j)().warn(`Extension with the name "${extensionName}" is not registered, ignoring...`);
            return {
                result: "success",
                message: `Extension file "${extensionName}" does not exist. Nothing to do.`
            };
        }
        const ext = currentExtensions.splice(extensionIndex, 1);
        if (ext.length !== 1) {
            throw new Error("Failed to remove extension");
        }
        const res = await unlinkExtension({
            extension: ext[0],
            gitRepoPath: schema/* serverSchema.parse */.Rz.parse(process.env).KLIPPER_DIR,
            relativePath
        });
        if (res.result === "success") {
            saveExtensions(currentExtensions);
        }
        return res;
    }),
    symlink: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        errorIfExists: external_zod_.z.boolean().optional()
    })).mutation(async ({ input  })=>await symlinkKlippyExtensions(input.errorIfExists)),
    unlink: trpc/* publicProcedure.mutation */.$y.mutation(async ()=>{
        const currentExtensions = getExtensions();
        return await Promise.all(currentExtensions.map(async (ext)=>{
            const res = await unlinkExtension({
                extension: ext,
                gitRepoPath: schema/* serverSchema.parse */.Rz.parse(process.env).KLIPPER_DIR,
                relativePath
            });
            return res;
        }));
    }),
    list: trpc/* publicProcedure.output */.$y.output(klippyExtensions).query(async ()=>{
        return getExtensions();
    })
});

;// CONCATENATED MODULE: ./server/routers/moonraker-extensions.ts








const moonrakerExtension = external_zod_.z.object({
    fileName: external_zod_.z.string(),
    path: external_zod_.z.string(),
    extensionName: external_zod_.z.string(),
    errorIfExists: external_zod_.z.boolean().optional()
});
const moonrakerExtensions = external_zod_.z.array(moonrakerExtension);
const moonraker_extensions_getExtensions = ()=>{
    const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
    const extensionDir = environment.RATOS_DATA_DIR;
    const moonrakerExtensionsFile = external_path_default().join(extensionDir, "moonraker-extensions.json");
    if (!(0,external_fs_.existsSync)(extensionDir)) {
        (0,external_fs_.mkdirSync)(extensionDir);
    }
    if (!(0,external_fs_.existsSync)(moonrakerExtensionsFile)) {
        (0,external_fs_.writeFileSync)(moonrakerExtensionsFile, "[]");
    }
    const currentExtensions = moonrakerExtensions.parse(JSON.parse((0,external_fs_.readFileSync)(moonrakerExtensionsFile).toString()));
    return currentExtensions;
};
const moonraker_extensions_saveExtensions = (extensions)=>{
    const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
    const extensionDir = environment.RATOS_DATA_DIR;
    const moonrakerExtensionsFile = external_path_default().join(extensionDir, "moonraker-extensions.json");
    if (!(0,external_fs_.existsSync)(extensionDir)) {
        (0,external_fs_.mkdirSync)(extensionDir);
    }
    (0,external_fs_.writeFileSync)(moonrakerExtensionsFile, JSON.stringify(extensions));
};
const symlinkMoonrakerExtensions = async (errorIfExists)=>{
    const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
    const currentExtensions = moonraker_extensions_getExtensions();
    return await symlinkExtensions({
        extensions: currentExtensions,
        options: {
            errorIfExists: errorIfExists
        },
        gitRepoPath: environment.MOONRAKER_DIR,
        relativePath: ()=>`moonraker/components`,
        saveExtensions: moonraker_extensions_saveExtensions
    });
};
const moonrakerExtensionsRouter = (0,trpc/* router */.Nd)({
    register: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        json: moonrakerExtension
    })).mutation(async ({ input  })=>{
        const currentExtensions = moonraker_extensions_getExtensions();
        const { path: filePath , fileName , errorIfExists  } = input.json;
        const extensionPath = external_path_default().join(filePath, fileName);
        if (!(0,external_fs_.existsSync)(extensionPath)) {
            (0,logger/* getLogger */.j)().error(`File "${extensionPath}" does not exist`);
            throw new server_.TRPCError({
                message: `File "${extensionPath}" does not exist`,
                code: "PRECONDITION_FAILED"
            });
        }
        if (currentExtensions.find((ext)=>ext.fileName === fileName)) {
            if (errorIfExists === true) {
                (0,logger/* getLogger */.j)().error(`An extension with the fileName "${fileName}" is already registered`);
                throw new server_.TRPCError({
                    message: `An extension with the fileName "${fileName}" is already registered`,
                    code: "PRECONDITION_FAILED"
                });
            }
            (0,logger/* getLogger */.j)().warn(`An extension with the fileName "${fileName}" is already registered, ignoring...`);
            return true;
        }
        currentExtensions.push(input.json);
        moonraker_extensions_saveExtensions(currentExtensions);
        return true;
    }),
    symlink: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        errorIfExists: external_zod_.z.boolean().optional()
    })).mutation(async ({ input  })=>await symlinkMoonrakerExtensions(input.errorIfExists)),
    unlink: trpc/* publicProcedure.mutation */.$y.mutation(async ()=>{
        const currentExtensions = moonraker_extensions_getExtensions();
        const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
        return await Promise.all(currentExtensions.map(async (ext)=>{
            const res = await unlinkExtension({
                extension: ext,
                gitRepoPath: environment.MOONRAKER_DIR,
                relativePath: "moonraker/components"
            });
            return res;
        }));
    }),
    unregister: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        extensionName: external_zod_.z.string(),
        errorIfNotExists: external_zod_.z.boolean().optional()
    })).mutation(async ({ input  })=>{
        const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
        const currentExtensions = moonraker_extensions_getExtensions();
        const { extensionName  } = input;
        const extensionIndex = currentExtensions.findIndex((ext)=>ext.extensionName === extensionName);
        if (extensionIndex === -1) {
            if (input.errorIfNotExists === true) {
                throw new server_.TRPCError({
                    message: `Extension with the name "${extensionName}" is not registered`,
                    code: "PRECONDITION_FAILED"
                });
            }
            (0,logger/* getLogger */.j)().warn(`Extension with the name "${extensionName}" is not registered, ignoring...`);
            return {
                result: "success",
                message: `Extension with the name "${extensionName}" is not registered`
            };
        }
        const ext = currentExtensions.splice(extensionIndex, 1);
        if (ext.length !== 1) {
            throw new Error("Failed to remove extension");
        }
        const res = await unlinkExtension({
            extension: ext[0],
            gitRepoPath: environment.MOONRAKER_DIR,
            relativePath: "moonraker/components"
        });
        if (res.result === "success") {
            moonraker_extensions_saveExtensions(currentExtensions);
        }
        return res;
    }),
    list: trpc/* publicProcedure.output */.$y.output(moonrakerExtensions).query(async ()=>{
        return moonraker_extensions_getExtensions();
    })
});

// EXTERNAL MODULE: ./server/routers/printer.ts + 18 modules
var printer = __webpack_require__(2281);
// EXTERNAL MODULE: ./server/helpers/cache.ts
var cache = __webpack_require__(9878);
;// CONCATENATED MODULE: ./server/routers/index.ts
// src/server/router/index.ts











const appRouter = (0,trpc/* router */.Nd)({
    version: trpc/* publicProcedure.query */.$y.query(async ()=>{
        return await (0,external_util_.promisify)(external_child_process_.exec)("git describe --tags --always", {
            cwd: process.env.RATOS_CONFIGURATION_PATH
        }).then(({ stdout  })=>stdout.trim());
    }),
    klipperVersion: trpc/* publicProcedure.query */.$y.query(async ()=>{
        return await (0,external_util_.promisify)(external_child_process_.exec)("git describe --tags --always", {
            cwd: process.env.KLIPPER_DIR
        }).then(({ stdout  })=>stdout.trim());
    }),
    osVersion: trpc/* publicProcedure.query */.$y.query(async ()=>{
        if (false) {}
        const releaseFile = (0,external_fs_.statSync)("/etc/ratos-release").isFile() ? "/etc/ratos-release" : "/etc/RatOS-release";
        return await (0,external_util_.promisify)(external_child_process_.exec)(`cat ${releaseFile}`).then(({ stdout  })=>stdout.trim().replace("RatOS ", ""));
    }),
    ipAddress: trpc/* publicProcedure.query */.$y.query(async ()=>{
        const wirelessInterface = await getWirelessInterface();
        const iface = wirelessInterface == null || wirelessInterface.trim() === "" ? "eth0" : wirelessInterface.trim();
        return await (0,external_util_.promisify)(external_child_process_.exec)(`ip address | grep "${iface}"`).then(({ stdout  })=>stdout.match(/inet\s(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/)?.[1]) ?? "Unknown IP";
    }),
    resetCache: trpc/* publicProcedure.mutation */.$y.mutation(async ()=>{
        cache/* ServerCache.flushAll */.o.flushAll();
        return {
            result: "success"
        };
    }),
    kill: trpc/* publicProcedure.query */.$y.query(async ()=>{
        process.exit();
    }),
    reboot: trpc/* publicProcedure.mutation */.$y.mutation(async ()=>{
        setTimeout(()=>{
            (0,external_util_.promisify)(external_child_process_.exec)("reboot");
        }, 500);
        return {
            result: "success"
        };
    }),
    mcu: mcu/* mcuRouter */.px,
    printer: printer/* printerRouter */.Cu,
    wifi: wifiRouter,
    "klippy-extensions": klippyExtensionsRouter,
    "moonraker-extensions": moonrakerExtensionsRouter
});

;// CONCATENATED MODULE: external "@trpc/server/adapters/next"
const next_namespaceObject = require("@trpc/server/adapters/next");
;// CONCATENATED MODULE: ./pages/api/trpc/[trpc].ts



// export API handler
/* harmony default export */ const _trpc_ = (next_namespaceObject.createNextApiHandler({
    router: appRouter,
    createContext: ()=>({
            boards: []
        }),
    onError: (ctx)=>{
        (0,logger/* getLogger */.j)().error(ctx.error);
    }
}));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [736,762], () => (__webpack_exec__(1350)));
module.exports = __webpack_exports__;

})();