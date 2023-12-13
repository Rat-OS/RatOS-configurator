"use strict";
exports.id = 312;
exports.ids = [312];
exports.modules = {

/***/ 1880:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ Drivers)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _zods_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6680);


const Drivers = zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_zods_motion__WEBPACK_IMPORTED_MODULE_1__/* .Driver */ .HB).parse([
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


/***/ }),

/***/ 1572:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Jt": () => (/* binding */ defaultXEndstop),
/* harmony export */   "Xo": () => (/* binding */ yEndstopOptions),
/* harmony export */   "uo": () => (/* binding */ xEndstopOptions)
/* harmony export */ });
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


/***/ }),

/***/ 817:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ Steppers),
/* harmony export */   "a": () => (/* binding */ findPreset)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _zods_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6680);


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

/***/ 8388:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* reexport safe */ _utils_trpc__WEBPACK_IMPORTED_MODULE_0__.SX),
/* harmony export */   "u": () => (/* reexport safe */ _utils_trpc__WEBPACK_IMPORTED_MODULE_0__.uF)
/* harmony export */ });
/* harmony import */ var _utils_trpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945);




/***/ }),

/***/ 2312:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "G3": () => (/* binding */ usePrinterConfiguration),
/* harmony export */   "J7": () => (/* binding */ PrinterConfigurationState),
/* harmony export */   "dp": () => (/* binding */ XEndstopState),
/* harmony export */   "ew": () => (/* binding */ PrinterRailState),
/* harmony export */   "gd": () => (/* binding */ serializePartialPrinterConfiguration),
/* harmony export */   "h$": () => (/* binding */ serializePrinterConfiguration)
/* harmony export */ });
/* unused harmony exports PrinterState, PrinterSizeState, HotendState, ThermistorState, ExtruderState, ProbeState, YEndstopState, ControlboardState, ToolboardState, PrinterRailsState */
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _zods_boards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(95);
/* harmony import */ var _zods_hardware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7670);
/* harmony import */ var _zods_printer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5996);
/* harmony import */ var _zods_printer_configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4342);
/* harmony import */ var _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8388);
/* harmony import */ var recoil_sync__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4101);
/* harmony import */ var recoil_sync__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(recoil_sync__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var zod_refine__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5140);
/* harmony import */ var zod_refine__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(zod_refine__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _data_endstops__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1572);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _recoiljs_refine__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(7856);
/* harmony import */ var _recoiljs_refine__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_recoiljs_refine__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _zods_motion__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(6680);
/* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(206);















const readPrinterAtom = async ({ read  })=>{
    const printer = await read(PrinterState.key);
    if (printer != null) {
        const printerId = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
            id: _zods_printer__WEBPACK_IMPORTED_MODULE_4__/* .Printer.shape.id */ .F.shape.id
        }).safeParse(printer);
        if (printerId.success) {
            const printerReq = await _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpcClient.printer.printers.query */ .u.printer.printers.query();
            const newPrinter = printerReq.find((p)=>p.id === printerId.data.id);
            return newPrinter ?? null;
        }
    }
    return null;
};
const PrinterState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "Printer",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            read: readPrinterAtom,
            refine: (0,_recoiljs_refine__WEBPACK_IMPORTED_MODULE_11__.match)((0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_printer__WEBPACK_IMPORTED_MODULE_4__/* .Printer.nullable */ .F.nullable()))
        })
    ]
});
const PrinterSizeState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "PrinterOption",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_printer__WEBPACK_IMPORTED_MODULE_4__/* .Printer.shape.sizes.unwrap */ .F.shape.sizes.unwrap().element.nullable())
        })
    ]
});
const HotendState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "Hotend",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_hardware__WEBPACK_IMPORTED_MODULE_3__/* .Hotend.nullable */ .Uy.nullable())
        })
    ]
});
const ThermistorState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "Thermistor",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_hardware__WEBPACK_IMPORTED_MODULE_3__/* .Thermistor.nullable */ .Mf.nullable())
        })
    ]
});
const ExtruderState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "Extruder",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_hardware__WEBPACK_IMPORTED_MODULE_3__/* .Extruder.nullable */ .U3.nullable())
        })
    ]
});
const ProbeState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "Probe",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_hardware__WEBPACK_IMPORTED_MODULE_3__/* .Probe.nullable */ .lV.nullable())
        })
    ]
});
const XEndstopState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "XEndstop",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_hardware__WEBPACK_IMPORTED_MODULE_3__/* .Endstop.nullable */ .ws.nullable())
        })
    ]
});
const YEndstopState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "YEndstop",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_hardware__WEBPACK_IMPORTED_MODULE_3__/* .Endstop.nullable */ .ws.nullable())
        })
    ]
});
const ControlboardState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "Controlboard",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            read: async ({ read  })=>{
                const board = await read(ControlboardState.key);
                if (board != null) {
                    const boardId = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
                        path: _zods_boards__WEBPACK_IMPORTED_MODULE_2__/* .Board.shape.path */ .$l.shape.path
                    }).safeParse(board);
                    if (boardId.success) {
                        const boardReq = await _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpcClient.mcu.boards.query */ .u.mcu.boards.query({
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
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_boards__WEBPACK_IMPORTED_MODULE_2__/* .Board.nullable */ .$l.nullable())
        })
    ]
});
const _ToolboardState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "Toolboard",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            read: async ({ read  })=>{
                const board = await read(_ToolboardState.key);
                if (board != null) {
                    const boardId = zod__WEBPACK_IMPORTED_MODULE_1__.z.object({
                        path: _zods_boards__WEBPACK_IMPORTED_MODULE_2__/* .Board.shape.path */ .$l.shape.path
                    }).safeParse(board);
                    if (boardId.success) {
                        const boardReq = await _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpcClient.mcu.boards.query */ .u.mcu.boards.query({
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
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_boards__WEBPACK_IMPORTED_MODULE_2__/* .Toolboard.nullable */ .MG.nullable())
        })
    ]
});
const PerformanceModeState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "PerformanceMode",
    default: false,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(zod__WEBPACK_IMPORTED_MODULE_1__.z.boolean().optional().nullable())
        })
    ]
});
const StealthchopState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "Stealchop",
    default: false,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(zod__WEBPACK_IMPORTED_MODULE_1__.z.boolean().optional().nullable())
        })
    ]
});
const StandstillStealthState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "StandstillStealth",
    default: false,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(zod__WEBPACK_IMPORTED_MODULE_1__.z.boolean().optional().nullable())
        })
    ]
});
const XAccelerometerState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "XAccelerometer",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_hardware__WEBPACK_IMPORTED_MODULE_3__/* .Accelerometer.nullable */ .M3.nullable())
        })
    ]
});
const YAccelerometerState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "YAccelerometer",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_hardware__WEBPACK_IMPORTED_MODULE_3__/* .Accelerometer.nullable */ .M3.nullable())
        })
    ]
});
const PartFanState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "PartFan",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_hardware__WEBPACK_IMPORTED_MODULE_3__/* .Fan.nullable */ .XG.nullable())
        })
    ]
});
const HotendFanState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "HotendFan",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_hardware__WEBPACK_IMPORTED_MODULE_3__/* .Fan.nullable */ .XG.nullable())
        })
    ]
});
const ControllerFanState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "ControllerFan",
    default: null,
    effects: [
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_hardware__WEBPACK_IMPORTED_MODULE_3__/* .Fan.nullable */ .XG.nullable())
        })
    ]
});
const ToolboardState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.selector)({
    key: "ToolboardSelector",
    set: ({ set , get  }, newValue)=>{
        const xEndstop = get(XEndstopState);
        if (newValue == null && xEndstop?.id === "endstop-toolboard") {
            set(XEndstopState, _data_endstops__WEBPACK_IMPORTED_MODULE_9__/* .defaultXEndstop */ .Jt);
        }
        set(_ToolboardState, newValue);
    },
    get: ({ get  })=>{
        return get(_ToolboardState);
    }
});
const PrinterRailState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atomFamily)({
    key: "PrinterRail",
    default: null,
    effects: (param)=>[
            (0,recoil_sync__WEBPACK_IMPORTED_MODULE_7__.syncEffect)({
                read: async ({ read  })=>{
                    const printerRailState = await read(PrinterRailState(param).key);
                    if (printerRailState != null) {
                        const parsedRail = _zods_motion__WEBPACK_IMPORTED_MODULE_12__/* .SerializedPrinterRail.safeParse */ .Ah.safeParse(printerRailState);
                        if (parsedRail.success) {
                            return parsedRail.data;
                        }
                        const printer = await readPrinterAtom({
                            read
                        });
                        const printerRailDefault = printer?.defaults.rails.find((r)=>r.axis === param);
                        if (printerRailDefault != null) {
                            const parsedRailRepaired = _zods_motion__WEBPACK_IMPORTED_MODULE_12__/* .SerializedPrinterRail.safeParse */ .Ah.safeParse({
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
                refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_8__.getRefineCheckerForZodSchema)(_zods_motion__WEBPACK_IMPORTED_MODULE_12__/* .SerializedPrinterRail.nullable */ .Ah.nullable())
            })
        ]
});
const PrinterRailsState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.selector)({
    key: "PrinterRails",
    get: ({ get  })=>{
        const printer = get(PrinterState);
        const rails = printer?.defaults.rails.map((rail)=>{
            const railState = get(PrinterRailState(rail.axis));
            return (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_13__/* .deserializePrinterRail */ .Ak)(railState ?? rail);
        });
        return rails ?? [];
    },
    set: ({ set  }, newValue)=>{
        if (newValue instanceof recoil__WEBPACK_IMPORTED_MODULE_0__.DefaultValue) {
            Object.values(_zods_motion__WEBPACK_IMPORTED_MODULE_12__/* .PrinterAxis */ .po).forEach((axis)=>{
                set(PrinterRailState(axis), null);
            });
            return;
        }
        newValue.forEach((rail)=>{
            set(PrinterRailState(rail.axis), (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_13__/* .serializePrinterRail */ .Yz)(rail));
        });
    }
});
const PrinterConfigurationState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.selector)({
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
        const printerConfig = _zods_printer_configuration__WEBPACK_IMPORTED_MODULE_5__/* .PartialPrinterConfiguration.safeParse */ .jz.safeParse({
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
    return _zods_printer_configuration__WEBPACK_IMPORTED_MODULE_5__/* .SerializedPrinterConfiguration.parse */ .q_.parse(serializedConfig);
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
    return _zods_printer_configuration__WEBPACK_IMPORTED_MODULE_5__/* .SerializedPartialPrinterConfiguration.parse */ .NN.parse(serializedConfig);
};
const usePrinterConfiguration = ()=>{
    const [selectedPrinter, setSelectedPrinter] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(PrinterState);
    const [selectedPrinterOption, setSelectedPrinterOption] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(PrinterSizeState);
    const [selectedHotend, setSelectedHotend] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(HotendState);
    const [selectedExtruder, _setSelectedExtruder] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(ExtruderState);
    const [selectedThermistor, setSelectedThermistor] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(ThermistorState);
    const [selectedProbe, setSelectedProbe] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(ProbeState);
    const [selectedXEndstop, setSelectedXEndstop] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(XEndstopState);
    const [selectedYEndstop, setSelectedYEndstop] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(YEndstopState);
    const [selectedBoard, setSelectedBoard] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(ControlboardState);
    const [selectedToolboard, setSelectedToolboard] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(ToolboardState);
    const [selectedXAccelerometer, setSelectedXAccelerometer] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(XAccelerometerState);
    const [selectedYAccelerometer, setSelectedYAccelerometer] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(YAccelerometerState);
    const [performanceMode, setPerformanceMode] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(PerformanceModeState);
    const [stealthchop, setStealthchop] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(StealthchopState);
    const [standstillStealth, setStandstillStealth] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(StandstillStealthState);
    const [selectedPartFan, setSelectedPartFan] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(PartFanState);
    const [selectedHotendFan, setSelectedHotendFan] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(HotendFanState);
    const [selectedControllerFan, setSelectedControllerFan] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(ControllerFanState);
    const [selectedPrinterRails, setSelectedPrinterRails] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(PrinterRailsState);
    const resetSelectedPrinterRails = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useResetRecoilState)(PrinterRailsState);
    const printerConfiguration = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilValue)(PrinterConfigurationState);
    const serializedPrinterConfiguration = (0,react__WEBPACK_IMPORTED_MODULE_10__.useMemo)(()=>serializePartialPrinterConfiguration(printerConfiguration ?? {}), [
        printerConfiguration
    ]);
    const setExtruderRail = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useSetRecoilState)(PrinterRailState(_zods_motion__WEBPACK_IMPORTED_MODULE_12__/* .PrinterAxis.extruder */ .po.extruder));
    const hotends = _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpc.printer.hotends.useQuery */ .S.printer.hotends.useQuery();
    const boards = _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpc.mcu.boards.useQuery */ .S.mcu.boards.useQuery({});
    const extruders = _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpc.printer.extruders.useQuery */ .S.printer.extruders.useQuery();
    const thermistors = _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpc.printer.thermistors.useQuery */ .S.printer.thermistors.useQuery();
    const probes = _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpc.printer.probes.useQuery */ .S.printer.probes.useQuery();
    const xEndstops = _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpc.printer.xEndstops.useQuery */ .S.printer.xEndstops.useQuery(serializedPrinterConfiguration, {
        keepPreviousData: true
    });
    const yEndstops = _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpc.printer.yEndstops.useQuery */ .S.printer.yEndstops.useQuery(serializedPrinterConfiguration, {
        keepPreviousData: true
    });
    const partFanOptions = _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpc.printer.partFanOptions.useQuery */ .S.printer.partFanOptions.useQuery(serializedPrinterConfiguration, {
        keepPreviousData: true
    });
    const hotendFanOptions = _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpc.printer.hotendFanOptions.useQuery */ .S.printer.hotendFanOptions.useQuery(serializedPrinterConfiguration, {
        keepPreviousData: true
    });
    const controllerFanOptions = _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpc.printer.controllerFanOptions.useQuery */ .S.printer.controllerFanOptions.useQuery(serializedPrinterConfiguration, {
        keepPreviousData: true
    });
    const xAccelerometerOptions = _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpc.printer.xAccelerometerOptions.useQuery */ .S.printer.xAccelerometerOptions.useQuery(serializedPrinterConfiguration, {
        keepPreviousData: true
    });
    const yAccelerometerOptions = _helpers_trpc__WEBPACK_IMPORTED_MODULE_6__/* .trpc.printer.yAccelerometerOptions.useQuery */ .S.printer.yAccelerometerOptions.useQuery(serializedPrinterConfiguration, {
        keepPreviousData: true
    });
    const setSelectedExtruder = (0,react__WEBPACK_IMPORTED_MODULE_10__.useCallback)((extruder)=>{
        _setSelectedExtruder(extruder);
        // If the extruder has a stepper, set the extruder rail to use that stepper
        if (extruder != null) {
            if (extruder.stepper != null) {
                const stepper = (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_13__/* .deserializeStepper */ .WZ)(extruder.stepper);
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
    const setPrinterDefaults = (0,react__WEBPACK_IMPORTED_MODULE_10__.useCallback)((printer)=>{
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
            const _toolboard = _zods_boards__WEBPACK_IMPORTED_MODULE_2__/* .Toolboard.safeParse */ .MG.safeParse(toolboard);
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
    const parsedPrinterConfiguration = _zods_printer_configuration__WEBPACK_IMPORTED_MODULE_5__/* .PrinterConfiguration.safeParse */ .dl.safeParse({
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


/***/ }),

/***/ 206:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ak": () => (/* binding */ deserializePrinterRail),
/* harmony export */   "Df": () => (/* binding */ deserializeDriver),
/* harmony export */   "Oj": () => (/* binding */ deserializePrinterRailDefinition),
/* harmony export */   "WZ": () => (/* binding */ deserializeStepper),
/* harmony export */   "Yz": () => (/* binding */ serializePrinterRail)
/* harmony export */ });
/* harmony import */ var _data_drivers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1880);
/* harmony import */ var _zods_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6680);
/* harmony import */ var _data_steppers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(817);



const deserializeDriver = (driverId)=>{
    return _data_drivers__WEBPACK_IMPORTED_MODULE_0__/* .Drivers.find */ .N.find((d)=>d.id === driverId) ?? null;
};
const deserializeStepper = (stepperId)=>{
    return _data_steppers__WEBPACK_IMPORTED_MODULE_2__/* .Steppers.find */ .B.find((d)=>d.id === stepperId) ?? null;
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
    return _zods_motion__WEBPACK_IMPORTED_MODULE_1__/* .BasePrinterRail.parse */ .g6.parse({
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
    return _zods_motion__WEBPACK_IMPORTED_MODULE_1__/* .PrinterRailDefinition.parse */ .P6.parse({
        ...rail,
        stepper,
        driver
    });
};
const serializePrinterRail = (rail)=>{
    return _zods_motion__WEBPACK_IMPORTED_MODULE_1__/* .SerializedPrinterRail.parse */ .Ah.parse({
        ...rail,
        driver: rail.driver.id,
        stepper: rail.stepper.id
    });
};


/***/ }),

/***/ 95:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$l": () => (/* binding */ Board),
/* harmony export */   "AN": () => (/* binding */ AutoFlashableBoard),
/* harmony export */   "Ai": () => (/* binding */ BoardWithDetectionStatus),
/* harmony export */   "Fh": () => (/* binding */ ExtruderlessControlBoardPinMap),
/* harmony export */   "MG": () => (/* binding */ Toolboard),
/* harmony export */   "MW": () => (/* binding */ ControlBoardPinMap),
/* harmony export */   "Oy": () => (/* binding */ ToolboardPinMap)
/* harmony export */ });
/* unused harmony export PinMap */
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6680);


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

/***/ 7670:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _env_schema_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6165);
/* harmony import */ var _motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6680);



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
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_1__.serverSchema.parse(process.env);
    startsWithServerValidation = environment.RATOS_CONFIGURATION_PATH;
}
const hardwareType = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    path: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().startsWith(startsWithServerValidation).endsWith(".cfg"),
    id: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().endsWith(".cfg")
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

