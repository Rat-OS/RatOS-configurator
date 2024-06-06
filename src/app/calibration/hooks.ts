'use client';
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import useLocalStorage from 'react-use-localstorage';
import { CameraOption, parseOptions } from '@/app/calibration/helpers';
import {
	useMoonrakerQuery,
	useMoonrakerState,
	usePrinterObjectQuery,
	usePrinterObjectSubscription,
} from '@/moonraker/hooks';
import { merge } from 'ts-deepmerge';
import { getHost } from '@/helpers/util';
import { useCallbackRef } from 'use-callback-ref';
import { MoonrakerDB } from '@/moonraker/types';
import { useWindowSize } from '@/app/_hooks/resize';
import { useChangeEffect, useDelayedChangeEffect } from '@/hooks/useChangeEffect';
import { useGesture } from '@use-gesture/react';
import { useGcodeCommand } from '@/app/_hooks/toolhead';
import { VaocSettings } from '@/app/calibration/vaoc-settings-dialog';
import useResizeObserver from '@react-hook/resize-observer';
import screenfull from 'screenfull';
import { getLogger } from '@/app/_helpers/logger';

const getCameraUrl = () => {
	const host = getHost();
	if (host == null || host.trim() == '') {
		return '/webcam';
	}
	return `http://${host}/webcam`;
};

export const useUIState = () => {
	if (typeof window === 'undefined') {
		throw new Error("Can't use useUIState on the server");
	}
	// Container and frame sizing
	const [containerAspectRatio, setContainerAspectRatio] = useState<number>(0.1);
	const windowSize = useWindowSize();
	const containerRef = useCallbackRef<HTMLDivElement | null>(null, (newRef, oldRef) => {
		if (newRef != null) {
			setContainerAspectRatio(newRef.getBoundingClientRect().width / newRef.getBoundingClientRect().height);
		}
	});
	const rootRef = useRef<HTMLDivElement | null>(null);

	useResizeObserver(containerRef, (entry) => {
		setContainerAspectRatio(entry.contentRect.width / entry.contentRect.height);
	});

	useEffect(() => {
		if (containerRef.current != null) {
			setContainerAspectRatio(
				containerRef.current?.getBoundingClientRect().width / containerRef.current?.getBoundingClientRect().height ??
					windowSize.width / windowSize.height,
			);
		}
	}, [windowSize, containerRef]);

	const [isFullscreened, setIsFullscreened] = useState(false);

	const toggleFullscreen = useCallback(
		async (value?: boolean) => {
			if (screenfull.isEnabled && rootRef.current) {
				if (value != null) {
					if (value) {
						await screenfull.request(rootRef.current);
					} else {
						await screenfull.exit();
					}
					setIsFullscreened(value);
				}
				if (screenfull.isFullscreen || value === false) {
					await screenfull.exit();
					setIsFullscreened(false);
				}
				if (!screenfull.isFullscreen || value === true) {
					await screenfull.request(rootRef.current);
					setIsFullscreened(true);
				}
			}
		},
		[rootRef],
	);

	useEffect(() => {
		if (screenfull.isEnabled) {
			const onChange = () => {
				setIsFullscreened(screenfull.isFullscreen);
			};
			screenfull.on('change', onChange);
			return () => {
				screenfull.off('change', onChange);
			};
		}
	}, []);

	// UI toggles
	const [canMove, setCanMove] = useState(true);
	const [isLockingCoordinates, setIsLockingCoordinates] = useState(false);
	const [_zoom, _setZoom] = useLocalStorage('VAOC_UI_STATE_ZOOM', '1.00');
	const zoomRef = useRef(parseFloat(_zoom));
	zoomRef.current = parseFloat(_zoom);
	const zoom = parseFloat(_zoom);
	const setZoom = useCallback(
		(updater: (prev: number) => number) => {
			const newZoom = updater(zoomRef.current);
			zoomRef.current = newZoom;
			_setZoom(newZoom.toFixed(2));
		},
		[_setZoom],
	);
	return {
		containerAspectRatio,
		setContainerAspectRatio,
		canMove,
		setCanMove,
		rootRef,
		isLockingCoordinates,
		setIsLockingCoordinates,
		zoom,
		setZoom,
		containerRef,
		windowSize,
		isFullscreened,
		toggleFullscreen,
	};
};

