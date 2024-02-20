'use client';
import { HomeIcon } from '@heroicons/react/24/solid';
import Toolbar, { ToolbarButton, ToolbarButtonWithParent } from '../../components/common/toolbar';
import { useWebRTC } from '../_hooks/webrtc';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import {
	CameraIcon,
	ArrowsPointingOutIcon,
	LightBulbIcon,
	SwatchIcon,
	MapPinIcon,
	CogIcon,
	MagnifyingGlassIcon,
	ViewfinderCircleIcon,
	BeakerIcon,
} from '@heroicons/react/24/outline';
import { z } from 'zod';
import { useDebounce } from '../_hooks/debounce';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { twJoin, twMerge } from 'tailwind-merge';
import { CameraSettingsDialog } from './camera-settings-dialog';
import { useMoonrakerState, usePrinterObjectSubscription } from '../../moonraker/hooks';
import { useChangeEffect } from '../../hooks/useChangeEffect';
import { ExposureIcon } from '../../components/common/icons/exposure';
import { FocusControls } from './focus-controls';
import { Spinner } from '../../components/common/spinner';
import { useWindowSize } from '../_hooks/resize';
import CountUp from 'react-countup';
import { useGcodeCommand } from '../_hooks/toolhead';
import { getHost } from '../../helpers/util';

type Option = {
	key: string;
} & ({ min: number; max: number; float?: boolean } | { toggle?: true });

const parseOptions = (options: string) => {
	const ints = options.matchAll(/- available option:\s(\w+)\s.+(\[-?\d+\.\.\d+\])/g);
	let result: Option[] = [];
	for (const match of ints) {
		const [min, max] = match[2]
			.slice(1, -1)
			.split('..')
			.map((n) => parseInt(n, 10));
		const existing = result.find((o) => o.key === match[1]);
		if (existing && 'max' in existing && existing.max && existing.max <= max) {
			continue;
		}
		result.push({
			key: match[1],
			min,
			max: ['redbalance', 'bluebalance', 'greenbalance'].includes(match[1]) ? 2000 : max,
		});
	}
	const floats = options.matchAll(/- available option:\s(\w+)\s.+(\[-?\d+\.\d+\.\.\d+\.\d+\])/g);
	for (const match of floats) {
		const [min, max] = match[2]
			.slice(1, -1)
			.split('..')
			.map((n) => parseFloat(n));
		const existing = result.find((o) => o.key === match[1]);
		if (existing && 'max' in existing && existing.max && existing.max <= max) {
			continue;
		}
		result.push({
			key: match[1],
			float: true,
			min,
			max: ['redbalance', 'bluebalance', 'greenbalance'].includes(match[1]) ? 2000 : max,
		});
	}
	const bools = options.matchAll(/- available option:\s(\w+)\s.+(\[false\.\.true\])/g);
	for (const match of bools) {
		result.push({
			key: match[1],
			toggle: true,
		});
	}
	return result;
};

const ExposureZod = z.number().min(4).max(3522);
const DigiGainZod = z.number().min(254).max(4095);
const useCameraSettings = (url: string) => {
	const [options, setOptions] = useState<Option[]>([]);
	const exposure = useCallback(
		async (val: z.input<typeof ExposureZod>) => {
			const newExpo = ExposureZod.parse(val);
			await fetch(`${url}/option?exposure=${newExpo}`);
		},
		[url],
	);
	const digitalGain = useCallback(
		async (val: number) => {
			const newGain = DigiGainZod.parse(val);
			await fetch(`${url}/option?digitalgain=${newGain}`);
		},
		[url],
	);

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
				const res = await fetch(`${url}/option?${key}=${value}`);
				return res.ok;
			} catch (e) {
				return false;
			}
		},
		[options, url],
	);

	useEffect(() => {
		compression(100);
	}, [compression]);
	return {
		exposure,
		digitalGain,
		options,
		setOption,
	};
};

