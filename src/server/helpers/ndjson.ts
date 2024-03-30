import { createReadStream, createWriteStream, existsSync, fstat, mkdirSync, writeFileSync } from 'fs';
import ndjson from 'ndjson';
import { replaceInFileByLine } from '@/server/helpers/file-operations';
import { z } from 'zod';
import path from 'path';
import { serverSchema } from '@/env/schema.mjs';
import { getLogger } from '@/server/helpers/logger';
import { unlink } from 'fs/promises';

const environment = serverSchema.parse(process.env);
const statsFile = path.join(environment.RATOS_DATA_DIR, 'object-storage.ndjson');

const requiredBaseSchema = z.object({ id: z.coerce.string().brand() });

const statsSchema = z.object({
	id: z.string().brand('ObjectStorageStatsID'),
	total: z.number().default(0),
	lastModifiedTimeStamp: z.number().nullable().default(null),
	lastAccessedTimeStamp: z.number().nullable().default(null),
	version: z.number().default(0),
});

const _baseObjectStorage = <
	T extends typeof requiredBaseSchema,
	Input extends z.input<T> = z.input<T>,
	Output extends z.output<T> = z.output<T>,
>(
	file: string,
	schema: T,
) => {
	if (!existsSync(file)) {
		mkdirSync(path.dirname(file), { recursive: true });
		writeFileSync(file, '');
	}
	const getAll = async (start: number = 0, limit: number = Infinity) => {
		return await readObjects(file, schema, start, limit);
	};
	const find = async (search: (input: Input) => boolean) => {
		return await findObject(file, schema, search);
	};
	const findById = async (id: Input['id'] | Input) => {
		return await findObject(file, schema, (input) => input.id === (typeof id === 'object' ? id.id : id));
	};
	const insert = async (obj: Input) => {
		const existing = await findById(obj);
		if (existing) {
			throw new Error(`Object with id ${obj.id} already exists`);
		}
		const result = await saveObject(file, schema, obj);
		return result;
	};
	const update = async (obj: Partial<Input>, id: Input['id']) => {
		const result = await replaceObjects(file, schema, (input) =>
			input.id === id ? schema.parse({ ...input, ...obj }) : input,
		);
		if (result === 0) {
			throw new Error(`Object with id ${id} found`);
		}
		return result;
	};
	const upsert = async (obj: Input, merge: boolean = false) => {
		let maybeMergedResult: Output = schema.parse(obj) as Output;
		const results = await replaceObjects<T, Output | Input, Input>(file, schema, (input) => {
			if (input.id === obj.id) {
				maybeMergedResult = schema.parse({ ...(merge === true ? input : {}), ...obj }) as Output;
				return maybeMergedResult;
			}
			return input;
		});
		if (results === 0) {
			return { updateCount: 0, result: await insert(obj) };
		}
		if (results > 1) {
			getLogger().warn(`Upserted more than one object with id ${obj.id}`);
		}
		return { updateCount: results, result: maybeMergedResult };
	};
	const transform = async <R extends typeof requiredBaseSchema>(transform: (input: Input) => z.output<R>) => {
		return await transformObjects(file, schema, transform);
	};
	const replace = async (replace: (input: Input) => Output) => {
		return await replaceObjects<T, Output, Input>(file, schema, replace);
	};
	const del = async (search: (input: Input) => boolean) => {
		return await replaceObjects<T, Output, Input>(file, schema, (input) =>
			search(input) ? null : (schema.parse(input) as Output),
		);
	};
	const destroyStorage = async () => {
		if (existsSync(file)) {
			await new Promise<void>((resolve, reject) => {
				unlink(file)
					.then(() => {
						getLogger().info(`Deleted object storage file: ${file}`);
						resolve();
					})
					.catch((e) => {
						getLogger().error(`Error deleting object storage file: ${file}: ${e instanceof Error ? e.message : e}`);
						reject(e);
					});
			});
		}
	};

	return {
		getAll,
		find,
		findById,
		insert,
		update,
		upsert,
		transform,
		replace,
		remove: del,
		destroyStorage,
	};
};

