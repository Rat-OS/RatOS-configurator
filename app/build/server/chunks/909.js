"use strict";exports.id=909,exports.ids=[909],exports.modules={40909:(e,t,o)=>{o.r(t),o.d(t,{getRequiredPinAliases:()=>getRequiredPinAliases,renderToolheadTemplate:()=>renderToolheadTemplate});var n=o(38316);let l=n.z.object({invertRunoutPin:n.z.boolean().default(!1),pullUpRunoutPin:n.z.boolean().default(!0)}),getRequiredPinAliases=e=>["filament_sensor_runout_pin"],renderToolheadTemplate=e=>{let t=e.utils.getToolhead(e.toolNumber),o=l.parse(e.templateOptions??{});return`
[filament_switch_sensor toolhead_filament_sensor_${t.getShortToolName()}]
pause_on_runout: False
event_delay: 1.0
switch_pin: ${o.invertRunoutPin?"!":""}${o.pullUpRunoutPin?"^":""}${e.getPrefixedPinFromAlias("filament_sensor_runout_pin")}
runout_gcode:
	_ON_TOOLHEAD_FILAMENT_SENSOR_RUNOUT TOOLHEAD=${t.getTool()}
insert_gcode:
	_ON_TOOLHEAD_FILAMENT_SENSOR_INSERT TOOLHEAD=${t.getTool()}
`}}};