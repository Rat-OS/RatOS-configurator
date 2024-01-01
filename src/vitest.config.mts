import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		dir: '__tests__',
		globalSetup: './test-setup.ts',
	},
});
