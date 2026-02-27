"use strict";exports.id=5477,exports.ids=[5477],exports.modules={5477:(e,o,t)=>{t.r(o),t.d(o,{getRequiredPinAliases:()=>getRequiredPinAliases,renderToolheadTemplate:()=>renderToolheadTemplate});var n=t(38316);let _=n.z.object({isSmart:n.z.boolean().default(!1)}),getRequiredPinAliases=e=>["filament_sensor_runout_pin","filament_sensor_motion_pin"],renderToolheadTemplate=e=>{let o=e.utils.getToolhead(e.toolNumber),t=_.parse(e.templateOptions??{}),n=o.printerHasMultipleToolheads?`_${o.getShortToolName()}`:"",i=`
# ${e.instance.id} connected to ${e.instance.connectedTo}
[filament_switch_sensor toolhead_filament_sensor_${o.getShortToolName()}]
pause_on_runout: False
event_delay: 1.0
switch_pin: ^${e.getPrefixedPinFromAlias("filament_sensor_runout_pin")}
runout_gcode:
	_ON_TOOLHEAD_FILAMENT_SENSOR_RUNOUT TOOLHEAD=${o.getTool()}
insert_gcode:
	_ON_TOOLHEAD_FILAMENT_SENSOR_INSERT TOOLHEAD=${o.getTool()}
`,s=t.isSmart?`
[gcode_button filament_sensor_button${n}]
pin: ^${e.getPrefixedPinFromAlias("filament_sensor_motion_pin")}
press_gcode:
    {% if (printer.print_stats.state == "printing") %}
        _ON_TOOLHEAD_FILAMENT_SENSOR_CLOG TOOLHEAD=${o.getTool()}
    {% else %}
        _ON_FILAMENT_SENSOR_BUTTON_PRESSED TOOLHEAD=${o.getTool()}
    {% endif %}
release_gcode:
	# No action on release
`:`
[gcode_button filament_sensor_button${n}]
pin: ^${e.getPrefixedPinFromAlias("filament_sensor_motion_pin")}
press_gcode:
	_ON_FILAMENT_SENSOR_BUTTON_PRESSED TOOLHEAD=${o.getTool()}
release_gcode:
	# No action on release
`;return i+s}}};