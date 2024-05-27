/**
 * @file ndjson.ts
 * @description
 * This file contains helper functions for reading, writing, and transforming newline delimited JSON files.
 * The functions in this file are used to create object storage with common CRUD operations.
 * The object storage is used to store and manage data in a file using newline delimited JSON format.
 * The object storage can be initialized with a Zod schema to validate the objects in the storage.
 * The object storage also provides a destroyStorage operation to delete the storage file.
 *
 * @author Mikkel Schmidt <mikkel.schmidt@gmail.com>
 * @license MIT
 * @copyright 2024
 */

import { createReadStream, createWriteStream, existsSync, mkdirSync, writeFileSync } from 'fs';
import { replaceInFileByLine } from '@/server/helpers/file-operations';
import { z } from 'zod';
import path from 'path';
import { serverSchema } from '@/env/schema.mjs';
import { getLogger } from '@/server/helpers/logger';
import { stat, unlink } from 'fs/promises';
import split from 'split2';
import { EOL } from 'os';

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

export const fileLocks = new Map<string, (() => void)[]>();

export const lock = async (file: string, timeout: number = 1000) => {
	if (!fileLocks.has(file)) {
		fileLocks.set(file, []);
		return;
	}
	const timeoutError = new Error(
		`File lock timeout of ${timeout}ms reached, make sure to release the locks you claim on ${file}`,
	);
	return new Promise<void>((resolve, reject) => {
		fileLocks.get(file)?.push(resolve);
		setTimeout(() => {
			reject(timeoutError);
		}, timeout);
	});
};

export const release = (file: string) => {
	const locks = fileLocks.get(file);
	if (locks) {
		const resolve = locks.shift();
		if (resolve) {
			resolve();
		}
		if (locks.length === 0) {
			fileLocks.delete(file);
		}
	}
};

