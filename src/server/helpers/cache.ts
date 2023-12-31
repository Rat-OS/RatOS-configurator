import NodeCache from 'node-cache';
import { BoardWithDetectionStatus } from '../../zods/boards';
import { CFGDirectories } from '../routers/printer';

type CacheValue = {
	[K in CFGDirectories]: unknown;
} & {
	boards: BoardWithDetectionStatus[];
};
type CacheKey = keyof CacheValue;
type Cache = Omit<NodeCache, 'get' | 'set'> & {
	get<T extends CacheKey>(key: T): T extends CacheKey ? CacheValue[T] | undefined : undefined;
	set<R, T extends CacheKey>(key: T, value: R extends CacheValue[T] ? R : never): boolean;
};
export const ServerCache = new NodeCache({
	useClones: false,
}) as Cache;
