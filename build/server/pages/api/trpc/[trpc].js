"use strict";
(() => {
var exports = {};
exports.id = 829;
exports.ids = [829];
exports.modules = {

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

/***/ }),

/***/ 7096:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _trpc_)
});

// EXTERNAL MODULE: ./helpers/logger.ts
var logger = __webpack_require__(6477);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(7147);
// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(3837);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(2081);
// EXTERNAL MODULE: ./helpers/util.ts
var util = __webpack_require__(2633);
;// CONCATENATED MODULE: ./helpers/iw.ts
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

// EXTERNAL MODULE: ./helpers/run-script.ts
var run_script = __webpack_require__(399);
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
;// CONCATENATED MODULE: ./server/routers/klippy-extensions.ts







const klippyExtension = external_zod_.z.object({
    fileName: external_zod_.z.string(),
    path: external_zod_.z.string(),
    extensionName: external_zod_.z.string(),
    errorIfExists: external_zod_.z.boolean().optional()
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
const klippyExtensionsRouter = (0,trpc/* router */.Nd)({
    register: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        json: klippyExtension
    })).mutation(async ({ input  })=>{
        const currentExtensions = getExtensions();
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
        saveExtensions(currentExtensions);
        return true;
    }),
    symlink: trpc/* publicProcedure.mutation */.$y.mutation(async ()=>{
        const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
        const currentExtensions = getExtensions();
        if (currentExtensions.length === 0) {
            return "No extensions registered, nothing to do.";
        }
        let cleanedUpExtensions = [];
        const symlinkResults = currentExtensions.map((ext)=>{
            if ((0,external_fs_.existsSync)(external_path_default().resolve(external_path_default().join(ext.path, ext.fileName)))) {
                cleanedUpExtensions.push(ext);
                if ((0,external_fs_.existsSync)(external_path_default().resolve(external_path_default().join(environment.KLIPPER_DIR, "klippy/extras", ext.fileName)))) {
                    return {
                        result: "success",
                        message: `Symlink for "${ext.fileName}" already exists`
                    };
                }
                try {
                    (0,external_fs_.symlinkSync)(external_path_default().resolve(external_path_default().join(ext.path, ext.fileName)), external_path_default().resolve(external_path_default().join(environment.KLIPPER_DIR, "klippy/extras", ext.fileName)));
                    return {
                        result: "success",
                        message: `Symlink for "${ext.fileName}" created`
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
        });
        if (cleanedUpExtensions.length !== currentExtensions.length) {
            saveExtensions(cleanedUpExtensions);
        }
        const successCount = symlinkResults.filter((r)=>r.result === "success").length;
        let report = `Symlinked ${successCount}/${symlinkResults.length} extension(s): \n`;
        symlinkResults.forEach((r)=>{
            report += `${r.message} \n`;
        });
        return report;
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
    symlink: trpc/* publicProcedure.mutation */.$y.mutation(async ()=>{
        const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
        const currentExtensions = moonraker_extensions_getExtensions();
        if (currentExtensions.length === 0) {
            return "No extensions registered, nothing to do.";
        }
        let cleanedUpExtensions = [];
        const symlinkResults = currentExtensions.map((ext)=>{
            if ((0,external_fs_.existsSync)(external_path_default().resolve(external_path_default().join(ext.path, ext.fileName)))) {
                cleanedUpExtensions.push(ext);
                if ((0,external_fs_.existsSync)(external_path_default().resolve(external_path_default().join(environment.MOONRAKER_DIR, "moonraker/components", ext.fileName)))) {
                    return {
                        result: "success",
                        message: `Symlink for "${ext.fileName}" already exists`
                    };
                }
                try {
                    (0,external_fs_.symlinkSync)(external_path_default().resolve(external_path_default().join(ext.path, ext.fileName)), external_path_default().resolve(external_path_default().join(environment.MOONRAKER_DIR, "moonraker/components", ext.fileName)));
                    return {
                        result: "success",
                        message: `Symlink for "${ext.fileName}" created`
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
        });
        if (cleanedUpExtensions.length !== currentExtensions.length) {
            moonraker_extensions_saveExtensions(cleanedUpExtensions);
        }
        const successCount = symlinkResults.filter((r)=>r.result === "success").length;
        let report = `Symlinked ${successCount}/${symlinkResults.length} extension(s): \n`;
        symlinkResults.forEach((r)=>{
            report += `${r.message} \n`;
        });
        return report;
    }),
    list: trpc/* publicProcedure.output */.$y.output(moonrakerExtensions).query(async ()=>{
        return moonraker_extensions_getExtensions();
    })
});

// EXTERNAL MODULE: ./server/routers/printer.ts + 15 modules
var printer = __webpack_require__(2922);
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
    kill: trpc/* publicProcedure.query */.$y.query(async ()=>{
        process.exit();
    }),
    reboot: trpc/* publicProcedure.mutation */.$y.mutation(async ()=>{
        setTimeout(()=>{
            (0,external_util_.promisify)(external_child_process_.exec)("reboot");
        }, 2000);
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
var __webpack_exports__ = __webpack_require__.X(0, [736,459,922], () => (__webpack_exec__(7096)));
module.exports = __webpack_exports__;

})();