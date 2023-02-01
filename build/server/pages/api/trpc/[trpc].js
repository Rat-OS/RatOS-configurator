"use strict";
(() => {
var exports = {};
exports.id = 829;
exports.ids = [829];
exports.modules = {

/***/ 2756:
/***/ ((module) => {

module.exports = require("@trpc/server");

/***/ }),

/***/ 72:
/***/ ((module) => {

module.exports = require("superjson");

/***/ }),

/***/ 9926:
/***/ ((module) => {

module.exports = import("zod");;

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

/***/ 7310:
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ 3837:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 4687:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rp": () => (/* binding */ scan),
/* harmony export */   "l9": () => (/* binding */ getWirelessInterface)
/* harmony export */ });
/* unused harmony export iw */
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2081);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3837);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);
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
 */
const hasSsid = network => {
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
 */


const hasKeys = network => {
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
 */


const bySignal = (a, b) => {
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
 */


const parseCell = cell => {
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
    parsed.security = 'wpa2';
  } else if (match = cell.match(/WPA:[\s*]+Version: 1/)) {
    parsed.security = 'wpa';
  } else if (match = cell.match(/capability: ESS Privacy/)) {
    parsed.security = 'wep';
  } else if (match = cell.match(/capability: ESS/)) {
    parsed.security = 'open';
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
 */


const parseScan = show_hidden => {
  return function ({
    stdout,
    stderr
  }) {
    if (show_hidden) {
      return stdout.split(/(^|\n)(?=BSS )/).map(parseCell).filter(hasKeys).sort(bySignal);
    } else {
      return stdout.split(/(^|\n)(?=BSS )/).map(parseCell).filter(hasSsid).sort(bySignal);
    }
  };
};

const getWirelessInterface = async () => {
  const wifiInterface = await (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_0__.exec)(`iw dev | awk '$1=="Interface"{print $2}' | head -n1`);
  return wifiInterface.stdout.trim();
};
/**
 * The **iw scan** command is used to scan for wireless networks
 * visible to a wireless interface. For convenience, the networks are
 * sorted by signal strength.
 */

const scan = async (interfaceName, options) => {
  const apForce = options.apForce ? ' ap-force' : '';
  const iwResult = await (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_0__.exec)('sudo iw dev ' + interfaceName + ' scan' + apForce);
  return parseScan(options.showHidden ?? false)(iwResult);
};
/**
 * The **iw** command is used to control nl80211 radios.
 *
 * @static
 * @category iw
 *
 */

const iw = {
  scan: scan
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (iw)));

/***/ }),

/***/ 4127:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "j": () => (/* binding */ getLogger)
});

;// CONCATENATED MODULE: external "pino"
const external_pino_namespaceObject = require("pino");
var external_pino_default = /*#__PURE__*/__webpack_require__.n(external_pino_namespaceObject);
;// CONCATENATED MODULE: external "pino-pretty"
const external_pino_pretty_namespaceObject = require("pino-pretty");
var external_pino_pretty_default = /*#__PURE__*/__webpack_require__.n(external_pino_pretty_namespaceObject);
;// CONCATENATED MODULE: ./helpers/logger.ts


let logger = null;
const getLogger = () => {
  if (logger != null) {
    return logger;
  }

  if (process.env.LOG_FILE == null) {
    throw new Error('No LOG_FILE specified in environment');
  }

  const transportOption =  false ? 0 : {
    target: 'pino/file',
    options: {
      destination: process.env.LOG_FILE,
      append: false
    } // Truncate the log when service is restarted. In case of a crash this might not be great.

  };
  const stream = external_pino_pretty_default()({
    colorize: true
  });
  logger = external_pino_default()(stream);
  return logger;
};

/***/ }),

