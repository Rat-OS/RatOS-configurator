exports.id = 112;
exports.ids = [112];
exports.modules = {

/***/ 5866:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./caramba": [
		2490,
		490
	],
	"./caramba-hybrid": [
		4487,
		487
	],
	"./caramba-hybrid.ts": [
		4487,
		487
	],
	"./caramba-idex": [
		1868,
		868
	],
	"./caramba-idex.ts": [
		1868,
		868
	],
	"./caramba.ts": [
		2490,
		490
	],
	"./extras/sensorless-homing": [
		1096,
		680,
		96
	],
	"./extras/sensorless-homing.ts": [
		1096,
		680,
		96
	],
	"./prusa-mini": [
		9313,
		313
	],
	"./prusa-mini.ts": [
		9313,
		313
	],
	"./prusa-mk3s": [
		3351,
		351
	],
	"./prusa-mk3s.ts": [
		3351,
		351
	],
	"./v-core-3": [
		9263,
		263
	],
	"./v-core-3.ts": [
		9263,
		263
	],
	"./v-core-pro": [
		1028,
		28
	],
	"./v-core-pro.ts": [
		1028,
		28
	],
	"./v-minion": [
		2525,
		525
	],
	"./v-minion.ts": [
		2525,
		525
	],
	"./voron-v01": [
		1881,
		881
	],
	"./voron-v01.ts": [
		1881,
		881
	],
	"./voron-v24": [
		3187,
		187
	],
	"./voron-v24.ts": [
		3187,
		187
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 5866;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 8441:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ Steppers),
/* harmony export */   "a": () => (/* binding */ findPreset)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _zods_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6734);


const findPreset = (stepper, driver, voltage, current, performanceMode)=>{
    return stepper.presets?.slice().sort((a, b)=>performanceMode ? b.run_current - a.run_current : a.run_current - b.run_current).find((p)=>p.driver === driver.type && p.voltage === voltage && p.sense_resistor === driver.senseResistor && (current == null || p.run_current === current));
};
const Steppers = zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_zods_motion__WEBPACK_IMPORTED_MODULE_1__/* .Stepper */ .vF).parse([
    {
        id: "generic",
        title: "Generic Stepper",
        maxPeakCurrent: 2.8
    },
    {
        id: "BONDTECH-42H025H-0704-002",
        title: "Bondtech LGX Stepper",
        maxPeakCurrent: 0.7
    },
    {
        id: "LDO-42STH48-2504AC",
        title: "LDO-42STH48-2504AC",
        maxPeakCurrent: 2.5,
        presets: [
            {
                run_current: 1.1,
                voltage: 24,
                driver: "TMC2209",
                sense_resistor: 0.11,
                driver_TBL: 1,
                driver_TOFF: 3,
                driver_HEND: 0,
                driver_HSTRT: 0
            },
            {
                run_current: 1.6,
                voltage: 24,
                driver: "TMC2209",
                sense_resistor: 0.11,
                driver_TBL: 2,
                driver_TOFF: 3,
                driver_HEND: 0,
                driver_HSTRT: 6
            },
            {
                run_current: 1.6,
                voltage: 24,
                driver: "TMC5160",
                sense_resistor: 0.075,
                driver_TBL: 2,
                driver_TOFF: 3,
                driver_HEND: 0,
                driver_HSTRT: 6
            },
            {
                run_current: 1.768,
                voltage: 48,
                driver: "TMC5160",
                sense_resistor: 0.075,
                driver_TBL: 0,
                driver_TOFF: 4,
                driver_HEND: 0,
                driver_HSTRT: 4
            }
        ]
    },
    {
        id: "LDO-42STH40-1684AC",
        title: "LDO-42STH40-1684AC",
        maxPeakCurrent: 1.68,
        presets: [
            {
                run_current: 0.4,
                voltage: 24,
                driver: "TMC2130",
                sense_resistor: 0.22,
                driver_IHOLDDELAY: 8,
                driver_TPOWERDOWN: 0,
                driver_TBL: 2,
                driver_TOFF: 3,
                driver_HEND: 1,
                driver_HSTRT: 5,
                driver_PWM_FREQ: 2,
                driver_PWM_GRAD: 2,
                driver_PWM_AMPL: 230,
                driver_PWM_AUTOSCALE: true,
                driver_SGT: 5
            },
            {
                run_current: 0.52,
                voltage: 24,
                driver: "TMC2130",
                sense_resistor: 0.22,
                driver_IHOLDDELAY: 8,
                driver_TPOWERDOWN: 0,
                driver_TBL: 2,
                driver_TOFF: 3,
                driver_HEND: 1,
                driver_HSTRT: 5,
                driver_PWM_FREQ: 2,
                driver_PWM_GRAD: 4,
                driver_PWM_AMPL: 240,
                driver_PWM_AUTOSCALE: true,
                driver_SGT: 3
            },
            {
                run_current: 0.8,
                voltage: 24,
                driver: "TMC2209",
                sense_resistor: 0.11,
                driver_TBL: 1,
                driver_TOFF: 3,
                driver_HEND: 3,
                driver_HSTRT: 0
            },
            {
                run_current: 1.188,
                voltage: 24,
                driver: "TMC2209",
                sense_resistor: 0.11,
                driver_TBL: 0,
                driver_TOFF: 3,
                driver_HEND: 0,
                driver_HSTRT: 0
            }
        ]
    },
    {
        id: "LDO-42STH48-2004MAH",
        title: "LDO-42STH48-2004MAH",
        maxPeakCurrent: 2.0,
        fullStepsPerRotation: 400
    },
    {
        id: "LDO-42STH48-2004AC",
        title: "LDO-42STH48-2004AC",
        maxPeakCurrent: 2.0
    },
    {
        id: "LDO-42STH25-1404MAC",
        title: "LDO-42STH25-1404MAC",
        maxPeakCurrent: 1.4,
        fullStepsPerRotation: 400,
        presets: [
            {
                voltage: 24,
                driver: "TMC2209",
                sense_resistor: 0.11,
                run_current: 0.85,
                driver_TBL: 1,
                driver_TOFF: 3,
                driver_HEND: 2,
                driver_HSTRT: 0
            }
        ]
    },
    {
        id: "LDO-42STH25-1004CL200E",
        title: "LDO-42STH25-1004CL200E",
        maxPeakCurrent: 1.0
    },
    {
        id: "LDO-36STH20-1004AHG",
        title: "LDO-36STH20-1004AHG",
        maxPeakCurrent: 1.0,
        presets: [
            {
                voltage: 24,
                driver: "TMC2209",
                sense_resistor: 0.11,
                run_current: 0.707,
                driver_TBL: 0,
                driver_HEND: 6,
                driver_HSTRT: 7,
                driver_TOFF: 4
            }
        ]
    },
    {
        id: "LDO-36STH17-1004AHG",
        title: "LDO-36STH17-1004AHG",
        maxPeakCurrent: 1.0
    },
    {
        id: "LDO-35STH48-1684AH",
        title: "LDO-35STH48-1684AH",
        maxPeakCurrent: 1.68
    }
]);


/***/ }),

/***/ 3806:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ getBoardSerialPath),
/* harmony export */   "m": () => (/* binding */ getBoardChipId)
/* harmony export */ });
const getBoardSerialPath = (board, toolhead)=>{
    if (board.isHost && "serialPath" in board && board.serialPath != null) {
        return board.serialPath;
    }
    return "/dev/RatOS/" + getBoardChipId(board, toolhead);
};
const getBoardChipId = (board, toolhead)=>{
    if (board.isHost) {
        throw new Error("Cannot get chip ID for a host board");
    }
    return board.id + (toolhead ? `-${toolhead.getSerialSuffix()}` : "");
};


/***/ }),

/***/ 4204:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ ToolheadHelper)
/* harmony export */ });
/* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3977);
/* harmony import */ var _zods_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6734);
/* harmony import */ var _zods_toolhead__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2493);



class ToolheadHelper {
    constructor(toolhead){
        this.config = toolhead;
    }
    hasToolboard() {
        return this.config.toolboard != null;
    }
    getToolboard() {
        return this.config.toolboard;
    }
    getMotionStepperName() {
        return `stepper_${this.getMotionAxis()}`;
    }
    getToolboardName() {
        if (this.config.toolboard == null) {
            throw new Error(`Toolhead T${this.getTool()} does not have a toolboard`);
        }
        return `toolboard_${this.getShortToolName()}`;
    }
    getShortToolName() {
        return `t${this.getTool()}`;
    }
    getDescription() {
        return this.config.description ?? `the printer's toolhead`;
    }
    getMotionAxis() {
        if (this.config.axis === _zods_motion__WEBPACK_IMPORTED_MODULE_1__/* .PrinterAxis.dual_carriage */ .po.dual_carriage) {
            return _zods_motion__WEBPACK_IMPORTED_MODULE_1__/* .PrinterAxis.dual_carriage */ .po.dual_carriage;
        }
        return _zods_motion__WEBPACK_IMPORTED_MODULE_1__/* .PrinterAxis.x */ .po.x;
    }
    getExtruderAxis() {
        if (this.config.axis === _zods_motion__WEBPACK_IMPORTED_MODULE_1__/* .PrinterAxis.dual_carriage */ .po.dual_carriage) {
            return _zods_motion__WEBPACK_IMPORTED_MODULE_1__/* .PrinterAxis.extruder1 */ .po.extruder1;
        }
        return _zods_motion__WEBPACK_IMPORTED_MODULE_1__/* .PrinterAxis.extruder */ .po.extruder;
    }
    getToolCommand() {
        return `T${this.getTool()}`;
    }
    getTool() {
        if (this.config.axis === _zods_motion__WEBPACK_IMPORTED_MODULE_1__/* .PrinterAxis.dual_carriage */ .po.dual_carriage) {
            return 1;
        }
        return 0;
    }
    getSerialSuffix() {
        return `t${this.getTool()}`;
    }
    getExtruder() {
        return this.config.extruder;
    }
    getHotend() {
        return this.config.hotend;
    }
    getThermistor() {
        return this.config.thermistor;
    }
    getXEndstop() {
        return this.config.xEndstop;
    }
    getYEndstop() {
        return this.config.yEndstop;
    }
    getXAccelerometer() {
        return this.config.xAccelerometer;
    }
    getYAccelerometer() {
        return this.config.yAccelerometer;
    }
    getXAccelerometerName() {
        switch(this.getXAccelerometer()?.id){
            case "controlboard":
                return "controlboard";
            case "toolboard":
                if (this.hasToolboard()) {
                    return this.getToolboardName();
                }
            case "sbc":
                return "rpi";
            default:
                return "controlboard";
        }
    }
    getYAccelerometerName() {
        switch(this.getYAccelerometer()?.id){
            case "controlboard":
                return "controlboard";
            case "toolboard":
                if (this.hasToolboard()) {
                    return this.getToolboardName();
                }
            case "sbc":
                return "rpi";
            default:
                return "controlboard";
        }
    }
    getChangeSet(changes) {
        if (changes == null) {
            return null;
        }
        const changeSet = {};
        Object.keys(changes).forEach((key)=>{
            const current = this.getConfig()[key];
            const change = changes[key];
            if (current != null && change == null || current == null && change != null) {
                changeSet[key] = change;
                return;
            }
            if (current && change) {
                if (typeof current === "object" && "id" in current && typeof change === "object" && "id" in change) {
                    if (current.id !== change.id) {
                        changeSet[key] = change;
                    }
                } else if (current !== change) {
                    changeSet[key] = change;
                }
            }
        });
        return _zods_toolhead__WEBPACK_IMPORTED_MODULE_2__/* .PartialToolheadConfiguration.parse */ .b2.parse(changeSet);
    }
    getProbe() {
        return this.config.probe;
    }
    getPartFan() {
        return this.config.partFan;
    }
    getHotendFan() {
        return this.config.hotendFan;
    }
    serialize() {
        return (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_0__/* .serializeToolheadConfiguration */ .m6)(this.config);
    }
    getConfig() {
        return {
            ...this.config
        };
    }
}


/***/ }),

/***/ 2633:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ getScriptRoot)
/* harmony export */ });
const getScriptRoot = ()=>{
    // This is ... not great.. come up with something better
    return process.env.RATOS_SCRIPT_DIR ?? __dirname.split("configurator/")[0] + "configurator/scripts/";
};


/***/ }),

/***/ 9878:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mw": () => (/* binding */ cacheAsyncMetadataFn),
/* harmony export */   "oA": () => (/* binding */ ServerCache),
/* harmony export */   "w1": () => (/* binding */ cacheMetadataFn),
/* harmony export */   "zo": () => (/* binding */ MetadataCache)
/* harmony export */ });
/* harmony import */ var node_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4580);
/* harmony import */ var node_cache__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_cache__WEBPACK_IMPORTED_MODULE_0__);

const ServerCache = new (node_cache__WEBPACK_IMPORTED_MODULE_0___default())({
    useClones: false
});
const MetadataCache = new (node_cache__WEBPACK_IMPORTED_MODULE_0___default())({
    useClones: false
});
const cachePromiseLookup = new Map();
const now = new Date().getTime();
const cacheAsyncMetadataFn = (fn, key, cache)=>{
    return async (fileName)=>{
        let result = cache.get(`${key}-${fileName}`);
        if (result == null) {
            let promise = cachePromiseLookup.get(`${key}-${fileName}`);
            if (promise == null) {
                promise = fn(fileName);
                cachePromiseLookup.set(`${key}-${fileName}`, promise);
            } else {}
            const val = await promise;
            cache.set(`${key}-${fileName}`, val);
            return val;
        }
        return result;
    };
};
const cacheMetadataFn = (fn, key, cache)=>{
    return (fileName)=>{
        let result = cache.get(`${key}-${fileName}`);
        if (result == null) {
            const val = fn(fileName);
            cache.set(`${key}-${fileName}`, val);
            return val;
        }
        return result;
    };
};


/***/ }),

/***/ 8736:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M": () => (/* binding */ searchFileByLine),
/* harmony export */   "u": () => (/* binding */ replaceInFileByLine)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2037);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var readline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4521);
/* harmony import */ var readline__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(readline__WEBPACK_IMPORTED_MODULE_3__);




const replaceInFileByLine = async (filePath, search, replace)=>{
    if (!(0,fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)(filePath)) {
        throw new Error("Firmware config file does not exist: " + filePath);
    }
    const fileStream = (0,fs__WEBPACK_IMPORTED_MODULE_0__.createReadStream)(filePath);
    const writeStream = (0,fs__WEBPACK_IMPORTED_MODULE_0__.createWriteStream)(filePath + ".tmp");
    const rl = (0,readline__WEBPACK_IMPORTED_MODULE_3__.createInterface)({
        input: fileStream,
        crlfDelay: Infinity
    });
    for await (const line of rl){
        if (replace == null) {
            if (search instanceof RegExp ? line.match(search) : line.includes(search)) {
                continue;
            }
            writeStream.write(line + os__WEBPACK_IMPORTED_MODULE_2__.EOL);
            continue;
        }
        writeStream.write(line.replace(search, replace) + os__WEBPACK_IMPORTED_MODULE_2__.EOL);
    }
    rl.close();
    await new Promise((resolve, reject)=>{
        writeStream.close((err)=>{
            if (err) {
                throw reject(err);
            }
            resolve(null);
        });
    });
    await new Promise((resolve, reject)=>{
        fileStream.close((err)=>{
            if (err) {
                throw reject(err);
            }
            resolve(null);
        });
    });
    await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.copyFile)(filePath + ".tmp", filePath);
    await (0,fs_promises__WEBPACK_IMPORTED_MODULE_1__.unlink)(filePath + ".tmp");
};
const searchFileByLine = async (filePath, search)=>{
    if (!(0,fs__WEBPACK_IMPORTED_MODULE_0__.existsSync)(filePath)) {
        throw new Error("Firmware config file does not exist: " + filePath);
    }
    const fileStream = (0,fs__WEBPACK_IMPORTED_MODULE_0__.createReadStream)(filePath);
    const rl = (0,readline__WEBPACK_IMPORTED_MODULE_3__.createInterface)({
        input: fileStream,
        crlfDelay: Infinity
    });
    let result = false;
    let lineNumber = 0;
    for await (const line of rl){
        if (result) continue;
        lineNumber++;
        if (search instanceof RegExp ? line.match(search) : line.includes(search)) {
            result = lineNumber;
        }
    }
    await new Promise((resolve, reject)=>{
        fileStream.close((err)=>{
            if (err) {
                throw reject(err);
            }
            resolve(null);
        });
    });
    return result;
};


/***/ }),

/***/ 4279:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ getLogger)
/* harmony export */ });
/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8545);
/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pino__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pino_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3009);
/* harmony import */ var pino_pretty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pino_pretty__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _env_schema_mjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(954);



const stream = pino_pretty__WEBPACK_IMPORTED_MODULE_1___default()({
    levelFirst: true,
    colorize: true,
    ignore: "time,hostname,pid"
});
let logger = null;
const getLogger = ()=>{
    if (logger != null) {
        return logger;
    }
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_2__/* .serverSchema.parse */ .Rz.parse(process.env);
    const transportOption =  false ? 0 : {
        target: "pino/file",
        options: {
            destination: environment.LOG_FILE,
            append: true
        }
    };
    logger = pino__WEBPACK_IMPORTED_MODULE_0___default()({
        timestamp: true,
        transport: transportOption
    });
    return logger;
};


/***/ }),

/***/ 9993:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AU": () => (/* binding */ stripIncludes),
/* harmony export */   "BB": () => (/* binding */ parseMetadata),
/* harmony export */   "ND": () => (/* binding */ replaceLinesStartingWith),
/* harmony export */   "NH": () => (/* binding */ getExtruderRotationDistance),
/* harmony export */   "Qk": () => (/* binding */ parseBoardPinConfig),
/* harmony export */   "_s": () => (/* binding */ exportBoardPinAlias),
/* harmony export */   "rc": () => (/* binding */ stripCommentLines),
/* harmony export */   "sV": () => (/* binding */ stripDriverSections),
/* harmony export */   "up": () => (/* binding */ readInclude)
/* harmony export */ });
/* unused harmony exports extractMcuFromFirmwareConfig, stripLinesStartingWith */
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2081);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var readline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4521);
/* harmony import */ var readline__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(readline__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3837);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _env_schema_mjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(954);
/* harmony import */ var _zods_boards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1346);
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2633);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4279);
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(9878);










