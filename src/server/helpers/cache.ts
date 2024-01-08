import NodeCache from 'node-cache';
import { BoardWithDetectionStatus } from '../../zods/boards';
import { CFGDirectories } from '../routers/printer';
import { Extruder } from '../../zods/hardware';
import { z } from 'zod';

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
const now = new Date().getTime();

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
