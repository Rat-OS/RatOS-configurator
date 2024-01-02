export const register = async () => {
	if (process.env.NEXT_RUNTIME === 'nodejs') {
		const { getLogger } = await import('./server/helpers/logger');
		const { existsSync, mkdirSync } = await import('fs');
		const { regenerateKlipperConfiguration } = await import('./server/routers/printer');
		const { serverSchema } = await import('./env/schema.mjs');
		const { symlinkKlippyExtensions } = await import('./server/routers/klippy-extensions');
		const { symlinkMoonrakerExtensions } = await import('./server/routers/moonraker-extensions');
		const dns = await import('dns');
		dns.setDefaultResultOrder('ipv4first');
		const logger = getLogger();

		const environment = serverSchema.parse(process.env);
		const dataDir = environment.RATOS_DATA_DIR;
		if (!existsSync(dataDir)) {
			logger.info('Creating RatOS data directory..');
			mkdirSync(dataDir);
		}
		try {
			logger.info('Symlinking klippy extensions...');
			logger.info(await symlinkKlippyExtensions());
		} catch (e) {
			if (e instanceof Error) {
				logger.error(`Failed to symlink klippy extensions: ${e.message}`);
			}
		}
		try {
			logger.info('Symlinking moonraker extensions...');
			logger.info(await symlinkMoonrakerExtensions());
		} catch (e) {
			if (e instanceof Error) {
				logger.error(`Failed to symlink moonraker extensions: ${e.message}`);
			}
		}
		try {
			logger.info('Regenerating last known config...');
			await regenerateKlipperConfiguration();
			logger.info('Config regenerated!');
		} catch (e) {
			if (e instanceof Error) {
				logger.error(`Failed to regenerate config: ${e.message}`);
			}
		}
	}
};