const parseMetadata = async (cfgFile, zod)=>{
    if (cfgFile.trim() === "") return null;
    const hashmarkPrefixedJson = await (0,util__WEBPACK_IMPORTED_MODULE_4__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_0__.exec)(`sed -n '/^# {/{:a; N; /\\n# }/!ba; p}' ${cfgFile}`);
    const jsonArray = hashmarkPrefixedJson.stdout.split("\n").map((l)=>l.trim()).filter((l)=>l !== "").map((l)=>l.indexOf("#") === 0 ? l.substring(1) : l);
    if (jsonArray.length === 0) {
        return null;
    }
    try {
        const content = JSON.parse(jsonArray.join("\n"));
        content.path = cfgFile;
        const fileName = cfgFile.split("/").pop();
        if (fileName == null) {
            throw new Error("File name couldn't be parsed from path: " + cfgFile);
        }
        content.id = fileName.replace(/\.cfg$/g, "");
        return zod.parse(content);
    } catch (e) {
        if (e instanceof Error) {
            (0,_logger__WEBPACK_IMPORTED_MODULE_7__/* .getLogger */ .j)().error(e.message);
        }
        throw new Error("Failed to parse JSON from file: " + cfgFile + " with content: " + jsonArray.join("\n"));
    }
};
const parsePinValue = (value)=>{
    if (value === "null") {
        return undefined;
    }
    if (value.startsWith("<") && value.endsWith(">")) {
        return undefined;
    }
    return value;
};
const parsePinAlias = (0,_cache__WEBPACK_IMPORTED_MODULE_8__/* .cacheAsyncMetadataFn */ .mw)(async (file)=>{
    const scriptRoot = (0,_helpers_util__WEBPACK_IMPORTED_MODULE_9__/* .getScriptRoot */ .x)();
    const configUnparsed = await (0,util__WEBPACK_IMPORTED_MODULE_4__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_0__.exec)(`python3 ${path__WEBPACK_IMPORTED_MODULE_2___default().join(scriptRoot, "initojson.py")} ${file}`);
    const config = JSON.parse(configUnparsed.stdout);
    if (config == null) {
        throw new Error("Failed to parse config file: " + file);
    }
    const boardPinSection = Object.keys(config).find((section)=>section.startsWith("board_pins"));
    if (boardPinSection == null) {
        throw new Error("Failed to find board pin section in config file: " + file);
    }
    const unparsedPins = config[boardPinSection].aliases.map((a)=>a.replace(",", ""));
    const badPins = config[boardPinSection].aliases.filter((a)=>!a.includes("="));
    if (badPins.length > 0) {
        throw new Error('Board pin aliases do not parse correctly, got "' + badPins.join(", ") + '"');
    }
    const pins = {};
    unparsedPins.forEach((p)=>{
        const frags = p.split("=");
        if (frags.length > 2) {
            throw new Error('Board pin aliases do not parse correctly, got "' + p + '"');
        }
        pins[frags[0]] = parsePinValue(frags[1]);
    });
    return pins;
}, "parsePinAlias", _cache__WEBPACK_IMPORTED_MODULE_8__/* .MetadataCache */ .zo);
const exportBoardPinAlias = (pinAlias, pins, mcu)=>{
    const aliases = Object.keys(pins).map((k, i)=>{
        if (pins[k] == null) {
            return k + "=null";
        }
        return k + "=" + pins[k];
    });
    const result = [
        `[board_pins ${pinAlias}]`
    ];
    if (mcu != null) {
        result.push(`mcu: ${mcu}`);
    }
    result.push(`aliases:`, `\t${aliases.join(",\n	")}`);
    return result.join("\n");
};
const parseBoardPinConfig = async (board, extruderLess)=>{
    let file = path__WEBPACK_IMPORTED_MODULE_2___default().join(board.path, board.isToolboard ? "toolboard-config.cfg" : extruderLess && board.extruderlessConfig != null ? board.extruderlessConfig : "config.cfg");
    const zod = board.isToolboard ? _zods_boards__WEBPACK_IMPORTED_MODULE_6__/* .ToolboardPinMap */ .Oy : extruderLess ? _zods_boards__WEBPACK_IMPORTED_MODULE_6__/* .ExtruderlessControlBoardPinMap */ .Fh : _zods_boards__WEBPACK_IMPORTED_MODULE_6__/* .ControlBoardPinMap */ .MW;
    return zod.parse(await parsePinAlias(file));
};
const extractMcuFromFirmwareConfig = (0,_cache__WEBPACK_IMPORTED_MODULE_8__/* .cacheAsyncMetadataFn */ .mw)(async (filePath)=>{
    if (!(0,fs__WEBPACK_IMPORTED_MODULE_1__.existsSync)(filePath)) {
        throw new Error("Firmware config file does not exist: " + filePath);
    }
    const fileStream = (0,fs__WEBPACK_IMPORTED_MODULE_1__.createReadStream)(filePath);
    const rl = (0,readline__WEBPACK_IMPORTED_MODULE_3__.createInterface)({
        input: fileStream,
        crlfDelay: Infinity
    });
    const startOfMCULine = `CONFIG_MCU="`;
    for await (const line of rl){
        // Each line in input.txt will be successively available here as `line`.
        if (line.startsWith(startOfMCULine)) {
            return line.substring(startOfMCULine.length, line.length - 2);
        }
    }
    throw new Error("Failed to find MCU in firmware config file: " + filePath);
}, "extractMcuFromFirmwareConfig", _cache__WEBPACK_IMPORTED_MODULE_8__/* .MetadataCache */ .zo);
const getExtruderRotationDistance = (0,_cache__WEBPACK_IMPORTED_MODULE_8__/* .cacheMetadataFn */ .w1)((extruderId)=>{
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_5__/* .serverSchema.parse */ .Rz.parse(process.env);
    const extruderCfgPath = path__WEBPACK_IMPORTED_MODULE_2___default().join(environment.RATOS_CONFIGURATION_PATH, "extruders", extruderId + ".cfg");
    const scriptRoot = (0,_helpers_util__WEBPACK_IMPORTED_MODULE_9__/* .getScriptRoot */ .x)();
    const configUnparsed = (0,child_process__WEBPACK_IMPORTED_MODULE_0__.execSync)(`python3 ${path__WEBPACK_IMPORTED_MODULE_2___default().join(scriptRoot, "initojson.py")} ${extruderCfgPath}`);
    const config = JSON.parse(configUnparsed.toString());
    if (config == null) {
        throw new Error("Failed to parse config file: " + extruderCfgPath);
    }
    const extruderSection = Object.keys(config).find((section)=>section.startsWith("extruder"));
    if (extruderSection == null) {
        throw new Error("Failed to find extruder section in config file: " + extruderCfgPath);
    }
    const extruder = config[extruderSection];
    if (extruder == null || extruder.rotation_distance == null) {
        throw new Error("Failed to find extruder rotation distance");
    }
    return extruder.rotation_distance;
}, "getExtruderRotationDistance", _cache__WEBPACK_IMPORTED_MODULE_8__/* .MetadataCache */ .zo);
const readInclude = (fileName)=>{
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_5__/* .serverSchema.parse */ .Rz.parse(process.env);
    const fullPath = path__WEBPACK_IMPORTED_MODULE_2___default().join(environment.RATOS_CONFIGURATION_PATH, fileName);
    if (!(0,fs__WEBPACK_IMPORTED_MODULE_1__.existsSync)(fullPath)) {
        throw new Error("Extruder config file doesn't exist: " + fileName);
    }
    return (0,fs__WEBPACK_IMPORTED_MODULE_1__.readFileSync)(fullPath, "utf-8");
};
const stripIncludes = (content)=>{
    return stripLinesStartingWith(content, "[include");
};
const stripCommentLines = (content)=>{
    return stripLinesStartingWith(content, "#");
};
const stripLinesStartingWith = (content, start)=>{
    return content.split("\n").filter((l)=>!l.trim().startsWith(start)).join("\n");
};
const stripDriverSections = (content)=>{
    let insideDriverSection = false;
    return content.split("\n").map((l)=>{
        if (l.trim().startsWith("[tmc")) {
            insideDriverSection = true;
        }
        if (insideDriverSection) {
            if (l.trim().startsWith("[")) {
                insideDriverSection = false;
            } else {
                return null;
            }
        }
        return l;
    }).filter((l)=>l != null).join("\n");
};
const replaceLinesStartingWith = (content, start, replace)=>{
    return content.split("\n").map((l)=>l.trim().startsWith(start) ? replace : l).join("\n");
};


/***/ }),

/***/ 1554:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ runSudoScript)
/* harmony export */ });
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2081);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2633);



const runSudoScript = (script, ...args)=>{
    const scriptRoot = (0,_helpers_util__WEBPACK_IMPORTED_MODULE_2__/* .getScriptRoot */ .x)();
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

/***/ 3459:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DC": () => (/* binding */ getBoards),
/* harmony export */   "Ok": () => (/* binding */ getToolboards),
/* harmony export */   "px": () => (/* binding */ mcuRouter)
/* harmony export */ });
/* unused harmony exports updateDetectionStatus, compileFirmware, getBoardsWithoutHost, getBoardsWithDriverCount */
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
/* harmony import */ var _helpers_util__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(2633);
/* harmony import */ var _helpers_run_script__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1554);
/* harmony import */ var _zods_boards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1346);
/* harmony import */ var _trpc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8199);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var glob__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4230);
/* harmony import */ var glob__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(glob__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _zods_toolhead__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(2493);
/* harmony import */ var _helpers_board__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(3806);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3292);
/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _env_schema_mjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(954);
/* harmony import */ var _helpers_file_operations__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8736);
/* harmony import */ var _helpers_toolhead__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(4204);
/* harmony import */ var _printer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(5662);
/* harmony import */ var _helpers_cache__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(9878);
/* harmony import */ var _zods_motion__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(6734);
/* harmony import */ var _helpers_metadata__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(9993);





