type SpatialMappingProps = {
	videoRef: React.RefObject<HTMLVideoElement>;
	containerRef: React.RefObject<HTMLDivElement>;
	zoom: number;
	windowSize: { width: number; height: number };
	settings: VaocSettings;
};

export const useSpatialMapping = (props: SpatialMappingProps) => {
	const { videoRef, containerRef, zoom, windowSize, settings } = props;
	const [containerSize, setContainerSize] = useState<[number, number]>([0, 0]);
	const scale = useCallback(
		(val: number) => {
			const vidWidth = videoRef.current?.videoWidth ?? 1;
			const frameWidth = containerSize[0];
			const videoScale = frameWidth > 0 && vidWidth > 0 ? frameWidth / vidWidth : 1;
			return val * zoom * videoScale;
		},
		[videoRef, containerSize, zoom],
	);

	const invert = useCallback(
		(val: number) => {
			const vidWidth = videoRef.current?.videoWidth ?? 1;
			const frameWidth = containerSize[0];
			const videoScale = frameWidth > 0 && vidWidth > 0 ? frameWidth / vidWidth : 1;
			return val / zoom / videoScale;
		},
		[containerSize, videoRef, zoom],
	);

	const toScreen = useCallback(
		(val: number) => {
			(() => windowSize)(); // Mark used so we still get linting.
			return scale(val) * (settings?.pixelPrMm ?? 0);
		},
		[scale, settings?.pixelPrMm, windowSize],
	);

	const toMillimeters = useCallback(
		(val: number) => {
			return invert(val) / (settings?.pixelPrMm ?? 0);
		},
		[invert, settings?.pixelPrMm],
	);

	useResizeObserver(containerRef, (entry) => {
		if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
			setContainerSize([entry.contentRect.width, entry.contentRect.height]);
		} else {
			const rect = containerRef.current?.getBoundingClientRect();
			if (rect) {
				setContainerSize([rect?.width, rect?.height]);
			}
		}
	});

	return {
		toScreen,
		toMillimeters,
		containerSize,
	};
};

export const usePrinterState = () => {};

type GesturesProps = {
	gestureRef: React.RefObject<HTMLElement>;
	zoom: number;
	setZoom: ReactCallback<(updater: (prev: number) => number) => void>;
	isConnected: boolean;
	canMove: boolean;
	toScreen: (val: number) => number;
	toMillimeters: (val: number) => number;
};

export const useGestures = (props: GesturesProps) => {
	const { gestureRef, setZoom, isConnected, canMove, toScreen, toMillimeters, zoom } = props;
	const [dragOffset, setDragOffset] = useState<[number, number] | null>(null);
	const [dragOutside, setDragOutside] = useState<{ x: false | number; y: false | number }>({ x: false, y: false });
	const G = useGcodeCommand();

	useGesture(
		{
			onDrag: (state) => {
				if (state.dragging) {
					setDragOffset([state.offset[0], state.offset[1]]);
					setDragOutside({ x: state._movementBound[0], y: state._movementBound[1] });
				} else {
					const x = toMillimeters(dragOffset?.[0] ?? 0);
					const y = toMillimeters(dragOffset?.[1] ?? 0) * -1;
					G`_VAOC_MOVE X=${x} Y=${y}`;
					setDragOffset(null);
					setDragOutside({ x: false, y: false });
				}
			},
			onPinch: (state) => {
				setZoom((z) => Math.max(Math.min(z * state.offset[0], 10), 1));
			},
			onWheel: (state) => {
				if (state.delta[1] == 0 || state.wheeling == false || state.intentional == false) {
					return;
				}
				if (state.delta[1] < 0) {
					setZoom((z) => Math.max(z * 0.85, 1));
				} else {
					setZoom((z) => Math.min(z * 1.15, 10));
				}
			},
		},
		{
			target: gestureRef,
			enabled: isConnected,
			drag: {
				enabled: canMove,
				from: () => [0, 0],
				bounds: {
					left: -toScreen(1),
					right: toScreen(1),
					top: -toScreen(1),
					bottom: toScreen(1),
				},
				rubberband: true,
			},
			wheel: { axis: 'y', rubberband: false },
			pinch: {
				scaleBounds: { min: 1, max: 10 },
				pinchOnWheel: false,
				rubberband: true,
			},
		},
	);

	return {
		scaledDragOffset: {
			x: dragOffset == null ? 0 : dragOffset[0] / zoom,
			y: dragOffset == null ? 0 : dragOffset[1] / zoom,
		},
		dragOffset: {
			x: dragOffset == null ? 0 : dragOffset[0],
			y: dragOffset == null ? 0 : dragOffset[1],
		},
		isDragging: dragOffset != null,
		dragOutside,
	};
};

