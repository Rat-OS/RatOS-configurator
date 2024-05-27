import pino from 'pino';
import { serverSchema } from '@/env/schema.mjs';
import { globalPinoOpts } from '@/helpers/logger';

let logger: pino.Logger | null = null;
export const getLogger = () => {
	if (logger != null) {
		return logger;
	}
	const environment = serverSchema.parse(process.env);
	const transportOption: pino.LoggerOptions['transport'] =
		process.env.NODE_ENV === 'development'
			? undefined
			: {
					target: 'pino/file',
					options: { destination: environment.LOG_FILE, append: true },
				};
	logger = pino({ ...globalPinoOpts, transport: transportOption });
	return logger;
};
