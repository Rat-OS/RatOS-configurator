import { z } from 'zod';
import { DriverID, PrinterAxis, Voltage } from '@/zods/motion';

// Complete map of all available RatOS pin aliases.
export const AllPins = {
	x_step_pin: z.string().optional(),
	x_dir_pin: z.string().optional(),
	x_enable_pin: z.string().optional(),
	x_uart_pin: z.string().optional(),
	x_diag_pin: z.string().optional(),
	x_endstop_pin: z.string().optional(),
	x1_step_pin: z.string().optional(),
	x1_dir_pin: z.string().optional(),
	x1_enable_pin: z.string().optional(),
	x1_uart_pin: z.string().optional(),
	x1_diag_pin: z.string().optional(),
	x1_endstop_pin: z.string().optional(),
	dual_carriage_step_pin: z.string().optional(),
	dual_carriage_dir_pin: z.string().optional(),
	dual_carriage_enable_pin: z.string().optional(),
	dual_carriage_uart_pin: z.string().optional(),
	dual_carriage_diag_pin: z.string().optional(),
	dual_carriage_endstop_pin: z.string().optional(),
	y_step_pin: z.string().optional(),
	y_dir_pin: z.string().optional(),
	y_enable_pin: z.string().optional(),
	y_uart_pin: z.string().optional(),
	y_diag_pin: z.string().optional(),
	y_endstop_pin: z.string().optional(),
	y1_step_pin: z.string().optional(),
	y1_dir_pin: z.string().optional(),
	y1_enable_pin: z.string().optional(),
	y1_uart_pin: z.string().optional(),
	y1_diag_pin: z.string().optional(),
	y1_endstop_pin: z.string().optional(),
	y2_step_pin: z.string().optional(),
	y2_dir_pin: z.string().optional(),
	y2_enable_pin: z.string().optional(),
	y2_uart_pin: z.string().optional(),
	y2_diag_pin: z.string().optional(),
	y2_endstop_pin: z.string().optional(),
	z0_step_pin: z.string().optional(),
	z0_dir_pin: z.string().optional(),
	z0_enable_pin: z.string().optional(),
	z0_uart_pin: z.string().optional(),
	z0_diag_pin: z.string().optional(),
	z1_step_pin: z.string().optional(),
	z1_dir_pin: z.string().optional(),
	z1_enable_pin: z.string().optional(),
	z1_uart_pin: z.string().optional(),
	z1_diag_pin: z.string().optional(),
	z2_step_pin: z.string().optional(),
	z2_dir_pin: z.string().optional(),
	z2_enable_pin: z.string().optional(),
	z2_uart_pin: z.string().optional(),
	z2_diag_pin: z.string().optional(),
	z3_step_pin: z.string().optional(),
	z3_dir_pin: z.string().optional(),
	z3_enable_pin: z.string().optional(),
	z3_uart_pin: z.string().optional(),
	z3_diag_pin: z.string().optional(),
	e_step_pin: z.string().optional(),
	e_dir_pin: z.string().optional(),
	e_enable_pin: z.string().optional(),
	e_uart_pin: z.string().optional(),
	e_diag_pin: z.string().optional(),
	e_heater_pin: z.string().optional(),
	e_sensor_pin: z.string().optional(),
	stepper_spi_mosi_pin: z.string().optional(),
	stepper_spi_miso_pin: z.string().optional(),
	stepper_spi_sclk_pin: z.string().optional(),
	adxl345_cs_pin: z.string().optional(),
	bltouch_sensor_pin: z.string().optional(),
	bltouch_control_pin: z.string().optional(),
	probe_pin: z.string().optional(),
	fan_part_cooling_pin: z.string().optional(),
	fan_toolhead_cooling_pin: z.string().optional(),
	fan_controller_board_pin: z.string().optional(),
	heater_bed_heating_pin: z.string().optional(),
	heater_bed_sensor_pin: z.string().optional(),
	'4p_fan_part_cooling_pin': z.string().optional(),
	'4p_fan_part_cooling_tach_pin': z.string().optional(),
	'4p_toolhead_cooling_pin': z.string().optional(),
	'4p_toolhead_cooling_tach_pin': z.string().optional(),
	'4p_controller_board_pin': z.string().optional(),
	'4p_controller_board_tach_pin': z.string().optional(),
};
export const PinMap = z.object(AllPins);