type SliderProps = {
	min: number;
	step?: number | 'any';
	max: number;
	onChange?: (val: number) => void;
	initialValue?: number;
};
const Slider: React.FC<SliderProps> = ({ onChange, min, max, initialValue, step }) => {
	const [val, setValue] = useState(initialValue ?? min);
	const _onChange = useDebounce(
		useCallback(
			(val: number) => {
				onChange?.(val);
			},
			[onChange],
		),
		100,
	);
	const onInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const val = step ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
			setValue(val);
			_onChange(val);
		},
		[_onChange, step],
	);
	return (
		<div className="relative mb-6">
			<input
				type="range"
				value={val}
				onChange={onInput}
				min={min}
				max={max}
				step={step ?? 1}
				className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 dark:bg-zinc-700"
			/>
			<span className="absolute -bottom-6 start-0 text-sm text-zinc-500 dark:text-zinc-400">Min ({min})</span>
			<span className="absolute -bottom-6 start-1/3 -translate-x-1/2 text-sm text-zinc-500 dark:text-zinc-400 rtl:translate-x-1/2">
				{(max / 3).toFixed(2)}
			</span>
			<span className="absolute -bottom-6 start-2/3 -translate-x-1/2 text-sm text-zinc-500 dark:text-zinc-400 rtl:translate-x-1/2">
				{((max / 3) * 2).toFixed(2)}
			</span>
			<span className="absolute -bottom-6 end-0 text-sm text-zinc-500 dark:text-zinc-400">Max ({max})</span>
		</div>
	);
};

const getCameraUrl = () => {
	const host = getHost();
	if (host == null || host.trim() == '') {
		return '/webcam';
	}
	return `http://${host}/webcam`;
};

