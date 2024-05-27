import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from '@/components/forms/text-input';
import { Toggle } from '@/components/forms/toggle';
import { useMoonrakerState } from '@/moonraker/hooks';
import { useDebounce } from '@/app/_hooks/debounce';
import { twMerge } from 'tailwind-merge';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ScrollContainer } from '@/components/common/scroll-container';

export const initialCameraSettings = {
	pixelPrMm: 160,
	outerNozzleDiameter: 1,
	flipVertical: false,
	flipHorizontal: false,
};

export type VaocSettings = typeof initialCameraSettings;

type CameraSettingsProps = {
	className?: string;
	isVisible?: boolean;
	settings: VaocSettings;
	setSettings: (updater: VaocSettings | ((prev: VaocSettings) => VaocSettings)) => Promise<void>;
	isSettingsFetched: boolean;
	toggle: (visible: boolean) => void;
};

export const VaocSettingsDialog: React.FC<CameraSettingsProps> = (props) => {
	const { settings, setSettings, isSettingsFetched } = props;
	const hasLoaded = useRef(false);
	const [pixelPrMm, setPixelPrMm] = useState<string | null>(isSettingsFetched ? settings.pixelPrMm.toFixed(2) : null);
	const [outerNozzleDiameter, setOuterNozzleDiameter] = useState<string | null>(
		isSettingsFetched ? settings.outerNozzleDiameter.toFixed(2) : null,
	);
	const debouncedSettings = useDebounce(setSettings, 200);

	useEffect(() => {
		if (isSettingsFetched && hasLoaded.current === false) {
			setPixelPrMm(settings?.pixelPrMm.toFixed(2) ?? initialCameraSettings.pixelPrMm.toFixed(2));
			setOuterNozzleDiameter(
				settings?.outerNozzleDiameter.toFixed(2) ?? initialCameraSettings.outerNozzleDiameter.toFixed(2),
			);
			hasLoaded.current = true;
		}
	}, [settings, isSettingsFetched]);

	const onChangePixelPrMm = (value: string) => {
		const parsed = parseFloat(value);
		setPixelPrMm(value);
		if (isNaN(parsed)) {
			return;
		}
		debouncedSettings((s) => ({ ...(s ?? {}), pixelPrMm: parsed }));
	};

	const onChangeOuterNozzleDiameter = (value: string) => {
		const parsed = parseFloat(value);
		setOuterNozzleDiameter(value);
		if (isNaN(parsed)) {
			return;
		}
		debouncedSettings((s) => ({ ...(s ?? {}), outerNozzleDiameter: parsed }));
	};

	return (
		<ScrollContainer
			className={twMerge(
				'absolute left-5 top-1/2 max-h-[50%] w-80 -translate-y-1/2 scale-100 overflow-y-auto rounded-md border-y border-r border-zinc-800 bg-zinc-100 p-5 shadow-lg transition-all dark:bg-zinc-900/70',
				props.isVisible ? 'translate-x-0 opacity-100' : 'pointer-events-none -translate-x-8 opacity-0',
				props.className,
			)}
			onWheel={(e) => {
				e.stopPropagation();
			}}
		>
			<h3 className="flex flex-1 items-center justify-between text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100">
				<span>Camera Settings</span>
				<XMarkIcon className="h-5 w-5 cursor-pointer" onClick={() => props.toggle(!props.isVisible)} />
			</h3>
			<div className="mt-4 grid grid-cols-1 gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
				<TextInput
					label="Pixel per mm"
					type="number"
					value={pixelPrMm ?? ''}
					placeholder={isSettingsFetched ? undefined : 'Loading...'}
					onChange={onChangePixelPrMm}
					error={isNaN(parseFloat(pixelPrMm ?? '')) ? 'Not a valid number' : undefined}
				/>
				<TextInput
					label="Outer Nozzle Diameter"
					type="number"
					step={0.1}
					value={outerNozzleDiameter ?? ''}
					placeholder={isSettingsFetched ? undefined : 'Loading...'}
					onChange={onChangeOuterNozzleDiameter}
					error={isNaN(parseFloat(outerNozzleDiameter ?? '')) ? 'Not a valid number' : undefined}
				/>
				<Toggle
					label="Flip vertical"
					onChange={(value) => setSettings({ ...(settings ?? initialCameraSettings), flipVertical: value ?? false })}
					description="Whether to flip the camera vertically"
					value={settings?.flipVertical ?? initialCameraSettings.flipVertical}
				/>
				<Toggle
					label="Flip horizontal"
					onChange={(value) => setSettings({ ...(settings ?? initialCameraSettings), flipHorizontal: value ?? false })}
					description="Whether to flip the camera horizontally"
					value={settings?.flipHorizontal ?? initialCameraSettings.flipHorizontal}
				/>
			</div>
		</ScrollContainer>
	);
};