/***/ 4342:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NN": () => (/* binding */ SerializedPartialPrinterConfiguration),
/* harmony export */   "dl": () => (/* binding */ PrinterConfiguration),
/* harmony export */   "jz": () => (/* binding */ PartialPrinterConfiguration),
/* harmony export */   "q_": () => (/* binding */ SerializedPrinterConfiguration)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _boards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95);
/* harmony import */ var _hardware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7670);
/* harmony import */ var _printer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5996);
/* harmony import */ var _motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6680);





const BasePrinterConfiguration = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    printer: _printer__WEBPACK_IMPORTED_MODULE_3__/* .Printer */ .F,
    hotend: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Hotend */ .Uy,
    thermistor: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Thermistor */ .Mf,
    extruder: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Extruder */ .U3,
    probe: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Probe.optional */ .lV.optional(),
    xEndstop: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Endstop */ .ws,
    yEndstop: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Endstop */ .ws,
    controlboard: _boards__WEBPACK_IMPORTED_MODULE_1__/* .Board */ .$l,
    toolboard: _boards__WEBPACK_IMPORTED_MODULE_1__/* .Board.optional */ .$l.optional().nullable(),
    size: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().optional().nullable(),
    partFan: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Fan */ .XG,
    controllerFan: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Fan */ .XG,
    hotendFan: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Fan */ .XG,
    xAccelerometer: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Accelerometer.optional */ .M3.optional().nullable(),
    yAccelerometer: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Accelerometer.optional */ .M3.optional().nullable(),
    performanceMode: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().default(false),
    stealthchop: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().default(false),
    standstillStealth: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().default(false),
    rails: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_motion__WEBPACK_IMPORTED_MODULE_4__/* .PrinterRail */ .JQ)
});
const PrinterConfiguration = BasePrinterConfiguration.refine((data)=>data.size == null || (data.printer.sizes?.length ?? 0) > 0 && data.size != null, "Printer size must be provided if printer has size options, otherwise it must be omitted").refine((data)=>data.toolboard !== null || data.xEndstop.id !== "endstop-toolboard", "Cannot use toolboard endstop without a toolboard").refine((data)=>data.controlboard.driverCount >= data.printer.driverCountRequired || data.toolboard != null, "You have to select a toolboard to use this printer and controlboard combo");
const SerializedPrinterConfiguration = BasePrinterConfiguration.extend({
    printer: _printer__WEBPACK_IMPORTED_MODULE_3__/* .Printer.shape.id */ .F.shape.id,
    hotend: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Hotend.shape.id */ .Uy.shape.id,
    thermistor: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Thermistor */ .Mf,
    extruder: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Extruder.shape.id */ .U3.shape.id,
    probe: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Probe.shape.id.optional */ .lV.shape.id.optional().nullable(),
    xEndstop: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Endstop.shape.id */ .ws.shape.id,
    yEndstop: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Endstop.shape.id */ .ws.shape.id,
    controlboard: _boards__WEBPACK_IMPORTED_MODULE_1__/* .Board.shape.serialPath */ .$l.shape.serialPath,
    toolboard: _boards__WEBPACK_IMPORTED_MODULE_1__/* .Board.shape.serialPath.optional */ .$l.shape.serialPath.optional().nullable(),
    partFan: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Fan.shape.id */ .XG.shape.id,
    controllerFan: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Fan.shape.id */ .XG.shape.id,
    hotendFan: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Fan.shape.id */ .XG.shape.id,
    xAccelerometer: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Accelerometer.shape.id.optional */ .M3.shape.id.optional().nullable(),
    yAccelerometer: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Accelerometer.shape.id.optional */ .M3.shape.id.optional().nullable(),
    rails: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_motion__WEBPACK_IMPORTED_MODULE_4__/* .SerializedPrinterRail */ .Ah)
});
const PartialPrinterConfiguration = PrinterConfiguration.innerType().innerType().innerType().partial().optional();
const SerializedPartialPrinterConfiguration = SerializedPrinterConfiguration.partial();


