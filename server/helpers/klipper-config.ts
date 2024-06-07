import { PrinterConfiguration } from '@/zods/printer-configuration';
import { sensorlessXTemplate, sensorlessYTemplate } from '@/templates/extras/sensorless-homing';
import { Limits, PrinterAxis, PrinterRail, matchesDefaultRail } from '@/zods/motion';
import { findPreset } from '@/data/steppers';
import { deserializePrinterRailDefinition } from '@/utils/serialization';
import {
	ControlPins,
	getExtruderRotationDistance,
	parseBoardPinConfig,
	PinMapZodFromBoard,
	ToolboardPins,
} from '@/server/helpers/metadata';
import { PrinterSizeDefinition } from '@/zods/printer';
import { ToolheadGenerator } from '@/server/helpers/config-generation/toolhead';
import { getBoardSerialPath } from '@/helpers/board';
import { ToolOrAxis } from '@/zods/toolhead';
import {
	type Board,
	MotorSlotKey,
	SPIPins,
	UARTPins,
	hasSPI,
	hasUART,
	pinPrefixToAxis,
	MotorSlotPins,
	axisToPinPrefix,
	AllPins,
} from '@/zods/boards';
import { z } from 'zod';
import path from 'path';
import { serverSchema } from '@/env/schema.mjs';
import { AccelerometerType, KlipperAccelSensorName, klipperAccelSensorSchema } from '@/zods/hardware';

