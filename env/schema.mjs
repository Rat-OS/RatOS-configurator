// @ts-check
import { z } from 'zod';

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
	USER: z.string().default('pi'),
	NODE_ENV: z.enum(['development', 'test', 'production']),
	RATOS_CONFIGURATION_PATH: z.string(),
	RATOS_SCRIPT_DIR: z.string(),
	KLIPPER_CONFIG_PATH: z.string(),
	KLIPPER_DIR: z.string(),
	KLIPPER_ENV: z.string(),
	MOONRAKER_DIR: z.string(),
	LOG_FILE: z.string(),
	RATOS_DATA_DIR: z.string(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
	NEXT_PUBLIC_KLIPPER_HOSTNAME: z.string().optional(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
	NEXT_PUBLIC_KLIPPER_HOSTNAME: process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME,
};
