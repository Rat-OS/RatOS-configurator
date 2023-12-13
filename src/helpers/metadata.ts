import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';
import { z, ZodType } from 'zod';
import { Board, ControlBoardPinMap, ExtruderlessControlBoardPinMap, PinMap, ToolboardPinMap } from '../zods/boards';
import { getScriptRoot } from './util';
export const parseMetadata = async <T extends ZodType>(cfgFile: string, zod: T): Promise<z.infer<T> | null> => {
	if (cfgFile.trim() === '') return null;

	const hashmarkPrefixedJson = await promisify(exec)(`sed -n '/^# {/{:a; N; /\\n# }/!ba; p}' ${cfgFile}`);
	const jsonArray = hashmarkPrefixedJson.stdout
		.split('\n')
		.map((l) => l.trim())
		.filter((l) => l !== '')
		.map((l) => (l.indexOf('#') === 0 ? l.substring(1) : l));
	if (jsonArray.length === 0) {
		return null;
	}
	try {
		const content = JSON.parse(jsonArray.join('\n')) as { path: string; id: string };
		content.path = cfgFile;
		const fileName = cfgFile.split('/').pop();
		if (fileName == null) {
			throw new Error("File name couldn't be parsed from path: " + cfgFile);
		}
		content.id = fileName;
		return zod.parse(content);
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.log(e.message);
		}
		throw new Error('Failed to parse JSON from file: ' + cfgFile + ' with content: ' + jsonArray.join('\n'));
	}
};

const _parsePinValue = (value: string) => {
	if (value === 'null') {
		return undefined;
	}
	if (value.startsWith('<') && value.endsWith('>')) {
		return undefined;
	}
	return value;
};

const _parsePinAlias = async (file: string) => {
	const scriptRoot = getScriptRoot();
	const configUnparsed = await promisify(exec)(`python3 ${path.join(scriptRoot, 'initojson.py')} ${file}`);
	const config = JSON.parse(configUnparsed.stdout) as any;
	if (config == null) {
		throw new Error('Failed to parse config file: ' + file);
	}
	const boardPinSection = Object.keys(config).find((section) => section.startsWith('board_pins'));
	if (boardPinSection == null) {
		throw new Error('Failed to find board pin section in config file: ' + file);
	}
	const unparsedPins = config[boardPinSection].aliases.map((a: string) => a.replace(',', ''));
	const badPins = config[boardPinSection].aliases.filter((a: string) => !a.includes('='));
	if (badPins.length > 0) {
		throw new Error('Board pin aliases do not parse correctly, got "' + badPins.join(', ') + '"');
	}
	const pins: { [key: string]: string | undefined } = {};
	unparsedPins.forEach((p: string) => {
		const frags = p.split('=');
		if (frags.length > 2) {
			throw new Error('Board pin aliases do not parse correctly, got "' + p + '"');
		}
		pins[frags[0]] = _parsePinValue(frags[1]);
	});
	return pins;
};

export const exportBoardPinAlias = (name: string, pins: z.infer<typeof PinMap>, mcu?: string) => {
	const aliases = (Object.keys(pins) as Array<keyof typeof pins>).map((k, i) => {
		if (pins[k] == null) {
			return k + '=null';
		}
		return k + '=' + pins[k];
	});
	const result = [`[board_pins ${name}]`];
	if (mcu != null) {
		result.push(`mcu: ${mcu}`);
	}
	result.push(`aliases:`, `\t${aliases.join(',\n\t')}`);
	return result.join('\n');
};

export const parseBoardConfig = async (board: Board, extruderLess?: boolean) => {
	let file = path.join(
		board.path,
		board.isToolboard
			? 'toolboard-config.cfg'
			: extruderLess && board.extruderlessConfig != null
			? board.extruderlessConfig
			: 'config.cfg',
	);
	const zod = board.isToolboard ? ToolboardPinMap : extruderLess ? ExtruderlessControlBoardPinMap : ControlBoardPinMap;
	return zod.parse(await _parsePinAlias(file));
};
