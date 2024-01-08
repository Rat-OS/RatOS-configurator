import { z } from 'zod';
import { PrinterAxis, Voltage } from './motion';

// Complete map of all available RatOS pin aliases.
export const PinMap = z.object({
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
});

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

export const MotorSlot = z
	.object({
		title: z.string(),
		step_pin: z.string(),
		dir_pin: z.string(),
		enable_pin: z.string(),
		diag_pin: z.string(),
		endstop_pin: z.string(),
		// UART
		uart_pin: z.string().optional(),
		uart_address: z.string().optional(),
		rx_pin: z.string().optional(),
		tx_pin: z.string().optional(),
		// SPI
		cs_pin: z.string().optional(),
		spi_bus: z.string().optional(),
		spi_software_mosi_pin: z.string().optional(),
		spi_software_miso_pin: z.string().optional(),
		spi_software_sclk_pin: z.string().optional(),
	})
	.refine(
		(slot) => {
			return hasSPI(slot) || hasUART(slot);
		},
		{ message: 'Motor slot must have either SPI or UART pins' },
	);

export type MotorSlot = z.output<typeof MotorSlot>;

const AnySlotPin = MotorSlot.innerType().omit({ title: true }).partial();
export type AnySlotPin = z.infer<typeof AnySlotPin>;

export const MotorSlotKey = z.string();

export const guessMotorSlotFromPins: (pins: AnySlotPin, board: Board) => z.infer<typeof MotorSlotKey> | undefined = (
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

export const Board = z.object({
	id: z.string(),
	isToolboard: z.boolean().optional(),
	isHost: z.boolean().optional(),
	serialPath: z.string().optional(),
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
	integratedDrivers: z.record(z.nativeEnum(PrinterAxis), z.string()).optional(),
	extruderlessConfig: z.string().optional(),
	fourPinFanConnectorCount: z.number().optional(),
	driverVoltages: Voltage.array().default([24]),
	hasMcuTempSensor: z.boolean().default(true),
	alternativePT1000Resistor: z.number().optional(),
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
	path: z.string(),
});

export const BoardWithDetectionStatus = Board.extend({
	detected: z.boolean(),
});

export const AutoFlashableBoard = z.object({
	id: z.string(),
	disableAutoFlash: z.literal(false).optional(),
	isToolboard: z.boolean().optional(),
	compileScript: z.string(),
	flashScript: z.string(),
	path: z.string(),
});

export const Toolboard = Board.extend({
	isToolboard: z.literal(true),
	isHost: z.literal(false).optional(),
	integratedDrivers: Board.shape.integratedDrivers.and(
		z.object({
			[PrinterAxis.extruder]: z.string(),
		}),
	),
});

export const ToolboardWithDetectionStatus = Toolboard.extend({
	detected: z.boolean(),
});

export type Board = z.infer<typeof Board>;
export type BoardWithDetectionStatus = z.infer<typeof BoardWithDetectionStatus>;
export type Toolboard = z.infer<typeof Toolboard>;
export type ToolboardWithDetectionStatus = z.infer<typeof ToolboardWithDetectionStatus>;
export type AutoFlashableBoard = z.infer<typeof AutoFlashableBoard>;
export type ToolboardPinMap = z.infer<typeof ToolboardPinMap>;
export type ControlBoardPinMap = z.infer<typeof ControlBoardPinMap>;
export type ExtruderlessControlBoardPinMap = z.infer<typeof ExtruderlessControlBoardPinMap>;
