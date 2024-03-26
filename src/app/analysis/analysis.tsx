'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useToolheads } from '@/hooks/useToolheadConfiguration';
import { Card } from '@/components/common/card';
import {
	PSDChartMinimumYVisibleRange,
	PSD_CHART_AXIS_AMPLITUDE_ID,
	useADXLSignalChart,
	usePSDChart,
} from '@/app/analysis/charts';
import { MicrophoneIcon } from '@heroicons/react/20/solid';
import { useGcodeCommand } from '@/app/_hooks/toolhead';
import { twJoin } from 'tailwind-merge';
import { DotFilledIcon, MixIcon } from '@radix-ui/react-icons';
import { Spinner } from '@/components/common/spinner';
import { SciChartReact } from 'scichart-react';
import {
	useADXLFifoTensor,
	useAccumulatedPSD,
	useBufferedADXLSignal,
	useBufferedPSD,
	useDynamicAxisRange,
	useRealtimeADXL,
	useTicker,
} from '@/app/analysis/hooks';
import { MountainAnimation, SciChartSurface, easing } from 'scichart';
import { detrendSignal } from '@/app/analysis/periodogram';
import { useTopMenu } from '@/app/topmenu';
import { FullLoadScreen } from '@/components/common/full-load-screen';
import { RealtimeAnalysisChart, useRealtimeAnalysisChart } from '@/app/analysis/realtime-analysis-chart';

SciChartSurface.configure({
	wasmUrl: '/configure/scichart2d.wasm',
	dataUrl: '/configure/scichart2d.data',
});

export const Analysis = () => {
	const realtimeAnalysis = useRealtimeAnalysisChart();

	const [isRecording, setIsRecording] = useState(false);
	const [isMacroRunning, setIsMacroRunning] = useState(false);
	const G = useGcodeCommand();

	const recordShaperGraph = useCallback(
		async (axis: 'x' | 'y') => {
			realtimeAnalysis.setIsChartEnabled(true);
			await G`
				MAYBE_HOME
				M400
			`;
			await realtimeAnalysis.psds.startAccumulation();
			setIsRecording(true);
			await G`
				GENERATE_RESONANCES AXIS=${axis.toUpperCase()}
				M400
			`;
			const psd = await realtimeAnalysis.psds.stopAccumulation();
			setIsRecording(false);
			realtimeAnalysis.setIsChartEnabled(false);
		},
		[G, realtimeAnalysis],
	);

	const recordBeltGraph = useCallback(async () => {
		realtimeAnalysis.setIsChartEnabled(true);
		await G`
			MAYBE_HOME
			M400
		`;
		await realtimeAnalysis.psds.startAccumulation();
		setIsRecording(true);
		await G`
			GENERATE_RESONANCES AXIS=1,1
			M400
		`;
		const upperpsd = await realtimeAnalysis.psds.stopAccumulation();
		await realtimeAnalysis.psds.startAccumulation();
		setIsRecording(true);
		await G`
			GENERATE_RESONANCES AXIS=1,-1
			M400
		`;
		const lowerpsd = await realtimeAnalysis.psds.stopAccumulation();
		setIsRecording(false);
		realtimeAnalysis.setIsChartEnabled(false);
	}, [G, realtimeAnalysis]);

	const runMacro = useCallback(
		<T extends (...args: Parameters<T>) => Promise<any>>(macro: T, ...args: Parameters<T>) =>
			async () => {
				setIsMacroRunning(true);
				await macro(...args);
				setIsMacroRunning(false);
			},
		[],
	);

	const MacroIcon = useMemo(
		() =>
			isRecording ? (
				<DotFilledIcon className="h-4 w-4 scale-150 text-red-400" />
			) : isMacroRunning ? (
				<Spinner noMargin={true} className="h-4 w-4" />
			) : (
				<MixIcon className="h-4 w-4" />
			),
		[isMacroRunning, isRecording],
	);

	useTopMenu(
		'analysis',
		useCallback(
			(Menu) => (
				<>
					<Menu.MenubarMenu>
						<Menu.MenubarTrigger className="flex-nowrap space-x-2 whitespace-nowrap text-nowrap">
							<MicrophoneIcon className={twJoin('h-4 w-4', realtimeAnalysis.isChartEnabled && 'text-brand-400')} />{' '}
							<span>Stream</span>
						</Menu.MenubarTrigger>
						<Menu.MenubarContent onCloseAutoFocus={(e) => e.preventDefault()}>
							<Menu.MenubarItem
								disabled={realtimeAnalysis.isChartEnabled}
								onClick={async () => {
									realtimeAnalysis.setIsChartEnabled(true);
								}}
							>
								Start
							</Menu.MenubarItem>
							<Menu.MenubarItem
								disabled={!realtimeAnalysis.isChartEnabled}
								onClick={async () => {
									realtimeAnalysis.setIsChartEnabled(false);
								}}
							>
								Stop
							</Menu.MenubarItem>
							<Menu.MenubarSeparator />
							<Menu.MenubarItem disabled={!isRecording}>Stop recording</Menu.MenubarItem>
						</Menu.MenubarContent>
					</Menu.MenubarMenu>
					<Menu.MenubarMenu>
						<Menu.MenubarTrigger className="flex-nowrap space-x-2 whitespace-nowrap text-nowrap">
							{MacroIcon} <span>Macros</span>
						</Menu.MenubarTrigger>
						<Menu.MenubarContent onCloseAutoFocus={(e) => e.preventDefault()}>
							<Menu.MenubarItem disabled={isRecording} onSelect={runMacro(recordBeltGraph)}>
								CoreXY Belt Tension
							</Menu.MenubarItem>
							<Menu.MenubarItem disabled={isRecording} onSelect={runMacro(recordShaperGraph, 'x')}>
								X Shaper Graph
							</Menu.MenubarItem>
							<Menu.MenubarItem disabled={isRecording} onSelect={runMacro(recordShaperGraph, 'y')}>
								Y Shaper Graph
							</Menu.MenubarItem>
							<Menu.MenubarSeparator />
							<Menu.MenubarItem disabled={!isRecording}>Abort</Menu.MenubarItem>
						</Menu.MenubarContent>
					</Menu.MenubarMenu>
				</>
			),
			[realtimeAnalysis, isRecording, MacroIcon, runMacro, recordBeltGraph, recordShaperGraph],
		),
	);

	return <RealtimeAnalysisChart {...realtimeAnalysis.chartProps} />;
};
