import { MoonrakerDBItemResponse } from './types';

interface Migration {
	version: number;
	description: string;
	up: () => Promise<{ result: string }>;
	down: () => Promise<{ result: string }>;
}
const host =
	process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME != null && process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME.trim() != ''
		? process.env.NEXT_PUBLIC_KLIPPER_HOSTNAME
		: typeof window !== 'undefined'
			? window.location.hostname
			: '';
export const migrations: Migration[] = [
	{
		version: 1,
		description: "Undo double JSON encoding of RatOS's data",
		up: async () => {
			const res = await window.fetch(`http://${host}/server/database/item?namespace=RatOS`);
			if (res.ok) {
				const data = (await res.json()) as
					| { result: MoonrakerDBItemResponse<{ [key: string]: unknown }> }
					| { error: { message: string } };
				if ('error' in data) {
					throw new Error(data.error.message);
				}
				const result: string[] = [];
				if (data.result.value == null) {
					return { result: 'Nothing to migrate' };
				}
				for await (const [key, value] of Object.entries(data.result.value)) {
					try {
						const parsed = JSON.parse(value as any);
						console.log('Migrating', key, 'from', value, 'to', parsed);
						await window.fetch(`http://${host}/server/database/item`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								namespace: 'RatOS',
								key,
								value: parsed,
							}),
						});
					} catch (e) {
						console.error('Error migrating', key, value, 'clearing key');
						await window.fetch(`http://${host}/server/database/item?namespace=RatOS&key=${encodeURIComponent(key)}`, {
							method: 'DELETE',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								namespace: 'RatOS',
								key,
							}),
						});
						continue;
					}
				}
				return { result: `Succesfully decoded ${result.length} keys.\n${result.join('\n')}` };
			} else {
				return { result: 'Nothing to migrate' };
			}
		},
		down: async () => {
			// drop table
			const res = await window.fetch(`http://${host}/server/database/item?namespace=RatOS`);
			if (res.ok) {
				const data = (await res.json()) as
					| { result: MoonrakerDBItemResponse<{ [key: string]: unknown }> }
					| { error: { message: string } };
				if ('error' in data) {
					throw new Error(data.error.message);
				}
				if (data.result.value == null) {
					return { result: 'Nothing to migrate' };
				}
				const result: string[] = [];
				for await (const [key, value] of Object.entries(data.result.value)) {
					const encoded = JSON.stringify(value as any);
					await window.fetch(`http://${host}/server/database/item`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							namespace: 'RatOS',
							key,
							value: encoded,
						}),
					});
					result.push(`Re-encoded ${key}`);
				}
				return { result: `Succesfully re-encoded ${result.length} keys.\n${result.join('\n')}` };
			}
			return { result: 'Nothing to migrate' };
		},
	},
];

export const getCurrentVersion = async (): Promise<number> => {
	const res = await window.fetch(`http://${host}/server/database/item?namespace=RatOS&key=__db_version`);
	if (res.ok) {
		const data = (await res.json()) as { result: MoonrakerDBItemResponse<number> } | { error: { message: string } };
		if ('error' in data) {
			return 0;
		}
		return data.result.value as number;
	}
	return 0;
};

export const setCurrentVersion = async (version: number) => {
	await window.fetch(`http://${host}/server/database/item`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			namespace: 'RatOS',
			key: '__db_version',
			value: version,
		}),
	});
};

let isMigrating = false;
export const migrate = async (from: number, to: number) => {
	if (isMigrating) {
		return console.log('Already migrating, ignoring..');
	}
	if (from === to) {
		return console.log('Already at target version');
	}
	isMigrating = true;
	try {
		const migrationsToRun = migrations
			.filter((m) => m.version >= from && m.version <= to)
			.sort((a, b) => (from <= to ? a.version - b.version : b.version - a.version));
		for await (const migration of migrationsToRun) {
			const result = await (from < to ? migration.up() : migration.down());
			console.log(`Migrated to version ${migration.version}: ${result.result}`);
		}
		await setCurrentVersion(to);
	} finally {
		isMigrating = false;
	}
};

let isMigrated = false;
export const migrateToLatest = async () => {
	if (isMigrated) {
		return console.log('Already migrated, ignoring..');
	}
	const currentVersion = await getCurrentVersion();
	const latestVersion = Math.max(...migrations.map((m) => m.version));
	if (currentVersion === latestVersion) {
		console.log('Already at latest version');
		return;
	}
	if (isMigrating) {
		console.log('Already migrating, ignoring..');
		return;
	}
	console.log('Migrating to latest version...', currentVersion, latestVersion);
	await migrate(currentVersion, latestVersion);
	isMigrated = true;
	console.log('Migration complete.');
};
