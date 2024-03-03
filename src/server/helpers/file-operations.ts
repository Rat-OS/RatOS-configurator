import { existsSync, createReadStream, createWriteStream } from 'fs';
import { copyFile, unlink } from 'fs/promises';
import { EOL } from 'os';
import { createInterface } from 'readline';

export const getScriptRoot = () => {
	// This is ... not great.. come up with something better
	return process.env.RATOS_SCRIPT_DIR ?? __dirname.split('configurator/')[0] + 'configurator/scripts/';
};

export const replaceInFileByLine = async (filePath: string, search: string | RegExp, replace: string | null) => {
	if (!existsSync(filePath)) {
		throw new Error('Firmware config file does not exist: ' + filePath);
	}
	const fileStream = createReadStream(filePath);
	const writeStream = createWriteStream(filePath + '.tmp');

	const rl = createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});

	for await (const line of rl) {
		if (replace == null) {
			if (search instanceof RegExp ? line.match(search) : line.includes(search)) {
				continue;
			}
			writeStream.write(line + EOL);
			continue;
		}
		writeStream.write(line.replace(search, replace) + EOL);
	}
	rl.close();
	await new Promise((resolve, reject) => {
		writeStream.close((err) => {
			if (err) {
				throw reject(err);
			}
			resolve(null);
		});
	});
	await new Promise((resolve, reject) => {
		fileStream.close((err) => {
			if (err) {
				throw reject(err);
			}
			resolve(null);
		});
	});
	await copyFile(filePath + '.tmp', filePath);
	await unlink(filePath + '.tmp');
};

export const searchFileByLine = async (filePath: string, search: string | RegExp): Promise<number | false> => {
	if (!existsSync(filePath)) {
		throw new Error('Firmware config file does not exist: ' + filePath);
	}
	const fileStream = createReadStream(filePath);

	const rl = createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});
	let result: number | false = false;
	let lineNumber = 0;
	for await (const line of rl) {
		if (result) continue;
		lineNumber++;
		if (search instanceof RegExp ? line.match(search) : line.includes(search)) {
			result = lineNumber;
		}
	}
	await new Promise((resolve, reject) => {
		fileStream.close((err) => {
			if (err) {
				throw reject(err);
			}
			resolve(null);
		});
	});
	return result;
};

export const extractLinesFromFile = async (filePath: string, start: number, end?: number) => {
	if (!existsSync(filePath)) {
		throw new Error('Firmware config file does not exist: ' + filePath);
	}
	const fileStream = createReadStream(filePath);

	const rl = createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});
	let result: string[] = [];
	let lineNumber = 0;
	for await (const line of rl) {
		lineNumber++;
		if (lineNumber >= start && lineNumber <= (end ?? Infinity)) {
			result.push(line);
		}
	}
	await new Promise((resolve, reject) => {
		fileStream.close((err) => {
			if (err) {
				throw reject(err);
			}
			resolve(null);
		});
	});
	return result.join('\n');
};
