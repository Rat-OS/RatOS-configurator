import pino from 'pino';
import pretty from 'pino-pretty';
import { serverSchema } from '../../env/schema.mjs';

const stream = pretty({
	levelFirst: true,
	colorize: true,
	ignore: 'time,hostname,pid',
});

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
	logger = pino({ timestamp: true, transport: transportOption });
	return logger;
};
