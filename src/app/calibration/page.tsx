'use client';
import { HomeIcon } from '@heroicons/react/24/solid';
import Toolbar, { ToolbarButton } from '../../components/common/toolbar';
import { useWebRTC } from '../_hooks/webrtc';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
	CameraIcon,
	ArrowsPointingOutIcon,
	LightBulbIcon,
	SunIcon,
	SwatchIcon,
	MapPinIcon,
	CogIcon,
} from '@heroicons/react/24/outline';
import { z } from 'zod';
import { useDebounce } from '../_hooks/debounce';
import { useDragPosition, useDrop } from '../_hooks/draganddrop';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { twMerge } from 'tailwind-merge';
import { CameraSettingsDialog, initialCameraSettings } from './camera-settings-dialog';
import { useMoonrakerState } from '../../moonraker/hooks';

const useGcodeCommand = () => {
	return useCallback((command: string) => {
		console.log(command);
	}, []);
};

const parseOptions = (options: string) => {
	const matches = options.matchAll(/- available option:\s(\w+)\s.+(\[\d+\.\.\d+\])/g);
	let result: { key: string; min: number; max: number }[] = [];
	for (const match of matches) {
		const [min, max] = match[2]
			.slice(1, -1)
			.split('..')
			.map((n) => parseInt(n, 10));
		if ((result.find((o) => o.key === match[1])?.max ?? 999999999999) <= max) {
			continue;
		}
		result.push({
			key: match[1],
			min,
			max: ['redbalance', 'bluebalance', 'greenbalance'].includes(match[1]) ? 2000 : max,
		});
	}
	return result;
};

