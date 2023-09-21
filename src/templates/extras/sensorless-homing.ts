import { PrinterConfiguration } from '../../zods/printer-configuration';
export const sensorlessXTemplate = (config: PrinterConfiguration) => `
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
[tmc2209 stepper_x]
diag_pin: ^x_diag_pin
driver_SGTHRS: 70  

[stepper_x]
endstop_pin: tmc2209_stepper_x:virtual_endstop
position_min: -1
position_endstop: -1
homing_retract_dist: 0

[gcode_macro RatOS]
variable_homing_x: "sensorless"
variable_sensorless_x_current: 0.6
variable_driver_type_x: "tmc2209"
`;

export const sensorlessYTemplate = (config: PrinterConfiguration) => `
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
[tmc2209 stepper_y]
diag_pin: ^y_diag_pin
driver_SGTHRS: 90

[stepper_y]
endstop_pin: tmc2209_stepper_y:virtual_endstop
position_min: 0
position_endstop: 0
homing_retract_dist: 0

[gcode_macro RatOS]
variable_homing_y: "sensorless"
variable_sensorless_y_current: 0.9
variable_driver_type_y: "tmc2209"`;
