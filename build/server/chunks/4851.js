"use strict";exports.id=4851,exports.ids=[4851],exports.modules={24851:(e,r,i)=>{i.d(r,{E:()=>sensorlessYTemplate,i:()=>sensorlessXTemplate});var o=i(16561);let sensorlessXTemplate=(e,r)=>`
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

[${r.getAxisDriverSectionName(o.po.x)}]
${r.getAxisDriverDiagConfig(o.po.x)}
${r.getAxisDriverStallGuardThreshold(o.po.x,.5)}

[${r.getAxisStepperName(o.po.x)}]
endstop_pin: ${r.getAxisVirtualEndstop(o.po.x)}
homing_retract_dist: 0

[gcode_macro RatOS]
variable_homing_x: "sensorless"
variable_sensorless_x_current: ${r.getAxisDriverHomingCurrent(o.po.x,.35)}
`,sensorlessYTemplate=(e,r)=>`
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

[${r.getAxisDriverSectionName(o.po.y)}]
${r.getAxisDriverDiagConfig(o.po.y)}
${r.getAxisDriverStallGuardThreshold(o.po.y,.5)}

[stepper_y]
endstop_pin: ${r.getAxisVirtualEndstop(o.po.y)}
homing_retract_dist: 0

[gcode_macro RatOS]
variable_homing_y: "sensorless"
variable_sensorless_y_current: ${r.getAxisDriverHomingCurrent(o.po.y,.51)}
`},16561:(e,r,i)=>{i.d(r,{Ah:()=>b,HB:()=>d,JQ:()=>v,MI:()=>a,P6:()=>c,R_:()=>matchesDefaultRail,g6:()=>u,po:()=>n,r:()=>h,v6:()=>s,vF:()=>m});var o,n,t=i(38316);!function(e){e[e["24V"]=24]="24V",e[e["36V"]=36]="36V",e[e["48V"]=48]="48V",e[e["56V"]=56]="56V",e[e["60V"]=60]="60V"}(o||(o={}));let matchesDefaultRail=(e,r,i)=>e.axis===r.axis&&e.driver.id===r.driver.id&&e.stepper.id===r.stepper.id&&(i&&r.performanceMode&&e.voltage===r.performanceMode?.voltage&&e.current===r.performanceMode?.current||!i&&e.voltage===r.voltage&&e.current===r.current),s=t.nativeEnum(o),a=t.string(),d=t.object({id:a,title:t.string(),protocol:t.enum(["SPI","UART"]),coolingCurrentThreshold:t.number(),voltages:s.array(),maxCurrent:t.number().min(0),external:t.boolean().optional()}).and(t.object({type:t.enum(["TMC2209","TMC2226","TMC5160","TMC2130"]),senseResistor:t.number().min(0)}).or(t.object({type:t.enum(["TMC2240"])}))),p=t.object({voltage:s,run_current:t.number(),driver:a}),l=p.extend({driver_MSLUT0:t.number().optional(),driver_MSLUT1:t.number().optional(),driver_MSLUT2:t.number().optional(),driver_MSLUT3:t.number().optional(),driver_MSLUT4:t.number().optional(),driver_MSLUT5:t.number().optional(),driver_MSLUT6:t.number().optional(),driver_MSLUT7:t.number().optional(),driver_W0:t.number().optional(),driver_W1:t.number().optional(),driver_W2:t.number().optional(),driver_W3:t.number().optional(),driver_X1:t.number().optional(),driver_X2:t.number().optional(),driver_X3:t.number().optional(),driver_START_SIN:t.number().optional(),driver_START_SIN90:t.number().optional(),driver_IHOLDDELAY:t.number().optional(),driver_TPOWERDOWN:t.number().optional(),driver_TBL:t.number().optional(),driver_TOFF:t.number().optional(),driver_HEND:t.number().optional(),driver_HSTRT:t.number().optional(),driver_PWM_AUTOSCALE:t.boolean().optional(),driver_PWM_FREQ:t.number().optional(),driver_PWM_GRAD:t.number().optional(),driver_PWM_AMPL:t.number().optional(),driver_SGT:t.number().optional()}),m=t.object({id:t.string(),title:t.string(),fullStepsPerRotation:t.number().default(200),maxPeakCurrent:t.number().min(0),presets:t.array(t.discriminatedUnion("driver",[l.extend({driver:t.enum(["TMC2130","TMC5160"]),sense_resistor:t.number()}),l.extend({driver:t.enum(["TMC2240"])}),p.extend({driver:t.enum(["TMC2209"]),driver_TBL:t.number().optional(),driver_TOFF:t.number().optional(),driver_HEND:t.number().optional(),driver_HSTRT:t.number().optional(),sense_resistor:t.number()})])).optional().describe("Stepper presets are tightly coupled to the driver type, sense_resistor, stepper, voltage and current.")});!function(e){e.x="x",e.dual_carriage="dual_carriage",e.x1="x1",e.y="y",e.y1="y1",e.y2="y2",e.z="z",e.z1="z1",e.z2="z2",e.z3="z3",e.extruder="extruder",e.extruder1="extruder1"}(n||(n={}));let u=t.object({axis:t.nativeEnum(n).describe("Axis of the rail"),axisDescription:t.string().optional().describe("Description of the axis"),driver:d.describe("Stepper driver used on this axis"),voltage:s.default(24).describe("Voltage of the stepper driver"),stepper:m.describe("Stepper motor connected to this axis"),invertStepperDirection:t.boolean().default(!1).describe("Invert the default direction of the stepper motor"),axisMinimum:t.number().optional().describe("Minimum position of the axis in mm"),axisMaximum:t.number().optional().describe("Maximum position of the axis in mm"),axisEndstop:t.number().optional().describe("Endstop position of the axis in mm"),motorSlot:t.string().optional().describe("Optional board motor slot of the stepper driver"),current:t.number().min(0),rotationDistance:t.number().min(0).describe("Distance in mm the axis travels per stepper rotation"),gearRatio:t.string().regex(/^\d+:\d+$/).optional().describe("Optional gear ratio of the axis"),homingSpeed:t.number().min(0).default(10).describe("Axis speed during homing in mm/s"),microstepping:t.number().min(16).max(256).default(64).describe("Microstepping of the stepper driver, higher values increase resolution and lower noise but increases load on the MCU")}),c=u.extend({motorSlot:t.undefined(),performanceMode:t.object({current:t.number().min(0),voltage:s.default(24).describe("Voltage of the stepper driver in performance mode"),homingSpeed:t.number().min(0).optional().describe("Axis speed during homing in mm/s in performance mode")}).optional()}),h=c.extend({driver:a,stepper:m.shape.id}),v=u.refine(e=>e.current<=e.driver.maxCurrent,"Current must be less than max current of the driver"),b=u.extend({driver:a,stepper:m.shape.id});t.object({min:t.number(),max:t.number(),endstop:t.number()})}};