/**
 * Initializes a base object storage using newline delimited json with common CRUD operations.
 *
 * @template T - The Zod schema type.
 * @template Input - The inferred input type for the schema.
 * @template Output - The inferred output type of schema.parse().
 * @param {string} file - The file path for the object storage.
 * @param {T} schema - The schema for the objects in the storage.
 * @returns {Object} - An object with CRUD operations for the object storage.
 */
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

	/**
	 * Retrieves all objects from the database.
	 *
	 * @param start - The starting index of the objects to retrieve. Defaults to 0.
	 * @param limit - The maximum number of objects to retrieve. Defaults to Infinity.
	 * @returns A promise that resolves to an array of objects.
	 */
	const getAll = async (start: number = 0, limit: number = Infinity) => {
		return await readObjects(file, schema, undefined, start, limit);
	};

	/**
	 * Finds the first object in the file that matches the given search criteria.
	 *
	 * @param search - A function that takes an input object and returns a boolean indicating whether it matches the search criteria.
	 * @returns A promise that resolves to the matching object, or null if no match is found.
	 */
	const find = async (search: (input: Output) => boolean) => {
		return await findObject(file, schema, search);
	};

	/**
	 * Finds all objects in the file that match the given search criteria.
	 *
	 * @param search - A function that takes an input object and returns a boolean indicating whether it matches the search criteria.
	 * @param limit - The maximum number of objects to find.
	 * @returns A promise that resolves to the matching objects.
	 */
	const findAll = async (search: (input: Output) => boolean, limit: number = Infinity) => {
		return await findAllObjects(file, schema, search, undefined, limit);
	};

	/**
	 * Finds an object in the file by its ID.
	 * @param id - The ID of the object to find.
	 * @returns A promise that resolves to the found object, or null if not found.
	 */
	const findById = async (id: Input['id'] | Input) => {
		return await findObject(file, schema, (input) => input.id === (typeof id === 'object' ? id.id : id));
	};

	/**
	 * Inserts a new object into the database.
	 *
	 * @param obj - The object to be inserted.
	 * @returns A promise that resolves to the inserted object.
	 * @throws An error if an object with the same id already exists.
	 */
	const insert = async (obj: Input) => {
		const existing = await findById(obj);
		if (existing) {
			throw new Error(`Object with id ${obj.id} already exists`);
		}
		const result = await saveObject(file, schema, obj);
		return result;
	};

	/**
	 * Updates an object in the file with the specified ID.
	 *
	 * @param obj - The partial object containing the properties to update.
	 * @param id - The ID of the object to update.
	 * @returns The number of objects updated.
	 * @throws Error if no object with the specified ID is found.
	 */
	const update = async (obj: Partial<Input>, id: Input['id']) => {
		let found = false;
		const result = await replaceObjects(file, schema, (input) => {
			if (input.id === id) {
				found = true;
				return schema.parse({ ...input, ...obj });
			}
			return input;
		});
		if (!found) {
			throw new Error(`Object with id ${id} not found`);
		}
		if (result.linesChanged === 0) {
			getLogger().warn(obj, `Update to object with id ${id} resulted in no changes`);
		}
		return result;
	};

	/**
	 * Upserts an object into a file, either by updating an existing object with the same id or inserting a new object.
	 * @param obj - The object to upsert.
	 * @param merge - Optional. If true, the properties of the existing object will be merged with the new object.
	 * @returns An object containing the update count and the upserted result.
	 */
	const upsert = async (obj: Input, merge: boolean = false) => {
		let maybeMergedResult: Output = schema.parse(obj) as Output;
		let found = false;
		const results = await replaceObjects<T, Output | Input, Input>(file, schema, (input) => {
			if (input.id === obj.id) {
				found = true;
				maybeMergedResult = schema.parse({ ...(merge === true ? input : {}), ...obj }) as Output;
				return maybeMergedResult;
			}
			return input;
		});
		if (!found) {
			return { updateCount: 0, result: await insert(obj) };
		}
		if (results.linesChanged > 1) {
			getLogger().warn(`Upserted more than one object with id ${obj.id}`);
		}
		return { updateCount: results, result: maybeMergedResult };
	};

	/**
	 * Transforms the input objects using the provided transform function.
	 *
	 * @param transform - The transform function to apply to the input objects.
	 * @returns A promise that resolves to the transformed objects.
	 */
	const transform = async <R extends typeof requiredBaseSchema>(transform: (input: Input) => z.output<R>) => {
		return await transformObjects(file, schema, transform);
	};

	/**
	 * Replaces objects in a file using the provided replace function.
	 *
	 * @param replace - The replace function to be applied to each object.
	 * @returns A promise that resolves to the result of the replace operation.
	 */
	const replace = async (replace: (input: Input) => Output) => {
		return await replaceObjects<T, Output, Input>(file, schema, replace);
	};

	/**
	 * Deletes objects from a file based on a search condition.
	 *
	 * @param search - A function that takes an input object and returns a boolean indicating whether the object should be deleted.
	 * @returns A promise that resolves to the result of replacing the objects in the file.
	 */
	const del = async (search: (input: Input) => boolean) => {
		const found: Input[] = [];
		const result = await replaceObjects<T, Output, Input>(file, schema, (input) => {
			if (search(input)) {
				found.push(input);
				return null;
			}
			return schema.parse(input) as Output;
		});
		return {
			found,
			...result,
		};
	};

	/**
	 * Deletes the object storage file if it exists.
	 *
	 * @returns A promise that resolves when the file is deleted, or rejects with an error if deletion fails.
	 */
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
		findAll,
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

/**
 * Initializes an object storage with common CRUD operations.
 * @param {string} file - The file path for the object storage.
 * @param {T} schema - The required base Zod schema for the object storage.
 * @returns {Object} - An object with CRUD operations for the object storage.
 */
export const initObjectStorage = <
	T extends typeof requiredBaseSchema,
	Input extends z.input<T>,
	Output extends z.output<T> = z.output<T>,
