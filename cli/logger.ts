import { pino } from 'pino';
import { serverSchema } from '@/env/schema.mjs';
import { globalPinoOpts } from '@/helpers/logger.js';
import dotenv from 'dotenv';
import { existsSync, readFileSync } from 'fs';

let logger: pino.Logger | null = null;
const envFile = existsSync('./.env.local') ? readFileSync('.env.local') : readFileSync('.env');
export const getLogger = () => {
	if (logger != null) {
		return logger;
	}
	const environment = serverSchema.parse({ NODE_ENV: 'production', ...dotenv.parse(envFile) });
	const transportOption: pino.LoggerOptions['transport'] =
		process.env.NODE_ENV === 'development'
			? undefined
			: {
					target: 'pino/file',
					options: { destination: environment.LOG_FILE, append: true },
				};
	logger = pino({ ...globalPinoOpts, transport: transportOption }).child({ source: 'cli' });
	return logger;
};
