"use strict";
exports.id = 89;
exports.ids = [89];
exports.modules = {

/***/ 3552:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ runSudoScript)
/* harmony export */ });
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2081);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3837);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9737);




const runSudoScript = async (script, ...args) => {
  const scriptRoot = (0,_util__WEBPACK_IMPORTED_MODULE_3__/* .getScriptRoot */ .x)();
  return await (0,util__WEBPACK_IMPORTED_MODULE_2__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_0__.exec)(`sudo ${path__WEBPACK_IMPORTED_MODULE_1___default().join(scriptRoot, script)} ${args.join(' ')}`, {
    env: process.env
  });
};

/***/ }),

/***/ 9737:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ getScriptRoot)
/* harmony export */ });
const getScriptRoot = () => {
  // This is ... not great.. come up with something better
  return process.env.RATOS_SCRIPT_DIR ?? __dirname.split('configurator/')[0] + 'configurator/scripts/';
};

/***/ }),

/***/ 296:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "k": () => (/* binding */ createContext),
/* harmony export */   "p": () => (/* binding */ createRouter)
/* harmony export */ });
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2756);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_trpc_server__WEBPACK_IMPORTED_MODULE_0__);
// src/server/router/context.ts

const createContext = opts => {
  const req = opts === null || opts === void 0 ? void 0 : opts.req;
  const res = opts === null || opts === void 0 ? void 0 : opts.res;
  const boards = null;
  const board = null;
  return {
    req,
    res,
    boards,
    board
  };
};
const createRouter = () => _trpc_server__WEBPACK_IMPORTED_MODULE_0__.router();

/***/ }),

/***/ 5089:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DC": () => (/* binding */ getBoards),
/* harmony export */   "px": () => (/* binding */ mcuRouter)
/* harmony export */ });
/* unused harmony exports Board, AutoFlashableBoard, getBoardsWithoutHost */
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9926);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2756);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_trpc_server__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2081);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3837);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(296);
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9737);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _helpers_run_script__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3552);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([zod__WEBPACK_IMPORTED_MODULE_0__]);
zod__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












const Board = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
  serialPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
  isToolboard: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
  isHost: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
  name: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
  manufacturer: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
  firmwareBinaryName: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
  compileScript: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
  flashScript: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
  flashInstructions: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
  disableAutoFlash: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
  documentationLink: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
  dfu: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    dfuBootImage: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    flashDevice: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    instructions: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(zod__WEBPACK_IMPORTED_MODULE_0__.z.string()),
    reminder: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional()
  }).optional(),
  path: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
const AutoFlashableBoard = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
  serialPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
  isToolboard: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
  compileScript: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
  flashScript: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
  path: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
const inputSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
  boardPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
