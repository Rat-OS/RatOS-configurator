"use strict";
exports.id = 377;
exports.ids = [377];
exports.modules = {

/***/ 485:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "YG": () => (/* binding */ SyncWithMoonraker),
/* harmony export */   "rR": () => (/* binding */ moonrakerWriteEffect)
/* harmony export */ });
/* unused harmony export DispatchSaveAtomEvent */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _hooks_useMoonraker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3718);
/* harmony import */ var recoil_sync__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4101);
/* harmony import */ var recoil_sync__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(recoil_sync__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_4__);





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
    const moonraker = (0,_hooks_useMoonraker__WEBPACK_IMPORTED_MODULE_2__/* .useMoonraker */ .o)();
    const read = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (itemKey)=>{
        const value = await moonraker.getItem(itemKey);
        return value != null ? value : new recoil__WEBPACK_IMPORTED_MODULE_4__.DefaultValue();
    }, [
        moonraker
    ]);
    const write = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async ({ diff  })=>{
        console.debug("Currently sidestepping recoil sync writes because of major bug: https://github.com/facebookexperimental/Recoil/issues/2059");
        return;
    // for (const [key, value] of diff) {
    // await moonraker.saveItem(key, value);
    // }
    }, []);
    const saveAtom = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(async (event)=>{
        const { itemKey , value  } = event.detail;
        await moonraker.saveItem(itemKey, value);
    }, [
        moonraker
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        moonrakerSyncEventEmitter.addEventListener("saveAtom", saveAtom);
        return ()=>{
            moonrakerSyncEventEmitter.removeEventListener("saveAtom", saveAtom);
        };
    }, [
        saveAtom
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(recoil_sync__WEBPACK_IMPORTED_MODULE_3__.RecoilSync, {
        read: read,
        write: write,
        children: children
    });
};


/***/ }),

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
/* harmony import */ var _zods_motion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6680);

const xEndstopOptions = (config, toolheadConfig)=>{
    const endstops = [];
    if (toolheadConfig?.toolboard != null) {
        endstops.push({
            id: "endstop-toolboard",
            title: "Physical Endstop (toolboard)"
        });
    }
    if (toolheadConfig?.axis === _zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.x */ .po.x) {
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


/***/ }),

/***/ 7645:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VD": () => (/* binding */ controllerFanOptions),
/* harmony export */   "Yo": () => (/* binding */ hotendFanOptions),
/* harmony export */   "gL": () => (/* binding */ partFanOptions),
/* harmony export */   "z2": () => (/* binding */ defaultControllerFan)
/* harmony export */ });
/* harmony import */ var _zods_motion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6680);

const partFanOptions = (config, toolheadConfig)=>{
    const fans = [];
    if (toolheadConfig == null || toolheadConfig?.axis === _zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.x */ .po.x || toolheadConfig?.axis === null) {
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
    if (toolheadConfig == null || toolheadConfig?.axis === _zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.x */ .po.x) {
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

/***/ 7187:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D": () => (/* binding */ ToolheadHelper)
/* harmony export */ });
/* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(206);
/* harmony import */ var _zods_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6680);
/* harmony import */ var _zods_toolhead__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4130);



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

/***/ 8388:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* reexport safe */ _utils_trpc__WEBPACK_IMPORTED_MODULE_0__.SX),
/* harmony export */   "u": () => (/* reexport safe */ _utils_trpc__WEBPACK_IMPORTED_MODULE_0__.uF)
/* harmony export */ });
/* harmony import */ var _utils_trpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945);




/***/ }),

/***/ 3718:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ useMoonraker)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_use_websocket__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7636);
/* harmony import */ var react_use_websocket__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_use_websocket__WEBPACK_IMPORTED_MODULE_1__);


