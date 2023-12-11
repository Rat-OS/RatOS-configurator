exports.id = 922;
exports.ids = [922];
exports.modules = {

/***/ 5866:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
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
		680,
		263
	],
	"./v-core-3.ts": [
		9263,
		680,
		263
	],
	"./v-core-pro": [
		1028,
		680,
		28
	],
	"./v-core-pro.ts": [
		1028,
		680,
		28
	],
	"./v-minion": [
		2525,
		680,
		525
	],
	"./v-minion.ts": [
		2525,
		680,
		525
	],
	"./voron-v01": [
		1881,
		680,
		881
	],
	"./voron-v01.ts": [
		1881,
		680,
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

/***/ 6477:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "j": () => (/* binding */ getLogger)
/* harmony export */ });
/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8545);
/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pino__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var pino_pretty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3009);
/* harmony import */ var pino_pretty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(pino_pretty__WEBPACK_IMPORTED_MODULE_1__);


let logger = null;
const getLogger = ()=>{
    if (logger != null) {
        return logger;
    }
    if (process.env.LOG_FILE == null) {
        throw new Error("No LOG_FILE specified in environment");
    }
    const transportOption =  false ? 0 : {
        target: "pino/file",
        options: {
            destination: process.env.LOG_FILE,
            append: false
        }
    };
    const stream = pino_pretty__WEBPACK_IMPORTED_MODULE_1___default()({
        colorize: true
    });
    logger = pino__WEBPACK_IMPORTED_MODULE_0___default()(stream);
    return logger;
};


/***/ }),

/***/ 2922:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "VZ": () => (/* binding */ getPrinters),
  "Cu": () => (/* binding */ printerRouter)
});

// UNUSED EXPORTS: deserializePartialPrinterConfiguration, deserializePrinterConfiguration, parseDirectory, regenerateKlipperConfiguration

// EXTERNAL MODULE: external "zod"
var external_zod_ = __webpack_require__(8316);
// EXTERNAL MODULE: ./helpers/logger.ts
var logger = __webpack_require__(6477);
// EXTERNAL MODULE: external "util"
var external_util_ = __webpack_require__(3837);
// EXTERNAL MODULE: external "child_process"
var external_child_process_ = __webpack_require__(2081);
// EXTERNAL MODULE: external "path"
var external_path_ = __webpack_require__(1017);
var external_path_default = /*#__PURE__*/__webpack_require__.n(external_path_);
// EXTERNAL MODULE: ./zods/boards.tsx
var boards = __webpack_require__(1346);
// EXTERNAL MODULE: ./helpers/util.ts
var util = __webpack_require__(2633);
;// CONCATENATED MODULE: ./helpers/metadata.ts





const parseMetadata = async (cfgFile, zod)=>{
    if (cfgFile.trim() === "") return null;
    const hashmarkPrefixedJson = await (0,external_util_.promisify)(external_child_process_.exec)(`sed -n '/^# {/{:a; N; /\\n# }/!ba; p}' ${cfgFile}`);
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
        content.id = fileName;
        return zod.parse(content);
    } catch (e) {
        if (e instanceof Error) {
            console.log(e.message);
        }
        throw new Error("Failed to parse JSON from file: " + cfgFile + " with content: " + jsonArray.join("\n"));
    }
};
const _parsePinValue = (value)=>{
    if (value === "null") {
        return undefined;
    }
    if (value.startsWith("<") && value.endsWith(">")) {
        return undefined;
    }
    return value;
};
const _parsePinAlias = async (file)=>{
    const scriptRoot = (0,util/* getScriptRoot */.x)();
    const configUnparsed = await (0,external_util_.promisify)(external_child_process_.exec)(`python3 ${external_path_default().join(scriptRoot, "initojson.py")} ${file}`);
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
        pins[frags[0]] = _parsePinValue(frags[1]);
    });
    return pins;
};
const exportBoardPinAlias = (name, pins, mcu)=>{
    const aliases = Object.keys(pins).map((k, i)=>{
        if (pins[k] == null) {
            return k + "=null";
        }
        return k + "=" + pins[k];
    });
    const result = [
        `[board_pins ${name}]`
    ];
    if (mcu != null) {
        result.push(`mcu: ${mcu}`);
    }
    result.push(`aliases:`, `\t${aliases.join(",\n	")}`);
    return result.join("\n");
};
const parseBoardConfig = async (board, extruderLess)=>{
    let file = external_path_default().join(board.path, board.isToolboard ? "toolboard-config.cfg" : extruderLess && board.extruderlessConfig != null ? board.extruderlessConfig : "config.cfg");
    const zod = board.isToolboard ? boards/* ToolboardPinMap */.Oy : boards/* ControlBoardPinMap */.MW;
    return zod.parse(await _parsePinAlias(file));
};

// EXTERNAL MODULE: ./env/schema.mjs
var schema = __webpack_require__(954);
// EXTERNAL MODULE: ./zods/motion.tsx
var motion = __webpack_require__(6734);
;// CONCATENATED MODULE: ./zods/hardware.tsx



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
    const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
    startsWithServerValidation = environment.RATOS_CONFIGURATION_PATH;
}
const hardwareType = external_zod_.z.object({
    path: external_zod_.z.string().startsWith(startsWithServerValidation).endsWith(".cfg"),
    id: external_zod_.z.string().endsWith(".cfg")
});
const Thermistor = external_zod_.z["enum"](thermistors);
const Hotend = hardwareType.extend({
    type: external_zod_.z.literal("hotend"),
    title: external_zod_.z.string(),
    thermistor: external_zod_.z["enum"](thermistors)
});
const Extruder = hardwareType.extend({
    type: external_zod_.z.literal("extruder"),
    stepper: motion/* Stepper.shape.id.optional */.vF.shape.id.optional(),
    current: motion/* PrinterRailDefinition.shape.current.optional */.P6.shape.current.optional(),
    title: external_zod_.z.string()
});
const Probe = hardwareType.extend({
    type: external_zod_.z.literal("static-probe").or(external_zod_.z.literal("stowable-probe")),
    title: external_zod_.z.string()
});
const Endstop = external_zod_.z.object({
    id: external_zod_.z["enum"]([
        "endstop",
        "endstop-toolboard",
        "sensorless"
    ]),
    title: external_zod_.z.string()
});
const Accelerometer = external_zod_.z.object({
    id: external_zod_.z["enum"]([
        "toolboard",
        "controlboard",
        "sbc",
        "none"
    ]),
    title: external_zod_.z.string()
});
const Fan = external_zod_.z.object({
    id: external_zod_.z["enum"]([
        "2pin",
        "4pin",
        "4pin-dedicated",
        "2pin-toolboard",
        "4pin-toolboard",
        "4pin-dedicated-toolboard"
    ]),
    title: external_zod_.z.string()
});

// EXTERNAL MODULE: external "fs"
var external_fs_ = __webpack_require__(7147);
;// CONCATENATED MODULE: ./zods/printer.tsx