export enum AxisPinPrefix {
	x = 'x',
	x1 = 'x1',
	y = 'y',
	y1 = 'y1',
	y2 = 'y2',
	z0 = 'z0',
	z1 = 'z1',
	z2 = 'z2',
	z3 = 'z3',
	e = 'e',
	e1 = 'e1',
	dual_carriage = 'dual_carriage',
}

export const pinAliasPrefixToPrinterAxis: { [key in AxisPinPrefix]: PrinterAxis } = {
	x: PrinterAxis['x'],
	x1: PrinterAxis['x1'],
	y: PrinterAxis['y'],
	y1: PrinterAxis['y1'],
	y2: PrinterAxis['y2'],
	z0: PrinterAxis['z'],
	z1: PrinterAxis['z1'],
	z2: PrinterAxis['z2'],
	z3: PrinterAxis['z3'],
	e: PrinterAxis['extruder'],
	e1: PrinterAxis['extruder1'],
	dual_carriage: PrinterAxis['dual_carriage'],
};

export const pinPrefixToAxis = z.nativeEnum(AxisPinPrefix).transform((v) => pinAliasPrefixToPrinterAxis[v] ?? null);
export const axisToPinPrefix = z
	.nativeEnum(PrinterAxis)
	.transform(
		(pa) =>
			(Object.keys(pinAliasPrefixToPrinterAxis) as AxisPinPrefix[]).find(
				(p) => pinAliasPrefixToPrinterAxis[p] === pa,
			) ?? null,
	);

export const ControlBoardPinMap = PinMap.extend({
	x_step_pin: z.string(),
	x_dir_pin: z.string(),
	x_enable_pin: z.string(),
	x_uart_pin: z.string(),
	x_endstop_pin: z.string(),
	y_step_pin: z.string(),
	y_dir_pin: z.string(),
	y_enable_pin: z.string(),
	y_uart_pin: z.string(),
	y_endstop_pin: z.string(),
	z0_step_pin: z.string(),
	z0_dir_pin: z.string(),
	z0_enable_pin: z.string(),
	z0_uart_pin: z.string(),
	e_step_pin: z.string(),
	e_dir_pin: z.string(),
	e_enable_pin: z.string(),
	e_uart_pin: z.string(),
	e_heater_pin: z.string(),
	e_sensor_pin: z.string(),
	probe_pin: z.string(),
	heater_bed_heating_pin: z.string(),
	heater_bed_sensor_pin: z.string(),
}).and(
	z
		.object({
			fan_part_cooling_pin: z.string(),
			fan_toolhead_cooling_pin: z.string(),
		})
		.or(
			z.object({
				'4p_fan_part_cooling_pin': z.string(),
				'4p_fan_part_cooling_tach_pin': z.string(),
				'4p_toolhead_cooling_pin': z.string(),
				'4p_toolhead_cooling_tach_pin': z.string(),
			}),
		),
);

export const ExtruderlessControlBoardPinMap = PinMap.extend({
	x_step_pin: z.string(),
	x_dir_pin: z.string(),
	x_enable_pin: z.string(),
	x_uart_pin: z.string(),
	x_endstop_pin: z.string(),
	y_step_pin: z.string(),
	y_dir_pin: z.string(),
	y_enable_pin: z.string(),
	y_uart_pin: z.string(),
	y_endstop_pin: z.string(),
	z0_step_pin: z.string(),
	z0_dir_pin: z.string(),
	z0_enable_pin: z.string(),
	z0_uart_pin: z.string(),
	z1_step_pin: z.string(),
	z1_dir_pin: z.string(),
	z1_enable_pin: z.string(),
	z1_uart_pin: z.string(),
	z2_step_pin: z.string(),
	z2_dir_pin: z.string(),
	z2_enable_pin: z.string(),
	z2_uart_pin: z.string(),
	probe_pin: z.string(),
	heater_bed_heating_pin: z.string(),
	heater_bed_sensor_pin: z.string(),
}).and(
	z
		.object({
			fan_part_cooling_pin: z.string(),
			fan_toolhead_cooling_pin: z.string(),
		})
		.or(
			z.object({
				'4p_fan_part_cooling_pin': z.string(),
				'4p_fan_part_cooling_tach_pin': z.string(),
				'4p_toolhead_cooling_pin': z.string(),
				'4p_toolhead_cooling_tach_pin': z.string(),
			}),
		),
);
export const ToolboardPinMap = PinMap.extend({
	e_step_pin: z.string(),
	e_dir_pin: z.string(),
	e_enable_pin: z.string(),
	e_uart_pin: z.string(),
	e_heater_pin: z.string(),
	e_sensor_pin: z.string(),
	adxl345_cs_pin: z.string(),
	probe_pin: z.string(),
}).and(
	z
		.object({
			fan_part_cooling_pin: z.string(),
			fan_toolhead_cooling_pin: z.string(),
		})
		.or(
			z.object({
				'4p_fan_part_cooling_pin': z.string(),
				'4p_fan_part_cooling_tach_pin': z.string(),
				'4p_toolhead_cooling_pin': z.string(),
				'4p_toolhead_cooling_tach_pin': z.string(),
			}),
		),
);