let REQ_ID = 0;
const getWsURL = (hostname)=>{
    const host = hostname != null && hostname.trim() != "" ? hostname :  true && "".trim() != "" ? "" :  false ? 0 : "";
    if (host == null || host.trim() == "") {
        return null;
    }
    return `ws://${host}/websocket`;
};
const useMoonraker = (hostname)=>{
    const inFlightRequests = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({});
    const inFlightRequestTimeouts = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({});
    const onReadyCallbacks = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)([]);
    const [wsUrl, setWsUrl] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getWsURL(hostname));
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        setWsUrl(getWsURL(hostname));
    }, [
        hostname
    ]);
    const { lastJsonMessage , sendJsonMessage , readyState  } = react_use_websocket__WEBPACK_IMPORTED_MODULE_1___default()(wsUrl, {
        shouldReconnect: (closeEvent)=>{
            return true;
        },
        reconnectAttempts: Infinity,
        reconnectInterval: 3000,
        share: true
    });
    const readyStateRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(readyState);
    readyStateRef.current = readyState;
    const [moonrakerStatus, setMoonrakerStatus] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(readyState === 1 ? "connected" : "connecting");
    const [moonrakerMessage, setMoonrakerMessage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(lastJsonMessage);
    const whenReady = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((callback)=>{
        if (readyStateRef.current === 1) {
            callback();
        } else {
            onReadyCallbacks.current.push(callback);
        }
    }, []);
    const isReady = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>new Promise((resolve, reject)=>{
            whenReady(()=>{
                resolve();
            });
        }), [
        whenReady
    ]);
    const moonrakerQuery = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (method, params = {})=>{
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
    const saveItem = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (key, value)=>{
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
    const getItem = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (key)=>{
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
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
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
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
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
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
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


/***/ }),

/***/ 2312:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Am": () => (/* binding */ StealthchopState),
/* harmony export */   "G3": () => (/* binding */ usePrinterConfiguration),
/* harmony export */   "J7": () => (/* binding */ PrinterConfigurationState),
/* harmony export */   "TD": () => (/* binding */ useSerializedPrinterConfiguration),
/* harmony export */   "Yq": () => (/* binding */ StandstillStealthState),
/* harmony export */   "ad": () => (/* binding */ PerformanceModeState),
/* harmony export */   "gd": () => (/* binding */ serializePartialPrinterConfiguration),
/* harmony export */   "h$": () => (/* binding */ serializePrinterConfiguration),
/* harmony export */   "i$": () => (/* binding */ ControllerFanState)
/* harmony export */ });
/* unused harmony export LoadablePrinterConfigurationState */
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _zods_hardware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7670);
/* harmony import */ var _zods_printer_configuration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4342);
/* harmony import */ var recoil_sync__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4101);
/* harmony import */ var recoil_sync__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(recoil_sync__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var zod_refine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5140);
/* harmony import */ var zod_refine__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(zod_refine__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(206);
/* harmony import */ var _recoil_printer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5155);
/* harmony import */ var _recoil_toolhead__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8289);
/* harmony import */ var _data_fans__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7645);
/* harmony import */ var _components_sync_with_moonraker__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(485);












