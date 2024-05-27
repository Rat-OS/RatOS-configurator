import { LoggerOptions } from 'pino';

export const globalPinoOpts: LoggerOptions = {
	timestamp: true,
	level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
};
