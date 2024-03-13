'use client';

import { useEffect, useRef, useState } from 'react';
import { useRealtimeADXL } from '@/app/analysis/hooks';

import { SciChartSurface, XyDataSeries } from 'scichart';
import { useToolheads } from '@/hooks/useToolheadConfiguration';
import '@tensorflow/tfjs-backend-webgl';
import { Card } from '@/components/common/card';
import { useAnalysisCharts } from '@/app/analysis/charts';
import Toolbar, { ToolbarButton } from '@/components/common/toolbar';
import { ArrowTrendingUpIcon, MicrophoneIcon } from '@heroicons/react/24/outline';
import { useGcodeCommand } from '@/app/_hooks/toolhead';

export const Analysis = () => {
	const [isChartEnabled, setIsChartEnabled] = useState(false);
	const toolheads = useToolheads();
	const charts = useAnalysisCharts(toolheads[0], isChartEnabled);
	const [isRecording, setIsRecording] = useState(false);
	const G = useGcodeCommand();

	const toolbarButtons: ToolbarButton[] = [
		{
			id: 'stream',
			icon: MicrophoneIcon,
			title: 'Stream Data',
			name: 'Stream Data',
			isActive: isChartEnabled,
			onClick: async () => {
				setIsChartEnabled((isChartEnabled) => !isChartEnabled);
			},
		},
		{
			id: 'record',
			icon: ArrowTrendingUpIcon,
			title: 'Record Data',
			name: 'Record Data',
			isActive: false,
			isLoading: isRecording,
			onClick: async () => {
				if (charts.startAccumulation == null || charts.stopAccumulation == null) return;
				setIsChartEnabled(true);
				setIsRecording(true);
				await G`
				MAYBE_HOME
				M400
				`;
				await charts.startAccumulation();
				await G`
					GENERATE_RESONANCES AXIS=X
					M400
				`;
				const psd = await charts.stopAccumulation();
				setIsChartEnabled(false);
				setIsRecording(false);
			},
		},
	];

	return (
		<div className="flex max-h-full min-h-full flex-col space-y-4">
			<Toolbar buttons={toolbarButtons} />
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