const inputSchema = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    boardPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    toolhead: _zods_toolhead__WEBPACK_IMPORTED_MODULE_10__/* .SerializedToolheadConfiguration.optional */ .Qk.optional()
});
const detect = (board, toolhead)=>{
    return fs__WEBPACK_IMPORTED_MODULE_1___default().existsSync((0,_helpers_board__WEBPACK_IMPORTED_MODULE_19__/* .getBoardSerialPath */ .e)(board, toolhead));
};
const getBoards = async ()=>{
    const cached = _helpers_cache__WEBPACK_IMPORTED_MODULE_16__/* .ServerCache.get */ .oA.get("boards");
    if (cached != null && cached.length > 0) {
        return cached.map((b)=>{
            b.detected = detect(b);
            return b;
        });
    }
    const defs = await (0,glob__WEBPACK_IMPORTED_MODULE_9__.glob)(`${process.env.RATOS_CONFIGURATION_PATH}/boards/*/board-definition.json`);
    const boards = zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_zods_boards__WEBPACK_IMPORTED_MODULE_6__/* .BoardWithDetectionStatus */ .Ai).parse(defs.map((f)=>f.trim() === "" ? null : {
            ...JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1___default().readFileSync(f).toString()),
            path: f.replace("board-definition.json", "")
        }).filter(Boolean).map((b)=>{
        b.detected = detect(b);
        return b;
    }));
    _helpers_cache__WEBPACK_IMPORTED_MODULE_16__/* .ServerCache.set */ .oA.set("boards", boards);
    return boards;
};
const updateDetectionStatus = async (boards, toolhead)=>{
    return boards.map((b)=>{
        b.detected = detect(b, toolhead);
        return b;
    });
};
const compileFirmware = async (board, toolhead, skipCompile)=>{
    let compileResult = null;
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_12__/* .serverSchema.parse */ .Rz.parse(process.env);
    try {
        const dest = path__WEBPACK_IMPORTED_MODULE_8___default().join(environment.KLIPPER_DIR, ".config");
        await (0,fs_promises__WEBPACK_IMPORTED_MODULE_11__.copyFile)(path__WEBPACK_IMPORTED_MODULE_8___default().join(environment.RATOS_CONFIGURATION_PATH, "boards", board.id, "firmware.config"), dest);
        await (0,_helpers_file_operations__WEBPACK_IMPORTED_MODULE_13__/* .replaceInFileByLine */ .u)(dest, /CONFIG_USB_SERIAL_NUMBER=".+"/g, `CONFIG_USB_SERIAL_NUMBER="${(0,_helpers_board__WEBPACK_IMPORTED_MODULE_19__/* .getBoardChipId */ .m)(board, toolhead)}"`);
        if (skipCompile) {
            return (0,fs__WEBPACK_IMPORTED_MODULE_1__.readFileSync)(dest).toString();
        }
        compileResult = await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("klipper-compile.sh");
        return compileResult;
    } catch (e) {
        const message = e instanceof Error ? e.message : e;
        throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Could not compile firmware for ${board.name}: ${compileResult?.stdout ?? message}'}`,
            cause: e
        });
    }
};
const getBoardsWithoutHost = (boards)=>{
    return boards.filter((b)=>!b.isHost);
};
const getToolboards = (boards)=>{
    return zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_zods_boards__WEBPACK_IMPORTED_MODULE_6__/* .ToolboardWithDetectionStatus */ .m9).parse(boards.filter((b)=>b.isToolboard));
};
const getBoardsWithDriverCount = (boards, driverCount)=>{
    return boards.filter((b)=>b.driverCount >= driverCount || b.extruderlessConfig != null && b.driverCount >= driverCount - 1);
};
const mcuMiddleware = (0,_trpc__WEBPACK_IMPORTED_MODULE_7__/* .middleware */ .qR)(async ({ ctx , next , meta , rawInput  })=>{
    let boards = null;
    let toolhead = null;
    const parsedInput = inputSchema.safeParse(rawInput);
    try {
        boards = await getBoards();
        toolhead = parsedInput.success && parsedInput.data.toolhead ? new _helpers_toolhead__WEBPACK_IMPORTED_MODULE_14__/* .ToolheadHelper */ .D(await (0,_printer__WEBPACK_IMPORTED_MODULE_15__/* .deserializeToolheadConfiguration */ .dj)(parsedInput.data.toolhead, {}, boards)) : undefined;
        boards = await updateDetectionStatus(boards, toolhead);
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
    if (meta?.boardRequired && (!parsedInput.success || parsedInput.data.boardPath == null)) {
        throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
            code: "PRECONDITION_FAILED",
            message: `boardPath parameter missing.`
        });
    }
    if (parsedInput.success && parsedInput.data.boardPath != null) {
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
            board: board,
            toolhead: toolhead
        }
    });
});
const mcuProcedure = _trpc__WEBPACK_IMPORTED_MODULE_7__/* .publicProcedure.use */ .$y.use(mcuMiddleware);
const mcuRouter = (0,_trpc__WEBPACK_IMPORTED_MODULE_7__/* .router */ .Nd)({
    boards: mcuProcedure.input(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        boardFilters: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
            toolboard: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
            driverCountRequired: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().optional()
        }).optional(),
        toolhead: _zods_toolhead__WEBPACK_IMPORTED_MODULE_10__/* .SerializedToolheadConfiguration.optional */ .Qk.optional()
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
        return detect(ctx.board, ctx.toolhead);
    }),
    unidentifiedDevices: mcuProcedure.query(async ({ ctx  })=>{
        const detected = ctx.boards.filter((b)=>b.detected).map((b)=>fs__WEBPACK_IMPORTED_MODULE_1___default().realpathSync((0,_helpers_board__WEBPACK_IMPORTED_MODULE_19__/* .getBoardSerialPath */ .e)(b)));
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
        const scriptRoot = (0,_helpers_util__WEBPACK_IMPORTED_MODULE_20__/* .getScriptRoot */ .x)();
        // stop klipper
        let version = {
            stdout: ""
        };
        let error = null;
        try {
            await fetch("http://127.0.0.1:7125/machine/services/stop?service=klipper", {
                method: "POST"
            });
            version = await (0,util__WEBPACK_IMPORTED_MODULE_3__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_2__.exec)(`${path__WEBPACK_IMPORTED_MODULE_8___default().join(process.env.KLIPPER_ENV, "bin", "python")} ${path__WEBPACK_IMPORTED_MODULE_8___default().join(scriptRoot, "check-version.py")} ${(0,_helpers_board__WEBPACK_IMPORTED_MODULE_19__/* .getBoardSerialPath */ .e)(ctx.board, ctx.toolhead)}`, {
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
        boardPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
        toolhead: _zods_toolhead__WEBPACK_IMPORTED_MODULE_10__/* .SerializedToolheadConfiguration.optional */ .Qk.optional()
    })).meta({
        boardRequired: true
    }).mutation(async ({ ctx , input  })=>{
        if (ctx.board == null) {
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "PRECONDITION_FAILED",
                message: `No supported board exists for the path ${input.boardPath}`
            });
        }
        await compileFirmware(ctx.board, ctx.toolhead);
        return "success";
    }),
    reversePinLookup: mcuProcedure.meta({
        boardRequired: true
    }).input(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        axis: zod__WEBPACK_IMPORTED_MODULE_0__.z.nativeEnum(_zods_motion__WEBPACK_IMPORTED_MODULE_17__/* .PrinterAxis */ .po),
        hasToolboard: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean(),
        boardPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
    })).query(async ({ ctx , input  })=>{
        if (ctx.board == null) {
            return undefined;
        }
        const isExtruderlessBoard = ctx.board.extruderlessConfig != null && input.hasToolboard;
        const pins = await (0,_helpers_metadata__WEBPACK_IMPORTED_MODULE_18__/* .parseBoardPinConfig */ .Qk)(ctx.board, isExtruderlessBoard);
        const axisAlias = input.axis === _zods_motion__WEBPACK_IMPORTED_MODULE_17__/* .PrinterAxis.z */ .po.z ? "z0" : input.axis === _zods_motion__WEBPACK_IMPORTED_MODULE_17__/* .PrinterAxis.extruder */ .po.extruder ? "e" : _zods_motion__WEBPACK_IMPORTED_MODULE_17__/* .PrinterAxis.extruder1 */ .po.extruder1 === input.axis ? "e1" : input.axis;
        return (0,_zods_boards__WEBPACK_IMPORTED_MODULE_6__/* .reversePinLookup */ .MO)({
            step_pin: pins[`${axisAlias}_step_pin`],
            dir_pin: pins[`${axisAlias}_dir_pin`]
        }, ctx.board);
    }),
    flashAllConnected: mcuProcedure.meta({
        boardRequired: false,
        includeHost: true
    }).mutation(async ({ ctx  })=>{
        const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_12__/* .serverSchema.parse */ .Rz.parse(process.env);
        const filePath = path__WEBPACK_IMPORTED_MODULE_8___default().join(environment.RATOS_DATA_DIR, "last-printer-settings.json");
        if (!(0,fs__WEBPACK_IMPORTED_MODULE_1__.existsSync)(filePath)) {
            throw new Error("Couldn't find printer settings file: " + filePath);
        }
        const config = await (0,_printer__WEBPACK_IMPORTED_MODULE_15__/* .loadSerializedConfig */ .fM)(filePath);
        const toolheadHelpers = config.toolheads.map((t)=>{
            return new _helpers_toolhead__WEBPACK_IMPORTED_MODULE_14__/* .ToolheadHelper */ .D(t);
        });
        const connectedBoards = ctx.boards.map((b)=>{
            if (b.flashScript && b.compileScript && b.disableAutoFlash !== true) {
                if (detect(b)) {
                    return {
                        board: b,
                        toolhead: null
                    };
                }
                const toolboard = toolheadHelpers.map((th)=>{
                    if (detect(b, th)) {
                        return {
                            board: b,
                            toolhead: th
                        };
                    }
                }).find((b)=>b != null) ?? null;
                return toolboard;
            }
            return null;
        }).filter(Boolean);
        const flashResults = [];
        for (const b of connectedBoards){
            try {
                const current = _zods_boards__WEBPACK_IMPORTED_MODULE_6__/* .AutoFlashableBoard.parse */ .AN.parse(b.board);
                compileFirmware(b.board, b.toolhead);
                let flashResult = null;
                try {
                    const flashScript = path__WEBPACK_IMPORTED_MODULE_8___default().join(current.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), current.flashScript);
                    flashResult = b.toolhead ? await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("flash-path.sh", (0,_helpers_board__WEBPACK_IMPORTED_MODULE_19__/* .getBoardSerialPath */ .e)(b.board, b.toolhead)) : await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("board-script.sh", flashScript);
                } catch (e) {
                    const message = e instanceof Error ? e.message : e;
                    throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                        code: "INTERNAL_SERVER_ERROR",
                        message: `Could not flash firmware to ${b.board.name}: \n\n ${flashResult?.stdout ?? message}`,
                        cause: e
                    });
                }
                flashResults.push({
                    board: b.board,
                    result: "success",
                    message: `${b.board.manufacturer} ${b.board.name} was successfully flashed.`
                });
            } catch (e) {
                const message = e instanceof Error ? e.message : e;
                flashResults.push({
                    board: b.board,
                    result: "error",
                    message: typeof message === "string" ? message : `Unknown error occured while flashing ${b.board.manufacturer} ${b.board.name}`
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
        return {
            report,
            flashResults
        };
    }),
    flashViaPath: mcuProcedure.input(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        boardPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
        flashPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
        toolhead: _zods_toolhead__WEBPACK_IMPORTED_MODULE_10__/* .SerializedToolheadConfiguration.optional */ .Qk.optional()
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
        await compileFirmware(ctx.board, ctx.toolhead);
        let flashResult = null;
        try {
            const flashScript = path__WEBPACK_IMPORTED_MODULE_8___default().join(ctx.board.path.replace(`${process.env.RATOS_CONFIGURATION_PATH}/boards/`, ""), ctx.board.flashScript);
            flashResult = input.flashPath ? await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("flash-path.sh", (0,_helpers_board__WEBPACK_IMPORTED_MODULE_19__/* .getBoardSerialPath */ .e)(ctx.board, ctx.toolhead), input.flashPath) : ctx.toolhead ? await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("flash-path.sh", (0,_helpers_board__WEBPACK_IMPORTED_MODULE_19__/* .getBoardSerialPath */ .e)(ctx.board, ctx.toolhead)) : await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("board-script.sh", flashScript);
        } catch (e) {
            const message = e instanceof Error ? e.message : e;
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not flash firmware to ${ctx.board.name}: \n\n ${flashResult?.stdout ?? message}`,
                cause: e
            });
        }
        if (!detect(ctx.board, ctx.toolhead)) {
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
        try {
            await compileFirmware(ctx.board, ctx.toolhead);
        } catch (e) {
            const message = e instanceof Error ? e.message : e;
            throw new _trpc_server__WEBPACK_IMPORTED_MODULE_4__.TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: `Could not compile firmware for ${ctx.board.name}: \n\n ${message}`,
                cause: e
            });
        }
        try {
            const flashResult = await (0,_helpers_run_script__WEBPACK_IMPORTED_MODULE_5__/* .runSudoScript */ .$)("dfu-flash.sh", (0,_helpers_board__WEBPACK_IMPORTED_MODULE_19__/* .getBoardSerialPath */ .e)(ctx.board, ctx.toolhead));
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

/***/ 5662:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "dj": () => (/* binding */ deserializeToolheadConfiguration),
  "VZ": () => (/* binding */ getPrinters),
  "fM": () => (/* binding */ loadSerializedConfig),
  "Cu": () => (/* binding */ printerRouter)
});

// UNUSED EXPORTS: deserializePartialPrinterConfiguration, deserializePartialToolheadConfiguration, deserializePrinterConfiguration, getFilesToWrite, parseDirectory, regenerateKlipperConfiguration

// EXTERNAL MODULE: external "zod"
var external_zod_ = __webpack_require__(8316);
// EXTERNAL MODULE: ./server/helpers/logger.ts
var logger = __webpack_require__(4279);
// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(3837);
// EXTERNAL MODULE: ./server/helpers/metadata.ts
var metadata = __webpack_require__(9993);
// EXTERNAL MODULE: ./zods/hardware.tsx
var hardware = __webpack_require__(2174);
// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(7147);
// EXTERNAL MODULE: ./env/schema.mjs
var schema = __webpack_require__(954);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1017);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);
// EXTERNAL MODULE: ./zods/motion.tsx
var motion = __webpack_require__(6734);
// EXTERNAL MODULE: ./zods/toolhead.tsx
var toolhead = __webpack_require__(2493);
;// CONCATENATED MODULE: ./zods/printer.tsx





let startsWithServerValidation = "";
if (process.env.RATOS_CONFIGURATION_PATH) {
    const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
    startsWithServerValidation = external_path_default().join(environment.RATOS_CONFIGURATION_PATH, "printers");
}
const SpeedLimits = external_zod_.z.object({
    velocity: external_zod_.z.number().min(0).describe("Maximum velocity for this printer"),
    accel: external_zod_.z.number().min(0).describe("Maximum acceleration for this printer"),
    z_velocity: external_zod_.z.number().min(0).describe("Maximum z velocity for this printer"),
    z_accel: external_zod_.z.number().min(0).describe("Maximum z acceleration for this printer"),
    square_corner_velocity: external_zod_.z.number().min(0).default(5).describe("Maximum square corner velocity for this printer"),
    travel_velocity: external_zod_.z.number().min(0).default(200).describe("Maximum travel velocity for this printer"),
    travel_accel: external_zod_.z.number().min(0).default(3000).describe("Maximum travel velocity for this printer")
}).strict();
const PrinterDefinition = external_zod_.z.object({
    id: external_zod_.z.string(),
    name: external_zod_.z.string().describe("The name of the printer"),
    description: external_zod_.z.string().describe("A description of the printer"),
    manufacturer: external_zod_.z.string().describe("The name of the manufacturer of this printer"),
    documentationLink: external_zod_.z.string().describe("Link to the RatOS documentation for this printer"),
    image: external_zod_.z.string().describe("Link to an image of the printer"),
    sizes: external_zod_.z.array(external_zod_.z.number()).describe("Size options for this printer").optional(),
    template: external_zod_.z.string().describe("Printer.cfg template for this printer"),
    path: external_zod_.z.string().startsWith(startsWithServerValidation),
    driverCountRequired: external_zod_.z.number().describe("Number of drivers required for this printer"),
    bedMargin: external_zod_.z.object({
        x: external_zod_.z.tuple([
            external_zod_.z.number().default(0),
            external_zod_.z.number().default(0)
        ]),
        y: external_zod_.z.tuple([
            external_zod_.z.number().default(0),
            external_zod_.z.number().default(0)
        ])
    }).describe("Margin of available movement around the bed for this printer").default({
        x: [
            0,
            0
        ],
        y: [
            0,
            0
        ]
    }),
    speedLimits: external_zod_.z.object({
        basic: SpeedLimits,
        performance: SpeedLimits.optional()
    }).strict().describe("Speed limits for this printer"),
    defaults: external_zod_.z.object({
        toolheads: external_zod_.z.array(toolhead/* SerializedToolheadConfiguration */.Qk).describe("Default toolheads for this printer"),
        board: external_zod_.z.string().describe("Default board for this printer. Should be the name of the board directory."),
        rails: external_zod_.z.array(motion/* SerializedPrinterRailDefinition */.r).describe("Default rails for this printer")
    }).strict().describe("Default hardware for this printer")
}).describe("A RatOS supported 3d printer");
const PrinterDefinitionWithResolvedToolheads = PrinterDefinition.extend({
    defaults: PrinterDefinition.shape.defaults.extend({
        toolheads: external_zod_.z.array(toolhead/* ToolheadConfiguration */.x8)
    }).strict()
});

// EXTERNAL MODULE: ./zods/boards.tsx
var boards = __webpack_require__(1346);
;// CONCATENATED MODULE: ./zods/printer-configuration.tsx






const BasePrinterConfiguration = external_zod_.z.object({
    printer: PrinterDefinition,
    controlboard: boards/* Board */.$l,
    toolheads: external_zod_.z.array(toolhead/* ToolheadConfiguration */.x8).min(1).max(2),
    size: external_zod_.z.number().optional().nullable(),
    controllerFan: hardware/* Fan */.XG,
    performanceMode: external_zod_.z.boolean().default(false),
    stealthchop: external_zod_.z.boolean().default(false),
    standstillStealth: external_zod_.z.boolean().default(false),
    rails: external_zod_.z.array(motion/* PrinterRail */.JQ)
}).strict();
const printer_configuration_PrinterConfiguration = BasePrinterConfiguration.refine((data)=>data.size == null || (data.printer.sizes?.length ?? 0) > 0 && data.size != null, "Printer size must be provided if printer has size options, otherwise it must be omitted").refine((data)=>data.toolheads.map((t)=>t.toolboard).filter(Boolean).length + data.controlboard.driverCount >= data.printer.driverCountRequired, "Your combination of controlboard and toolboards do not have enough stepper drivers for this printer");
const SerializedPrinterConfiguration = BasePrinterConfiguration.extend({
    printer: PrinterDefinition.shape.id,
    controlboard: boards/* Board.shape.id */.$l.shape.id,
    toolheads: external_zod_.z.array(toolhead/* SerializedToolheadConfiguration */.Qk).min(1).max(2),
    controllerFan: hardware/* Fan.shape.id */.XG.shape.id,
    rails: external_zod_.z.array(motion/* SerializedPrinterRail */.Ah)
}).strict();
const PartialPrinterConfiguration = printer_configuration_PrinterConfiguration.innerType().innerType().extend({
    toolheads: external_zod_.z.array(toolhead/* PartialToolheadConfiguration */.b2).min(1).max(2)
}).strict().partial().optional();
const printer_configuration_SerializedPartialPrinterConfiguration = SerializedPrinterConfiguration.extend({
    toolheads: external_zod_.z.array(toolhead/* SerializedPartialToolheadConfiguration */.ZF).min(1).max(2)
}).strict().partial();

;// CONCATENATED MODULE: ./data/endstops.ts

const xEndstopOptions = (config, toolheadConfig)=>{
    const endstops = [];
    if (toolheadConfig?.toolboard != null) {
        endstops.push({
            id: "endstop-toolboard",
            title: "Physical Endstop (toolboard)"
        });
    }
    if (toolheadConfig?.axis === motion/* PrinterAxis.x */.po.x) {
        endstops.push({
            id: "endstop",
            title: "Physical Endstop"
        });
        endstops.push({
            id: "sensorless",
            title: "Sensorless Homing"
        });
    }
    return endstops;
};
const defaultXEndstop = {
    id: "endstop",
    title: "Physical Endstop"
};
const yEndstopOptions = (config, toolheadConfig)=>[
        {
            id: "endstop",
            title: "Physical Endstop"
        },
        {
            id: "sensorless",
            title: "Sensorless Homing"
        }
    ];

;// CONCATENATED MODULE: ./templates/extras/sensorless-homing.ts

const sensorlessXTemplate = (config, utils)=>`
# Sensorless homing.
#
# Tune the sensorless_x_current variable and the SGTHRS/SGT value in this file untill you get reliable homing.
# Beware of false instant triggering which can make it look like the homing procedure is skipping an axis, when in fact it's not.
# This is especially true for the Y axis on CoreXY machines.
#
# Read the klipper documentation for more info: https://www.klipper3d.org/TMC_Drivers.html#sensorless-homing
#
# Note: if your board has diag jumpers, you would need to insert them for the specific drivers you want to use for sensorless homing on.
# Note: Sensorless homing does NOT work if you drivers have a missing DIAG pins.    
# Check https://www.klipper3d.org/TMC_Drivers.html#sensorless-homing for tuning instructions.

[${utils.getAxisDriverSectionName(motion/* PrinterAxis.x */.po.x)}]
${utils.getAxisDriverDiagConfig(motion/* PrinterAxis.x */.po.x)}
${utils.getAxisDriverStallGuardThreshold(motion/* PrinterAxis.x */.po.x, 0.5)}

[${utils.getAxisStepperName(motion/* PrinterAxis.x */.po.x)}]
endstop_pin: ${utils.getAxisVirtualEndstop(motion/* PrinterAxis.x */.po.x)}
position_min: 0
position_endstop: 0
homing_retract_dist: 0

[gcode_macro RatOS]
variable_homing_x: "sensorless"
variable_sensorless_x_current: ${utils.getAxisDriverHomingCurrent(motion/* PrinterAxis.x */.po.x, 0.35)}
${utils.getAxisDriverVariables(motion/* PrinterAxis.x */.po.x, config.printer.id === "caramba-hybrid" ? false : true)}
`;
const sensorlessYTemplate = (config, utils)=>`
# Sensorless homing.
#
# Tune the current variable and the SGTHRS value in the included file(s) untill you get reliable homing.
# Beware of false instant triggering which can make it look like the homing procedure is skipping an axis, when in fact it's not.
# This is especially true for the Y axis on CoreXY machines.
#
# Read the klipper documentation for more info: https://www.klipper3d.org/TMC_Drivers.html#sensorless-homing
#
# Note: if your board has diag jumpers, you would need to insert them for the specific drivers you want to use for sensorless homing on.
# Note: Sensorless homing does NOT work if you drivers have a missing DIAG pins.
# Check https://www.klipper3d.org/TMC_Drivers.html#sensorless-homing for tuning instructions.

[${utils.getAxisDriverSectionName(motion/* PrinterAxis.y */.po.y)}]
${utils.getAxisDriverDiagConfig(motion/* PrinterAxis.y */.po.y)}
${utils.getAxisDriverStallGuardThreshold(motion/* PrinterAxis.y */.po.y, 0.5)}

[stepper_y]
endstop_pin: ${utils.getAxisVirtualEndstop(motion/* PrinterAxis.y */.po.y)}
position_min: 0
position_endstop: 0
homing_retract_dist: 0

[gcode_macro RatOS]
variable_homing_y: "sensorless"
variable_sensorless_y_current: ${utils.getAxisDriverHomingCurrent(motion/* PrinterAxis.y */.po.y, 0.51)}
${utils.getAxisDriverVariables(motion/* PrinterAxis.y */.po.y, true, config.printer.id === "caramba-hybrid" ? [
        motion/* PrinterAxis.x1 */.po.x1
    ] : [])}
`;

// EXTERNAL MODULE: ./data/steppers.ts
var steppers = __webpack_require__(8441);
// EXTERNAL MODULE: ./utils/serialization.ts + 1 modules
var serialization = __webpack_require__(3977);
// EXTERNAL MODULE: ./helpers/toolhead.ts
var helpers_toolhead = __webpack_require__(4204);
// EXTERNAL MODULE: ./helpers/board.ts
var board = __webpack_require__(3806);
;// CONCATENATED MODULE: ./server/helpers/config-generation/toolhead.ts




class ToolheadGenerator extends helpers_toolhead/* ToolheadHelper */.D {
    static async fromConfig(config, controlPins) {
        const toolboardPins = config.toolboard ? await (0,metadata/* parseBoardPinConfig */.Qk)(config.toolboard) : null;
        return new ToolheadGenerator(config, toolboardPins, controlPins);
    }
    constructor(toolhead, toolboardPins, controlboardPins){
        super(toolhead);
        this.toolboardPins = toolboardPins;
        this.controlboardPins = controlboardPins;
    }
    requireControlboardPin(pin) {
        if (this.controlboardPins?.[pin] == null) {
            throw new Error(`Toolhead ${this.getTool()} is configured to use the controlboard for ${pin}, but the controlboard does not define a pin with that name.`);
        }
    }
    requireToolboardPin(pin) {
        if (this.toolboardPins?.[pin] == null) {
            throw new Error(`Toolhead ${this.getTool()} is configured to use the toolboard for ${pin}, but the toolboard does not define a pin with that name.`);
        }
    }
    getExtruderToolAxisPinPrefix() {
        if (this.getTool() === 0) {
            return "";
        }
        return this.getTool();
    }
    getToolheadPin(axis, alias) {
        const prefix = axis === this.getExtruderAxis() ? this.getPinPrefix() : "";
        const axisAlias = axis === motion/* PrinterAxis.z */.po.z ? "z0" : axis !== this.getExtruderAxis() ? axis : this.getToolboard() != null ? "e" : "e" + this.getExtruderToolAxisPinPrefix();
        const pinName = axisAlias + alias;
        let pinValue = null;
        try {
            pinValue = this.getPinFromAlias(pinName);
        } catch (e) {
            pinValue = null;
        }
        if (pinValue == null) {
            throw new Error(`Pin name "${pinName}" constructed from axis "${axis}" and alias "${alias}" not found on toolhead ${this.getToolCommand()} with extruder axis ${this.getExtruderAxis()}. Resolved axis alias ${axisAlias}. Searched in ${this.getToolboard() ? "toolboard" : "controlboard"}`);
        }
        return prefix + pinValue;
    }
    getPinFromAlias(alias) {
        let pin = null;
        if (this.getToolboard()) {
            if (this.toolboardPins?.[alias] != null) {
                pin = this.toolboardPins[alias];
            } else {
                throw new Error(`Alias "${alias}" not found in toolboard pin definition.`);
            }
        } else if (this.controlboardPins?.[alias] != null) {
            pin = this.controlboardPins[alias];
        }
        if (pin != null) {
            return pin;
        }
        throw new Error(`Unknown pin alias ${alias}`);
    }
    getXEndstopPin() {
        let pin;
        switch(this.getXEndstop().id){
            case "endstop":
                if (this.controlboardPins?.x_endstop_pin == null) {
                    throw new Error(`Toolhead ${this.getTool()} is configured to use the controlboard for the x endstop, but the controlboard has no x_endstop_pin`);
                }
                pin = this.controlboardPins.x_endstop_pin;
                break;
            case "endstop-toolboard":
                if (this.toolboardPins?.x_endstop_pin == null) {
                    throw new Error(`Toolhead ${this.getTool()} is configured to use a toolboard for the x endstop, but the toolboard has no x_endstop_pin`);
                }
                pin = this.getPinPrefix() + this.toolboardPins.x_endstop_pin;
                break;
            default:
                throw new Error(`Unknown endstop type ${this.getXEndstop().id}`);
        }
        return pin;
    }
    getYEndstopPin() {
        let pin;
        switch(this.getYEndstop().id){
            case "endstop":
                if (this.controlboardPins?.y_endstop_pin == null) {
                    throw new Error(`Toolhead ${this.getTool()} is configured to use the controlboard for the x endstop, but the controlboard has no y_endstop_pin`);
                }
                pin = this.controlboardPins.y_endstop_pin;
                break;
            case "endstop-toolboard":
                if (this.toolboardPins?.y_endstop_pin == null) {
                    throw new Error(`Toolhead ${this.getTool()} is configured to use a toolboard for the x endstop, but the toolboard has no y_endstop_pin`);
                }
                pin = this.getPinPrefix() + this.toolboardPins.y_endstop_pin;
                break;
            default:
                throw new Error(`Unknown endstop type ${this.getXEndstop().id}`);
        }
        return pin;
    }
    getPinPrefix() {
        if (this.config.toolboard) {
            return `${this.getToolboardName()}:`;
        } else {
            return ""; // use controlboard
        }
    }
    renderToolboard() {
        const pins = this.toolboardPins;
        const toolboard = this.config.toolboard;
        if (toolboard == null || pins == null) {
            return "";
        }
        const result = [
            "",
            (0,metadata/* exportBoardPinAlias */._s)(this.getToolboardName(), pins, this.getToolboardName()),
            "",
            `[mcu ${this.getToolboardName()}]`,
            `serial: ${(0,board/* getBoardSerialPath */.e)(toolboard, this)}`
        ];
        if (toolboard.hasMcuTempSensor) {
            result.push(""); // Add a newline for readability.
            result.push(`[temperature_sensor ${toolboard.name.replace(/\s/g, "_")}_${this.getToolCommand()}]`);
            result.push(`sensor_type: temperature_mcu`);
            result.push(`sensor_mcu: ${this.getToolboardName()}`);
        }
        if (toolboard.ADXL345SPI != null) {
            result.push(""); // Add a newline for readability.
            result.push(`[adxl345 ${this.getToolboardName()}]`);
            result.push(`cs_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.cs_pin}`);
            if ("hardware" in toolboard.ADXL345SPI) {
                result.push(`spi_bus: ${toolboard.ADXL345SPI.hardware.bus}`);
            } else {
                result.push(`spi_software_mosi_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.software.mosi}`);
                result.push(`spi_software_miso_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.software.miso}`);
                result.push(`spi_software_sclk_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.software.sclk}`);
            }
        }
        if (toolboard.outputPins != null) {
            toolboard.outputPins.forEach((pindef)=>{
                result.push(""); // Add a newline for readability.
                result.push(`[output_pin ${pindef.name}]`);
                result.push(`pin: ${this.getPinPrefix()}${pindef.pin}`);
                result.push(`value: ${pindef.value}`);
            });
        }
        return result.join("\n");
    }
    renderHotend() {
        // Todo parse modify and output hotend config
        let result = [];
        let hotend = (0,metadata/* readInclude */.up)(`hotends/${this.getHotend().id}.cfg`);
        hotend = (0,metadata/* stripCommentLines */.rc)(hotend);
        hotend = (0,metadata/* stripIncludes */.AU)(hotend);
        hotend = (0,metadata/* replaceLinesStartingWith */.ND)(hotend, "[extruder]", `[${this.getExtruderAxis()}]`);
        hotend = (0,metadata/* replaceLinesStartingWith */.ND)(hotend, "heater_pin", `heater_pin: ${this.getToolheadPin(this.getExtruderAxis(), "_heater_pin")}`);
        hotend = (0,metadata/* replaceLinesStartingWith */.ND)(hotend, "sensor_pin", `sensor_pin: ${this.getToolheadPin(this.getExtruderAxis(), "_sensor_pin")}`);
        if (this.getThermistor() === "PT1000" && this.getToolboard()?.alternativePT1000Resistor != null) {
            if (hotend.split("\n").some((line)=>line.trim().startsWith("pullup_resistor"))) {
                hotend = (0,metadata/* replaceLinesStartingWith */.ND)(hotend, "pullup_resistor", `pullup_resistor: ${this.getToolboard()?.alternativePT1000Resistor}`);
            } else {
                hotend = (0,metadata/* replaceLinesStartingWith */.ND)(hotend, "sensor_type", `sensor_type: ${this.getThermistor()}\npullup_resistor: ${this.getToolboard()?.alternativePT1000Resistor}`);
            }
        } else {
            hotend = (0,metadata/* replaceLinesStartingWith */.ND)(hotend, "sensor_type", `sensor_type: ${this.getThermistor()}`);
        }
        result.push(`# ${this.getToolCommand()} ${this.getHotend().title} definition (from RatOS/hotends/${this.getHotend().id}.cfg)`);
        result.push(hotend.trim());
        return result.join("\n");
    }
    renderExtruder() {
        let result = [];
        // Get rid of the stepper/driver includes in the extruder config and paste it inline (backwards compatibility with 2.0).
        result.push(`# ${this.getToolCommand()} ${this.getExtruder().title} definition (from RatOS/extruders/${this.getExtruder().id}.cfg)`);
        let extruder = (0,metadata/* stripCommentLines */.rc)((0,metadata/* stripIncludes */.AU)((0,metadata/* stripDriverSections */.sV)((0,metadata/* readInclude */.up)(`extruders/${this.getExtruder().id}.cfg`))));
        extruder = (0,metadata/* replaceLinesStartingWith */.ND)(extruder, "[extruder]", `[${this.getExtruderAxis()}]`);
        result.push(extruder.trim());
        return result.join("\n");
    }
    renderPartFan(multipleToolheadPartFans = false) {
        let result = [];
        if (multipleToolheadPartFans) {
            const fanName = `part_fan_${this.getShortToolName()}`;
            result.push(`[fan_generic ${fanName}]`);
        } else {
            result.push(`[fan]`);
        }
        switch(this.getPartFan().id){
            case "2pin":
                this.requireControlboardPin("fan_part_cooling_pin");
                result.push(`# 2-pin fan connected to the controller board`);
                result.push(`pin: ${this.controlboardPins?.fan_part_cooling_pin}`);
                break;
            case "4pin":
                this.requireControlboardPin("fan_part_cooling_pin");
                result.push(`# 4-pin fan connected to the controller board`);
                result.push(`pin: !${this.controlboardPins?.fan_part_cooling_pin}`);
                result.push(`cycle_time:  0.00004`);
                break;
            case "4pin-dedicated":
                this.requireControlboardPin("4p_fan_part_cooling_pin");
                result.push(`# 4-pin fan connected to a dedicated 4-pin fan header on the controller board`);
                result.push(`pin: !${this.controlboardPins?.["4p_fan_part_cooling_pin"]}`);
                result.push(`cycle_time:  0.00004`);
                if (this.controlboardPins?.["4p_fan_part_cooling_tach_pin"] != null) {
                    result.push(`tachometer_pin: ${this.controlboardPins?.["4p_fan_part_cooling_tach_pin"]}`);
                    result.push(`tachometer_poll_interval: 0.0005`);
                }
                break;
            case "2pin-toolboard":
                this.requireToolboardPin("fan_part_cooling_pin");
                result.push(`# 2-pin fan connected to the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
                result.push(`pin: ${this.getPinPrefix()}${this.toolboardPins?.fan_part_cooling_pin}`);
                break;
            case "4pin-toolboard":
                this.requireToolboardPin("fan_part_cooling_pin");
                result.push(`# 4-pin fan connected to the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
                result.push(`pin: !${this.getPinPrefix()}${this.toolboardPins?.fan_part_cooling_pin}`);
                result.push(`cycle_time:  0.00004`);
                break;
            case "4pin-dedicated-toolboard":
                this.requireToolboardPin("4p_fan_part_cooling_tach_pin");
                result.push(`# 4-pin fan connected to a dedicated 4-pin fan header on the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
                result.push(`pin: !${this.getPinPrefix()}${this.toolboardPins?.["4p_fan_part_cooling_tach_pin"]}`);
                result.push(`cycle_time:  0.00004`);
                if (this.toolboardPins?.["4p_fan_part_cooling_tach_pin"] != null) {
                    result.push(`tachometer_pin: ${this.toolboardPins?.["4p_fan_part_cooling_tach_pin"]}`);
                    result.push(`tachometer_poll_interval: 0.0005`);
                }
                break;
            default:
                throw new Error(`Unsupported part cooling fan option "${this.getHotendFan().title}"`);
        }
        return result.join("\n");
    }
    renderHotendFan() {
        let result = [];
        result.push(`[heater_fan toolhead_cooling_fan${this.getTool() > 0 ? `_${this.getShortToolName()}` : ""}]`);
        switch(this.getHotendFan().id){
            case "2pin":
                this.requireControlboardPin("fan_toolhead_cooling_pin");
                result.push(`# 2-pin fan connected to the controller board`);
                result.push(`pin: ${this.controlboardPins?.fan_toolhead_cooling_pin}`);
                break;
            case "4pin":
                this.requireControlboardPin("fan_toolhead_cooling_pin");
                result.push(`# 4-pin fan connected to the controller board`);
                result.push(`pin: !${this.controlboardPins?.fan_toolhead_cooling_pin}`);
                result.push(`cycle_time:  0.00004`);
                break;
            case "4pin-dedicated":
                this.requireControlboardPin("4p_fan_part_cooling_tach_pin");
                result.push(`# 4-pin fan connected to a dedicated 4-pin fan header on the controller board`);
                result.push(`pin: !${this.controlboardPins?.["4p_fan_part_cooling_tach_pin"]}`);
                result.push(`cycle_time:  0.00004`);
                if (this.controlboardPins?.["4p_fan_part_cooling_tach_pin"] != null) {
                    result.push(`tachometer_pin: ^${this.controlboardPins?.["4p_fan_part_cooling_tach_pin"]}`);
                    result.push(`tachometer_poll_interval: 0.0005`);
                }
                break;
            case "2pin-toolboard":
                this.requireToolboardPin("fan_toolhead_cooling_pin");
                result.push(`# 2-pin fan connected to the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
                result.push(`pin: ${this.getPinPrefix()}${this.toolboardPins?.fan_toolhead_cooling_pin}`);
                break;
            case "4pin-toolboard":
                this.requireToolboardPin("fan_toolhead_cooling_pin");
                result.push(`# 4-pin fan connected to the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
                result.push(`pin: !${this.getPinPrefix()}${this.toolboardPins?.fan_toolhead_cooling_pin}`);
                result.push(`cycle_time:  0.00004`);
                break;
            case "4pin-dedicated-toolboard":
                this.requireToolboardPin("4p_toolhead_cooling_pin");
                result.push(`# 4-pin fan connected to a dedicated 4-pin fan header on the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
                result.push(`pin: !${this.getPinPrefix()}${this.toolboardPins?.["4p_toolhead_cooling_pin"]}`);
                result.push(`cycle_time:  0.00004`);
                if (this.toolboardPins?.["4p_toolhead_cooling_tach_pin"] != null) {
                    result.push(`tachometer_pin: ^${this.toolboardPins?.["4p_toolhead_cooling_tach_pin"]}`);
                    result.push(`tachometer_poll_interval: 0.0005`);
                }
                break;
            default:
                throw new Error(`Unsupported hotend fan option "${this.getHotendFan().title}"`);
        }
        return result.join("\n");
    }
}

;// CONCATENATED MODULE: ./server/helpers/klipper-config.ts








const constructKlipperConfigUtils = async (config)=>{
    const toolboardDriverCount = config.toolheads.reduce((prev, current)=>prev + (current.toolboard?.driverCount ?? 0), 0);
    const extruderLessConfigBonus = config.controlboard.extruderlessConfig != null ? 1 : 0;
    const isExtruderlessBoard = config.printer.driverCountRequired > config.controlboard.driverCount;
    const cbPins = await (0,metadata/* parseBoardPinConfig */.Qk)(config.controlboard, isExtruderlessBoard);
    const toolheads = await Promise.all(config.toolheads.map(async (thConfig)=>{
        if (thConfig.toolboard == null) {
            if (isExtruderlessBoard) {
                throw new Error("A toolboard is required when using an extruderless controlboard configuration (your controlboard alone does not have enough drivers for this printer). Please add a toolboard to your configuration.");
            }
            return await ToolheadGenerator.fromConfig(thConfig, cbPins);
        }
        return await ToolheadGenerator.fromConfig(thConfig, cbPins);
    }));
    return {
        extruderLessConfigBonus,
        isExtruderlessBoard,
        toolboardDriverCount,
        getControlboardPins: ()=>{
            return {
                ...cbPins
            };
        },
        requireControlboardPin (pin) {
            if (this.getControlboardPins()[pin] == null) {
                throw new Error(`The controlboard has no "${pin}" defined in its config.`);
            }
        },
        isExtruderToolheadAxis (axis) {
            return toolheads.some((th)=>th.getExtruderAxis() === axis);
        },
        getToolhead: (toolOrAxis)=>{
            const th = typeof toolOrAxis === "number" ? toolheads.find((th)=>th.getTool() === toolOrAxis) : toolheads.find((th)=>th.getExtruderAxis() === toolOrAxis || th.getMotionAxis() === toolOrAxis);
            if (th == null) {
                throw new Error(`No toolhead found for tool/axis ${toolOrAxis}`);
            }
            return th;
        },
        renderCommentHeader (text, lines) {
            const separator = `------------------------------------------------------------------------------------------------------------`;
            const textPadding = (separator.length - text.length - 2) / 2;
            const separatorWithText = `#${"-".repeat(Math.floor(textPadding))} ${text} ${"-".repeat(Math.ceil(textPadding))}`;
            return [
                separatorWithText,
                ...lines,
                `#${separator}`
            ];
        },
        getToolheads: ()=>{
            return toolheads.slice();
        },
        getRail (axis) {
            const rail = config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            return rail;
        },
        getAxisPin (axis, alias) {
            const pinName = (axis === motion/* PrinterAxis.z */.po.z ? "z0" : axis) + alias;
            let pinValue = null;
            if (this.isExtruderToolheadAxis(axis)) {
                pinValue = this.getToolhead(axis).getToolheadPin(axis, alias);
            } else {
                const rail = this.getRail(axis);
                const slotPin = alias.startsWith("_") ? alias.substring(1) : alias;
                if (config.controlboard.motorSlots != null && rail.motorSlot != null && slotPin in config.controlboard.motorSlots[rail.motorSlot]) {
                    pinValue = config.controlboard.motorSlots[rail.motorSlot][slotPin];
                    if (pinValue == null) {
                        throw new Error(`Motor slot was selected, but pin ${slotPin} wasn't found in motor slot config.`);
                    }
                } else {
                    pinValue = cbPins[pinName];
                }
            }
            if (pinValue == null) {
                throw new Error(`Pin name "${pinName}" constructed from axis "${axis}" and alias "${alias}" not found in board pin configs.`);
            }
            return pinValue;
        },
        getAxisStepperName (axis) {
            if (axis === motion/* PrinterAxis.extruder */.po.extruder) {
                return "extruder";
            }
            if (axis === motion/* PrinterAxis.extruder1 */.po.extruder1) {
                return "extruder1";
            }
            if (axis === motion/* PrinterAxis.dual_carriage */.po.dual_carriage) {
                return "dual_carriage";
            }
            return "stepper" + "_" + axis;
        },
        getAxisDriverType (axis) {
            return this.getRail(axis).driver.type.toLowerCase();
        },
        getAxisDriverVariables (axis, enumerate = false, additionalAxes = []) {
            const rails = config.rails.filter((r)=>(enumerate ? r.axis.startsWith(axis) : r.axis === axis) || additionalAxes.includes(r.axis));
            const variables = [];
            variables.push(`variable_${axis}_driver_types: [${rails.map((r)=>`"${r.driver.type.toLowerCase()}"`).join(", ")}]`);
            variables.push(`variable_${axis}_axes: [${rails.map((r)=>`"${r.axis}"`).join(", ")}]`);
            return variables.join("\n");
        },
        getAxisDriverSectionName (axis) {
            return `${this.getAxisDriverType(axis)} ${this.getAxisStepperName(axis)}`;
        },
        getAxisVirtualEndstop (axis) {
            return `${this.getAxisDriverType(axis)}_${this.getAxisStepperName(axis)}:virtual_endstop`;
        },
        getAxisDriverStallGuardThreshold (axis, factor) {
            const rail = this.getRail(axis);
            factor = Math.max(0, Math.min(1, factor));
            if ([
                "TMC2130",
                "TMC5160",
                "TMC2240"
            ].includes(rail.driver.type)) {
                return `driver_SGT: ${Math.round(factor * 127) - 64}`;
            } else {
                return `driver_SGTHRS: ${Math.round(factor * 255)}`;
            }
        },
        getAxisDriverDiagConfig (axis) {
            if (this.getRail(axis).driver.protocol === "UART") {
                return `diag_pin: ^${this.getAxisPin(axis, "_diag_pin")}`;
            }
            if (this.getRail(axis).driver.protocol === "SPI") {
                return `diag1_pin: ^${this.getAxisPin(axis, "_diag_pin")}`;
            }
            return "";
        },
        getAxisDriverHomingCurrent (axis, factor) {
            const rail = this.getRail(axis);
            factor = Math.max(0, Math.min(1, factor));
            return rail.stepper.maxPeakCurrent * 0.71 * factor;
        },
        getExtruderPinPrefix (tool = 0) {
            const th = this.getToolhead(tool);
            if (th == null) {
                throw new Error(`No toolhead found for tool ${tool}`);
            }
            return th.getPinPrefix();
        },
        formatInlineComments (lines, commentChar = "#") {
            const longestLine = lines.reduce((prev, current)=>Math.max(prev, current.substring(0, current.indexOf(commentChar)).trim().length), 0);
            return lines.map((l)=>{
                let commentIndex = l.indexOf(commentChar);
                const lastCommentIndex = l.lastIndexOf(commentChar);
                if ((commentIndex === -1 || l.trim().startsWith(commentChar)) && lastCommentIndex === commentIndex) {
                    // No comment or comment is only at the start of the line, no need to format.
                    return l;
                }
                if (commentIndex !== lastCommentIndex) {
                    commentIndex = l.indexOf(commentChar, commentIndex + 1);
                }
                const comment = l.substring(commentIndex);
                const line = l.substring(0, commentIndex).trim();
                const padding = longestLine - line.length;
                return line + " ".repeat(padding) + " " + comment;
            });
        }
    };
};
const constructKlipperConfigExtrasGenerator = (config, utils)=>{
    const _filesToWrite = [];
    const _reminders = [];
    return {
        getFilesToWrite () {
            return _filesToWrite.slice();
        },
        addFileToRender (fileToRender) {
            _filesToWrite.push(fileToRender);
        },
        getReminders () {
            return _reminders.slice();
        },
        generateSensorlessHomingIncludes () {
            const filesToWrite = [];
            if (utils.getToolhead(motion/* PrinterAxis.x */.po.x).getXEndstop().id === "sensorless") {
                filesToWrite.push({
                    fileName: "sensorless-homing-x.cfg",
                    content: sensorlessXTemplate(config, utils),
                    overwrite: false
                });
            }
            if (utils.getToolheads().some((th)=>th.getYEndstop().id === "sensorless")) {
                filesToWrite.push({
                    fileName: "sensorless-homing-y.cfg",
                    content: sensorlessYTemplate(config, utils),
                    overwrite: false
                });
            }
            if (filesToWrite.length > 0) {
                const reminder = [];
                reminder.push("# REMEMBER TO TUNE SENSORLESS HOMING BEFORE ATTEMPTING TO PRINT!");
                reminder.push(`# You'll find instructions in the generated sensorless-homing-*.cfg file(s),`, `# where you should keep your sensorless homing settings.`);
                this.addReminder(reminder.join("\n"));
            }
            return filesToWrite.map((f)=>{
                this.addFileToRender(f);
                return `[include ${f.fileName}]`;
            }).join("\n");
        },
        addReminder (reminder) {
            _reminders.push(reminder);
        }
    };
};
/**
 * Constructs a printer agnostic helper object for generating klipper config files.
 * @param config the printer configuration to generate helpers for
 * @param extrasGenerator an extras generator for handling non-explicit template functionality
 * @returns
 */ const constructKlipperConfigHelpers = async (config, extrasGenerator, utils)=>{
    return {
        ...utils,
        renderToolboards () {
            return utils.getToolheads().map((th)=>{
                return th.renderToolboard();
            }).join("\n");
        },
        renderControlboard () {
            const result = [
                "",
                (0,metadata/* exportBoardPinAlias */._s)(config.controlboard.id, utils.getControlboardPins()),
                "",
                `[mcu]`,
                `serial: ${(0,board/* getBoardSerialPath */.e)(config.controlboard)}`
            ];
            if (config.controlboard.hasMcuTempSensor) {
                result.push(""); // Add a newline for readability.
                result.push(`[temperature_sensor ${config.controlboard.name.replace(/\s/g, "_")}]`);
                result.push(`sensor_type: temperature_mcu`);
            }
            if (config.controlboard.ADXL345SPI != null) {
                result.push(""); // Add a newline for readability.
                result.push(`[adxl345 controlboard]`);
                result.push(`cs_pin: ${config.controlboard.ADXL345SPI.cs_pin}`);
                if ("hardware" in config.controlboard.ADXL345SPI) {
                    result.push(`spi_bus: ${config.controlboard.ADXL345SPI.hardware.bus}`);
                } else {
                    result.push(`spi_software_mosi_pin: ${config.controlboard.ADXL345SPI.software.mosi}`);
                    result.push(`spi_software_miso_pin: ${config.controlboard.ADXL345SPI.software.miso}`);
                    result.push(`spi_software_sclk_pin: ${config.controlboard.ADXL345SPI.software.sclk}`);
                }
            }
            if (config.controlboard.outputPins != null) {
                config.controlboard.outputPins.forEach((pindef)=>{
                    result.push(""); // Add a newline for readability.
                    result.push(`[output_pin ${pindef.name}]`);
                    result.push(`pin: ${pindef.pin}`);
                    result.push(`value: ${pindef.value}`);
                });
            }
            return result.join("\n");
        },
        renderBoards () {
            if (config.printer.driverCountRequired > config.controlboard.driverCount) {
                if (config.controlboard.driverCount + utils.toolboardDriverCount + utils.extruderLessConfigBonus < config.printer.driverCountRequired) {
                    throw new Error("Your control and toolboard combination does not make up enough drivers for this printer.");
                }
            }
            const result = [
                "[include RatOS/boards/rpi/config.cfg]",
                this.renderControlboard(),
                this.renderToolboards()
            ];
            return result.join("\n");
        },
        renderStepperSections () {
            return config.rails.map((r)=>{
                return this.renderStepperSection(r);
            }).join("\n");
        },
        getMotorComments (axis) {
            const rail = typeof axis === "object" ? axis : config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            const section = [
                `# ${rail.axisDescription}`
            ];
            if (rail.motorSlot && config.controlboard.motorSlots) {
                section.push(`# Connected to ${config.controlboard.motorSlots[rail.motorSlot].title} on ${config.controlboard.name}`);
            } else if (this.isExtruderToolheadAxis(rail.axis)) {
                const toolhead = utils.getToolhead(rail.axis);
                if (toolhead == null) {
                    throw new Error(`No toolhead found for ${rail.axis}`);
                }
                section.push(`# Connected to ${(toolhead.getToolboard() || config.controlboard).name}`);
            }
            return utils.renderCommentHeader(rail.axis.toUpperCase(), section);
        },
        renderMotorSections () {
            const sections = config.rails.map((r)=>{
                return this.getMotorComments(r).join("\n") + "\n" + this.renderDriverSection(r, true) + "\n" + this.renderStepperSection(r, true);
            });
            sections.push(this.renderBoardQuirks());
            return sections.join("\n");
        },
        renderStepperSection (axis, noHeader = false) {
            const rail = typeof axis === "object" ? axis : config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            const section = noHeader ? [] : this.getMotorComments(rail);
            section.push(`[${utils.getAxisStepperName(rail.axis)}]`, `step_pin: ${utils.getAxisPin(rail.axis, "_step_pin")}`, `dir_pin: ${utils.getAxisPin(rail.axis, "_dir_pin")}`, `enable_pin: !${utils.getAxisPin(rail.axis, "_enable_pin")}`, `microsteps: ${rail.microstepping}`);
            if (rail.axis === motion/* PrinterAxis.extruder */.po.extruder || rail.axis === motion/* PrinterAxis.extruder1 */.po.extruder1) {
                const toolhead = utils.getToolhead(rail.axis);
                if (toolhead == null) {
                    throw new Error(`No toolhead found for ${rail.axis}`);
                }
                section.push(`rotation_distance: ${(0,metadata/* getExtruderRotationDistance */.NH)(toolhead.getExtruder().id)}`);
            } else {
                section.push(`rotation_distance: ${rail.rotationDistance}`);
            }
            if (rail.axis === motion/* PrinterAxis.z */.po.z) {
                // Lower position_min to allow for probe calibration (and componensation functions). 
                // Very much dislike that this is necessary.
                section.push(`position_min: -5`);
            }
            if ([
                motion/* PrinterAxis.x */.po.x,
                motion/* PrinterAxis.y */.po.y,
                motion/* PrinterAxis.z */.po.z
            ].includes(rail.axis)) {
                section.push(`homing_speed: ${rail.homingSpeed}`);
            }
            if (rail.gearRatio != null) {
                section.push(`gear_ratio: ${rail.gearRatio}`);
            }
            if (rail.axis === motion/* PrinterAxis.z */.po.z) {
                const probeToolhead = config.toolheads.find((th)=>th.probe != null);
                if (probeToolhead?.probe != null) {
                    section.push(`endstop_pin: probe:z_virtual_endstop`);
                }
            }
            return section.join("\n") + "\n";
        },
        renderUserStepperSections (customization) {
            return this.formatInlineComments(config.rails.map((r)=>{
                const { directionInverted , rotationComment , additionalLines  } = customization[r.axis] ?? {};
                return this.renderUserStepperSection(r.axis, directionInverted, rotationComment, additionalLines);
            }).join("\n").split("\n")).join("\n");
        },
        renderUserStepperSection (axis, directionInverted = false, rotationComment, additionalLines) {
            const rail = typeof axis === "object" ? axis : config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            const dirComment = directionInverted ? `# Remove ! in front of pin name to reverse the direction of ${utils.getAxisStepperName(rail.axis)}` : `# Add ! in front of pin name to reverse the direction of ${utils.getAxisStepperName(rail.axis)}`;
            const section = this.getMotorComments(rail).concat([
                `[${utils.getAxisStepperName(rail.axis)}]`,
                `dir_pin: ${directionInverted ? "!" : ""}${utils.getAxisPin(rail.axis, "_dir_pin")} ${dirComment}`
            ]);
            if (rail.axis === motion/* PrinterAxis.extruder */.po.extruder || rail.axis === motion/* PrinterAxis.extruder1 */.po.extruder1) {
                const toolhead = utils.getToolhead(rail.axis);
                if (toolhead == null) {
                    throw new Error(`No toolhead found for ${rail.axis}`);
                }
                section.push(`rotation_distance: ${(0,metadata/* getExtruderRotationDistance */.NH)(toolhead.getExtruder().id)} # ${toolhead.getExtruder().title} default`);
            } else {
                section.push(`rotation_distance: ${rail.rotationDistance} ${rotationComment ? `# ${rotationComment}` : ""}`);
            }
            if ([
                motion/* PrinterAxis.x */.po.x,
                motion/* PrinterAxis.y */.po.y,
                motion/* PrinterAxis.z */.po.z
            ].includes(rail.axis)) {
                section.push(`homing_speed: ${rail.homingSpeed}`);
            }
            if (additionalLines != null) {
                section.push(...additionalLines);
            }
            return section.join("\n") + "\n";
        },
        renderDriverSections () {
            const sections = config.rails.map((r)=>{
                return this.renderDriverSection(r);
            });
            sections.push(this.renderBoardQuirks());
            return sections.join("\n");
        },
        renderDriverSection (axis, noHeader = false) {
            const rail = typeof axis === "object" ? axis : config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            const preset = (0,steppers/* findPreset */.a)(rail.stepper, rail.driver, rail.voltage, rail.current);
            const section = noHeader ? [] : this.getMotorComments(rail);
            section.push(`[${utils.getAxisDriverSectionName(rail.axis)}]`, `stealthchop_threshold: ${config.stealthchop ? "9999999" : config.standstillStealth ? "1" : "0"}`, `interpolate: ${rail.microstepping < 64 || config.stealthchop ? "True" : "False"}`);
            if (rail.driver.protocol === "UART") {
                // Render optional motor slot pins
                if (rail.motorSlot) {
                    const slotPins = config.controlboard.motorSlots?.[rail.motorSlot];
                    if (slotPins == null || !(0,boards/* hasUART */.uh)(config.controlboard.motorSlots?.[rail.motorSlot])) {
                        throw new Error(`No controlboard motor slot UART pins defined for motor slot ${rail.motorSlot}`);
                    }
                    Object.entries(boards/* UARTPins.parse */.X2.parse(slotPins)).forEach(([key, pin])=>{
                        section.push(`${key}: ${pin}`);
                    });
                } else {
                    section.push(`uart_pin: ${utils.getAxisPin(rail.axis, "_uart_pin")}`);
                }
            }
            if (rail.driver.protocol === "SPI") {
                if (rail.motorSlot) {
                    const slotPins = config.controlboard.motorSlots?.[rail.motorSlot];
                    if (slotPins == null || !(0,boards/* hasSPI */._u)(config.controlboard.motorSlots?.[rail.motorSlot])) {
                        throw new Error(`No controlboard motor slot SPI pins defined for motor slot ${rail.motorSlot}`);
                    }
                    Object.entries(boards/* SPIPins.parse */.WX.parse(slotPins)).forEach(([key, pin])=>{
                        section.push(`${key}: ${pin}`);
                    });
                } else {
                    section.push(`cs_pin: ${utils.getAxisPin(rail.axis, "_uart_pin")}`);
                    if (config.controlboard.stepperSPI != null) {
                        if ("hardware" in config.controlboard.stepperSPI) {
                            section.push(`spi_bus: ${config.controlboard.stepperSPI.hardware.bus}`);
                        } else {
                            section.push(`spi_software_mosi_pin: ${config.controlboard.stepperSPI.software.mosi}`);
                            section.push(`spi_software_miso_pin: ${config.controlboard.stepperSPI.software.miso}`);
                            section.push(`spi_software_sclk_pin: ${config.controlboard.stepperSPI.software.sclk}`);
                        }
                    } else {
                        section.push(`spi_software_mosi_pin: stepper_spi_mosi_pin`);
                        section.push(`spi_software_miso_pin: stepper_spi_miso_pin`);
                        section.push(`spi_software_sclk_pin: stepper_spi_sclk_pin`);
                    }
                }
            }
            if (preset) {
                const { driver , voltage , ...rest } = preset;
                Object.entries(rest).forEach(([key, value])=>{
                    section.push(`${key}: ${value}`);
                });
            } else {
                section.push(`run_current: ${rail.current}`);
            }
            return section.join("\n") + "\n";
        },
        renderSpeedLimits () {
            const limits = config.performanceMode && config.printer.speedLimits.performance ? config.printer.speedLimits.performance : config.printer.speedLimits.basic;
            return [
                `[printer]`,
                `max_velocity: ${config.stealthchop ? "135" : limits.velocity}`,
                `max_accel: ${limits.accel / (config.stealthchop ? 2 : 1)}`,
                `max_accel_to_decel: ${limits.accel / (config.stealthchop ? 4 : 2)}`,
                `max_z_velocity: ${limits.z_velocity}`,
                `max_z_accel: ${limits.z_accel}`,
                `square_corner_velocity: ${limits.square_corner_velocity}`,
                ``,
                `[gcode_macro RatOS]`,
                `variable_macro_travel_speed: ${this.getMacroTravelSpeed()}`,
                `variable_macro_travel_accel: ${this.getMacroTravelAccel()}`
            ].join("\n");
        },
        getMacroTravelSpeed () {
            const limits = config.performanceMode && config.printer.speedLimits.performance ? config.printer.speedLimits.performance : config.printer.speedLimits.basic;
            return config.stealthchop ? "135" : limits.travel_velocity;
        },
        getMacroTravelAccel () {
            const limits = config.performanceMode && config.printer.speedLimits.performance ? config.printer.speedLimits.performance : config.printer.speedLimits.basic;
            return config.stealthchop ? "1000" : limits.travel_accel;
        },
        renderBoardQuirks () {
            let result = [];
            if (config.controlboard.hasQuirksFiles) {
                result.push("# Include controlboard quirk file");
                if (utils.getToolhead(motion/* PrinterAxis.extruder */.po.extruder) != null) {
                    result.push(`[include RatOS/boards/${config.controlboard.id}/quirks-toolboard.cfg]`);
                } else {
                    result.push(`[include RatOS/boards/${config.controlboard.id}/quirks.cfg]`);
                }
            }
            utils.getToolheads().forEach((th)=>{
                const toolboard = th.getToolboard();
                if (toolboard?.hasQuirksFiles) {
                    result.push("# Include toolboard quirk file");
                    result.push(`[include RatOS/boards/${toolboard.id}/quirks.cfg]`);
                }
            });
            return result.join("\n");
        },
        renderHotend () {
            let result = this.getToolheads().map((th)=>{
                return th.renderHotend();
            });
            return result.join("\n");
        },
        renderExtruder () {
            let result = this.getToolheads().map((th)=>{
                return th.renderExtruder();
            });
            return result.join("\n");
        },
        renderInputShaper (printerSize) {
            // Only renders x toolhead input shaper for now, IDEX uses macro magic for handling both toolheads.
            let result = [];
            result.push("[resonance_tester]");
            const xToolhead = this.getToolhead(motion/* PrinterAxis.x */.po.x);
            result.push(`accel_chip_x: adxl345 ${xToolhead.getXAccelerometerName()}`);
            result.push(`accel_chip_y: adxl345 ${xToolhead.getYAccelerometerName()}`);
            result.push("probe_points:");
            result.push(`\t${printerSize / 2},${printerSize / 2},20`);
            return result.join("\n");
        },
        renderProbeIncludes () {
            const result = [];
            const th = this.getToolheads().find((th)=>th.getProbe() != null);
            if (th) {
                result.push(`[include RatOS/z-probe/${th.getProbe()?.id + ".cfg"}]`);
                if (th.hasToolboard() && th.getProbe()?.id === "bltouch") {
                    result.push("[include RatOS/toolboard/bltouch.cfg]");
                }
            }
            return result.join("\n");
        },
        renderProbePinSection () {
            const result = [];
            const th = this.getToolheads().find((th)=>th.getProbe() != null);
            if (th) {
                switch(th.getProbe()?.id){
                    case "bltouch":
                        result.push(`# BLTouch configuration`);
                        result.push(`[bltouch]`);
                        result.push(`z_offset: 0`);
                        break;
                    case "beacon":
                        // print reminder about beacon calibration
                        const reminder = [];
                        reminder.push("# REMEMBER TO CALIBRATE YOUR BEACON!");
                        reminder.push("# Follow along from step 6 in the official beacon guide https://docs.beacon3d.com/quickstart/#6-calibrate-beacon");
                        extrasGenerator.addReminder(reminder.join("\n"));
                        break;
                    default:
                        const pinPrefix = th.getPinPrefix();
                        result.push("# Probe configuration");
                        result.push("[probe]");
                        result.push("z_offset: 0.0 # Will be commented out after a successful PROBE_CALIBRATE and SAVE_CONFIG");
                        result.push(`pin: ^${pinPrefix}probe_pin # For NPN NC probes such as the Super Pinda / Vinda / SupCR / Decoprobe probes.`);
                        result.push(`#pin: ^!${pinPrefix}probe_pin # NPN NO (refer to the specs of your probe)`);
                        result.push(`#pin: ${pinPrefix}probe_pin # PNP NO (refer to the specs of your probe)`);
                        result.push(`#pin: !${pinPrefix}probe_pin # PNP NC (refer to the specs of your probe)`);
                        break;
                }
            }
            return result.join("\n");
        },
        renderEndstopSection (pretunedSensorlessConfig) {
            const result = [];
            const toolheads = this.getToolheads();
            let yPin = "sensorless";
            toolheads.forEach((th)=>{
                if (th.getXEndstop().id !== "sensorless") {
                    result.push(""); // Add a newline for readability.
                    result.push(`# Physical X endstop configuration`);
                    result.push(`[${th.getMotionStepperName()}]`);
                    result.push(`endstop_pin: ${th.getXEndstopPin()}`);
                    result.push(`[gcode_macro RatOS]`);
                    result.push(`variable_homing_x: "endstop"`);
                }
                if (th.getYEndstop().id !== "sensorless") {
                    if (yPin == "sensorless") {
                        yPin = th.getYEndstopPin();
                    } else if (yPin !== th.getYEndstopPin()) {
                        throw new Error(`Multiple toolheads configured with different y endstops is currently not supported.`);
                    }
                }
            });
            if (yPin !== "sensorless") {
                result.push(""); // Add a newline for readability.
                result.push(`# Physical Y endstop configuration`);
                result.push(`[stepper_y]`);
                result.push(`endstop_pin: ${yPin}`);
                result.push(`[gcode_macro RatOS]`);
                result.push(`variable_homing_y: "endstop"`);
            }
            if (toolheads.some((th)=>th.getXEndstop().id === "sensorless" || th.getYEndstop().id === "sensorless")) {
                const defaultXRail = config.printer.defaults.rails.find((r)=>r.axis === motion/* PrinterAxis.x */.po.x);
                const defaultDCRail = config.printer.defaults.rails.find((r)=>r.axis === motion/* PrinterAxis.dual_carriage */.po.dual_carriage);
                const defaultYRail = config.printer.defaults.rails.find((r)=>r.axis === motion/* PrinterAxis.y */.po.y);
                result.push(""); // Add a newline for readability.
                if (defaultXRail && defaultYRail && pretunedSensorlessConfig != null && (0,motion/* matchesDefaultRail */.R_)(utils.getRail(motion/* PrinterAxis.x */.po.x), (0,serialization/* deserializePrinterRailDefinition */.Oj)(defaultXRail), config.performanceMode) && (0,motion/* matchesDefaultRail */.R_)(utils.getRail(motion/* PrinterAxis.y */.po.y), (0,serialization/* deserializePrinterRailDefinition */.Oj)(defaultYRail), config.performanceMode) && (defaultDCRail == null || (0,motion/* matchesDefaultRail */.R_)(utils.getRail(motion/* PrinterAxis.dual_carriage */.po.dual_carriage), (0,serialization/* deserializePrinterRailDefinition */.Oj)(defaultDCRail), config.performanceMode))) {
                    result.push(`[include ${pretunedSensorlessConfig}]`);
                } else {
                    result.push(extrasGenerator.generateSensorlessHomingIncludes());
                }
            }
            if (this.getToolheads().every((th)=>th.getProbe() == null)) {
                result.push(""); // Add a newline for readability.
                result.push(`# Physical Z endstop configuration`);
                result.push(`[stepper_z]`);
                result.push(`pin: z_endstop_pin`);
                result.push(`position_endstop: -0.1`);
                result.push(`second_homing_speed: 3.0`);
                result.push(`homing_retract_dist: 3.0`);
            }
            return result.join("\n");
        },
        renderMacroVariableOverrides (size) {
            const result = [
                `variable_bed_margin_x: [${config.printer.bedMargin.x[0]}, ${config.printer.bedMargin.x[1]}]`,
                `variable_bed_margin_y: [${config.printer.bedMargin.y[0]}, ${config.printer.bedMargin.y[1]}]`
            ];
            const toolheads = this.getToolheads();
            const isIdex = toolheads.some((th)=>th.getMotionAxis() === motion/* PrinterAxis.dual_carriage */.po.dual_carriage);
            if (isIdex) {
                const probeTool = toolheads.find((th)=>th.getProbe() != null)?.getTool();
                result.push(`variable_default_toolhead: ${probeTool}                             # the toolhead with the z-probe, 0=left 1=right toolhead`);
                const firstADXL = this.getToolhead(0).getXAccelerometerName();
                const secondADXL = this.getToolhead(1).getXAccelerometerName();
                result.push(`variable_adxl_chip: [${firstADXL}, ${secondADXL}]           # toolheads adxl chip names`);
            }
            return this.formatInlineComments(result).join("\n");
        },
        renderUserMacroVariableOverrides (size) {
            const result = [
                `variable_macro_travel_speed: ${this.getMacroTravelSpeed()}`,
                `variable_macro_travel_accel: ${this.getMacroTravelAccel()}`
            ];
            const toolheads = this.getToolheads();
            const isIdex = toolheads.some((th)=>th.getMotionAxis() === motion/* PrinterAxis.dual_carriage */.po.dual_carriage);
            if (isIdex) {
                const endstopSafetyMargin = 5;
                const dcParkX = (size ?? config.size ?? 300) + config.printer.bedMargin.x[1] - endstopSafetyMargin;
                result.push(`variable_parking_position: [-${config.printer.bedMargin.x[0] + endstopSafetyMargin}, ${dcParkX}]                      # toolhead x parking position`);
                result.push(`variable_toolchange_travel_speed: ${this.getMacroTravelSpeed()}     # parking travel speed`);
                result.push(`variable_toolchange_travel_accel: ${this.getMacroTravelAccel()}     # parking travel accel`);
            }
            return this.formatInlineComments(result).join("\n");
        },
        renderControllerFan () {
            let result = [];
            result.push(`[controller_fan controller_fan]`);
            switch(config.controllerFan.id){
                case "2pin":
                    this.requireControlboardPin("fan_controller_board_pin");
                    result.push(`# 2-pin fan connected to the controller board`);
                    result.push(`pin: ${this.getControlboardPins().fan_controller_board_pin}`);
                    break;
                case "4pin":
                    this.requireControlboardPin("fan_controller_board_pin");
                    result.push(`# 4-pin fan connected to the controller board`);
                    result.push(`pin: !${this.getControlboardPins().fan_controller_board_pin}`);
                    result.push(`cycle_time:  0.00004`);
                    break;
                case "4pin-dedicated":
                    this.requireControlboardPin("4p_fan_part_cooling_tach_pin");
                    result.push(`# 4-pin fan connected to a dedicated 4-pin fan header on the controller board`);
                    result.push(`pin: !${this.getControlboardPins()["4p_fan_part_cooling_tach_pin"]}`);
                    result.push(`cycle_time:  0.00004`);
                    if (this.getControlboardPins()["4p_fan_part_cooling_tach_pin"] != null) {
                        result.push(`tachometer_pin: ^${this.getControlboardPins()["4p_fan_part_cooling_tach_pin"]}`);
                        result.push(`tachometer_poll_interval: 0.0005`);
                    }
                    break;
                default:
                    throw new Error(`Unsupported controller fan option "${config.controllerFan.title}"`);
            }
            return result.join("\n");
        },
        renderFans () {
            const result = [];
            const multipleToolheadPartFans = this.getToolheads().filter((th)=>th.getPartFan()).length > 1;
            // Part fan
            result.push(`# Part cooling fan`);
            if (multipleToolheadPartFans) {
                result.push("# Multiple toolheads with part cooling fans configured");
                result.push("# [fan] will use an unused io pin, proxy m106 settings to active toolhead via macro.");
                result.push(`[fan]`);
                result.push(`pin: rpi:gpio4         # sacrifical part fan, use this to independently control your both toolhead part fans`);
            }
            result.push(this.getToolheads().map((th)=>th.renderPartFan(multipleToolheadPartFans)).join("\n"));
            // Hotend fan
            result.push(``);
            result.push(`# Hotend cooling fan`);
            result.push(this.getToolheads().map((th)=>th.renderHotendFan()).join("\n"));
            // Controller fan
            result.push(``);
            result.push(`# Controller cooling fan`);
            result.push(this.renderControllerFan());
            return result.join("\n");
        },
        renderBase () {
            return [
                `[include RatOS/homing.cfg]`,
                `[include RatOS/macros.cfg]`,
                `[include RatOS/shell-macros.cfg]`
            ].join("\n");
        },
        renderReminders () {
            return extrasGenerator.getReminders().join("\n");
        },
        uncommentIf (condition) {
            return condition === true ? "" : "#";
        }
    };
};

;// CONCATENATED MODULE: ./data/fans.ts

const partFanOptions = (config, toolheadConfig)=>{
    const fans = [];
    if (toolheadConfig == null || toolheadConfig?.axis === motion/* PrinterAxis.x */.po.x || toolheadConfig?.axis === null) {
        fans.push({
            id: "2pin",
            title: "2-pin fan"
        });
        fans.push({
            id: "4pin",
            title: "4-pin fan"
        });
    }
    if (config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 0) {
        fans.push({
            id: "4pin-dedicated",
            title: "4-pin fan (dedicated 4-pin header)"
        });
    }
    if (toolheadConfig?.toolboard != null) {
        fans.push({
            id: "2pin-toolboard",
            title: "2-pin toolboard fan"
        });
        fans.push({
            id: "4pin-toolboard",
            title: "4-pin toolboard fan"
        });
        if (toolheadConfig?.toolboard.fourPinFanConnectorCount != null && toolheadConfig.toolboard.fourPinFanConnectorCount > 0) {
            fans.push({
                id: "4pin-dedicated-toolboard",
                title: "4-pin fan (dedicated 4-pin header on toolboard)"
            });
        }
    }
    return fans;
};
const hotendFanOptions = (config, toolheadConfig)=>{
    const fans = [];
    if (toolheadConfig == null || toolheadConfig?.axis === motion/* PrinterAxis.x */.po.x) {
        fans.push({
            id: "2pin",
            title: "2-pin fan"
        });
        fans.push({
            id: "4pin",
            title: "4-pin fan"
        });
    }
    if (config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 2 || config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 1 && config.controllerFan?.id !== "4pin-dedicated") {
        fans.push({
            id: "4pin-dedicated",
            title: "4-pin fan (dedicated 4-pin header)"
        });
    }
    if (toolheadConfig?.toolboard != null) {
        fans.push({
            id: "2pin-toolboard",
            title: "2-pin toolboard fan"
        });
        fans.push({
            id: "4pin-toolboard",
            title: "4-pin toolboard fan"
        });
        if (toolheadConfig?.toolboard.fourPinFanConnectorCount != null && toolheadConfig.toolboard.fourPinFanConnectorCount > 0) {
            fans.push({
                id: "4pin-dedicated-toolboard",
                title: "4-pin fan (dedicated 4-pin header on toolboard)"
            });
        }
    }
    return fans;
};
const controllerFanOptions = (config, toolheadConfigs)=>{
    const fans = [
        {
            id: "2pin",
            title: "2-pin fan"
        },
        {
            id: "4pin",
            title: "4-pin fan"
        }
    ];
    if (config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 2 || config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 1 && toolheadConfigs?.some((th)=>th?.hotendFan?.id !== "4pin-dedicated")) {
        fans.push({
            id: "4pin-dedicated",
            title: "4-pin fan (dedicated 4-pin header)"
        });
    }
    return fans;
};
const defaultControllerFan = {
    id: "2pin",
    title: "2-pin fan"
};

// EXTERNAL MODULE: ./server/routers/mcu.ts
var mcu = __webpack_require__(3459);
;// CONCATENATED MODULE: ./data/accelerometers.ts
const xAccelerometerOptions = (config, toolheadConfig)=>{
    const accelerometers = [
        {
            id: "none",
            title: "None"
        },
        {
            id: "sbc",
            title: "Wired to Host Computer"
        }
    ];
    if (config?.controlboard?.ADXL345SPI != null) {
        accelerometers.push({
            id: "controlboard",
            title: "Wired to Controlboard"
        });
    }
    if (toolheadConfig?.toolboard != null && toolheadConfig.toolboard.ADXL345SPI != null) {
        accelerometers.push({
            id: "toolboard",
            title: "Integrated on toolboard"
        });
    }
    return accelerometers;
};
const yAccelerometerOptions = (config, toolheadConfig)=>{
    const accelerometers = [
        {
            id: "none",
            title: "None"
        },
        {
            id: "sbc",
            title: "Wired to Host Computer"
        }
    ];
    if (config?.controlboard?.ADXL345SPI != null) {
        accelerometers.push({
            id: "controlboard",
            title: "Wired to Controlboard"
        });
    }
    if (toolheadConfig?.toolboard != null && toolheadConfig.toolboard.ADXL345SPI != null) {
        accelerometers.push({
            id: "toolboard",
            title: "Integrated on toolboard"
        });
    }
    return accelerometers;
};

// EXTERNAL MODULE: external "glob"
var external_glob_ = __webpack_require__(4230);
// EXTERNAL MODULE: ./server/trpc.ts
var trpc = __webpack_require__(8199);
// EXTERNAL MODULE: external "recoil"
var external_recoil_ = __webpack_require__(9755);
// EXTERNAL MODULE: external "recoil-sync"
var external_recoil_sync_ = __webpack_require__(4101);
// EXTERNAL MODULE: external "zod-refine"
var external_zod_refine_ = __webpack_require__(5140);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
// EXTERNAL MODULE: external "@trpc/client"
var client_ = __webpack_require__(5337);
// EXTERNAL MODULE: ./node_modules/.pnpm/@trpc+next@10.44.1_@tanstack+react-query@4.36.1_@trpc+client@10.44.1_@trpc+react-query@10.44._prfragvwy3oytbcmv4vzxrr3hy/node_modules/@trpc/next/dist/index.mjs
var dist = __webpack_require__(3736);
;// CONCATENATED MODULE: ./utils/trpc.ts


function getBaseUrl() {
    if (false) // browser should use relative path
    {}
    if (process.env.RENDER_INTERNAL_HOSTNAME) // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}/configure`;
    // assume localhost
    return `http://127.0.0.1:${process.env.PORT ?? 3000}/configure`;
}
const trpc_trpc = (0,dist/* createTRPCNext */.t)({
    config () {
        return {
            links: [
                (0,client_.httpBatchLink)({
                    /**
					 * @link https://trpc.io/docs/ssr
					 **/ url: `${getBaseUrl()}/api/trpc`,
                    maxURLLength: 2083
                })
            ]
        };
    },
    /**
	 * @link https://trpc.io/docs/ssr
	 **/ ssr: false
});
const proxyClient = (0,client_.createTRPCProxyClient)({
    links: [
        (0,client_.httpBatchLink)({
            /**
			 * @link https://trpc.io/docs/ssr
			 **/ url: `${getBaseUrl()}/api/trpc`,
            maxURLLength: 2083
        })
    ]
});

;// CONCATENATED MODULE: ./helpers/trpc.ts



// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: external "react-use-websocket"
var external_react_use_websocket_ = __webpack_require__(7636);
;// CONCATENATED MODULE: ./hooks/useMoonraker.tsx
"use client";


let REQ_ID = 0;
const getWsURL = (hostname)=>{
    const host = hostname != null && hostname.trim() != "" ? hostname :  true && "".trim() != "" ? "" :  false ? 0 : "";
    if (host == null || host.trim() == "") {
        return null;
    }
    return `ws://${host}/websocket`;
};
const useMoonraker_useMoonraker = (hostname)=>{
    const inFlightRequests = useRef({});
    const inFlightRequestTimeouts = useRef({});
    const onReadyCallbacks = useRef([]);
    const [wsUrl, setWsUrl] = useState(getWsURL(hostname));
    useEffect(()=>{
        setWsUrl(getWsURL(hostname));
    }, [
        hostname
    ]);
    const { lastJsonMessage , sendJsonMessage , readyState  } = useWebSocket(wsUrl, {
        shouldReconnect: (closeEvent)=>{
            return true;
        },
        reconnectAttempts: Infinity,
        reconnectInterval: 3000,
        share: true
    });
    const readyStateRef = useRef(readyState);
    readyStateRef.current = readyState;
    const [moonrakerStatus, setMoonrakerStatus] = useState(readyState === 1 ? "connected" : "connecting");
    const [moonrakerMessage, setMoonrakerMessage] = useState(lastJsonMessage);
    const whenReady = useCallback((callback)=>{
        if (readyStateRef.current === 1) {
            callback();
        } else {
            onReadyCallbacks.current.push(callback);
        }
    }, []);
    const isReady = useCallback(()=>new Promise((resolve, reject)=>{
            whenReady(()=>{
                resolve();
            });
        }), [
        whenReady
    ]);
    const moonrakerQuery = useCallback(async (method, params = {})=>{
        await isReady();
        return new Promise((resolve, reject)=>{
            sendJsonMessage({
                jsonrpc: "2.0",
                method,
                params,
                id: ++REQ_ID
            });
            inFlightRequests.current[REQ_ID] = (err, result)=>{
                if (err) {
                    return reject(err);
                }
                if (result?.error) {
                    return reject(result.error);
                }
                resolve(result);
            };
            inFlightRequestTimeouts.current[REQ_ID] = window.setTimeout(()=>{
                inFlightRequests.current[REQ_ID]?.(new Error("Request timed out"), null);
                delete inFlightRequests.current[REQ_ID];
                delete inFlightRequestTimeouts.current[REQ_ID];
            }, 10 * 1000); // 10 second timeout.
        });
    }, [
        isReady,
        sendJsonMessage
    ]);
    const saveItem = useCallback(async (key, value)=>{
        await isReady();
        return await moonrakerQuery("server.database.post_item", {
            namespace: "RatOS",
            key,
            value: JSON.stringify(value)
        });
    }, [
        moonrakerQuery,
        isReady
    ]);
    const getItem = useCallback(async (key)=>{
        await isReady();
        try {
            const result = await moonrakerQuery("server.database.get_item", {
                namespace: "RatOS",
                key
            });
            if (result.value === "{}") {
                return null;
            }
            return typeof result.value == "string" ? JSON.parse(result.value) : result.value;
        } catch (e) {
            return null;
        }
    }, [
        moonrakerQuery,
        isReady
    ]);
    useEffect(()=>{
        if (readyState === 1) {
            onReadyCallbacks.current.forEach((cb)=>cb());
            onReadyCallbacks.current = [];
            setMoonrakerStatus("connected");
        } else {
            setMoonrakerStatus("connecting");
        }
    }, [
        readyState
    ]);
    useEffect(()=>{
        if (lastJsonMessage?.id && inFlightRequests.current[lastJsonMessage.id]) {
            window.clearTimeout(inFlightRequestTimeouts.current[lastJsonMessage.id]);
            inFlightRequests.current[lastJsonMessage.id](null, lastJsonMessage.result);
            delete inFlightRequestTimeouts.current[lastJsonMessage.id];
            delete inFlightRequests.current[lastJsonMessage.id];
        } else {
            setMoonrakerMessage(lastJsonMessage);
        }
    }, [
        lastJsonMessage
    ]);
    useEffect(()=>{
        return ()=>{
            for(const reqId in inFlightRequestTimeouts.current){
                // eslint-disable-next-line react-hooks/exhaustive-deps
                delete inFlightRequestTimeouts.current[reqId];
                // eslint-disable-next-line react-hooks/exhaustive-deps
                delete inFlightRequests.current[reqId];
            }
            onReadyCallbacks.current = [];
        };
    }, []);
    return {
        query: moonrakerQuery,
        saveItem,
        getItem,
        status: moonrakerStatus,
        lastMessage: moonrakerMessage,
        isReady: readyState === 1
    };
};

;// CONCATENATED MODULE: ./components/sync-with-moonraker.tsx
"use client";





const moonrakerSyncEventEmitter = new EventTarget();
const DispatchSaveAtomEvent = (itemKey, value)=>{
    moonrakerSyncEventEmitter.dispatchEvent(new CustomEvent("saveAtom", {
        detail: {
            itemKey,
            value
        }
    }));
};
const moonrakerWriteEffect = ()=>{
    return (params)=>{
        params.onSet((newValue)=>{
            console.debug(`RatOS Atom Sync Effect: new value was saved to moonraker "${params.trigger}"`, params.node.key, newValue);
            DispatchSaveAtomEvent(params.node.key, newValue);
        });
    };
};
const SyncWithMoonraker = ({ children  })=>{
    const moonraker = useMoonraker();
    const read = useCallback(async (itemKey)=>{
        const value = await moonraker.getItem(itemKey);
        return value != null ? value : new DefaultValue();
    }, [
        moonraker
    ]);
    const write = useCallback(async ({ diff  })=>{
        console.debug("Currently sidestepping recoil sync writes because of major bug: https://github.com/facebookexperimental/Recoil/issues/2059");
        return;
    // for (const [key, value] of diff) {
    // await moonraker.saveItem(key, value);
    // }
    }, []);
    const saveAtom = useCallback(async (event)=>{
        const { itemKey , value  } = event.detail;
        await moonraker.saveItem(itemKey, value);
    }, [
        moonraker
    ]);
    useEffect(()=>{
        moonrakerSyncEventEmitter.addEventListener("saveAtom", saveAtom);
        return ()=>{
            moonrakerSyncEventEmitter.removeEventListener("saveAtom", saveAtom);
        };
    }, [
        saveAtom
    ]);
    return /*#__PURE__*/ _jsx(RecoilSync, {
        read: read,
        write: write,
        children: children
    });
};

;// CONCATENATED MODULE: ./recoil/printer.ts










let cachedPrinters = {};
// SyncEffect read methods
const readPrinterAtom = async ({ read  })=>{
    const printer = await read(printer_PrinterState.key);
    if (printer != null) {
        const printerId = external_zod_.z.object({
            id: PrinterDefinitionWithResolvedToolheads.shape.id
        }).safeParse(printer);
        if (printerId.success) {
            let newPrinter = cachedPrinters[printerId.data.id];
            if (newPrinter == null) {
                newPrinter = await proxyClient.printer.printer.query(printerId.data.id, {});
                if (newPrinter) {
                    cachedPrinters[printerId.data.id] = newPrinter;
                }
            }
            return newPrinter ?? null;
        }
    }
    return null;
};
const readPrinterRailAtom = (param)=>async ({ read  })=>{
        const printerRailState = await read(PrinterRailState(param).key);
        if (printerRailState != null) {
            const parsedRail = motion/* SerializedPrinterRail.safeParse */.Ah.safeParse(printerRailState);
            if (parsedRail.success) {
                return parsedRail.data;
            }
            const printer = await readPrinterAtom({
                read
            });
            const printerRailDefault = printer?.defaults.rails.find((r)=>r.axis === param);
            if (printerRailDefault != null) {
                const parsedRailRepaired = motion/* SerializedPrinterRail.safeParse */.Ah.safeParse({
                    ...printerRailDefault,
                    ...printerRailState
                });
                if (parsedRailRepaired.success) {
                    return parsedRailRepaired.data;
                }
            }
        }
        return null;
    };
const printer_PrinterState = (0,external_recoil_.atom)({
    key: "Printer",
    default: null,
    effects: [
        moonrakerWriteEffect(),
        (0,external_recoil_sync_.syncEffect)({
            read: readPrinterAtom,
            write: async ({ write  }, newValue)=>{
                await new Promise((resolve)=>{
                    if (newValue instanceof external_recoil_.DefaultValue) {
                        write(printer_PrinterState.key, null);
                    } else {
                        write(printer_PrinterState.key, newValue ?? null);
                    }
                    setTimeout(()=>{}, 500);
                });
            },
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(PrinterDefinitionWithResolvedToolheads.nullable())
        })
    ]
});
const LoadablePrinterState = (0,external_recoil_.selector)({
    key: "LoadablePrinterState",
    get: async ({ get  })=>{
        const loadable = get((0,external_recoil_.noWait)(printer_PrinterState));
        return ({
            hasValue: ()=>loadable.contents,
            hasError: ()=>[],
            loading: ()=>[]
        })[loadable.state]();
    }
});
const printer_PrinterSizeState = (0,external_recoil_.atom)({
    key: "PrinterOption",
    default: null,
    effects: [
        moonrakerWriteEffect(),
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(PrinterDefinition.shape.sizes.unwrap().element.nullable())
        })
    ]
});
const printer_ControlboardState = (0,external_recoil_.atom)({
    key: "Controlboard",
    default: null,
    effects: [
        moonrakerWriteEffect(),
        (0,external_recoil_sync_.syncEffect)({
            read: async ({ read  })=>{
                const board = await read(printer_ControlboardState.key);
                if (board != null) {
                    const boardId = external_zod_.z.object({
                        path: boards/* Board.shape.path */.$l.shape.path
                    }).safeParse(board);
                    if (boardId.success) {
                        const boardReq = await proxyClient.mcu.boards.query({
                            boardFilters: {
                                toolboard: false
                            }
                        });
                        const newBoard = boardReq.find((b)=>b.path === boardId.data.path);
                        return newBoard ?? null;
                    }
                }
                return null;
            },
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(boards/* Board.nullable */.$l.nullable())
        })
    ]
});
const PrinterRailState = (0,external_recoil_.atomFamily)({
    key: "PrinterRail",
    default: null,
    effects: (param)=>[
            moonrakerWriteEffect(),
            (0,external_recoil_sync_.syncEffect)({
                read: readPrinterRailAtom(param),
                refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(motion/* SerializedPrinterRail.nullable */.Ah.nullable())
            })
        ]
});
const PrinterRailsState = (0,external_recoil_.selector)({
    key: "PrinterRails",
    get: ({ get  })=>{
        const printer = get(printer_PrinterState);
        const rails = printer?.defaults.rails.map((rail)=>{
            const railState = get(PrinterRailState(rail.axis));
            return (0,serialization/* deserializePrinterRail */.Ak)(railState ?? rail);
        });
        return rails ?? [];
    },
    set: ({ set  }, newValue)=>{
        if (newValue instanceof external_recoil_.DefaultValue) {
            Object.values(motion/* PrinterAxis */.po).forEach((axis)=>{
                set(PrinterRailState(axis), null);
            });
            return;
        }
        newValue.forEach((rail)=>{
            set(PrinterRailState(rail.axis), (0,serialization/* serializePrinterRail */.Yz)(rail));
        });
    }
});
const printer_LoadablePrinterRailsState = (0,external_recoil_.selector)({
    key: "LoadablePrinterRailsState",
    get: async ({ get  })=>{
        const loadable = get((0,external_recoil_.noWait)(PrinterRailsState));
        return ({
            hasValue: ()=>loadable.contents,
            hasError: ()=>[],
            loading: ()=>[]
        })[loadable.state]();
    }
});

;// CONCATENATED MODULE: ./recoil/toolhead.ts










const isAxisValidForTool = (axis, tool)=>{
    if (axis === PrinterAxis.dual_carriage && tool === 1) {
        return true;
    }
    if (axis === PrinterAxis.x) {
        return true;
    }
    return false;
};
const PrinterToolheadState = (0,external_recoil_.atomFamily)({
    key: "PrinterToolhead",
    default: null,
    effects: (param)=>[
            moonrakerWriteEffect(),
            (0,external_recoil_sync_.syncEffect)({
                read: async ({ read  })=>{
                    const state = await read(PrinterToolheadState(param).key);
                    if (typeof state !== "object") {
                        return null;
                    }
                    if (state == null) {
                        return null;
                    }
                    const { toolNumber: tNum , ...printerToolheadState } = state;
                    if (printerToolheadState != null) {
                        const parsedToolhead = toolhead/* ToolheadConfiguration.safeParse */.x8.safeParse(printerToolheadState);
                        if (parsedToolhead.success) {
                            let freshToolboard = parsedToolhead.data.toolboard;
                            if (freshToolboard) {
                                if (freshToolboard != null) {
                                    const toolboardPath = external_zod_.z.object({
                                        path: boards/* Toolboard.shape.path */.MG.shape.path
                                    }).safeParse(freshToolboard);
                                    if (toolboardPath.success) {
                                        const boardReq = await proxyClient.mcu.boards.query({
                                            boardFilters: {
                                                toolboard: true
                                            }
                                        });
                                        const maybeToolboard = boardReq.find((b)=>b.path === toolboardPath.data.path);
                                        if (maybeToolboard) {
                                            freshToolboard = boards/* Toolboard.parse */.MG.parse(maybeToolboard);
                                        }
                                    }
                                }
                            }
                            return {
                                ...parsedToolhead.data,
                                toolboard: freshToolboard,
                                toolNumber: param
                            };
                        }
                        console.debug("RecoilSync: failed to read toolhead!", PrinterToolheadState(param).key, parsedToolhead.error, printerToolheadState);
                        return null;
                    }
                    return null;
                },
                refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(toolhead/* BaseToolheadConfiguration.extend */.PY.extend({
                    toolNumber: toolhead/* ToolNumber */.Qr
                }).nullable())
            })
        ]
});
const DeserializeToolheadQuery = (0,external_recoil_.selectorFamily)({
    key: "DeserializeToolheadQuery",
    get: (param)=>async ({ get  })=>{
            const parsedToolhead = toolhead/* ToolheadConfiguration.safeParse */.x8.safeParse(await proxyClient.printer.deserializeToolheadConfiguration.query({
                config: param.th,
                printerConfig: {
                    controlboard: param.boardId
                }
            }));
            if (!parsedToolhead.success) {
                return null;
            }
            return {
                ...parsedToolhead.data,
                toolNumber: param.toolNumber
            };
        }
});
const PrinterToolheadsState = (0,external_recoil_.selector)({
    key: "PrinterToolheadsState",
    get: ({ get  })=>{
        const printer = get(printer_PrinterState);
        if (printer == null) {
            return [];
        }
        return get((0,external_recoil_.waitForAll)(printer.defaults.toolheads.map((th, i)=>PrinterToolheadState(i)))).filter(Boolean);
    },
    set: ({ set , reset  }, newValue)=>{
        if (newValue instanceof external_recoil_.DefaultValue) {
            throw new Error("ToolheadsState cannot be reset, please reset the individual ToolheadState instead");
        }
        newValue.forEach((th)=>{
            set(PrinterToolheadState(th.toolNumber), {
                ...th,
                toolNumber: th.toolNumber
            });
        });
    }
});
const LoadablePrinterToolheadsState = (0,external_recoil_.selector)({
    key: "LoadablePrinterToolheadsState",
    get: async ({ get  })=>{
        const loadable = get((0,external_recoil_.noWait)(PrinterToolheadsState));
        return ({
            hasValue: ()=>loadable.contents,
            hasError: ()=>[],
            loading: ()=>[]
        })[loadable.state]();
    }
});

;// CONCATENATED MODULE: ./hooks/usePrinterConfiguration.tsx
"use client";












const PerformanceModeState = (0,external_recoil_.atom)({
    key: "PerformanceMode",
    default: false,
    effects: [
        moonrakerWriteEffect(),
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(external_zod_.z.boolean().optional().nullable())
        })
    ]
});
const StealthchopState = (0,external_recoil_.atom)({
    key: "Stealchop",
    default: false,
    effects: [
        moonrakerWriteEffect(),
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(external_zod_.z.boolean().optional().nullable())
        })
    ]
});
const StandstillStealthState = (0,external_recoil_.atom)({
    key: "StandstillStealth",
    default: false,
    effects: [
        moonrakerWriteEffect(),
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(external_zod_.z.boolean().optional().nullable())
        })
    ]
});
const ControllerFanState = (0,external_recoil_.atom)({
    key: "ControllerFan",
    default: defaultControllerFan,
    effects: [
        moonrakerWriteEffect(),
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(hardware/* Fan.nullable */.XG.nullable())
        })
    ]
});
const PrinterConfigurationState = (0,external_recoil_.selector)({
    key: "PrinterConfiguration",
    get: async ({ get  })=>{
        const { printer , printerSize , performanceMode , stealthchop , standstillStealth , rails , controlboard , controllerFan , toolheads  } = get((0,external_recoil_.waitForAll)({
            printer: printer_PrinterState,
            printerSize: printer_PrinterSizeState,
            performanceMode: PerformanceModeState,
            stealthchop: StealthchopState,
            standstillStealth: StandstillStealthState,
            rails: PrinterRailsState,
            controlboard: printer_ControlboardState,
            controllerFan: ControllerFanState,
            toolheads: PrinterToolheadsState
        }));
        const printerConfig = PartialPrinterConfiguration.safeParse({
            printer: printer == null ? null : {
                ...printer,
                defaults: {
                    ...printer.defaults,
                    toolheads: printer?.defaults.toolheads.map((th)=>(0,serialization/* serializeToolheadConfiguration */.m6)(th))
                }
            },
            size: printerSize,
            performanceMode,
            stealthchop,
            standstillStealth,
            rails,
            controlboard,
            controllerFan,
            toolheads
        });
        if (printerConfig.success === false) {
            console.error(printerConfig.error.flatten().fieldErrors);
        }
        return printerConfig.success ? printerConfig.data : null;
    }
});
const LoadablePrinterConfigurationState = (0,external_recoil_.selector)({
    key: "LoadablePrinterConfigurationState",
    get: async ({ get  })=>{
        const loadable = get((0,external_recoil_.noWait)(PrinterConfigurationState));
        return ({
            hasValue: ()=>loadable.contents,
            hasError: ()=>null,
            loading: ()=>null
        })[loadable.state]();
    }
});
const serializePrinterConfiguration = (config)=>{
    const serializedConfig = {
        printer: config.printer.id,
        toolheads: config.toolheads.map((toolhead)=>(0,serialization/* serializeToolheadConfiguration */.m6)(toolhead)),
        size: config.size,
        controlboard: config.controlboard.id,
        controllerFan: config.controllerFan.id,
        performanceMode: config.performanceMode,
        stealthchop: config.stealthchop,
        standstillStealth: config.standstillStealth,
        rails: config.rails.map((rail)=>(0,serialization/* serializePrinterRail */.Yz)(rail))
    };
    return SerializedPrinterConfiguration.parse(serializedConfig);
};
const serializePartialPrinterConfiguration = (config)=>{
    const toolheads = config?.toolheads?.map((toolhead)=>serializePartialToolheadConfiguration(toolhead));
    const serializedConfig = {
        printer: config?.printer?.id,
        toolheads: toolheads,
        size: config?.size,
        controlboard: config?.controlboard?.id,
        controllerFan: config?.controllerFan?.id,
        performanceMode: config?.performanceMode,
        stealthchop: config?.stealthchop,
        standstillStealth: config?.standstillStealth
    };
    return SerializedPartialPrinterConfiguration.parse(serializedConfig);
};
const useSerializedPrinterConfiguration = ()=>{
    const printerConfiguration = useRecoilValue(LoadablePrinterConfigurationState);
    const serializedPrinterConfiguration = useMemo(()=>serializePartialPrinterConfiguration(printerConfiguration ?? {}), [
        printerConfiguration
    ]);
    return serializedPrinterConfiguration;
};
const usePrinterConfiguration = ()=>{
    const [selectedPrinter, setSelectedPrinter] = useRecoilState(PrinterState);
    const [selectedPrinterOption, setSelectedPrinterOption] = useRecoilState(PrinterSizeState);
    const [selectedBoard, setSelectedBoard] = useRecoilState(ControlboardState);
    const [performanceMode, setPerformanceMode] = useRecoilState(PerformanceModeState);
    const [stealthchop, setStealthchop] = useRecoilState(StealthchopState);
    const [standstillStealth, setStandstillStealth] = useRecoilState(StandstillStealthState);
    const [selectedControllerFan, setSelectedControllerFan] = useRecoilState(ControllerFanState);
    const selectedPrinterRails = useRecoilValue(LoadablePrinterRailsState);
    const printerConfiguration = useRecoilValue(LoadablePrinterConfigurationState);
    const serializedPrinterConfiguration = useSerializedPrinterConfiguration();
    const parsedPrinterConfiguration = PrinterConfiguration.safeParse(printerConfiguration);
    return {
        selectedPrinter,
        setSelectedPrinter,
        selectedPrinterOption,
        setSelectedPrinterOption,
        selectedBoard,
        setSelectedBoard,
        performanceMode,
        setPerformanceMode,
        stealthchop,
        setStealthchop,
        standstillStealth,
        setStandstillStealth,
        selectedPrinterRails,
        selectedControllerFan,
        setSelectedControllerFan,
        partialPrinterConfiguration: printerConfiguration,
        serializedPrinterConfiguration,
        parsedPrinterConfiguration
    };
};