/***/ 603:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "K": () => (/* binding */ joinInput),
/* harmony export */   "k": () => (/* binding */ hostnameInput)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9926);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zod__WEBPACK_IMPORTED_MODULE_0__]);
zod__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const hostnameInput = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
  hostname: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(2).regex(/^([a-zA-Z0-9]|-)+$/, 'Hostname can only include a-Z, 0-9 and dashes.')
});
const joinInput = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
  ssid: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
  passphrase: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().min(8).max(63),
  country: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional()
});
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3537:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _trpc_server_adapters_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5669);
/* harmony import */ var _helpers_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4127);
/* harmony import */ var _server_router_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6823);
/* harmony import */ var _server_router_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5068);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_server_router_index__WEBPACK_IMPORTED_MODULE_3__]);
_server_router_index__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



 // export type definition of API

// export API handler
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_trpc_server_adapters_next__WEBPACK_IMPORTED_MODULE_0__.createNextApiHandler({
  router: _server_router_index__WEBPACK_IMPORTED_MODULE_3__/* .appRouter */ .q,
  createContext: _server_router_context__WEBPACK_IMPORTED_MODULE_2__/* .createContext */ .k,
  onError: ctx => {
    (0,_helpers_logger__WEBPACK_IMPORTED_MODULE_1__/* .getLogger */ .j)().error(ctx.error);
  }
}));
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5068:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ appRouter)
/* harmony export */ });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6823);
/* harmony import */ var superjson__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72);
/* harmony import */ var superjson__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(superjson__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wifi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4586);
/* harmony import */ var _mcu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8455);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3837);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2081);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _helpers_iw__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4687);
/* harmony import */ var _klippy_extensions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3573);
/* harmony import */ var _moonraker_extensions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4952);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_wifi__WEBPACK_IMPORTED_MODULE_3__, _mcu__WEBPACK_IMPORTED_MODULE_4__, _klippy_extensions__WEBPACK_IMPORTED_MODULE_8__, _moonraker_extensions__WEBPACK_IMPORTED_MODULE_9__]);
([_wifi__WEBPACK_IMPORTED_MODULE_3__, _mcu__WEBPACK_IMPORTED_MODULE_4__, _klippy_extensions__WEBPACK_IMPORTED_MODULE_8__, _moonraker_extensions__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
// src/server/router/index.ts










const appRouter = (0,_context__WEBPACK_IMPORTED_MODULE_0__/* .createRouter */ .p)().transformer((superjson__WEBPACK_IMPORTED_MODULE_1___default())).query('version', {
  resolve: async () => {
    return await (0,util__WEBPACK_IMPORTED_MODULE_5__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_6__.exec)('git describe --tags --always', {
      cwd: process.env.RATOS_CONFIGURATION_PATH
    }).then(({
      stdout
    }) => stdout.trim());
  }
}).query('klipper-version', {
  resolve: async () => {
    return await (0,util__WEBPACK_IMPORTED_MODULE_5__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_6__.exec)('git describe --tags --always', {
      cwd: process.env.KLIPPER_DIR
    }).then(({
      stdout
    }) => stdout.trim());
  }
}).query('os-version', {
  resolve: async () => {
    if (false) {}

    const releaseFile = (0,fs__WEBPACK_IMPORTED_MODULE_2__.statSync)('/etc/ratos-release').isFile() ? '/etc/ratos-release' : '/etc/RatOS-release';
    return await (0,util__WEBPACK_IMPORTED_MODULE_5__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_6__.exec)(`cat ${releaseFile}`).then(({
      stdout
    }) => stdout.trim().replace('RatOS ', ''));
  }
}).query('ip-address', {
  resolve: async () => {
    const wirelessInterface = await (0,_helpers_iw__WEBPACK_IMPORTED_MODULE_7__/* .getWirelessInterface */ .l9)();
    const iface = wirelessInterface == null || wirelessInterface.trim() === '' ? 'eth0' : wirelessInterface.trim();
    return (await (0,util__WEBPACK_IMPORTED_MODULE_5__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_6__.exec)(`ip address | grep "${iface}"`).then(({
      stdout
    }) => stdout.match(/inet\s(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/)?.[1])) ?? 'Unknown IP';
  }
}).query('kill', {
  resolve: async () => {
    process.exit();
  }
}).mutation('reboot', {
  resolve: async () => {
    setTimeout(() => {
      (0,util__WEBPACK_IMPORTED_MODULE_5__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_6__.exec)('reboot');
    }, 2000);
    return {
      result: 'success'
    };
  }
}).merge('mcu.', _mcu__WEBPACK_IMPORTED_MODULE_4__/* .mcuRouter */ .px).merge('wifi.', _wifi__WEBPACK_IMPORTED_MODULE_3__/* .wifiRouter */ .X).merge('klippy-extensions.', _klippy_extensions__WEBPACK_IMPORTED_MODULE_8__/* .klippyExtensionsRouter */ ._).merge('moonraker-extensions.', _moonraker_extensions__WEBPACK_IMPORTED_MODULE_9__/* .moonrakerExtensionsRouter */ .J); // export type definition of API
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3573:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ klippyExtensionsRouter)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9926);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2756);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_trpc_server__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4127);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zod__WEBPACK_IMPORTED_MODULE_0__]);
zod__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const klippyExtension = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
  fileName: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
  path: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
  extensionName: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
