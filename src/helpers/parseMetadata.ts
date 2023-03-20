import { exec } from 'child_process';
import { promisify } from 'util';
import { z, ZodType } from 'zod';
export const parseMetadata = async <T extends ZodType>(cfgFile: string, zod: T): Promise<z.infer<T> | null> => {
	if (cfgFile.trim() === '') return null;

	const hashmarkPrefixedJson = await promisify(exec)(`sed -n '/^# {/{:a; N; /\\n# }/!ba; p}' ${cfgFile}`);
	const jsonArray = hashmarkPrefixedJson.stdout
		.split('\n')
		.map((l) => l.trim())
		.filter((l) => l !== '')
		.map((l) => (l.indexOf('#') === 0 ? l.substring(1) : l));
	if (jsonArray.length === 0) {
		console.log('skipping empty file: ' + cfgFile);
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