export type CrossHairStateProps = {
	isLockingCoordinates: boolean;
	snapshotDuration?: number;
	settings: VaocSettings;
	isConnected: boolean;
	toScreen: (val: number) => number;
	containerSize: [number, number];
};
const SNAPSHOT_DURATION = 200;

export const useCrossHairState = (props: CrossHairStateProps) => {
	const { toScreen, settings, containerSize } = props;
	const SnapshotEffectDuration = props.snapshotDuration ?? SNAPSHOT_DURATION;
	const configFile = usePrinterObjectQuery('configfile');
	const t0 = usePrinterObjectSubscription((res) => {
		return { active: res['gcode_macro T0'].active };
	}, 'gcode_macro T0');
	const t1 = usePrinterObjectSubscription((res) => {
		return { active: res['gcode_macro T1'].active };
	}, 'gcode_macro T1');
	const tool = t0?.active ? 0 : t1?.active ? 1 : 0;
	const [isLockingCoordinates] = useChangeEffect([props.isLockingCoordinates], SnapshotEffectDuration, true);
	const [delayedIsLockingCoordinates] = useDelayedChangeEffect(
		[props.isLockingCoordinates],
		SnapshotEffectDuration - 10,
		10,
		true,
	);
	const nozzleDiameter = (configFile.data?.configfile.settings[tool === 0 ? 'extruder' : 'extruder1'] as any)
		?.nozzle_diameter;
	const nozzleRadius = useMemo(() => toScreen((nozzleDiameter ?? 0.4) / 2), [nozzleDiameter, toScreen]);
	const { outerNozzleDiameter } = settings;
	const canRender = props.isConnected && outerNozzleDiameter != null && nozzleDiameter != null;
	const outerNozzleRadius = useMemo(
		() => (isLockingCoordinates ? nozzleRadius : toScreen(outerNozzleDiameter ? outerNozzleDiameter / 2 : 1)),
		[toScreen, isLockingCoordinates, nozzleRadius, outerNozzleDiameter],
	);
	const outerNozzleRadiusPercentWidth = useMemo(
		() => (!props.isConnected ? 0 : (outerNozzleRadius / containerSize[0]) * 100),
		[props.isConnected, outerNozzleRadius, containerSize],
	);
	const outerNozzleRadiusPercentHeight = useMemo(
		() => (!props.isConnected ? 0 : (outerNozzleRadius / containerSize[1]) * 100),
		[props.isConnected, outerNozzleRadius, containerSize],
	);
	const crosshairStrokeWidth = useMemo(() => toScreen(0.01), [toScreen]);

	return {
		canRender,
		nozzleRadius: isNaN(nozzleRadius) ? 0 : nozzleRadius,
		outerNozzleRadius: isNaN(outerNozzleRadius) ? 0 : outerNozzleRadius,
		outerNozzleRadiusPercentWidth: isNaN(outerNozzleRadiusPercentWidth) ? 0 : outerNozzleRadiusPercentWidth,
		outerNozzleRadiusPercentHeight: isNaN(outerNozzleRadiusPercentHeight) ? 0 : outerNozzleRadiusPercentHeight,
		crosshairStrokeWidth: isNaN(crosshairStrokeWidth) ? 0 : crosshairStrokeWidth,
		delayedIsLockingCoordinates,
	};
};