type WritableFiles = { fileName: string; content: string; overwrite: boolean; order?: number }[];
type ExcludeStepperParameters<T extends string> = (T extends
	| `position_${string}`
	| `homing_speed${string}`
	| `safe_distance${string}`
	| `dir_pin${string}`
	| `step_pin${string}`
	| `enable_pin${string}`
	| `rotation_distance${string}`
	? 'controlled parameters are not allowed'
	: T)[];

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
				return await ToolheadGenerator.fromConfig(
					thConfig,
					cbPins as PinMapZodFromBoard<false, false>,
					config.printer,
					config.size,
				);
			}
			return await ToolheadGenerator.fromConfig(
				thConfig,
				cbPins as PinMapZodFromBoard<false, true>,
				config.printer,
				config.size,
			);
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
		isExtruderToolheadAxis(axis: PrinterAxis | ToolOrAxis): axis is ToolOrAxis {
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
		renderCommentHeader(text: string, lines: string[] = []) {
			const separator = `------------------------------------------------------------------------------------------------------------`;
			const textPadding = (separator.length - text.length - 2) / 2;
			const separatorWithText = `#${'-'.repeat(Math.floor(textPadding))} ${text} ${'-'.repeat(Math.ceil(textPadding))}`;
			return [separatorWithText, ...(lines.length ? lines.concat(`#${separator}`) : [])];
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
		getRailPinValue(
			axis: PrinterAxis,
			alias: string,
			enabledMaps: ('controlboard' | 'toolboard')[] = ['controlboard', 'toolboard'],
			includePrefix: boolean = true,
		) {
			const pinName =
				this.printerAxisToPinAliasPrefix(axis) + '_' + (alias.startsWith('_') ? alias.substring(1) : alias);
			let pinValue = null;
			const rail = this.getRail(axis);
			const th = this.isExtruderToolheadAxis(axis) ? this.getToolhead(axis) : null;
			if (this.isExtruderToolheadAxis(axis) && enabledMaps.includes('toolboard') && th?.hasToolboard()) {
				pinValue = includePrefix
					? th.getToolheadPin(axis, alias)
					: th.getPinFromToolboardAlias(pinName as keyof ToolboardPins<true>);
			} else if (enabledMaps.includes('controlboard')) {
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
		isSensorless(axis: PrinterAxis) {
			return (
				toolheads.find((th) => th.getMotionAxis() === axis)?.getXEndstop().id === 'sensorless' ||
				(axis === PrinterAxis.y && toolheads.some((th) => th.getYEndstop().id === 'sensorless'))
			);
		},
		getAxisHomingSpeed(axis: PrinterAxis) {
			const rail = this.getRail(axis);
			const speed = this.isSensorless(axis) ? 50 : rail.homingSpeed;
			return speed;
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
				return `driver_SGT: ${Math.round(factor * 127) - 64} # Lower value = higher sensitity, range -64 to 63`;
			} else {
				return `driver_SGTHRS: ${Math.round(factor * 255)} # Lower value = lower sensitivity, range 0 to 255`;
			}
		},
		getAxisDriverDiagConfig(axis: PrinterAxis) {
			if (this.getRail(axis).driver.protocol === 'UART') {
				return `diag_pin: ^${this.printerAxisToPinAliasPrefix(axis)}_diag_pin`;
			}
			if (this.getRail(axis).driver.protocol === 'SPI') {
				return `diag1_pin: ^!${this.printerAxisToPinAliasPrefix(axis)}_diag_pin`;
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
			const longestLine = lines.reduce((prev, current) => {
				return Math.max(prev, current.substring(0, current.indexOf(commentChar)).trim().length);
			}, 0);
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
				const padding = longestLine - line.length + 2;
				return line + ' '.repeat(padding) + ' ' + comment;
			});
		},
		isPrinterAxis(axis: string | null): axis is PrinterAxis {
			return Object.values(PrinterAxis).includes(axis as PrinterAxis);
		},
		pinAliasPrefixToPrinterAxis(prefix: string) {
			const axis = pinPrefixToAxis.safeParse(prefix);
			if (axis.success) {
				return axis.data;
			}
			return null;
		},
		printerAxisToPinAliasPrefix(axis: PrinterAxis) {
			const prefix = axisToPinPrefix.safeParse(axis);
			if (prefix.success) {
				if (prefix.data === 'e1') {
					if (this.getToolhead(1).hasToolboard()) {
						return 'e';
					}
					throw new Error(`No toolboard found for T1, e1 prefix is not supported`);
				}
				return prefix.data;
			}
			return null;
		},
		getMotorComments(axis: PrinterAxis | Zod.infer<typeof PrinterRail>, header?: string) {
			const rail = typeof axis === 'object' ? axis : config.rails.find((r) => r.axis === axis);
			if (rail == null) {
				throw new Error(`No rail found for axis ${axis}`);
			}
			const section = [`# ${rail.axisDescription}`];
			const toolhead = this.isExtruderToolheadAxis(rail.axis) ? this.getToolhead(rail.axis) : null;
			if (toolhead?.hasToolboard()) {
				section.push(`# Connected to ${(toolhead.getToolboard() || config.controlboard).name}`);
			} else if (rail.motorSlot && config.controlboard.motorSlots) {
				section.push(
					`# Connected to ${config.controlboard.motorSlots[rail.motorSlot].title} on ${config.controlboard.name}`,
				);
			}
			return this.renderCommentHeader(header ?? rail.axis.toUpperCase(), section);
		},
		getMotorPinComments(axis: PrinterAxis | Zod.infer<typeof PrinterRail>, board: Board, header?: string) {
			const rail = typeof axis === 'object' ? axis : config.rails.find((r) => r.axis === axis);
			if (rail == null) {
				throw new Error(`No rail found for axis ${axis}`);
			}
			const section = [];
			if (rail.motorSlot && board.motorSlots) {
				section.push(`# Assigned to slot: "${board.motorSlots[rail.motorSlot].title}"`);
			}
			return this.renderCommentHeader(header ?? rail.axis.toUpperCase(), section);
		},
		getAccelWithType(accelerometerName: KlipperAccelSensorName) {
			let accelType: z.infer<typeof AccelerometerType> = 'adxl345';

			if (accelerometerName === 'controlboard') {
				if (config.controlboard?.ADXL345SPI != null) {
					accelType = 'adxl345';
				}
				if (config.controlboard?.LIS2DW != null) {
					accelType = 'lis2dw';
				}
			}
			if (accelerometerName === 'toolboard_t0' || accelerometerName === 'toolboard_t1') {
				const toolboard = toolheads.find((t) => t.getToolboardName() === accelerometerName)?.getToolboard();
				if (toolboard == null) {
					throw new Error(`No toolboard found for T0`);
				}
				if (toolboard.ADXL345SPI != null) {
					accelType = 'adxl345';
				}
				if (toolboard.LIS2DW != null) {
					accelType = 'lis2dw';
				}
			}
			if (accelerometerName === 'beacon') {
				accelType = 'beacon';
			}
			return klipperAccelSensorSchema.parse({
				name: accelerometerName,
				type: accelType,
			});
		},
	};
};
export type KlipperConfigUtils = Awaited<ReturnType<typeof constructKlipperConfigUtils>>;

