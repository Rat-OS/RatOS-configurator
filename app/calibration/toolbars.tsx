import React, { useCallback, useMemo, useState } from 'react';
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
	ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { ExposureIcon } from '@/components/common/icons/exposure';
import { FocusControls } from '@/app/calibration/focus-controls';
import { PlayIcon, StopIcon } from '@heroicons/react/24/solid';
import Toolbar, { ToolbarButton, ToolbarButtonWithParent } from '@/components/common/toolbar';
import { usePrinterObjectSubscription } from '@/moonraker/hooks';
import { useGcodeCommand } from '@/app/_hooks/toolhead';
import { useChangeEffect } from '@/hooks/useChangeEffect';
import CountUp from 'react-countup';
import { VaocSettings, VaocSettingsDialog } from '@/app/calibration/vaoc-settings-dialog';
import { StreamSettingsDialog } from '@/app/calibration/stream-settings-dialog';
import { EnterFullscreenIcon, ExitFullscreenIcon } from '@/app/calibration/icons';

type ToolbarsProps = {
	setIsLockingCoordinates: React.Dispatch<React.SetStateAction<boolean>>;
	isLockingCoordinates: boolean;
	setCanMove: React.Dispatch<React.SetStateAction<boolean>>;
	setZoom: React.Dispatch<React.SetStateAction<number>>;
	canMove: boolean;
	zoom: number;
	fps: number;
	url: string;
	isConnected: boolean;
	settings: VaocSettings;
	setSettings: (updater: VaocSettings | ((prev: VaocSettings) => VaocSettings)) => Promise<void>;
	isSettingsFetched: boolean;
	toggleFullscreen: null | ((value?: boolean) => void);
	isFullscreened: boolean;
};

const useToolbarState = (props: { zoom: number }) => {
	const [isStartingVaoc, setIsStartingVaoc] = useState(false);
	const [isSettingsVisible, setIsSettingsVisible] = useState(false);
	const [isExposureVisible, setIsExposureVisible] = useState(false);
	const [isColorVisible, setIsColorVisible] = useState(false);
	const [isFocusVisible, setIsFocusVisible] = useState(false);
	const [isAdvancedVisible, setIsAdvancedVisible] = useState(false);
	const [light, setLight] = useState(false);
	const [_isZoomExpanded, _setIsZoomExpanded] = useState(false);
	const [isCameraControlsVisible, setIsCameraControlsVisible] = useState(false);

	const [tempZoomExpand, clearTempZoomExpand] = useChangeEffect([props.zoom], 2000, true);
	const isZoomExpanded = tempZoomExpand || _isZoomExpanded;
	const toggleIsZoomExpanded = useCallback(() => {
		_setIsZoomExpanded((z) => !z);
		clearTempZoomExpand();
	}, [clearTempZoomExpand]);

	const { hasZOffsetProbe } = usePrinterObjectSubscription((res) => {
		return { hasZOffsetProbe: res.configfile.settings.z_offset_probe != null };
	}, 'configfile') ?? { hasZOffsetProbe: false };
	const [isZOffsetProbeVisible, setIsZOffsetProbeVisible] = useState(false);

	const live_position = usePrinterObjectSubscription((res) => {
		return {
			x: res.motion_report.live_position?.[0],
			y: res.motion_report.live_position?.[1],
			z: res.motion_report.live_position?.[2],
		};
	}, 'motion_report');

	const t0 = usePrinterObjectSubscription((res) => {
		return { active: res['gcode_macro T0'].active };
	}, 'gcode_macro T0');

	const t1 = usePrinterObjectSubscription((res) => {
		return { active: res['gcode_macro T1'].active };
	}, 'gcode_macro T1');

	const { isVaocStarted } = usePrinterObjectSubscription((res) => {
		return { isVaocStarted: res['gcode_macro _VAOC'].is_started };
	}, 'gcode_macro _VAOC') ?? { isVaocStarted: false };

	return {
		live_position,
		tool: t0?.active ? 'T0' : t1?.active ? 'T1' : null,
		isStartingVaoc,
		setIsStartingVaoc,
		isSettingsVisible,
		setIsSettingsVisible,
		isExposureVisible,
		setIsExposureVisible,
		isColorVisible,
		setIsColorVisible,
		isFocusVisible,
		setIsFocusVisible,
		isAdvancedVisible,
		setIsAdvancedVisible,
		light,
		setLight,
		isVaocStarted,
		isZoomExpanded,
		toggleIsZoomExpanded,
		hasZOffsetProbe,
		isZOffsetProbeVisible,
		setIsZOffsetProbeVisible,
		isCameraControlsVisible,
		setIsCameraControlsVisible,
	};
};

