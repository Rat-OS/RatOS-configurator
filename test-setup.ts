import dotenv from 'dotenv';
import { existsSync } from 'fs';

export const setup = () => {
	if (existsSync('./.env.test.local')) {
		dotenv.config({ path: './.env.test.local' });
	}
};