const klippyExtensions = zod__WEBPACK_IMPORTED_MODULE_0__.z.array(klippyExtension);

const getExtensions = () => {
  if (process.env.KLIPPY_EXTENSIONS == null) {
    throw new Error('No KLIPPY_EXTENSIONS specified in environment');
  }

  const extensionDir = process.env.KLIPPY_EXTENSIONS.split('/').slice(0, -1).join('/');

  if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(extensionDir)) {
    (0,fs__WEBPACK_IMPORTED_MODULE_2__.mkdirSync)(extensionDir);
  }

  if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(process.env.KLIPPY_EXTENSIONS)) {
    (0,fs__WEBPACK_IMPORTED_MODULE_2__.writeFileSync)(process.env.KLIPPY_EXTENSIONS, '[]');
  }

  const currentExtensions = klippyExtensions.parse(JSON.parse((0,fs__WEBPACK_IMPORTED_MODULE_2__.readFileSync)(process.env.KLIPPY_EXTENSIONS).toString()));
  return currentExtensions;
};

const saveExtensions = extensions => {
  if (process.env.KLIPPY_EXTENSIONS == null) {
    throw new Error('No KLIPPY_EXTENSIONS specified in environment');
  }

  const extensionDir = process.env.KLIPPY_EXTENSIONS.split('/').slice(0, -1).join('/');

  if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(extensionDir)) {
    (0,fs__WEBPACK_IMPORTED_MODULE_2__.mkdirSync)(extensionDir);
  }

  (0,fs__WEBPACK_IMPORTED_MODULE_2__.writeFileSync)(process.env.KLIPPY_EXTENSIONS, JSON.stringify(extensions));
};

