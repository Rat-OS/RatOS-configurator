import { ToolheadHelper } from '@/app/analysis/toolhead-helper';
import { PSD } from '@/app/analysis/periodogram';

export type ADXL345ResponseHeader = 'time' | 'x_acceleration' | 'y_acceleration' | 'z_acceleration';
export type KlipperADXL345SubscriptionResponse = {
	header: [ADXL345ResponseHeader, ADXL345ResponseHeader, ADXL345ResponseHeader, ADXL345ResponseHeader];
};
export type KlipperADXL345SubscriptionData = { data: [number, number, number, number][]; overflows?: number };

export type ToolheadHelperClass = InstanceType<typeof ToolheadHelper<any>>;

export type ADXL345SensorName = ReturnType<
	ToolheadHelperClass['getXAccelerometerName'] & ToolheadHelperClass['getYAccelerometerName']
>;

// Macro data structure

type MacroID = Nominal<string, 'MacroID'>;
type MacroSequenceID = Nominal<string, 'MacroSequenceID'>;

export type Macro = {
	id: MacroID;
	name: string;
	sequences: MacroSequence[];
};

export type MacroSequence = {
	id: MacroSequenceID;
	name: string;
	recording: MacroRecordingSettings | null;
	gcode: string;
};

export type MacroRecordingSettings = {
	capturePSD: boolean;
	accelerometer: ADXL345SensorName;
};

export type MacroRecording = {
	macroId: MacroID;
	sequenceId: MacroSequenceID;
	startTime: number;
	endTime: number;
	psd: AccumulatedPSD;
};