const PerformanceModeState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "PerformanceMode",
    default: false,
    effects: [
        (0,_components_sync_with_moonraker__WEBPACK_IMPORTED_MODULE_11__/* .moonrakerWriteEffect */ .rR)(),
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_4__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_5__.getRefineCheckerForZodSchema)(zod__WEBPACK_IMPORTED_MODULE_1__.z.boolean().optional().nullable())
        })
    ]
});
const StealthchopState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "Stealchop",
    default: false,
    effects: [
        (0,_components_sync_with_moonraker__WEBPACK_IMPORTED_MODULE_11__/* .moonrakerWriteEffect */ .rR)(),
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_4__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_5__.getRefineCheckerForZodSchema)(zod__WEBPACK_IMPORTED_MODULE_1__.z.boolean().optional().nullable())
        })
    ]
});
const StandstillStealthState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "StandstillStealth",
    default: false,
    effects: [
        (0,_components_sync_with_moonraker__WEBPACK_IMPORTED_MODULE_11__/* .moonrakerWriteEffect */ .rR)(),
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_4__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_5__.getRefineCheckerForZodSchema)(zod__WEBPACK_IMPORTED_MODULE_1__.z.boolean().optional().nullable())
        })
    ]
});
const ControllerFanState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atom)({
    key: "ControllerFan",
    default: _data_fans__WEBPACK_IMPORTED_MODULE_10__/* .defaultControllerFan */ .z2,
    effects: [
        (0,_components_sync_with_moonraker__WEBPACK_IMPORTED_MODULE_11__/* .moonrakerWriteEffect */ .rR)(),
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_4__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_5__.getRefineCheckerForZodSchema)(_zods_hardware__WEBPACK_IMPORTED_MODULE_2__/* .Fan.nullable */ .XG.nullable())
        })
    ]
});
const PrinterConfigurationState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.selector)({
    key: "PrinterConfiguration",
    get: async ({ get  })=>{
        const { printer , printerSize , performanceMode , stealthchop , standstillStealth , rails , controlboard , controllerFan , toolheads  } = get((0,recoil__WEBPACK_IMPORTED_MODULE_0__.waitForAll)({
            printer: _recoil_printer__WEBPACK_IMPORTED_MODULE_8__/* .PrinterState */ .H6,
            printerSize: _recoil_printer__WEBPACK_IMPORTED_MODULE_8__/* .PrinterSizeState */ .hq,
            performanceMode: PerformanceModeState,
            stealthchop: StealthchopState,
            standstillStealth: StandstillStealthState,
            rails: _recoil_printer__WEBPACK_IMPORTED_MODULE_8__/* .PrinterRailsState */ .q7,
            controlboard: _recoil_printer__WEBPACK_IMPORTED_MODULE_8__/* .ControlboardState */ .OS,
            controllerFan: ControllerFanState,
            toolheads: _recoil_toolhead__WEBPACK_IMPORTED_MODULE_9__/* .PrinterToolheadsState */ .$T
        }));
        const printerConfig = _zods_printer_configuration__WEBPACK_IMPORTED_MODULE_3__/* .PartialPrinterConfiguration.safeParse */ .jz.safeParse({
            printer: printer == null ? null : {
                ...printer,
                defaults: {
                    ...printer.defaults,
                    toolheads: printer?.defaults.toolheads.map((th)=>(0,_utils_serialization__WEBPACK_IMPORTED_MODULE_7__/* .serializeToolheadConfiguration */ .m6)(th))
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
const LoadablePrinterConfigurationState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.selector)({
    key: "LoadablePrinterConfigurationState",
    get: async ({ get  })=>{
        const loadable = get((0,recoil__WEBPACK_IMPORTED_MODULE_0__.noWait)(PrinterConfigurationState));
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
        toolheads: config.toolheads.map((toolhead)=>(0,_utils_serialization__WEBPACK_IMPORTED_MODULE_7__/* .serializeToolheadConfiguration */ .m6)(toolhead)),
        size: config.size,
        controlboard: config.controlboard.id,
        controllerFan: config.controllerFan.id,
        performanceMode: config.performanceMode,
        stealthchop: config.stealthchop,
        standstillStealth: config.standstillStealth,
        rails: config.rails.map((rail)=>(0,_utils_serialization__WEBPACK_IMPORTED_MODULE_7__/* .serializePrinterRail */ .Yz)(rail))
    };
    return _zods_printer_configuration__WEBPACK_IMPORTED_MODULE_3__/* .SerializedPrinterConfiguration.parse */ .q_.parse(serializedConfig);
};
const serializePartialPrinterConfiguration = (config)=>{
    const toolheads = config?.toolheads?.map((toolhead)=>(0,_utils_serialization__WEBPACK_IMPORTED_MODULE_7__/* .serializePartialToolheadConfiguration */ .od)(toolhead));
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
    return _zods_printer_configuration__WEBPACK_IMPORTED_MODULE_3__/* .SerializedPartialPrinterConfiguration.parse */ .NN.parse(serializedConfig);
};
const useSerializedPrinterConfiguration = ()=>{
    const printerConfiguration = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilValue)(LoadablePrinterConfigurationState);
    const serializedPrinterConfiguration = (0,react__WEBPACK_IMPORTED_MODULE_6__.useMemo)(()=>serializePartialPrinterConfiguration(printerConfiguration ?? {}), [
        printerConfiguration
    ]);
    return serializedPrinterConfiguration;
};
const usePrinterConfiguration = ()=>{
    const [selectedPrinter, setSelectedPrinter] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(_recoil_printer__WEBPACK_IMPORTED_MODULE_8__/* .PrinterState */ .H6);
    const [selectedPrinterOption, setSelectedPrinterOption] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(_recoil_printer__WEBPACK_IMPORTED_MODULE_8__/* .PrinterSizeState */ .hq);
    const [selectedBoard, setSelectedBoard] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(_recoil_printer__WEBPACK_IMPORTED_MODULE_8__/* .ControlboardState */ .OS);
    const [performanceMode, setPerformanceMode] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(PerformanceModeState);
    const [stealthchop, setStealthchop] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(StealthchopState);
    const [standstillStealth, setStandstillStealth] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(StandstillStealthState);
    const [selectedControllerFan, setSelectedControllerFan] = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilState)(ControllerFanState);
    const selectedPrinterRails = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilValue)(_recoil_printer__WEBPACK_IMPORTED_MODULE_8__/* .LoadablePrinterRailsState */ .Om);
    const printerConfiguration = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.useRecoilValue)(LoadablePrinterConfigurationState);
    const serializedPrinterConfiguration = useSerializedPrinterConfiguration();
    const parsedPrinterConfiguration = _zods_printer_configuration__WEBPACK_IMPORTED_MODULE_3__/* .PrinterConfiguration.safeParse */ .dl.safeParse(printerConfiguration);
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


/***/ }),

/***/ 5155:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "H6": () => (/* binding */ PrinterState),
/* harmony export */   "OS": () => (/* binding */ ControlboardState),
/* harmony export */   "Om": () => (/* binding */ LoadablePrinterRailsState),
/* harmony export */   "Xu": () => (/* binding */ LoadablePrinterState),
/* harmony export */   "ew": () => (/* binding */ PrinterRailState),
/* harmony export */   "hq": () => (/* binding */ PrinterSizeState),
/* harmony export */   "q7": () => (/* binding */ PrinterRailsState)
/* harmony export */ });
/* unused harmony exports readPrinterAtom, readPrinterRailAtom */
/* harmony import */ var recoil_sync__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4101);
/* harmony import */ var recoil_sync__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(recoil_sync__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _zods_printer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5996);
/* harmony import */ var _helpers_trpc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8388);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var zod_refine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5140);
/* harmony import */ var zod_refine__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(zod_refine__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils_serialization__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(206);
/* harmony import */ var _zods_motion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6680);
/* harmony import */ var _zods_boards__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(95);
/* harmony import */ var _components_sync_with_moonraker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(485);










