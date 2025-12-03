import { loadEnvironment, resetEnvironment } from '@/server/helpers/utils';

export const setup = () => {
	// Set NODE_ENV to test if not already set
	if (!process.env.NODE_ENV) {
		(process.env as any).NODE_ENV = 'test';
	}

	// Reset environment loading state to ensure fresh load
	resetEnvironment();

	// Use the enhanced loadEnvironment function that handles test environment
	try {
		loadEnvironment();
	} catch (error) {
		// If environment loading fails, continue with existing process.env
		// This allows tests to run even if .env files are missing
		console.warn('Warning: Could not load environment file, using existing process.env');
	}
};
