import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	test: {
		dir: '__tests__',
		globalSetup: './test-setup.ts',
		coverage: {
			enabled: process.env.argv?.includes('--coverage'),
			// you can include other reporters, but 'json-summary' is required, json is recommended
			reporter: ['text', 'json-summary', 'json'],
			// If you want a coverage reports even if your tests are failing, include the reportOnFailure option
			reportOnFailure: true,
			include: ['**/*'],
			exclude: ['__tests__/*', '*.*', 'env/*', 'app/**/*', 'components/**/*', 'pages/**/*'],
		},
	},
	plugins: [tsconfigPaths()],
});
