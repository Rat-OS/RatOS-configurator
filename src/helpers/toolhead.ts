import { serializeToolheadConfiguration } from '../utils/serialization';
import { PrinterAxis } from '../zods/motion';
import {
	PartialToolheadConfiguration,
	SerializedToolheadConfiguration,
	ToolheadConfiguration,
	ToolNumber,
} from '../zods/toolhead';

type ToolheadSuffix = `t${ToolNumber}`;
type ToolheadCommand = `T${ToolNumber}`;
type ToolboardAxisString = 'x' | 'dc';
type ToolboardShortName = ToolheadSuffix;

export class ToolheadHelper<IsToolboard extends boolean> {
	protected config: ToolheadConfiguration<IsToolboard>;
	constructor(toolhead: ToolheadConfiguration<IsToolboard>) {
		this.config = toolhead;
	}
	public hasToolboard(): boolean {
		return this.config.toolboard != null;
	}
	public getToolboard() {
		return this.config.toolboard;
	}
	public getMotionStepperName() {
		return `stepper_${this.getMotionAxis()}`;
	}
	public getToolboardName(): `toolboard_${ToolboardShortName}` {
		if (this.config.toolboard == null) {
			throw new Error(`Toolhead T${this.getTool()} does not have a toolboard`);
		}
		return `toolboard_${this.getShortToolName()}`;
	}
	public getShortToolName(): ToolboardShortName {
		return `t${this.getTool()}`;
	}
	public getDescription(): string {
		return this.config.description ?? `the printer's toolhead`;
	}
	public getMotionAxis(): PrinterAxis.x | PrinterAxis.dual_carriage {
		if (this.config.axis === PrinterAxis.dual_carriage) {
			return PrinterAxis.dual_carriage;
		}
		return PrinterAxis.x;
	}
	public getExtruderAxis(): PrinterAxis.extruder | PrinterAxis.extruder1 {
		if (this.config.axis === PrinterAxis.dual_carriage) {
			return PrinterAxis.extruder1;
		}
		return PrinterAxis.extruder;
	}
	public getToolCommand(): ToolheadCommand {
		return `T${this.getTool()}`;
	}
	public getTool(): ToolNumber {
		if (this.config.axis === PrinterAxis.dual_carriage) {
			return 1;
		}
		return 0;
	}
	public getSerialSuffix(): ToolheadSuffix {
		return `t${this.getTool()}`;
	}
	public getExtruder() {
		return this.config.extruder;
	}
	public getHotend() {
		return this.config.hotend;
	}
	public getThermistor() {
		return this.config.thermistor;
	}
	public getXEndstop() {
		return this.config.xEndstop;
	}
	public getYEndstop() {
		return this.config.yEndstop;
	}
	public getXAccelerometer() {
		return this.config.xAccelerometer;
	}
	public getYAccelerometer() {
		return this.config.yAccelerometer;
	}
	public getXAccelerometerName() {
		switch (this.getXAccelerometer()?.id) {
			case 'controlboard':
				return 'controlboard';
			case 'toolboard':
				if (this.hasToolboard()) {
					return this.getToolboardName();
				}
			case 'sbc':
				return 'rpi';
			default:
				return 'controlboard';
		}
	}
	public getYAccelerometerName() {
		switch (this.getYAccelerometer()?.id) {
			case 'controlboard':
				return 'controlboard';
			case 'toolboard':
				if (this.hasToolboard()) {
					return this.getToolboardName();
				}
			case 'sbc':
				return 'rpi';
			default:
				return 'controlboard';
		}
	}
	public getChangeSet(changes: PartialToolheadConfiguration) {
		if (changes == null) {
			return null;
		}
		const changeSet: any = {};
		Object.keys(changes).forEach((key) => {
			const current = this.getConfig()[key as keyof ToolheadConfiguration<IsToolboard>];
			const change = changes[key as keyof ToolheadConfiguration<IsToolboard>];
			if ((current != null && change == null) || (current == null && change != null)) {
				changeSet[key] = change;
				return;
			}
			if (current && change) {
				if (typeof current === 'object' && 'id' in current && typeof change === 'object' && 'id' in change) {
					if (current.id !== change.id) {
						changeSet[key] = change;
					}
				} else if (current !== change) {
					changeSet[key] = change;
				}
			}
		});
		return PartialToolheadConfiguration.parse(changeSet);
	}
	public getProbe() {
		return this.config.probe;
	}
	public getPartFan() {
		return this.config.partFan;
	}
	public getHotendFan() {
		return this.config.hotendFan;
	}
	public serialize(): SerializedToolheadConfiguration {
		return serializeToolheadConfiguration(this.config);
	}
	public getConfig(): ToolheadConfiguration<IsToolboard> {
		return { ...this.config };
	}
}
