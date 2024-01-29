export type MoonrakerStatus = 'connected' | 'connecting' | 'not-running';

export interface InFlightRequestCallbacks {
	[id: number]: (err: Error | null, result: any) => any;
}

export interface InFlightRequestTimeouts {
	[id: number]: number;
}

export interface MoonrakerResponse {
	method: string;
	params: unknown[];
	result?: unknown;
	id: number;
}
export type MoonrakerDBItemResponse<Data = unknown> = {
	key: string;
	namespace: string;
	value: Data;
};

export type MoonrakerDB = {
	RatOS: { [key: string]: unknown };
	mainsail: {
		general: {
			printername: string;
		};
	};
};

export type MoonrakerMethod<Response, Params> = {
	__leaf: true;
	result: Response;
	params: Params;
};

export type MoonrakerMethods = {
	server: {
		database: {
			get_item: MoonrakerMethod<
				MoonrakerDBItemResponse,
				{
					key: unknown;
					namespace: MoonrakerNamespaces;
				}
			>;
			post_item: MoonrakerMethod<
				MoonrakerDBItemResponse,
				{
					key: unknown;
					namespace: MoonrakerNamespaces;
					value: unknown;
				}
			>;
		};
		history: {
			list: MoonrakerMethod<
				MoonrakerHistoryListResponse,
				{
					limit?: number;
					offset?: number;
					since?: number;
					before?: number;
					order: 'asc' | 'desc';
				}
			>;
		};
	};
	machine: {
		shutdown: MoonrakerMethod<void, void>;
	};
};

export type MoonrakerMethodKeys = DotNestedKeyLeafs<MoonrakerMethods>;
export type MoonrakerMethodParams<K extends MoonrakerMethodKeys> = NestedObjectType<MoonrakerMethods>[K]['params'];
export type MoonrakerMethodResult<K extends MoonrakerMethodKeys> = NestedObjectType<MoonrakerMethods>[K]['result'];

export type MoonrakerQueryFn = <R, K extends MoonrakerMethodKeys = MoonrakerMethodKeys>(
	method: K,
	...a: MoonrakerMethodParams<K> extends void ? [undefined?] : [MoonrakerMethodParams<K>]
) => Promise<MoonrakerMethodResult<K>>;

export type MoonrakerNamespaces = keyof MoonrakerDB;
export type MoonrakerNamespaceKeys<N extends MoonrakerNamespaces> = DotNestedKeys<MoonrakerDB[N]>;

export type MoonrakerDBValue<N extends MoonrakerNamespaces, K extends MoonrakerNamespaceKeys<N>> =
	| NestedObjectType<MoonrakerDB[N]>[K]
	| null;

export type MoonrakerGetItemFn = <D, N extends MoonrakerNamespaces, K extends MoonrakerNamespaceKeys<N>>(
	namespace: N,
	key: K,
) => Promise<
	MoonrakerDBValue<N, K extends MoonrakerNamespaceKeys<N> ? K : never> extends never
		? D | null
		: MoonrakerDBValue<N, K extends MoonrakerNamespaceKeys<N> ? K : never>
>;

export type MoonrakerSaveItemFn = <
	N extends MoonrakerNamespaces,
	K extends MoonrakerNamespaceKeys<N>,
	D extends MoonrakerDBValue<N, K>,
>(
	namespace: N,
	key: K,
	value: D | null,
) => Promise<MoonrakerDBItemResponse<D>>;

/**
 * Moonraker API Types
 */

type MoonrakerThumbnail = {
	width: number;
	height: number;
	size: number;
	relative_path: string;
};

type MoonrakerHistoryJobMetadata = {
	thumbnails: MoonrakerThumbnail[];
	size: number;
	modified: number;
	uuid: string;
	slicer: string;
	slicer_version: string;
	gcode_start_byte: number;
	gcode_end_byte: number;
	object_height: number;
	estimated_time: number;
	nozzle_diameter: number;
	layer_height: number;
	first_layer_height: number;
	first_layer_extr_temp: number;
	first_layer_bed_temp: number;
	filament_name: string;
	filament_type: string;
	filament_total: number;
	filament_weight_total: string;
};

export type MoonrakerHistoryJob = {
	job_id: string;
	exists: boolean;
	end_time: number;
	filament_used: number;
	filename: string;
	metadata: MoonrakerHistoryJobMetadata;
	print_duration: number;
	status: 'completed';
	start_time: number;
	total_duration: number;
};

export type MoonrakerHistoryListResponse = {
	count: number;
	jobs: MoonrakerHistoryJob[];
};