let printer_startsWithServerValidation = "";
if (process.env.RATOS_CONFIGURATION_PATH) {
    const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
    printer_startsWithServerValidation = external_path_default().join(environment.RATOS_CONFIGURATION_PATH, "printers");
}
const SpeedLimits = external_zod_.z.object({
    velocity: external_zod_.z.number().min(0).describe("Maximum velocity for this printer"),
    accel: external_zod_.z.number().min(0).describe("Maximum acceleration for this printer"),
    z_velocity: external_zod_.z.number().min(0).describe("Maximum z velocity for this printer"),
    z_accel: external_zod_.z.number().min(0).describe("Maximum z acceleration for this printer"),
    square_corner_velocity: external_zod_.z.number().min(0).default(5).describe("Maximum square corner velocity for this printer")
});
const Printer = external_zod_.z.object({
    id: external_zod_.z.string(),
    name: external_zod_.z.string().describe("The name of the printer"),
    description: external_zod_.z.string().describe("A description of the printer"),
    manufacturer: external_zod_.z.string().describe("The name of the manufacturer of this printer"),
    documentationLink: external_zod_.z.string().describe("Link to the RatOS documentation for this printer"),
    image: external_zod_.z.string().describe("Link to an image of the printer"),
    sizes: external_zod_.z.array(external_zod_.z.number()).describe("Size options for this printer").optional(),
    template: external_zod_.z.string().describe("Printer.cfg template for this printer"),
    path: external_zod_.z.string().startsWith(printer_startsWithServerValidation),
    driverCountRequired: external_zod_.z.number().describe("Number of drivers required for this printer"),
    speedLimits: external_zod_.z.object({
        basic: SpeedLimits,
        performance: SpeedLimits.optional()
    }).describe("Speed limits for this printer"),
    defaults: external_zod_.z.object({
        extruder: external_zod_.z.string().describe("Default extruder for this printer. Should be the name of the config without the file extension."),
        board: external_zod_.z.string().describe("Default board for this printer. Should be the name of the board directory."),
        toolboard: external_zod_.z.string().describe("Default toolboard for this printer. Should be the name of the board directory.").optional(),
        hotend: external_zod_.z.string().describe("Default hotend for this printer. Should be the name of the config without the file extension."),
        probe: external_zod_.z.string().describe("Default probe for this printer. Should be the name of the config without the file extension.").optional(),
        xEndstop: external_zod_.z["enum"]([
            "endstop",
            "endstop-toolboard",
            "sensorless"
        ]).describe("Default x endstop for this printer"),
        yEndstop: external_zod_.z["enum"]([
            "sensorless",
            "endstop"
        ]).describe("Default y endstop for this printer"),
        rails: external_zod_.z.array(motion/* SerializedPrinterRailDefinition */.r).describe("Default rails for this printer")
    }).describe("Default hardware for this printer")
}).describe("A RatOS supported 3d printer");

;// CONCATENATED MODULE: ./zods/printer-configuration.tsx





const BasePrinterConfiguration = external_zod_.z.object({
    printer: Printer,
    hotend: Hotend,
    thermistor: Thermistor,
    extruder: Extruder,
    probe: Probe.optional(),
    xEndstop: Endstop,
    yEndstop: Endstop,
    controlboard: boards/* Board */.$l,
    toolboard: boards/* Board.optional */.$l.optional().nullable(),
    size: external_zod_.z.number().optional().nullable(),
    partFan: Fan,
    controllerFan: Fan,
    hotendFan: Fan,
    xAccelerometer: Accelerometer.optional().nullable(),
    yAccelerometer: Accelerometer.optional().nullable(),
    performanceMode: external_zod_.z.boolean().default(false),
    stealthchop: external_zod_.z.boolean().default(false),
    standstillStealth: external_zod_.z.boolean().default(false),
    rails: external_zod_.z.array(motion/* PrinterRail */.JQ)
});
const printer_configuration_PrinterConfiguration = BasePrinterConfiguration.refine((data)=>data.size == null || (data.printer.sizes?.length ?? 0) > 0 && data.size != null, "Printer size must be provided if printer has size options, otherwise it must be omitted").refine((data)=>data.toolboard !== null || data.xEndstop.id !== "endstop-toolboard", "Cannot use toolboard endstop without a toolboard").refine((data)=>data.controlboard.driverCount >= data.printer.driverCountRequired || data.toolboard != null, "You have to select a toolboard to use this printer and controlboard combo");
const SerializedPrinterConfiguration = BasePrinterConfiguration.extend({
    printer: Printer.shape.id,
    hotend: Hotend.shape.id,
    thermistor: Thermistor,
    extruder: Extruder.shape.id,
    probe: Probe.shape.id.optional().nullable(),
    xEndstop: Endstop.shape.id,
    yEndstop: Endstop.shape.id,
    controlboard: boards/* Board.shape.serialPath */.$l.shape.serialPath,
    toolboard: boards/* Board.shape.serialPath.optional */.$l.shape.serialPath.optional().nullable(),
    partFan: Fan.shape.id,
    controllerFan: Fan.shape.id,
    hotendFan: Fan.shape.id,
    xAccelerometer: Accelerometer.shape.id.optional().nullable(),
    yAccelerometer: Accelerometer.shape.id.optional().nullable(),
    rails: external_zod_.z.array(motion/* SerializedPrinterRail */.Ah)
});
const PartialPrinterConfiguration = printer_configuration_PrinterConfiguration.innerType().innerType().innerType().partial().optional();
const printer_configuration_SerializedPartialPrinterConfiguration = SerializedPrinterConfiguration.partial();

