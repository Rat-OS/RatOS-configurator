import { ToolheadHelper } from '@/app/analysis/toolhead-helper';

export type ADXL345ResponseHeader = 'time' | 'x_acceleration' | 'y_acceleration' | 'z_acceleration';
export type KlipperADXL345SubscriptionResponse = {
	header: [ADXL345ResponseHeader, ADXL345ResponseHeader, ADXL345ResponseHeader, ADXL345ResponseHeader];
};
export type KlipperADXL345SubscriptionData = { data: [number, number, number, number][]; overflows?: number };

export type ToolheadHelperClass = InstanceType<typeof ToolheadHelper<any>>;
