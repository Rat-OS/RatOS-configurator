'use client';

import { useState } from 'react';

import { useToolheads } from '@/hooks/useToolheadConfiguration';
import { Card } from '@/components/common/card';
import { useAnalysisCharts } from '@/app/analysis/charts';
import { MicrophoneIcon } from '@heroicons/react/20/solid';
import { useGcodeCommand } from '@/app/_hooks/toolhead';
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarTrigger,
} from '@/components/ui/menubar';
import { twJoin } from 'tailwind-merge';
import { DotFilledIcon, MixIcon } from '@radix-ui/react-icons';
import { Spinner } from '@/components/common/spinner';

export const Analysis = () => {
	const [isChartEnabled, setIsChartEnabled] = useState(false);
	const toolheads = useToolheads();
	const charts = useAnalysisCharts(toolheads[0], isChartEnabled);
	const [isRecording, setIsRecording] = useState(false);
	const [isMacroRunning, setIsMacroRunning] = useState(false);
	const G = useGcodeCommand();

	const recordShaperGraph = async (axis: 'x' | 'y') => {
		if (charts.startAccumulation == null || charts.stopAccumulation == null) return;
		setIsChartEnabled(true);
		await G`
		MAYBE_HOME
		M400
		`;
		await charts.startAccumulation();
		setIsRecording(true);
		await G`
			GENERATE_RESONANCES AXIS=${axis.toUpperCase()}
			M400
		`;
		const psd = await charts.stopAccumulation();
		setIsRecording(false);
		setIsChartEnabled(false);
	};

	const recordBeltGraph = async () => {
		if (charts.startAccumulation == null || charts.stopAccumulation == null) return;
		setIsChartEnabled(true);
		await G`
		MAYBE_HOME
		M400
		`;
		await charts.startAccumulation();
		setIsRecording(true);
		await G`
			GENERATE_RESONANCES AXIS=1,1
			M400
		`;
		const upperpsd = await charts.stopAccumulation();
		await charts.startAccumulation();
		setIsRecording(true);
		await G`
			GENERATE_RESONANCES AXIS=1,-1
			M400
		`;
		const lowerpsd = await charts.stopAccumulation();
		setIsRecording(false);
		setIsChartEnabled(false);
	};

	const runMacro =
		<T extends (...args: Parameters<T>) => Promise<any>>(macro: T, ...args: Parameters<T>) =>
		async () => {
			setIsMacroRunning(true);
			await macro(...args);
			setIsMacroRunning(false);
		};

	const MacroIcon = isRecording ? (
		<DotFilledIcon className="h-4 w-4 text-red-400" />
	) : isMacroRunning ? (
		<Spinner noMargin={true} className="h-4 w-4" />
	) : (
		<MixIcon className="h-4 w-4" />
	);

	return (
		<div className="flex max-h-full min-h-full flex-col space-y-4">
			{/* <Toolbar buttons={toolbarButtons} /> */}
			<Menubar>
				<MenubarMenu>
					<MenubarTrigger className="flex-nowrap space-x-2 whitespace-nowrap text-nowrap">
						<MicrophoneIcon className={twJoin('h-4 w-4', isChartEnabled && 'text-brand-400')} /> <span>Stream</span>
					</MenubarTrigger>
					<MenubarContent onCloseAutoFocus={(e) => e.preventDefault()}>
						<MenubarItem
							disabled={isChartEnabled}
							onClick={async () => {
								setIsChartEnabled(true);
							}}
						>
							Start
						</MenubarItem>
						<MenubarItem
							disabled={!isChartEnabled}
							onClick={async () => {
								setIsChartEnabled(false);
							}}
						>
							Stop
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem disabled={!isRecording}>Stop recording</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
				<MenubarMenu>
					<MenubarTrigger className="flex-nowrap space-x-2 whitespace-nowrap text-nowrap">
						{MacroIcon} <span>Macros</span>
					</MenubarTrigger>
					<MenubarContent onCloseAutoFocus={(e) => e.preventDefault()}>
						<MenubarItem disabled={isRecording} onSelect={runMacro(recordBeltGraph)}>
							CoreXY Belt Tension
						</MenubarItem>
						<MenubarItem disabled={isRecording} onSelect={runMacro(recordShaperGraph, 'x')}>
							X Shaper Graph
						</MenubarItem>
						<MenubarItem disabled={isRecording} onSelect={runMacro(recordShaperGraph, 'y')}>
							Y Shaper Graph
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem disabled={!isRecording}>Abort</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<Card className="flex max-h-32 overflow-hidden sm:max-h-72 sm:min-h-72">
					<div className="flex-1 rounded-lg" id="adxlX" ref={charts.xRef} style={{ marginLeft: -300 }} />
				</Card>
				<Card className="flex max-h-32 overflow-hidden sm:max-h-72 sm:min-h-72">
					<div className="flex-1 rounded-lg" id="adxlY" ref={charts.yRef} style={{ marginLeft: -300 }} />
				</Card>
				<Card className="flex max-h-32 overflow-hidden sm:max-h-72 sm:min-h-72">
					<div className="flex-1 rounded-lg" id="adxlZ" ref={charts.zRef} style={{ marginLeft: -300 }} />
				</Card>
			</div>
			<Card className="flex flex-1">
				<div id="psd" ref={charts.psdRef} className="flex-1" />
			</Card>
		</div>
	);
};