/***/ }),

/***/ 5996:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ Printer)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _env_schema_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6165);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6680);




let startsWithServerValidation = "";
if (process.env.RATOS_CONFIGURATION_PATH) {
    const environment = _env_schema_mjs__WEBPACK_IMPORTED_MODULE_1__.serverSchema.parse(process.env);
    startsWithServerValidation = path__WEBPACK_IMPORTED_MODULE_2___default().join(environment.RATOS_CONFIGURATION_PATH, "printers");
}
const SpeedLimits = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    velocity: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().min(0).describe("Maximum velocity for this printer"),
    accel: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().min(0).describe("Maximum acceleration for this printer"),
    z_velocity: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().min(0).describe("Maximum z velocity for this printer"),
    z_accel: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().min(0).describe("Maximum z acceleration for this printer"),
    square_corner_velocity: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().min(0).default(5).describe("Maximum square corner velocity for this printer")
});
const Printer = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    id: zod__WEBPACK_IMPORTED_MODULE_0__.z.string(),
    name: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().describe("The name of the printer"),
    description: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().describe("A description of the printer"),
    manufacturer: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().describe("The name of the manufacturer of this printer"),
    documentationLink: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().describe("Link to the RatOS documentation for this printer"),
    image: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().describe("Link to an image of the printer"),
    sizes: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(zod__WEBPACK_IMPORTED_MODULE_0__.z.number()).describe("Size options for this printer").optional(),
    template: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().describe("Printer.cfg template for this printer"),
    path: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().startsWith(startsWithServerValidation),
    driverCountRequired: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().describe("Number of drivers required for this printer"),
    speedLimits: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        basic: SpeedLimits,
        performance: SpeedLimits.optional()
    }).describe("Speed limits for this printer"),
    defaults: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        extruder: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().describe("Default extruder for this printer. Should be the name of the config without the file extension."),
        board: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().describe("Default board for this printer. Should be the name of the board directory."),
        toolboard: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().describe("Default toolboard for this printer. Should be the name of the board directory.").optional(),
        hotend: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().describe("Default hotend for this printer. Should be the name of the config without the file extension."),
        probe: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().describe("Default probe for this printer. Should be the name of the config without the file extension.").optional(),
        xEndstop: zod__WEBPACK_IMPORTED_MODULE_0__.z["enum"]([
            "endstop",
            "endstop-toolboard",
            "sensorless"
        ]).describe("Default x endstop for this printer"),
        yEndstop: zod__WEBPACK_IMPORTED_MODULE_0__.z["enum"]([
            "sensorless",
            "endstop"
        ]).describe("Default y endstop for this printer"),
        rails: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_motion__WEBPACK_IMPORTED_MODULE_3__/* .SerializedPrinterRailDefinition */ .r).describe("Default rails for this printer")
    }).describe("Default hardware for this printer")
}).describe("A RatOS supported 3d printer");


/***/ })

};
;