const klippyExtensionsRouter = _trpc_server__WEBPACK_IMPORTED_MODULE_1__.router().mutation('register', {
  input: klippyExtension,
  resolve: async ({
    input
  }) => {
    const currentExtensions = getExtensions();
    const extensionPath = path__WEBPACK_IMPORTED_MODULE_4___default().join(input.path, input.fileName);

    if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(extensionPath)) {
      (0,_helpers_logger__WEBPACK_IMPORTED_MODULE_3__/* .getLogger */ .j)().error(`File "${extensionPath}" does not exist`);
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        message: `File "${extensionPath}" does not exist`,
        code: 'PRECONDITION_FAILED'
      });
    }

    if (currentExtensions.find(ext => ext.fileName === input.fileName)) {
      (0,_helpers_logger__WEBPACK_IMPORTED_MODULE_3__/* .getLogger */ .j)().error(`An extension with the fileName "${input.fileName}" is already registered`);
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        message: `An extension with the fileName "${input.fileName}" is already registered`,
        code: 'PRECONDITION_FAILED'
      });
    }

    currentExtensions.push(input);
    saveExtensions(currentExtensions);
    return true;
  }
}).mutation('symlink', {
  resolve: async () => {
    const currentExtensions = getExtensions();

    if (currentExtensions.length === 0) {
      return 'No extensions registered, nothing to do.';
    }

    let cleanedUpExtensions = [];
    const symlinkResults = currentExtensions.map(ext => {
      if ((0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(path__WEBPACK_IMPORTED_MODULE_4___default().resolve(path__WEBPACK_IMPORTED_MODULE_4___default().join(ext.path, ext.fileName)))) {
        cleanedUpExtensions.push(ext);

        if ((0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(path__WEBPACK_IMPORTED_MODULE_4___default().resolve(path__WEBPACK_IMPORTED_MODULE_4___default().join(process.env.KLIPPER_DIR ?? '/home/pi/klipper', 'klippy/extras', ext.fileName)))) {
          return {
            result: 'success',
            message: `Symlink for "${ext.fileName}" already exists`
          };
        }

        try {
          (0,fs__WEBPACK_IMPORTED_MODULE_2__.symlinkSync)(path__WEBPACK_IMPORTED_MODULE_4___default().resolve(path__WEBPACK_IMPORTED_MODULE_4___default().join(ext.path, ext.fileName)), path__WEBPACK_IMPORTED_MODULE_4___default().resolve(path__WEBPACK_IMPORTED_MODULE_4___default().join(process.env.KLIPPER_DIR ?? '/home/pi/klipper', 'klippy/extras', ext.fileName)));
          return {
            result: 'success',
            message: `Symlink for "${ext.fileName}" created`
          };
        } catch (e) {
          return {
            result: 'error',
            message: `Failed to create symlink for "${ext.fileName}"`
          };
        }
      } else {
        return {
          result: 'error',
          message: `Extension file "${ext.fileName}" does not exist in ${ext.path} and has been removed from the list of registered extensions`
        };
      }
    });

    if (cleanedUpExtensions.length !== currentExtensions.length) {
      saveExtensions(cleanedUpExtensions);
    }

    const successCount = symlinkResults.filter(r => r.result === 'success').length;
    let report = `Symlinked ${successCount}/${symlinkResults.length} extension(s): \n`;
    symlinkResults.forEach(r => {
      report += `${r.message} \n`;
    });
    return report;
  }
}).query('list', {
  output: klippyExtensions,
  resolve: async () => {
    return getExtensions();
  }
});
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4952:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "J": () => (/* binding */ moonrakerExtensionsRouter)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9926);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2756);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_trpc_server__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4127);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zod__WEBPACK_IMPORTED_MODULE_0__]);
zod__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const moonrakerExtension = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
  fileName: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
  path: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
  extensionName: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
const moonrakerExtensions = zod__WEBPACK_IMPORTED_MODULE_0__.z.array(moonrakerExtension);

const getExtensions = () => {
  if (process.env.MOONRAKER_EXTENSIONS == null) {
    throw new Error('No MOONRAKER_EXTENSIONS specified in environment');
  }

  const extensionDir = process.env.MOONRAKER_EXTENSIONS.split('/').slice(0, -1).join('/');

  if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(extensionDir)) {
    (0,fs__WEBPACK_IMPORTED_MODULE_2__.mkdirSync)(extensionDir);
  }

  if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(process.env.MOONRAKER_EXTENSIONS)) {
    (0,fs__WEBPACK_IMPORTED_MODULE_2__.writeFileSync)(process.env.MOONRAKER_EXTENSIONS, '[]');
  }

  const currentExtensions = moonrakerExtensions.parse(JSON.parse((0,fs__WEBPACK_IMPORTED_MODULE_2__.readFileSync)(process.env.MOONRAKER_EXTENSIONS).toString()));
  return currentExtensions;
};

