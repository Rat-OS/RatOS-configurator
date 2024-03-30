import { existsSync, createReadStream, createWriteStream, write } from 'fs';
import { copyFile, unlink } from 'fs/promises';
import { EOL } from 'os';
import { createInterface } from 'readline';
import { getLogger } from '@/server/helpers/logger';

export const getScriptRoot = () => {
	// This is ... not great.. come up with something better
	return process.env.RATOS_SCRIPT_DIR ?? __dirname.split('configurator/')[0] + 'configurator/scripts/';
};

export const replaceInFileByLine = async (
	filePath: string,
	searchOrReplacer: string | RegExp | ((line: string, lineNumber: number) => string),
	replace?: string | null,
) => {
	if (!existsSync(filePath)) {
		throw new Error('File does not exist: ' + filePath);
	}
	const fileStream = createReadStream(filePath);
	const writeStream = createWriteStream(filePath + '.tmp', { flags: 'w' });

	const rl = createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});
	let success = 0;
	let lineNumber = -1;
	try {
		for await (const line of rl) {
			lineNumber++;
			if (searchOrReplacer instanceof Function) {
				writeStream.write(searchOrReplacer(line, lineNumber) + EOL);
				success++;
				continue;
			}
			if (replace === null) {
				if (searchOrReplacer instanceof RegExp ? line.match(searchOrReplacer) : line.includes(searchOrReplacer)) {
					success++;
					continue;
				}
				writeStream.write(line + EOL);
				continue;
			}
			if (replace == null) {
				getLogger().warn(`replaceInFileByLine (${filePath}): replacer wasn't provided, writing line as is`);
				writeStream.write(line + EOL);
				success++;
				continue;
			}
			writeStream.write(line.replace(searchOrReplacer, replace) + EOL);
		}
	} catch (e) {
		getLogger().error(
			`replaceInFileByLine (${filePath}): error encountered during replace operation, original file will not be changed. ${e instanceof Error ? e.message : e instanceof String ? e : 'Unknown error'}`,
		);
		fileStream.destroy();
		writeStream.destroy();
		throw e;
	} finally {
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
	}
	if (success > 0) {
		await copyFile(filePath + '.tmp', filePath);
	}
	await unlink(filePath + '.tmp');
	return success;
};

export const searchFileByLine = async (filePath: string, search: string | RegExp): Promise<number | false> => {
	if (!existsSync(filePath)) {
		throw new Error('File does not exist: ' + filePath);
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
		throw new Error('File does not exist: ' + filePath);
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
