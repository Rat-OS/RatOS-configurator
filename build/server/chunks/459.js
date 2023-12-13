"use strict";
exports.id = 459;
exports.ids = [459];
exports.modules = {

/***/ 399:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ runSudoScript)
/* harmony export */ });
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2081);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2633);



const runSudoScript = (script, ...args)=>{
    const scriptRoot = (0,_util__WEBPACK_IMPORTED_MODULE_2__/* .getScriptRoot */ .x)();
    return new Promise((resolve, reject)=>{
        try {
            const child = (0,child_process__WEBPACK_IMPORTED_MODULE_0__.spawn)("sudo", [
                path__WEBPACK_IMPORTED_MODULE_1___default().join(scriptRoot, script),
                ...args
            ]);
            let stdout = "";
            let stderr = "";
            child.stdout.on("data", (data)=>{
                stdout += data;
            });
            child.stderr.on("data", (data)=>{
                stderr += data;
            });
            child.on("error", (err)=>{
                reject(err);
            });
            child.on("exit", (code)=>{
                if (code === 0) {
                    resolve({
                        stdout,
                        stderr
                    });
                } else {
                    reject("An error occured while attempting to run script: \n" + stdout + "\n" + stderr);
                }
            });
            child.on("close", (code)=>{
                if (code === 0) {
                    resolve({
                        stderr,
                        stdout
                    });
                } else {
                    reject(stderr);
                }
            });
        } catch (e) {
            if (e instanceof Error) {
                return reject(e.message);
            }
            reject("An error occured while attempting to run script");
        }
    });
};


/***/ }),

/***/ 2633:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ getScriptRoot)
/* harmony export */ });
const getScriptRoot = ()=>{
    // This is ... not great.. come up with something better
    return process.env.RATOS_SCRIPT_DIR ?? __dirname.split("configurator/")[0] + "configurator/scripts/";
};


/***/ }),

/***/ 3459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DC": () => (/* binding */ getBoards),
/* harmony export */   "px": () => (/* binding */ mcuRouter)
/* harmony export */ });
/* unused harmony exports getBoardsWithoutHost, getToolboards, getBoardsWithDriverCount */
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2081);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3837);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2756);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_trpc_server__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2633);
/* harmony import */ var _helpers_run_script__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(399);
/* harmony import */ var _zods_boards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1346);
/* harmony import */ var _trpc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8199);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var glob__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4230);
/* harmony import */ var glob__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(glob__WEBPACK_IMPORTED_MODULE_9__);











const inputSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    boardPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
const getBoards = async ()=>{
    const defs = await (0,util__WEBPACK_IMPORTED_MODULE_3__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_2__.exec)(`ls ${process.env.RATOS_CONFIGURATION_PATH}/boards/*/board-definition.json`);
    return zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_zods_boards__WEBPACK_IMPORTED_MODULE_6__/* .BoardWithDetectionStatus */ .Ai).parse(defs.stdout.split("\n").map((f)=>f.trim() === "" ? null : {
            ...JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(f).toString()),
            path: f.replace("board-definition.json", "")
        }).filter((b)=>b != null).map((b)=>{
        b.detected = b != null && "serialPath" in b && b.serialPath != null ? fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(b.serialPath) : false;
        return b;
    }));
};
const getBoardsWithoutHost = (boards)=>{
    return boards.filter((b)=>!b.isHost);
};
const getToolboards = (boards)=>{
    return boards.filter((b)=>b.isToolboard);
};
const getBoardsWithDriverCount = (boards, driverCount)=>{
    return boards.filter((b)=>b.driverCount >= driverCount || b.extruderlessConfig != null && b.driverCount >= driverCount - 1);
};
const mcuMiddleware = (0,_trpc__WEBPACK_IMPORTED_MODULE_7__/* .middleware */ .qR)(async ({ ctx , next , meta , rawInput  })=>{
    let boards = null;
    const parsedInput = inputSchema.safeParse(rawInput);
    try {
        boards = await getBoards();
        if (meta?.includeHost !== true) {
            boards = getBoardsWithoutHost(boards);
        }
    } catch (e) {
        throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Invalid board definition(s) in ${process.env.RATOS_CONFIGURATION_PATH}/boards.`,
            cause: e
        });
    }
    let board = null;
    if (meta?.boardRequired && !parsedInput.success) {
        throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
            code: "PRECONDITION_FAILED",
            message: `boardPath parameter missing.`
        });
    }
    if (parsedInput.success) {
        board = boards.find((b)=>b.path === parsedInput.data.boardPath);
        if (board == null) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `No supported board exists for the path ${parsedInput.data.boardPath}`
            });
        }
    }
    return next({
        ctx: {
            ...ctx,
            boards: boards,
            board: board
        }
    });
});
const mcuProcedure = _trpc__WEBPACK_IMPORTED_MODULE_7__/* .publicProcedure.use */ .$y.use(mcuMiddleware);
const mcuRouter = (0,_trpc__WEBPACK_IMPORTED_MODULE_7__/* .router */ .Nd)({
    boards: mcuProcedure.input(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        boardFilters: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
            toolboard: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
            driverCountRequired: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().optional()
        }).optional()
    })).output(zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_zods_boards__WEBPACK_IMPORTED_MODULE_6__/* .BoardWithDetectionStatus */ .Ai)).query(({ ctx , input  })=>{
        let boards = ctx.boards;
        if (input.boardFilters?.toolboard === true) {
            boards = getToolboards(boards);
        }
        if (input.boardFilters?.driverCountRequired != null) {
            boards = getBoardsWithDriverCount(boards, input.boardFilters.driverCountRequired);
        }
        return boards;
    }),
    detect: mcuProcedure.input(inputSchema).meta({
        boardRequired: true
    }).query(({ ctx , input  })=>{
        if (ctx.board == null) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `No supported board exists for the path ${input.boardPath}`
            });
        }
        if (fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(ctx.board.serialPath)) {
            return true;
        }
        return false;
    }),
    unidentifiedDevices: mcuProcedure.query(async ({ ctx  })=>{
        const detected = ctx.boards.filter((b)=>b.detected).map((b)=>fs__WEBPACK_IMPORTED_MODULE_1___default().realpathSync(b.serialPath));
        return (await (0,glob__WEBPACK_IMPORTED_MODULE_9__.glob)("/dev/serial/by-id/usb-Klipper*")).filter((d)=>!detected.includes(fs__WEBPACK_IMPORTED_MODULE_1___default().realpathSync(d)));
    }),
    boardVersion: mcuProcedure.input(inputSchema).meta({
        boardRequired: true
    }).query(async ({ ctx , input  })=>{
        if (ctx.board == null) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `No supported board exists for the path ${input.boardPath}`
            });
        }
        if (process.env.KLIPPER_ENV == null || process.env.KLIPPER_ENV.trim() === "") {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `Environment variable KLIPPER_ENV is missing`
            });
        }
        if (process.env.KLIPPER_DIR == null || process.env.KLIPPER_DIR.trim() === "") {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `Environment variable KLIPPER_DIR is missing`
            });
        }
        const scriptRoot = (0,_helpers_util__WEBPACK_IMPORTED_MODULE_10__/* .getScriptRoot */ .x)();
        // stop klipper
        let version = {
            stdout: ""
        };
        let error = null;
        try {
            await fetch("http://127.0.0.1:7125/machine/services/stop?service=klipper", {
                method: "POST"
            });
            version = await (0,util__WEBPACK_IMPORTED_MODULE_3__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_2__.exec)(`${path__WEBPACK_IMPORTED_MODULE_8___default().join(process.env.KLIPPER_ENV, "bin", "python")} ${path__WEBPACK_IMPORTED_MODULE_8___default().join(scriptRoot, "check-version.py")} ${ctx.board.serialPath}`, {
                env: {
                    KLIPPER_DIR: process.env.KLIPPER_DIR,
                    NODE_ENV: "production"
                }
            });
        } catch (e) {
            error = e;
        } finally{
            await fetch("http://127.0.0.1:7125/machine/services/start?service=klipper", {
                method: "POST"
            });
        }
        if (error) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                cause: error
            });
        }
        const versionRegEx = /Version:\s(v\d+\.\d+\.\d+-\d+-\w{9})/;
        return version.stdout.match(versionRegEx)?.[1];
    }),
    compile: mcuProcedure.input(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        boardPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
    })).meta({
        boardRequired: true
    }).mutation(async ({ ctx , input  })=>{
        if (ctx.board == null) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `No supported board exists for the path ${input.boardPath}`
            });
        }
        let compileResult = null;
        const firmwareBinary = path__WEBPACK_IMPORTED_MODULE_8___default().resolve("/home/pi/printer_data/config/firmware_binaries", ctx.board.firmwareBinaryName);
        try {
            if (fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(firmwareBinary)) {
                fs__WEBPACK_IMPORTED_MODULE_1___default().rmSync(firmwareBinary);
            }
            const compileScript = path__WEBPACK_IMPORTED_MODULE_8___default().join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), ctx.board.compileScript);
            compileResult = await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("board-script.sh", compileScript);
        } catch (e) {
            const message = e instanceof Error ? e.message : e;
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not compile firmware for ${ctx.board.name}: ${message}'}`,
                cause: e
            });
        }
        if (!fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(firmwareBinary)) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not compile firmware for ${ctx.board.name}: ${compileResult.stdout}`
            });
        }
        return "success";
    }),
    flashAllConnected: mcuProcedure.meta({
        boardRequired: false,
        includeHost: true
    }).mutation(async ({ ctx  })=>{
        const connectedBoards = ctx.boards.filter((b)=>fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(b.serialPath) && b.flashScript && b.compileScript && b.disableAutoFlash !== true);
        const flashResults = [];
        for (const b of connectedBoards){
            try {
                const current = _zods_boards__WEBPACK_IMPORTED_MODULE_6__/* .AutoFlashableBoard.parse */ .AN.parse(b);
                await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("board-script.sh", path__WEBPACK_IMPORTED_MODULE_8___default().join(current.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), current.compileScript));
                await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("board-script.sh", path__WEBPACK_IMPORTED_MODULE_8___default().join(current.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), current.flashScript));
                flashResults.push({
                    board: b,
                    result: "success"
                });
            } catch (e) {
                const message = e instanceof Error ? e.message : e;
                flashResults.push({
                    board: b,
                    result: "error",
                    message: typeof message === "string" ? message : undefined
                });
            }
        }
        const successCount = flashResults.filter((r)=>r.result === "success").length;
        let report = `${successCount}/${connectedBoards.length} connected board(s) flashed successfully.\n`;
        flashResults.map((r)=>{
            if (r.result === "error") {
                report += `${r.board.manufacturer} ${r.board.name} failed to flash: ${r.message}\n`;
            } else {
                report += `${r.board.manufacturer} ${r.board.name} was successfully flashed.\n`;
            }
        });
        return report;
    }),
    flashViaPath: mcuProcedure.input(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        boardPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
        flashPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional()
    })).meta({
        boardRequired: true
    }).mutation(async ({ ctx , input  })=>{
        if (ctx.board == null) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `No supported board exists for the path ${input.boardPath}`
            });
        }
        if (ctx.board.flashScript == null) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `${ctx.board.name} does not support automatic flashing via serial path.`
            });
        }
        if (input.flashPath && !fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(input.flashPath)) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `The path ${input.flashPath} does not exist.`
            });
        }
        let compileResult = null;
        const firmwareBinary = path__WEBPACK_IMPORTED_MODULE_8___default().resolve("/home/pi/printer_data/config/firmware_binaries", ctx.board.firmwareBinaryName);
        try {
            if (fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(firmwareBinary)) {
                fs__WEBPACK_IMPORTED_MODULE_1___default().rmSync(firmwareBinary);
            }
            const compileScript = path__WEBPACK_IMPORTED_MODULE_8___default().join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), ctx.board.compileScript);
            compileResult = await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("board-script.sh", compileScript);
        } catch (e) {
            const message = e instanceof Error ? e.message : e;
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not compile firmware for ${ctx.board.name}: ${compileResult?.stdout ?? message}'}`,
                cause: e
            });
        }
        if (!fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(firmwareBinary)) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not compile firmware for ${ctx.board.name}: ${compileResult.stdout}`
            });
        }
        let flashResult = null;
        try {
            const flashScript = path__WEBPACK_IMPORTED_MODULE_8___default().join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), ctx.board.flashScript);
            flashResult = input.flashPath ? await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("flash-path.sh", ctx.board.serialPath, input.flashPath) : await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("board-script.sh", flashScript);
        } catch (e) {
            const message = e instanceof Error ? e.message : e;
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not flash firmware to ${ctx.board.name}: \n\n ${flashResult?.stdout ?? message}`,
                cause: e
            });
        }
        if (!fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(ctx.board.serialPath)) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not flash firmware to ${ctx.board.name}, device did not show up at expected path.: \n\n ${flashResult.stdout}`
            });
        }
        return "success";
    }),
    dfuDetect: mcuProcedure.input(inputSchema).meta({
        boardRequired: true
    }).query(async ({ ctx , input  })=>{
        const dfuDeviceCount = parseInt((await (0,util__WEBPACK_IMPORTED_MODULE_3__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_2__.exec)('lsusb | grep "0483:df11" | wc -l')).stdout, 10);
        if (dfuDeviceCount === 1) {
            return true;
        }
        if (dfuDeviceCount > 1) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "PRECONDITION_FAILED",
                message: "Multiple DFU devices detected, please disconnect the other devices."
            });
        }
        return false;
    }),
    dfuFlash: mcuProcedure.input(inputSchema).meta({
        boardRequired: true
    }).mutation(async ({ ctx , input  })=>{
        if (ctx.board == null) return; // middleware takes care of the error message.
        if (ctx.board.dfu == null) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "PRECONDITION_FAILED",
                message: "Board does not support DFU."
            });
        }
        let compileResult = null;
        const firmwareBinary = path__WEBPACK_IMPORTED_MODULE_8___default().resolve("/home/pi/printer_data/config/firmware_binaries", ctx.board.firmwareBinaryName);
        try {
            if (fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(firmwareBinary)) {
                fs__WEBPACK_IMPORTED_MODULE_1___default().rmSync(firmwareBinary);
            }
            const compileScript = path__WEBPACK_IMPORTED_MODULE_8___default().join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), ctx.board.compileScript);
            compileResult = await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("board-script.sh", compileScript);
        } catch (e) {
            const message = e instanceof Error ? e.message : e;
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not compile firmware for ${ctx.board.name}: \n\n ${message}`,
                cause: e
            });
        }
        if (!fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync(firmwareBinary)) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not compile firmware for ${ctx.board.name}: \n\n ${compileResult.stdout} ${compileResult.stderr}`
            });
        }
        try {
            const flashResult = await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("dfu-flash.sh", ctx.board.serialPath);
            return flashResult.stdout;
        } catch (e) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to flash device",
                cause: e
            });
        }
    })
});


/***/ }),

/***/ 8199:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$y": () => (/* binding */ publicProcedure),
/* harmony export */   "Nd": () => (/* binding */ router),
/* harmony export */   "qR": () => (/* binding */ middleware)
/* harmony export */ });
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2756);
/* harmony import */ var _trpc_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_trpc_server__WEBPACK_IMPORTED_MODULE_0__);

// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = _trpc_server__WEBPACK_IMPORTED_MODULE_0__.initTRPC.context().meta().create();
// Base router and procedure helpers
const router = t.router;
const publicProcedure = t.procedure;
const middleware = t.middleware;


/***/ }),

/***/ 1346:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$l": () => (/* binding */ Board),
/* harmony export */   "AN": () => (/* binding */ AutoFlashableBoard),
/* harmony export */   "Ai": () => (/* binding */ BoardWithDetectionStatus),
/* harmony export */   "MG": () => (/* binding */ Toolboard),
/* harmony export */   "MW": () => (/* binding */ ControlBoardPinMap),
/* harmony export */   "Oy": () => (/* binding */ ToolboardPinMap)
/* harmony export */ });
/* unused harmony export PinMap */
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6734);


// Complete map of all available RatOS pin aliases.
const PinMap = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    x_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    x_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    x_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    x_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    x_diag_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    x_endstop_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y_diag_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y_endstop_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z0_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z0_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z0_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z0_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z0_diag_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z1_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z1_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z1_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z1_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z1_diag_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z2_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z2_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z2_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z2_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z2_diag_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z3_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z3_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z3_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z3_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    z3_diag_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    e_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    e_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    e_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    e_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    e_diag_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    e_heater_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    e_sensor_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    stepper_spi_mosi_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    stepper_spi_miso_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    stepper_spi_sclk_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    adxl345_cs_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    bltouch_sensor_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    bltouch_control_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    probe_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    fan_part_cooling_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    fan_toolhead_cooling_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    fan_controller_board_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    heater_bed_heating_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    heater_bed_sensor_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    "4p_fan_part_cooling_pin": zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    "4p_fan_part_cooling_tach_pin": zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    "4p_toolhead_cooling_pin": zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    "4p_toolhead_cooling_tach_pin": zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    "4p_controller_board_pin": zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    "4p_controller_board_tach_pin": zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional()
});
const ControlBoardPinMap = PinMap.extend({
    x_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    x_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    x_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    x_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    x_endstop_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    y_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    y_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    y_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    y_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    y_endstop_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    z0_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    z0_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    z0_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    z0_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    e_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    e_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    e_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    e_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    e_heater_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    e_sensor_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    probe_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    heater_bed_heating_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    heater_bed_sensor_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
}).and(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    fan_part_cooling_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    fan_toolhead_cooling_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
}).or(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    "4p_fan_part_cooling_pin": zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    "4p_fan_part_cooling_tach_pin": zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    "4p_toolhead_cooling_pin": zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    "4p_toolhead_cooling_tach_pin": zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
})));
const ToolboardPinMap = PinMap.extend({
    e_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    e_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    e_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    e_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    e_heater_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    e_sensor_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    adxl345_cs_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    probe_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
}).and(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    fan_part_cooling_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    fan_toolhead_cooling_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
}).or(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    "4p_fan_part_cooling_pin": zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    "4p_fan_part_cooling_tach_pin": zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    "4p_toolhead_cooling_pin": zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    "4p_toolhead_cooling_tach_pin": zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
})));
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
    hasQuirksFiles: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
    driverCount: zod__WEBPACK_IMPORTED_MODULE_0__.z.number(),
    integratedDrivers: zod__WEBPACK_IMPORTED_MODULE_0__.z.record(zod__WEBPACK_IMPORTED_MODULE_0__.z.nativeEnum(_motion__WEBPACK_IMPORTED_MODULE_1__/* .PrinterAxis */ .po), zod__WEBPACK_IMPORTED_MODULE_0__.z.string()).optional(),
    extruderlessConfig: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    fourPinFanConnectorCount: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().optional(),
    driverVoltages: _motion__WEBPACK_IMPORTED_MODULE_1__/* .Voltage.array */ .v6.array().default([
        24
    ]),
    hasMcuTempSensor: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().default(true),
    outputPins: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
        name: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
        value: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().min(0).max(1)
    })).optional(),
    dfu: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        dfuBootImage: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
        flashDevice: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
        instructions: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(zod__WEBPACK_IMPORTED_MODULE_0__.z.string()),
        reminder: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
        hasBoot0Jumper: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean()
    }).optional(),
    stepperSPI: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        software: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
            sclk: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
            mosi: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
            miso: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
        })
    }).or(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        hardware: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
            bus: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
        })
    })).optional(),
    ADXL345SPI: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        cs_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
    }).and(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        software: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
            sclk: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
            mosi: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
            miso: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
        })
    }).or(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        hardware: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
            bus: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
        })
    }))).optional(),
    path: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
const BoardWithDetectionStatus = Board.extend({
    detected: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean()
});
const AutoFlashableBoard = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    serialPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    isToolboard: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
    compileScript: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    flashScript: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    path: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
const Toolboard = Board.extend({
    isToolboard: zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(true),
    isHost: zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(false).optional(),
    integratedDrivers: Board.shape.integratedDrivers.and(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        extruder: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
    }))
});


/***/ }),

/***/ 6734:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ah": () => (/* binding */ SerializedPrinterRail),
/* harmony export */   "HB": () => (/* binding */ Driver),
/* harmony export */   "JQ": () => (/* binding */ PrinterRail),
/* harmony export */   "P6": () => (/* binding */ PrinterRailDefinition),
/* harmony export */   "R_": () => (/* binding */ matchesDefaultRail),
/* harmony export */   "g6": () => (/* binding */ BasePrinterRail),
/* harmony export */   "po": () => (/* binding */ PrinterAxis),
/* harmony export */   "r": () => (/* binding */ SerializedPrinterRailDefinition),
/* harmony export */   "v6": () => (/* binding */ Voltage),
/* harmony export */   "vF": () => (/* binding */ Stepper)
/* harmony export */ });
/* unused harmony exports StepperVoltage, Voltages, getSupportedVoltages */
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_0__);

var StepperVoltage;
(function(StepperVoltage) {
    StepperVoltage[StepperVoltage["24V"] = 24] = "24V";
    StepperVoltage[StepperVoltage["36V"] = 36] = "36V";
    StepperVoltage[StepperVoltage["48V"] = 48] = "48V";
    StepperVoltage[StepperVoltage["56V"] = 56] = "56V";
    StepperVoltage[StepperVoltage["60V"] = 60] = "60V";
})(StepperVoltage || (StepperVoltage = {}));
const Voltages = [
    {
        id: StepperVoltage["24V"],
        title: "24V"
    },
    {
        id: StepperVoltage["36V"],
        title: "36V"
    },
    {
        id: StepperVoltage["48V"],
        title: "48V"
    },
    {
        id: StepperVoltage["56V"],
        title: "56V"
    },
    {
        id: StepperVoltage["60V"],
        title: "60V"
    }
];
const getSupportedVoltages = (board, driver)=>{
    if (driver?.external) {
        return Voltages.filter((v)=>driver?.voltages?.includes(v.id) || v.id === StepperVoltage["24V"]);
    }
    return Voltages.filter((v)=>board?.driverVoltages?.includes(v.id) || v.id === StepperVoltage["24V"]).filter((v)=>driver?.voltages?.includes(v.id) || v.id === StepperVoltage["24V"]);
};
const matchesDefaultRail = (rail, defaultRail, performanceMode)=>{
    return rail.axis === defaultRail.axis && rail.driver.id === defaultRail.driver.id && rail.stepper.id === defaultRail.stepper.id && (performanceMode && defaultRail.performanceMode && rail.voltage === defaultRail.performanceMode?.voltage && rail.current === defaultRail.performanceMode?.current || !performanceMode && rail.voltage === defaultRail.voltage && rail.current === defaultRail.current);
};
const Voltage = zod__WEBPACK_IMPORTED_MODULE_0__.nativeEnum(StepperVoltage);
const Driver = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    id: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    title: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    type: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([
        "TMC2209",
        "TMC2226",
        "TMC5160",
        "TMC2130",
        "TMC2240"
    ]),
    protocol: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([
        "SPI",
        "UART"
    ]),
    senseResistor: zod__WEBPACK_IMPORTED_MODULE_0__.number().min(0),
    coolingCurrentThreshold: zod__WEBPACK_IMPORTED_MODULE_0__.number(),
    voltages: Voltage.array(),
    maxCurrent: zod__WEBPACK_IMPORTED_MODULE_0__.number().min(0),
    external: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().optional()
});
const BaseStepperPreset = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    voltage: Voltage,
    run_current: zod__WEBPACK_IMPORTED_MODULE_0__.number(),
    driver: Driver.shape.id,
    sense_resistor: zod__WEBPACK_IMPORTED_MODULE_0__.number()
});
const Stepper = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    id: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    title: zod__WEBPACK_IMPORTED_MODULE_0__.string(),
    fullStepsPerRotation: zod__WEBPACK_IMPORTED_MODULE_0__.number().default(200),
    maxPeakCurrent: zod__WEBPACK_IMPORTED_MODULE_0__.number().min(0),
    presets: zod__WEBPACK_IMPORTED_MODULE_0__.array(zod__WEBPACK_IMPORTED_MODULE_0__.discriminatedUnion("driver", [
        BaseStepperPreset.extend({
            driver: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([
                "TMC2130",
                "TMC5160",
                "TMC2240"
            ]),
            driver_MSLUT0: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_MSLUT1: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_MSLUT2: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_MSLUT3: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_MSLUT4: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_MSLUT5: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_MSLUT6: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_MSLUT7: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_W0: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_W1: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_W2: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_W3: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_X1: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_X2: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_X3: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_START_SIN: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_START_SIN90: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_IHOLDDELAY: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_TPOWERDOWN: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_TBL: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_TOFF: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_HEND: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_HSTRT: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_PWM_AUTOSCALE: zod__WEBPACK_IMPORTED_MODULE_0__.boolean().optional(),
            driver_PWM_FREQ: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_PWM_GRAD: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_PWM_AMPL: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_SGT: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional()
        }),
        BaseStepperPreset.extend({
            driver: zod__WEBPACK_IMPORTED_MODULE_0__["enum"]([
                "TMC2209"
            ]),
            driver_TBL: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_TOFF: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_HEND: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional(),
            driver_HSTRT: zod__WEBPACK_IMPORTED_MODULE_0__.number().optional()
        })
    ])).optional().describe("Stepper presets are tightly coupled to the driver type, sense_resistor, stepper, voltage and current.")
});
var PrinterAxis;
(function(PrinterAxis) {
    PrinterAxis["x"] = "x";
    PrinterAxis["x1"] = "x1";
    PrinterAxis["y"] = "y";
    PrinterAxis["y1"] = "y1";
    PrinterAxis["z"] = "z";
    PrinterAxis["z1"] = "z1";
    PrinterAxis["z2"] = "z2";
    PrinterAxis["z3"] = "z3";
    PrinterAxis["extruder"] = "extruder";
})(PrinterAxis || (PrinterAxis = {}));
const BasePrinterRail = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    axis: zod__WEBPACK_IMPORTED_MODULE_0__.nativeEnum(PrinterAxis).describe("Axis of the rail"),
    axisDescription: zod__WEBPACK_IMPORTED_MODULE_0__.string().optional().describe("Description of the axis"),
    driver: Driver.describe("Stepper driver used on this axis"),
    voltage: Voltage.default(StepperVoltage["24V"]).describe("Voltage of the stepper driver"),
    stepper: Stepper.describe("Stepper motor connected to this axis"),
    current: zod__WEBPACK_IMPORTED_MODULE_0__.number().min(0),
    rotationDistance: zod__WEBPACK_IMPORTED_MODULE_0__.number().min(0).describe("Distance in mm the axis travels per stepper rotation"),
    gearRatio: zod__WEBPACK_IMPORTED_MODULE_0__.string().regex(/^\d+:\d+$/).optional().describe("Optional gear ratio of the axis"),
    homingSpeed: zod__WEBPACK_IMPORTED_MODULE_0__.number().min(0).default(10).describe("Axis speed during homing in mm/s"),
    microstepping: zod__WEBPACK_IMPORTED_MODULE_0__.number().min(16).max(256).default(64).describe("Microstepping of the stepper driver, higher values increase resolution and lower noise but increases load on the MCU")
});
const PrinterRailDefinition = BasePrinterRail.extend({
    performanceMode: zod__WEBPACK_IMPORTED_MODULE_0__.object({
        current: zod__WEBPACK_IMPORTED_MODULE_0__.number().min(0),
        voltage: Voltage.default(StepperVoltage["24V"]).describe("Voltage of the stepper driver in performance mode"),
        homingSpeed: zod__WEBPACK_IMPORTED_MODULE_0__.number().min(0).optional().describe("Axis speed during homing in mm/s in performance mode")
    }).optional()
});
const SerializedPrinterRailDefinition = PrinterRailDefinition.extend({
    driver: Driver.shape.id,
    stepper: Stepper.shape.id
});
const PrinterRail = BasePrinterRail// Don't enforce this, warn about temperatures in the frontend instead.
// .refine(
// 	(data) => data.current <= data.stepper.maxPeakCurrent / 1.41,
// 	'Current must be less than max peak current of the stepper divided by 1.41',
// )
.refine((data)=>data.current <= data.driver.maxCurrent, "Current must be less than max current of the driver");
const SerializedPrinterRail = BasePrinterRail.extend({
    driver: Driver.shape.id,
    stepper: Stepper.shape.id
});


/***/ })

};
;