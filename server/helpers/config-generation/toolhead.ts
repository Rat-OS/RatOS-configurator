import { ToolheadConfiguration } from '@/zods/toolhead';
import {
	parseBoardPinConfig,
	PinMapZodFromBoard,
	ControlPins,
	ToolboardPins,
	readInclude,
	stripCommentLines,
	stripIncludes,
	replaceLinesStartingWith,
	stripDriverSections,
} from '@/server/helpers/metadata';
import { ToolheadHelper } from '@/helpers/toolhead';
import { getBoardSerialPath } from '@/helpers/board';
import { PrinterAxis } from '@/zods/motion';
import { PrinterConfiguration } from '@/zods/printer-configuration';
import type { RenderPinsFn } from '@/server/helpers/klipper-config';
import { getLogger } from '@/server/helpers/logger';
import { Board } from '@/zods/boards';

export class ToolheadGenerator<IsToolboard extends boolean> extends ToolheadHelper<IsToolboard> {
	private toolboardPins: PinMapZodFromBoard<IsToolboard, false> | null;
	private controlboardPins?: PinMapZodFromBoard<false, IsToolboard>;
	private printer: PrinterConfiguration['printer'];
	private size: PrinterConfiguration['size'];
	public static async fromConfig<IT extends boolean>(
		config: ToolheadConfiguration<IT>,
		controlPins: PinMapZodFromBoard<false, IT>,
		printer: PrinterConfiguration['printer'],
		size: PrinterConfiguration['size'],
	): Promise<ToolheadGenerator<IT>> {
		const toolboardPins: PinMapZodFromBoard<IT, false> | null = config.toolboard
			? await parseBoardPinConfig<IT, false>(config.toolboard)
			: null;
		return new ToolheadGenerator<IT>(config, toolboardPins, controlPins, printer, size);
	}
	constructor(
		toolhead: ToolheadConfiguration<IsToolboard>,
		toolboardPins: PinMapZodFromBoard<IsToolboard, false> | null,
		controlboardPins: PinMapZodFromBoard<false, IsToolboard>,
		printer: PrinterConfiguration['printer'],
		size: PrinterConfiguration['size'],
	) {
		super(toolhead);
		this.toolboardPins = toolboardPins;
		this.controlboardPins = controlboardPins;
		this.printer = printer;
		this.size = size;
	}
	public requireControlboardPin(pin: keyof ControlPins<false>) {
		if (this.controlboardPins?.[pin] == null) {
			throw new Error(
				`Toolhead ${this.getTool()} is configured to use the controlboard for ${pin}, but the controlboard does not define a pin with that name.`,
			);
		}
	}
	public requireToolboardPin(pin: keyof ToolboardPins<true>) {
		if (this.toolboardPins?.[pin] == null) {
			throw new Error(
				`Toolhead ${this.getTool()} is configured to use the toolboard for ${pin}, but the toolboard does not define a pin with that name.`,
			);
		}
	}
	getExtruderToolAxisPinPrefix() {
		if (this.getTool() === 0) {
			return '';
		}
		return this.getTool();
	}
	getToolboardPins() {
		if (this.toolboardPins == null) {
			throw new Error(`Toolboard pins not available for toolhead ${this.getToolCommand()}`);
		}
		return this.toolboardPins;
	}
	getToolheadPin(axis: PrinterAxis, alias: string) {
		const prefix = axis === this.getExtruderAxis() ? this.getPinPrefix() : '';
		const axisAlias =
			axis === PrinterAxis.z
				? 'z0'
				: axis !== this.getExtruderAxis()
					? axis
					: this.getToolboard() != null
						? 'e'
						: 'e' + this.getExtruderToolAxisPinPrefix();
		const pinName = axisAlias + alias;
		let pinValue = null;
		try {
			pinValue = this.getPinFromAlias(pinName as keyof ControlPins<false> | keyof ToolboardPins<true>);
		} catch (e) {
			pinValue = null;
		}
		if (pinValue == null) {
			throw new Error(
				`Pin name "${pinName}" constructed from axis "${axis}" and alias "${alias}" not found on toolhead ${this.getToolCommand()} with extruder axis ${this.getExtruderAxis()}. Resolved axis alias ${axisAlias}. Searched in ${
					this.getToolboard() ? 'toolboard' : 'controlboard'
				}`,
			);
		}
		return prefix + pinValue;
	}
	public getPinFromAlias(alias: keyof ControlPins<false> | keyof ToolboardPins<true>): string {
		let pin = null;
		if (this.getToolboard()) {
			if (this.toolboardPins?.[alias] != null) {
				pin = this.toolboardPins[alias];
			} else {
				throw new Error(`Alias "${alias}" not found in toolboard pin definition.`);
			}
		} else if (this.controlboardPins?.[alias] != null) {
			pin = this.controlboardPins[alias];
		}
		if (pin != null) {
			return pin;
		}
		throw new Error(`Unknown pin alias ${alias}`);
	}
	public getPinFromToolboardAlias(alias: keyof ToolboardPins<true>): string {
		let pin = null;
		let _alias =
			alias.split('_')[0] === 'e1' ? (('e' + this.getExtruderToolAxisPinPrefix()) as keyof ToolboardPins<true>) : alias; // Toolheads only have one extruder.
		if (!this.hasToolboard()) {
			throw new Error(`Toolhead ${this.getTool()} is not configured to use a toolboard`);
		}
		if (this.toolboardPins?.[_alias] != null) {
			pin = this.toolboardPins[_alias];
		} else {
			throw new Error(`Alias "${_alias}" not found in toolboard pin definition.`);
		}
		if (pin != null) {
			return pin;
		}
		throw new Error(`Unknown pin alias ${_alias}`);
	}
	public getXEndstopPin() {
		let pin: string;
		switch (this.getXEndstop().id) {
			case 'endstop':
				if (this.controlboardPins?.x_endstop_pin == null) {
					throw new Error(
						`Toolhead ${this.getTool()} is configured to use the controlboard for the x endstop, but the controlboard has no x_endstop_pin`,
					);
				}
				pin = this.controlboardPins.x_endstop_pin;
				break;
			case 'endstop-toolboard':
				if (this.toolboardPins?.x_endstop_pin == null) {
					throw new Error(
						`Toolhead ${this.getTool()} is configured to use a toolboard for the x endstop, but the toolboard has no x_endstop_pin`,
					);
				}
				pin = this.getPinPrefix() + this.toolboardPins.x_endstop_pin;
				break;
			default:
				throw new Error(`Unknown endstop type ${this.getXEndstop().id}`);
		}
		return pin;
	}
	public getYEndstopPin() {
		let pin: string;
		switch (this.getYEndstop().id) {
			case 'endstop':
				if (this.controlboardPins?.y_endstop_pin == null) {
					throw new Error(
						`Toolhead ${this.getTool()} is configured to use the controlboard for the x endstop, but the controlboard has no y_endstop_pin`,
					);
				}
				pin = this.controlboardPins.y_endstop_pin;
				break;
			case 'endstop-toolboard':
				if (this.toolboardPins?.y_endstop_pin == null) {
					throw new Error(
						`Toolhead ${this.getTool()} is configured to use a toolboard for the x endstop, but the toolboard has no y_endstop_pin`,
					);
				}
				pin = this.getPinPrefix() + this.toolboardPins.y_endstop_pin;
				break;
			default:
				throw new Error(`Unknown endstop type ${this.getXEndstop().id}`);
		}
		return pin;
	}
	public getPinPrefix() {
		if (this.config.toolboard) {
			return `${this.getToolboardName()}:` satisfies `${ReturnType<typeof this.getToolboardName>}:`;
		} else {
			return ''; // use controlboard
		}
	}
	public renderToolboard(exportPinsFn?: RenderPinsFn) {
		const pins = this.toolboardPins;
		const toolboard = this.config.toolboard;
		if (toolboard == null || pins == null) {
			return '';
		}
		if (exportPinsFn == null) {
			throw new Error('exportPinsFn is required when rendering toolboard');
		}
		const result = [
			'', // Add a newline for readability.
			exportPinsFn(this.getToolboardName(), toolboard, this, this.getToolboardName()),
			'', // Add a newline for readability.
			`[mcu ${this.getToolboardName()}]`,
			`serial: ${getBoardSerialPath(toolboard, this)}`,
		];
		if (toolboard.hasMcuTempSensor) {
			result.push(''); // Add a newline for readability.
			result.push(`[temperature_sensor ${toolboard.name.replace(/\s/g, '_')}_${this.getToolCommand()}]`);
			result.push(`sensor_type: temperature_mcu`);
			result.push(`sensor_mcu: ${this.getToolboardName()}`);
		}
		if (toolboard.ADXL345SPI != null) {
			result.push(''); // Add a newline for readability.
			result.push(`[adxl345 ${this.getToolboardName()}]`);
			result.push(`axes_map: x, z, y # Assumes back-facing vertical toolboard mounting`);
			result.push(`cs_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.cs_pin}`);
			if ('hardware' in toolboard.ADXL345SPI) {
				result.push(`spi_bus: ${toolboard.ADXL345SPI.hardware.bus}`);
			} else {
				result.push(`spi_software_mosi_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.software.mosi}`);
				result.push(`spi_software_miso_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.software.miso}`);
				result.push(`spi_software_sclk_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.software.sclk}`);
			}
		}
		if (toolboard.LIS2DW != null) {
			result.push(''); // Add a newline for readability.
			result.push(`[lis2dw ${this.getToolboardName()}]`);
			result.push(`axes_map: x, z, y # Assumes back-facing vertical toolboard mounting`);
			result.push(`cs_pin: ${this.getPinPrefix()}${toolboard.LIS2DW.cs_pin}`);
			if ('hardware' in toolboard.LIS2DW) {
				result.push(`spi_bus: ${toolboard.LIS2DW.hardware.bus}`);
			} else {
				result.push(`spi_software_mosi_pin: ${this.getPinPrefix()}${toolboard.LIS2DW.software.mosi}`);
				result.push(`spi_software_miso_pin: ${this.getPinPrefix()}${toolboard.LIS2DW.software.miso}`);
				result.push(`spi_software_sclk_pin: ${this.getPinPrefix()}${toolboard.LIS2DW.software.sclk}`);
			}
		}
		if (toolboard.outputPins != null) {
			toolboard.outputPins.forEach((pindef) => {
				result.push(''); // Add a newline for readability.
				result.push(`[output_pin ${pindef.name}]`);
				result.push(`pin: ${this.getPinPrefix()}${pindef.pin}`);
				result.push(`value: ${pindef.value}`);
			});
		}
		return result.join('\n');
	}
	public renderHotend(controlboard: Board) {
		let result: string[] = [];
		let hotend = readInclude(`hotends/${this.getHotend().id}.cfg`);
		hotend = stripCommentLines(hotend);
		hotend = stripIncludes(hotend);
		hotend = replaceLinesStartingWith(hotend, '[extruder]', `[${this.getExtruderAxis()}]`);
		hotend = replaceLinesStartingWith(
			hotend,
			'heater_pin',
			`heater_pin: ${this.getToolheadPin(this.getExtruderAxis(), '_heater_pin')}`,
		);
		hotend = replaceLinesStartingWith(
			hotend,
			'sensor_pin',
			`sensor_pin: ${this.getToolheadPin(this.getExtruderAxis(), '_sensor_pin')}`,
		);
		const altPullup = this.getToolboard()?.alternativePT1000Resistor ?? controlboard.alternativePT1000Resistor;
		const stdPullup = this.getToolboard()?.thermistorPullup ?? controlboard.thermistorPullup;
		const actualPullup = this.getThermistor() === 'PT1000' && altPullup != null ? altPullup : stdPullup;
		if (hotend.split('\n').some((line) => line.trim().startsWith('pullup_resistor'))) {
			hotend = replaceLinesStartingWith(hotend, 'pullup_resistor', `pullup_resistor: ${actualPullup}`);
		} else {
			hotend = replaceLinesStartingWith(
				hotend,
				'sensor_type',
				`sensor_type: ${this.getThermistor()}\npullup_resistor: ${actualPullup}`,
			);
		}
		if (hotend.split('\n').some((line) => line.trim().startsWith('nozzle_diameter'))) {
			hotend = replaceLinesStartingWith(hotend, 'nozzle_diameter', `nozzle_diameter: ${this.getNozzle().diameter}`);
		} else {
			hotend = replaceLinesStartingWith(
				hotend,
				`[${this.getExtruderAxis()}]`,
				`[${this.getExtruderAxis()}]\nnozzle_diameter: ${this.getNozzle().diameter}`,
			);
		}
		result.push(
			`# ${this.getToolCommand()} ${this.getHotend().title} definition (from RatOS/hotends/${this.getHotend().id}.cfg)`,
		);
		result.push(hotend.trim());
		return result.join('\n');
	}
	public renderExtruder() {
		let result: string[] = [];
		// Get rid of the stepper/driver includes in the extruder config and paste it inline (backwards compatibility with 2.0).
		result.push(
			`# ${this.getToolCommand()} ${this.getExtruder().title} definition (from RatOS/extruders/${
				this.getExtruder().id
			}.cfg)`,
		);
		let extruder = stripCommentLines(
			stripIncludes(stripDriverSections(readInclude(`extruders/${this.getExtruder().id}.cfg`))),
		);
		extruder = replaceLinesStartingWith(extruder, '[extruder]', `[${this.getExtruderAxis()}]`);
		result.push(extruder.trim());
		return result.join('\n');
	}
	public renderPartFan(multipleToolheadPartFans: boolean = false, controlboard: Board) {
		let result: string[] = [];
		if (multipleToolheadPartFans) {
			const fanName = `part_fan_${this.getShortToolName()}`;
			result.push(`[fan_generic ${fanName}]`);
		} else {
			result.push(`[fan]`);
		}
		switch (this.getPartFan().id) {
			case '2pin':
				this.requireControlboardPin('fan_part_cooling_pin');
				result.push(`# 2-pin fan connected to 2-pin header on ${controlboard.name} - input voltage pwm`);
				result.push(`pin: ${this.controlboardPins?.fan_part_cooling_pin}`);
				break;
			case '4pin':
				this.requireControlboardPin('fan_part_cooling_pin');
				result.push(`# 4-pin fan connected to 2-pin header on ${controlboard.name} - digital pwm`);
				result.push(`pin: !${this.controlboardPins?.fan_part_cooling_pin}`);
				result.push(`cycle_time:  0.00004`);
				break;
			case '4pin-dedicated':
				this.requireControlboardPin('4p_fan_part_cooling_pin');
				result.push(`# 4-pin fan connected to 4-pin header on ${controlboard.name} - digital pwm`);
				result.push(`pin: ${this.controlboardPins?.['4p_fan_part_cooling_pin']}`);
				result.push(`cycle_time:  0.00004`);
				if (this.controlboardPins?.['4p_fan_part_cooling_tach_pin'] != null) {
					result.push(`tachometer_pin: ${this.controlboardPins?.['4p_fan_part_cooling_tach_pin']}`);
					result.push(`tachometer_poll_interval: 0.0005`);
				}
				break;
			case '2pin-toolboard':
				this.requireToolboardPin('fan_part_cooling_pin');
				result.push(
					`# 2-pin fan connected to 2-pin header on T${this.getTool()} (${this.getToolboard()?.name}) - input voltage pwm`,
				);
				result.push(`pin: ${this.getPinPrefix()}${this.toolboardPins?.fan_part_cooling_pin}`);
				break;
			case '4pin-toolboard':
				this.requireToolboardPin('fan_part_cooling_pin');
				result.push(
					`# 4-pin fan connected to 2-pin header on T${this.getTool()} (${this.getToolboard()?.name}) - digital pwm`,
				);
				result.push(`pin: !${this.getPinPrefix()}${this.toolboardPins?.fan_part_cooling_pin}`);
				result.push(`cycle_time:  0.00004`);
				break;
			case '4pin-dedicated-toolboard':
				this.requireToolboardPin('4p_fan_part_cooling_pin');
				result.push(
					`# 4-pin fan connected to 4-pin header on T${this.getTool()} (${this.getToolboard()?.name}) - digital pwm`,
				);
				result.push(`pin: ${this.getPinPrefix()}${this.toolboardPins?.['4p_fan_part_cooling_pin']}`);
				result.push(`cycle_time:  0.00004`);
				if (this.toolboardPins?.['4p_fan_part_cooling_tach_pin'] != null) {
					result.push(`tachometer_pin: ${this.toolboardPins?.['4p_fan_part_cooling_tach_pin']}`);
					result.push(`tachometer_poll_interval: 0.0005`);
				}
				break;
			default:
				throw new Error(`Unsupported part cooling fan option "${this.getHotendFan().title}"`);
		}
		return result.join('\n');
	}
	public renderHotendFan(controlboard: Board) {
		let result: string[] = [
			`[heater_fan toolhead_cooling_fan${this.getTool() > 0 ? `_${this.getShortToolName()}` : ''}]`,
			`heater: ${this.getExtruderAxis().toLocaleLowerCase()}`,
		];
		switch (this.getHotendFan().id) {
			case '2pin':
				this.requireControlboardPin('fan_toolhead_cooling_pin');
				result.push(`# 2-pin fan connected to 2-pin header on ${controlboard.name} - input voltage pwm`);
				result.push(`pin: ${this.controlboardPins?.fan_toolhead_cooling_pin}`);
				break;
			case '4pin':
				this.requireControlboardPin('fan_toolhead_cooling_pin');
				result.push(`# 4-pin fan connected to 2-pin header on ${controlboard.name} - digital pwm`);
				result.push(`pin: !${this.controlboardPins?.fan_toolhead_cooling_pin}`);
				result.push(`cycle_time:  0.00004`);
				break;
			case '4pin-dedicated':
				this.requireControlboardPin('4p_toolhead_cooling_tach_pin');
				result.push(`# 4-pin fan connected to 4-pin header on ${controlboard.name} - digital pwm`);
				result.push(`pin: ${this.controlboardPins?.['4p_toolhead_cooling_tach_pin']}`);
				result.push(`cycle_time:  0.00004`);
				if (this.controlboardPins?.['4p_toolhead_cooling_tach_pin'] != null) {
					result.push(`tachometer_pin: ^${this.controlboardPins?.['4p_toolhead_cooling_tach_pin']}`);
					result.push(`tachometer_poll_interval: 0.0005`);
				}
				break;
			case '2pin-toolboard':
				this.requireToolboardPin('fan_toolhead_cooling_pin');
				result.push(
					`# 2-pin fan connected to 2-pin header on T${this.getTool()} (${this.getToolboard()?.name}) - input voltage pwm`,
				);
				result.push(`pin: ${this.getPinPrefix()}${this.toolboardPins?.fan_toolhead_cooling_pin}`);
				break;
			case '4pin-toolboard':
				this.requireToolboardPin('fan_toolhead_cooling_pin');
				result.push(
					`# 4-pin fan connected to 2-pin header on T${this.getTool()} (${this.getToolboard()?.name}) - digital pwm`,
				);
				result.push(`pin: !${this.getPinPrefix()}${this.toolboardPins?.fan_toolhead_cooling_pin}`);
				result.push(`cycle_time:  0.00004`);
				break;
			case '4pin-dedicated-toolboard':
				this.requireToolboardPin('4p_toolhead_cooling_pin');
				result.push(
					`# 4-pin fan connected to 4-pin header on T${this.getTool()} (${this.getToolboard()?.name}) - digital pwm`,
				);
				result.push(`pin: ${this.getPinPrefix()}${this.toolboardPins?.['4p_toolhead_cooling_pin']}`);
				result.push(`cycle_time:  0.00004`);
				if (this.toolboardPins?.['4p_toolhead_cooling_tach_pin'] != null) {
					result.push(`tachometer_pin: ^${this.toolboardPins?.['4p_toolhead_cooling_tach_pin']}`);
					result.push(`tachometer_poll_interval: 0.0005`);
				}
				break;
			default:
				throw new Error(`Unsupported hotend fan option "${this.getHotendFan().title}"`);
		}
		return result.join('\n');
	}
	renderToolheadMacro() {
		const endstopSafetyMargin = 5;
		let parkX: number | null = null;
		if (this.getMotionAxis() === PrinterAxis.x) {
			parkX = -1 * this.printer.bedMargin.x[0] + endstopSafetyMargin;
		} else if (this.getMotionAxis() === PrinterAxis.dual_carriage) {
			parkX = this.size.x + this.printer.bedMargin.x[1] - endstopSafetyMargin;
		}
		if (parkX == null || isNaN(parkX)) {
			getLogger().debug('renderToolheadMacro:', this.printer.bedMargin.x[0], this.size, this.printer.bedMargin.x[1]);
			throw new Error(`Failed to generate parking position for toolhead ${this.getToolCommand()}. Generated: ${parkX}`);
		}
		const result = [
			`[gcode_macro ${this.getToolCommand()}]`,
			`variable_active: ${this.getTool() === 0 ? 'True' : 'False'}`,
			`variable_color: "${this.getTool() === 0 ? '7bff33' : '0ea5e9'}"              # Used in frontends`,
			`variable_hotend_type: "${this.getHotend().flowType.toUpperCase()}"`,
			`variable_has_cht_nozzle: ${this.getNozzle().type === 'CHT' ? 'True' : 'False'}`,
			`variable_cooling_position_to_nozzle_distance: 40                             # heatbreak length from cold zone to nozzle`,
			`variable_tooolhead_sensor_to_extruder_gear_distance: 15                      # distance in mm from the sensor to the extruder gear`,
			`variable_extruder_gear_to_cooling_position_distance: 30                      # distance in mm from the extruder gear to the end of the hotend cold zone`,
			`variable_filament_loading_nozzle_offset: -5`,
			`variable_filament_grabbing_length: 5`,
			`variable_filament_grabbing_speed: 1`,
			`variable_enable_insert_detection: True                                       # enables filament sensor insert detection `,
			`variable_enable_runout_detection: True                                       # enables filament sensor runout detection `,
			`variable_enable_clog_detection: True                                         # enables filament sensor clog detection `,
			`variable_unload_after_runout: True                                           # unload filament after a runout has been detected`,
			`variable_purge_after_load: 0`,
			`variable_purge_before_unload: 0`,
			`variable_extruder_load_speed: 60`,
			`variable_filament_load_speed: 10`,
			`variable_standby: False`,
			`variable_temperature_offset: 0                                               # hotend temperature offset`,
			`variable_has_oozeguard: False                                                # toolhead has a oozeguard`,
			`variable_has_front_arm_nozzle_wiper: False                                   # toolhead has front arm nozzle wipers`,
		];
		if (this.printer.kinematics == 'hybrid-corexy-idex') {
			result.push(
				`variable_loading_position: ${this.getTool() === 0 ? parkX + 25 : parkX - 25} # filament load x position`,
				`variable_parking_position: ${parkX} # parking x position`,
				`variable_resume_after_insert: True                                           # resumes the print after inserting new filament`,
			);
		} else {
			result.push(
				`variable_resume_after_insert: False                                          # resumes the print after inserting new filament`,
			);
		}
		result.push(
			`gcode:`,
			`	{% set x = params.X|default(-1.0)|float %}`,
			`	{% set y = params.Y|default(-1.0)|float %}`,
			`	{% set z = params.Z|default(0.0)|float %}`,
			`	{% set s = params.S|default(1)|int %}`,
			`	{% if printer["gcode_macro _SELECT_TOOL"] is defined %}`,
			`		_SELECT_TOOL T=${this.getTool()} X={x} Y={y} Z={z} TOOLSHIFT={s}`,
			`	{% endif %}`,
		);
		return result.join('\n');
	}
}
