import NodeCache from 'node-cache';
import { BoardWithDetectionStatus } from '@/zods/boards';
import { CFGDirectories } from '@/server/routers/printer';
import { Extruder } from '@/zods/hardware';
import { ZodType, z } from 'zod';

type ServerCacheValue = {
	[K in CFGDirectories]: unknown;
} & {
	boards: BoardWithDetectionStatus[];
};
type ServerCacheKey = keyof ServerCacheValue;
type ServerCache = Omit<NodeCache, 'get' | 'set'> & {
	get<T extends ServerCacheKey>(key: T): T extends ServerCacheKey ? ServerCacheValue[T] | undefined : undefined;
	set<R, T extends ServerCacheKey>(key: T, value: R extends ServerCacheValue[T] ? R : never): boolean;
};
export const ServerCache = new NodeCache({
	useClones: false,
}) as ServerCache;

const serverCachePromiseLookup = new Map<string, Promise<any>>();

export const cacheAsyncDirectoryFn = <
	R extends ZodType,
	K extends CFGDirectories,
	T extends (directory: K, zod: R) => Promise<z.TypeOf<R>>,
>(
	fn: T,
	cache: ServerCache,
) => {
	return async (directory: K, zod: R): Promise<z.TypeOf<R>[]> => {
		let result = cache.get<ServerCacheKey>(`${directory}`);
		if (result == null) {
			let promise = serverCachePromiseLookup.get(`${directory}`);
			if (promise == null) {
				promise = fn(directory, zod) as Promise<z.TypeOf<R>[]>;
				serverCachePromiseLookup.set(`${directory}`, promise);
			} else {
			}
			const val = await promise;
			cache.set(`${directory}`, val);
			return val;
		}
		return result as Promise<z.TypeOf<R>[]>;
	};
};

type MetadataCacheValue = {
	[key: `parsePinAlias-${string}`]: { [key: string]: string | undefined };
	[key: `extractMcuFromFirmwareConfig-${string}`]: string;
	[key: `getExtruderRotationDistance-${string}`]: z.infer<(typeof Extruder)['shape']['id']>;
};
type MetadataCacheKey = keyof MetadataCacheValue;
type MetadataCache = Omit<NodeCache, 'get' | 'set'> & {
	get<T extends MetadataCacheKey>(key: T): T extends MetadataCacheKey ? MetadataCacheValue[T] | undefined : undefined;
	set<R, T extends MetadataCacheKey>(key: T, value: R extends MetadataCacheValue[T] ? R : never): boolean;
};
export const MetadataCache = new NodeCache({
	useClones: false,
}) as MetadataCache;

const cachePromiseLookup = new Map<string, Promise<any>>();

export const cacheAsyncMetadataFn = <
	K extends `parsePinAlias` | `extractMcuFromFirmwareConfig` | `getExtruderRotationDistance`,
	F extends string,
	T extends (fileName: F) => Promise<MetadataCacheValue[`${K}-${F}`]>,
>(
	fn: T,
	key: K,
	cache: MetadataCache,
) => {
	return async (fileName: F): Promise<MetadataCacheValue[`${K}-${F}`]> => {
		let result = cache.get<MetadataCacheKey>(`${key}-${fileName}`);
		if (result == null) {
			let promise = cachePromiseLookup.get(`${key}-${fileName}`);
			if (promise == null) {
				promise = fn(fileName) as Promise<MetadataCacheValue[`${K}-${F}`]>;
				cachePromiseLookup.set(`${key}-${fileName}`, promise);
			} else {
			}
			const val = await promise;
			cache.set(`${key}-${fileName}`, val);
			return val;
		}
		return result as MetadataCacheValue[`${K}-${F}`];
	};
};

export const cacheMetadataFn = <
	K extends `parsePinAlias` | `extractMcuFromFirmwareConfig` | `getExtruderRotationDistance`,
	F extends string,
	T extends (fileName: F) => MetadataCacheValue[`${K}-${F}`],
>(
	fn: T,
	key: K,
	cache: MetadataCache,
) => {
	return (fileName: F): MetadataCacheValue[`${K}-${F}`] => {
		let result = cache.get<MetadataCacheKey>(`${key}-${fileName}`);
		if (result == null) {
			const val = fn(fileName) as MetadataCacheValue[`${K}-${F}`];
			cache.set(`${key}-${fileName}`, val);
			return val;
		}
		return result as MetadataCacheValue[`${K}-${F}`];
	};
};