export const Toolbars: React.FC<ToolbarsProps> = (props) => {
	const {
		canMove,
		isLockingCoordinates,
		zoom,
		setIsLockingCoordinates,
		setCanMove,
		setZoom,
		fps,
		url,
		isConnected,
		setSettings,
		settings,
		isSettingsFetched,
		isFullscreened,
	} = props;
	const {
		live_position,
		tool,
		isStartingVaoc,
		setIsStartingVaoc,
		isSettingsVisible,
		setIsSettingsVisible,
		isExposureVisible,
		setIsExposureVisible,
		isColorVisible,
		setIsColorVisible,
		isFocusVisible,
		setIsFocusVisible,
		isAdvancedVisible,
		setIsAdvancedVisible,
		light,
		setLight,
		isVaocStarted,
		isZoomExpanded,
		toggleIsZoomExpanded,
		hasZOffsetProbe,
		isZOffsetProbeVisible,
		setIsZOffsetProbeVisible,
		isCameraControlsVisible,
		setIsCameraControlsVisible,
	} = useToolbarState({ zoom });
	const G = useGcodeCommand();
	const [isLoadingTool] = useChangeEffect([isLockingCoordinates], 200, true);

	const topLeftControls: ToolbarButton[] = [
		{
			icon: isVaocStarted ? StopIcon : PlayIcon,
			id: 'start/stop',
			name: isVaocStarted ? undefined : 'Start Calibration',
			title: isVaocStarted ? 'Stop calibration' : 'Start calibration',
			onClick: async () => {
				if (isStartingVaoc) {
					return;
				}
				if (isVaocStarted && isFullscreened) {
					props.toggleFullscreen?.(false);
				}
				setIsStartingVaoc(true);
				await (isVaocStarted ? G`_VAOC_END` : G`_VAOC_START`);
				setIsStartingVaoc(false);
			},
			isActive: isVaocStarted,
		},
		{
			name: 'T0',
			id: 't0',
			hidden: !isVaocStarted,
			title: 'Switch to tool 0 (T0)',
			onClick: async () => {
				setCanMove(false);
				await G`_VAOC_LOAD_TOOL T=0`;
			},
			isActive: tool === 'T0',
		},
		{
			name: 'T1',
			id: 't1',
			hidden: !isVaocStarted,
			title: 'Switch to tool 1 (T1)',
			onClick: async () => {
				setCanMove(false);
				await G`_VAOC_LOAD_TOOL T=1`;
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
			onClick: async () => {
				const newVal = !light;
				await G`_VAOC_SWITCH_LED STATE=${newVal ? 1 : 0}`;
				setLight(newVal);
			},
			isActive: light,
		},
		{
			icon: isFullscreened ? ExitFullscreenIcon : EnterFullscreenIcon,
			id: 'fullscreen',
			title: `${isFullscreened ? 'Exit' : 'Enter'} fullscreen mode`,
			onClick: () => {
				if (props.toggleFullscreen) {
					props.toggleFullscreen();
				}
			},
			isActive: isFullscreened,
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
					isLoading: isLoadingTool,
					hidden: !isVaocStarted,
					id: 'reference',
					title: `Set the ${tool === 'T0' ? 'T0 reference point' : 'T1 offset'}`,
					onClick: async () => {
						setIsZOffsetProbeVisible(hasZOffsetProbe ? true : false);
						setIsLockingCoordinates(true);
						await G`_VAOC_SET_TOOL`;
						setIsLockingCoordinates(false);
						setCanMove(false);
					},
					isActive: isLoadingTool,
				},
				{
					name: canMove ? (
						<span className="font-mono">
							{(live_position?.x ?? 0).toFixed(2)}, {(live_position?.y ?? 0).toFixed(2)}
						</span>
					) : (
						'Move'
					),
					icon: ArrowsPointingOutIcon,
					hidden: !isVaocStarted,
					id: 'move',
					title: `${canMove ? 'Disable' : 'Enable'} drag and drop calibration`,
					onClick: () => {
						if (!canMove) {
							setIsFocusVisible(true);
							setIsExposureVisible(false);
							setIsColorVisible(false);
							setIsAdvancedVisible(false);
							setIsCameraControlsVisible(true);
						} else {
							setIsFocusVisible(false);
							setIsExposureVisible(false);
							setIsColorVisible(false);
							setIsAdvancedVisible(false);
							setIsCameraControlsVisible(false);
						}
						setCanMove((m) => !m);
					},
					isActive: canMove,
				},
				{
					name: 'Z-Probe',
					icon: ArrowDownTrayIcon,
					title: 'Probe the z endstop to set the Z offset',
					id: 'z-probe',
					hidden: !isVaocStarted || !hasZOffsetProbe || !isZOffsetProbeVisible,
					onClick: async () => {
						await G`_VAOC_PROBE_Z_OFFSET`;
					},
					isActive: false,
				},
			] satisfies ToolbarButton[],
		[
			isSettingsVisible,
			tool,
			isLoadingTool,
			isVaocStarted,
			canMove,
			live_position,
			hasZOffsetProbe,
			isZOffsetProbeVisible,
			setIsSettingsVisible,
			setIsZOffsetProbeVisible,
			setIsLockingCoordinates,
			G,
			setCanMove,
			setIsFocusVisible,
			setIsExposureVisible,
			setIsColorVisible,
			setIsAdvancedVisible,
			setIsCameraControlsVisible,
		],
	);
	const cameraControls = useMemo(() => {
		const controls: ToolbarButton[] = [
			{
				icon: CameraIcon,
				name: (
					<span>
						{fps == null ? (
							'Loading...'
						) : (
							<span>
								<CountUp start={0} preserveValue={true} duration={1} end={fps} /> FPS
							</span>
						)}
					</span>
				),
				className: 'font-mono',
				id: 'settings',
				subButtonPosition: 'before',
				title: `${isCameraControlsVisible ? 'Hide' : 'Show'} camera controls`,
				onClick: () => {
					if (isCameraControlsVisible) {
						setIsFocusVisible(false);
						setIsExposureVisible(false);
						setIsColorVisible(false);
						setIsAdvancedVisible(false);
					}
					setIsCameraControlsVisible((vis) => !vis);
				},
				isActive: isCameraControlsVisible,
			},
		];
		return controls;
	}, [
		fps,
		isCameraControlsVisible,
		setIsAdvancedVisible,
		setIsCameraControlsVisible,
		setIsColorVisible,
		setIsExposureVisible,
		setIsFocusVisible,
	]);
	const cameraControlsSubButtons = useMemo(() => {
		const controls: ToolbarButtonWithParent[] = [
			{
				icon: ViewfinderCircleIcon,
				id: 'focus',
				parent: 'settings',
				hidden: isColorVisible || isAdvancedVisible || isExposureVisible,
				name: 'Z Focus',
				title: `${isFocusVisible ? 'Hide' : 'Show'} focus controls`,
				children: <FocusControls isVisible={isFocusVisible} toggle={setIsFocusVisible} />,
				onClick: () => {
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
	}, [
		isColorVisible,
		isAdvancedVisible,
		isExposureVisible,
		isFocusVisible,
		setIsFocusVisible,
		setIsExposureVisible,
		setIsColorVisible,
		setIsAdvancedVisible,
	]);

	return (
		<>
			<Toolbar className="pointer-events-auto absolute left-5 top-5" buttons={topLeftControls} />
			<Toolbar
				className="pointer-events-auto absolute bottom-5 right-5 overflow-visible"
				buttons={cameraControls}
				subButtons={cameraControlsSubButtons}
			/>
			<Toolbar
				className="pointer-events-auto absolute right-5 top-5"
				buttons={topRightControls}
				subButtons={zoomControls}
			/>
			<Toolbar className="pointer-events-auto absolute bottom-5 left-5" buttons={bottomLeftControls} />
			<VaocSettingsDialog
				className="pointer-events-auto"
				isVisible={isSettingsVisible}
				toggle={setIsSettingsVisible}
				settings={settings}
				isSettingsFetched={isSettingsFetched}
				setSettings={setSettings}
			/>
			<StreamSettingsDialog
				className="pointer-events-auto"
				{...{ url, isConnected, isExposureVisible, isColorVisible, isAdvancedVisible }}
			/>
		</>
	);
};