;// CONCATENATED MODULE: ./data/endstops.ts
const xEndstopOptions = (config)=>{
    const endstops = [
        {
            id: "endstop",
            title: "Physical Endstop"
        },
        {
            id: "sensorless",
            title: "Sensorless Homing"
        }
    ];
    if (config?.toolboard != null) {
        endstops.splice(1, 0, {
            id: "endstop-toolboard",
            title: "Physical Endstop (toolboard)"
        });
    }
    return endstops;
};
const defaultXEndstop = {
    id: "endstop",
    title: "Physical Endstop"
};
const yEndstopOptions = (config)=>[
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
variable_driver_type_x: "${utils.getAxisDriverType(motion/* PrinterAxis.x */.po.x)}"
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
variable_driver_type_y: "${utils.getAxisDriverType(motion/* PrinterAxis.y */.po.y)}"
`;

;// CONCATENATED MODULE: ./data/steppers.ts


const findPreset = (stepper, driver, voltage, current, performanceMode)=>{
    return stepper.presets?.slice().sort((a, b)=>performanceMode ? b.run_current - a.run_current : a.run_current - b.run_current).find((p)=>p.driver === driver.type && p.voltage === voltage && p.sense_resistor === driver.senseResistor && (current == null || p.run_current === current));
};
const Steppers = external_zod_.z.array(motion/* Stepper */.vF).parse([
    {
        id: "generic",
        title: "Generic Stepper",
        maxPeakCurrent: 2.8
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
        title: "BTT TMC5160 Pro v1.1",
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

;// CONCATENATED MODULE: ./utils/serialization.ts



const deserializeDriver = (driverId)=>{
    return Drivers.find((d)=>d.id === driverId) ?? null;
};
const serialization_deserializeStepper = (stepperId)=>{
    return Steppers.find((d)=>d.id === stepperId) ?? null;
};
const deserializePrinterRail = (rail)=>{
    const stepper = serialization_deserializeStepper(rail.stepper);
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
    const stepper = serialization_deserializeStepper(rail.stepper);
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
const serializePrinterRail = (rail)=>{
    return motion/* SerializedPrinterRail.parse */.Ah.parse({
        ...rail,
        driver: rail.driver.id,
        stepper: rail.stepper.id
    });
};

;// CONCATENATED MODULE: ./helpers/klipper-config.ts








const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
const constructKlipperConfigUtils = (config)=>{
    return {
        getRail (axis) {
            const rail = config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            return rail;
        },
        getAxisPinName (axis, alias) {
            const prefix = axis === motion/* PrinterAxis.extruder */.po.extruder ? this.getExtruderPinPrefix() : "";
            return prefix + (axis === motion/* PrinterAxis.z */.po.z ? "z0" : axis === motion/* PrinterAxis.extruder */.po.extruder ? "e" : axis) + alias;
        },
        getAxisStepperName (axis) {
            return axis === motion/* PrinterAxis.extruder */.po.extruder ? "extruder" : "stepper" + "_" + axis;
        },
        getAxisDriverType (axis) {
            return this.getRail(axis).driver.type.toLowerCase();
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
                return `diag_pin: ^${this.getAxisPinName(axis, "_diag_pin")}`;
            }
            if (this.getRail(axis).driver.protocol === "SPI") {
                return `diag1_pin: ^${this.getAxisPinName(axis, "_diag_pin")}`;
            }
            return "";
        },
        getAxisDriverHomingCurrent (axis, factor) {
            const rail = this.getRail(axis);
            factor = Math.max(0, Math.min(1, factor));
            return rail.stepper.maxPeakCurrent * 0.71 * factor;
        },
        readInclude (fileName) {
            return (0,external_fs_.readFileSync)(external_path_default().join(environment.RATOS_CONFIGURATION_PATH, fileName), "utf-8");
        },
        stripIncludes (content) {
            return content.split("\n").filter((l)=>!l.trim().startsWith("[include")).join("\n");
        },
        stripCommentLines (content) {
            return content.split("\n").filter((l)=>l.trim().indexOf("#") !== 0).join("\n");
        },
        getExtruderPinPrefix () {
            if (config.toolboard != null) {
                return "toolboard:";
            }
            return "";
        },
        getProbePinPrefix () {
            if (config.toolboard != null) {
                return "toolboard:";
            }
            return "";
        },
        getXEndstopPinPrefix () {
            if (config.toolboard != null && config.xEndstop.id === "endstop-toolboard") {
                return "toolboard:";
            }
            return "";
        },
        getYEndstopPinPrefix () {
            return "";
        }
    };
};
const constructKlipperConfigExtrasGenerator = (config, utils)=>{
    const _filesToWrite = [];
    const _reminders = [];
    return {
        getFilesToWrite (overwrite) {
            return _filesToWrite.slice().map((f)=>({
                    ...f,
                    overwrite: overwrite != null ? overwrite : f.overwrite
                }));
        },
        addFileToRender (fileToRender) {
            _filesToWrite.push(fileToRender);
        },
        getReminders () {
            return _reminders.slice();
        },
        generateSensorlessHomingIncludes () {
            const filesToWrite = [];
            if (config.xEndstop.id === "sensorless") {
                filesToWrite.push({
                    fileName: "sensorless-homing-x.cfg",
                    content: sensorlessXTemplate(config, utils),
                    overwrite: false
                });
            }
            if (config.yEndstop.id === "sensorless") {
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
    const cbPins = await parseBoardConfig(config.controlboard, config.printer.driverCountRequired > config.controlboard.driverCount);
    const tbPins = config.toolboard != null ? await parseBoardConfig(config.toolboard) : null;
    return {
        ...utils,
        renderToolboard () {
            if (config.toolboard == null || tbPins == null) {
                return "";
            }
            const result = [
                "",
                exportBoardPinAlias(config.toolboard.serialPath.replace("/dev/", ""), tbPins, "toolboard"),
                "",
                `[mcu toolboard]`,
                `serial: ${config.toolboard.serialPath}`
            ];
            if (config.toolboard.hasMcuTempSensor) {
                result.push(""); // Add a newline for readability.
                result.push(`[temperature_sensor ${config.toolboard.name.replace(/\s/g, "_")}]`);
                result.push(`sensor_type: temperature_mcu`);
                result.push(`sensor_mcu: toolboard`);
            }
            if (config.toolboard.ADXL345SPI != null) {
                result.push(""); // Add a newline for readability.
                result.push(`[adxl345 toolboard]`);
                result.push(`cs_pin: toolboard:${config.toolboard.ADXL345SPI.cs_pin}`);
                if ("hardware" in config.toolboard.ADXL345SPI) {
                    result.push(`spi_bus: ${config.toolboard.ADXL345SPI.hardware.bus}`);
                } else {
                    result.push(`spi_software_mosi_pin: toolboard:${config.toolboard.ADXL345SPI.software.mosi}`);
                    result.push(`spi_software_miso_pin: toolboard:${config.toolboard.ADXL345SPI.software.miso}`);
                    result.push(`spi_software_sclk_pin: toolboard:${config.toolboard.ADXL345SPI.software.sclk}`);
                }
            }
            if (config.toolboard.outputPins != null) {
                config.toolboard.outputPins.forEach((pindef)=>{
                    result.push(""); // Add a newline for readability.
                    result.push(`[output_pin ${pindef.name}]`);
                    result.push(`pin: toolboard:${pindef.pin}`);
                    result.push(`value: ${pindef.value}`);
                });
            }
            return result.join("\n");
        },
        renderControlboard () {
            const result = [
                "",
                exportBoardPinAlias(config.controlboard.serialPath.replace("/dev/", ""), cbPins),
                "",
                `[mcu]`,
                `serial: ${config.controlboard.serialPath}`
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
                if (config.controlboard.extruderlessConfig == null) {
                    throw new Error("Control board has insufficient amount of drivers and do not appear to have an extruderless config file.");
                }
                if (config.toolboard == null || config.controlboard.driverCount + config.toolboard.driverCount < config.printer.driverCountRequired) {
                    throw new Error("Control board + toolboard does not make up enough drivers for this printer.");
                }
            }
            const result = [
                "[include RatOS/boards/rpi/config.cfg]",
                this.renderControlboard(),
                this.renderToolboard()
            ];
            return result.join("\n");
        },
        renderStepperSections () {
            return config.rails.map((r)=>{
                return this.renderStepperSection(r);
            }).join("\n");
        },
        renderStepperSection (axis) {
            const rail = typeof axis === "object" ? axis : config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            const section = [
                `[${utils.getAxisStepperName(rail.axis)}]`,
                `step_pin: ${utils.getAxisPinName(rail.axis, "_step_pin")}`,
                `dir_pin: ${utils.getAxisPinName(rail.axis, "_dir_pin")}`,
                `enable_pin: !${utils.getAxisPinName(rail.axis, "_enable_pin")}`,
                `microsteps: ${rail.microstepping}`,
                `rotation_distance: ${rail.rotationDistance}`
            ];
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
                if (config.probe != null) {
                    section.push(`endstop_pin: probe:z_virtual_endstop`);
                }
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
        renderDriverSection (axis) {
            const rail = typeof axis === "object" ? axis : config.rails.find((r)=>r.axis === axis);
            if (rail == null) {
                throw new Error(`No rail found for axis ${axis}`);
            }
            const preset = findPreset(rail.stepper, rail.driver, rail.voltage, rail.current);
            const section = [
                `[${utils.getAxisDriverSectionName(rail.axis)}]`,
                `stealthchop_threshold: ${config.stealthchop ? "9999999" : config.standstillStealth ? "1" : "0"}`,
                `interpolate: ${rail.microstepping < 64 || config.stealthchop ? "True" : "False"}`
            ];
            if (rail.driver.protocol === "UART") {
                section.push(`uart_pin: ${utils.getAxisPinName(rail.axis, "_uart_pin")}`);
            }
            if (rail.driver.protocol === "SPI") {
                section.push(`cs_pin: ${utils.getAxisPinName(rail.axis, "_cs_pin")}`);
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
                `variable_macro_travel_speed: ${this.getMacroTravelSpeed()}`
            ].join("\n");
        },
        getMacroTravelSpeed () {
            const limits = config.performanceMode && config.printer.speedLimits.performance ? config.printer.speedLimits.performance : config.printer.speedLimits.basic;
            return config.stealthchop ? "135" : limits.velocity;
        },
        renderBoardQuirks () {
            let result = [];
            if (config.controlboard.hasQuirksFiles) {
                result.push("# Include controlboard quirk file");
                if (config.toolboard != null) {
                    result.push(`[include RatOS/boards/${config.controlboard.serialPath.replace("/dev/", "")}/quirks-toolboard.cfg]`);
                } else {
                    result.push(`[include RatOS/boards/${config.controlboard.serialPath.replace("/dev/", "")}/quirks.cfg]`);
                }
            }
            if (config.toolboard?.hasQuirksFiles) {
                result.push("# Include toolboard quirk file");
                result.push(`[include RatOS/boards/${config.toolboard.serialPath.replace("/dev/", "")}/quirks.cfg]`);
            }
            return result.join("\n");
        },
        renderHotend () {
            let result = [];
            result.push(`[include RatOS/hotends/${config.hotend.id}]`);
            result.push("[extruder]");
            result.push(`sensor_type: ${config.thermistor}`);
            if (config.toolboard != null) {
                result.push("# Use toolboard pins for heater and thermistor");
                result.push("heater_pin: toolboard:e_heater_pin");
                result.push("sensor_pin: toolboard:e_sensor_pin");
            }
            return result.join("\n");
        },
        renderExtruder () {
            let result = [];
            // Get rid of the stepper/driver includes in the extruder config and paste it inline (backwards compatibility with 2.0).
            result.push(`# ${config.extruder.title} definition (from RatOS/extruders/${config.extruder.id})`);
            result.push(utils.stripCommentLines(utils.stripIncludes(this.readInclude(`extruders/${config.extruder.id}`))));
            return result.join("\n");
        },
        renderInputShaper (printerSize) {
            let result = [];
            result.push("[resonance_tester]");
            switch(config.xAccelerometer?.id){
                case "controlboard":
                    result.push("accel_chip_x: adxl345 controlboard");
                    break;
                case "toolboard":
                    if (config.toolboard != null) {
                        result.push("accel_chip_x: adxl345 toolboard");
                        break;
                    }
                case "sbc":
                    result.push("accel_chip_x: adxl345 rpi");
                    break;
                default:
                    result.push("accel_chip_x: adxl345 controlboard");
                    break;
            }
            switch(config.yAccelerometer?.id){
                case "controlboard":
                    result.push("accel_chip_y: adxl345 controlboard");
                    break;
                case "toolboard":
                    if (config.toolboard != null) {
                        result.push("accel_chip_y: adxl345 toolboard");
                        break;
                    }
                case "sbc":
                    result.push("accel_chip_y: adxl345 rpi");
                    break;
                default:
                    result.push("accel_chip_y: adxl345 controlboard");
                    break;
            }
            result.push("probe_points:");
            result.push(`\t${printerSize / 2},${printerSize / 2},20`);
            return result.join("\n");
        },
        renderProbeIncludes () {
            const result = [];
            if (config.probe != null) {
                result.push(`[include RatOS/z-probe/${config.probe.id}]`);
                if (config.toolboard != null && config.probe.id === "bltouch") {
                    result.push("[include RatOS/toolboard/bltouch.cfg]");
                }
            }
            return result.join("\n");
        },
        renderProbePinSection () {
            const result = [];
            if (config.probe != null) {
                switch(config.probe.id){
                    case "bltouch.cfg":
                        result.push(`# BLTouch configuration`);
                        result.push(`[bltouch]`);
                        result.push(`z_offset: 0`);
                        break;
                    case "beacon.cfg":
                        // print reminder about beacon calibration
                        const reminder = [];
                        reminder.push("# REMEMBER TO CALIBRATE YOUR BEACON!");
                        reminder.push("# Follow along from step 6 in the official beacon guide https://docs.beacon3d.com/quickstart/#6-calibrate-beacon");
                        extrasGenerator.addReminder(reminder.join("\n"));
                        break;
                    default:
                        const pinPrefix = this.getProbePinPrefix();
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
            if (config.xEndstop.id !== "sensorless") {
                result.push(""); // Add a newline for readability.
                result.push(`# Physical X endstop configuration`);
                result.push(`[stepper_x]`);
                result.push(`endstop_pin: ${this.getXEndstopPinPrefix()}x_endstop_pin`);
                result.push(`[gcode_macro RatOS]`);
                result.push(`variable_homing_x: "endstop"`);
            }
            if (config.yEndstop.id !== "sensorless") {
                result.push(""); // Add a newline for readability.
                result.push(`# Physical Y endstop configuration`);
                result.push(`[stepper_y]`);
                result.push(`endstop_pin: ${this.getYEndstopPinPrefix()}y_endstop_pin`);
                result.push(`[gcode_macro RatOS]`);
                result.push(`variable_homing_y: "endstop"`);
            }
            if (config.xEndstop.id === "sensorless" || config.yEndstop.id === "sensorless") {
                const defaultXRail = config.printer.defaults.rails.find((r)=>r.axis === motion/* PrinterAxis.x */.po.x);
                const defaultYRail = config.printer.defaults.rails.find((r)=>r.axis === motion/* PrinterAxis.y */.po.y);
                result.push(""); // Add a newline for readability.
                if (defaultXRail && defaultYRail && pretunedSensorlessConfig != null && (0,motion/* matchesDefaultRail */.R_)(utils.getRail(motion/* PrinterAxis.x */.po.x), deserializePrinterRailDefinition(defaultXRail), config.performanceMode) && (0,motion/* matchesDefaultRail */.R_)(utils.getRail(motion/* PrinterAxis.y */.po.y), deserializePrinterRailDefinition(defaultYRail), config.performanceMode)) {
                    result.push(`[include ${pretunedSensorlessConfig}]`);
                } else {
                    result.push(extrasGenerator.generateSensorlessHomingIncludes());
                }
            }
            if (config.probe == null) {
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
        renderFans () {
            const result = [];
            // Part fan
            result.push(`# Part cooling fan`);
            if (config.partFan.id == "4pin-dedicated") {
                result.push("# 4 pin connected to dedicated 4-pin header on controlboard");
                result.push(`[include RatOS/4pin-fans/part-cooling-fan-25khz.cfg]`);
            } else {
                result.push(`[fan]`);
                if (config.toolboard) {
                    if (config.partFan.id === "4pin") {
                        result.push("# 4 pin fan with PWM connected to toolboard fan terminal");
                        result.push(`pin: !toolboard:fan_part_cooling_pin`);
                    } else {
                        result.push("# 2 pin fan connected to toolboard fan terminal");
                        result.push(`pin: toolboard:fan_part_cooling_pin`);
                    }
                } else {
                    if (config.partFan.id === "4pin") {
                        result.push("# 4 pin fan with PWM connected to controlboard fan terminal");
                        result.push(`pin: !fan_part_cooling_pin`);
                    } else {
                        result.push("# 2 pin fan connected to controlboard fan terminal");
                        result.push(`pin: fan_part_cooling_pin`);
                    }
                }
            }
            // Hotend fan
            result.push(``);
            result.push(`# Hotend cooling fan`);
            if (config.partFan.id == "4pin-dedicated") {
                result.push("# 4 pin connected to dedicated 4-pin header on controlboard");
                result.push(`[include RatOS/4pin-fans/toolhead-fan-25khz.cfg]`);
            } else {
                result.push(`[heater_fan toolhead_cooling_fan]`);
                if (config.toolboard) {
                    if (config.partFan.id === "4pin") {
                        result.push("# 4 pin fan with PWM connected to toolboard fan terminal");
                        result.push(`pin: !toolboard:fan_toolhead_cooling_pin`);
                    } else {
                        result.push("# 2 pin fan connected to toolboard fan terminal");
                        result.push(`pin: toolboard:fan_toolhead_cooling_pin`);
                    }
                } else {
                    if (config.partFan.id === "4pin") {
                        result.push("# 4 pin fan with PWM connected to controlboard fan terminal");
                        result.push(`pin: !fan_toolhead_cooling_pin`);
                    } else {
                        result.push("# 2 pin fan connected to controlboard fan terminal");
                        result.push(`pin: fan_toolhead_cooling_pin`);
                    }
                }
            }
            // Controller fan
            result.push(``);
            result.push(`# Controller/driver cooling fan`);
            if (config.partFan.id == "4pin-dedicated") {
                result.push("# 4 pin connected to dedicated 4-pin header on controlboard");
                result.push(`[include RatOS/4pin-fans/controller-fan-25khz.cfg]`);
            } else {
                result.push(`[controller_fan controller_fan]`);
                if (config.partFan.id === "4pin") {
                    result.push("# 4 pin fan with PWM connected to controlboard fan terminal");
                    result.push(`pin: !fan_controller_bard_pin`);
                } else {
                    result.push("# 2 pin fan connected to controlboard fan terminal");
                    result.push(`pin: fan_controller_bard_pin`);
                }
            }
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
const partFanOptions = (config)=>{
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
    if (config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 0) {
        fans.push({
            id: "4pin-dedicated",
            title: "4-pin fan (dedicated 4-pin header)"
        });
    }
    return fans;
};
const hotendFanOptions = (config)=>{
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
    if (config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 2 || config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 1 && config.controllerFan?.id !== "4pin-dedicated") {
        fans.push({
            id: "4pin-dedicated",
            title: "4-pin fan (dedicated 4-pin header)"
        });
    }
    return fans;
};
const controllerFanOptions = (config)=>{
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
    if (config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 2 || config?.controlboard?.fourPinFanConnectorCount != null && config.controlboard.fourPinFanConnectorCount > 1 && config.hotendFan?.id !== "4pin-dedicated") {
        fans.push({
            id: "4pin-dedicated",
            title: "4-pin fan (dedicated 4-pin header)"
        });
    }
    return fans;
};

// EXTERNAL MODULE: ./server/routers/mcu.ts
var mcu = __webpack_require__(3459);
;// CONCATENATED MODULE: ./data/accelerometers.ts
const xAccelerometerOptions = (config)=>{
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
    if (config?.toolboard != null && config.toolboard.ADXL345SPI != null) {
        accelerometers.push({
            id: "toolboard",
            title: "Integrated on toolboard"
        });
    }
    return accelerometers;
};
const yAccelerometerOptions = (config)=>{
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
    if (config?.toolboard != null && config.toolboard.ADXL345SPI != null) {
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
var server_trpc = __webpack_require__(8199);
// EXTERNAL MODULE: external "recoil"
var external_recoil_ = __webpack_require__(9755);
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
    return `http://localhost:${process.env.PORT ?? 3000}/configure`;
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



// EXTERNAL MODULE: external "recoil-sync"
var external_recoil_sync_ = __webpack_require__(4101);
// EXTERNAL MODULE: external "zod-refine"
var external_zod_refine_ = __webpack_require__(5140);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
// EXTERNAL MODULE: external "@recoiljs/refine"
var refine_ = __webpack_require__(7856);
;// CONCATENATED MODULE: ./hooks/usePrinterConfiguration.tsx
"use client";















const readPrinterAtom = async ({ read  })=>{
    const printer = await read(PrinterState.key);
    if (printer != null) {
        const printerId = external_zod_.z.object({
            id: Printer.shape.id
        }).safeParse(printer);
        if (printerId.success) {
            const printerReq = await proxyClient.printer.printers.query();
            const newPrinter = printerReq.find((p)=>p.id === printerId.data.id);
            return newPrinter ?? null;
        }
    }
    return null;
};
const PrinterState = (0,external_recoil_.atom)({
    key: "Printer",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            read: readPrinterAtom,
            refine: (0,refine_.match)((0,external_zod_refine_.getRefineCheckerForZodSchema)(Printer.nullable()))
        })
    ]
});
const PrinterSizeState = (0,external_recoil_.atom)({
    key: "PrinterOption",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(Printer.shape.sizes.unwrap().element.nullable())
        })
    ]
});
const HotendState = (0,external_recoil_.atom)({
    key: "Hotend",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(Hotend.nullable())
        })
    ]
});
const ThermistorState = (0,external_recoil_.atom)({
    key: "Thermistor",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(Thermistor.nullable())
        })
    ]
});
const ExtruderState = (0,external_recoil_.atom)({
    key: "Extruder",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(Extruder.nullable())
        })
    ]
});
const ProbeState = (0,external_recoil_.atom)({
    key: "Probe",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(Probe.nullable())
        })
    ]
});
const XEndstopState = (0,external_recoil_.atom)({
    key: "XEndstop",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(Endstop.nullable())
        })
    ]
});
const YEndstopState = (0,external_recoil_.atom)({
    key: "YEndstop",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(Endstop.nullable())
        })
    ]
});
const ControlboardState = (0,external_recoil_.atom)({
    key: "Controlboard",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            read: async ({ read  })=>{
                const board = await read(ControlboardState.key);
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
const _ToolboardState = (0,external_recoil_.atom)({
    key: "Toolboard",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            read: async ({ read  })=>{
                const board = await read(_ToolboardState.key);
                if (board != null) {
                    const boardId = external_zod_.z.object({
                        path: boards/* Board.shape.path */.$l.shape.path
                    }).safeParse(board);
                    if (boardId.success) {
                        const boardReq = await proxyClient.mcu.boards.query({
                            boardFilters: {
                                toolboard: true
                            }
                        });
                        const newBoard = boardReq.find((b)=>b.path === boardId.data.path);
                        return newBoard ?? null;
                    }
                }
                return null;
            },
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(boards/* Toolboard.nullable */.MG.nullable())
        })
    ]
});
const PerformanceModeState = (0,external_recoil_.atom)({
    key: "PerformanceMode",
    default: false,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(external_zod_.z.boolean().optional().nullable())
        })
    ]
});
const StealthchopState = (0,external_recoil_.atom)({
    key: "Stealchop",
    default: false,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(external_zod_.z.boolean().optional().nullable())
        })
    ]
});
const StandstillStealthState = (0,external_recoil_.atom)({
    key: "StandstillStealth",
    default: false,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(external_zod_.z.boolean().optional().nullable())
        })
    ]
});
const XAccelerometerState = (0,external_recoil_.atom)({
    key: "XAccelerometer",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(Accelerometer.nullable())
        })
    ]
});
const YAccelerometerState = (0,external_recoil_.atom)({
    key: "YAccelerometer",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(Accelerometer.nullable())
        })
    ]
});
const PartFanState = (0,external_recoil_.atom)({
    key: "PartFan",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(Fan.nullable())
        })
    ]
});
const HotendFanState = (0,external_recoil_.atom)({
    key: "HotendFan",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(Fan.nullable())
        })
    ]
});
const ControllerFanState = (0,external_recoil_.atom)({
    key: "ControllerFan",
    default: null,
    effects: [
        (0,external_recoil_sync_.syncEffect)({
            refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(Fan.nullable())
        })
    ]
});
const ToolboardState = (0,external_recoil_.selector)({
    key: "ToolboardSelector",
    set: ({ set , get  }, newValue)=>{
        const xEndstop = get(XEndstopState);
        if (newValue == null && xEndstop?.id === "endstop-toolboard") {
            set(XEndstopState, defaultXEndstop);
        }
        set(_ToolboardState, newValue);
    },
    get: ({ get  })=>{
        return get(_ToolboardState);
    }
});
const PrinterRailState = (0,external_recoil_.atomFamily)({
    key: "PrinterRail",
    default: null,
    effects: (param)=>[
            (0,external_recoil_sync_.syncEffect)({
                read: async ({ read  })=>{
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
                },
                refine: (0,external_zod_refine_.getRefineCheckerForZodSchema)(motion/* SerializedPrinterRail.nullable */.Ah.nullable())
            })
        ]
});
const PrinterRailsState = (0,external_recoil_.selector)({
    key: "PrinterRails",
    get: ({ get  })=>{
        const printer = get(PrinterState);
        const rails = printer?.defaults.rails.map((rail)=>{
            const railState = get(PrinterRailState(rail.axis));
            return deserializePrinterRail(railState ?? rail);
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
            set(PrinterRailState(rail.axis), serializePrinterRail(rail));
        });
    }
});
const PrinterConfigurationState = (0,external_recoil_.selector)({
    key: "PrinterConfiguration",
    get: ({ get  })=>{
        const printer = get(PrinterState) ?? undefined;
        const printerSize = get(PrinterSizeState) ?? undefined;
        const hotend = get(HotendState) ?? undefined;
        const thermistor = get(ThermistorState) ?? undefined;
        const extruder = get(ExtruderState) ?? undefined;
        const probe = get(ProbeState) ?? undefined;
        const xEndstop = get(XEndstopState) ?? undefined;
        const yEndstop = get(YEndstopState) ?? undefined;
        const controlboard = get(ControlboardState) ?? undefined;
        const toolboard = get(ToolboardState) ?? undefined;
        const partFan = get(PartFanState) ?? undefined;
        const hotendFan = get(HotendFanState) ?? undefined;
        const controllerFan = get(ControllerFanState) ?? undefined;
        const xAccelerometer = get(XAccelerometerState) ?? undefined;
        const yAccelerometer = get(YAccelerometerState) ?? undefined;
        const performanceMode = get(PerformanceModeState) ?? undefined;
        const stealthchop = get(StealthchopState) ?? undefined;
        const standstillStealth = get(StandstillStealthState) ?? undefined;
        const rails = get(PrinterRailsState);
        const printerConfig = PartialPrinterConfiguration.safeParse({
            printer,
            hotend,
            thermistor,
            extruder,
            probe,
            xEndstop,
            yEndstop,
            controlboard,
            toolboard,
            partFan,
            hotendFan,
            controllerFan,
            size: printerSize,
            xAccelerometer,
            yAccelerometer,
            performanceMode,
            stealthchop,
            standstillStealth,
            rails
        });
        if (printerConfig.success === false) {
            console.log(printerConfig.error);
        }
        return printerConfig.success ? printerConfig.data : null;
    }
});
const serializePrinterConfiguration = (config)=>{
    const serializedConfig = {
        printer: config.printer.id,
        size: config.size,
        hotend: config.hotend.id,
        thermistor: config.thermistor,
        extruder: config.extruder.id,
        probe: config.probe?.id,
        xEndstop: config.xEndstop.id,
        yEndstop: config.yEndstop.id,
        controlboard: config.controlboard.serialPath,
        toolboard: config.toolboard?.serialPath,
        partFan: config.partFan.id,
        hotendFan: config.hotendFan.id,
        controllerFan: config.controllerFan.id,
        xAccelerometer: config.xAccelerometer?.id,
        yAccelerometer: config.yAccelerometer?.id,
        performanceMode: config.performanceMode,
        stealthchop: config.stealthchop,
        standstillStealth: config.standstillStealth,
        rails: config.rails.map((rail)=>({
                ...rail,
                driver: rail.driver.id,
                stepper: rail.stepper.id
            }))
    };
    return SerializedPrinterConfiguration.parse(serializedConfig);
};
const serializePartialPrinterConfiguration = (config)=>{
    const serializedConfig = {
        printer: config?.printer?.id,
        size: config?.size,
        hotend: config?.hotend?.id,
        thermistor: config?.thermistor,
        extruder: config?.extruder?.id,
        probe: config?.probe?.id,
        xEndstop: config?.xEndstop?.id,
        yEndstop: config?.yEndstop?.id,
        controlboard: config?.controlboard?.serialPath,
        toolboard: config?.toolboard?.serialPath,
        partFan: config?.partFan?.id,
        hotendFan: config?.hotendFan?.id,
        controllerFan: config?.controllerFan?.id,
        xAccelerometer: config?.xAccelerometer?.id,
        yAccelerometer: config?.yAccelerometer?.id,
        performanceMode: config?.performanceMode,
        stealthchop: config?.stealthchop,
        standstillStealth: config?.standstillStealth
    };
    return SerializedPartialPrinterConfiguration.parse(serializedConfig);
};
const usePrinterConfiguration = ()=>{
    const [selectedPrinter, setSelectedPrinter] = useRecoilState(PrinterState);
    const [selectedPrinterOption, setSelectedPrinterOption] = useRecoilState(PrinterSizeState);
    const [selectedHotend, setSelectedHotend] = useRecoilState(HotendState);
    const [selectedExtruder, _setSelectedExtruder] = useRecoilState(ExtruderState);
    const [selectedThermistor, setSelectedThermistor] = useRecoilState(ThermistorState);
    const [selectedProbe, setSelectedProbe] = useRecoilState(ProbeState);
    const [selectedXEndstop, setSelectedXEndstop] = useRecoilState(XEndstopState);
    const [selectedYEndstop, setSelectedYEndstop] = useRecoilState(YEndstopState);
    const [selectedBoard, setSelectedBoard] = useRecoilState(ControlboardState);
    const [selectedToolboard, setSelectedToolboard] = useRecoilState(ToolboardState);
    const [selectedXAccelerometer, setSelectedXAccelerometer] = useRecoilState(XAccelerometerState);
    const [selectedYAccelerometer, setSelectedYAccelerometer] = useRecoilState(YAccelerometerState);
    const [performanceMode, setPerformanceMode] = useRecoilState(PerformanceModeState);
    const [stealthchop, setStealthchop] = useRecoilState(StealthchopState);
    const [standstillStealth, setStandstillStealth] = useRecoilState(StandstillStealthState);
    const [selectedPartFan, setSelectedPartFan] = useRecoilState(PartFanState);
    const [selectedHotendFan, setSelectedHotendFan] = useRecoilState(HotendFanState);
    const [selectedControllerFan, setSelectedControllerFan] = useRecoilState(ControllerFanState);
    const [selectedPrinterRails, setSelectedPrinterRails] = useRecoilState(PrinterRailsState);
    const resetSelectedPrinterRails = useResetRecoilState(PrinterRailsState);
    const printerConfiguration = useRecoilValue(PrinterConfigurationState);
    const serializedPrinterConfiguration = useMemo(()=>serializePartialPrinterConfiguration(printerConfiguration ?? {}), [
        printerConfiguration
    ]);
    const setExtruderRail = useSetRecoilState(PrinterRailState(PrinterAxis.extruder));
    const hotends = trpc.printer.hotends.useQuery();
    const boards = trpc.mcu.boards.useQuery({});
    const extruders = trpc.printer.extruders.useQuery();
    const thermistors = trpc.printer.thermistors.useQuery();
    const probes = trpc.printer.probes.useQuery();
    const xEndstops = trpc.printer.xEndstops.useQuery(serializedPrinterConfiguration, {
        keepPreviousData: true
    });
    const yEndstops = trpc.printer.yEndstops.useQuery(serializedPrinterConfiguration, {
        keepPreviousData: true
    });
    const partFanOptions = trpc.printer.partFanOptions.useQuery(serializedPrinterConfiguration, {
        keepPreviousData: true
    });
    const hotendFanOptions = trpc.printer.hotendFanOptions.useQuery(serializedPrinterConfiguration, {
        keepPreviousData: true
    });
    const controllerFanOptions = trpc.printer.controllerFanOptions.useQuery(serializedPrinterConfiguration, {
        keepPreviousData: true
    });
    const xAccelerometerOptions = trpc.printer.xAccelerometerOptions.useQuery(serializedPrinterConfiguration, {
        keepPreviousData: true
    });
    const yAccelerometerOptions = trpc.printer.yAccelerometerOptions.useQuery(serializedPrinterConfiguration, {
        keepPreviousData: true
    });
    const setSelectedExtruder = useCallback((extruder)=>{
        _setSelectedExtruder(extruder);
        // If the extruder has a stepper, set the extruder rail to use that stepper
        if (extruder != null) {
            if (extruder.stepper != null) {
                const stepper = deserializeStepper(extruder.stepper);
                if (stepper != null) {
                    setExtruderRail((rail)=>{
                        return rail == null ? null : {
                            ...rail,
                            stepper: stepper.id,
                            current: extruder.current ?? stepper.maxPeakCurrent * 0.71
                        };
                    });
                }
            }
        }
    }, [
        _setSelectedExtruder,
        setExtruderRail
    ]);
    const setPrinterDefaults = useCallback((printer)=>{
        const board = boards.data?.find((board)=>board.serialPath === "/dev/" + printer.defaults.board);
        const toolboard = boards.data?.find((board)=>board.serialPath === "/dev/" + printer.defaults.board);
        const hotend = hotends.data?.find((h)=>h.id === printer.defaults.hotend + ".cfg");
        const extruder = extruders.data?.find((e)=>e.id === printer.defaults.extruder + ".cfg");
        const thermistor = thermistors.data?.find((t)=>t === hotend?.thermistor);
        const probe = probes.data?.find((p)=>p.id === printer.defaults.probe + ".cfg");
        const xEndstop = xEndstops.data?.find((e)=>e.id === printer.defaults.xEndstop);
        const yEndstop = yEndstops.data?.find((e)=>e.id === printer.defaults.yEndstop);
        const partFan = partFanOptions.data?.[0];
        const hotendFan = hotendFanOptions.data?.[0];
        const controllerFan = controllerFanOptions.data?.[0];
        const xAccelerometer = xAccelerometerOptions.data?.[0];
        const yAccelerometer = yAccelerometerOptions.data?.[0];
        setPerformanceMode(false);
        setStealthchop(false);
        if (board) {
            setSelectedBoard(board);
        }
        if (toolboard) {
            const _toolboard = Toolboard.safeParse(toolboard);
            if (_toolboard.success) {
                setSelectedToolboard(_toolboard.data);
            }
        }
        if (hotend) {
            setSelectedHotend(hotend);
        }
        if (extruder) {
            setSelectedExtruder(extruder);
        }
        if (thermistor) {
            setSelectedThermistor(thermistor);
        }
        if (probe) {
            setSelectedProbe(probe);
        }
        if (xEndstop) {
            setSelectedXEndstop(xEndstop);
        }
        if (yEndstop) {
            setSelectedYEndstop(yEndstop);
        }
        if (partFan) {
            setSelectedPartFan(partFan);
        }
        if (hotendFan) {
            setSelectedHotendFan(hotendFan);
        }
        if (controllerFan) {
            setSelectedControllerFan(controllerFan);
        }
        if (xAccelerometer) {
            setSelectedXAccelerometer(xAccelerometer);
        }
        if (yAccelerometer) {
            setSelectedYAccelerometer(yAccelerometer);
        }
        resetSelectedPrinterRails();
    }, [
        boards.data,
        hotends.data,
        extruders.data,
        thermistors.data,
        probes.data,
        xEndstops.data,
        yEndstops.data,
        partFanOptions.data,
        hotendFanOptions.data,
        controllerFanOptions.data,
        xAccelerometerOptions.data,
        yAccelerometerOptions.data,
        setPerformanceMode,
        setStealthchop,
        resetSelectedPrinterRails,
        setSelectedBoard,
        setSelectedToolboard,
        setSelectedHotend,
        setSelectedExtruder,
        setSelectedThermistor,
        setSelectedProbe,
        setSelectedXEndstop,
        setSelectedYEndstop,
        setSelectedPartFan,
        setSelectedHotendFan,
        setSelectedControllerFan,
        setSelectedXAccelerometer,
        setSelectedYAccelerometer
    ]);
    const parsedPrinterConfiguration = PrinterConfiguration.safeParse({
        controlboard: selectedBoard,
        toolboard: selectedToolboard,
        printer: selectedPrinter,
        hotend: selectedHotend,
        extruder: selectedExtruder,
        thermistor: selectedThermistor,
        probe: selectedProbe,
        xEndstop: selectedXEndstop,
        yEndstop: selectedYEndstop,
        partFan: selectedPartFan,
        hotendFan: selectedHotendFan,
        controllerFan: selectedControllerFan,
        size: selectedPrinterOption,
        xAccelerometer: selectedXAccelerometer,
        yAccelerometer: selectedYAccelerometer,
        performanceMode,
        stealthchop,
        standstillStealth,
        rails: selectedPrinterRails
    });
    const queryErrors = [];
    if (hotends.error) {
        queryErrors.push(hotends.error.message);
    }
    if (extruders.error) {
        queryErrors.push(extruders.error.message);
    }
    if (thermistors.error) {
        queryErrors.push(thermistors.error.message);
    }
    if (probes.error) {
        queryErrors.push(probes.error.message);
    }
    if (xEndstops.error) {
        queryErrors.push(xEndstops.error.message);
    }
    if (yEndstops.error) {
        queryErrors.push(yEndstops.error.message);
    }
    if (boards.error) {
        queryErrors.push(boards.error.message);
    }
    return {
        queryErrors,
        selectedPrinter,
        setSelectedPrinter,
        selectedPrinterOption,
        setSelectedPrinterOption,
        selectedHotend,
        setSelectedHotend,
        selectedExtruder,
        setSelectedExtruder,
        selectedThermistor,
        setSelectedThermistor,
        selectedProbe,
        setSelectedProbe,
        selectedXEndstop,
        setSelectedXEndstop,
        selectedYEndstop,
        setSelectedYEndstop,
        selectedBoard,
        setSelectedBoard,
        selectedToolboard,
        setSelectedToolboard,
        selectedXAccelerometer,
        setSelectedXAccelerometer,
        selectedYAccelerometer,
        setSelectedYAccelerometer,
        performanceMode,
        setPerformanceMode,
        stealthchop,
        setStealthchop,
        standstillStealth,
        setStandstillStealth,
        selectedPrinterRails,
        setSelectedPrinterRails,
        selectedPartFan,
        setSelectedPartFan,
        selectedHotendFan,
        setSelectedHotendFan,
        selectedControllerFan,
        setSelectedControllerFan,
        hotends,
        extruders,
        thermistors,
        probes,
        xEndstops,
        yEndstops,
        partFanOptions,
        hotendFanOptions,
        controllerFanOptions,
        xAccelerometerOptions,
        yAccelerometerOptions,
        setPrinterDefaults,
        partialPrinterConfiguration: printerConfiguration,
        parsedPrinterConfiguration,
        isReady: hotends.data != null && extruders.data != null && thermistors.data != null && probes.data != null && xEndstops.data != null && yEndstops.data != null && boards.data != null
    };
};

