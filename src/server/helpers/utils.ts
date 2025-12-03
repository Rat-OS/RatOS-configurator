import { serverSchema } from '@/env/schema.mjs';
import { existsSync, readFileSync } from 'node:fs';
import dotenv from 'dotenv';
import path from 'node:path';

let alreadyLoaded = false;

export function resetEnvironment() {
	alreadyLoaded = false;
}
export function loadEnvironment(filePath?: string) {
	if (alreadyLoaded) {
		return serverSchema.parse(process.env);
	}

	let envFilePath: string;

	if (filePath) {
		// Use explicitly provided file path
		envFilePath = filePath;
	} else if (process.env.NODE_ENV === 'test') {
		// In test environment, prioritize test-specific files
		if (existsSync('./.env.test.local')) {
			envFilePath = './.env.test.local';
		} else if (existsSync('./.env.test')) {
			envFilePath = './.env.test';
		} else if (existsSync('./.env.local')) {
			envFilePath = './.env.local';
		} else {
			envFilePath = './.env';
		}
	} else {
		// In production/development, use standard files
		envFilePath = existsSync('./.env.local') ? '.env.local' : '.env';
	}

	if (!existsSync(envFilePath)) {
		throw new Error(`Environment file ${path.resolve(envFilePath)} not found`);
	}

	const envFile = readFileSync(envFilePath, 'utf8');
	const defaultNodeEnv = process.env.NODE_ENV === 'test' ? 'test' : 'production';
	const env = serverSchema.parse({ NODE_ENV: defaultNodeEnv, ...dotenv.parse(envFile) });
	dotenv.populate(process.env as any, env, { override: true });
	alreadyLoaded = true;
	return env;
}

export function reloadEnvironment(filePath?: string) {
	resetEnvironment();
	return loadEnvironment(filePath);
}
