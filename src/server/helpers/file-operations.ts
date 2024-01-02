import { existsSync, createReadStream, createWriteStream } from 'fs';
import { copyFile, unlink } from 'fs/promises';
import { EOL } from 'os';
import { createInterface } from 'readline';

export const replaceInFileByLine = async (filePath: string, search: string | RegExp, replace: string) => {
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
		writeStream.write(line.replace(search, replace) + EOL);
	}
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
		lineNumber++;
		if (search instanceof RegExp ? line.match(search) : line.includes(search)) {
			result = lineNumber;
			break;
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
