import { z } from 'zod';
import { Nozzle } from '../zods/hardware';

export const getDefaultNozzle = () => {
	return { diameter: 0.4, type: 'Regular' } satisfies z.infer<typeof Nozzle>;
};
