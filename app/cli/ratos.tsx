import { program } from '@/cli/commands';
import { getLogger } from '@/cli/logger';
import { loadEnvironment } from '@/cli/util';

loadEnvironment();
try {
	await program.parseAsync();
} catch (e) {
	if (e instanceof Error) {
		getLogger().error(e, e.message);
		program.error('Error: ' + e.message, { exitCode: 1 });
	}
	getLogger().error(e);
	program.error('An unexpected error occurred', { exitCode: 1 });
}