let cachedPrinters = {};
// SyncEffect read methods
const readPrinterAtom = async ({ read  })=>{
    const printer = await read(PrinterState.key);
    if (printer != null) {
        const printerId = zod__WEBPACK_IMPORTED_MODULE_4__.z.object({
            id: _zods_printer__WEBPACK_IMPORTED_MODULE_1__/* .PrinterDefinitionWithResolvedToolheads.shape.id */ .O.shape.id
        }).safeParse(printer);
        if (printerId.success) {
            let newPrinter = cachedPrinters[printerId.data.id];
            if (newPrinter == null) {
                newPrinter = await _helpers_trpc__WEBPACK_IMPORTED_MODULE_2__/* .trpcClient.printer.printer.query */ .u.printer.printer.query(printerId.data.id, {});
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
            const parsedRail = _zods_motion__WEBPACK_IMPORTED_MODULE_7__/* .SerializedPrinterRail.safeParse */ .Ah.safeParse(printerRailState);
            if (parsedRail.success) {
                return parsedRail.data;
            }
            const printer = await readPrinterAtom({
                read
            });
            const printerRailDefault = printer?.defaults.rails.find((r)=>r.axis === param);
            if (printerRailDefault != null) {
                const parsedRailRepaired = _zods_motion__WEBPACK_IMPORTED_MODULE_7__/* .SerializedPrinterRail.safeParse */ .Ah.safeParse({
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
const PrinterState = (0,recoil__WEBPACK_IMPORTED_MODULE_3__.atom)({
    key: "Printer",
    default: null,
    effects: [
        (0,_components_sync_with_moonraker__WEBPACK_IMPORTED_MODULE_9__/* .moonrakerWriteEffect */ .rR)(),
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_0__.syncEffect)({
            read: readPrinterAtom,
            write: async ({ write  }, newValue)=>{
                await new Promise((resolve)=>{
                    if (newValue instanceof recoil__WEBPACK_IMPORTED_MODULE_3__.DefaultValue) {
                        write(PrinterState.key, null);
                    } else {
                        write(PrinterState.key, newValue ?? null);
                    }
                    setTimeout(()=>{}, 500);
                });
            },
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_5__.getRefineCheckerForZodSchema)(_zods_printer__WEBPACK_IMPORTED_MODULE_1__/* .PrinterDefinitionWithResolvedToolheads.nullable */ .O.nullable())
        })
    ]
});
const LoadablePrinterState = (0,recoil__WEBPACK_IMPORTED_MODULE_3__.selector)({
    key: "LoadablePrinterState",
    get: async ({ get  })=>{
        const loadable = get((0,recoil__WEBPACK_IMPORTED_MODULE_3__.noWait)(PrinterState));
        return ({
            hasValue: ()=>loadable.contents,
            hasError: ()=>[],
            loading: ()=>[]
        })[loadable.state]();
    }
});
const PrinterSizeState = (0,recoil__WEBPACK_IMPORTED_MODULE_3__.atom)({
    key: "PrinterOption",
    default: null,
    effects: [
        (0,_components_sync_with_moonraker__WEBPACK_IMPORTED_MODULE_9__/* .moonrakerWriteEffect */ .rR)(),
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_0__.syncEffect)({
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_5__.getRefineCheckerForZodSchema)(_zods_printer__WEBPACK_IMPORTED_MODULE_1__/* .PrinterDefinition.shape.sizes.unwrap */ .Q.shape.sizes.unwrap().element.nullable())
        })
    ]
});
const ControlboardState = (0,recoil__WEBPACK_IMPORTED_MODULE_3__.atom)({
    key: "Controlboard",
    default: null,
    effects: [
        (0,_components_sync_with_moonraker__WEBPACK_IMPORTED_MODULE_9__/* .moonrakerWriteEffect */ .rR)(),
        (0,recoil_sync__WEBPACK_IMPORTED_MODULE_0__.syncEffect)({
            read: async ({ read  })=>{
                const board = await read(ControlboardState.key);
                if (board != null) {
                    const boardId = zod__WEBPACK_IMPORTED_MODULE_4__.z.object({
                        path: _zods_boards__WEBPACK_IMPORTED_MODULE_8__/* .Board.shape.path */ .$l.shape.path
                    }).safeParse(board);
                    if (boardId.success) {
                        const boardReq = await _helpers_trpc__WEBPACK_IMPORTED_MODULE_2__/* .trpcClient.mcu.boards.query */ .u.mcu.boards.query({
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
            refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_5__.getRefineCheckerForZodSchema)(_zods_boards__WEBPACK_IMPORTED_MODULE_8__/* .Board.nullable */ .$l.nullable())
        })
    ]
});
const PrinterRailState = (0,recoil__WEBPACK_IMPORTED_MODULE_3__.atomFamily)({
    key: "PrinterRail",
    default: null,
    effects: (param)=>[
            (0,_components_sync_with_moonraker__WEBPACK_IMPORTED_MODULE_9__/* .moonrakerWriteEffect */ .rR)(),
            (0,recoil_sync__WEBPACK_IMPORTED_MODULE_0__.syncEffect)({
                read: readPrinterRailAtom(param),
                refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_5__.getRefineCheckerForZodSchema)(_zods_motion__WEBPACK_IMPORTED_MODULE_7__/* .SerializedPrinterRail.nullable */ .Ah.nullable())
            })
        ]
});
const PrinterRailsState = (0,recoil__WEBPACK_IMPORTED_MODULE_3__.selector)({
    key: "PrinterRails",
    get: ({ get  })=>{
        const printer = get(PrinterState);
        const rails = printer?.defaults.rails.map((rail)=>{
            const railState = get(PrinterRailState(rail.axis));
            return (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_6__/* .deserializePrinterRail */ .Ak)(railState ?? rail);
        });
        return rails ?? [];
    },
    set: ({ set  }, newValue)=>{
        if (newValue instanceof recoil__WEBPACK_IMPORTED_MODULE_3__.DefaultValue) {
            Object.values(_zods_motion__WEBPACK_IMPORTED_MODULE_7__/* .PrinterAxis */ .po).forEach((axis)=>{
                set(PrinterRailState(axis), null);
            });
            return;
        }
        newValue.forEach((rail)=>{
            set(PrinterRailState(rail.axis), (0,_utils_serialization__WEBPACK_IMPORTED_MODULE_6__/* .serializePrinterRail */ .Yz)(rail));
        });
    }
});
const LoadablePrinterRailsState = (0,recoil__WEBPACK_IMPORTED_MODULE_3__.selector)({
    key: "LoadablePrinterRailsState",
    get: async ({ get  })=>{
        const loadable = get((0,recoil__WEBPACK_IMPORTED_MODULE_3__.noWait)(PrinterRailsState));
        return ({
            hasValue: ()=>loadable.contents,
            hasError: ()=>[],
            loading: ()=>[]
        })[loadable.state]();
    }
});


/***/ }),

/***/ 8289:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$T": () => (/* binding */ PrinterToolheadsState),
/* harmony export */   "AF": () => (/* binding */ PrinterToolheadState),
/* harmony export */   "wm": () => (/* binding */ LoadablePrinterToolheadsState)
/* harmony export */ });
/* unused harmony exports isAxisValidForTool, DeserializeToolheadQuery */
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9755);
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(recoil__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var recoil_sync__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4101);
/* harmony import */ var recoil_sync__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(recoil_sync__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var zod_refine__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5140);
/* harmony import */ var zod_refine__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(zod_refine__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers_trpc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8388);
/* harmony import */ var _zods_boards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(95);
/* harmony import */ var _zods_motion__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6680);
/* harmony import */ var _zods_toolhead__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4130);
/* harmony import */ var _printer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5155);
/* harmony import */ var _components_sync_with_moonraker__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(485);










