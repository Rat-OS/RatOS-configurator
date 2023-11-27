import { PrinterConfiguration } from '../zods/printer-configuration';
import { sensorlessXTemplate, sensorlessYTemplate } from '../templates/extras/sensorless-homing';
import { PrinterAxis, PrinterRail, matchesDefaultRail } from '../zods/motion';
import { findPreset } from '../data/steppers';
import { deserializePrinterRailDefinition } from '../utils/serialization';

type WritableFiles = { fileName: string; content: string; overwrite: boolean }[];

export const constructKlipperConfigUtils = (config: PrinterConfiguration) => {
	return {
		getRail(axis: PrinterAxis) {
			const rail = config.rails.find((r) => r.axis === axis);
			if (rail == null) {
				throw new Error(`No rail found for axis ${axis}`);
			}
			return rail;
		},
		getAxisPinName(axis: PrinterAxis, alias: string) {
			return (axis === PrinterAxis.z ? 'z0' : axis === PrinterAxis.extruder ? 'e' : axis) + alias;
		},
		getAxisStepperName(axis: PrinterAxis) {
			return axis === PrinterAxis.extruder ? 'extruder' : 'stepper' + '_' + axis;
		},
		getAxisDriverType(axis: PrinterAxis) {
			return this.getRail(axis).driver.type.toLowerCase();
		},
		getAxisDriverSectionName(axis: PrinterAxis) {
			return `${this.getAxisDriverType(axis)} ${this.getAxisStepperName(axis)}`;
		},
		getAxisVirtualEndstop(axis: PrinterAxis) {
			return `${this.getAxisDriverType(axis)}_${this.getAxisStepperName(axis)}:virtual_endstop`;
		},
		getAxisDriverStallGuardThreshold(axis: PrinterAxis, factor: number) {
			const rail = this.getRail(axis);
			factor = Math.max(0, Math.min(1, factor));
			if (['TMC2130', 'TMC5160', 'TMC2240'].includes(rail.driver.type)) {
				return `driver_SGT: ${Math.round(factor * 127) - 64}`;
			} else {
				return `driver_SGTHRS: ${Math.round(factor * 255)}`;
			}
		},
		getAxisDriverHomingCurrent(axis: PrinterAxis, factor: number) {
			const rail = this.getRail(axis);
			factor = Math.max(0, Math.min(1, factor));
			return rail.stepper.maxPeakCurrent * 0.71 * factor;
		},
	};
};
export type KlipperConfigUtils = ReturnType<typeof constructKlipperConfigUtils>;

export const constructKlipperConfigExtrasGenerator = (config: PrinterConfiguration, utils: KlipperConfigUtils) => {
	const _filesToWrite: WritableFiles = [];
	const _reminders: string[] = [];
	return {
		getFilesToWrite() {
			return _filesToWrite.slice();
		},
		addFileToRender(fileToRender: Unpacked<WritableFiles>) {
			_filesToWrite.push(fileToRender);
		},
		getReminders() {
			return _reminders.slice();
		},
		generateSensorlessHomingIncludes() {
			const filesToWrite: WritableFiles = [];
			if (config.xEndstop.id === 'sensorless') {
				filesToWrite.push({
					fileName: 'sensorless-homing-x.cfg',
					content: sensorlessXTemplate(config, utils),
					overwrite: false,
				});
			}
			if (config.yEndstop.id === 'sensorless') {
				filesToWrite.push({
					fileName: 'sensorless-homing-y.cfg',
					content: sensorlessYTemplate(config, utils),
					overwrite: false,
				});
			}
			if (filesToWrite.length > 0) {
				const reminder: string[] = [];
				reminder.push('# REMEMBER TO TUNE SENSORLESS HOMING BEFORE ATTEMPTING TO PRINT!');
				reminder.push(
					`# You'll find instructions in the generated sensorless-homing-*.cfg file(s),`,
					`# where you should keep your sensorless homing settings.`,
				);
				this.addReminder(reminder.join('\n'));
			}
			return filesToWrite
				.map((f) => {
					this.addFileToRender(f);
					return `[include ${f.fileName}]`;
				})
				.join('\n');
		},
		addReminder(reminder: string) {
			_reminders.push(reminder);
		},
	};
};

