import { getHost } from '@/helpers/util';
import { MoonrakerDBItemResponse } from '@/moonraker/types';

interface Migration {
	version: number;
	description: string;
	up: () => Promise<{ result: string }>;
	down: () => Promise<{ result: string }>;
}

export const migrations: Migration[] = [
	{
		version: 1,
		description: "Undo double JSON encoding of RatOS's data",
		up: async () => {
			const res = await window.fetch(`http://${getHost()}/server/database/item?namespace=RatOS`);
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
						await window.fetch(`http://${getHost()}/server/database/item`, {
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
						await window.fetch(
							`http://${getHost()}/server/database/item?namespace=RatOS&key=${encodeURIComponent(key)}`,
							{
								method: 'DELETE',
								headers: {
									'Content-Type': 'application/json',
								},
								body: JSON.stringify({
									namespace: 'RatOS',
									key,
								}),
							},
						);
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
			const res = await window.fetch(`http://${getHost()}/server/database/item?namespace=RatOS`);
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
					await window.fetch(`http://${getHost()}/server/database/item`, {
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
	{
		version: 2,
		description: 'Change caramba printers to v-core-4 / v-chonk',
		up: async () => {
			const res = await window.fetch(`http://${getHost()}/server/database/item?namespace=RatOS`);
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
					if (key === 'Printer' && typeof value === 'string') {
						const migratedValue = value.replace(/caramba-chonk/g, 'v-chonk').replace(/caramba/g, 'v-core-4');
						if (migratedValue === value) {
							continue;
						}
						await window.fetch(`http://${getHost()}/server/database/item`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								namespace: 'RatOS',
								key: 'Printer',
								value: migratedValue,
							}),
						});
						result.push(`Migrated ${value} to ${migratedValue}`);
					}
				}
				return { result: `Succesfully migrated ${result.length} keys.\n${result.join('\n')}` };
			} else {
				return { result: 'Nothing to migrate' };
			}
		},
		down: async () => {
			const res = await window.fetch(`http://${getHost()}/server/database/item?namespace=RatOS`);
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
					if (key === 'Printer' && typeof value === 'string') {
						const migratedValue = value.replace(/v-chonk/g, 'caramba-chonk').replace(/v-core-4/g, 'caramba');
						if (migratedValue === value) {
							continue;
						}
						await window.fetch(`http://${getHost()}/server/database/item`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								namespace: 'RatOS',
								key: 'Printer',
								value: migratedValue,
							}),
						});
						result.push(`Migrated ${value} to ${migratedValue}`);
					}
				}
				return { result: `Succesfully migrated ${result.length} keys.\n${result.join('\n')}` };
			} else {
				return { result: 'Nothing to migrate' };
			}
		},
	},
];

export const getCurrentVersion = async (): Promise<number> => {
	const res = await window.fetch(`http://${getHost()}/server/database/item?namespace=RatOS&key=__db_version`);
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
	await window.fetch(`http://${getHost()}/server/database/item`, {
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
			.filter((m) => m.version > from && m.version <= to)
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