const isAxisValidForTool = (axis, tool)=>{
    if (axis === PrinterAxis.dual_carriage && tool === 1) {
        return true;
    }
    if (axis === PrinterAxis.x) {
        return true;
    }
    return false;
};
const PrinterToolheadState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.atomFamily)({
    key: "PrinterToolhead",
    default: null,
    effects: (param)=>[
            (0,_components_sync_with_moonraker__WEBPACK_IMPORTED_MODULE_9__/* .moonrakerWriteEffect */ .rR)(),
            (0,recoil_sync__WEBPACK_IMPORTED_MODULE_1__.syncEffect)({
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
                        const parsedToolhead = _zods_toolhead__WEBPACK_IMPORTED_MODULE_7__/* .ToolheadConfiguration.safeParse */ .x8.safeParse(printerToolheadState);
                        if (parsedToolhead.success) {
                            let freshToolboard = parsedToolhead.data.toolboard;
                            if (freshToolboard) {
                                if (freshToolboard != null) {
                                    const toolboardPath = zod__WEBPACK_IMPORTED_MODULE_2__.z.object({
                                        path: _zods_boards__WEBPACK_IMPORTED_MODULE_5__/* .Toolboard.shape.path */ .MG.shape.path
                                    }).safeParse(freshToolboard);
                                    if (toolboardPath.success) {
                                        const boardReq = await _helpers_trpc__WEBPACK_IMPORTED_MODULE_4__/* .trpcClient.mcu.boards.query */ .u.mcu.boards.query({
                                            boardFilters: {
                                                toolboard: true
                                            }
                                        });
                                        const maybeToolboard = boardReq.find((b)=>b.path === toolboardPath.data.path);
                                        if (maybeToolboard) {
                                            freshToolboard = _zods_boards__WEBPACK_IMPORTED_MODULE_5__/* .Toolboard.parse */ .MG.parse(maybeToolboard);
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
                refine: (0,zod_refine__WEBPACK_IMPORTED_MODULE_3__.getRefineCheckerForZodSchema)(_zods_toolhead__WEBPACK_IMPORTED_MODULE_7__/* .BaseToolheadConfiguration.extend */ .PY.extend({
                    toolNumber: _zods_toolhead__WEBPACK_IMPORTED_MODULE_7__/* .ToolNumber */ .Qr
                }).nullable())
            })
        ]
});
const DeserializeToolheadQuery = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.selectorFamily)({
    key: "DeserializeToolheadQuery",
    get: (param)=>async ({ get  })=>{
            const parsedToolhead = _zods_toolhead__WEBPACK_IMPORTED_MODULE_7__/* .ToolheadConfiguration.safeParse */ .x8.safeParse(await _helpers_trpc__WEBPACK_IMPORTED_MODULE_4__/* .trpcClient.printer.deserializeToolheadConfiguration.query */ .u.printer.deserializeToolheadConfiguration.query({
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
const PrinterToolheadsState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.selector)({
    key: "PrinterToolheadsState",
    get: ({ get  })=>{
        const printer = get(_printer__WEBPACK_IMPORTED_MODULE_8__/* .PrinterState */ .H6);
        if (printer == null) {
            return [];
        }
        return get((0,recoil__WEBPACK_IMPORTED_MODULE_0__.waitForAll)(printer.defaults.toolheads.map((th, i)=>PrinterToolheadState(i)))).filter(Boolean);
    },
    set: ({ set , reset  }, newValue)=>{
        if (newValue instanceof recoil__WEBPACK_IMPORTED_MODULE_0__.DefaultValue) {
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
const LoadablePrinterToolheadsState = (0,recoil__WEBPACK_IMPORTED_MODULE_0__.selector)({
    key: "LoadablePrinterToolheadsState",
    get: async ({ get  })=>{
        const loadable = get((0,recoil__WEBPACK_IMPORTED_MODULE_0__.noWait)(PrinterToolheadsState));
        return ({
            hasValue: ()=>loadable.contents,
            hasError: ()=>[],
            loading: ()=>[]
        })[loadable.state]();
    }
});


/***/ }),

/***/ 206:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ak": () => (/* binding */ deserializePrinterRail),
/* harmony export */   "DX": () => (/* binding */ stringToTitleObject),
/* harmony export */   "Df": () => (/* binding */ deserializeDriver),
/* harmony export */   "Oj": () => (/* binding */ deserializePrinterRailDefinition),
/* harmony export */   "Pw": () => (/* binding */ extractToolheadFromPrinterConfiguration),
/* harmony export */   "WZ": () => (/* binding */ deserializeStepper),
/* harmony export */   "Yz": () => (/* binding */ serializePrinterRail),
/* harmony export */   "m6": () => (/* binding */ serializeToolheadConfiguration),
/* harmony export */   "od": () => (/* binding */ serializePartialToolheadConfiguration),
/* harmony export */   "s": () => (/* binding */ extractToolheadsFromPrinterConfiguration)
/* harmony export */ });
/* harmony import */ var _data_drivers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1880);
/* harmony import */ var _zods_motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6680);
/* harmony import */ var _data_steppers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(817);
/* harmony import */ var _zods_toolhead__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4130);
/* harmony import */ var _helpers_toolhead__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7187);





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
const stringToTitleObject = (data)=>{
    return {
        id: data,
        title: data
    };
};
const serializePrinterRail = (rail)=>{
    return _zods_motion__WEBPACK_IMPORTED_MODULE_1__/* .SerializedPrinterRail.parse */ .Ah.parse({
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
        return new _helpers_toolhead__WEBPACK_IMPORTED_MODULE_4__/* .ToolheadHelper */ .D(_zods_toolhead__WEBPACK_IMPORTED_MODULE_3__/* .ToolheadConfiguration.parse */ .x8.parse(th));
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

/***/ 95:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _motion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6680);


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
/* harmony import */ var _toolhead__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4130);






const BasePrinterConfiguration = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
    printer: _printer__WEBPACK_IMPORTED_MODULE_3__/* .PrinterDefinition */ .Q,
    controlboard: _boards__WEBPACK_IMPORTED_MODULE_1__/* .Board */ .$l,
    toolheads: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_toolhead__WEBPACK_IMPORTED_MODULE_5__/* .ToolheadConfiguration */ .x8).min(1).max(2),
    size: zod__WEBPACK_IMPORTED_MODULE_0__.z.number().optional().nullable(),
    controllerFan: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Fan */ .XG,
    performanceMode: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().default(false),
    stealthchop: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().default(false),
    standstillStealth: zod__WEBPACK_IMPORTED_MODULE_0__.z.boolean().default(false),
    rails: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_motion__WEBPACK_IMPORTED_MODULE_4__/* .PrinterRail */ .JQ)
}).strict();
const PrinterConfiguration = BasePrinterConfiguration.refine((data)=>data.size == null || (data.printer.sizes?.length ?? 0) > 0 && data.size != null, "Printer size must be provided if printer has size options, otherwise it must be omitted").refine((data)=>data.toolheads.map((t)=>t.toolboard).filter(Boolean).length + data.controlboard.driverCount >= data.printer.driverCountRequired, "Your combination of controlboard and toolboards do not have enough stepper drivers for this printer");
const SerializedPrinterConfiguration = BasePrinterConfiguration.extend({
    printer: _printer__WEBPACK_IMPORTED_MODULE_3__/* .PrinterDefinition.shape.id */ .Q.shape.id,
    controlboard: _boards__WEBPACK_IMPORTED_MODULE_1__/* .Board.shape.id */ .$l.shape.id,
    toolheads: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_toolhead__WEBPACK_IMPORTED_MODULE_5__/* .SerializedToolheadConfiguration */ .Qk).min(1).max(2),
    controllerFan: _hardware__WEBPACK_IMPORTED_MODULE_2__/* .Fan.shape.id */ .XG.shape.id,
    rails: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_motion__WEBPACK_IMPORTED_MODULE_4__/* .SerializedPrinterRail */ .Ah)
}).strict();
const PartialPrinterConfiguration = PrinterConfiguration.innerType().innerType().extend({
    toolheads: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_toolhead__WEBPACK_IMPORTED_MODULE_5__/* .PartialToolheadConfiguration */ .b2).min(1).max(2)
}).strict().partial().optional();
const SerializedPartialPrinterConfiguration = SerializedPrinterConfiguration.extend({
    toolheads: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_toolhead__WEBPACK_IMPORTED_MODULE_5__/* .SerializedPartialToolheadConfiguration */ .ZF).min(1).max(2)
}).strict().partial();