type VAOCControlPoints = {
	xcontrolpoint?: number;
	ycontrolpoint?: number;
	zcontrolpoint?: number;
	zoffsetcontrolpoint?: number;
};

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
		generateSaveVariables(options?: VAOCControlPoints) {
			const environment = serverSchema.parse(process.env);
			const vars: string[] = [`[Variables]`];
			// const isIdex = utils.getToolheads().some((th) => th.getMotionAxis() === PrinterAxis.dual_carriage);
			vars.push(
				`idex_applied_offset = 1`,
				`idex_xcontrolpoint = ${options?.xcontrolpoint ?? config.size.x / 2}`,
				`idex_xoffset = 0.0`,
				`idex_ycontrolpoint = ${options?.ycontrolpoint ?? 50}`,
				`idex_yoffset = 0.0`,
				`idex_zcontrolpoint = ${options?.zcontrolpoint ?? 50}`,
				`idex_zoffset = 0.0`,
				`idex_zoffsetcontrolpoint = ${options?.zoffsetcontrolpoint ?? 25}`,
				`nozzle_expansion_applied_offset = 0`,
				`nozzle_expansion_coefficient_t0 = 0.06`,
				`nozzle_expansion_coefficient_t1 = 0.06`,
			);
			return [
				{
					fileName: 'ratos-variables.cfg',
					content: vars.join('\n'),
					overwrite: false,
				},
			].map((f) => {
				this.addFileToRender(f);
				return [`[save_variables]`, `filename: ${path.join(environment.KLIPPER_CONFIG_PATH, f.fileName)}`].join('\n');
			});
		},
		generateSensorlessHomingIncludes() {
			const filesToWrite: WritableFiles = [];
			if (utils.isSensorless(PrinterAxis.x)) {
				filesToWrite.push({
					fileName: 'sensorless-homing-x.cfg',
					content: sensorlessXTemplate(config, utils),
					overwrite: false,
				});
			}
			if (utils.isSensorless(PrinterAxis.y)) {
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
		renderToolboards() {
			return utils
				.getToolheads()
				.map((th) => {
					return th.renderToolboard(this.renderBoardPinAlias);
				})
				.join('\n');
		},
		renderControlboard() {
			const result = [
				'', // Add a newline for readability.
				this.renderBoardPinAlias(config.controlboard.id, config.controlboard),
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
			if (config.controlboard.LIS2DW != null) {
				result.push(''); // Add a newline for readability.
				result.push(`[lis2dw controlboard]`);
				result.push(`cs_pin: ${config.controlboard.LIS2DW.cs_pin}`);
				if ('hardware' in config.controlboard.LIS2DW) {
					result.push(`spi_bus: ${config.controlboard.LIS2DW.hardware.bus}`);
				} else {
					result.push(`spi_software_mosi_pin: ${config.controlboard.LIS2DW.software.mosi}`);
					result.push(`spi_software_miso_pin: ${config.controlboard.LIS2DW.software.miso}`);
					result.push(`spi_software_sclk_pin: ${config.controlboard.LIS2DW.software.sclk}`);
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
		renderMotorSections() {
			const sections = config.rails.map((r) => {
				return (
					utils.getMotorComments(r).join('\n') +
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
			const section = noHeader ? [] : utils.getMotorComments(rail);
			section.push(
				`[${utils.getAxisStepperName(rail.axis)}]`,
				`step_pin: ${utils.getRailPinValue(rail.axis, '_step_pin')}`,
				`dir_pin: ${utils.getRailPinValue(rail.axis, '_dir_pin')}`,
				`enable_pin: !${utils.getRailPinValue(rail.axis, '_enable_pin')}`,
				`microsteps: ${rail.microstepping}`,
				`full_steps_per_rotation: ${rail.stepper.fullStepsPerRotation}`,
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
			if (rail.axis === PrinterAxis.z) {
				// Lower position_min to allow for probe calibration (and componensation functions).
				// Very much dislike that this is necessary.
				section.push(`position_min: -5`);
			}
			if ([PrinterAxis.x, PrinterAxis.y, PrinterAxis.z, PrinterAxis.dual_carriage].includes(rail.axis)) {
				section.push(`homing_speed: ${utils.getAxisHomingSpeed(rail.axis)}`);
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
		renderUserStepperSections<UserLine extends string>(customization: {
			[key in PrinterAxis]?: {
				directionInverted: boolean;
				rotationComment?: string;
				additionalLines?: ExcludeStepperParameters<UserLine>;
			} & (key extends PrinterAxis.x | PrinterAxis.y | PrinterAxis.dual_carriage
				? { limits: (bedMargin: { min: number; max: number }) => Limits }
				: {}) &
				(key extends PrinterAxis.z ? { limits: ExplicitObject<Omit<Limits, 'endstop'>> } : {}) &
				(key extends PrinterAxis.dual_carriage ? { safeDistance: number } : {});
		}) {
			return utils
				.formatInlineComments(
					config.rails
						.map((r) => {
							const custom = customization[r.axis];
							const { directionInverted, rotationComment, additionalLines } = custom ?? {};
							const limits = custom != null && 'limits' in custom ? custom.limits : null;
							const safeDistance = custom != null && 'safeDistance' in custom ? custom.safeDistance : undefined;
							return this.renderUserStepperSection(
								r.axis,
								directionInverted,
								limits,
								safeDistance,
								rotationComment,
								additionalLines,
							);
						})
						.join('\n')
						.split('\n'),
				)
				.join('\n');
		},
		renderUserStepperSection<T extends PrinterAxis | Zod.infer<typeof PrinterRail>, UserLine extends string>(
			axis: T,
			directionInverted: boolean = false,
			limits: T extends PrinterAxis.x | PrinterAxis.y | PrinterAxis.dual_carriage
				? (bedMargin: { min: number; max: number }) => Limits
				: T extends PrinterAxis.z
					? ExplicitObject<Omit<Limits, 'endstop'>>
					: null,
			safeDistance?: number,
			rotationComment?: string,
			additionalLines?: ExcludeStepperParameters<UserLine>,
		) {
			const rail = typeof axis === 'object' ? axis : config.rails.find((r) => r.axis === axis);
			if (rail == null) {
				throw new Error(`No rail found for axis ${axis}`);
			}
			const dirComment = directionInverted
				? `# Remove ! in front of pin name to reverse the direction of ${utils.getAxisStepperName(rail.axis)}`
				: `# Add ! in front of pin name to reverse the direction of ${utils.getAxisStepperName(rail.axis)}`;

			let extruderPinPrefix = '';
			if (rail.axis === PrinterAxis.extruder || rail.axis === PrinterAxis.extruder1) {
				extruderPinPrefix = utils.getExtruderPinPrefix(rail.axis);
			}
			const section = utils
				.getMotorComments(rail)
				.concat([
					`[${utils.getAxisStepperName(rail.axis)}]`,
					`dir_pin: ${directionInverted ? '!' : ''}${extruderPinPrefix}${utils.printerAxisToPinAliasPrefix(rail.axis)}_dir_pin ${dirComment}`,
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
				section.push(`homing_speed: ${utils.getAxisHomingSpeed(rail.axis)}`);
			}
			if (limits) {
				const marginMin = rail.axis !== PrinterAxis.y ? config.printer.bedMargin.x[0] : config.printer.bedMargin.y[0];
				const marginMax = rail.axis !== PrinterAxis.y ? config.printer.bedMargin.x[1] : config.printer.bedMargin.y[1];
				Object.entries(typeof limits == 'function' ? limits({ min: marginMin, max: marginMax }) : limits).forEach(
					([key, value]) => {
						section.push(
							`position_${key}: ${rail.axis === PrinterAxis.z && key === 'min' ? Math.min(value, -5) : value}`,
						);
					},
				);
			}
			if (safeDistance) {
				section.push(`safe_distance: ${safeDistance}`);
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
			const section = noHeader ? [] : utils.getMotorComments(rail);
			section.push(
				`[${utils.getAxisDriverSectionName(rail.axis)}]`,
				`stealthchop_threshold: ${config.stealthchop ? '9999999' : config.standstillStealth ? '1' : '0'}`,
				`interpolate: ${rail.microstepping < 64 || config.stealthchop ? 'True' : 'False'}`,
			);
			if (rail.driver.protocol === 'UART') {
				// Render optional motor slot pins
				if (
					rail.motorSlot &&
					!(utils.isExtruderToolheadAxis(rail.axis) && utils.getToolhead(rail.axis).hasToolboard())
				) {
					const slotPins = config.controlboard.motorSlots?.[rail.motorSlot];
					if (slotPins == null || !hasUART(config.controlboard.motorSlots?.[rail.motorSlot])) {
						throw new Error(`No controlboard motor slot UART pins defined for motor slot ${rail.motorSlot}`);
					}
					Object.entries(UARTPins.parse(slotPins)).forEach(([key, pin]) => {
						section.push(`${key}: ${pin}`);
					});
				} else {
					section.push(`uart_pin: ${utils.getRailPinValue(rail.axis, '_uart_pin')}`);
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
					section.push(`cs_pin: ${utils.getRailPinValue(rail.axis, '_uart_pin')}`);
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
				`minimum_cruise_ratio: ${config.stealthchop ? 0.25 : 0.5}`,
				`max_z_velocity: ${limits.z_velocity}`,
				`max_z_accel: ${limits.z_accel}`,
				`square_corner_velocity: ${limits.square_corner_velocity}`,
				``,
				`[gcode_macro RatOS]`,
				`variable_macro_travel_speed: ${this.getMacroTravelSpeed()}`,
				`variable_macro_travel_accel: ${this.getMacroTravelAccel()}`,
			].join('\n');
		},
		getMacroTravelSpeed() {
			const limits =
				config.performanceMode && config.printer.speedLimits.performance
					? config.printer.speedLimits.performance
					: config.printer.speedLimits.basic;
			return config.stealthchop ? '135' : limits.travel_velocity;
		},
		getMacroTravelAccel() {
			const limits =
				config.performanceMode && config.printer.speedLimits.performance
					? config.printer.speedLimits.performance
					: config.printer.speedLimits.basic;
			return config.stealthchop ? '1000' : limits.travel_accel;
		},
		renderBoardQuirks() {
			let result: string[] = [];
			if (config.controlboard.hasQuirksFiles) {
				result.push('# Include controlboard quirk file');
				if (utils.getToolhead(PrinterAxis.extruder)?.getToolboard() != null) {
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
			let result: string[] = utils.getToolheads().map((th) => {
				return th.renderHotend();
			});
			return result.join('\n');
		},
		renderExtruder() {
			let result: string[] = utils.getToolheads().map((th) => {
				return th.renderExtruder();
			});
			return result.join('\n');
		},
		renderInputShaper(printerSize: z.output<typeof PrinterSizeDefinition>) {
			// Only renders x toolhead input shaper for now, IDEX uses macro magic for handling both toolheads.
			let result: string[] = [];
			const xToolhead = utils.getToolhead(PrinterAxis.x);
			if ([xToolhead.getYAccelerometerName(), xToolhead.getXAccelerometerName()].includes('rpi')) {
				// Include rpi adxl345 definition.
				result.push(`[include RatOS/sensors/rpi-adxl345.cfg]`);
				result.push(''); // Add a newline for readability.
			}
			const xAccel = utils.getAccelWithType(xToolhead.getXAccelerometerName());
			const yAccel = utils.getAccelWithType(xToolhead.getYAccelerometerName());
			result.push('[resonance_tester]');
			if (xAccel.type === 'beacon') {
				result.push(`accel_chip_x: ${xAccel.type}`);
			} else {
				result.push(`accel_chip_x: ${xAccel.type} ${xAccel.name}`);
			}
			if (yAccel.type === 'beacon') {
				result.push(`accel_chip_y: ${yAccel.type}`);
			} else {
				result.push(`accel_chip_y: ${yAccel.type} ${yAccel.name}`);
			}
			result.push('probe_points:');
			result.push(`\t${printerSize.x / 2},${printerSize.y / 2},20`);
			return result.join('\n');
		},
		renderProbeIncludes() {
			const result: string[] = [];
			const th = utils.getToolheads().find((th) => th.getProbe() != null);
			if (th) {
				result.push(`[include RatOS/z-probe/${th.getProbe()?.id + '.cfg'}]`);
			}
			result.push(this.renderProbePinSection(true));
			return result.join('\n');
		},
		renderProbePinSection(onlyPins = false) {
			const result: string[] = [];
			const th = utils.getToolheads().find((th) => th.getProbe() != null);
			if (th) {
				switch (th.getProbe()?.id) {
					case 'bltouch':
						const controlPin =
							th.getPinPrefix() + (onlyPins ? th.getPinFromAlias('bltouch_control_pin') : 'bltouch_control_pin');
						const sensorPin =
							th.getPinPrefix() + (onlyPins ? th.getPinFromAlias('bltouch_sensor_pin') : 'bltouch_sensor_pin');
						result.push(`# BLTouch configuration`);
						result.push(`[bltouch]`);
						result.push('control_pin: ' + controlPin);
						result.push('sensor_pin: ^' + sensorPin);
						if (!onlyPins) {
							result.push(`z_offset: 0`);
						}
						break;
					case 'beacon':
						// print reminder about beacon calibration
						if (!onlyPins) {
							const reminder: string[] = [];
							reminder.push('# REMEMBER TO CALIBRATE YOUR BEACON!');
							reminder.push(
								'# Follow along from step 6 in the official beacon guide https://docs.beacon3d.com/quickstart/#6-calibrate-beacon',
							);
							extrasGenerator.addReminder(reminder.join('\n'));
						}
						break;
					default:
						const pin = th.getPinPrefix() + (onlyPins ? th.getPinFromAlias('probe_pin') : 'probe_pin');
						result.push('# Probe configuration');
						result.push('[probe]');
						if (!onlyPins) {
							result.push('z_offset: 0.0 # Will be commented out after a successful PROBE_CALIBRATE and SAVE_CONFIG');
						}
						result.push(`pin: ^${pin}# For NPN NC probes such as the Super Pinda / Vinda / SupCR / Decoprobe probes.`);
						if (!onlyPins) {
							result.push(`#pin: ^!${pin} # NPN NO (refer to the specs of your probe)`);
							result.push(`#pin: ${pin} # PNP NO (refer to the specs of your probe)`);
							result.push(`#pin: !${pin} # PNP NC (refer to the specs of your probe)`);
						}
						break;
				}
			}
			return result.join('\n');
		},
		renderZOffsetGuidance(additionalLinePrefix: string = '') {
			const result: string[] = [];
			if (config.toolheads.some((th) => th.probe?.id === 'beacon')) {
				result.push(`Z-offset calibration: Follow along from step 6 in the official beacon guide`);
				result.push(`${additionalLinePrefix}https://docs.beacon3d.com/quickstart/#6-calibrate-beacon`);
			} else {
				result.push(`Z-offset calibration: https://www.klipper3d.org/Probe_Calibrate.html#calibrating-probe-z-offset`);
			}
			return result.join('\n');
		},
		renderEndstopSection(pretunedSensorlessConfig?: string) {
			const result: string[] = [];
			const toolheads = utils.getToolheads();
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
			if (utils.getToolheads().every((th) => th.getProbe() == null)) {
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
			const result: string[] = [
				`variable_bed_margin_x: [${config.printer.bedMargin.x[0]}, ${config.printer.bedMargin.x[1]}]`,
				`variable_bed_margin_y: [${config.printer.bedMargin.y[0]}, ${config.printer.bedMargin.y[1]}]`,
			];
			const toolheads = utils.getToolheads();
			const isIdex = toolheads.some((th) => th.getMotionAxis() === PrinterAxis.dual_carriage);
			// IDEX variables
			if (isIdex) {
				const probeTool = toolheads.find((th) => th.getProbe() != null)?.getTool();
				result.push(
					`variable_default_toolhead: ${probeTool}                             # the toolhead with the z-probe, 0=left 1=right toolhead`,
				);
				const firstADXL = utils.getToolhead(0).getXAccelerometerName();
				const secondADXL = utils.getToolhead(1).getXAccelerometerName();
				result.push(`variable_adxl_chip: ["${firstADXL}", "${secondADXL}"]           # toolheads adxl chip names`);
				result.push(`variable_toolchange_travel_speed: ${this.getMacroTravelSpeed()}     # parking travel speed`);
				result.push(`variable_toolchange_travel_accel: ${this.getMacroTravelAccel()}     # parking travel accel`);
				result.push(
					`variable_shaper_x_freq: [0, 0, 0, 0]                    # shaper frequency [T0, T1, COPY, MIRROR]`,
				);
				result.push(
					`variable_shaper_y_freq: [0, 0, 0, 0]                    # shaper frequency [T0, T1, COPY, MIRROR]`,
				);
				result.push(
					`variable_shaper_x_type: ["mzv", "mzv", "mzv", "mzv"]    # shaper frequency algorythm [T0, T1, COPY, MIRROR]`,
				);
				result.push(
					`variable_shaper_y_type: ["mzv", "mzv", "mzv", "mzv"]    # shaper frequency algorythm [T0, T1, COPY, MIRROR]`,
				);
			}
			// Driver type variables (X1 is Y on hybrid)
			result.push(
				utils.getAxisDriverVariables(PrinterAxis.x, config.printer.kinematics === 'hybrid-corexy' ? false : true),
			);
			result.push(
				utils.getAxisDriverVariables(
					PrinterAxis.y,
					true,
					config.printer.kinematics === 'hybrid-corexy' ? [PrinterAxis.x1] : [],
				),
			);
			result.push(utils.getAxisDriverVariables(PrinterAxis.z, true));

			return utils.formatInlineComments(result).join('\n');
		},
		renderSaveVariables(options?: VAOCControlPoints) {
			return extrasGenerator.generateSaveVariables(options).join('\n');
		},
		renderUserMacroVariableOverrides(size?: number) {
			const result: string[] = [
				`variable_macro_travel_speed: ${this.getMacroTravelSpeed()}`,
				`variable_macro_travel_accel: ${this.getMacroTravelAccel()}`,
			];
			const toolheads = utils.getToolheads();
			const isIdex = toolheads.some((th) => th.getMotionAxis() === PrinterAxis.dual_carriage);
			if (isIdex) {
				result.push(`variable_toolchange_travel_speed: ${this.getMacroTravelSpeed()}     # parking travel speed`);
				result.push(`variable_toolchange_travel_accel: ${this.getMacroTravelAccel()}     # parking travel accel`);
				result.push(
					`variable_shaper_x_freq: [0, 0, 0, 0]                    # shaper frequency [T0, T1, COPY, MIRROR]`,
				);
				result.push(
					`variable_shaper_y_freq: [0, 0, 0, 0]                    # shaper frequency [T0, T1, COPY, MIRROR]`,
				);
				result.push(
					`variable_shaper_x_type: ["mzv", "mzv", "mzv", "mzv"]    # shaper frequency algorythm [T0, T1, COPY, MIRROR]`,
				);
				result.push(
					`variable_shaper_y_type: ["mzv", "mzv", "mzv", "mzv"]    # shaper frequency algorythm [T0, T1, COPY, MIRROR]`,
				);
			}
			return utils.formatInlineComments(result).join('\n');
		},
		renderControllerFan() {
			let result: string[] = [];
			if (config.controllerFan.id === 'none') {
				result.push('# No controller fan configured');
				return result.join('\n');
			}
			result.push(`[controller_fan controller_fan]`);
			switch (config.controllerFan.id) {
				case '2pin':
					utils.requireControlboardPin('fan_controller_board_pin');
					result.push(`# 2-pin fan connected to the controller board`);
					result.push(`pin: ${utils.getControlboardPins().fan_controller_board_pin}`);
					break;
				case '4pin':
					utils.requireControlboardPin('fan_controller_board_pin');
					result.push(`# 4-pin fan connected to the controller board`);
					result.push(`pin: !${utils.getControlboardPins().fan_controller_board_pin}`);
					result.push(`cycle_time:  0.00004`);
					break;
				case '4pin-dedicated':
					utils.requireControlboardPin('4p_controller_board_pin');
					result.push(`# 4-pin fan connected to a dedicated 4-pin fan header on the controller board`);
					result.push(`pin: ${utils.getControlboardPins()['4p_controller_board_pin']}`);
					result.push(`cycle_time:  0.00004`);
					if (utils.getControlboardPins()['4p_controller_board_tach_pin'] != null) {
						result.push(`tachometer_pin: ^${utils.getControlboardPins()['4p_controller_board_tach_pin']}`);
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
			const multipleToolheadPartFans = utils.getToolheads().filter((th) => th.getPartFan()).length > 1;
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
				utils
					.getToolheads()
					.map((th) => th.renderPartFan(multipleToolheadPartFans))
					.join('\n'),
			);
			// Hotend fan
			result.push(``);
			result.push(`# Hotend cooling fan`);
			result.push(
				utils
					.getToolheads()
					.map((th) => th.renderHotendFan())
					.join('\n'),
			);
			// Controller fan
			result.push(``);
			result.push(`# Controller cooling fan`);
			result.push(this.renderControllerFan());
			return result.join('\n');
		},
		renderBoardPinAlias(pinAlias: string, board: Board, toolhead?: Parameters<RenderPinsFn>[2], mcu?: string) {
			const enabledMap: 'toolboard' | 'controlboard' = board.isToolboard ? 'toolboard' : 'controlboard';
			const pins = !board.isToolboard ? utils.getControlboardPins() : toolhead?.getToolboardPins();
			if (pins == null) {
				throw new Error(`No pins found for ${board.name}.`);
			}
			const motionPins: { [key in PrinterAxis]?: string[] } = {};
			const aliases = (Object.keys(AllPins) as Array<keyof typeof AllPins>)
				.map((k) => {
					const pinNameParts = k.split('_');
					const prefix = pinNameParts[0] === 'dual' ? pinNameParts[0] + '_' + pinNameParts[1] : pinNameParts[0];
					let axis = utils.pinAliasPrefixToPrinterAxis(prefix);
					if (
						utils.isPrinterAxis(axis) &&
						Object.keys(MotorSlotPins.shape).indexOf(k.replace(prefix + '_', '')) !== -1
					) {
						try {
							const val = utils.getRailPinValue(axis, k.replace(prefix, ''), [enabledMap], false);
							if (motionPins[axis] == null) {
								motionPins[axis] = [];
							}
							motionPins[axis]?.push(`${k}=${val}`);
							return null;
						} catch (e) {
							// Don't emit unused motor slot pins.
							return null;
						}
					}
					if (pins[k] == null) {
						return k + '=null';
					}
					return k + '=' + pins[k];
				})
				.filter(Boolean);
			// todoc fix motor pins from rail config
			const result = [`[board_pins ${pinAlias}]`];
			if (mcu != null) {
				result.push(`mcu: ${mcu}`);
			}
			const renderedMotionPins: string[] = [];
			Object.entries(motionPins).forEach(([axis, pins]) => {
				if (pins != null && utils.isPrinterAxis(axis)) {
					renderedMotionPins.push(
						utils.getMotorPinComments(axis, board, `${axis.toUpperCase()} motor pins`).join('\n\t'),
					);
					renderedMotionPins.push(pins.join(',\n\t') + ',');
				}
			});
			result.push(
				`aliases:`,
				`\t${renderedMotionPins.join('\n\t')}\n\t${utils.renderCommentHeader('GENERAL PINS')}\n\t${aliases.join(',\n\t')}`,
			);
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
		renderMacros() {
			return utils
				.formatInlineComments(utils.getToolheads().flatMap((th) => th.renderToolheadMacro().split('\n')))
				.join('\n');
		},
		uncommentIf(condition: boolean | undefined | null) {
			return condition === true ? '' : '#';
		},
	};
};
export type KlipperConfigHelper = Awaited<ReturnType<typeof constructKlipperConfigHelpers>>;
export type RenderPinsFn = (pinAlias: string, board: Board, toolhead?: ToolheadGenerator<any>, mcu?: string) => string;