// EXTERNAL MODULE: ./server/helpers/cache.ts
var cache = __webpack_require__(9878);
;// CONCATENATED MODULE: ./zods/moonraker.tsx


const MoonrakerBaseResult = external_zod_.z.object({
    eventtime: external_zod_.z.number()
});
const MoonrakerPrinterState = MoonrakerBaseResult.extend({
    status: external_zod_.z.object({
        print_stats: external_zod_.z.object({
            state: external_zod_.z.union([
                external_zod_.z.literal("paused"),
                external_zod_.z.literal("printing"),
                external_zod_.z.literal("complete"),
                external_zod_.z.literal("error"),
                external_zod_.z.literal("canceled"),
                external_zod_.z.literal("standby")
            ])
        })
    })
});
const MoonrakerHTTPResponse = external_zod_.z.object({
    result: MoonrakerBaseResult.passthrough()
});
const parseMoonrakerHTTPResponse = async (response, responseZod)=>{
    const jsonResult = await response.json();
    try {
        const res = MoonrakerHTTPResponse.parse(jsonResult);
        return {
            ...res,
            result: responseZod.parse(res.result)
        };
    } catch (e) {
        (0,logger/* getLogger */.j)().error("Error parsing moonraker response");
        (0,logger/* getLogger */.j)().error(jsonResult);
        throw e;
    }
};