export type KlipperConfigExtrasGenerator = ReturnType<typeof constructKlipperConfigExtrasGenerator>;

/**
 * Constructs a printer agnostic helper object for generating klipper config files.
 * @param config the printer configuration to generate helpers for
 * @param extrasGenerator an extras generator for handling non-explicit template functionality
 * @returns
 */
export const constructKlipperConfigHelpers = (
	config: PrinterConfiguration,
	extrasGenerator: KlipperConfigExtrasGenerator,
	utils: KlipperConfigUtils,
) => {
	return {
		...utils,
		renderBoardIncludes() {
			const result: string[] = [
				'[include RatOS/boards/rpi/config.cfg]', // Always include RPi.
			];
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
		renderStepperSections() {
			return config.rails
				.map((r) => {
					return this.renderStepperSection(r);
				})
				.join('\n');
		},
		renderStepperSection(axis: PrinterAxis | Zod.infer<typeof PrinterRail>) {
			const rail = typeof axis === 'object' ? axis : config.rails.find((r) => r.axis === axis);
			if (rail == null) {
				throw new Error(`No rail found for axis ${axis}`);
			}
			const section = [
				`[${utils.getAxisStepperName(rail.axis)}]`,
				`step_pin: ${utils.getAxisPinName(rail.axis, '_step_pin')}`,
				`dir_pin: ${utils.getAxisPinName(rail.axis, '_dir_pin')}`,
				`enable_pin: !${utils.getAxisPinName(rail.axis, '_enable_pin')}`,
				`microsteps: ${rail.microstepping}`,
				`rotation_distance: ${rail.rotationDistance}`,
				`homing_speed: ${rail.homingSpeed}`,
			];
			if (rail.gearRatio != null) {
				section.push(`gear_ratio: ${rail.gearRatio}`);
			}
			if (rail.axis === PrinterAxis.z) {
				if (config.probe != null) {
					section.push(`endstop_pin: probe:z_virtual_endstop`);
				}
			}
			return section.join('\n') + '\n';
		},
		renderDriverSections() {
			return config.rails
				.map((r) => {
					return this.renderDriverSection(r);
				})
				.join('\n');
		},
		renderDriverSection(axis: PrinterAxis | Zod.infer<typeof PrinterRail>) {
			const rail = typeof axis === 'object' ? axis : config.rails.find((r) => r.axis === axis);
			if (rail == null) {
				throw new Error(`No rail found for axis ${axis}`);
			}
			const preset = findPreset(rail.stepper, rail.driver, rail.voltage, rail.current);
			const section = [
				`[${utils.getAxisDriverSectionName(rail.axis)}]`,
				`stealthchop_threshold: ${config.stealthchop ? '9999999' : config.standstillStealth ? '1' : '0'}`,
				`interpolate: ${rail.microstepping < 64 || config.stealthchop ? 'True' : 'False'}`,
			];
			if (rail.driver.protocol === 'UART') {
				section.push(`uart_pin: ${utils.getAxisPinName(rail.axis, '_uart_pin')}`);
			}
			if (rail.driver.protocol === 'SPI') {
				section.push(`cs_pin: ${utils.getAxisPinName(rail.axis, '_cs_pin')}`);
				section.push(`spi_software_mosi_pin: stepper_spi_mosi_pin`);
				section.push(`spi_software_miso_pin: stepper_spi_miso_pin`);
				section.push(`spi_software_sclk_pin: stepper_spi_sclk_pin`);
			}
			if (preset) {
				const { driver, voltage, ...rest } = preset;
				Object.entries(rest).forEach(([key, value]) => {
					section.push(`${key}: ${value}`);
				});
			} else {
				section.push(`run_current: ${rail.current}`);
			}
			return section.join('\n') + '\n';
		},
		renderSpeedLimits() {
			const limits =
				config.performanceMode && config.printer.speedLimits.performance
					? config.printer.speedLimits.performance
					: config.printer.speedLimits.basic;
			return [
				`[printer]`,
				`max_velocity: ${config.stealthchop ? '135' : limits.velocity}`,
				`max_accel: ${limits.accel / (config.stealthchop ? 2 : 1)}`,
				`max_accel_to_decel: ${limits.accel / (config.stealthchop ? 4 : 2)}`,
				`max_z_velocity: ${limits.z_velocity}`,
				`max_z_accel: ${limits.z_accel}`,
				`square_corner_velocity: ${limits.square_corner_velocity}`,
				``,
				`[gcode_macro RatOS]`,
				`variable_macro_travel_speed: ${this.getMacroTravelSpeed()}`,
			].join('\n');
		},
		getMacroTravelSpeed() {
			const limits =
				config.performanceMode && config.printer.speedLimits.performance
					? config.printer.speedLimits.performance
					: config.printer.speedLimits.basic;
			return config.stealthchop ? '135' : limits.velocity;
		},
		renderDriverOverrides() {
			let result: string[] = [];
			if (config.toolboard != null) {
				result.push('# Use toolboard driver for extruder');
				result.push('[tmc2209 extruder]');
				result.push('uart_pin: toolboard:e_uart_pin');
			}
			if (config.controlboard.hasQuirksFiles) {
				result.push('# Include controlboard quirk file');
				if (config.toolboard != null) {
					result.push(
						`[include RatOS/boards/${config.controlboard.serialPath.replace('/dev/', '')}/quirks-toolboard.cfg]`,
					);
				} else {
					result.push(`[include RatOS/boards/${config.controlboard.serialPath.replace('/dev/', '')}/quirks.cfg]`);
				}
			}
			if (config.toolboard?.hasQuirksFiles) {
				result.push('# Include toolboard quirk file');
				result.push(`[include RatOS/boards/${config.toolboard.serialPath.replace('/dev/', '')}/quirks.cfg]`);
			}
			return result.join('\n') + '\n';
		},
		renderStepperOverrides() {
			let result: string[] = [];
			if (config.toolboard != null) {
				result.push('# Use toolboard driver for extruder');
				result.push('[extruder]');
				result.push('step_pin: toolboard:e_step_pin');
				result.push('enable_pin: !toolboard:e_enable_pin');
				result.push('dir_pin: toolboard:e_dir_pin');
			}
			return result.join('\n') + '\n';
		},
		renderHotend() {
			let result: string[] = [];
			result.push(`[include RatOS/hotends/${config.hotend.id}]`);
			result.push('[extruder]');
			result.push(`sensor_type: ${config.thermistor}`);
			if (config.toolboard != null) {
				result.push('# Use toolboard pins for heater and thermistor');
				result.push('heater_pin: toolboard:e_heater_pin');
				result.push('sensor_pin: toolboard:e_sensor_pin');
			}
			return result.join('\n');
		},
		renderExtruder() {
			let result: string[] = [];
			result.push(`[include RatOS/extruders/${config.extruder.id}]`);
			return result.join('\n');
		},
		renderInputShaper(printerSize: number) {
			let result: string[] = [];
			result.push('[resonance_tester]');
			switch (config.xAccelerometer?.id) {
				case 'controlboard':
					result.push('accel_chip_x: adxl345');
					break;
				case 'toolboard':
					if (config.toolboard != null) {
						result.push('accel_chip_x: adxl345 toolboard');
						break;
					}
				case 'sbc':
					result.push('accel_chip_x: adxl345 rpi');
					break;
				default:
					result.push('accel_chip_x: adxl345');
					break;
			}
			switch (config.yAccelerometer?.id) {
				case 'controlboard':
					result.push('accel_chip_y: adxl345');
					break;
				case 'toolboard':
					if (config.toolboard != null) {
						result.push('accel_chip_y: adxl345 toolboard');
						break;
					}
				case 'sbc':
					result.push('accel_chip_y: adxl345 rpi');
					break;
				default:
					result.push('accel_chip_y: adxl345');
					break;
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
						const reminder: string[] = [];
						reminder.push('# REMEMBER TO CALIBRATE YOUR BEACON!');
						reminder.push(
							'# Follow along from step 6 in the official beacon guide https://docs.beacon3d.com/quickstart/#6-calibrate-beacon',
						);
						extrasGenerator.addReminder(reminder.join('\n'));
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
		renderEndstopSection(pretunedSensorlessConfig?: string) {
			const result: string[] = [];
			if (config.xEndstop.id !== 'sensorless') {
				result.push(`# Physical endstop configuration for X`);
				result.push(`[stepper_x]`);
				result.push(`endstop_pin: ${this.getXEndstopPinPrefix()}x_endstop_pin`);
				result.push(`[gcode_macro RatOS]`);
				result.push(`variable_homing_x: "endstop"`);
			}
			if (config.yEndstop.id !== 'sensorless') {
				result.push(`# Physical endstop configuration Y`);
				result.push(`[stepper_y]`);
				result.push(`endstop_pin: ${this.getYEndstopPinPrefix()}y_endstop_pin`);
				result.push(`[gcode_macro RatOS]`);
				result.push(`variable_homing_y: "endstop"`);
			}

			if (config.xEndstop.id === 'sensorless' || config.yEndstop.id === 'sensorless') {
				const defaultXRail = config.printer.defaults.rails.find((r) => r.axis === PrinterAxis.x);
				const defaultYRail = config.printer.defaults.rails.find((r) => r.axis === PrinterAxis.y);
				if (
					defaultXRail &&
					defaultYRail &&
					pretunedSensorlessConfig != null &&
					matchesDefaultRail(
						utils.getRail(PrinterAxis.x),
						deserializePrinterRailDefinition(defaultXRail),
						config.performanceMode,
					) &&
					matchesDefaultRail(
						utils.getRail(PrinterAxis.y),
						deserializePrinterRailDefinition(defaultYRail),
						config.performanceMode,
					)
				) {
					result.push(`[include ${pretunedSensorlessConfig}]`);
				} else {
					result.push(extrasGenerator.generateSensorlessHomingIncludes());
				}
			}
			return result.join('\n');
		},
		renderFanOverrides() {
			const result: string[] = [];
			if (config.toolboard != null) {
				if (config.partFan.id !== '4pin-dedicated') {
					result.push('# Use toolboard fan for part cooling');
					result.push('[fan]');
					if (config.partFan.id === '4pin') {
						result.push('pin: !toolboard:fan_part_cooling_pin # 4-pin pwm controlled fan');
					} else {
						result.push('pin: toolboard:fan_part_cooling_pin');
					}
				}
				if (config.hotendFan.id !== '4pin-dedicated') {
					result.push('# Use toolboard fan for hotend cooling');
					result.push('[heater_fan toolhead_cooling_fan]');
					if (config.hotendFan.id === '4pin') {
						result.push('pin: !toolboard:fan_toolhead_cooling_pin # 4-pin pwm controlled fan');
					} else {
						result.push('pin: toolboard:fan_toolhead_cooling_pin');
					}
				}
			} else {
				if (config.partFan.id === '4pin') {
					result.push('[fan]');
					result.push('pin: !fan_part_cooling_pin # 4-pin pwm controlled fan');
				}
				if (config.hotendFan.id === '4pin') {
					result.push('[heater_fan toolhead_cooling_fan]');
					result.push('pin: !fan_toolhead_cooling_pin # 4-pin pwm controlled fan');
				}
			}
			if (config.controllerFan.id === '4pin') {
				result.push('[controller_fan controller_Fan]');
				result.push('pin: !fan_controller_bard_pin # 4-pin pwm controlled fan');
			}
			return result.join('\n');
		},
		renderReminders() {
			return extrasGenerator.getReminders().join('\n');
		},
		uncommentIf(condition: boolean | undefined | null) {
			return condition === true ? '' : '#';
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
