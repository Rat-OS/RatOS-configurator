import { KlipperConfigHelper } from '../helpers/klipper-config';
import { PrinterConfiguration } from '../zods/printer-configuration';
export const template = (config: PrinterConfiguration, helper: KlipperConfigHelper) => `
# WARNING. THIS FILE IS GENERATED BY THE RATOS CONFIGURATOR.
# CHANGES YOU MAKE HERE WILL BE OVERWRITTEN. KEEP YOUR CHANGES IN PRINTER.CFG.
# Rat Rig V-core 3 Klipper Config
# Documentation: https://os.ratrig.com

#############################################################################################################
### CONTROLBOARD & TOOLBOARD
#############################################################################################################
${helper.renderBoardIncludes()}

#############################################################################################################
### BASE SETUP
#############################################################################################################
[include RatOS/printers/v-core-pro/v-core-pro.cfg]
[include RatOS/homing.cfg]
[include RatOS/macros.cfg]
[include RatOS/shell-macros.cfg]
[include RatOS/printers/v-core-pro/macros.cfg]
[include RatOS/printers/v-core-pro/${config.size}.cfg]

# Extruder
${helper.renderExtruder()}

# Hotend
${helper.renderHotend()}

# ADXL345 resonance testing configuration
${helper.renderInputShaper(config.size ?? 300)}

#############################################################################################################
### STEPPER MOTORS, DRIVERS & SPEED LIMITS
### Pick the drivers and stepper motors you're using. See the RatOS documentation for custom combinations.
#############################################################################################################
[include RatOS/printers/v-core-pro/steppers.cfg]

# UNCOOLED TMC 2209 + LDO-42STH48-2504AC
${helper.uncommentIf(!config.performanceMode)}[include RatOS/printers/v-core-pro/tmc2209.cfg]
${helper.uncommentIf(!config.performanceMode)}[include RatOS/printers/v-core-pro/speed-limits-basic.cfg]
${helper.uncommentIf(!config.performanceMode)}[include RatOS/steppers/ldo/42sth48-2504ac/2209/24v-1.1a-x.cfg]
${helper.uncommentIf(!config.performanceMode)}[include RatOS/steppers/ldo/42sth48-2504ac/2209/24v-1.1a-y.cfg]
${helper.uncommentIf(!config.performanceMode)}[include RatOS/steppers/ldo/42sth48-2504ac/2209/24v-1.1a-z.cfg]
${helper.uncommentIf(!config.performanceMode)}[include RatOS/steppers/ldo/42sth48-2504ac/2209/24v-1.1a-z1.cfg]
${helper.uncommentIf(!config.performanceMode)}[include RatOS/steppers/ldo/42sth48-2504ac/2209/24v-1.1a-z2.cfg]
# PERFORMANCE MODE: COOLED TMC 2209 + LDO-42STH48-2504AC
${helper.uncommentIf(config.performanceMode)}[include RatOS/printers/v-core-pro/tmc2209-performance.cfg]
${helper.uncommentIf(config.performanceMode)}[include RatOS/printers/v-core-pro/speed-limits-performance.cfg]
${helper.uncommentIf(config.performanceMode)}[include RatOS/steppers/ldo/42sth48-2504ac/2209/24v-1.6a-x.cfg]
${helper.uncommentIf(config.performanceMode)}[include RatOS/steppers/ldo/42sth48-2504ac/2209/24v-1.6a-y.cfg]
${helper.uncommentIf(config.performanceMode)}[include RatOS/steppers/ldo/42sth48-2504ac/2209/24v-1.6a-z.cfg]
${helper.uncommentIf(config.performanceMode)}[include RatOS/steppers/ldo/42sth48-2504ac/2209/24v-1.6a-z1.cfg]
${helper.uncommentIf(config.performanceMode)}[include RatOS/steppers/ldo/42sth48-2504ac/2209/24v-1.6a-z2.cfg]

# STEALTH MODE (Enables stealthchop and limits velocity and acceleration)
${helper.uncommentIf(config.stealthchop)}[include RatOS/printers/v-core-pro/speed-limits-stealth.cfg]
${helper.uncommentIf(config.stealthchop)}[include RatOS/printers/v-core-pro/tmc2209-stealth.cfg]

${helper.renderDriverOverrides()}

${helper.renderStepperOverrides()}

#############################################################################################################
### HOMING
### Probe and endstop configuration
#############################################################################################################
${helper.renderProbeIncludes()}

${helper.renderEndstopSection()}


#############################################################################################################
### FANS
### If your board has 4 pin fan headers and you want to use them, you can enable them here.
### NOTE: If none are uncommented, the default 2pin fan headers will be used.
#############################################################################################################
# Part cooling
${helper.uncommentIf(config.partFan.id === '4pin-dedicated')}[include RatOS/4pin-fans/part-cooling-fan-25khz.cfg]

# Hotend / Toolhead cooling
${helper.uncommentIf(config.hotendFan.id === '4pin-dedicated')}[include RatOS/4pin-fans/toolhead-fan-25khz.cfg]

# Control board cooling
${helper.uncommentIf(config.controllerFan.id === '4pin-dedicated')}[include RatOS/4pin-fans/controller-fan-25khz.cfg]

${helper.renderFanOverrides()}
`;