const saveExtensions = extensions => {
  if (process.env.MOONRAKER_EXTENSIONS == null) {
    throw new Error('No MOONRAKER_EXTENSIONS specified in environment');
  }

  const extensionDir = process.env.MOONRAKER_EXTENSIONS.split('/').slice(0, -1).join('/');

  if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(extensionDir)) {
    (0,fs__WEBPACK_IMPORTED_MODULE_2__.mkdirSync)(extensionDir);
  }

  (0,fs__WEBPACK_IMPORTED_MODULE_2__.writeFileSync)(process.env.MOONRAKER_EXTENSIONS, JSON.stringify(extensions));
};

const moonrakerExtensionsRouter = _trpc_server__WEBPACK_IMPORTED_MODULE_1__.router().mutation('register', {
  input: moonrakerExtension,
  resolve: async ({
    input
  }) => {
    const currentExtensions = getExtensions();
    const extensionPath = path__WEBPACK_IMPORTED_MODULE_4___default().join(input.path, input.fileName);

    if (!(0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(extensionPath)) {
      (0,_helpers_logger__WEBPACK_IMPORTED_MODULE_3__/* .getLogger */ .j)().error(`File "${extensionPath}" does not exist`);
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        message: `File "${extensionPath}" does not exist`,
        code: 'PRECONDITION_FAILED'
      });
    }

    if (currentExtensions.find(ext => ext.fileName === input.fileName)) {
      (0,_helpers_logger__WEBPACK_IMPORTED_MODULE_3__/* .getLogger */ .j)().error(`An extension with the fileName "${input.fileName}" is already registered`);
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        message: `An extension with the fileName "${input.fileName}" is already registered`,
        code: 'PRECONDITION_FAILED'
      });
    }

    currentExtensions.push(input);
    saveExtensions(currentExtensions);
    return true;
  }
}).mutation('symlink', {
  resolve: async () => {
    const currentExtensions = getExtensions();

    if (currentExtensions.length === 0) {
      return 'No extensions registered, nothing to do.';
    }

    let cleanedUpExtensions = [];
    const symlinkResults = currentExtensions.map(ext => {
      if ((0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(path__WEBPACK_IMPORTED_MODULE_4___default().resolve(path__WEBPACK_IMPORTED_MODULE_4___default().join(ext.path, ext.fileName)))) {
        cleanedUpExtensions.push(ext);

        if ((0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(path__WEBPACK_IMPORTED_MODULE_4___default().resolve(path__WEBPACK_IMPORTED_MODULE_4___default().join(process.env.MOONRAKER_DIR ?? '/home/pi/moonraker', 'moonraker/components', ext.fileName)))) {
          return {
            result: 'success',
            message: `Symlink for "${ext.fileName}" already exists`
          };
        }

        try {
          (0,fs__WEBPACK_IMPORTED_MODULE_2__.symlinkSync)(path__WEBPACK_IMPORTED_MODULE_4___default().resolve(path__WEBPACK_IMPORTED_MODULE_4___default().join(ext.path, ext.fileName)), path__WEBPACK_IMPORTED_MODULE_4___default().resolve(path__WEBPACK_IMPORTED_MODULE_4___default().join(process.env.MOONRAKER_DIR ?? '/home/pi/moonraker', 'moonraker/components', ext.fileName)));
          return {
            result: 'success',
            message: `Symlink for "${ext.fileName}" created`
          };
        } catch (e) {
          return {
            result: 'error',
            message: `Failed to create symlink for "${ext.fileName}"`
          };
        }
      } else {
        return {
          result: 'error',
          message: `Extension file "${ext.fileName}" does not exist in ${ext.path} and has been removed from the list of registered extensions`
        };
      }
    });

    if (cleanedUpExtensions.length !== currentExtensions.length) {
      saveExtensions(cleanedUpExtensions);
    }

    const successCount = symlinkResults.filter(r => r.result === 'success').length;
    let report = `Symlinked ${successCount}/${symlinkResults.length} extension(s): \n`;
    symlinkResults.forEach(r => {
      report += `${r.message} \n`;
    });
    return report;
  }
}).query('list', {
  output: moonrakerExtensions,
  resolve: async () => {
    return getExtensions();
  }
});
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4586:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "X": () => (/* binding */ wifiRouter)
/* harmony export */ });
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2756);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_trpc_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3837);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2081);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6454);
/* harmony import */ var _helpers_iw__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4687);
/* harmony import */ var _helpers_validators_wifi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(603);
/* harmony import */ var _helpers_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4127);
/* harmony import */ var _helpers_run_script__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6030);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_helpers_validators_wifi__WEBPACK_IMPORTED_MODULE_5__]);
_helpers_validators_wifi__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];










