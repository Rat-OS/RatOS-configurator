export const register = async () => {
	if (process.env.NEXT_RUNTIME === 'nodejs') {
		const { existsSync, mkdirSync } = await import('fs');
		const { regenerateKlipperConfiguration } = await import('./server/routers/printer');
		const { serverSchema } = await import('./env/schema.mjs');
		const dns = await import('dns');
		dns.setDefaultResultOrder('ipv4first');

		const environment = serverSchema.parse(process.env);
		const dataDir = environment.RATOS_DATA_DIR;
		if (!existsSync(dataDir)) {
			console.log('Creating RatOS data directory..');
			mkdirSync(dataDir);
		}
		console.log('Regenerating last known config');
		try {
			await regenerateKlipperConfiguration();
		} catch (e) {
			if (e instanceof Error) {
				console.log('Failed to regenerate config: ', e.message);
			}
		}
	}
};