;// CONCATENATED MODULE: ./server/helpers/klipper.ts

const klipperRestart = async (force = false)=>{
    const printerState = (await parseMoonrakerHTTPResponse(await fetch("http://localhost:7125/printer/objects/query?print_stats"), MoonrakerPrinterState)).result.status.print_stats.state;
    if (force || [
        "error",
        "complete",
        "canceled",
        "standby"
    ].includes(printerState)) {
        await fetch("http://localhost:7125/printer/restart", {
            method: "POST"
        });
        return true;
    }
    return false;
};

;// CONCATENATED MODULE: ./server/routers/printer.ts























function isNodeError(error) {
    return error instanceof Error;
}
const parseDirectory = async (directory, zod)=>{
    const cached = cache/* ServerCache.get */.oA.get(directory);
    if (cached != null) {
        return external_zod_.z.array(zod).parse(cached);
    }
    const defs = await (0,external_glob_.glob)(`${process.env.RATOS_CONFIGURATION_PATH}/${directory}/*.cfg`);
    const res = (await Promise.all(defs.map((f)=>f.trim()).filter((f)=>f !== "").map(async (f)=>{
        const parsedFile = await (0,metadata/* parseMetadata */.BB)(f, zod);
        if (parsedFile == null) {
            (0,logger/* getLogger */.j)().warn(`No metadata present in ${f} skipping..`);
            return null;
        }
        return parsedFile;
    }))).filter((f)=>f != null);
    cache/* ServerCache.set */.oA.set(directory, res);
    return res;
};
const serializedPartialConfigFromPrinterDefinition = (def)=>{
    return printer_configuration_SerializedPartialPrinterConfiguration.parse({
        printer: def.id,
        controlboard: def.defaults.board
    });
};
const getPrinters = async (resolveToolheads = false)=>{
    const defs = (0,external_glob_.glob)(`${process.env.RATOS_CONFIGURATION_PATH}/printers/*/printer-definition.json`);
    const hotends = parseDirectory("hotends", hardware/* Hotend */.Uy);
    const boards = (0,mcu/* getBoards */.DC)();
    const toolheadPromises = {};
    const printers = (await defs).map((f)=>f.trim() === "" ? null : {
            ...JSON.parse((0,external_fs_.readFileSync)(f).toString()),
            path: f.replace("printer-definition.json", ""),
            id: f.replace("/printer-definition.json", "").split("/").pop()
        }).filter(Boolean);
    printers.forEach((p)=>{
        toolheadPromises[p.id] = p.defaults.toolheads.map(async (th)=>{
            const hotend = (await hotends).find((h)=>h.id === th.hotend);
            if (th.thermistor == null && hotend != null) {
                th.thermistor = hotend.thermistor;
            }
            if (resolveToolheads) {
                const dth = deserializeToolheadConfiguration(th, serializedPartialConfigFromPrinterDefinition(p), await boards);
                th = await dth;
            }
            return th;
        });
    });
    const resolvedToolheads = {};
    await Promise.all(Object.keys(toolheadPromises).map(async (printerId)=>{
        const promises = toolheadPromises[printerId];
        resolvedToolheads[printerId] = await Promise.all(promises);
    }));
    return external_zod_.z.array(resolveToolheads ? PrinterDefinitionWithResolvedToolheads : PrinterDefinition).parse(printers.map((p)=>{
        p.defaults.toolheads = resolvedToolheads[p.id];
        return p;
    }));
};
const isPrinterCfgInitialized = async ()=>{
    const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
    try {
        await (0,external_util_.promisify)(external_fs_.access)(external_path_default().join(environment.KLIPPER_CONFIG_PATH, "printer.cfg"), external_fs_.constants.F_OK);
    } catch (e) {
        if (isNodeError(e) && e.code === "ENOENT") {
            // File does not exist, resume as normal.
            return false;
        } else {
            throw e;
        }
    }
    const currentcfg = await (0,external_util_.promisify)(external_fs_.readFile)(external_path_default().join(environment.KLIPPER_CONFIG_PATH, "printer.cfg"));
    return currentcfg.indexOf("[include RatOS/printers/initial-setup.cfg]") === -1;
};
const deserializeToolheadConfiguration = async (config, printerConfig, boards)=>{
    const loadedBoards = boards == null ? await (0,mcu/* getBoards */.DC)() : boards;
    const controlboard = loadedBoards.find((b)=>b.id === printerConfig.controlboard);
    const toolboards = (0,mcu/* getToolboards */.Ok)(loadedBoards);
    const hotends = await parseDirectory("hotends", hardware/* Hotend */.Uy);
    const extruders = await parseDirectory("extruders", hardware/* Extruder */.U3);
    const probes = await parseDirectory("z-probe", hardware/* Probe */.lV);
    const toolboard = toolboards.find((b)=>b.id === config.toolboard) ?? null;
    const xAccels = xAccelerometerOptions({
        controlboard
    }, {
        toolboard
    });
    const yAccels = yAccelerometerOptions({
        controlboard
    }, {
        toolboard
    });
    return toolhead/* ToolheadConfiguration.parse */.x8.parse({
        ...config,
        toolboard: toolboard,
        hotend: hotends.find((h)=>h.id === config.hotend),
        extruder: extruders.find((e)=>e.id === config.extruder),
        probe: probes.find((p)=>p.id === config.probe),
        thermistor: hardware/* thermistors.find */.b6.find((t)=>t === config.thermistor),
        xEndstop: xEndstopOptions(printerConfig, config).find((e)=>e.id === config.xEndstop),
        yEndstop: yEndstopOptions(printerConfig, config).find((e)=>e.id === config.yEndstop),
        xAccelerometer: xAccels.find((a)=>a.id === config.xAccelerometer) ?? (toolboard && toolboard.ADXL345SPI != null) ? xAccels.find((a)=>a.id === "toolboard") : null,
        yAccelerometer: yAccels.find((a)=>a.id === config.yAccelerometer) ?? (toolboard && toolboard.ADXL345SPI != null) ? xAccels.find((a)=>a.id === "toolboard") : null,
        partFan: partFanOptions({
            controlboard
        }, {
            toolboard,
            axis: config.axis
        }).find((f)=>f.id === config.partFan),
        hotendFan: hotendFanOptions({
            controlboard
        }, {
            toolboard,
            axis: config.axis
        }).find((f)=>f.id === config.hotendFan)
    });
};
const deserializePartialToolheadConfiguration = async (config, printerConfig, boards)=>{
    boards = boards ?? await (0,mcu/* getBoards */.DC)();
    const controlboard = boards.find((b)=>b.id === printerConfig?.controlboard);
    const toolboards = (0,mcu/* getToolboards */.Ok)(boards);
    const hotends = await parseDirectory("hotends", hardware/* Hotend */.Uy);
    const extruders = await parseDirectory("extruders", hardware/* Extruder */.U3);
    const probes = await parseDirectory("z-probe", hardware/* Probe */.lV);
    const toolboard = toolboards.find((b)=>b.id === config?.toolboard);
    return toolhead/* PartialToolheadConfiguration.parse */.b2.parse({
        ...config,
        toolboard: toolboard ?? null,
        hotend: hotends.find((h)=>h.id === config?.hotend),
        extruder: extruders.find((e)=>e.id === config?.extruder),
        probe: probes.find((p)=>p.id === config?.probe),
        thermistor: hardware/* thermistors.find */.b6.find((t)=>t === config?.thermistor),
        xEndstop: xEndstopOptions(printerConfig, config).find((e)=>e.id === config?.xEndstop),
        yEndstop: yEndstopOptions(printerConfig, config).find((e)=>e.id === config?.yEndstop),
        xAccelerometer: xAccelerometerOptions({
            controlboard
        }, {
            toolboard
        }).find((a)=>a.id === config?.xAccelerometer),
        yAccelerometer: yAccelerometerOptions({
            controlboard
        }, {
            toolboard
        }).find((a)=>a.id === config?.yAccelerometer),
        partFan: partFanOptions({
            controlboard
        }, {
            toolboard,
            axis: config?.axis ?? motion/* PrinterAxis.x */.po.x
        }).find((f)=>f.id === config?.partFan),
        hotendFan: hotendFanOptions({
            controlboard
        }, {
            toolboard,
            axis: config?.axis ?? motion/* PrinterAxis.x */.po.x
        }).find((f)=>f.id === config?.hotendFan)
    });
};
const deserializePartialPrinterConfiguration = async (config)=>{
    const boards = await (0,mcu/* getBoards */.DC)();
    const controlboard = boards.find((b)=>b.serialPath === config?.controlboard);
    const toolheads = config.toolheads == null ? undefined : await Promise.all(config.toolheads.map(async (th)=>await deserializePartialToolheadConfiguration(th, config, boards)));
    return PartialPrinterConfiguration.parse({
        toolheads: toolheads,
        printer: (await getPrinters()).find((p)=>p.id === config?.printer),
        size: config?.size,
        controllerFan: controllerFanOptions({
            controlboard
        }).find((f)=>f.id === config?.controllerFan),
        controlboard: controlboard,
        performanceMode: config?.performanceMode,
        stealthchop: config?.stealthchop,
        standstillStealth: config?.standstillStealth,
        rails: config?.rails?.map((r)=>(0,serialization/* deserializePrinterRail */.Ak)(r))
    });
};
const deserializePrinterConfiguration = async (config)=>{
    const boards = await (0,mcu/* getBoards */.DC)();
    const controlboard = boards.find((b)=>b.id === config?.controlboard);
    const toolheads = config.toolheads == null ? undefined : await Promise.all(config.toolheads.map((th)=>deserializeToolheadConfiguration(th, config, boards)));
    return printer_configuration_PrinterConfiguration.parse({
        toolheads: toolheads,
        printer: (await getPrinters()).find((p)=>p.id === config?.printer),
        size: config?.size,
        controllerFan: controllerFanOptions({
            controlboard
        }).find((f)=>f.id === config?.controllerFan),
        controlboard: controlboard,
        performanceMode: config?.performanceMode,
        stealthchop: config?.stealthchop,
        standstillStealth: config?.standstillStealth,
        rails: config?.rails.map((r)=>(0,serialization/* deserializePrinterRail */.Ak)(r))
    });
};
const getTimeStamp = ()=>{
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0
    let yyyy = today.getFullYear();
    let hh = String(today.getHours()).padStart(2, "0");
    let min = String(today.getMinutes()).padStart(2, "0");
    let sec = String(today.getSeconds()).padStart(2, "0");
    return `${yyyy}${mm}${dd}-${hh}${min}${sec}`;
};
const getFilesToWrite = async (config, overwriteFiles)=>{
    const utils = await constructKlipperConfigUtils(config);
    const extrasGenerator = constructKlipperConfigExtrasGenerator(config, utils);
    const helper = await constructKlipperConfigHelpers(config, extrasGenerator, utils);
    const { template , initialPrinterCfg  } = await __webpack_require__(5866)(`./${config.printer.template.replace("-printer.template.cfg", ".ts")}`);
    const renderedTemplate = template(config, helper).trim();
    const renderedPrinterCfg = initialPrinterCfg(config, helper).trim();
    const extras = extrasGenerator.getFilesToWrite();
    return extras.concat([
        {
            fileName: "RatOS.cfg",
            content: renderedTemplate,
            overwrite: true
        },
        {
            fileName: "printer.cfg",
            content: renderedPrinterCfg,
            overwrite: !await isPrinterCfgInitialized()
        }
    ]).map((f)=>{
        const fileWithExists = f;
        if (overwriteFiles?.includes(fileWithExists.fileName) || overwriteFiles?.includes("*")) {
            fileWithExists.overwrite = true;
        }
        fileWithExists.exists = (0,external_fs_.existsSync)(external_path_default().join(schema/* serverSchema.parse */.Rz.parse(process.env).KLIPPER_CONFIG_PATH, fileWithExists.fileName));
        return fileWithExists;
    });
};
const generateKlipperConfiguration = async (config, overwriteFiles)=>{
    const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
    const filesToWrite = await getFilesToWrite(config, overwriteFiles);
    const results = await Promise.all(filesToWrite.map(async (file)=>{
        let action = "created";
        try {
            await (0,external_util_.promisify)(external_fs_.access)(external_path_default().join(environment.KLIPPER_CONFIG_PATH, file.fileName), external_fs_.constants.F_OK);
            // At this point we know the file exists.
            if (file.overwrite) {
                // Make a back up.
                const backupFilename = `${file.fileName.split(".").slice(0, -1).join(".")}-${getTimeStamp()}.cfg`;
                try {
                    await (0,external_util_.promisify)(external_fs_.copyFile)(external_path_default().join(environment.KLIPPER_CONFIG_PATH, file.fileName), external_path_default().join(environment.KLIPPER_CONFIG_PATH, backupFilename));
                } catch (e) {
                    return {
                        fileName: file.fileName,
                        action: "error",
                        err: e
                    };
                }
                action = "overwritten";
            } else {
                // Skip this file.
                return {
                    fileName: file.fileName,
                    action: "skipped"
                };
            }
        } catch (e) {
            if (isNodeError(e) && e.code === "ENOENT") {
            // File does not exist, resume as normal.
            } else {
                // Unknown error, abort.
                return {
                    fileName: file.fileName,
                    action: "error",
                    err: e
                };
            }
        }
        try {
            await (0,external_util_.promisify)(external_fs_.writeFile)(external_path_default().join(environment.KLIPPER_CONFIG_PATH, file.fileName), file.content);
            return {
                fileName: file.fileName,
                action: action
            };
        } catch (e) {
            return {
                fileName: file.fileName,
                action: "error",
                err: e
            };
        }
    }));
    const errors = results.filter((r)=>r.action === "error");
    if (errors.length > 0) {
        throw new Error("Something went wrong when saving the configuration. The following files couldn't be written: " + errors.map((e)=>e.fileName).join(", "));
    }
    try {
        await (0,external_util_.promisify)(external_fs_.writeFile)(external_path_default().join(environment.RATOS_DATA_DIR, "last-printer-settings.json"), JSON.stringify(serializePrinterConfiguration(config)));
    } catch (e) {
        throw new Error("Couldn't backup your current printer settings to disk, but your klipper configuration has been generated.");
    }
    return results;
};
const loadSerializedConfig = async (filePath)=>{
    const configJson = (0,external_fs_.readFileSync)(filePath);
    const serializedConfig = SerializedPrinterConfiguration.parse(JSON.parse(configJson.toString()));
    const config = await deserializePrinterConfiguration(serializedConfig);
    return config;
};
const regenerateKlipperConfiguration = async (fromFile, overwriteFiles)=>{
    const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
    const filePath = fromFile ?? external_path_default().join(environment.RATOS_DATA_DIR, "last-printer-settings.json");
    if (!(0,external_fs_.existsSync)(filePath)) {
        throw new Error("Couldn't find printer settings file: " + filePath);
    }
    const config = await loadSerializedConfig(filePath);
    return await generateKlipperConfiguration(config, overwriteFiles);
};
const getToolhead = async (config, toolOrAxis, serialize)=>{
    const th = (0,serialization/* extractToolheadFromPrinterConfiguration */.Pw)(toolOrAxis, await deserializePartialPrinterConfiguration(config ?? {})) ?? null;
    if (th == null) {
        return null;
    }
    if (serialize === true) {
        return th.serialize();
    }
    return th;
};
const getToolheads = async (config, serialize)=>{
    const toolheads = (0,serialization/* extractToolheadsFromPrinterConfiguration */.s)(await deserializePartialPrinterConfiguration(config ?? {})) ?? null;
    if (toolheads == null) {
        return null;
    }
    if (serialize === true) {
        return toolheads.map((th)=>th.serialize());
    }
    return toolheads;
};
const printerRouter = (0,trpc/* router */.Nd)({
    printers: trpc/* publicProcedure.output */.$y.output(external_zod_.z.array(PrinterDefinitionWithResolvedToolheads)).query(async ()=>(await getPrinters(true)).sort((a, b)=>a.manufacturer === "Rat Rig" && (b.manufacturer !== "Rat Rig" || b.description.indexOf("Discontinued") > -1) ? -1 : a.name.localeCompare(b.name))),
    printer: trpc/* publicProcedure.input */.$y.input(external_zod_.z.string()).output(PrinterDefinitionWithResolvedToolheads.nullable()).query(async (ctx)=>{
        const printer = (await getPrinters()).find((p)=>p.id === ctx.input);
        if (printer) {
            printer.defaults.toolheads = await Promise.all(printer.defaults.toolheads.map((th)=>deserializeToolheadConfiguration(th, serializedPartialConfigFromPrinterDefinition(printer))));
        } else {
            return null;
        }
        return PrinterDefinitionWithResolvedToolheads.parse(printer);
    }),
    hotends: trpc/* publicProcedure.output */.$y.output(external_zod_.z.array(hardware/* Hotend */.Uy)).query(()=>parseDirectory("hotends", hardware/* Hotend */.Uy)),
    extruders: trpc/* publicProcedure.output */.$y.output(external_zod_.z.array(hardware/* Extruder */.U3)).query(()=>parseDirectory("extruders", hardware/* Extruder */.U3)),
    probes: trpc/* publicProcedure.output */.$y.output(external_zod_.z.array(hardware/* Probe */.lV)).query(()=>parseDirectory("z-probe", hardware/* Probe */.lV)),
    thermistors: trpc/* publicProcedure.query */.$y.query(()=>hardware/* thermistors.map */.b6.map(serialization/* stringToTitleObject */.DX)),
    xEndstops: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration_SerializedPartialPrinterConfiguration.nullable(),
        toolOrAxis: toolhead/* ToolOrAxis */.bi
    })).output(external_zod_.z.array(hardware/* Endstop */.ws)).query(async (ctx)=>xEndstopOptions(ctx.input.config, await getToolhead(ctx.input.config, ctx.input.toolOrAxis, true))),
    yEndstops: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration_SerializedPartialPrinterConfiguration.nullable(),
        toolOrAxis: toolhead/* ToolOrAxis */.bi
    })).output(external_zod_.z.array(hardware/* Endstop */.ws)).query(async (ctx)=>yEndstopOptions(ctx.input.config, await getToolhead(ctx.input.config, ctx.input.toolOrAxis, true))),
    partFanOptions: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration_SerializedPartialPrinterConfiguration.nullable(),
        toolOrAxis: toolhead/* ToolOrAxis */.bi
    })).output(external_zod_.z.array(hardware/* Fan */.XG)).query(async (ctx)=>partFanOptions(await deserializePartialPrinterConfiguration(ctx.input.config ?? {}), (await getToolhead(ctx.input.config, ctx.input.toolOrAxis))?.getConfig())),
    hotendFanOptions: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration_SerializedPartialPrinterConfiguration.nullable(),
        toolOrAxis: toolhead/* ToolOrAxis */.bi
    })).output(external_zod_.z.array(hardware/* Fan */.XG)).query(async (ctx)=>hotendFanOptions(await deserializePartialPrinterConfiguration(ctx.input.config ?? {}), (await getToolhead(ctx.input.config, ctx.input.toolOrAxis))?.getConfig())),
    controllerFanOptions: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration_SerializedPartialPrinterConfiguration.nullable()
    })).output(external_zod_.z.array(hardware/* Fan */.XG)).query(async (ctx)=>controllerFanOptions(await deserializePartialPrinterConfiguration(ctx.input.config ?? {}), (await getToolheads(ctx.input.config))?.map((th)=>th.getConfig()))),
    xAccelerometerOptions: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration_SerializedPartialPrinterConfiguration.nullable(),
        toolOrAxis: toolhead/* ToolOrAxis */.bi
    })).output(external_zod_.z.array(hardware/* Accelerometer */.M3)).query(async (ctx)=>xAccelerometerOptions(await deserializePartialPrinterConfiguration(ctx.input.config ?? {}), (await getToolhead(ctx.input.config, ctx.input.toolOrAxis))?.getConfig())),
    yAccelerometerOptions: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: printer_configuration_SerializedPartialPrinterConfiguration.nullable(),
        toolOrAxis: toolhead/* ToolOrAxis */.bi
    })).output(external_zod_.z.array(hardware/* Accelerometer */.M3)).query(async (ctx)=>yAccelerometerOptions(await deserializePartialPrinterConfiguration(ctx.input.config ?? {}), (await getToolhead(ctx.input.config, ctx.input.toolOrAxis))?.getConfig())),
    deserializeToolheadConfiguration: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: toolhead/* SerializedToolheadConfiguration */.Qk,
        printerConfig: printer_configuration_SerializedPartialPrinterConfiguration.optional()
    })).query(async (ctx)=>{
        return await deserializeToolheadConfiguration(ctx.input.config, ctx.input.printerConfig ?? {});
    }),
    printercfgStatus: trpc/* publicProcedure.query */.$y.query(async ()=>{
        return {
            isInitialized: await isPrinterCfgInitialized()
        };
    }),
    regenerateConfiguration: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        overwriteFiles: external_zod_.z.array(external_zod_.z.string()).optional()
    })).mutation(async ({ input  })=>{
        const res = await regenerateKlipperConfiguration(undefined, input.overwriteFiles);
        if (res.some((r)=>r.action === "created" || r.action === "overwritten")) {
            klipperRestart();
        }
        return res;
    }),
    // Has to be a mutation as printer config is too large for url string.
    getFilesToWrite: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: SerializedPrinterConfiguration
    })).mutation(async (ctx)=>{
        const { config: serializedConfig  } = ctx.input;
        const config = await deserializePrinterConfiguration(serializedConfig);
        return (await getFilesToWrite(config)).map((f)=>{
            return {
                fileName: f.fileName,
                exists: f.exists,
                overwrite: f.overwrite
            };
        });
    }),
    saveConfiguration: trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: SerializedPrinterConfiguration,
        overwriteFiles: external_zod_.z.array(external_zod_.z.string()).optional()
    })).mutation(async (ctx)=>{
        const { config: serializedConfig , overwriteFiles  } = ctx.input;
        const config = await deserializePrinterConfiguration(serializedConfig);
        const configResult = await generateKlipperConfiguration(config, overwriteFiles);
        klipperRestart();
        return configResult;
    })
});


