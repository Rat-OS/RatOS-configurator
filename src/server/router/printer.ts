import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { getLogger } from '../../helpers/logger';
import * as trpc from '@trpc/server';
import { exec } from 'child_process';
import { promisify } from 'util';

import { serverSchema } from '../../env/schema.mjs';
import { parseMetadata } from '../../helpers/parseMetadata';

const environment = serverSchema.parse(process.env);

const Hotend = z.object({
	type: z.literal('hotend'),
	title: z.string(),
	thermistor: z.enum([
		'EPCOS 100K B57560G104F',
		'ATC Semitec 104GT-2',
		'ATC Semitec 104NT-4-R025H42G',
		'Generic 3950',
		'Honeywell 100K 135-104LAG-J01',
		'NTC 100K MGB18-104F39050L32',
		'SliceEngineering 450',
		'TDK NTCG104LH104JT1',
		'PT1000',
	]),
});

const HotendWithPath = Hotend.extend({
	path: z.string().startsWith(environment.RATOS_CONFIGURATION_PATH).endsWith('.cfg'),
});

export const printerRouter = trpc.router().query('hotends', {
	output: z.array(HotendWithPath),
	resolve: async () => {
		const defs = await promisify(exec)(`ls ${process.env.RATOS_CONFIGURATION_PATH}/hotends/*.cfg`);
		return defs.stdout.split('\n').map((f) => {
			const parsedHotend = parseMetadata(f, Hotend);
			if (parsedHotend == null) {
				getLogger().error(`Failed to parse hotend definition ${f}`);
				throw new TRPCError({
					code: 'INTERNAL_SERVER_ERROR',
					message: `Failed to parse hotend definition ${f}`,
				});
			}
			return { ...parsedHotend, path: f };
		});
	},
});