const ExposureZod = z.number().min(4).max(3522);
const DigiGainZod = z.number().min(254).max(4095);
const useCameraSettings = (url: string) => {
	const [options, setOptions] = useState<{ key: string; min: number; max: number }[]>([]);
	const exposure = useCallback(
		async (val: z.input<typeof ExposureZod>) => {
			const newExpo = ExposureZod.parse(val);
			await fetch(`${url}/webcam/option?exposure=${newExpo}`);
		},
		[url],
	);
	const digitalGain = useCallback(
		async (val: number) => {
			const newGain = DigiGainZod.parse(val);
			await fetch(`${url}/webcam/option?digitalgain=${newGain}`);
		},
		[url],
	);

	const compression = useCallback(
		async (val: NumbersBefore<101>) => {
			const res = await fetch(`${url}/webcam/option?compressionquality=${val}`);
			setOptions(parseOptions(await res.text()));
		},
		[url],
	);

	const setOption = useCallback(
		async (key: string, value: number) => {
			const opt = options.find((o) => o.key === key);
			if (opt == null) {
				throw new Error(`Invalid option ${key}`);
			}
			if (opt.min > value || opt.max < value) {
				throw new Error(`Value ${value} is out of range for ${key}`);
			}
			try {
				const res = await fetch(`${url}/webcam/option?${key}=${value}`);
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

const url = 'http://ratos-vaoc.local';

type SliderProps = {
	min: number;
	max: number;
	onChange?: (val: number) => void;
	initialValue?: number;
};
const Slider: React.FC<SliderProps> = ({ onChange, min, max, initialValue }) => {
	const [val, setValue] = useState(initialValue ?? min);
	const _onChange = useDebounce(
		useCallback(
			(val: number) => {
				onChange?.(val);
			},
			[onChange],
		),
		500,
	);
	const onInput = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const val = parseInt(e.target.value, 10);
			setValue(val);
			_onChange(val);
		},
		[_onChange],
	);
	return (
		<div className="relative mb-6">
			<input
				type="range"
				value={val}
				onChange={onInput}
				min={min}
				max={max}
				step={1}
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

export default function Page() {
	const { videoRef } = useWebRTC(`${url}/webcam/webrtc`);
	const [settings] = useMoonrakerState('RatOS', 'camera-settings', initialCameraSettings);
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(null);
	const pos = useDragPosition(containerRef);
	useDrop(videoRef, (e) => {
		setStartPos(null);
		pos.reset();
	});
	const onDragStart = useCallback(
		(e: React.DragEvent) => {
			if (videoRef.current == null || e.dataTransfer == null) {
				console.log('missing stuff');
				return;
			}
			e.dataTransfer.setData('text/plain', 'image');
			e.dataTransfer.setDragImage(new Image(), 0, 0);
			e.dataTransfer.dropEffect = 'move';
			e.dataTransfer.effectAllowed = 'move';
			setStartPos({ x: e.pageX, y: e.pageY });
			e.stopPropagation();
		},
		[videoRef],
	);
	const { exposure, digitalGain, options, setOption } = useCameraSettings(url);
	const [isHomed, setIsHomed] = useState(false);
	const [canMove, setCanMove] = useState(false);
	const [isSettingsVisible, setIsSettingsVisible] = useState(false);
	const [isExposureVisible, setIsExposureVisible] = useState(false);
	const [isGainVisible, setIsGainVisible] = useState(false);
	const [isAdvancedVisible, setIsAdvancedVisible] = useState(false);
	const [light, setLight] = useState(false);
	const [zoom, setZoom] = useState(1);
	const [isCameraControlsVisible, setIsCameraControlsVisible] = useState(false);
	const gcodeCommand = useGcodeCommand();
	const [animate] = useAutoAnimate();

	const toScreen = useCallback(
		(val: number) => {
			const vidWidth = videoRef.current?.videoWidth ?? 1;
			const frameWidth = containerRef.current?.getBoundingClientRect().width ?? 1;
			const videoScale = frameWidth / vidWidth;
			console.log('getting val', settings.pixelPrMm, zoom, val, videoScale);
			return val * settings.pixelPrMm * zoom * videoScale;
		},
		[settings.pixelPrMm, videoRef, zoom],
	);

	const topLeftControls: ToolbarButton[] = [
		{
			icon: HomeIcon,
			id: 'home',
			onClick: () => {
				gcodeCommand('G28');
				setIsHomed(true);
			},
			isActive: isHomed,
		},
		{
			name: 'T0',
			id: 't0',
			onClick: () => {
				gcodeCommand('T0');
			},
			isActive: true,
		},
		{
			name: 'T1',
			id: 't1',
			onClick: () => {
				gcodeCommand('T1');
			},
			isActive: false,
		},
	];
	const topRightControls: ToolbarButton[] = [
		{
			name: '1X',
			id: '1x',
			onClick: () => {
				setZoom(1);
			},
			isActive: zoom === 1,
		},
		{
			name: '2X',
			id: '2x',
			onClick: () => {
				setZoom(2);
			},
			isActive: zoom === 2,
		},
		{
			name: '4X',
			id: '4x',
			onClick: () => {
				setZoom(4);
			},
			isActive: zoom === 4,
		},
		{
			icon: LightBulbIcon,
			id: 'light',
			onClick: () => {
				gcodeCommand('SET_LED VALUE=1');
				setLight((l) => !l);
			},
			isActive: light,
		},
	];
	const bottomLeftControls = useMemo(
		() =>
			[
				{
					name: 'Settings',
					icon: CogIcon,
					id: 'settings',
					onClick: () => {
						setIsSettingsVisible((vis) => !vis);
					},
					isActive: isSettingsVisible,
				},
				{
					name: 'Set Reference',
					icon: MapPinIcon,
					id: 'reference',
					onClick: () => {
						gcodeCommand('SET_VAOC_REFERENCE');
					},
					isActive: false,
				},
				{
					name: 'Move',
					icon: ArrowsPointingOutIcon,
					id: 'move',
					onClick: () => {
						setCanMove((m) => !m);
					},
					isActive: canMove,
				},
			] satisfies ToolbarButton[],
		[canMove, gcodeCommand, isSettingsVisible],
	);
	const cameraControls = useMemo(() => {
		const controls: ToolbarButton[] = [
			{
				icon: CameraIcon,
				id: 'settings',
				onClick: () => {
					setIsCameraControlsVisible((vis) => !vis);
				},
				isActive: isCameraControlsVisible,
			},
			{
				icon: SunIcon,
				id: 'exposure',
				name: 'Exposure',
				hidden: !isCameraControlsVisible,
				onClick: () => {
					console.log('exposure controls');
					setIsExposureVisible((vis) => !vis);
				},
				isActive: isExposureVisible,
			},
			{
				icon: LightBulbIcon,
				id: 'gain',
				name: 'Gain',
				hidden: !isCameraControlsVisible,
				onClick: () => {
					setIsGainVisible((vis) => !vis);
				},
				isActive: isGainVisible,
			},
			{
				icon: SwatchIcon,
				id: 'whitebalance',
				name: 'Advanced',
				hidden: !isCameraControlsVisible,
				onClick: () => {
					setIsAdvancedVisible((vis) => !vis);
				},
				isActive: isAdvancedVisible,
			},
		];
		return controls.reverse();
	}, [isAdvancedVisible, isCameraControlsVisible, isExposureVisible, isGainVisible]);
	const draggedX = startPos == null || pos?.pageXY == null ? 0 : (pos.pageXY.x - startPos.x) / zoom;
	const draggedY = startPos == null || pos?.pageXY == null ? 0 : (pos.pageXY.y - startPos.y) / zoom;
	return (
		<div className="flex h-[calc(100vh_-_64px)] w-full items-center">
			<div
				className="relative mx-auto max-w-fit overflow-hidden rounded-2xl object-contain shadow-lg"
				ref={containerRef}
			>
				<video
					ref={videoRef}
					onDragStart={onDragStart}
					className={twMerge(
						'h-full max-h-full w-full max-w-full transform-gpu',
						canMove && 'cursor-move',
						startPos == null && 'transition-transform ease-in-out',
					)}
					style={{
						transform: `scaleX(${zoom * (settings.flipHorizontal ? -1 : 1)}) scaleY(${zoom * (settings.flipVertical ? -1 : 1)}) translateX(${draggedX}px) translateY(${draggedY}px)`,
					}}
					autoPlay
					muted
					playsInline
					draggable={canMove}
				/>
				<Toolbar className="absolute left-5 top-5" buttons={topLeftControls} />
				<Toolbar className="absolute bottom-5 right-5" buttons={cameraControls} />
				<Toolbar className="absolute right-5 top-5" buttons={topRightControls} />
				<Toolbar className="absolute bottom-5 left-5" buttons={bottomLeftControls} />
				<CameraSettingsDialog isVisible={isSettingsVisible} />
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<svg width="100%" height="100%">
						<circle
							cx="50%"
							cy="50%"
							r={toScreen(0.4 / 2)}
							fill="none"
							className="stroke-brand-500 transition-all"
							strokeWidth="2"
						/>
						<circle
							cx="50%"
							cy="50%"
							r={toScreen(settings.outerNozzleDiameter / 2)}
							fill="none"
							className="stroke-brand-500 opacity-50 transition-all"
							strokeWidth="2"
						/>
					</svg>
				</div>
				<div className="absolute bottom-24 left-1/4 right-1/4 max-h-[50%] overflow-y-scroll rounded-md bg-zinc-900/70 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:scrollbar-thumb-zinc-600">
					<div ref={animate}>
						{isExposureVisible && (
							<div className="p-4">
								<label className="block text-center text-base font-semibold text-zinc-200">Exposure</label>
								<Slider min={4} max={3522} onChange={exposure} />
							</div>
						)}
						{isGainVisible && (
							<div className="p-4">
								<label className="block text-center text-base font-semibold text-zinc-200">Gain</label>
								<Slider min={254} max={4096} onChange={digitalGain} />
							</div>
						)}
						{isAdvancedVisible &&
							options.map((option) => (
								<div className="p-4" key={option.key}>
									<label className="block text-center text-base font-semibold capitalize text-zinc-200">
										{option.key}
									</label>
									<Slider min={option.min} max={option.max} onChange={(val) => setOption(option.key, val)} />
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}