export default function Page() {
	const [url, setUrl] = useState(getCameraUrl());
	useEffect(() => {
		setUrl(getCameraUrl());
	}, []);
	const { videoRef, connectionState } = useWebRTC(url + '/webrtc');
	const [settings] = useMoonrakerState('RatOS', 'camera-settings');
	const containerRef = useRef<HTMLDivElement | null>(null);
	const rootRef = useRef<HTMLDivElement | null>(null);
	const [dragOffset, setDragOffset] = useState<[number, number] | null>(null);
	const [dragOutside, setDragOutside] = useState<{ x: false | number; y: false | number }>({ x: false, y: false });
	const { exposure, digitalGain, options, setOption } = useCameraSettings(url);
	const [canMove, setCanMove] = useState(false);
	const [isHoming, setIsHoming] = useState(false);
	const [isSettingsVisible, setIsSettingsVisible] = useState(false);
	const [_isZoomExpanded, _setIsZoomExpanded] = useState(false);
	const [isExposureVisible, setIsExposureVisible] = useState(false);
	const [isColorVisible, setIsColorVisible] = useState(false);
	const [isFocusVisible, setIsFocusVisible] = useState(false);
	const [isAdvancedVisible, setIsAdvancedVisible] = useState(false);
	const [light, setLight] = useState(false);
	const [zoom, setZoom] = useState(1);
	const [isCameraControlsVisible, setIsCameraControlsVisible] = useState(false);
	const G = useGcodeCommand();
	const [animate] = useAutoAnimate();
	const windowSize = useWindowSize();
	const toolhead = usePrinterObjectSubscription('toolhead');
	const tool = toolhead?.toolhead.extruder === 'extruder' ? 'T0' : 'T1';

	const scale = useCallback(
		(val: number) => {
			const vidWidth = videoRef.current?.videoWidth ?? 1;
			const frameWidth = containerRef.current?.getBoundingClientRect().width ?? 1;
			const videoScale = frameWidth > 0 && vidWidth > 0 ? frameWidth / vidWidth : 1;
			return val * zoom * videoScale;
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[videoRef.current, zoom, windowSize],
	);

	const invert = useCallback(
		(val: number) => {
			const vidWidth = videoRef.current?.videoWidth ?? 1;
			const frameWidth = containerRef.current?.getBoundingClientRect().width ?? 1;
			const videoScale = frameWidth > 0 && vidWidth > 0 ? frameWidth / vidWidth : 1;
			return val / zoom / videoScale;
		},
		[videoRef, zoom],
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

	const [tempZoomExpand, clearTempZoomExpand] = useChangeEffect([zoom], 2000, true);
	const isZoomExpanded = tempZoomExpand || _isZoomExpanded;
	const toggleIsZoomExpanded = useCallback(() => {
		_setIsZoomExpanded((z) => !z);
		clearTempZoomExpand();
	}, [clearTempZoomExpand]);

	useGesture(
		{
			onDrag: (state) => {
				if (state.dragging) {
					setDragOffset([state.offset[0], state.offset[1]]);
					setDragOutside({ x: state._movementBound[0], y: state._movementBound[1] });
				} else {
					const x = toMillimeters(dragOffset?.[0] ?? 0) * (settings?.flipHorizontal ? 1 : -1);
					const y = toMillimeters(dragOffset?.[1] ?? 0) * (settings?.flipVertical ? 1 : -1);
					G`_NOZZLE_CALIBRATION_MOVE X=${x} Y=${y}`;
					setDragOffset(null);
					setDragOutside({ x: false, y: false });
				}
			},
			onDrop: () => {
				console.log('drop');
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
			target: videoRef,
			enabled: connectionState === 'connected',
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

	const topLeftControls: ToolbarButton[] = [
		{
			icon: HomeIcon,
			id: 'home',
			title: 'Home the printer (G28)',
			isLoading: isHoming,
			onClick: async () => {
				setIsHoming(true);
				await G`G28`;
				setIsHoming(false);
			},
			isActive: toolhead?.toolhead.homed_axes === 'xyz',
		},
		{
			name: 'T0',
			id: 't0',
			title: 'Switch to tool 0 (T0)',
			onClick: () => {
				G`_NOZZLE_CALIBRATION_LOAD_TOOL T=0`;
			},
			isActive: tool === 'T0',
		},
		{
			name: 'T1',
			id: 't1',
			title: 'Switch to tool 1 (T1)',
			onClick: () => {
				G`_NOZZLE_CALIBRATION_LOAD_TOOL T=1`;
			},
			isActive: tool === 'T1',
		},
	];
	const topRightControls: ToolbarButton[] = [
		{
			icon: MagnifyingGlassIcon,
			id: 'zoom',
			title: `${isZoomExpanded ? 'Hide' : 'Show'} zoom controls`,
			subButtonPosition: 'before',
			className: 'font-mono',
			name:
				zoom >= 10 ? (
					'MAX!'
				) : (
					<>
						<CountUp preserveValue={true} start={0} end={Math.round(zoom * 100)} duration={0.15} />%
					</>
				),
			onClick: () => {
				toggleIsZoomExpanded();
			},
			isActive: isZoomExpanded,
		},
		{
			icon: LightBulbIcon,
			id: 'light',
			title: `${light ? 'Turn off' : 'Turn on'} the LEDs`,
			onClick: () => {
				const newVal = !light;
				G`_NOZZLE_CALIBRATION_SWITCH_LED STATE=${newVal ? 1 : 0}`;
				setLight(newVal);
			},
			isActive: light,
		},
	];
	const zoomControls: ToolbarButtonWithParent[] = [
		{
			name: '1X',
			id: '1x',
			parent: 'zoom',
			title: `Set zoom to 1X (100%)`,
			className: 'font-mono',
			onClick: () => {
				setZoom(1);
			},
			isActive: false,
		},
		{
			name: '2X',
			id: '2x',
			parent: 'zoom',
			title: `Set zoom to 2X (200%)`,
			className: 'font-mono',
			onClick: () => {
				setZoom(2);
			},
			isActive: false,
		},
		{
			name: '4X',
			id: '4x',
			parent: 'zoom',
			title: `Set zoom to 4X (400%)`,
			className: 'font-mono',
			onClick: () => {
				setZoom(4);
			},
			isActive: false,
		},
	];
	const bottomLeftControls = useMemo(
		() =>
			[
				{
					name: 'Settings',
					icon: CogIcon,
					id: 'settings',
					title: 'Show camera settings dialog',
					onClick: () => {
						setIsSettingsVisible((vis) => !vis);
					},
					isActive: isSettingsVisible,
				},
				{
					name: tool === 'T0' ? 'Set reference' : 'Set offset',
					icon: MapPinIcon,
					id: 'reference',
					title: `Set the ${tool === 'T0' ? 'T0 reference point' : 'T1 offset'}`,
					onClick: () => {
						G`_NOZZLE_CALIBRATION_SET_TOOL`;
					},
					isActive: false,
				},
				{
					name: 'Move',
					icon: ArrowsPointingOutIcon,
					id: 'move',
					title: `${canMove ? 'Disable' : 'Enable'} drag and drop calibration`,
					onClick: () => {
						setCanMove((m) => !m);
					},
					isActive: canMove,
				},
			] satisfies ToolbarButton[],
		[canMove, G, isSettingsVisible, tool],
	);
	const cameraControls = useMemo(() => {
		const controls: ToolbarButton[] = [
			{
				icon: CameraIcon,
				id: 'settings',
				subButtonPosition: 'before',
				title: `${isCameraControlsVisible ? 'Hide' : 'Show'} camera controls`,
				onClick: () => {
					setIsCameraControlsVisible((vis) => !vis);
				},
				isActive: isCameraControlsVisible,
			},
		];
		return controls;
	}, [isCameraControlsVisible]);
	const cameraControlsSubButtons = useMemo(() => {
		const controls: ToolbarButtonWithParent[] = [
			{
				icon: ViewfinderCircleIcon,
				id: 'focus',
				parent: 'settings',
				hidden: isColorVisible || isAdvancedVisible || isExposureVisible,
				name: 'Focus',
				title: `${isFocusVisible ? 'Hide' : 'Show'} focus controls`,
				children: <FocusControls isVisible={isFocusVisible} toggle={setIsFocusVisible} />,
				onClick: () => {
					console.log('exposure controls');
					setIsFocusVisible((vis) => !vis);
					setIsExposureVisible(false);
					setIsColorVisible(false);
					setIsAdvancedVisible(false);
				},
				isActive: isFocusVisible,
			},
			{
				icon: ExposureIcon as any,
				id: 'exposure',
				parent: 'settings',
				hidden: isColorVisible || isAdvancedVisible || isFocusVisible,
				title: `${isExposureVisible ? 'Hide' : 'Show'} exposure controls`,
				name: 'Exposure',
				onClick: () => {
					console.log('exposure controls');
					setIsExposureVisible((vis) => !vis);
					setIsColorVisible(false);
					setIsAdvancedVisible(false);
					setIsFocusVisible(false);
				},
				isActive: isExposureVisible,
			},
			{
				icon: SwatchIcon,
				id: 'color',
				parent: 'settings',
				title: `${isColorVisible ? 'Hide' : 'Show'} color controls`,
				hidden: isExposureVisible || isAdvancedVisible || isFocusVisible,
				name: 'Color',
				onClick: () => {
					setIsColorVisible((vis) => !vis);
					setIsExposureVisible(false);
					setIsAdvancedVisible(false);
					setIsFocusVisible(false);
				},
				isActive: isColorVisible,
			},
			{
				icon: BeakerIcon,
				id: 'advanced-camera-controls',
				parent: 'settings',
				title: `${isAdvancedVisible ? 'Hide' : 'Show'} advanced camera controls`,
				name: 'Advanced',
				hidden: isExposureVisible || isColorVisible || isFocusVisible,
				onClick: () => {
					setIsAdvancedVisible((vis) => !vis);
					setIsExposureVisible(false);
					setIsColorVisible(false);
					setIsFocusVisible(false);
				},
				isActive: isAdvancedVisible,
			},
		];
		return controls.reverse();
	}, [isAdvancedVisible, isExposureVisible, isFocusVisible, isColorVisible]);
	const draggedX = dragOffset == null ? 0 : dragOffset[0] / zoom;
	const draggedY = dragOffset == null ? 0 : dragOffset[1] / zoom;
	const outerNozzleDiameter = useMemo(
		() => toScreen(settings ? settings.outerNozzleDiameter / 2 : 0),
		[settings, toScreen],
	);
	const outerNozzleDiameterPercentWidth = useMemo(
		() =>
			containerRef.current == null || connectionState !== 'connected'
				? 0
				: (outerNozzleDiameter / containerRef.current.getBoundingClientRect().width) * 100,
		[connectionState, outerNozzleDiameter],
	);
	const outerNozzleDiameterPercentHeight = useMemo(
		() =>
			containerRef.current == null || connectionState !== 'connected'
				? 0
				: (outerNozzleDiameter / containerRef.current.getBoundingClientRect().height) * 100,
		[connectionState, outerNozzleDiameter],
	);
	return (
		<div className="flex h-[calc(100vh_-_64px)] w-full items-center" ref={rootRef}>
			<div
				className="relative mx-auto flex max-h-full min-h-[50vh] min-w-[50vw] max-w-fit items-center overflow-hidden rounded-2xl object-contain shadow-lg"
				ref={containerRef}
			>
				<video
					ref={videoRef}
					className={twMerge(
						'h-full max-h-full w-full min-w-full max-w-full transform-gpu touch-none',
						canMove && 'cursor-move',
						dragOffset == null && 'transition-transform ease-in-out',
					)}
					style={{
						transform: `scale3d(${zoom * (settings?.flipHorizontal ? -1 : 1)}, ${zoom * (settings?.flipVertical ? -1 : 1)}, 1) translate3d(${draggedX * (settings?.flipHorizontal ? -1 : 1)}px, ${draggedY * (settings?.flipVertical ? -1 : 1)}px, 0)`,
					}}
					autoPlay
					muted
					playsInline
				/>
				<Toolbar className="absolute left-5 top-5" buttons={topLeftControls} />
				<Toolbar
					className="absolute bottom-5 right-5 overflow-visible"
					buttons={cameraControls}
					subButtons={cameraControlsSubButtons}
				/>
				<Toolbar className="absolute right-5 top-5" buttons={topRightControls} subButtons={zoomControls} />
				<Toolbar className="absolute bottom-5 left-5" buttons={bottomLeftControls} />
				<CameraSettingsDialog isVisible={isSettingsVisible} toggle={setIsSettingsVisible} />
				<div className={twJoin('pointer-events-none absolute inset-0 flex items-center justify-center')}>
					<div
						className={twJoin(
							'absolute inset-0',
							dragOutside.x && dragOutside.x > 0
								? 'left-0 right-2/3 bg-gradient-to-r from-red-500/70 to-red-500/0'
								: 'left-2/3 right-0 bg-gradient-to-l from-red-500/70 to-red-500/0',
						)}
						style={{ opacity: dragOutside.x ? Math.abs(dragOutside.x - (dragOffset?.[0] ?? 0)) / 200 : 0 }}
					/>
					<div
						className={twJoin(
							'absolute inset-0',
							dragOutside.y && dragOutside.y > 0
								? 'bottom-2/3 top-0 bg-gradient-to-b from-red-500/70 to-red-500/0'
								: 'bottom-0 top-2/3 bg-gradient-to-t from-red-500/70 to-red-500/0',
						)}
						style={{ opacity: dragOutside.y ? Math.abs(dragOutside.y - (dragOffset?.[1] ?? 0)) / 200 : 0 }}
					/>
					<svg width="100%" height="100%">
						<circle
							cx="50%"
							cy="50%"
							r={toScreen(0.4 / 2)}
							fill="none"
							className={twJoin(
								'stroke-brand-500 transition-all ease-in-out',
								connectionState === 'connected' && outerNozzleDiameter > 0 ? 'opacity-100' : 'opacity-0',
							)}
							strokeWidth="2"
						/>
						<circle
							cx="50%"
							cy="50%"
							r={outerNozzleDiameter}
							fill="none"
							className={twJoin(
								'stroke-brand-500 transition-all ease-in-out',
								connectionState === 'connected' && outerNozzleDiameter > 0 ? 'opacity-50' : 'opacity-0',
							)}
							strokeWidth="2"
						/>
						<rect
							x="50%"
							y={`${50 - outerNozzleDiameterPercentHeight}%`}
							height={`${outerNozzleDiameterPercentHeight * 2}%`}
							width={2}
							className={twJoin(
								'fill-brand-500/50 transition-all ease-in-out',
								connectionState === 'connected' && outerNozzleDiameter > 0 ? 'opacity-100' : 'opacity-0',
							)}
						/>
						<rect
							x={`${50 - outerNozzleDiameterPercentWidth}%`}
							y="50%"
							width={`${outerNozzleDiameterPercentWidth * 2}%`}
							height={2}
							className={twJoin(
								'fill-brand-500/50 transition-all ease-in-out',
								connectionState === 'connected' && outerNozzleDiameter > 0 ? 'opacity-100' : 'opacity-0',
							)}
						/>
					</svg>
				</div>
				<div className="absolute bottom-24 left-1/4 right-1/4 max-h-[50%] overflow-y-scroll rounded-md bg-zinc-900/70 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:scrollbar-thumb-zinc-600">
					<div ref={animate}>
						{isExposureVisible &&
							options
								.filter(
									(o) =>
										o.key.toLowerCase().includes('gain') ||
										o.key.toLowerCase().includes('exposure') ||
										o.key.startsWith('Ae') ||
										o.key.toLowerCase().includes('brightness'),
								)
								.filter((o) => o.key !== 'ColourGains')
								.map((option) => (
									<div className="p-4" key={option.key}>
										<label className="block text-center text-base font-semibold capitalize text-zinc-200">
											{option.key}
										</label>
										<Slider
											min={'toggle' in option ? 0 : 'min' in option ? option.min : 0}
											max={'toggle' in option ? 0 : 'max' in option ? option.max : 0}
											step={'float' in option && option.float ? 'any' : 1}
											onChange={(val) => setOption(option.key, 'toggle' in option ? !!val : val)}
										/>
									</div>
								))}
						{isColorVisible &&
							options
								.filter(
									(o) =>
										o.key.toLowerCase().includes('saturation') ||
										o.key.toLowerCase().includes('contrast') ||
										o.key.startsWith('Awb'),
								)
								.map((option) => (
									<div className="p-4" key={option.key}>
										<label className="block text-center text-base font-semibold capitalize text-zinc-200">
											{option.key}
										</label>
										<Slider
											min={'toggle' in option ? 0 : 'min' in option ? option.min : 0}
											max={'toggle' in option ? 0 : 'max' in option ? option.max : 0}
											step={'float' in option && option.float ? 'any' : 1}
											onChange={(val) => setOption(option.key, 'toggle' in option ? !!val : val)}
										/>
									</div>
								))}
						{isAdvancedVisible &&
							options.map((option) => (
								<div className="p-4" key={option.key}>
									<label className="block text-center text-base font-semibold capitalize text-zinc-200">
										{option.key}
									</label>
									<Slider
										min={'toggle' in option ? 0 : 'min' in option ? option.min : 0}
										max={'toggle' in option ? 0 : 'max' in option ? option.max : 0}
										step={'float' in option && option.float ? 'any' : 1}
										onChange={(val) => setOption(option.key, 'toggle' in option ? !!val : val)}
									/>
								</div>
							))}
					</div>
				</div>
				<div className={twMerge('pointer-events-none absolute inset-0 flex items-center justify-center')}>
					<h3
						className={twMerge(
							'absolute inset-0 flex items-center justify-center text-xl font-semibold text-rose-500 transition-all dark:text-rose-500',
							connectionState === 'failed' ? 'animate-pulse opacity-100' : 'opacity-0',
						)}
					>
						Webcam stream not found
					</h3>
					<Spinner
						noMargin={true}
						className={twMerge(
							'h-1/3 w-1/3 animate-spin text-inherit transition-all',
							'text-green-500 dark:text-green-500',
							(connectionState === 'connected' || connectionState === 'failed') && 'opacity-0',
							connectionState === 'failed' && 'text-rose-500 dark:text-rose-500',
							connectionState === 'connecting' && 'text-brand-500 dark:text-brand-500',
							connectionState === 'closed' && 'text-yellow-500 dark:text-yellow-500',
							connectionState === 'disconnected' && 'text-amber-500 dark:text-amber-500',
							connectionState === 'new' && 'text-sky-500 dark:text-sky-500',
						)}
					/>
				</div>
			</div>
		</div>
	);
}