>(
	file: string,
	schema: T,
) => {
	const statsStorage = _baseObjectStorage(statsFile, statsSchema);
	const storage = _baseObjectStorage<T, Input, Output>(file, schema);

	/**
	 * Retrieves all items from storage within the specified range.
	 *
	 * @param start - The starting index of the items to retrieve. Defaults to 0.
	 * @param limit - The maximum number of items to retrieve. Defaults to Infinity.
	 * @returns An object containing the retrieved items and the total count of items in storage.
	 */
	const getAll = async (start: number = 0, limit: number = Infinity) => {
		const result = await storage.getAll(start, limit);
		const stats = await logStatError(
			async () => await statsStorage.upsert({ id: file, lastAccessedTimeStamp: new Date().getTime() }, true),
		);
		return {
			...result,
			total: stats.result.total,
		};
	};

	/**
	 * Finds the first item in the storage that match the given search criteria.
	 *
	 * @param search - A function that takes an input and returns a boolean indicating whether the input matches the search criteria.
	 * @returns A promise that resolves to the items found in the storage.
	 */
	const find = async (search: (input: Output) => boolean) => {
		const result = await storage.find(search);
		return result;
	};

	/**
	 * Finds a record by its ID.
	 *
	 * @param id - The ID of the record to find.
	 * @returns A Promise that resolves to the found record.
	 */
	const findById = async (id: Input['id'] | Input) => {
		const result = await storage.findById(id);
		return result;
	};

	/**
	 * Finds all items in the storage that match the given search criteria.
	 *
	 * @param search - A function that takes an input and returns a boolean indicating whether the input matches the search criteria.
	 * @param limit - The maximum number of items to find.
	 * @returns A promise that resolves to the items found in the storage.
	 */
	const findAll = async (search: (input: Output) => boolean, limit: number = Infinity) => {
		const result = await storage.findAll(search, limit);
		return result;
	};

	/**
	 * Inserts an object into storage and updates the corresponding statistics.
	 * @param obj - The object to be inserted.
	 * @returns A promise that resolves to the result of the insertion.
	 */
	const insert = async (obj: Input) => {
		const result = await storage.insert(obj);
		await logStatError(async () => {
			const stats = await statsStorage.find((stat) => stat.id === file);
			return await statsStorage.upsert(
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

	/**
	 * Updates an object in the storage with the specified ID.
	 *
	 * @param obj - The partial object containing the updated values.
	 * @param id - The ID of the object to update.
	 * @returns An object containing the update count and the updated result.
	 */
	const update = async (obj: Partial<Input>, id: Input['id']) => {
		const result = await storage.update(obj, id);
		await logStatError(
			async () =>
				await statsStorage.upsert(
					{ id: file, lastAccessedTimeStamp: new Date().getTime(), lastModifiedTimeStamp: new Date().getTime() },
					true,
				),
		);
		return { updateCount: result, result: await storage.findById(id) };
	};

	/**
	 * Upserts an object into storage and updates the corresponding statistics.
	 * @param obj - The object to upsert.
	 * @returns A promise that resolves to the result of the upsert operation.
	 */
	const upsert = async (obj: Input) => {
		const result = await storage.upsert(obj);
		await logStatError(async () => {
			const stats = await statsStorage.find((stat) => stat.id === file);
			return await statsStorage.upsert(
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

	/**
	 * Transforms the each entry in the database using the provided transform function and stores the result in the storage.
	 * Also updates the statistics for the transformed data.
	 * @param transform - The transform function to apply to the input data.
	 * @param version - The version of the transformed data (optional).
	 * @returns The transformed result.
	 */
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
				total: result.linesTotal - result.linesDeleted,
			};
			if (version != null) {
				stats.version = version;
			}
			return await statsStorage.upsert(stats, true);
		});
		return result;
	};

	/**
	 * Replaces the input data using the provided replace function.
	 *
	 * @param replace - The function used to replace the input data.
	 * @returns A Promise that resolves to the result of the replacement.
	 */
	const replace = async (replace: (input: Input) => Output) => {
		const result = await storage.replace(replace);
		await logStatError(
			async () =>
				await statsStorage.upsert(
					{ id: file, lastAccessedTimeStamp: new Date().getTime(), lastModifiedTimeStamp: new Date().getTime() },
					true,
				),
		);
		return result;
	};

	/**
	 * Deletes an item from storage based on its ID.
	 * @param id The ID of the item to be deleted.
	 * @returns The number of items deleted.
	 */
	const del = async (id: Input['id']) => {
		const result = await storage.remove((input) => input.id === id);
		await logStatError(async () => {
			const stats = await statsStorage.find((stat) => stat.id === file);
			return await statsStorage.upsert({
				id: file,
				lastAccessedTimeStamp: new Date().getTime(),
				lastModifiedTimeStamp: new Date().getTime(),
				total: (stats?.total ?? 0) - result.linesDeleted,
			});
		});
		return result;
	};

	/**
	 * Deletes all item from storage that are contained within `ids`.
	 * @param ids The IDs of the items to be deleted.
	 * @returns The number of items deleted.
	 */
	const delAll = async (ids: Input['id'][]) => {
		const result = await storage.remove((input) => ids.includes(input.id));
		await logStatError(async () => {
			const stats = await statsStorage.find((stat) => stat.id === file);
			return await statsStorage.upsert({
				id: file,
				lastAccessedTimeStamp: new Date().getTime(),
				lastModifiedTimeStamp: new Date().getTime(),
				total: (stats?.total ?? 0) - result.linesDeleted,
			});
		});
		return result;
	};

	/**
	 * Destroys the storage and removes the corresponding stats entry.
	 * @returns The total number of destroyed items.
	 */
	const destroyStorage = async () => {
		await storage.destroyStorage();
		const total = (await statsStorage.findById(file))?.total ?? 0;
		await statsStorage.remove((stat) => stat.id === file);
		return total;
	};
	return {
		getAll,
		find,
		findAll,
		findById,
		insert,
		update,
		upsert,
		transform,
		replace,
		remove: del,
		removeAll: delAll,
		destroyStorage,
	};
};

/**
 * Reads objects from a file and parses them using a given schema.
 *
 * @template T - The type of the schema.
 * @template Output - The output type after parsing the objects.
 * @param {string} file - The path to the file to read.
 * @param {T} schema - The schema to use for parsing the objects.
 * @param {(obj: Output) => void | false} onObject - The function to call for each object read from the file. If the function returns false, the read operation will be stopped.
 * @param {number} [start=0] - The starting position in bytes, in the file to read from.
 * @param {number} [limit=Infinity] - The maximum number of objects to read.
 * @returns {Promise<{
 *   result: Output[];
 *   cursor: number;
 *   hasNextPage: boolean;
 * }>} - The result of reading and parsing the objects.
 */
export const readObjects = async <T extends z.ZodSchema, Output = z.output<T>>(
	file: string,
	schema: T,
	onObject: (obj: Output) => void | false = () => {},
	start: number = 0,
	limit: number = Infinity,
): Promise<{
	result: Output[];
	cursor: number;
	hasNextPage: boolean;
}> => {
	if (!existsSync(file)) {
		return {
			result: [],
			cursor: 0,
			hasNextPage: false,
		};
	}
	const stream = createReadStream(file, { encoding: 'utf-8', start, highWaterMark: 1 * 1024 * 1024 });
	const availableBytes = (await stat(file)).size - start;

	const result: Output[] = [];
	const toLines = split();
	let bytesParsed = 0;
	function processLine(line: Buffer) {
		if (result.length >= limit) {
			stream.destroy();
			toLines.destroy();
			return false;
		}
		let obj: unknown = null;
		try {
			obj = JSON.parse(line.toString());
		} catch {
			getLogger().warn(
				line.toString(),
				`readObjects: Error parsing json from file ${file} at ${stream.bytesRead + start} bytes`,
			);
		}
		if (obj == null) {
			return true;
		}
		try {
			result.push(schema.parse(obj));
			bytesParsed += line.byteLength;
			if (onObject(result[result.length - 1]) === false) {
				stream.destroy();
				toLines.destroy();
				return false;
			}
		} catch (e) {
			if (e instanceof z.ZodError) {
				getLogger().warn(
					e,
					`readObjects: Error validating object from file ${file} at ${stream.bytesRead + start} bytes`,
				);
			}
			throw e;
		}
		return true;
	}
	function processFile() {
		let ok = true;
		let chunk: Buffer | null = null;
		while (ok && stream.readable && (chunk = stream.read()) !== null) {
			ok = toLines.write(chunk);
		}
		if (!ok && stream.readable) {
			toLines.once('drain', processFile);
			return;
		}
		let line: string | null = null;
		while (toLines.readable && (line = toLines.read()) !== null) {
			processLine(Buffer.from(line + EOL));
		}
	}
	stream.on('readable', processFile);
	stream.on('close', () => {
		toLines.end();
		processFile();
	});

	toLines.on('error', (e) => {
		getLogger().error(e, `readObjects: Error reading object from file ${file} at ${bytesParsed + start} bytes`);
		throw e;
	});

	await new Promise((resolve, reject) => {
		toLines.on('close', resolve);
		stream.on('error', reject);
		toLines.on('error', reject);
	});
	return {
		result,
		cursor: bytesParsed + start,
		hasNextPage: bytesParsed < availableBytes,
	};
};

/**
 * Finds an object in a file using a specified schema and search function.
 *
 * @param file - The path to the file.
 * @param schema - The schema to validate the objects in the file.
 * @param search - The search function to determine if an object matches the search criteria.
 * @returns A promise that resolves to the found object or `null` if no object is found.
 */
export const findObject = async <T extends z.ZodSchema, Output = z.output<T>, Input = z.input<T>>(
	file: string,
	schema: T,
	search: (input: Output) => boolean,
): Promise<Output | null> => {
	let result: Output | null = null;
	await readObjects(file, schema, (obj) => {
		if (search(obj)) {
			result = obj;
			return false; // Destroy the stream
		}
	});
	return result;
};

/**
 * Finds all objects in a file using a specified schema and search function.
 *
 * @param file - The path to the file.
 * @param schema - The schema to validate the objects in the file.
 * @param search - The search function to determine if an object matches the search criteria.
 * @param limit - The maximum number of objects to find.
 *
 */
export const findAllObjects = async <T extends z.ZodSchema, Output = z.output<T>, Input = z.input<T>>(
	file: string,
	schema: T,
	search: (input: Output) => boolean,
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
	let result: Output[] = [];
	const reader = await readObjects(
		file,
		schema,
		(obj) => {
			if (search(obj)) {
				result.push(obj);
			}
			if (result.length >= limit) {
				return false;
			}
		},
		start,
	);
	return {
		...reader,
		result,
	};
};

/**
 * Saves an object to a file in NDJSON format.
 *
 * @param file - The path of the file to save the object to.
 * @param schema - The Zod schema used to validate the object.
 * @param obj - The object to be saved.
 * @returns The validated object after saving.
 */
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
	writeStream.write(JSON.stringify(validated) + '\n');
	writeStream.end();

	await new Promise((resolve, reject) => {
		writeStream.on('close', resolve);
		writeStream.on('error', reject);
	});

	return validated as Output;
};

/**
 * Transforms objects in a file based on a given schema and transformation function.
 *
 * @param file - The path to the file containing the objects.
 * @param schema - The schema used to validate and parse the objects.
 * @param transform - The transformation function to apply to each object.
 * @returns A Promise that resolves to the transformed objects.
 * @throws An error if the file does not exist or if there is an error parsing the objects.
 */
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
	await lock(file);
	try {
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
	} finally {
		release(file);
	}
};

/**
 * Replaces objects in a file based on a given schema and replacement function.
 *
 * @param file - The path to the file.
 * @param schema - The schema to validate the objects in the file.
 * @param replace - The replacement function that takes an input object and returns the replacement object.
 * @returns A promise that resolves to the results of the replacement operation.
 * @throws An error if the file does not exist or if there is an error parsing the objects in the file.
 */
export const replaceObjects = async <T extends z.ZodSchema, Output = z.output<T>, Input = z.input<T>>(
	file: string,
	schema: T,
	replace: (input: Input) => Output | null,
) => {
	if (!existsSync(file)) {
		throw new Error('File does not exist: ' + file);
	}
	await lock(file);
	try {
		const results = await replaceInFileByLine(file, (line, lineNumber) => {
			try {
				const obj = schema.parse(JSON.parse(line));
				const newObj = replace(obj);
				return newObj == null ? null : JSON.stringify(newObj);
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
	} finally {
		release(file);
	}
};
