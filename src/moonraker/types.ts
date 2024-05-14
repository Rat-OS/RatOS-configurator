import { VaocSettings } from '@/app/calibration/vaoc-settings-dialog';
import { CameraOption } from '@/app/calibration/helpers';

export type MoonrakerStatus = 'connected' | 'connecting' | 'not-running';

export interface InFlightRequestCallbacks<R = MoonrakerResponseSuccess['result']> {
	[id: number]: (err: Error | null, result: R | null) => unknown;
}

export interface InFlightRequestTimeouts {
	[id: number]: number;
}

export type MoonrakerResponseSuccess = {
	method: string;
	params: unknown[];
	result?: unknown;
	id: number;
};

export type MoonrakerResponseError = {
	error: {
		code: number;
		message: string;
	};
	id: number;
};

export type MoonrakerResponse = MoonrakerResponseSuccess | MoonrakerResponseError;
export type MoonrakerDBItemResponse<Data = unknown> = {
	key: string;
	namespace: string;
	value: Data;
};

export type MoonrakerDB = {
	RatOS: {
		'camera-settings': VaocSettings;
		'camera-stream-settings': { [key: string]: CameraOption };
		__recoil: unknown;
	};
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

type MajorVersion = Nominal<number, 'major'>;
type MinorVersion = Nominal<number, 'minor'>;
type PatchVersion = Nominal<number, 'patch'>;
type VersionTag = Nominal<`${MajorVersion}.${MinorVersion}.${PatchVersion}`, 'tag'>;
type CommitCount = Nominal<string, 'commits'>;
type CommitHash = Nominal<string, 'HEAD'>;
type UnixTimestamp = Nominal<number, 'timestamp'>;

export type PrinterObjectQueries = {
	print_stats: MoonrakerMethod<
		{
			state?: 'paused' | 'printing' | 'complete' | 'error' | 'canceled' | 'standby';
		},
		void
	>;
	toolhead: MoonrakerMethod<
		{
			homed_axes: string;
			axis_minimum: [number, number, number, number];
			axis_maximum: [number, number, number, number];
			print_time: number;
			stalls: number;
			estimated_print_time: number;
			extruder: `extruder` | `extruder1`;
			position: [number, number, number, number];
			max_velocity: number;
			max_accel: number;
			minimum_cruise_ratio: number;
			square_corner_velocity: number;
		},
		void
	>;
	motion_report: MoonrakerMethod<
		{
			live_position?: [number, number, number, number];
			live_velocity: number;
			live_extruder_velocity: number;
		},
		void
	>;
	system_stats: MoonrakerMethod<
		{
			sysload: number;
			memavail: number;
			cputime: number;
		},
		void
	>;
	'gcode_macro T0': MoonrakerMethod<
		{
			active: boolean;
		},
		void
	>;
	'gcode_macro T1': MoonrakerMethod<
		{
			active: boolean;
		},
		void
	>;
	'gcode_macro _VAOC': MoonrakerMethod<
		{
			is_started: boolean;
		},
		void
	>;
	configfile: MoonrakerMethod<
		{
			settings: {
				[key: string]: unknown | undefined;
			};
		},
		void
	>;
};

// Moonraker Printer Object Types
export type PrinterObjectKeys = DotNestedKeyLeafs<PrinterObjectQueries>;
export type PrinterObjectParams<K extends PrinterObjectKeys> = NestedObjectType<PrinterObjectQueries>[K]['params'];
export type PrinterObjectResult<K extends PrinterObjectKeys> = NestedObjectType<PrinterObjectQueries>[K]['result'];
export type PrinterObjectsMoonrakerQueryParams = { [K in PrinterObjectKeys]: keyof PrinterObjectResult<K> | null };

export type MoonrakerMutations = {
	machine: {
		shutdown: MoonrakerMethod<void, void>;
	};
	server: {
		database: {
			post_item: MoonrakerMethod<
				MoonrakerDBItemResponse,
				{
					key: unknown;
					namespace: MoonrakerNamespaces;
					value: unknown;
				}
			>;
		};
	};
	printer: {
		gcode: {
			script: MoonrakerMethod<
				void,
				{
					script: GCode;
				}
			>;
		};
	};
};

export type MoonrakerQueries = {
	server: {
		database: {
			get_item: MoonrakerMethod<
				MoonrakerDBItemResponse,
				{
					key: unknown;
					namespace: MoonrakerNamespaces;
				}
			>;
		};
		connection: {
			identify: MoonrakerMethod<
				{
					connection_id: number;
				},
				{
					client_name: string;
					version: GitVersion;
					type: 'web' | 'mobile' | 'desktop' | 'display' | 'bot' | 'agent' | 'other';
					url: string;
					access_token?: string;
					api_key?: string;
				}
			>;
		};
		history: {
			list: MoonrakerMethod<
				MoonrakerHistoryListResponse,
				{
					limit?: number;
					start?: number;
					since?: UnixTimestamp;
					before?: UnixTimestamp;
					order: 'asc' | 'desc';
				}
			>;
			totals: MoonrakerMethod<
				{
					job_totals: {
						total_jobs: number;
						total_time: number;
						total_print_time: number;
						total_filament_used: number;
						longest_job: number;
						longest_print: number;
					};
				},
				void
			>;
		};
		info: MoonrakerMethod<
			{
				klippy_state: 'ready' | 'startup' | 'shutdown' | 'error';
				websocket_count: number;
				moonraker_version: `v${VersionTag}-${CommitCount}-${CommitHash}`;
				api_version: [MajorVersion, MinorVersion, PatchVersion];
				api_version_string: VersionTag;
				registed_directories: string[];
			},
			void
		>;
	};
	printer: {
		objects: {
			query: MoonrakerMethod<
				{ status: unknown; eventtime: number },
				{ objects: PrinterObjectsMoonrakerQueryParams | null }
			>;
		};
	};
};

// Moonraker Query Types
export type MoonrakerQueryKeys = DotNestedKeyLeafs<MoonrakerQueries>;
export type MoonrakerQueryParams<K extends MoonrakerQueryKeys> = NestedObjectType<MoonrakerQueries>[K]['params'];
export type MoonrakerQueryResult<K extends MoonrakerQueryKeys> = NestedObjectType<MoonrakerQueries>[K]['result'];

export type MoonrakerQueryFn = <
	K extends MoonrakerQueryKeys = MoonrakerQueryKeys,
	P extends MoonrakerQueryParams<K> = MoonrakerQueryParams<K>,
>(
	...args: P extends void ? [K] : [K, P]
) => Promise<MoonrakerQueryResult<K>>;

// Moonraker Mutation Types
export type MoonrakerMutationKeys = DotNestedKeyLeafs<MoonrakerMutations>;
export type MoonrakerMutationParams<K extends MoonrakerMutationKeys> =
	NestedObjectType<MoonrakerMutations>[K]['params'];
export type MoonrakerMutationResult<K extends MoonrakerMutationKeys> =
	NestedObjectType<MoonrakerMutations>[K]['result'];

export type MoonrakerMutationFn = <
	K extends MoonrakerMutationKeys = MoonrakerMutationKeys,
	P extends MoonrakerMutationParams<K> = MoonrakerMutationParams<K>,
>(
	...args: P extends void ? [K] : [K, P]
) => Promise<MoonrakerMutationResult<K>>;

// Moonraker Database Types
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
	thumbnails?: MoonrakerThumbnail[];
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
	status:
		| 'completed'
		| 'error'
		| 'in_progress'
		| 'interrupted'
		| 'klippy_disconnect'
		| 'klippy_shutdown'
		| 'server_exit';
	start_time: number;
	total_duration: number;
};

export type MoonrakerHistoryListResponse = {
	count: number;
	jobs: MoonrakerHistoryJob[];
};