const sanitizeForBash = str => {
  return str.replace(/(["'$`\\])/g, '\\$1');
};

const wifiRouter = _trpc_server__WEBPACK_IMPORTED_MODULE_0__.router().mutation('hostname', {
  input: _helpers_validators_wifi__WEBPACK_IMPORTED_MODULE_5__/* .hostnameInput */ .k,
  resolve: async ({
    input
  }) => {
    const scriptRoot = (0,_helpers_util__WEBPACK_IMPORTED_MODULE_8__/* .getScriptRoot */ .x)();

    try {
      const result = await (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_2__.exec)(`sudo ${path__WEBPACK_IMPORTED_MODULE_3___default().join(scriptRoot, 'change-hostname.sh')} ${input.hostname}`);
    } catch (e) {
      if (e instanceof Error) {
        (0,_helpers_logger__WEBPACK_IMPORTED_MODULE_6__/* .getLogger */ .j)().error(e.message);
      }

      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_0__.TRPCError({
        message: 'An error occured while attempting to change the hostname',
        code: 'INTERNAL_SERVER_ERROR',
        cause: e
      });
    }

    return {
      result: 'success'
    };
  }
}).mutation('join', {
  input: _helpers_validators_wifi__WEBPACK_IMPORTED_MODULE_5__/* .joinInput */ .K,
  resolve: async ({
    input
  }) => {
    try {
      await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_7__/* .runSudoScript */ .$)('add-wifi-network.sh', `"${sanitizeForBash(input.ssid)}"`, `"${sanitizeForBash(input.passphrase)}"`, `"${sanitizeForBash(input.country ?? 'GB')}"`);
    } catch (e) {
      if (e instanceof Error) {
        (0,_helpers_logger__WEBPACK_IMPORTED_MODULE_6__/* .getLogger */ .j)().error(e.message);
      }

      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_0__.TRPCError({
        message: 'Invalid wifi credentials',
        code: 'PRECONDITION_FAILED',
        cause: e
      });
    }

    return {
      result: 'success'
    };
  }
}).query('scan', {
  resolve: async () => {
    const wirelessInterface = await (0,_helpers_iw__WEBPACK_IMPORTED_MODULE_4__/* .getWirelessInterface */ .l9)();

    if (wirelessInterface == null || wirelessInterface.trim() === '') {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_0__.TRPCError({
        message: "No wifi interface available on device, if you're connected via ethernet you can skip this step.",
        code: 'INTERNAL_SERVER_ERROR'
      });
    }

    try {
      // if (process.env.NODE_ENV === 'development') {
      // 	return [];
      // }
      return await (0,_helpers_iw__WEBPACK_IMPORTED_MODULE_4__/* .scan */ .Rp)(wirelessInterface, {
        apForce: true
      });
    } catch (e) {
      if (e instanceof Error) {
        (0,_helpers_logger__WEBPACK_IMPORTED_MODULE_6__/* .getLogger */ .j)().error(e.message);
      }

      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_0__.TRPCError({
        message: 'Failed to scan wifi networks',
        code: 'INTERNAL_SERVER_ERROR',
        cause: e
      });
    }
  }
});
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [669,455], () => (__webpack_exec__(3537)));
module.exports = __webpack_exports__;

})();