const getBoards = async () => {
  const defs = await (0,util__WEBPACK_IMPORTED_MODULE_4__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_3__.exec)(`ls ${process.env.RATOS_CONFIGURATION_PATH}/boards/*/board-definition.json`);
  return zod__WEBPACK_IMPORTED_MODULE_0__.z.array(Board).parse(defs.stdout.split('\n').map(f => f.trim() === '' ? null : _objectSpread(_objectSpread({}, JSON.parse((0,fs__WEBPACK_IMPORTED_MODULE_2__.readFileSync)(f).toString())), {}, {
    path: f.replace('board-definition.json', '')
  })).filter(f => f != null));
};
const getBoardsWithoutHost = boards => {
  return boards.filter(b => !b.isHost);
};
const mcuRouter = (0,_context__WEBPACK_IMPORTED_MODULE_5__/* .createRouter */ .p)().middleware(async ({
  ctx,
  next,
  meta,
  rawInput
}) => {
  let boards = null;

  try {
    boards = await getBoards();

    if ((meta === null || meta === void 0 ? void 0 : meta.includeHost) !== true) {
      boards = getBoardsWithoutHost(boards);
    }
  } catch (e) {
    throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: `Invalid board definition(s) in ${process.env.RATOS_CONFIGURATION_PATH}/boards.`,
      cause: e
    });
  }

  let board = null;
  const boardPath = inputSchema.safeParse(rawInput);

  if (meta !== null && meta !== void 0 && meta.boardRequired && !boardPath.success) {
    throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
      code: 'PRECONDITION_FAILED',
      message: `boardPath parameter missing.`
    });
  }

  if (boardPath.success) {
    board = boards.find(b => b.path === boardPath.data.boardPath);

    if (board == null) {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `No supported board exists for the path ${boardPath.data.boardPath}`
      });
    }
  }

  return next({
    ctx: _objectSpread(_objectSpread({}, ctx), {}, {
      boards: boards,
      board: board
    })
  });
}).query('boards', {
  output: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(Board),
  resolve: ({
    ctx
  }) => {
    return ctx.boards;
  }
}).query('detect', {
  meta: {
    boardRequired: true
  },
  input: inputSchema,
  resolve: ({
    ctx,
    input
  }) => {
    if (ctx.board == null) {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `No supported board exists for the path ${input.boardPath}`
      });
    }

    if ((0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(ctx.board.serialPath)) {
      return true;
    }

    return false;
  }
}).query('board-version', {
  meta: {
    boardRequired: true
  },
  input: inputSchema,
  resolve: async ({
    ctx,
    input
  }) => {
    var _version$stdout$match;

    if (ctx.board == null) {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `No supported board exists for the path ${input.boardPath}`
      });
    }

    if (process.env.KLIPPER_ENV == null || process.env.KLIPPER_ENV.trim() === '') {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `Environment variable KLIPPER_ENV is missing`
      });
    }

    if (process.env.KLIPPER_DIR == null || process.env.KLIPPER_DIR.trim() === '') {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `Environment variable KLIPPER_DIR is missing`
      });
    }

    const scriptRoot = (0,_helpers_util__WEBPACK_IMPORTED_MODULE_8__/* .getScriptRoot */ .x)();
    const version = await (0,util__WEBPACK_IMPORTED_MODULE_4__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_3__.exec)(`${path__WEBPACK_IMPORTED_MODULE_6___default().join(process.env.KLIPPER_ENV, 'bin', 'python')} ${path__WEBPACK_IMPORTED_MODULE_6___default().join(scriptRoot, 'check-version.py')} ${ctx.board.serialPath}}`, {
      env: {
        KLIPPER_DIR: process.env.KLIPPER_DIR,
        NODE_ENV: "production"
      }
    });
    const versionRegEx = /^Version:\s(v\d+\.\d+\.\d+-\d+-\w{9})$/;
    return (_version$stdout$match = version.stdout.match(versionRegEx)) === null || _version$stdout$match === void 0 ? void 0 : _version$stdout$match[0];
  }
}).mutation('compile', {
  meta: {
    boardRequired: true
  },
  input: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    boardPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
  }),
  resolve: async ({
    ctx,
    input
  }) => {
    if (ctx.board == null) {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `No supported board exists for the path ${input.boardPath}`
      });
    }

    let compileResult = null;
    const firmwareBinary = path__WEBPACK_IMPORTED_MODULE_6___default().resolve('/home/pi/klipper_config/firmware_binaries', ctx.board.firmwareBinaryName);

    try {
      if (fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(firmwareBinary)) {
        fs__WEBPACK_IMPORTED_MODULE_2___default().rmSync(firmwareBinary);
      }

      const compileScript = path__WEBPACK_IMPORTED_MODULE_6___default().join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''), ctx.board.compileScript);
      compileResult = await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_7__/* .runSudoScript */ .$)('board-script.sh', compileScript);
    } catch (e) {
      const message = e instanceof Error ? e.message : e;
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Could not compile firmware for ${ctx.board.name}: ${message}'}`,
        cause: e
      });
    }

    if (!fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(firmwareBinary)) {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Could not compile firmware for ${ctx.board.name}: ${compileResult.stdout}`
      });
    }

    return 'success';
  }
}).mutation('flash-all-connected', {
  meta: {
    boardRequired: false,
    includeHost: true
  },
  resolve: async ({
    ctx
  }) => {
    const connectedBoards = ctx.boards.filter(b => (0,fs__WEBPACK_IMPORTED_MODULE_2__.existsSync)(b.serialPath) && b.flashScript && b.compileScript && b.disableAutoFlash !== true);
    const flashResults = [];

    for (const b of connectedBoards) {
      try {
        const current = AutoFlashableBoard.parse(b);
        await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_7__/* .runSudoScript */ .$)('board-script.sh', path__WEBPACK_IMPORTED_MODULE_6___default().join(current.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''), current.compileScript));
        await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_7__/* .runSudoScript */ .$)('board-script.sh', path__WEBPACK_IMPORTED_MODULE_6___default().join(current.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''), current.flashScript));
        flashResults.push({
          board: b,
          result: 'success'
        });
      } catch (e) {
        const message = e instanceof Error ? e.message : e;
        flashResults.push({
          board: b,
          result: 'error',
          message: typeof message === 'string' ? message : undefined
        });
      }
    }

    const successCount = flashResults.filter(r => r.result === 'success').length;
    let report = `${successCount}/${connectedBoards.length} connected board(s) flashed successfully.\n`;
    flashResults.map(r => {
      if (r.result === 'error') {
        report += `${r.board.manufacturer} ${r.board.name} failed to flash: ${r.message}\n`;
      } else {
        report += `${r.board.manufacturer} ${r.board.name} was successfully flashed.\n`;
      }
    });
    return report;
  }
}).mutation('flash-via-path', {
  meta: {
    boardRequired: true
  },
  input: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    boardPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
  }),
  resolve: async ({
    ctx,
    input
  }) => {
    if (ctx.board == null) {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `No supported board exists for the path ${input.boardPath}`
      });
    }

    if (ctx.board.flashScript == null) {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'PRECONDITION_FAILED',
        message: `${ctx.board.name} does not support automatic flashing via serial path.`
      });
    }

    let compileResult = null;
    const firmwareBinary = path__WEBPACK_IMPORTED_MODULE_6___default().resolve('/home/pi/klipper_config/firmware_binaries', ctx.board.firmwareBinaryName);

    try {
      if (fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(firmwareBinary)) {
        fs__WEBPACK_IMPORTED_MODULE_2___default().rmSync(firmwareBinary);
      }

      const compileScript = path__WEBPACK_IMPORTED_MODULE_6___default().join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''), ctx.board.compileScript);
      compileResult = await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_7__/* .runSudoScript */ .$)('board-script.sh', compileScript);
    } catch (e) {
      var _compileResult;

      const message = e instanceof Error ? e.message : e;
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Could not compile firmware for ${ctx.board.name}: ${((_compileResult = compileResult) === null || _compileResult === void 0 ? void 0 : _compileResult.stdout) ?? message}'}`,
        cause: e
      });
    }

    if (!fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(firmwareBinary)) {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Could not compile firmware for ${ctx.board.name}: ${compileResult.stdout}`
      });
    }

    let flashResult = null;

    try {
      const flashScript = path__WEBPACK_IMPORTED_MODULE_6___default().join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''), ctx.board.flashScript);
      flashResult = await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_7__/* .runSudoScript */ .$)('board-script.sh', flashScript);
    } catch (e) {
      var _flashResult;

      const message = e instanceof Error ? e.message : e;
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Could not flash firmware to ${ctx.board.name}: ${((_flashResult = flashResult) === null || _flashResult === void 0 ? void 0 : _flashResult.stdout) ?? message}'}`,
        cause: e
      });
    }

    if (!fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(ctx.board.serialPath)) {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Could not flash firmware to ${ctx.board.name}: ${flashResult.stdout}`
      });
    }

    return 'success';
  }
}).query('dfu-detect', {
  meta: {
    boardRequired: true
  },
  input: inputSchema,
  resolve: async ({
    ctx,
    input
  }) => {
    const dfuDeviceCount = parseInt((await (0,util__WEBPACK_IMPORTED_MODULE_4__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_3__.exec)('lsusb | grep "0483:df11" | wc -l')).stdout, 10);

    if (dfuDeviceCount === 1) {
      return true;
    }

    if (dfuDeviceCount > 1) {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Multiple DFU devices detected, please disconnect the other devices.'
      });
    }

    return false;
  }
}).mutation('dfu-flash', {
  meta: {
    boardRequired: true
  },
  input: inputSchema,
  resolve: async ({
    ctx,
    input
  }) => {
    if (ctx.board == null) return; // middleware takes care of the error message.

    if (ctx.board.dfu == null) {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'PRECONDITION_FAILED',
        message: 'Board does not support DFU.'
      });
    }

    let compileResult = null;
    const firmwareBinary = path__WEBPACK_IMPORTED_MODULE_6___default().resolve('/home/pi/klipper_config/firmware_binaries', ctx.board.firmwareBinaryName);

    try {
      if (fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(firmwareBinary)) {
        fs__WEBPACK_IMPORTED_MODULE_2___default().rmSync(firmwareBinary);
      }

      const compileScript = path__WEBPACK_IMPORTED_MODULE_6___default().join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ''), ctx.board.compileScript);
      compileResult = await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_7__/* .runSudoScript */ .$)('board-script.sh', compileScript);
    } catch (e) {
      const message = e instanceof Error ? e.message : e;
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Could not compile firmware for ${ctx.board.name}: ${message}`,
        cause: e
      });
    }

    if (!fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(firmwareBinary)) {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: `Could not compile firmware for ${ctx.board.name}: ${compileResult.stdout} ${compileResult.stderr}`
      });
    }

    try {
      const flashResult = await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_7__/* .runSudoScript */ .$)('dfu-flash.sh', ctx.board.serialPath);
      return flashResult.stdout;
    } catch (e) {
      throw new _trpc_server__WEBPACK_IMPORTED_MODULE_1__.TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to flash device.',
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