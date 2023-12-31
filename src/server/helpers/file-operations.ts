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
