import { exec } from 'child_process';
import path from 'path';
import { promisify } from 'util';
import { getLogger } from './logger';
import { getScriptRoot } from './util';

export const runSudoScript = async (script: string, ...args: string[]) => {
	const scriptRoot = getScriptRoot();
	return await promisify(exec)(`sudo ${path.join(scriptRoot, script)} ${args.join(' ')}`, { env: process.env });
};
