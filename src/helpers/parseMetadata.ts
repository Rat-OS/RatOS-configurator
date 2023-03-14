import fs from 'fs';
import { z, ZodType } from 'zod';
export const parseMetadata = <T extends ZodType>(cfgFile: string, zod: T): z.infer<T> | null => {
	if (cfgFile.trim() === '') return null;
	const cfg = fs.readFileSync(cfgFile, 'utf8');
	const jsonRegex = /# \{((?:[^{}]*\{(?:[^{}]*|(?1))*\}[^{}]*)+)\}/s;
	const jsonMatch = cfg.match(jsonRegex);

	if (jsonMatch) {
		const jsonStr = jsonMatch[1].replace(/#/g, '').trim();
		const content = JSON.parse(jsonStr);
		zod.parse(content);
	}
	return null;
};