/***/ }),

/***/ 8199:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 3977:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Ak": () => (/* binding */ deserializePrinterRail),
  "Oj": () => (/* binding */ deserializePrinterRailDefinition),
  "Pw": () => (/* binding */ extractToolheadFromPrinterConfiguration),
  "s": () => (/* binding */ extractToolheadsFromPrinterConfiguration),
  "Yz": () => (/* binding */ serializePrinterRail),
  "m6": () => (/* binding */ serializeToolheadConfiguration),
  "DX": () => (/* binding */ stringToTitleObject)
});

// UNUSED EXPORTS: deserializeDriver, deserializeStepper, serializePartialToolheadConfiguration

// EXTERNAL MODULE: external "zod"
var external_zod_ = __webpack_require__(8316);
// EXTERNAL MODULE: ./zods/motion.tsx
var motion = __webpack_require__(6734);
;// CONCATENATED MODULE: ./data/drivers.ts


const Drivers = external_zod_.z.array(motion/* Driver */.HB).parse([
    {
        id: "BTT-TMC2209-13",
        title: "BTT TMC2209 v1.3",
        type: "TMC2209",
        protocol: "UART",
        senseResistor: 0.11,
        coolingCurrentThreshold: 1.1,
        voltages: [
            24
        ],
        maxCurrent: 2.0
    },
    {
        id: "BTT-TMC2226-10",
        title: "BTT TMC2226 v1.0",
        type: "TMC2209",
        protocol: "UART",
        senseResistor: 0.11,
        coolingCurrentThreshold: 1.1,
        voltages: [
            24
        ],
        maxCurrent: 2.0
    },
    {
        id: "BTT-TMC5160-PRO-11",
        title: "BTT TMC5160(T) Pro v1.1",
        type: "TMC5160",
        protocol: "SPI",
        senseResistor: 0.075,
        voltages: [
            24,
            36,
            48,
            56
        ],
        maxCurrent: 3,
        coolingCurrentThreshold: 1.5
    },
    {
        id: "BTT-TMC5160T-PLUS-10",
        title: "BTT TMC5160T Plus v1.0",
        type: "TMC5160",
        protocol: "SPI",
        senseResistor: 0.022,
        voltages: [
            24,
            36,
            48,
            56,
            60
        ],
        maxCurrent: 10.6,
        coolingCurrentThreshold: 3,
        external: true
    },
    {
        id: "BTT-EZ2209",
        title: "BTT EZ2209",
        type: "TMC2209",
        protocol: "UART",
        senseResistor: 0.11,
        coolingCurrentThreshold: 1.3,
        voltages: [
            24
        ],
        maxCurrent: 2.0
    },
    {
        id: "BTT-EZ2226",
        title: "BTT EZ2226",
        type: "TMC2209",
        protocol: "UART",
        senseResistor: 0.11,
        coolingCurrentThreshold: 1.3,
        voltages: [
            24
        ],
        maxCurrent: 2.0
    },
    {
        id: "BTT-EZ2130",
        title: "BTT EZ2130",
        type: "TMC2130",
        protocol: "SPI",
        senseResistor: 0.11,
        coolingCurrentThreshold: 0.9,
        voltages: [
            24
        ],
        maxCurrent: 2.0
    },
    {
        id: "BTT-EZ5160-PRO",
        title: "BTT EZ5160 Pro",
        type: "TMC5160",
        protocol: "SPI",
        senseResistor: 0.075,
        coolingCurrentThreshold: 1.6,
        voltages: [
            24,
            36,
            48
        ],
        maxCurrent: 2.5
    },
    {
        id: "BTT-EZ5160-RGB",
        title: "BTT EZ5160 RGB",
        type: "TMC5160",
        protocol: "SPI",
        senseResistor: 0.05,
        coolingCurrentThreshold: 3,
        voltages: [
            24,
            48,
            36,
            56
        ],
        maxCurrent: 4.7
    },
    {
        id: "MELLOW-FLY-HV-TMC5160-PRO-12",
        title: "Mellow FLY HV TMC5160 Pro v1.2",
        type: "TMC5160",
        protocol: "SPI",
        senseResistor: 0.033,
        coolingCurrentThreshold: 3,
        voltages: [
            24,
            36,
            48
        ],
        maxCurrent: 4.25,
        external: true
    },
    {
        id: "MELLOW-FLY-TMC2209",
        title: "Mellow FLY TMC2209",
        type: "TMC2209",
        protocol: "UART",
        senseResistor: 0.11,
        coolingCurrentThreshold: 1.1,
        voltages: [
            24
        ],
        maxCurrent: 2.0
    },
    {
        id: "PRUSA-EINSY-RAMBO-TMC2130",
        title: "Prusa Einsy Rambo TMC2130",
        type: "TMC2130",
        protocol: "SPI",
        senseResistor: 0.22,
        coolingCurrentThreshold: 0.9,
        voltages: [
            24
        ],
        maxCurrent: 2.0
    },
    {
        id: "PRUSA-BUDDY-TMC2209",
        title: "Prusa Buddy TMC2209",
        type: "TMC2209",
        protocol: "UART",
        senseResistor: 0.11,
        coolingCurrentThreshold: 1.1,
        voltages: [
            24
        ],
        maxCurrent: 2.0
    }
]);

