import pino from 'pino';
import { serverSchema } from '@/env/schema.mjs';
import { globalPinoOpts } from '@/helpers/logger';
import { existsSync } from 'fs';
import path from 'path';

let logger: pino.Logger | null = null;
export const getLogger = () => {
	if (logger != null) {
		return logger;
	}
	const environment = serverSchema.parse(process.env);
	const logDirExists = existsSync(path.dirname(environment.LOG_FILE));
	const fallbackPath = '/var/log/ratos-server.log';
	const logFile = logDirExists ? environment.LOG_FILE : fallbackPath;
	if (!logDirExists) {
		if (!existsSync(path.dirname(fallbackPath))) {
			// eslint-disable-next-line no-console
			console.warn('Neither configured nor fallback log directories exist. Logging may fail.');
		}
		// eslint-disable-next-line no-console
		console.warn('server logger logFile directory does not exist, using default', logFile);
	}
	const transportOption: pino.LoggerOptions['transport'] =
		process.env.NODE_ENV === 'development'
			? undefined
			: {
					target: 'pino/file',
					options: { destination: logFile, append: true },
				};
	logger = pino({ ...globalPinoOpts, transport: transportOption });
	return logger;
};