export const useVideoState = () => {
	// Video state
	const [url, setUrl] = useState(getCameraUrl());
	useEffect(() => {
		if (url !== getCameraUrl()) setUrl(getCameraUrl());
	}, [url]);
	const [fps, setFps] = useState<number | null>(null);
	const [aspectRatio, setAspectRatio] = useState<number | null>(null);
	const onStreamStats = useCallback((stats: RTCInboundRtpStreamStats) => {
		if (stats.framesPerSecond) {
			setFps(stats.framesPerSecond);
		}
		if (stats.frameHeight && stats.frameWidth) {
			setAspectRatio(stats.frameWidth / stats.frameHeight);
		}
	}, []);

	return {
		url,
		setUrl,
		fps,
		aspectRatio,
		onStreamStats,
	};
};

type VaocSettingsProps = {
	url: string;
	isConnected?: boolean;
};

export const useVaocSettings = ({ url, isConnected }: VaocSettingsProps) => {
	// Camera state
	const [settings, saveSettings] = useMoonrakerState('RatOS', 'camera-settings');
	return { settings, saveSettings };
};

type StreamSettingsProps = {
	url: string;
	isConnected?: boolean;
	settings: MoonrakerDB['RatOS']['camera-stream-settings'] | null;
	saveSettings: (settings: MoonrakerDB['RatOS']['camera-stream-settings']) => Promise<void>;
	isInitialLoading: boolean;
	isFetched: boolean;
};

export const useStreamSettings = ({
	url,
	isConnected,
	settings,
	saveSettings,
	isInitialLoading,
	isFetched,
}: StreamSettingsProps) => {
	const [options, setOptions] = useState<CameraOption[]>([]);
	const settingsRef = useRef(settings);
	settingsRef.current = settings;

	const mergedOptions = useMemo(() => {
		return options.map((opt) => {
			opt.value = settingsRef.current?.[opt.key]?.value ?? opt.value;
			if ('max' in opt && opt.key === 'ExposureTime') {
				// Limit exposure time to max 1/15th of a second.
				opt.min = 0;
				opt.max = 60000;
			}
			return opt;
		});
	}, [options]);

	// 👍, return options with values from `settings` when available else whatever default.
	// todo, update settings keys when options change (delete old ones, add new ones).

	const compression = useCallback(
		async (val: NumbersBefore<101>) => {
			const res = await fetch(`${url}/option?compressionquality=${val}`);
			setOptions(parseOptions(await res.text()));
		},
		[url],
	);

	const setOption = useCallback(
		async (key: string, value: number | boolean) => {
			const opt = options.find((o) => o.key === key);
			if (opt == null) {
				throw new Error(`Invalid option ${key}`);
			}
			if (opt && 'toggle' in opt && typeof value !== 'boolean') {
				throw new Error(`Expect a boolean value for ${key}, got ${value}`);
			}
			if (opt && 'max' in opt && (typeof value !== 'number' || opt.min > value || opt.max < value)) {
				throw new Error(`Value ${value} is out of range for ${key}`);
			}
			try {
				const intVal = typeof value === 'boolean' ? (value ? 1 : 0) : value;
				const res = await fetch(`${url}/option?${key}=${intVal.toString()}`);
				if (res.ok && isInitialLoading === false) {
					getLogger().info(
						'saving',
						key,
						value,
						settingsRef.current,
						merge(settingsRef.current ?? {}, { [key]: { value } }),
					);
					await saveSettings(merge(settingsRef.current ?? {}, { [key]: { value } }));
				}
				return res.ok;
			} catch (e) {
				return false;
			}
		},
		[options, url, isInitialLoading, saveSettings],
	);

	useEffect(() => {
		if (isConnected) {
			compression(100);
		}
		if (isConnected && isFetched && settingsRef.current != null) {
			for (const opt in settingsRef.current) {
				const val = settingsRef.current[opt]?.value;

				const intVal = typeof val === 'boolean' ? (val ? 1 : 0) : val;
				if (intVal != null) {
					fetch(`${url}/option?${opt}=${intVal.toString()}`);
				}
			}
		}
	}, [isFetched, url, isConnected, compression]);

	return {
		options: mergedOptions,
		setOption,
	};
};