// EXTERNAL MODULE: ./data/steppers.ts
var steppers = __webpack_require__(8441);
// EXTERNAL MODULE: ./zods/toolhead.tsx
var toolhead = __webpack_require__(2493);
// EXTERNAL MODULE: ./helpers/toolhead.ts
var helpers_toolhead = __webpack_require__(4204);
;// CONCATENATED MODULE: ./utils/serialization.ts





const deserializeDriver = (driverId)=>{
    return Drivers.find((d)=>d.id === driverId) ?? null;
};
const deserializeStepper = (stepperId)=>{
    return steppers/* Steppers.find */.B.find((d)=>d.id === stepperId) ?? null;
};
const deserializePrinterRail = (rail)=>{
    const stepper = deserializeStepper(rail.stepper);
    const driver = deserializeDriver(rail.driver);
    if (stepper == null) {
        throw new Error(`Stepper ${rail.stepper} not found in database`);
    }
    if (driver == null) {
        throw new Error(`Driver ${rail.driver} not found in database`);
    }
    return motion/* BasePrinterRail.parse */.g6.parse({
        ...rail,
        stepper,
        driver
    });
};
const deserializePrinterRailDefinition = (rail)=>{
    const stepper = deserializeStepper(rail.stepper);
    const driver = deserializeDriver(rail.driver);
    if (stepper == null) {
        throw new Error(`Stepper ${rail.stepper} not found in database`);
    }
    if (driver == null) {
        throw new Error(`Driver ${rail.driver} not found in database`);
    }
    return motion/* PrinterRailDefinition.parse */.P6.parse({
        ...rail,
        stepper,
        driver
    });
};
const stringToTitleObject = (data)=>{
    return {
        id: data,
        title: data
    };
};
const serializePrinterRail = (rail)=>{
    return motion/* SerializedPrinterRail.parse */.Ah.parse({
        ...rail,
        driver: rail.driver.id,
        stepper: rail.stepper.id
    });
};
const serializeToolheadConfiguration = (th)=>{
    return {
        ...th,
        toolboard: th.toolboard?.id,
        hotend: th.hotend.id,
        thermistor: th.thermistor,
        extruder: th.extruder.id,
        probe: th.probe?.id,
        xEndstop: th.xEndstop.id,
        yEndstop: th.yEndstop.id,
        partFan: th.partFan.id,
        hotendFan: th.hotendFan.id,
        xAccelerometer: th.xAccelerometer?.id,
        yAccelerometer: th.yAccelerometer?.id
    };
};
const serializePartialToolheadConfiguration = (th)=>{
    return th == null ? undefined : {
        ...th,
        toolboard: th.toolboard?.id,
        hotend: th.hotend?.id,
        thermistor: th.thermistor,
        extruder: th.extruder?.id,
        probe: th.probe?.id,
        xEndstop: th.xEndstop?.id,
        yEndstop: th.yEndstop?.id,
        partFan: th.partFan?.id,
        hotendFan: th.hotendFan?.id,
        xAccelerometer: th.xAccelerometer?.id,
        yAccelerometer: th.yAccelerometer?.id
    };
};
const extractToolheadsFromPrinterConfiguration = (config)=>{
    const toolheads = config?.toolheads?.map((th)=>{
        if (th == null) {
            throw new Error("Toolhead can not be null");
        }
        return new helpers_toolhead/* ToolheadHelper */.D(toolhead/* ToolheadConfiguration.parse */.x8.parse(th));
    }).filter(Boolean);
    if (toolheads == null) {
        throw new Error("No toolheads found");
    }
    return toolheads;
};
const extractToolheadFromPrinterConfiguration = (toolOrAxis, config)=>{
    if (config?.toolheads == null || config.toolheads.length === 0) {
        throw new Error("No toolheads preset in supplied printer config");
    }
    const toolheads = extractToolheadsFromPrinterConfiguration(config);
    const th = typeof toolOrAxis === "number" ? toolheads.find((th)=>th.getTool() === toolOrAxis) : toolheads.find((th)=>th.getExtruderAxis() === toolOrAxis || th.getMotionAxis() === toolOrAxis);
    return th;
};


