import { pino } from 'pino';
import { serverSchema } from '@/env/schema.mjs';
import { globalPinoOpts } from '@/helpers/logger.js';
import dotenv from 'dotenv';
import { existsSync, readFileSync } from 'fs';
import path from 'path';
import pretty from 'pino-pretty';

const prettyStream = pretty({
	levelFirst: true,
	colorize: true,
	ignore: 'hostname,pid',
});

let logger: pino.Logger | null = null;
const envFile = existsSync('./.env.local') ? readFileSync('.env.local') : readFileSync('.env');
export const getLogger = () => {
	if (logger != null) {
		return logger;
	}
	const environment = serverSchema.parse({ NODE_ENV: 'production', ...dotenv.parse(envFile) });
	const logDirExists = existsSync(path.dirname(environment.LOG_FILE));
	const logFile = logDirExists ? environment.LOG_FILE : '/var/log/ratos-cli.log';
	if (!logDirExists) {
		// eslint-disable-next-line no-console
		console.warn('cli logger logFile directory does not exist, using default', logFile);
	}

	if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
		logger = pino({ ...globalPinoOpts }, prettyStream).child({ source: 'cli' });
	} else {
		// Write to file via stream instead of worker (which breaks when using `ratos development branch` to switch between deployment and development branches).
		logger = pino({ ...globalPinoOpts }, pino.destination({ dest: logFile, sync: true })).child({
			source: 'cli',
		});
	}
	return logger;
};