export const UARTPins = z.object({
	uart_pin: z.string(),
	uart_address: z.string().optional(),
	rx_pin: z.string().optional(),
	tx_pin: z.string().optional(),
});

export const SPIPins = z
	.object({
		cs_pin: z.string(),
	})
	.and(
		z.object({ spi_bus: z.string() }).or(
			z.object({
				spi_software_mosi_pin: z.string().optional(),
				spi_software_miso_pin: z.string().optional(),
				spi_software_sclk_pin: z.string().optional(),
			}),
		),
	);

export const hasSPI = (slot: unknown) => {
	return SPIPins.safeParse(slot).success;
};

export const hasUART = (slot: unknown) => {
	return UARTPins.safeParse(slot).success;
};

export const MotorSlotPins = z.object({
	step_pin: z.string(),
	dir_pin: z.string(),
	enable_pin: z.string(),
	diag_pin: z.string().optional(),
	endstop_pin: z.string().optional(),
	// UART
	uart_pin: z.string().optional(),
	rx_pin: z.string().optional(),
	tx_pin: z.string().optional(),
	// SPI
	cs_pin: z.string().optional(),
});

export const MotorSlot = MotorSlotPins.extend({
	title: z.string(),
	// UART
	uart_address: z.string().optional(),
	// SPI
	spi_bus: z.string().optional(),
	spi_software_mosi_pin: z.string().optional(),
	spi_software_miso_pin: z.string().optional(),
	spi_software_sclk_pin: z.string().optional(),
}).refine(
	(slot) => {
		return hasSPI(slot) || hasUART(slot);
	},
	{ message: 'Motor slot must have either SPI or UART pins' },
);

export type MotorSlot = z.output<typeof MotorSlot>;

const AnySlotPin = MotorSlot.innerType().omit({ title: true }).partial();
export type AnySlotPin = z.infer<typeof AnySlotPin>;

export const MotorSlotKey = z.string();

export const reversePinLookup: (pins: AnySlotPin, board: Board) => z.infer<typeof MotorSlotKey> | undefined = (
	pins,
	board,
) => {
	const slots = Object.entries(board.motorSlots ?? {});
	for (const [key, slot] of slots) {
		if (Object.entries(pins).every(([pin, value]) => slot[pin as keyof typeof slot] === value)) {
			return key;
		}
	}
	return undefined;
};

export const BoardID = z.string().brand('BoardID');
export const BoardPath = z.string().brand('BoardPath');
export const BoardSerialPath = z.string().brand('BoardSerialPath');

const integratedDrivers = z.record(z.nativeEnum(PrinterAxis).or(z.string()), DriverID);
const motorSlots = z.record(MotorSlotKey, MotorSlot);