/***/ }),

/***/ 1346:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$l": () => (/* binding */ Board),
/* harmony export */   "AN": () => (/* binding */ AutoFlashableBoard),
/* harmony export */   "Ai": () => (/* binding */ BoardWithDetectionStatus),
/* harmony export */   "Fh": () => (/* binding */ ExtruderlessControlBoardPinMap),
/* harmony export */   "MG": () => (/* binding */ Toolboard),
/* harmony export */   "MO": () => (/* binding */ reversePinLookup),
/* harmony export */   "MW": () => (/* binding */ ControlBoardPinMap),
/* harmony export */   "Oy": () => (/* binding */ ToolboardPinMap),
/* harmony export */   "WX": () => (/* binding */ SPIPins),
/* harmony export */   "X2": () => (/* binding */ UARTPins),
/* harmony export */   "_u": () => (/* binding */ hasSPI),
/* harmony export */   "m9": () => (/* binding */ ToolboardWithDetectionStatus),
/* harmony export */   "uh": () => (/* binding */ hasUART)
/* harmony export */ });
/* unused harmony exports PinMap, MotorSlot, MotorSlotKey */
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
    x1_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    x1_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    x1_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    x1_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    x1_diag_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    x1_endstop_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    dual_carriage_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    dual_carriage_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    dual_carriage_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    dual_carriage_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    dual_carriage_diag_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    dual_carriage_endstop_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y_diag_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y_endstop_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y1_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y1_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y1_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y1_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y1_diag_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y1_endstop_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y2_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y2_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y2_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y2_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y2_diag_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    y2_endstop_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
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
const ExtruderlessControlBoardPinMap = PinMap.extend({
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
    z1_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    z1_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    z1_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    z1_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    z2_step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    z2_dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    z2_enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    z2_uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
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
const UARTPins = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    uart_address: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    rx_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    tx_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional()
});
const SPIPins = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    cs_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
}).and(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    spi_bus: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
}).or(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    spi_software_mosi_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    spi_software_miso_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    spi_software_sclk_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional()
})));
const hasSPI = (slot)=>{
    return SPIPins.safeParse(slot).success;
};
const hasUART = (slot)=>{
    return UARTPins.safeParse(slot).success;
};
const MotorSlot = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    title: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    step_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    dir_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    enable_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    diag_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    endstop_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    // UART
    uart_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    uart_address: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    rx_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    tx_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    // SPI
    cs_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    spi_bus: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    spi_software_mosi_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    spi_software_miso_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    spi_software_sclk_pin: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional()
}).refine((slot)=>{
    return hasSPI(slot) || hasUART(slot);
}, {
    message: "Motor slot must have either SPI or UART pins"
});
const AnySlotPin = MotorSlot.innerType().omit({
    title: true
}).partial();
const MotorSlotKey = zod__WEBPACK_IMPORTED_MODULE_0__.z.string();
const reversePinLookup = (pins, board)=>{
    const slots = Object.entries(board.motorSlots ?? {});
    for (const [key, slot] of slots){
        if (Object.entries(pins).every(([pin, value])=>slot[pin] === value)) {
            return key;
        }
    }
    return undefined;
};
const Board = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    id: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    isToolboard: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
    isHost: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
    serialPath: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
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
    alternativePT1000Resistor: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().optional(),
    motorSlots: zod__WEBPACK_IMPORTED_MODULE_0__.z.record(MotorSlotKey, MotorSlot).optional(),
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
    id: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    disableAutoFlash: zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(false).optional(),
    isToolboard: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().optional(),
    compileScript: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    flashScript: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    path: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
const Toolboard = Board.extend({
    isToolboard: zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(true),
    isHost: zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(false).optional(),
    integratedDrivers: Board.shape.integratedDrivers.and(zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        [_motion__WEBPACK_IMPORTED_MODULE_1__/* .PrinterAxis.extruder */ .po.extruder]: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
    }))
});
const ToolboardWithDetectionStatus = Toolboard.extend({
    detected: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean()
});


/***/ }),

/***/ 2174:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "M3": () => (/* binding */ Accelerometer),
/* harmony export */   "Mf": () => (/* binding */ Thermistor),
/* harmony export */   "U3": () => (/* binding */ Extruder),
/* harmony export */   "Uy": () => (/* binding */ Hotend),
/* harmony export */   "XG": () => (/* binding */ Fan),
/* harmony export */   "b6": () => (/* binding */ thermistors),
/* harmony export */   "lV": () => (/* binding */ Probe),
/* harmony export */   "ws": () => (/* binding */ Endstop)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _env_schema_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(954);
/* harmony import */ var _motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6734);



const thermistors = [
    "EPCOS 100K B57560G104F",
    "ATC Semitec 104GT-2",
    "ATC Semitec 104NT-4-R025H42G",
    "Generic 3950",
    "Honeywell 100K 135-104LAG-J01",
    "NTC 100K MGB18-104F39050L32",
    "SliceEngineering 450",
    "TDK NTCG104LH104JT1",
    "PT1000"
];
let startsWithServerValidation = "";
if (process.env.RATOS_CONFIGURATION_PATH) {
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_1__/* .serverSchema.parse */ .Rz.parse(process.env);
    startsWithServerValidation = environment.RATOS_CONFIGURATION_PATH;
}
const hardwareType = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    path: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().startsWith(startsWithServerValidation).endsWith(".cfg"),
    id: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
const Thermistor = zod__WEBPACK_IMPORTED_MODULE_0__.z["enum"](thermistors);
const Hotend = hardwareType.extend({
    type: zod__WEBPACK_IMPORTED_MODULE_0__.z.literal("hotend"),
    title: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    thermistor: zod__WEBPACK_IMPORTED_MODULE_0__.z["enum"](thermistors)
});
const Extruder = hardwareType.extend({
    type: zod__WEBPACK_IMPORTED_MODULE_0__.z.literal("extruder"),
    stepper: _motion__WEBPACK_IMPORTED_MODULE_2__/* .Stepper.shape.id.optional */ .vF.shape.id.optional(),
    current: _motion__WEBPACK_IMPORTED_MODULE_2__/* .PrinterRailDefinition.shape.current.optional */ .P6.shape.current.optional(),
    title: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
const Probe = hardwareType.extend({
    type: zod__WEBPACK_IMPORTED_MODULE_0__.z.literal("static-probe").or(zod__WEBPACK_IMPORTED_MODULE_0__.z.literal("stowable-probe")),
    title: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
const Endstop = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    id: zod__WEBPACK_IMPORTED_MODULE_0__.z["enum"]([
        "endstop",
        "endstop-toolboard",
        "sensorless"
    ]),
    title: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
const Accelerometer = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    id: zod__WEBPACK_IMPORTED_MODULE_0__.z["enum"]([
        "toolboard",
        "controlboard",
        "sbc",
        "none"
    ]),
    title: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});
const Fan = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    id: zod__WEBPACK_IMPORTED_MODULE_0__.z["enum"]([
        "2pin",
        "4pin",
        "4pin-dedicated",
        "2pin-toolboard",
        "4pin-toolboard",
        "4pin-dedicated-toolboard"
    ]),
    title: zod__WEBPACK_IMPORTED_MODULE_0__.z.string()
});


/***/ }),

/***/ 6734:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
    PrinterAxis["dual_carriage"] = "dual_carriage";
    PrinterAxis["x1"] = "x1";
    PrinterAxis["y"] = "y";
    PrinterAxis["y1"] = "y1";
    PrinterAxis["y2"] = "y2";
    PrinterAxis["z"] = "z";
    PrinterAxis["z1"] = "z1";
    PrinterAxis["z2"] = "z2";
    PrinterAxis["z3"] = "z3";
    PrinterAxis["extruder"] = "extruder";
    PrinterAxis["extruder1"] = "extruder1";
})(PrinterAxis || (PrinterAxis = {}));
const BasePrinterRail = zod__WEBPACK_IMPORTED_MODULE_0__.object({
    axis: zod__WEBPACK_IMPORTED_MODULE_0__.nativeEnum(PrinterAxis).describe("Axis of the rail"),
    axisDescription: zod__WEBPACK_IMPORTED_MODULE_0__.string().optional().describe("Description of the axis"),
    driver: Driver.describe("Stepper driver used on this axis"),
    voltage: Voltage.default(StepperVoltage["24V"]).describe("Voltage of the stepper driver"),
    stepper: Stepper.describe("Stepper motor connected to this axis"),
    motorSlot: zod__WEBPACK_IMPORTED_MODULE_0__.string().optional().describe("Optional board motor slot of the stepper driver"),
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


/***/ }),

/***/ 2493:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PY": () => (/* binding */ BaseToolheadConfiguration),
/* harmony export */   "Qk": () => (/* binding */ SerializedToolheadConfiguration),
/* harmony export */   "Qr": () => (/* binding */ ToolNumber),
/* harmony export */   "ZF": () => (/* binding */ SerializedPartialToolheadConfiguration),
/* harmony export */   "b2": () => (/* binding */ PartialToolheadConfiguration),
/* harmony export */   "bi": () => (/* binding */ ToolOrAxis),
/* harmony export */   "x8": () => (/* binding */ ToolheadConfiguration)
/* harmony export */ });
/* unused harmony export ToolAxis */
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _boards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1346);
/* harmony import */ var _hardware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2174);
/* harmony import */ var _motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6734);




const BaseToolheadConfiguration = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    hotend: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Hotend */ .Uy,
    thermistor: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Thermistor */ .Mf,
    extruder: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Extruder */ .U3,
    xEndstop: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Endstop */ .ws,
    yEndstop: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Endstop */ .ws,
    hotendFan: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Fan */ .XG,
    partFan: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Fan */ .XG,
    xAccelerometer: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Accelerometer.optional */ .M3.optional().nullable(),
    yAccelerometer: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Accelerometer.optional */ .M3.optional().nullable(),
    toolboard: _boards__WEBPACK_IMPORTED_MODULE_1__/* .Toolboard.nullable */ .MG.nullable(),
    probe: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Probe.optional */ .lV.optional(),
    axis: zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(_motion__WEBPACK_IMPORTED_MODULE_3__/* .PrinterAxis.x */ .po.x).or(zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(_motion__WEBPACK_IMPORTED_MODULE_3__/* .PrinterAxis.dual_carriage */ .po.dual_carriage)),
    description: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().optional(),
    toolNumber: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().optional()
}).strict();
const ToolNumber = zod__WEBPACK_IMPORTED_MODULE_0__.z.union([
    zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(0),
    zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(1)
]);
const ToolAxis = zod__WEBPACK_IMPORTED_MODULE_0__.z.union([
    zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(_motion__WEBPACK_IMPORTED_MODULE_3__/* .PrinterAxis.x */ .po.x),
    zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(_motion__WEBPACK_IMPORTED_MODULE_3__/* .PrinterAxis.dual_carriage */ .po.dual_carriage),
    zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(_motion__WEBPACK_IMPORTED_MODULE_3__/* .PrinterAxis.extruder */ .po.extruder),
    zod__WEBPACK_IMPORTED_MODULE_0__.z.literal(_motion__WEBPACK_IMPORTED_MODULE_3__/* .PrinterAxis.extruder1 */ .po.extruder1)
]);
const ToolOrAxis = zod__WEBPACK_IMPORTED_MODULE_0__.z.union([
    ToolAxis,
    ToolNumber
]);
const ToolheadConfiguration = BaseToolheadConfiguration.refine((data)=>data.toolboard !== null || data.xEndstop.id !== "endstop-toolboard", "Cannot use toolboard endstop without a toolboard").refine((data)=>data.toolboard !== null || ![
        "2pin-toolboard",
        "4pin-toolboard",
        "4pin-dedicated-toolboard"
    ].includes(data.hotendFan.id), "Cannot use toolboard hotend fan without a toolboard").refine((data)=>data.toolboard !== null || ![
        "2pin-toolboard",
        "4pin-toolboard",
        "4pin-dedicated-toolboard"
    ].includes(data.partFan.id), "Cannot use toolboard part cooling fan without a toolboard");
const PartialToolheadConfiguration = BaseToolheadConfiguration.partial().optional();
const SerializedToolheadConfiguration = BaseToolheadConfiguration.extend({
    hotend: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Hotend.shape.id */ .Uy.shape.id,
    extruder: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Extruder.shape.id */ .U3.shape.id,
    thermistor: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Thermistor */ .Mf,
    xEndstop: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Endstop.shape.id */ .ws.shape.id,
    yEndstop: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Endstop.shape.id */ .ws.shape.id,
    hotendFan: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Fan.shape.id */ .XG.shape.id,
    partFan: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Fan.shape.id */ .XG.shape.id,
    xAccelerometer: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Accelerometer.shape.id.optional */ .M3.shape.id.optional().nullable(),
    yAccelerometer: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Accelerometer.shape.id.optional */ .M3.shape.id.optional().nullable(),
    toolboard: _boards__WEBPACK_IMPORTED_MODULE_1__/* .Toolboard.shape.serialPath.optional */ .MG.shape.serialPath.optional().nullable(),
    probe: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Probe.shape.id.optional */ .lV.shape.id.optional().nullable()
}).strict();
const SerializedPartialToolheadConfiguration = SerializedToolheadConfiguration.partial().optional();


/***/ }),

/***/ 954:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Rz": () => (/* binding */ serverSchema)
/* harmony export */ });
/* unused harmony exports clientSchema, clientEnv */
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