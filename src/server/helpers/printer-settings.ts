import { existsSync } from 'fs';
import { serverSchema } from '../../env/schema.mjs';
import { loadSerializedConfig, readSerializedConfig } from '../routers/printer';
import path from 'path';
import { PrinterConfiguration, SerializedPrinterConfiguration } from '../../zods/printer-configuration';
import { writeFile } from 'fs/promises';
const environment = serverSchema.parse(process.env);

const PRINTER_SETTINGS_FILE = path.join(environment.RATOS_DATA_DIR, 'last-printer-settings.json');

export const getLastPrinterSettings = async <T>(
	fromFile?: string,
	serialized?: T,
): Promise<T extends Boolean ? SerializedPrinterConfiguration : PrinterConfiguration> => {
	const filePath = fromFile ?? PRINTER_SETTINGS_FILE;
	if (!existsSync(filePath)) {
		throw new Error("Couldn't find printer settings file: " + filePath);
	}
	if (serialized) {
		return (await readSerializedConfig(filePath)) as T extends Boolean
			? SerializedPrinterConfiguration
			: PrinterConfiguration;
	}
	return (await loadSerializedConfig(filePath)) as T extends Boolean
		? SerializedPrinterConfiguration
		: PrinterConfiguration;
};

export const savePrinterSettings = async (serializedConfig: SerializedPrinterConfiguration) => {
	return await writeFile(
		path.join(environment.RATOS_DATA_DIR, 'last-printer-settings.json'),
		JSON.stringify(serializedConfig),
	);
};

export const hasLastPrinterSettings = () => {
	return existsSync(PRINTER_SETTINGS_FILE);
};