/***/ }),

/***/ 5996:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* binding */ PrinterDefinitionWithResolvedToolheads),
/* harmony export */   "Q": () => (/* binding */ PrinterDefinition)
/* harmony export */ });
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8316);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(zod__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _env_schema_mjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6165);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6680);
/* harmony import */ var _toolhead__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4130);





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
}).strict();
const PrinterDefinition = zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
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
    }).strict().describe("Speed limits for this printer"),
    defaults: zod__WEBPACK_IMPORTED_MODULE_0__.z.object({
        toolheads: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_toolhead__WEBPACK_IMPORTED_MODULE_4__/* .SerializedToolheadConfiguration */ .Qk).describe("Default toolheads for this printer"),
        board: zod__WEBPACK_IMPORTED_MODULE_0__.z.string().describe("Default board for this printer. Should be the name of the board directory."),
        rails: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_motion__WEBPACK_IMPORTED_MODULE_3__/* .SerializedPrinterRailDefinition */ .r).describe("Default rails for this printer")
    }).strict().describe("Default hardware for this printer")
}).describe("A RatOS supported 3d printer");
const PrinterDefinitionWithResolvedToolheads = PrinterDefinition.extend({
    defaults: PrinterDefinition.shape.defaults.extend({
        toolheads: zod__WEBPACK_IMPORTED_MODULE_0__.z.array(_toolhead__WEBPACK_IMPORTED_MODULE_4__/* .ToolheadConfiguration */ .x8)
    }).strict()
});


/***/ }),

/***/ 4130:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _boards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(95);
/* harmony import */ var _hardware__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7670);
/* harmony import */ var _motion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6680);




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


/***/ })

};
;