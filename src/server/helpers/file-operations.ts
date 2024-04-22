import { existsSync, createReadStream, createWriteStream, write } from 'fs';
import { copyFile, unlink } from 'fs/promises';
import { EOL } from 'os';
import { createInterface } from 'readline';
import { getLogger } from '@/server/helpers/logger';

export const getScriptRoot = () => {
	// This is ... not great.. come up with something better
	return process.env.RATOS_SCRIPT_DIR ?? __dirname.split('configurator/')[0] + 'configurator/scripts/';
};

/**
 * Replaces objects in a file with new objects.
 * @param filePath Path to the file to replace in
 * @param searchOrReplacer  String or RegExp to search for, or a function that takes a line and returns a new line, if null the line will be removed.
 * @param replace String to replace with, or null to remove the line.
 * @returns Number of lines changed
 */
export const replaceInFileByLine = async (
	filePath: string,
	searchOrReplacer: string | RegExp | ((line: string, lineNumber: number) => string | null),
	replace?: string | null,
) => {
	if (!existsSync(filePath)) {
		throw new Error('File does not exist: ' + filePath);
	}
	const fileStream = createReadStream(filePath, { highWaterMark: 1 * 1024 * 1024 });
	const writeStream = createWriteStream(filePath + '.tmp', { flags: 'w' });

	const rl = createInterface({
		input: fileStream,
		crlfDelay: Infinity,
	});
	const rlClosed = new Promise((resolve, reject) => {
		rl.on('close', () => {
			resolve(null);
		});
	});
	let linesChanged = 0;
	let linesDeleted = 0;
	let lineNumber = 0;
	try {
		for await (const line of rl) {
			lineNumber++;
			let newLine: string | null = line;
			if (searchOrReplacer instanceof Function) {
				newLine = searchOrReplacer(line, lineNumber);
			} else if (replace === null) {
				if (searchOrReplacer instanceof RegExp ? line.match(searchOrReplacer) : line.includes(searchOrReplacer)) {
					newLine = null;
				}
			} else if (replace == null) {
				getLogger().warn(`replaceInFileByLine (${filePath}): replacer wasn't provided, writing line as is`);
			} else {
				newLine = line.replace(searchOrReplacer, replace);
			}
			if (newLine !== null) {
				writeStream.write(newLine + EOL);
				if (newLine !== line) {
					linesChanged++;
				}
			} else {
				linesDeleted++;
			}
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
		await rlClosed;
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
	if (linesChanged + linesDeleted > 0) {
		await copyFile(filePath + '.tmp', filePath);
	}
	await unlink(filePath + '.tmp');
	return { linesChanged, linesDeleted, linesTotal: lineNumber };
};

/**
 * Searches for a string or regex in a file and returns the line number.
 * @param filePath Path to the file to search in
 * @param search String or RegExp to search for
 * @returns Line number of the first match, or false if no match
 */
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

/**
 * Extracts lines from a file.
 * @param filePath Path to the file to extract from
 * @param start Line number to start from
 * @param end Line number to end at
 * @returns Extracted lines
 */
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
