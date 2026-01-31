import { GetRequiredPinAliasesFn, RenderToolheadTemplateFn } from '@/templates/template-api';
import { z } from 'zod';

const Options = z.object({
	isSmart: z.boolean().default(false),
});

export const getRequiredPinAliases: GetRequiredPinAliasesFn = (ctx) => {
	return ['filament_sensor_runout_pin', 'filament_sensor_motion_pin'];
};

export const renderToolheadTemplate: RenderToolheadTemplateFn = (ctx) => {
	const th = ctx.utils.getToolhead(ctx.toolNumber);
	const opts = Options.parse(ctx.templateOptions ?? {});
	// NOTE: Currently, several RatOS macros expect the filament_switch_sensor to be named "toolhead_filament_sensor_t0"
	//    with the "_t0" suffix for single toolhead printers. We can't elegantly skip the suffix for
	//    single toolhead printers until those macros are updated. The macros don't care about the button though.
	const nameSuffix = th.printerHasMultipleToolheads ? `_${th.getShortToolName()}` : '';
	const runout = `
# ${ctx.instance.id} connected to ${ctx.instance.connectedTo}
[filament_switch_sensor toolhead_filament_sensor_${th.getShortToolName()}]
pause_on_runout: False
event_delay: 1.0
switch_pin: ^${ctx.getPrefixedPinFromAlias('filament_sensor_runout_pin')}
runout_gcode:
	_ON_TOOLHEAD_FILAMENT_SENSOR_RUNOUT TOOLHEAD=${th.getTool()}
insert_gcode:
	_ON_TOOLHEAD_FILAMENT_SENSOR_INSERT TOOLHEAD=${th.getTool()}
`;
	const button = opts.isSmart
		? `
[gcode_button filament_sensor_button${nameSuffix}]
pin: ^${ctx.getPrefixedPinFromAlias('filament_sensor_motion_pin')}
press_gcode:
    {% if (printer.print_stats.state == "printing") %}
        _ON_TOOLHEAD_FILAMENT_SENSOR_CLOG TOOLHEAD=${th.getTool()}
    {% else %}
        _ON_FILAMENT_SENSOR_BUTTON_PRESSED TOOLHEAD=${th.getTool()}
    {% endif %}
release_gcode:
	# No action on release
`
		: `
[gcode_button filament_sensor_button${nameSuffix}]
pin: ^${ctx.getPrefixedPinFromAlias('filament_sensor_motion_pin')}
press_gcode:
	_ON_FILAMENT_SENSOR_BUTTON_PRESSED TOOLHEAD=${th.getTool()}
release_gcode:
	# No action on release
`;
	return runout + button;
};
