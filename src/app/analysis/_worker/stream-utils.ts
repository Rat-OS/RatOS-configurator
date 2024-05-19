import { getLogger } from '@/app/_helpers/logger';
import { map } from 'rxjs';
export const log = (msg: string) =>
	map(<T>(x: T) => {
		// getLogger().debug(x, msg);
		console.log(x, msg);
		return x;
	});
