export type MoonrakerStatus = 'connected' | 'connecting' | 'not-running';

export interface InFlightRequestCallbacks {
	[id: number]: (err: Error | null, result: any) => any;
}

export interface InFlightRequestTimeouts {
	[id: number]: number;
}

export interface MoonrakerResponse {
	method: string;
	params: any[];
	result?: any;
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

export type MoonrakerMethods = {
	server: {
		database: {
			get_item: MoonrakerDBItemResponse;
			post_item: MoonrakerDBItemResponse;
		};
		history: {
			list: MoonrakerHistoryListResponse;
		};
	};
};

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

type MoonrakerHistoryJob = {
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

type MoonrakerHistoryListResponse = {
	count: number;
	jobs: MoonrakerHistoryJob[];
};
