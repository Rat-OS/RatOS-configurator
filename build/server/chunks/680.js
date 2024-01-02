"use strict";
exports.id = 680;
exports.ids = [680];
exports.modules = {

/***/ 6680:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ah": () => (/* binding */ SerializedPrinterRail),
/* harmony export */   "HB": () => (/* binding */ Driver),
/* harmony export */   "JQ": () => (/* binding */ PrinterRail),
/* harmony export */   "P6": () => (/* binding */ PrinterRailDefinition),
/* harmony export */   "R_": () => (/* binding */ matchesDefaultRail),
/* harmony export */   "Wx": () => (/* binding */ getSupportedVoltages),
/* harmony export */   "g6": () => (/* binding */ BasePrinterRail),
/* harmony export */   "po": () => (/* binding */ PrinterAxis),
/* harmony export */   "r": () => (/* binding */ SerializedPrinterRailDefinition),
/* harmony export */   "v6": () => (/* binding */ Voltage),
/* harmony export */   "vF": () => (/* binding */ Stepper)
/* harmony export */ });
/* unused harmony exports StepperVoltage, Voltages */
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