const logStatError = async <T extends () => Promise<any | null>, E extends boolean = false>(
	fn: T,
	ignoreErrors: E = false as E,
): Promise<E extends false ? Awaited<ReturnType<T>> : Awaited<ReturnType<T> | null>> => {
	try {
		return await fn();
	} catch (e) {
		getLogger().error(
			`Object storage stat update error: ${e instanceof Error ? e.message : e instanceof String ? e : 'Unknown error'}`,
		);
		if (!ignoreErrors) {
			throw e;
		}
	}
	return null as E extends false ? Awaited<ReturnType<T>> : Awaited<ReturnType<T> | null>;
};

export const initObjectStorage = <
	T extends typeof requiredBaseSchema,
	Input extends z.input<T>,
	Output extends z.output<T> = z.output<T>,
>(
	file: string,
	schema: T,
) => {
	const statsStorage = _baseObjectStorage(statsFile, statsSchema);
	const storage = _baseObjectStorage<T, Input>(file, schema);
	const getAll = async (start: number = 0, limit: number = Infinity) => {
		const result = await storage.getAll(start, limit);
		const stats = await logStatError(() =>
			statsStorage.upsert({ id: file, lastAccessedTimeStamp: new Date().getTime() }, true),
		);
		return {
			...result,
			total: stats.result.total,
		};
	};
	const find = async (search: (input: Input) => boolean) => {
		const result = await storage.find(search);
		await logStatError(
			() => statsStorage.upsert({ id: file, lastAccessedTimeStamp: new Date().getTime() }, true),
			true,
		);
		return result;
	};
	const findById = async (id: Input['id'] | Input) => {
		const result = await storage.findById(id);
		await logStatError(
			() => statsStorage.upsert({ id: file, lastAccessedTimeStamp: new Date().getTime() }, true),
			true,
		);
		return result;
	};
	const insert = async (obj: Input) => {
		const result = await storage.insert(obj);
		await logStatError(async () => {
			const stats = await statsStorage.find((stat) => stat.id === file);
			return statsStorage.upsert(
				{
					id: file,
					lastAccessedTimeStamp: new Date().getTime(),
					lastModifiedTimeStamp: new Date().getTime(),
					total: (stats?.total ?? 0) + 1,
				},
				true,
			);
		});
		return result;
	};
	const update = async (obj: Partial<Input>, id: Input['id']) => {
		const result = await storage.update(obj, id);
		await logStatError(() =>
			statsStorage.upsert(
				{ id: file, lastAccessedTimeStamp: new Date().getTime(), lastModifiedTimeStamp: new Date().getTime() },
				true,
			),
		);
		return result;
	};
	const upsert = async (obj: Input) => {
		const result = await storage.upsert(obj);
		await logStatError(async () => {
			const stats = await statsStorage.find((stat) => stat.id === file);
			return statsStorage.upsert(
				{
					id: file,
					lastAccessedTimeStamp: new Date().getTime(),
					lastModifiedTimeStamp: new Date().getTime(),
					total: (stats?.total ?? 0) + (result.updateCount === 0 ? 1 : 0),
				},
				true,
			);
		});
		return result;
	};
	const transform = async <R extends typeof requiredBaseSchema>(
		transform: (input: Input) => z.output<R>,
		version?: number,
	) => {
		const result = await storage.transform(transform);
		await logStatError(async () => {
			const stats: z.input<typeof statsSchema> = {
				id: file as z.infer<typeof statsSchema>['id'],
				lastAccessedTimeStamp: new Date().getTime(),
				lastModifiedTimeStamp: new Date().getTime(),
				total: result,
			};
			if (version != null) {
				stats.version = version;
			}
			return statsStorage.upsert(stats, true);
		});
		return result;
	};
	const replace = async (replace: (input: Input) => Output) => {
		const result = await storage.replace(replace);
		await logStatError(() =>
			statsStorage.upsert(
				{ id: file, lastAccessedTimeStamp: new Date().getTime(), lastModifiedTimeStamp: new Date().getTime() },
				true,
			),
		);
		return result;
	};
	const del = async (id: Input['id']) => {
		const result = await storage.remove((input) => input.id === id);
		await logStatError(async () => {
			const stats = await statsStorage.find((stat) => stat.id === file);
			return statsStorage.upsert({
				id: file,
				lastAccessedTimeStamp: new Date().getTime(),
				lastModifiedTimeStamp: new Date().getTime(),
				total: (stats?.total ?? 0) - result,
			});
		});
		return result;
	};
	const destroyStorage = async () => {
		await storage.destroyStorage();
		await statsStorage.remove((stat) => stat.id === file);
	};
	return {
		getAll,
		find,
		findById,
		insert,
		update,
		upsert,
		transform,
		replace,
		remove: del,
		destroyStorage,
	};
};

