import { ToolheadConfiguration } from '../../../zods/toolhead';
import {
	parseBoardPinConfig,
	PinMapZodFromBoard,
	exportBoardPinAlias,
	ControlPins,
	ToolboardPins,
	readInclude,
	stripCommentLines,
	stripIncludes,
	replaceLinesStartingWith,
	stripDriverSections,
} from '../metadata';
import { ToolheadHelper } from '../../../helpers/toolhead';
import { getBoardSerialPath } from '../../../helpers/board';
import { PrinterAxis } from '../../../zods/motion';

export class ToolheadGenerator<IsToolboard extends boolean> extends ToolheadHelper<IsToolboard> {
	private toolboardPins: PinMapZodFromBoard<IsToolboard, false> | null;
	private controlboardPins?: PinMapZodFromBoard<false, IsToolboard>;
	public static async fromConfig<IT extends boolean>(
		config: ToolheadConfiguration<IT>,
		controlPins?: PinMapZodFromBoard<false, IT>,
	): Promise<ToolheadGenerator<IT>> {
		const toolboardPins: PinMapZodFromBoard<IT, false> | null = config.toolboard
			? await parseBoardPinConfig<IT, false>(config.toolboard)
			: null;
		return new ToolheadGenerator<IT>(config, toolboardPins, controlPins);
	}
	constructor(
		toolhead: ToolheadConfiguration<IsToolboard>,
		toolboardPins: PinMapZodFromBoard<IsToolboard, false> | null,
		controlboardPins?: PinMapZodFromBoard<false, IsToolboard>,
	) {
		super(toolhead);
		this.toolboardPins = toolboardPins;
		this.controlboardPins = controlboardPins;
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
	public renderToolboard() {
		const pins = this.toolboardPins;
		const toolboard = this.config.toolboard;
		if (toolboard == null || pins == null) {
			return '';
		}
		const result = [
			'', // Add a newline for readability.
			exportBoardPinAlias(this.getToolboardName(), pins, this.getToolboardName()),
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
			result.push(`cs_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.cs_pin}`);
			if ('hardware' in toolboard.ADXL345SPI) {
				result.push(`spi_bus: ${toolboard.ADXL345SPI.hardware.bus}`);
			} else {
				result.push(`spi_software_mosi_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.software.mosi}`);
				result.push(`spi_software_miso_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.software.miso}`);
				result.push(`spi_software_sclk_pin: ${this.getPinPrefix()}${toolboard.ADXL345SPI.software.sclk}`);
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
	public renderHotend() {
		// Todo parse modify and output hotend config
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
		if (this.getThermistor() === 'PT1000' && this.getToolboard()?.alternativePT1000Resistor != null) {
			if (hotend.split('\n').some((line) => line.trim().startsWith('pullup_resistor'))) {
				hotend = replaceLinesStartingWith(
					hotend,
					'pullup_resistor',
					`pullup_resistor: ${this.getToolboard()?.alternativePT1000Resistor}`,
				);
			} else {
				hotend = replaceLinesStartingWith(
					hotend,
					'sensor_type',
					`sensor_type: ${this.getThermistor()}\npullup_resistor: ${this.getToolboard()?.alternativePT1000Resistor}`,
				);
			}
		} else {
			hotend = replaceLinesStartingWith(hotend, 'sensor_type', `sensor_type: ${this.getThermistor()}`);
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
	public renderPartFan(multipleToolheadPartFans: boolean = false) {
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
				result.push(`# 2-pin fan connected to the controller board`);
				result.push(`pin: ${this.controlboardPins?.fan_part_cooling_pin}`);
				break;
			case '4pin':
				this.requireControlboardPin('fan_part_cooling_pin');
				result.push(`# 4-pin fan connected to the controller board`);
				result.push(`pin: !${this.controlboardPins?.fan_part_cooling_pin}`);
				result.push(`cycle_time:  0.00004`);
				break;
			case '4pin-dedicated':
				this.requireControlboardPin('4p_fan_part_cooling_pin');
				result.push(`# 4-pin fan connected to a dedicated 4-pin fan header on the controller board`);
				result.push(`pin: !${this.controlboardPins?.['4p_fan_part_cooling_pin']}`);
				result.push(`cycle_time:  0.00004`);
				if (this.controlboardPins?.['4p_fan_part_cooling_tach_pin'] != null) {
					result.push(`tachometer_pin: ${this.controlboardPins?.['4p_fan_part_cooling_tach_pin']}`);
					result.push(`tachometer_poll_interval: 0.0005`);
				}
				break;
			case '2pin-toolboard':
				this.requireToolboardPin('fan_part_cooling_pin');
				result.push(`# 2-pin fan connected to the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
				result.push(`pin: ${this.getPinPrefix()}${this.toolboardPins?.fan_part_cooling_pin}`);
				break;
			case '4pin-toolboard':
				this.requireToolboardPin('fan_part_cooling_pin');
				result.push(`# 4-pin fan connected to the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
				result.push(`pin: !${this.getPinPrefix()}${this.toolboardPins?.fan_part_cooling_pin}`);
				result.push(`cycle_time:  0.00004`);
				break;
			case '4pin-dedicated-toolboard':
				this.requireToolboardPin('4p_fan_part_cooling_tach_pin');
				result.push(
					`# 4-pin fan connected to a dedicated 4-pin fan header on the toolboard on T${this.getTool()} (${this.getToolboardName()})`,
				);
				result.push(`pin: !${this.getPinPrefix()}${this.toolboardPins?.['4p_fan_part_cooling_tach_pin']}`);
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
	public renderHotendFan() {
		let result: string[] = [
			`[heater_fan toolhead_cooling_fan${this.getTool() > 0 ? `_${this.getShortToolName()}` : ''}]`,
			`heater: ${this.getExtruderAxis().toLocaleLowerCase()}`,
		];
		switch (this.getHotendFan().id) {
			case '2pin':
				this.requireControlboardPin('fan_toolhead_cooling_pin');
				result.push(`# 2-pin fan connected to the controller board`);
				result.push(`pin: ${this.controlboardPins?.fan_toolhead_cooling_pin}`);
				break;
			case '4pin':
				this.requireControlboardPin('fan_toolhead_cooling_pin');
				result.push(`# 4-pin fan connected to the controller board`);
				result.push(`pin: !${this.controlboardPins?.fan_toolhead_cooling_pin}`);
				result.push(`cycle_time:  0.00004`);
				break;
			case '4pin-dedicated':
				this.requireControlboardPin('4p_fan_part_cooling_tach_pin');
				result.push(`# 4-pin fan connected to a dedicated 4-pin fan header on the controller board`);
				result.push(`pin: !${this.controlboardPins?.['4p_fan_part_cooling_tach_pin']}`);
				result.push(`cycle_time:  0.00004`);
				if (this.controlboardPins?.['4p_fan_part_cooling_tach_pin'] != null) {
					result.push(`tachometer_pin: ^${this.controlboardPins?.['4p_fan_part_cooling_tach_pin']}`);
					result.push(`tachometer_poll_interval: 0.0005`);
				}
				break;
			case '2pin-toolboard':
				this.requireToolboardPin('fan_toolhead_cooling_pin');
				result.push(`# 2-pin fan connected to the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
				result.push(`pin: ${this.getPinPrefix()}${this.toolboardPins?.fan_toolhead_cooling_pin}`);
				break;
			case '4pin-toolboard':
				this.requireToolboardPin('fan_toolhead_cooling_pin');
				result.push(`# 4-pin fan connected to the toolboard on T${this.getTool()} (${this.getToolboardName()})`);
				result.push(`pin: !${this.getPinPrefix()}${this.toolboardPins?.fan_toolhead_cooling_pin}`);
				result.push(`cycle_time:  0.00004`);
				break;
			case '4pin-dedicated-toolboard':
				this.requireToolboardPin('4p_toolhead_cooling_pin');
				result.push(
					`# 4-pin fan connected to a dedicated 4-pin fan header on the toolboard on T${this.getTool()} (${this.getToolboardName()})`,
				);
				result.push(`pin: !${this.getPinPrefix()}${this.toolboardPins?.['4p_toolhead_cooling_pin']}`);
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
		const result = [
			`[gcode_macro ${this.getToolCommand()}]`,
			`variable_active: ${this.getTool() === 0 ? 'True' : 'False'}`,
			`variable_color: "${this.getTool() === 0 ? '7bff33' : '0ea5e9'}"              # Used in frontends`,
			`gcode:`,
			`	{% set x = params.X|default(-1.0)|float %}`,
			`	{% set y = params.Y|default(-1.0)|float %}`,
			`	{% set z = params.Z|default(0.0)|float %}`,
			`	{% set s = params.S|default(1)|int %}`,
			`	_SELECT_TOOL T=${this.getTool()} X={x} Y={y} Z={z} TOOLSHIFT={s}`,
		];
		return result.join('\n');
	}
}