;// CONCATENATED MODULE: ./server/routers/printer.ts



















function isNodeError(error) {
    return error instanceof Error;
}
const parseDirectory = async (directory, zod)=>{
    const defs = await (0,external_glob_.glob)(`${process.env.RATOS_CONFIGURATION_PATH}/${directory}/*.cfg`);
    return (await Promise.all(defs.map((f)=>f.trim()).filter((f)=>f !== "").map(async (f)=>{
        const parsedFile = await parseMetadata(f, zod);
        if (parsedFile == null) {
            (0,logger/* getLogger */.j)().error(`No metadata present in ${f} skipping..`);
            return null;
        }
        return parsedFile;
    }))).filter((f)=>f != null);
};
const getPrinters = async ()=>{
    const defs = await (0,external_glob_.glob)(`${process.env.RATOS_CONFIGURATION_PATH}/printers/*/printer-definition.json`);
    return external_zod_.z.array(Printer).parse(defs.map((f)=>f.trim() === "" ? null : {
            ...JSON.parse((0,external_fs_.readFileSync)(f).toString()),
            path: f.replace("printer-definition.json", ""),
            id: f.replace("/printer-definition.json", "").split("/").pop()
        }).filter((f)=>f != null));
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
const deserializePartialPrinterConfiguration = async (config)=>{
    const boards = await (0,mcu/* getBoards */.DC)();
    const controlboard = boards.find((b)=>b.serialPath === config?.controlboard);
    const toolboard = boards.find((b)=>b.serialPath === config?.toolboard);
    return PartialPrinterConfiguration.parse({
        printer: (await getPrinters()).find((p)=>p.id === config?.printer),
        size: config?.size,
        hotend: (await parseDirectory("hotends", Hotend)).find((h)=>h.id === config?.hotend),
        extruder: (await parseDirectory("extruders", Extruder)).find((e)=>e.id === config?.extruder),
        probe: (await parseDirectory("z-probe", Probe)).find((p)=>p.id === config?.probe),
        thermistor: thermistors.find((t)=>t === config?.thermistor),
        xEndstop: xEndstopOptions(config).find((e)=>e.id === config?.xEndstop),
        yEndstop: yEndstopOptions(config).find((e)=>e.id === config?.yEndstop),
        partFan: partFanOptions({
            controlboard,
            toolboard
        }).find((f)=>f.id === config?.partFan),
        hotendFan: hotendFanOptions({
            controlboard,
            toolboard
        }).find((f)=>f.id === config?.hotendFan),
        controllerFan: controllerFanOptions({
            controlboard,
            toolboard
        }).find((f)=>f.id === config?.controllerFan),
        controlboard: controlboard,
        toolboard: toolboard,
        xAccelerometer: xAccelerometerOptions({
            controlboard,
            toolboard
        }).find((a)=>a.id === config?.xAccelerometer),
        yAccelerometer: yAccelerometerOptions({
            controlboard,
            toolboard
        }).find((a)=>a.id === config?.yAccelerometer),
        performanceMode: config?.performanceMode,
        stealthchop: config?.stealthchop,
        standstillStealth: config?.standstillStealth
    });
};
const deserializePrinterConfiguration = async (config)=>{
    const boards = await (0,mcu/* getBoards */.DC)();
    const controlboard = boards.find((b)=>b.serialPath === config?.controlboard);
    const toolboard = boards.find((b)=>b.serialPath === config?.toolboard);
    return printer_configuration_PrinterConfiguration.parse({
        printer: (await getPrinters()).find((p)=>p.id === config?.printer),
        size: config?.size,
        hotend: (await parseDirectory("hotends", Hotend)).find((h)=>h.id === config?.hotend),
        extruder: (await parseDirectory("extruders", Extruder)).find((e)=>e.id === config?.extruder),
        probe: (await parseDirectory("z-probe", Probe)).find((p)=>p.id === config?.probe),
        thermistor: thermistors.find((t)=>t === config?.thermistor),
        xEndstop: xEndstopOptions(config).find((e)=>e.id === config?.xEndstop),
        yEndstop: yEndstopOptions(config).find((e)=>e.id === config?.yEndstop),
        partFan: partFanOptions({
            controlboard,
            toolboard
        }).find((f)=>f.id === config?.partFan),
        hotendFan: hotendFanOptions({
            controlboard,
            toolboard
        }).find((f)=>f.id === config?.hotendFan),
        controllerFan: controllerFanOptions({
            controlboard,
            toolboard
        }).find((f)=>f.id === config?.controllerFan),
        controlboard: controlboard,
        toolboard: toolboard,
        xAccelerometer: xAccelerometerOptions({
            controlboard,
            toolboard
        }).find((a)=>a.id === config?.xAccelerometer),
        yAccelerometer: yAccelerometerOptions({
            controlboard,
            toolboard
        }).find((a)=>a.id === config?.yAccelerometer),
        performanceMode: config?.performanceMode,
        stealthchop: config?.stealthchop,
        standstillStealth: config?.standstillStealth,
        rails: config?.rails.map((r)=>deserializePrinterRail(r))
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
const generateKlipperConfiguration = async (config, overwritePrinterCfg = false, overwriteExtras)=>{
    const utils = constructKlipperConfigUtils(config);
    const extrasGenerator = constructKlipperConfigExtrasGenerator(config, utils);
    const helper = await constructKlipperConfigHelpers(config, extrasGenerator, utils);
    const { template , initialPrinterCfg  } = await __webpack_require__(5866)(`./${config.printer.template.replace("-printer.template.cfg", ".ts")}`);
    const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
    const renderedTemplate = template(config, helper).trim();
    const renderedPrinterCfg = initialPrinterCfg(config, helper).trim();
    const extras = extrasGenerator.getFilesToWrite(overwriteExtras);
    const filesToWrite = extras.concat([
        {
            fileName: "RatOS.cfg",
            content: renderedTemplate,
            overwrite: true
        },
        {
            fileName: "printer.cfg",
            content: renderedPrinterCfg,
            overwrite: !await isPrinterCfgInitialized() || overwritePrinterCfg
        }
    ]);
    const results = await Promise.all(filesToWrite.map(async (file)=>{
        let action = "created";
        try {
            await (0,external_util_.promisify)(external_fs_.access)(external_path_default().join(environment.KLIPPER_CONFIG_PATH, file.fileName), external_fs_.constants.F_OK);
            // At this point we know the file exists;
            if (file.overwrite) {
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
};
const regenerateKlipperConfiguration = async ()=>{
    const environment = schema/* serverSchema.parse */.Rz.parse(process.env);
    const configJson = (0,external_fs_.readFileSync)(external_path_default().join(environment.RATOS_DATA_DIR, "last-printer-settings.json"));
    const serializedConfig = SerializedPrinterConfiguration.parse(JSON.parse(configJson.toString()));
    const config = await deserializePrinterConfiguration(serializedConfig);
    return await generateKlipperConfiguration(config);
};
const printerRouter = (0,server_trpc/* router */.Nd)({
    printers: server_trpc/* publicProcedure.output */.$y.output(external_zod_.z.array(Printer)).query(async ()=>(await getPrinters()).sort((a, b)=>a.manufacturer === "Rat Rig" && (b.manufacturer !== "Rat Rig" || b.description.indexOf("Discontinued") > -1) ? -1 : a.name.localeCompare(b.name))),
    hotends: server_trpc/* publicProcedure.output */.$y.output(external_zod_.z.array(Hotend)).query(()=>parseDirectory("hotends", Hotend)),
    extruders: server_trpc/* publicProcedure.output */.$y.output(external_zod_.z.array(Extruder)).query(()=>parseDirectory("extruders", Extruder)),
    probes: server_trpc/* publicProcedure.output */.$y.output(external_zod_.z.array(Probe)).query(()=>parseDirectory("z-probe", Probe)),
    thermistors: server_trpc/* publicProcedure.query */.$y.query(()=>thermistors),
    xEndstops: server_trpc/* publicProcedure.input */.$y.input(printer_configuration_SerializedPartialPrinterConfiguration.nullable()).output(external_zod_.z.array(Endstop)).query((ctx)=>xEndstopOptions(ctx.input)),
    yEndstops: server_trpc/* publicProcedure.input */.$y.input(printer_configuration_SerializedPartialPrinterConfiguration.nullable()).output(external_zod_.z.array(Endstop)).query((ctx)=>yEndstopOptions(ctx.input)),
    partFanOptions: server_trpc/* publicProcedure.input */.$y.input(printer_configuration_SerializedPartialPrinterConfiguration.nullable()).output(external_zod_.z.array(Fan)).query(async (ctx)=>partFanOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
    hotendFanOptions: server_trpc/* publicProcedure.input */.$y.input(printer_configuration_SerializedPartialPrinterConfiguration.nullable()).output(external_zod_.z.array(Fan)).query(async (ctx)=>hotendFanOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
    controllerFanOptions: server_trpc/* publicProcedure.input */.$y.input(printer_configuration_SerializedPartialPrinterConfiguration.nullable()).output(external_zod_.z.array(Fan)).query(async (ctx)=>controllerFanOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
    xAccelerometerOptions: server_trpc/* publicProcedure.input */.$y.input(printer_configuration_SerializedPartialPrinterConfiguration.nullable()).output(external_zod_.z.array(Accelerometer)).query(async (ctx)=>xAccelerometerOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
    yAccelerometerOptions: server_trpc/* publicProcedure.input */.$y.input(printer_configuration_SerializedPartialPrinterConfiguration.nullable()).output(external_zod_.z.array(Accelerometer)).query(async (ctx)=>yAccelerometerOptions(await deserializePartialPrinterConfiguration(ctx.input ?? {}))),
    printercfgStatus: server_trpc/* publicProcedure.query */.$y.query(async (ctx)=>{
        return {
            isInitialized: await isPrinterCfgInitialized()
        };
    }),
    regenerateConfiguration: server_trpc/* publicProcedure.mutation */.$y.mutation(async ()=>{
        return await regenerateKlipperConfiguration();
    }),
    saveConfiguration: server_trpc/* publicProcedure.input */.$y.input(external_zod_.z.object({
        config: SerializedPrinterConfiguration,
        overwritePrinterCfg: external_zod_.z.boolean().default(false)
    })).mutation(async (ctx)=>{
        const { config: serializedConfig , overwritePrinterCfg  } = ctx.input;
        const config = await deserializePrinterConfiguration(serializedConfig);
        return await generateKlipperConfiguration(config, overwritePrinterCfg);
    })
});


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