export const readObjects = async <T extends z.ZodSchema, Output = z.output<T>>(
	file: string,
	schema: T,
	start: number = 0,
	limit: number = Infinity,
) => {
	if (!existsSync(file)) {
		return {
			result: [],
			cursor: 0,
			hasNextPage: false,
		};
	}
	const stream = createReadStream(file, { encoding: 'utf-8', start });
	const availableBytes = stream.readableLength;

	const result: Output[] = [];

	stream.pipe(ndjson.parse()).on('data', function (obj) {
		try {
			result.push(schema.parse(obj));
			if (result.length >= limit) {
				stream.destroy();
			}
		} catch (e) {
			if (e instanceof z.ZodError) {
				getLogger().warn(e, `readObjects: Error parsing object from file ${file} at ${stream.bytesRead + start} bytes`);
			}
			throw e;
		}
	});

	await new Promise((resolve, reject) => {
		stream.on('close', resolve);
		stream.on('error', reject);
	});

	return {
		result,
		cursor: stream.bytesRead,
		hasNextPage: stream.bytesRead < availableBytes,
	};
};

export const findObject = async <T extends z.ZodSchema, Output = z.output<T>, Input = z.input<T>>(
	file: string,
	schema: T,
	search: (input: Output) => boolean,
): Promise<Output | null> => {
	if (!existsSync(file)) {
		return null;
	}
	const stream = createReadStream(file, { encoding: 'utf-8' });

	let result: Output | null = null;
	await new Promise((resolve, reject) => {
		stream.pipe(ndjson.parse()).on('data', function (obj) {
			try {
				const parsed = schema.parse(obj) as Output;
				if (search(parsed)) {
					result = parsed;
					stream.destroy();
				}
			} catch (e) {
				if (e instanceof z.ZodError) {
					getLogger().warn(e, `findObject: Error parsing object from file ${file}`);
				}
				throw e;
			}
		});
		stream.on('close', resolve);
		stream.on('error', reject);
	});
	return result;
};

export const saveObject = async <T extends z.ZodSchema, Output = z.output<T>, Input = z.input<T>>(
	file: string,
	schema: T,
	obj: Input,
) => {
	const writeStream = createWriteStream(file, {
		flags: 'a+',
		encoding: 'utf-8',
	});
	const validated = schema.parse(obj);
	var serialize = ndjson.stringify();
	serialize.pipe(writeStream);
	serialize.write(validated);
	serialize.end();

	await new Promise((resolve, reject) => {
		writeStream.on('close', resolve);
		writeStream.on('error', reject);
	});

	return validated as Output;
};

export const transformObjects = async <
	T extends z.ZodSchema,
	R extends z.ZodSchema,
	Output = z.output<R>,
	Input = z.input<T>,
>(
	file: string,
	schema: T,
	transform: (input: Input) => Output,
) => {
	if (!existsSync(file)) {
		throw new Error('File does not exist: ' + file);
	}
	return await replaceInFileByLine(file, (line, lineNumber) => {
		try {
			const obj = schema.parse(JSON.parse(line));
			return JSON.stringify(transform(obj));
		} catch (e) {
			if (e instanceof z.ZodError) {
				getLogger().warn(
					e,
					`transformObjects: Error parsing line ${lineNumber} of ${file}: ${e instanceof Error ? e.message : e}`,
				);
				return line;
			}
			throw e;
		}
	});
};

export const replaceObjects = async <T extends z.ZodSchema, Output = z.output<T>, Input = z.input<T>>(
	file: string,
	schema: T,
	replace: (input: Input) => Output | null,
) => {
	if (!existsSync(file)) {
		throw new Error('File does not exist: ' + file);
	}
	const results = await replaceInFileByLine(file, (line, lineNumber) => {
		try {
			const obj = schema.parse(JSON.parse(line));
			return JSON.stringify(replace(obj));
		} catch (e) {
			if (e instanceof z.ZodError) {
				getLogger().warn(
					e,
					`replaceObjects: Error parsing line ${lineNumber} of ${file}: ${e instanceof Error ? e.message : e}`,
				);
				return line;
			}
			throw e;
		}
	});
	return results;
};
