"use strict";
exports.id = 96;
exports.ids = [96];
exports.modules = {

/***/ 1096:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sensorlessXTemplate": () => (/* binding */ sensorlessXTemplate),
/* harmony export */   "sensorlessYTemplate": () => (/* binding */ sensorlessYTemplate)
/* harmony export */ });
/* harmony import */ var _zods_motion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6680);

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

[${utils.getAxisDriverSectionName(_zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.x */ .po.x)}]
${utils.getAxisDriverDiagConfig(_zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.x */ .po.x)}
${utils.getAxisDriverStallGuardThreshold(_zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.x */ .po.x, 0.5)}

[${utils.getAxisStepperName(_zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.x */ .po.x)}]
endstop_pin: ${utils.getAxisVirtualEndstop(_zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.x */ .po.x)}
position_min: 0
position_endstop: 0
homing_retract_dist: 0

[gcode_macro RatOS]
variable_homing_x: "sensorless"
variable_sensorless_x_current: ${utils.getAxisDriverHomingCurrent(_zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.x */ .po.x, 0.35)}
${utils.getAxisDriverVariables(_zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.x */ .po.x, config.printer.id === "caramba-hybrid" ? false : true)}
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

[${utils.getAxisDriverSectionName(_zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.y */ .po.y)}]
${utils.getAxisDriverDiagConfig(_zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.y */ .po.y)}
${utils.getAxisDriverStallGuardThreshold(_zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.y */ .po.y, 0.5)}

[stepper_y]
endstop_pin: ${utils.getAxisVirtualEndstop(_zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.y */ .po.y)}
position_min: 0
position_endstop: 0
homing_retract_dist: 0

[gcode_macro RatOS]
variable_homing_y: "sensorless"
variable_sensorless_y_current: ${utils.getAxisDriverHomingCurrent(_zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.y */ .po.y, 0.51)}
${utils.getAxisDriverVariables(_zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.y */ .po.y, true, config.printer.id === "caramba-hybrid" ? [
        _zods_motion__WEBPACK_IMPORTED_MODULE_0__/* .PrinterAxis.x1 */ .po.x1
    ] : [])}
`;


/***/ })

};
;