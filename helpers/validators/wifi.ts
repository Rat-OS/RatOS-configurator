import { z } from 'zod';

export const hostnameInput = z.object({
	hostname: z
		.string()
		.min(2)
		.regex(/^([a-zA-Z0-9]|-)+$/, 'Hostname can only include a-Z, 0-9 and dashes.'),
});

export const joinInput = z.object({
	ssid: z.string(),
	passphrase: z.string().min(8).max(63),
	country: z.string().optional(),
});
