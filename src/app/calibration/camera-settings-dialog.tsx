import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from '../../components/forms/text-input';
import { Toggle } from '../../components/forms/toggle';
import { useMoonrakerState } from '../../moonraker/hooks';
import { useDebounce } from '../_hooks/debounce';
import { twMerge } from 'tailwind-merge';

export const initialCameraSettings = {
	pixelPrMm: 160,
	outerNozzleDiameter: 1,
	flipVertical: false,
	flipHorizontal: false,
};

type CameraSettingsProps = {
	className?: string;
	isVisible?: boolean;
};

export const CameraSettingsDialog: React.FC<CameraSettingsProps> = (props) => {
	const hasLoaded = useRef(false);
	const [settings, setSettings, settingsQuery] = useMoonrakerState('RatOS', 'camera-settings', initialCameraSettings);
	const [pixelPrMm, setPixelPrMm] = useState(settings.pixelPrMm.toFixed(2));
	const [outerNozzleDiameter, setOuterNozzleDiameter] = useState(settings.outerNozzleDiameter.toFixed(2));
	const debouncedSettings = useDebounce(setSettings, 200);

	useEffect(() => {
		if (settingsQuery.isFetched && hasLoaded.current === false) {
			setPixelPrMm(settings?.pixelPrMm.toFixed(2) ?? initialCameraSettings.pixelPrMm.toFixed(2));
			setOuterNozzleDiameter(
				settings?.outerNozzleDiameter.toFixed(2) ?? initialCameraSettings.outerNozzleDiameter.toFixed(2),
			);
			hasLoaded.current = true;
		}
	}, [settings, settingsQuery.isFetched]);

	const onChangePixelPrMm = (value: string) => {
		const parsed = parseFloat(value);
		setPixelPrMm(value);
		if (isNaN(parsed)) {
			return;
		}
		debouncedSettings((s) => ({ ...s, pixelPrMm: parsed }));
	};

	const onChangeOuterNozzleDiameter = (value: string) => {
		const parsed = parseFloat(value);
		console.log(value, parsed);
		setOuterNozzleDiameter(value);
		if (isNaN(parsed)) {
			return;
		}
		debouncedSettings((s) => ({ ...s, outerNozzleDiameter: parsed }));
	};

	return (
		<div
			className={twMerge(
				'absolute left-0 top-1/2 w-80 -translate-y-1/2 transform-gpu overflow-y-auto rounded-r-xl border-y border-r border-zinc-800 bg-zinc-100 p-5 shadow-lg transition-all dark:bg-zinc-900/70',
				props.isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0',
				props.className,
			)}
		>
			<h3 className="flex-1 text-base font-medium leading-7 text-zinc-900 dark:text-zinc-100">Camera Settings</h3>
			<div className="mt-4 grid grid-cols-1 gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
				<TextInput
					label="Pixel per mm"
					type="number"
					value={pixelPrMm}
					onChange={onChangePixelPrMm}
					error={isNaN(parseFloat(pixelPrMm)) ? 'Not a valid number' : undefined}
				/>
				<TextInput
					label="Outer Nozzle Diameter"
					type="number"
					value={outerNozzleDiameter}
					onChange={onChangeOuterNozzleDiameter}
					error={isNaN(parseFloat(outerNozzleDiameter)) ? 'Not a valid number' : undefined}
				/>
				<Toggle
					label="Flip vertical"
					onChange={(value) => setSettings({ ...(settings ?? initialCameraSettings), flipVertical: value ?? false })}
					description="Whether to flip the camera vertically"
					value={settings?.flipVertical ?? initialCameraSettings.flipVertical}
				/>
				<Toggle
					label="Flip hoprizontal"
					onChange={(value) => setSettings({ ...(settings ?? initialCameraSettings), flipHorizontal: value ?? false })}
					description="Whether to flip the camera horizontally"
					value={settings?.flipHorizontal ?? initialCameraSettings.flipHorizontal}
				/>
			</div>
		</div>
	);
};
