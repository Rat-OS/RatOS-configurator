import { PrinterConfiguration } from '../zods/printer-configuration';

export const constructKlipperConfigHelpers = (config: PrinterConfiguration) => {
	return {
		renderBoardIncludes() {
			const result: string[] = [];
			if (config.printer.driverCountRequired > config.controlboard.driverCount) {
				if (config.controlboard.extruderlessConfig == null) {
					throw new Error(
						'Control board has insufficient amount of drivers and do not appear to have an extruderless config file.',
					);
				}
				if (
					config.toolboard == null ||
					config.controlboard.driverCount + config.toolboard.driverCount < config.printer.driverCountRequired
				) {
					throw new Error('Control board + toolboard does not make up enough drivers for this printer.');
				}
				result.push(
					`[include RatOS/boards/${config.controlboard.serialPath.replace('/dev/', '')}/${
						config.controlboard.extruderlessConfig
					}]`,
				);
			} else {
				result.push(`[include RatOS/boards/${config.controlboard.serialPath.replace('/dev/', '')}/config.cfg]`);
			}
			if (config.toolboard != null && config.printer.driverCountRequired > config.toolboard.driverCount) {
				result.push(`[include RatOS/boards/${config.toolboard.serialPath.replace('/dev/', '')}/toolbooard-config.cfg]`);
			}
			return result.join('\n');
		},
		renderToolboardDriverOverrides() {
			let result: string[] = [];
			if (config.toolboard != null) {
				result.push('# Use toolboard driver for extruder');
				result.push('[tmc2209 extruder]');
				result.push('uart_pin: toolboard:e_uart_pin');
			}
			return result.join('\n');
		},
		renderToolboardStepperOverrides() {
			let result: string[] = [];
			if (config.toolboard != null) {
				result.push('# Use toolboard driver for extruder');
				result.push('[extruder]');
				result.push('step_pin: toolboard:e_step_pin');
				result.push('enable_pin: !toolboard:e_enable_pin');
				result.push('dir_pin: toolboard:e_dir_pin');
			}
			return result.join('\n');
		},
		renderToolboardHotendOverrides() {
			let result: string[] = [];
			if (config.toolboard != null) {
				result.push('# Use toolboard driver for extruder');
				result.push('[extruder]');
				result.push('heater_pin: toolboard:e_heater_pin');
				result.push('sensor_pin: toolboard:e_sensor_pin');
			}
			return result.join('\n');
		},
		renderInputShaper(printerSize: number) {
			let result: string[] = [];
			result.push('# ADXL345 resonance testing configuration');
			result.push('[resonance_tester]');
			if (config.toolboard != null) {
				result.push('accel_chip: adxl345 toolboard');
			} else {
				result.push('accel_chip: adxl345');
			}
			result.push('probe_points:');
			result.push(`\t${printerSize / 2},${printerSize / 2},20`);
			return result.join('\n');
		},
		renderProbeIncludes() {
			const result: string[] = [];
			if (config.probe != null) {
				result.push(`[include RatOS/z-probe/${config.probe.id}]`);
				if (config.toolboard != null && config.probe.id === 'bltouch') {
					result.push('[include RatOS/toolboard/bltouch.cfg]');
				}
			}
			return result.join('\n');
		},
		renderProbePinSection() {
			const result: string[] = [];
			if (config.probe != null) {
				switch (config.probe.id) {
					case 'bltouch.cfg':
						result.push(`# BLTouch configuration`);
						result.push(`[bltouch]`);
						result.push(`z_offset: 0`);
						break;
					case 'beacon.cfg':
						// print reminder about beacon calibration
						result.push('# REMEMBER TO CALIBRATE YOUR BEACON!');
						result.push(
							'# Follow from step 6 in the official beacon guide https://docs.beacon3d.com/quickstart/#6-calibrate-beacon',
						);
						break;
					default:
						const pinPrefix = this.getProbePinPrefix();
						result.push('# Probe configuration');
						result.push('[probe]');
						result.push('z_offset: 0.0 # Will be commented out after a successful PROBE_CALIBRATE and SAVE_CONFIG');
						result.push(
							`pin: ^${pinPrefix}probe_pin # For NPN NC probes such as the Super Pinda / Vinda / SupCR / Decoprobe probes.`,
						);
						result.push(`#pin: ^!${pinPrefix}probe_pin # NPN NO (refer to the specs of your probe)`);
						result.push(`#pin: ${pinPrefix}probe_pin # PNP NO (refer to the specs of your probe)`);
						result.push(`#pin: !${pinPrefix}probe_pin # PNP NC (refer to the specs of your probe)`);
						break;
				}
			}
			return result.join('\n');
		},
		renderEndstopSection() {
			const result: string[] = [];
			if (config.xEndstop.id !== 'sensorless') {
				result.push(`# Endstop configuration`);
				result.push(`[stepper_x]`);
				result.push(`endstop_pin: ${this.getXEndstopPinPrefix()}x_endstop_pin`);
			}
			if (config.yEndstop.id !== 'sensorless') {
				result.push(`# Endstop configuration`);
				result.push(`[stepper_y]`);
				result.push(`endstop_pin: ${this.getYEndstopPinPrefix()}y_endstop_pin`);
			}

			if (config.xEndstop.id === 'sensorless' || config.yEndstop.id === 'sensorless') {
				result.push('# Sensorless homing.');
				result.push(
					'# Tune the current variable and the SGTHRS value in the included file(s) untill you get reliable homing.',
				);
				result.push(
					'# Read the klipper documentation for more info: https://www.klipper3d.org/TMC_Drivers.html#sensorless-homing',
				);
				result.push(
					'# Note: if your board has diag jumpers, you would need to insert them for the specific drivers you want to use for sensorless homing on.',
				);
				result.push('# Note: Sensorless homing does NOT work if you drivers have a missing DIAG pins.');
			}
			if (config.xEndstop.id === 'sensorless') {
				result.push(`[include sensorless-x-homing-tmc2209.cfg]`);
			}
			if (config.yEndstop.id === 'sensorless') {
				result.push(`[include sensorless-y-homing-tmc2209.cfg]`);
			}
			return result.join('\n');
		},
		renderFanOverrides() {
			const result: string[] = [];
			if (config.toolboard != null) {
				result.push('# Use toolboard fan for part cooling');
				result.push('[fan]');
				result.push('pin: toolboard:fan_part_cooling_pin');
				result.push('');
				result.push('# Use toolboard fan for hotend cooling');
				result.push('[heater_fan toolhead_cooling_fan]');
				result.push('pin: toolboard:fan_toolhead_cooling_pin');
			}
			return result.join('\n');
		},
		getExtruderPinPrefix() {
			if (config.toolboard != null) {
				return 'toolboard:';
			}
			return '';
		},
		getProbePinPrefix() {
			if (config.toolboard != null) {
				return 'toolboard:';
			}
			return '';
		},
		getXEndstopPinPrefix() {
			if (config.toolboard != null && config.xEndstop.id === 'endstop-toolboard') {
				return 'toolboard:';
			}
			return '';
		},
		getYEndstopPinPrefix() {
			return '';
		},
	};
};

export type KlipperConfigHelper = ReturnType<typeof constructKlipperConfigHelpers>;
