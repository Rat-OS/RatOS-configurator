import React from 'react';
import { Slider } from '@/components/forms/slider';
import { useMoonrakerState } from '@/moonraker/hooks';
import { useStreamSettings } from '@/app/calibration/hooks';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { twJoin } from 'tailwind-merge';
import { ScrollContainer } from '@/components/common/scroll-container';

type StreamSettingsDialogProps = {
	url: string;
	isConnected: boolean;
	isExposureVisible: boolean;
	isColorVisible: boolean;
	isAdvancedVisible: boolean;
	className?: string;
};

export const StreamSettingsDialog: React.FC<StreamSettingsDialogProps> = (props) => {
	const { url, isConnected, isAdvancedVisible, isColorVisible, isExposureVisible } = props;
	const [streamSettings, saveStreamSettings, streamSettingsQuery] = useMoonrakerState(
		'RatOS',
		'camera-stream-settings',
	);
	const { options, setOption } = useStreamSettings({
		url,
		isConnected,
		settings: streamSettings,
		saveSettings: saveStreamSettings,
		isInitialLoading: streamSettingsQuery.isInitialLoading,
		isFetched: streamSettingsQuery.isFetched,
	});

	const [animate] = useAutoAnimate();
	return (
		<ScrollContainer
			className={twJoin(
				'absolute bottom-24 left-1/4 right-1/4 max-h-[50%] overflow-y-scroll overscroll-contain rounded-md bg-zinc-900/70',
				props.className,
			)}
		>
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
									isBoolean={'toggle' in option}
									min={'toggle' in option ? 0 : 'min' in option ? option.min : 0}
									initialValue={option.value === true ? 1 : option.value === false ? 0 : option.value}
									max={'toggle' in option ? 1 : 'max' in option ? option.max : 0}
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
									isBoolean={'toggle' in option}
									min={'toggle' in option ? 0 : 'min' in option ? option.min : 0}
									initialValue={option.value === true ? 1 : option.value === false ? 0 : option.value}
									max={'toggle' in option ? 1 : 'max' in option ? option.max : 0}
									step={'float' in option && option.float ? 'any' : 1}
									onChange={(val) => setOption(option.key, 'toggle' in option ? !!val : val)}
								/>
							</div>
						))}
				{isAdvancedVisible &&
					options.map((option) => (
						<div className="p-4" key={option.key}>
							<label className="block text-center text-base font-semibold capitalize text-zinc-200">{option.key}</label>
							<Slider
								isBoolean={'toggle' in option}
								min={'toggle' in option ? 0 : 'min' in option ? option.min : 0}
								initialValue={option.value === true ? 1 : option.value === false ? 0 : option.value}
								max={'toggle' in option ? 1 : 'max' in option ? option.max : 0}
								step={'float' in option && option.float ? 'any' : 1}
								onChange={(val) => setOption(option.key, 'toggle' in option ? !!val : val)}
							/>
						</div>
					))}
			</div>
		</ScrollContainer>
	);
};
