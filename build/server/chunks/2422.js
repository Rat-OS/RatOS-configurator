"use strict";exports.id=2422,exports.ids=[2422],exports.modules={2422:(e,r,t)=>{t.d(r,{initialPrinterCfg:()=>initialPrinterCfg,template:()=>template});let template=(e,r)=>`
# WARNING. THIS FILE IS GENERATED BY THE RATOS CONFIGURATOR.
# CHANGES YOU MAKE HERE WILL BE OVERWRITTEN. KEEP YOUR CHANGES IN PRINTER.CFG.
# Config generated for ${e.printer.manufacturer} ${e.printer.name}
# Documentation: https://os.ratrig.com

#############################################################################################################
### CONTROLBOARD & TOOLBOARD
#############################################################################################################
${r.renderBoards()}

#############################################################################################################
### BASE SETUP
#############################################################################################################
${r.renderBase()}
[include RatOS/printers/v-chonk/caramba.cfg]
[include RatOS/printers/v-chonk/macros.cfg]

# Extruder
${r.renderExtruder()}

# Hotend
${r.renderHotend()}

# ADXL345 resonance testing configuration
${r.renderInputShaper(e.size)}

#############################################################################################################
### STEPPER MOTORS, DRIVERS & SPEED LIMITS
#############################################################################################################
${r.renderMotorSections()}
${r.renderSpeedLimits()}

[bed_mesh]
speed: ${r.getMacroTravelSpeed()}

#############################################################################################################
### HOMING
#############################################################################################################
${r.renderProbeIncludes()}
${r.renderEndstopSection()}


#############################################################################################################
### FANS
#############################################################################################################
${r.renderFans()}

#############################################################################################################
### MACRO CONFIGURATION
#############################################################################################################
${r.renderMacros()}

# Macro variable overrides
[gcode_macro RatOS]
${r.renderMacroVariableOverrides()}
`,initialPrinterCfg=(e,r)=>`
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
${r.renderUserMacroVariableOverrides()}

#############################################################################################################
### USER OVERRIDES & CUSTOM CONFIGURATION
### Anything custom you want to add, or RatOS configuration you want to override, do it here.
### This section is pre-populated with the most common settings you may want to change.
### See: https://os.ratrig.com/docs/configuration/includes-and-overrides
###
### It is recommended that you follow these steps to properly calibrate your printer:
### 0) Sanity check and PID Tuning: https://www.klipper3d.org/Config_checks.html
### 1) Z-offset calibration: https://www.klipper3d.org/Probe_Calibrate.html#calibrating-probe-z-offset
###    BEACON NOTE: Follow along from step 6 in the official beacon guide instead
###    https://docs.beacon3d.com/quickstart/#6-calibrate-beacon
### 2) Pressure Advance: https://www.klipper3d.org/Pressure_Advance.html
### 3) Skew Correction: https://www.klipper3d.org/Skew_Correction.html
### 4) Resonance Compensation: https://www.klipper3d.org/Resonance_Compensation.html
### RatOS has dedicated macro's to generate shaper graphs for deeper analysis (requires accelerometer).
### Use MEASURE_COREXY_BELT_TENSION to compare tension between belts, and use
### GENERATE_SHAPER_GRAPHS to generate the resonance graphs for analysing and manually entering input shaper
### configuration.
### You can run SHAPER_CALIBRATE to automatically calibrate your input shaper configuration, if you just want
### to get started.
### Read more about klipper here: https://www.klipper3d.org/Overview.html
#############################################################################################################

${r.renderUserStepperSections({x:{directionInverted:!0,rotationComment:"40 for 20 tooth 2GT pulleys, 32 for 16 tooth 2GT pulleys",limits:r=>({min:0-r.min,max:e.size.x+r.max,endstop:0-r.min})},y:{directionInverted:!0,rotationComment:"40 for 20 tooth 2GT pulleys, 32 for 16 tooth 2GT pulleys",limits:r=>({min:0-r.min,max:e.size.y+r.max,endstop:0-r.min})},z:{directionInverted:!0,rotationComment:"4 for TR8*4 lead screws",limits:{min:0,max:e.size.z}},z1:{directionInverted:!0,rotationComment:"4 for TR8*4 lead screws"},extruder:{directionInverted:!0,additionalLines:["#pressure_advance: 0.05 # Check https://www.klipper3d.org/Pressure_Advance.html for pressure advance tuning.","control: pid","pid_kp: 28.413","pid_ki: 1.334","pid_kd: 151.300"]}})}

[heater_bed]
control: pid
pid_Kp: 22.2
pid_Ki: 1.08
pid_Kd: 114

${r.renderProbePinSection()}

${r.renderReminders()}
`}};