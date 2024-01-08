import { PrinterConfiguration } from '../../zods/printer-configuration';
import { sensorlessXTemplate, sensorlessYTemplate } from '../../templates/extras/sensorless-homing';
import { PrinterAxis, PrinterRail, matchesDefaultRail } from '../../zods/motion';
import { findPreset } from '../../data/steppers';
import { deserializePrinterRailDefinition } from '../../utils/serialization';
import {
	ControlPins,
	exportBoardPinAlias,
	getExtruderRotationDistance,
	parseBoardPinConfig,
	PinMapZodFromBoard,
} from './metadata';

import { ToolheadGenerator } from './config-generation/toolhead';
import { getBoardSerialPath } from '../../helpers/board';
import { ToolOrAxis } from '../../zods/toolhead';
import { MotorSlotKey, SPIPins, UARTPins, hasSPI, hasUART } from '../../zods/boards';
import { z } from 'zod';

type WritableFiles = { fileName: string; content: string; overwrite: boolean }[];

export const constructKlipperConfigUtils = async (config: PrinterConfiguration) => {
	const toolboardDriverCount = config.toolheads.reduce(
		(prev, current) => prev + (current.toolboard?.driverCount ?? 0),
		0,
	);
	const extruderLessConfigBonus = config.controlboard.extruderlessConfig != null ? 1 : 0;
	const isExtruderlessBoard = config.printer.driverCountRequired > config.controlboard.driverCount;
	const cbPins = await parseBoardPinConfig(config.controlboard, isExtruderlessBoard);
	const toolheads = await Promise.all(
		config.toolheads.map(async (thConfig) => {
			if (thConfig.toolboard == null) {
				if (isExtruderlessBoard) {
					throw new Error(
						'A toolboard is required when using an extruderless controlboard configuration (your controlboard alone does not have enough drivers for this printer). Please add a toolboard to your configuration.',
					);
				}
				return await ToolheadGenerator.fromConfig(thConfig, cbPins as PinMapZodFromBoard<false, false>);
			}
			return await ToolheadGenerator.fromConfig(thConfig, cbPins as PinMapZodFromBoard<false, true>);
		}),
	);

	return {
		extruderLessConfigBonus,
		isExtruderlessBoard,
		toolboardDriverCount,
		getControlboardPins: () => {
			return { ...cbPins };
		},
		requireControlboardPin(pin: keyof ControlPins<false>) {
			if (this.getControlboardPins()[pin] == null) {
				throw new Error(`The controlboard has no "${pin}" defined in its config.`);
			}
		},
		isExtruderToolheadAxis(axis: PrinterAxis) {
			return toolheads.some((th) => th.getExtruderAxis() === axis);
		},
		getToolhead: (toolOrAxis: ToolOrAxis) => {
			const th =
				typeof toolOrAxis === 'number'
					? toolheads.find((th) => th.getTool() === toolOrAxis)
					: toolheads.find((th) => th.getExtruderAxis() === toolOrAxis || th.getMotionAxis() === toolOrAxis);
			if (th == null) {
				throw new Error(`No toolhead found for tool/axis ${toolOrAxis}`);
			}
			return th;
		},
		renderCommentHeader(text: string, lines: string[]) {
			const separator = `------------------------------------------------------------------------------------------------------------`;
			const textPadding = (separator.length - text.length - 2) / 2;
			const separatorWithText = `#${'-'.repeat(Math.floor(textPadding))} ${text} ${'-'.repeat(Math.ceil(textPadding))}`;
			return [separatorWithText, ...lines, `#${separator}`];
		},
		getToolheads: () => {
			return toolheads.slice();
		},
		getRail(axis: PrinterAxis) {
			const rail = config.rails.find((r) => r.axis === axis);
			if (rail == null) {
				throw new Error(`No rail found for axis ${axis}`);
			}
			return rail;
		},
		getAxisPin(axis: PrinterAxis, alias: string) {
			const pinName = (axis === PrinterAxis.z ? 'z0' : axis) + alias;
			let pinValue = null;
			if (this.isExtruderToolheadAxis(axis)) {
				pinValue = this.getToolhead(axis as ToolOrAxis).getToolheadPin(axis, alias);
			} else {
				const rail = this.getRail(axis);
				const slotPin = alias.startsWith('_') ? alias.substring(1) : alias;
				if (
					config.controlboard.motorSlots != null &&
					rail.motorSlot != null &&
					slotPin in config.controlboard.motorSlots[rail.motorSlot]
				) {
					pinValue =
						config.controlboard.motorSlots[rail.motorSlot][
							slotPin as keyof (typeof config.controlboard.motorSlots)[z.infer<typeof MotorSlotKey>]
						];
					if (pinValue == null) {
						throw new Error(`Motor slot was selected, but pin ${slotPin} wasn't found in motor slot config.`);
					}
				} else {
					pinValue = cbPins[pinName as keyof ControlPins<false>];
				}
			}
			if (pinValue == null) {
				throw new Error(
					`Pin name "${pinName}" constructed from axis "${axis}" and alias "${alias}" not found in board pin configs.`,
				);
			}
			return pinValue;
		},
		getAxisStepperName(axis: PrinterAxis) {
			if (axis === PrinterAxis.extruder) {
				return 'extruder';
			}
			if (axis === PrinterAxis.extruder1) {
				return 'extruder1';
			}
			if (axis === PrinterAxis.dual_carriage) {
				return 'dual_carriage';
			}
			return 'stepper' + '_' + axis;
		},
		getAxisDriverType(axis: PrinterAxis) {
			return this.getRail(axis).driver.type.toLowerCase();
		},
		getAxisDriverVariables(axis: PrinterAxis, enumerate: boolean = false, additionalAxes: PrinterAxis[] = []) {
			const rails = config.rails.filter(
				(r) => (enumerate ? r.axis.startsWith(axis) : r.axis === axis) || additionalAxes.includes(r.axis),
			);
			const variables: string[] = [];
			variables.push(
				`variable_${axis}_driver_types: [${rails.map((r) => `"${r.driver.type.toLowerCase()}"`).join(', ')}]`,
			);
			variables.push(`variable_${axis}_axes: [${rails.map((r) => `"${r.axis}"`).join(', ')}]`);
			return variables.join('\n');
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
		getAxisDriverDiagConfig(axis: PrinterAxis) {
			if (this.getRail(axis).driver.protocol === 'UART') {
				return `diag_pin: ^${this.getAxisPin(axis, '_diag_pin')}`;
			}
			if (this.getRail(axis).driver.protocol === 'SPI') {
				return `diag1_pin: ^${this.getAxisPin(axis, '_diag_pin')}`;
			}
			return '';
		},
		getAxisDriverHomingCurrent(axis: PrinterAxis, factor: number) {
			const rail = this.getRail(axis);
			factor = Math.max(0, Math.min(1, factor));
			return rail.stepper.maxPeakCurrent * 0.71 * factor;
		},
		getExtruderPinPrefix(tool: ToolOrAxis = 0) {
			const th = this.getToolhead(tool);
			if (th == null) {
				throw new Error(`No toolhead found for tool ${tool}`);
			}
			return th.getPinPrefix();
		},
		formatInlineComments(lines: string[], commentChar = '#') {
			const longestLine = lines.reduce(
				(prev, current) => Math.max(prev, current.substring(0, current.indexOf(commentChar)).trim().length),
				0,
			);
			return lines.map((l) => {
				let commentIndex = l.indexOf(commentChar);
				const lastCommentIndex = l.lastIndexOf(commentChar);
				if ((commentIndex === -1 || l.trim().startsWith(commentChar)) && lastCommentIndex === commentIndex) {
					// No comment or comment is only at the start of the line, no need to format.
					return l;
				}
				if (commentIndex !== lastCommentIndex) {
					commentIndex = l.indexOf(commentChar, commentIndex + 1);
				}
				const comment = l.substring(commentIndex);
				const line = l.substring(0, commentIndex).trim();
				const padding = longestLine - line.length;
				return line + ' '.repeat(padding) + ' ' + comment;
			});
		},
	};
};
export type KlipperConfigUtils = Awaited<ReturnType<typeof constructKlipperConfigUtils>>;

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
			if (utils.getToolhead(PrinterAxis.x).getXEndstop().id === 'sensorless') {
				filesToWrite.push({
					fileName: 'sensorless-homing-x.cfg',
					content: sensorlessXTemplate(config, utils),
					overwrite: false,
				});
			}
			if (utils.getToolheads().some((th) => th.getYEndstop().id === 'sensorless')) {
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
export const constructKlipperConfigHelpers = async (
	config: PrinterConfiguration,
	extrasGenerator: KlipperConfigExtrasGenerator,
	utils: KlipperConfigUtils,
) => {
	return {
		...utils,
		renderToolboards() {
			return utils
				.getToolheads()
				.map((th) => {
					return th.renderToolboard();
				})
				.join('\n');
		},
		renderControlboard() {
			const result = [
				'', // Add a newline for readability.
				exportBoardPinAlias(config.controlboard.id, utils.getControlboardPins()),
				'', // Add a newline for readability.
				`[mcu]`,
				`serial: ${getBoardSerialPath(config.controlboard)}`,
			];
			if (config.controlboard.hasMcuTempSensor) {
				result.push(''); // Add a newline for readability.
				result.push(`[temperature_sensor ${config.controlboard.name.replace(/\s/g, '_')}]`);
				result.push(`sensor_type: temperature_mcu`);
			}
			if (config.controlboard.ADXL345SPI != null) {
				result.push(''); // Add a newline for readability.
				result.push(`[adxl345 controlboard]`);
				result.push(`cs_pin: ${config.controlboard.ADXL345SPI.cs_pin}`);
				if ('hardware' in config.controlboard.ADXL345SPI) {
					result.push(`spi_bus: ${config.controlboard.ADXL345SPI.hardware.bus}`);
				} else {
					result.push(`spi_software_mosi_pin: ${config.controlboard.ADXL345SPI.software.mosi}`);
					result.push(`spi_software_miso_pin: ${config.controlboard.ADXL345SPI.software.miso}`);
					result.push(`spi_software_sclk_pin: ${config.controlboard.ADXL345SPI.software.sclk}`);
				}
			}
			if (config.controlboard.outputPins != null) {
				config.controlboard.outputPins.forEach((pindef) => {
					result.push(''); // Add a newline for readability.
					result.push(`[output_pin ${pindef.name}]`);
					result.push(`pin: ${pindef.pin}`);
					result.push(`value: ${pindef.value}`);
				});
			}
			return result.join('\n');
		},
		renderBoards() {
			if (config.printer.driverCountRequired > config.controlboard.driverCount) {
				if (
					config.controlboard.driverCount + utils.toolboardDriverCount + utils.extruderLessConfigBonus <
					config.printer.driverCountRequired
				) {
					throw new Error('Your control and toolboard combination does not make up enough drivers for this printer.');
				}
			}
			const result: string[] = [
				'[include RatOS/boards/rpi/config.cfg]', // Always include RPi.
				this.renderControlboard(),
				this.renderToolboards(),
			];
			return result.join('\n');
		},
		renderStepperSections() {
			return config.rails
				.map((r) => {
					return this.renderStepperSection(r);
				})
				.join('\n');
		},
		getMotorComments(axis: PrinterAxis | Zod.infer<typeof PrinterRail>) {
			const rail = typeof axis === 'object' ? axis : config.rails.find((r) => r.axis === axis);
			if (rail == null) {
				throw new Error(`No rail found for axis ${axis}`);
			}
			const section = [`# ${rail.axisDescription}`];
			if (rail.motorSlot && config.controlboard.motorSlots) {
				section.push(
					`# Connected to ${config.controlboard.motorSlots[rail.motorSlot].title} on ${config.controlboard.name}`,
				);
			} else if (this.isExtruderToolheadAxis(rail.axis)) {
				const toolhead = utils.getToolhead(rail.axis as ToolOrAxis);
				if (toolhead == null) {
					throw new Error(`No toolhead found for ${rail.axis}`);
				}
				section.push(`# Connected to ${(toolhead.getToolboard() || config.controlboard).name}`);
			}
			return utils.renderCommentHeader(rail.axis.toUpperCase(), section);
		},
		renderMotorSections() {
			const sections = config.rails.map((r) => {
				return (
					this.getMotorComments(r).join('\n') +
					'\n' +
					this.renderDriverSection(r, true) +
					'\n' +
					this.renderStepperSection(r, true)
				);
			});
			sections.push(this.renderBoardQuirks());
			return sections.join('\n');
		},
		renderStepperSection(axis: PrinterAxis | Zod.infer<typeof PrinterRail>, noHeader = false) {
			const rail = typeof axis === 'object' ? axis : config.rails.find((r) => r.axis === axis);
			if (rail == null) {
				throw new Error(`No rail found for axis ${axis}`);
			}
			const section = noHeader ? [] : this.getMotorComments(rail);
			section.push(
				`[${utils.getAxisStepperName(rail.axis)}]`,
				`step_pin: ${utils.getAxisPin(rail.axis, '_step_pin')}`,
				`dir_pin: ${utils.getAxisPin(rail.axis, '_dir_pin')}`,
				`enable_pin: !${utils.getAxisPin(rail.axis, '_enable_pin')}`,
				`microsteps: ${rail.microstepping}`,
			);
			if (rail.axis === PrinterAxis.extruder || rail.axis === PrinterAxis.extruder1) {
				const toolhead = utils.getToolhead(rail.axis);
				if (toolhead == null) {
					throw new Error(`No toolhead found for ${rail.axis}`);
				}
				section.push(`rotation_distance: ${getExtruderRotationDistance(toolhead.getExtruder().id)}`);
			} else {
				section.push(`rotation_distance: ${rail.rotationDistance}`);
			}
			if ([PrinterAxis.x, PrinterAxis.y, PrinterAxis.z].includes(rail.axis)) {
				section.push(`homing_speed: ${rail.homingSpeed}`);
			}
			if (rail.gearRatio != null) {
				section.push(`gear_ratio: ${rail.gearRatio}`);
			}
			if (rail.axis === PrinterAxis.z) {
				const probeToolhead = config.toolheads.find((th) => th.probe != null);
				if (probeToolhead?.probe != null) {
					section.push(`endstop_pin: probe:z_virtual_endstop`);
				}
			}
			return section.join('\n') + '\n';
		},
		renderUserStepperSections(customization: {
			[key in PrinterAxis]?: { directionInverted: boolean; rotationComment?: string; additionalLines?: string[] };
		}) {
			return this.formatInlineComments(
				config.rails
					.map((r) => {
						const { directionInverted, rotationComment, additionalLines } = customization[r.axis] ?? {};
						return this.renderUserStepperSection(r.axis, directionInverted, rotationComment, additionalLines);
					})
					.join('\n')
					.split('\n'),
			).join('\n');
		},
		renderUserStepperSection(
			axis: PrinterAxis | Zod.infer<typeof PrinterRail>,
			directionInverted: boolean = false,
			rotationComment?: string,
			additionalLines?: string[],
		) {
			const rail = typeof axis === 'object' ? axis : config.rails.find((r) => r.axis === axis);
			if (rail == null) {
				throw new Error(`No rail found for axis ${axis}`);
			}
			const dirComment = directionInverted
				? `# Remove ! in front of pin name to reverse the direction of ${utils.getAxisStepperName(rail.axis)}`
				: `# Add ! in front of pin name to reverse the direction of ${utils.getAxisStepperName(rail.axis)}`;
			const section = this.getMotorComments(rail).concat([
				`[${utils.getAxisStepperName(rail.axis)}]`,
				`dir_pin: ${directionInverted ? '!' : ''}${utils.getAxisPin(rail.axis, '_dir_pin')} ${dirComment}`,
			]);
			if (rail.axis === PrinterAxis.extruder || rail.axis === PrinterAxis.extruder1) {
				const toolhead = utils.getToolhead(rail.axis);
				if (toolhead == null) {
					throw new Error(`No toolhead found for ${rail.axis}`);
				}
				section.push(
					`rotation_distance: ${getExtruderRotationDistance(toolhead.getExtruder().id)} # ${
						toolhead.getExtruder().title
					} default`,
				);
			} else {
				section.push(`rotation_distance: ${rail.rotationDistance} ${rotationComment ? `# ${rotationComment}` : ''}`);
			}
			if ([PrinterAxis.x, PrinterAxis.y, PrinterAxis.z].includes(rail.axis)) {
				section.push(`homing_speed: ${rail.homingSpeed}`);
			}
			if (additionalLines != null) {
				section.push(...additionalLines);
			}
			return section.join('\n') + '\n';
		},
		renderDriverSections() {
			const sections = config.rails.map((r) => {
				return this.renderDriverSection(r);
			});
			sections.push(this.renderBoardQuirks());
			return sections.join('\n');
		},
		renderDriverSection(axis: PrinterAxis | Zod.infer<typeof PrinterRail>, noHeader = false) {
			const rail = typeof axis === 'object' ? axis : config.rails.find((r) => r.axis === axis);
			if (rail == null) {
				throw new Error(`No rail found for axis ${axis}`);
			}
			const preset = findPreset(rail.stepper, rail.driver, rail.voltage, rail.current);
			const section = noHeader ? [] : this.getMotorComments(rail);
			section.push(
				`[${utils.getAxisDriverSectionName(rail.axis)}]`,
				`stealthchop_threshold: ${config.stealthchop ? '9999999' : config.standstillStealth ? '1' : '0'}`,
				`interpolate: ${rail.microstepping < 64 || config.stealthchop ? 'True' : 'False'}`,
			);
			if (rail.driver.protocol === 'UART') {
				// Render optional motor slot pins
				if (rail.motorSlot) {
					const slotPins = config.controlboard.motorSlots?.[rail.motorSlot];
					if (slotPins == null || !hasUART(config.controlboard.motorSlots?.[rail.motorSlot])) {
						throw new Error(`No controlboard motor slot UART pins defined for motor slot ${rail.motorSlot}`);
					}
					Object.entries(UARTPins.parse(slotPins)).forEach(([key, pin]) => {
						section.push(`${key}: ${pin}`);
					});
				} else {
					section.push(`uart_pin: ${utils.getAxisPin(rail.axis, '_uart_pin')}`);
				}
			}
			if (rail.driver.protocol === 'SPI') {
				if (rail.motorSlot) {
					const slotPins = config.controlboard.motorSlots?.[rail.motorSlot];
					if (slotPins == null || !hasSPI(config.controlboard.motorSlots?.[rail.motorSlot])) {
						throw new Error(`No controlboard motor slot SPI pins defined for motor slot ${rail.motorSlot}`);
					}
					Object.entries(SPIPins.parse(slotPins)).forEach(([key, pin]) => {
						section.push(`${key}: ${pin}`);
					});
				} else {
					section.push(`cs_pin: ${utils.getAxisPin(rail.axis, '_uart_pin')}`);
					if (config.controlboard.stepperSPI != null) {
						if ('hardware' in config.controlboard.stepperSPI) {
							section.push(`spi_bus: ${config.controlboard.stepperSPI.hardware.bus}`);
						} else {
							section.push(`spi_software_mosi_pin: ${config.controlboard.stepperSPI.software.mosi}`);
							section.push(`spi_software_miso_pin: ${config.controlboard.stepperSPI.software.miso}`);
							section.push(`spi_software_sclk_pin: ${config.controlboard.stepperSPI.software.sclk}`);
						}
					} else {
						section.push(`spi_software_mosi_pin: stepper_spi_mosi_pin`);
						section.push(`spi_software_miso_pin: stepper_spi_miso_pin`);
						section.push(`spi_software_sclk_pin: stepper_spi_sclk_pin`);
					}
				}
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
		getMacroTravelAccel() {
			const limits =
				config.performanceMode && config.printer.speedLimits.performance
					? config.printer.speedLimits.performance
					: config.printer.speedLimits.basic;
			return config.stealthchop ? '1000' : limits.accel;
		},
		renderBoardQuirks() {
			let result: string[] = [];
			if (config.controlboard.hasQuirksFiles) {
				result.push('# Include controlboard quirk file');
				if (utils.getToolhead(PrinterAxis.extruder) != null) {
					result.push(`[include RatOS/boards/${config.controlboard.id}/quirks-toolboard.cfg]`);
				} else {
					result.push(`[include RatOS/boards/${config.controlboard.id}/quirks.cfg]`);
				}
			}
			utils.getToolheads().forEach((th) => {
				const toolboard = th.getToolboard();
				if (toolboard?.hasQuirksFiles) {
					result.push('# Include toolboard quirk file');
					result.push(`[include RatOS/boards/${toolboard.id}/quirks.cfg]`);
				}
			});
			return result.join('\n');
		},
		renderHotend() {
			let result: string[] = this.getToolheads().map((th) => {
				return th.renderHotend();
			});
			return result.join('\n');
		},
		renderExtruder() {
			let result: string[] = this.getToolheads().map((th) => {
				return th.renderExtruder();
			});
			return result.join('\n');
		},
		renderInputShaper(printerSize: number) {
			// Only renders x toolhead input shaper for now, IDEX uses macro magic for handling both toolheads.
			let result: string[] = [];
			result.push('[resonance_tester]');
			const xToolhead = this.getToolhead(PrinterAxis.x);
			result.push(`accel_chip_x: adxl345 ${xToolhead.getXAccelerometerName()}`);
			result.push(`accel_chip_y: adxl345 ${xToolhead.getYAccelerometerName()}`);
			result.push('probe_points:');
			result.push(`\t${printerSize / 2},${printerSize / 2},20`);
			return result.join('\n');
		},
		renderProbeIncludes() {
			const result: string[] = [];
			const th = this.getToolheads().find((th) => th.getProbe() != null);
			if (th) {
				result.push(`[include RatOS/z-probe/${th.getProbe()?.id + '.cfg'}]`);
				if (th.hasToolboard() && th.getProbe()?.id === 'bltouch') {
					result.push('[include RatOS/toolboard/bltouch.cfg]');
				}
			}
			return result.join('\n');
		},
		renderProbePinSection() {
			const result: string[] = [];
			const th = this.getToolheads().find((th) => th.getProbe() != null);
			if (th) {
				switch (th.getProbe()?.id) {
					case 'bltouch':
						result.push(`# BLTouch configuration`);
						result.push(`[bltouch]`);
						result.push(`z_offset: 0`);
						break;
					case 'beacon':
						// print reminder about beacon calibration
						const reminder: string[] = [];
						reminder.push('# REMEMBER TO CALIBRATE YOUR BEACON!');
						reminder.push(
							'# Follow along from step 6 in the official beacon guide https://docs.beacon3d.com/quickstart/#6-calibrate-beacon',
						);
						extrasGenerator.addReminder(reminder.join('\n'));
						break;
					default:
						const pinPrefix = th.getPinPrefix();
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
			const toolheads = this.getToolheads();
			let yPin: 'sensorless' | string = 'sensorless';
			toolheads.forEach((th) => {
				if (th.getXEndstop().id !== 'sensorless') {
					result.push(''); // Add a newline for readability.
					result.push(`# Physical X endstop configuration`);
					result.push(`[${th.getMotionStepperName()}]`);
					result.push(`endstop_pin: ${th.getXEndstopPin()}`);
					result.push(`[gcode_macro RatOS]`);
					result.push(`variable_homing_x: "endstop"`);
				}
				if (th.getYEndstop().id !== 'sensorless') {
					if (yPin == 'sensorless') {
						yPin = th.getYEndstopPin();
					} else if (yPin !== th.getYEndstopPin()) {
						throw new Error(`Multiple toolheads configured with different y endstops is currently not supported.`);
					}
				}
			});
			if (yPin !== 'sensorless') {
				result.push(''); // Add a newline for readability.
				result.push(`# Physical Y endstop configuration`);
				result.push(`[stepper_y]`);
				result.push(`endstop_pin: ${yPin}`);
				result.push(`[gcode_macro RatOS]`);
				result.push(`variable_homing_y: "endstop"`);
			}

			if (toolheads.some((th) => th.getXEndstop().id === 'sensorless' || th.getYEndstop().id === 'sensorless')) {
				const defaultXRail = config.printer.defaults.rails.find((r) => r.axis === PrinterAxis.x);
				const defaultDCRail = config.printer.defaults.rails.find((r) => r.axis === PrinterAxis.dual_carriage);
				const defaultYRail = config.printer.defaults.rails.find((r) => r.axis === PrinterAxis.y);
				result.push(''); // Add a newline for readability.
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
					) &&
					(defaultDCRail == null ||
						matchesDefaultRail(
							utils.getRail(PrinterAxis.dual_carriage),
							deserializePrinterRailDefinition(defaultDCRail),
							config.performanceMode,
						))
				) {
					result.push(`[include ${pretunedSensorlessConfig}]`);
				} else {
					result.push(extrasGenerator.generateSensorlessHomingIncludes());
				}
			}
			if (this.getToolheads().every((th) => th.getProbe() == null)) {
				result.push(''); // Add a newline for readability.
				result.push(`# Physical Z endstop configuration`);
				result.push(`[stepper_z]`);
				result.push(`pin: z_endstop_pin`);
				result.push(`position_endstop: -0.1`);
				result.push(`second_homing_speed: 3.0`);
				result.push(`homing_retract_dist: 3.0`);
			}
			return result.join('\n');
		},
		renderMacroVariableOverrides(size?: number) {
			const result: string[] = [`variable_macro_travel_speed: ${this.getMacroTravelSpeed()}`];
			const toolheads = this.getToolheads();
			const isIdex = toolheads.some((th) => th.getMotionAxis() === PrinterAxis.dual_carriage);
			if (isIdex) {
				const probeTool = toolheads.find((th) => th.getProbe() != null)?.getTool();
				result.push(
					`variable_default_toolhead: ${probeTool}                             # the toolhead with the z-probe, 0=left 1=right toolhead`,
				);
				const dcParkX = (size ?? config.size ?? 300) + 72;
				result.push(
					`variable_parking_position: [-69.5, ${dcParkX}]                      # toolhead x parking position`,
				);
				result.push(`variable_toolchange_travel_speed: ${this.getMacroTravelSpeed()}     # parking travel speed`);
				result.push(`variable_toolchange_travel_accel: ${this.getMacroTravelAccel()}     # parking travel accel`);
				const firstADXL = this.getToolhead(0).getXAccelerometerName();
				const secondADXL = this.getToolhead(1).getXAccelerometerName();
				result.push(`variable_adxl_chip: [${firstADXL}, ${secondADXL}]           # toolheads adxl chip names`);
			}
			return this.formatInlineComments(result).join('\n');
		},
		renderControllerFan() {
			let result: string[] = [];
			result.push(`[controller_fan controller_fan]`);
			switch (config.controllerFan.id) {
				case '2pin':
					this.requireControlboardPin('fan_controller_board_pin');
					result.push(`# 2-pin fan connected to the controller board`);
					result.push(`pin: ${this.getControlboardPins().fan_controller_board_pin}`);
					break;
				case '4pin':
					this.requireControlboardPin('fan_controller_board_pin');
					result.push(`# 4-pin fan connected to the controller board`);
					result.push(`pin: !${this.getControlboardPins().fan_controller_board_pin}`);
					result.push(`cycle_time:  0.00004`);
					break;
				case '4pin-dedicated':
					this.requireControlboardPin('4p_fan_part_cooling_tach_pin');
					result.push(`# 4-pin fan connected to a dedicated 4-pin fan header on the controller board`);
					result.push(`pin: !${this.getControlboardPins()['4p_fan_part_cooling_tach_pin']}`);
					result.push(`cycle_time:  0.00004`);
					if (this.getControlboardPins()['4p_fan_part_cooling_tach_pin'] != null) {
						result.push(`tachometer_pin: ^${this.getControlboardPins()['4p_fan_part_cooling_tach_pin']}`);
						result.push(`tachometer_poll_interval: 0.0005`);
					}
					break;
				default:
					throw new Error(`Unsupported controller fan option "${config.controllerFan.title}"`);
			}
			return result.join('\n');
		},
		renderFans() {
			const result: string[] = [];
			const multipleToolheadPartFans = this.getToolheads().filter((th) => th.getPartFan()).length > 1;
			// Part fan
			result.push(`# Part cooling fan`);
			if (multipleToolheadPartFans) {
				result.push('# Multiple toolheads with part cooling fans configured');
				result.push('# [fan] will use an unused io pin, proxy m106 settings to active toolhead via macro.');
				result.push(`[fan]`);
				result.push(
					`pin: rpi:gpio4         # sacrifical part fan, use this to independently control your both toolhead part fans`,
				);
			}
			result.push(
				this.getToolheads()
					.map((th) => th.renderPartFan(multipleToolheadPartFans))
					.join('\n'),
			);
			// Hotend fan
			result.push(``);
			result.push(`# Hotend cooling fan`);
			result.push(
				this.getToolheads()
					.map((th) => th.renderHotendFan())
					.join('\n'),
			);
			// Controller fan
			result.push(``);
			result.push(`# Controller cooling fan`);
			result.push(this.renderControllerFan());
			return result.join('\n');
		},
		renderBase() {
			return [`[include RatOS/homing.cfg]`, `[include RatOS/macros.cfg]`, `[include RatOS/shell-macros.cfg]`].join(
				'\n',
			);
		},
		renderReminders() {
			return extrasGenerator.getReminders().join('\n');
		},
		uncommentIf(condition: boolean | undefined | null) {
			return condition === true ? '' : '#';
		},
	};
};

export type KlipperConfigHelper = Awaited<ReturnType<typeof constructKlipperConfigHelpers>>;