export const initialPrinterCfg = (config: PrinterConfiguration, helper: KlipperConfigHelper) => `
#############################################################################################################
### CONFIGURATION GENERATED BY THE RATOS CONFIGURATOR
#############################################################################################################
[include RatOS.cfg]

#############################################################################################################
### MACRO CONFIGURATION
### Configure the behavior of RatOS macros
### See: https://os.ratrig.com/docs/configuration/macros
#############################################################################################################
[gcode_macro RatOS]
variable_relative_extrusion: False
variable_preheat_extruder: True
variable_calibrate_bed_mesh: True
variable_nozzle_priming: "primeblob"
variable_start_print_park_in: "back"
variable_start_print_park_z_height: 50
variable_end_print_park_in: "back"
variable_pause_print_park_in: "back"
variable_macro_travel_speed: 300

#############################################################################################################
### USER OVERRIDES & CUSTOM CONFIGURATION
### Anything custom you want to add, or RatOS configuration you want to override, do it here.
### This section is pre-populated with the most common settings you may want to change.
### See: https://os.ratrig.com/docs/configuration/includes-and-overrides
###
### It is recommended that you follow these steps to properly calibrate your printer:
### 0) Sanity check and PID Tuning: https://www.klipper3d.org/Config_checks.html
### 1) Pressure Advance: https://www.klipper3d.org/Pressure_Advance.html
### 2) Skew Correction: https://www.klipper3d.org/Skew_Correction.html
### 3) Resonance Compensation: https://www.klipper3d.org/Resonance_Compensation.html
### RatOS has dedicated macro's to generate shaper graphs for deeper analysis (requires accelerometer).
### Use MEASURE_COREXY_BELT_TENSION to compare tension between belts, and use
### GENERATE_SHAPER_GRAPHS to generate the resonance graphs for analysing and manually entering input shaper
### configuration.
### You can run SHAPER_CALIBRATE to automatically calibrate your input shaper configuration, if you just want
### to get started.
### Read more about klipper here: https://www.klipper3d.org/Overview.html
#############################################################################################################

[stepper_x]
dir_pin: x_dir_pin # Add ! in front of pin name to reverse X stepper direction
rotation_distance: 40 # 40 for 20 tooth 2GT pulleys, 32 for 16 tooth 2GT pulleys

[stepper_y]
dir_pin: y_dir_pin # Add ! in front of pin name to reverse Y stepper direction
rotation_distance: 40 # 40 for 20 tooth 2GT pulleys, 32 for 16 tooth 2GT pulleys

[stepper_z]
dir_pin: !z0_dir_pin # Add ! in front of pin name to reverse Z stepper direction
rotation_distance: 4 # 4 for TR8*4 lead screws

[stepper_z1]
dir_pin: !z1_dir_pin # Add ! in front of pin name to reverse Z1 direction
rotation_distance: 4 # 4 for TR8*4 lead screws

[stepper_z2]
dir_pin: !z2_dir_pin # Add ! in front of pin name to reverse Z2 direction
rotation_distance: 4 # 4 for TR8*4 lead screws

[extruder]
# Check https://www.klipper3d.org/Pressure_Advance.html for pressure advance tuning.
#pressure_advance: 0.05
nozzle_diameter: 0.4 # Remember to change this if you change nozzle diameter.
dir_pin: !${helper.getExtruderPinPrefix()}e_dir_pin # Remove ! in front of pin name to reverse extruder direction
control: pid
pid_kp: 28.413
pid_ki: 1.334
pid_kd: 151.300

[heater_bed]
control: pid
pid_Kp: 22.2
pid_Ki: 1.08
pid_Kd: 114

${helper.renderProbePinSection()}
`;