export const Board = z
	.object({
		id: BoardID,
		isToolboard: z.boolean().optional(),
		isHost: z.boolean().optional(),
		serialPath: BoardSerialPath.optional(),
		boardImageFileName: z.string().optional(),
		manualFileName: z.string().optional(),
		wireDiagramFileName: z.string().optional(),
		name: z.string(),
		manufacturer: z.string(),
		firmwareBinaryName: z.string(),
		compileScript: z.string(),
		flashScript: z.string().optional(),
		flashInstructions: z.string().optional(),
		disableAutoFlash: z.boolean().optional(),
		documentationLink: z.string().optional(),
		hasQuirksFiles: z.boolean().optional(),
		driverCount: z.number(),
		integratedDrivers: integratedDrivers.optional(),
		extruderlessConfig: z.string().optional(),
		fourPinFanConnectorCount: z.number().optional(),
		driverVoltages: Voltage.array().default([24]),
		hasMcuTempSensor: z.boolean().default(true),
		thermistorPullup: z.number().default(4700),
		alternativePT1000Resistor: z.number().optional(),
		invertPinLogic: z.array(z.string()).default([]),
		customSections: z
			.record(
				z.string().regex(/^\S+$/),
				z.object({
					name: z.string().optional(),
					parameters: z.record(z.string().regex(/^\S+$/), z.string().or(z.number())),
					comments: z.array(z.string()).default([]),
				}),
			)
			.optional(),
		motorSlots: z.record(MotorSlotKey, MotorSlot).optional(),
		outputPins: z
			.array(
				z.object({
					pin: z.string(),
					name: z.string(),
					value: z.number().min(0).max(1),
				}),
			)
			.optional(),
		dfu: z
			.object({
				dfuBootImage: z.string(),
				flashDevice: z.string(),
				instructions: z.array(z.string()),
				reminder: z.string().optional(),
				hasBoot0Jumper: z.boolean(),
			})
			.optional(),
		stepperSPI: z
			.object({
				software: z.object({
					sclk: z.string(),
					mosi: z.string(),
					miso: z.string(),
				}),
			})
			.or(
				z.object({
					hardware: z.object({
						bus: z.string(),
					}),
				}),
			)
			.optional(),
		ADXL345SPI: z
			.object({
				cs_pin: z.string(),
			})
			.and(
				z
					.object({
						software: z.object({
							sclk: z.string(),
							mosi: z.string(),
							miso: z.string(),
						}),
					})
					.or(
						z.object({
							hardware: z.object({
								bus: z.string(),
							}),
						}),
					),
			)
			.optional(),
		LIS2DW: z
			.object({
				cs_pin: z.string(),
			})
			.and(
				z
					.object({
						software: z.object({
							sclk: z.string(),
							mosi: z.string(),
							miso: z.string(),
						}),
					})
					.or(
						z.object({
							hardware: z.object({
								bus: z.string(),
							}),
						}),
					),
			)
			.optional(),
		path: BoardPath,
	})
	.and(
		z
			.object({ isToolboard: z.literal(true), motorSlots: z.undefined() })
			.or(z.object({ motorSlots: motorSlots }))
			.or(z.object({ isHost: z.literal(true), motorSlots: z.undefined() })),
	);

export const BoardWithDetectionStatus = Board.and(
	z.object({
		detected: z.boolean(),
	}),
);

export const AutoFlashableBoard = z.object({
	id: z.string(),
	disableAutoFlash: z.literal(false).optional(),
	isToolboard: z.boolean().optional(),
	compileScript: z.string(),
	flashScript: z.string(),
	path: BoardPath,
});

export const Toolboard = Board.and(
	z.object({
		isToolboard: z.literal(true),
		isHost: z.literal(false).optional(),
		integratedDrivers: integratedDrivers.and(
			z.object({
				[PrinterAxis.extruder]: z.string(),
			}),
		),
	}),
);

export const ToolboardWithDetectionStatus = Toolboard.and(
	z.object({
		detected: z.boolean(),
	}),
);

export type Board = z.infer<typeof Board>;
export type BoardWithDetectionStatus = z.infer<typeof BoardWithDetectionStatus>;
export type Toolboard = z.infer<typeof Toolboard>;
export type ToolboardWithDetectionStatus = z.infer<typeof ToolboardWithDetectionStatus>;
export type AutoFlashableBoard = z.infer<typeof AutoFlashableBoard>;
export type ToolboardPinMap = z.infer<typeof ToolboardPinMap>;
export type ControlBoardPinMap = z.infer<typeof ControlBoardPinMap>;
export type ExtruderlessControlBoardPinMap = z.infer<typeof ExtruderlessControlBoardPinMap>;
