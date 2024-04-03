'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { MicrophoneIcon } from '@heroicons/react/20/solid';
import { useGcodeCommand } from '@/app/_hooks/toolhead';
import { twJoin } from 'tailwind-merge';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { Spinner } from '@/components/common/spinner';
import { SciChartSurface } from 'scichart';
import { useTopMenu } from '@/app/topmenu';
import { RealtimeAnalysisChart, useRealtimeAnalysisChart } from '@/app/analysis/realtime-analysis-chart';
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { trpc } from '@/utils/trpc';
import { Macro, MacroRecording, MacroRecordingSettings } from '@/zods/analysis';
import * as uuid from 'uuid';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getLogger } from '@/app/_helpers/logger';
import { PencilRuler } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { UseTRPCMutationOptions } from '@trpc/react-query/shared';

SciChartSurface.configure({
	wasmUrl: '/configure/scichart2d.wasm',
	dataUrl: '/configure/scichart2d.data',
});

const TARGET_OSC_TIME = 500;

const useOscillator = (G: ReturnType<typeof useGcodeCommand>, isEnabled: boolean = false) => {
	const [frequency, setFrequency] = useState(0);
	const frequencyRef = useRef(frequency);
	frequencyRef.current = frequency;
	const [axis, setAxis] = useState<'x' | 'y' | 'a' | 'b'>('x');
	const axisRef = useRef(axis);
	axisRef.current = axis;
	const isOscillating = useRef(false);
	const isEnabledRef = useRef(isEnabled);
	isEnabledRef.current = isEnabled;

	const oscillate = useCallback(async () => {
		if (frequencyRef.current <= 0) {
			return;
		}
		// time to do a full oscillation (250ms t_seq)
		const oscTime = 500 / frequencyRef.current;
		// aim for TARGET_OSC_TIME to allow for relatively fast updates
		const macroTime = Math.floor(Math.max(250, TARGET_OSC_TIME - (TARGET_OSC_TIME % oscTime)));
		isOscillating.current = true;
		const direction = axisRef.current === 'a' ? '1,1' : axisRef.current === 'b' ? '1,-1' : axisRef.current;
		const beforeGcode = new Date().getTime();
		try {
			await G`
			OSCILLATE FREQ=${frequencyRef.current} TIME=${macroTime / 1000} AXIS=${direction}
			`;
			const gcodeDuration = new Date().getTime() - beforeGcode;
			isOscillating.current = false;
			if (frequencyRef.current > 0 && isEnabledRef.current && gcodeDuration > macroTime / 2) {
				oscillate();
			}
		} catch (e) {
			isOscillating.current = false;
			getLogger().error('Failed to oscillate', e);
			toast.error('Failed to oscillate', {
				description: `
					<div>
						<p>An error occurred while trying to oscillate the printer:</p>
						<pre class="text-wrap mt-4 text-rose-400 font-medium whitespace-pre-wrap">${e instanceof Error ? e.message : e instanceof String ? e : 'Unknown error'}</pre>
					</div>
				`,
			});
		}
	}, [G]);
	useEffect(() => {
		if (frequency > 0 && !isOscillating.current && isEnabled) {
			oscillate();
		}
	}, [oscillate, frequency, isEnabled]);

	return { frequency, setFrequency, axis, setAxis } as const;
};

const macroRecordingMutationOptions: Parameters<typeof trpc.analysis.saveRecording.useMutation>[0] = {
	onError(error, variables) {
		getLogger().error('Failed to save macro sequence recording', {
			error,
			variables: { ...variables, psd: 'removed from log..' },
		});
	},
};

export const Analysis = () => {
	const router = useRouter();
	const [adxl, setAdxl] = useState<MacroRecordingSettings['accelerometer']>(undefined);
	const {
		isChartEnabled,
		setIsChartEnabled,
		chartProps,
		psds,
		currentAccelerometer,
		currentAccelerometerHardwareName,
	} = useRealtimeAnalysisChart(adxl);
	const [macros] = trpc.analysis.getMacros.useSuspenseQuery({ limit: 10 });
	const { mutateAsync: mutateRecordingAsync } = trpc.analysis.saveRecording.useMutation(macroRecordingMutationOptions);

	const [isRecording, setIsRecording] = useState(false);
	const [isMacroRunning, setIsMacroRunning] = useState(false);
	const G = useGcodeCommand();

	const { frequency, setFrequency, axis, setAxis } = useOscillator(G, isChartEnabled && !isMacroRunning);

	const runMacro = useCallback(
		<T extends (...args: Parameters<T>) => Promise<any>>(macro: T, ...args: Parameters<T>) =>
			async () => {
				setFrequency(0);
				setIsMacroRunning(true);
				setIsChartEnabled(true);
				try {
					await macro(...args);
				} catch (e) {
					getLogger().error(`Macro run failed`, e);
					toast.error('Macro failed', {
						description:
							e instanceof Error
								? e.message
								: e instanceof String
									? e
									: 'An unknown error occurred while running the macro',
					});
				} finally {
					setIsMacroRunning(false);
					setIsRecording(false);
					setIsChartEnabled(false);
				}
			},
		[setFrequency, setIsChartEnabled],
	);

	const MacroIcon = useMemo(
		() =>
			isRecording ? (
				<DotFilledIcon className="h-4 w-4 scale-150 text-red-400" />
			) : isMacroRunning ? (
				<Spinner noMargin={true} className="h-4 w-4" />
			) : (
				<PuzzlePieceIcon className="h-4 w-4" />
			),
		[isMacroRunning, isRecording],
	);

	const buildMacro = useCallback(
		(macro: Macro) =>
			runMacro(async () => {
				const macroRunId = uuid.v4();
				const mutations: Promise<any>[] = [];
				const sequences = macro.sequences.map((sequence) => async () => {
					const startTs = new Date().getTime();
					setAdxl(sequence.recording?.accelerometer);
					if (sequence.recording?.capturePSD) {
						await psds.startAccumulation();
						setIsRecording(true);
					}
					await G`
						${sequence.gcode}
						M400
					`;
					if (sequence.recording?.capturePSD) {
						const psd = await psds.stopAccumulation();
						setIsRecording(false);
						mutations.push(
							mutateRecordingAsync({
								recording: {
									id: uuid.v4(),
									macroRecordingRunId: macroRunId,
									macroId: macro.id,
									sequenceId: sequence.id,
									startTimeStamp: startTs,
									endTimeStamp: new Date().getTime(),
									psd,
									name: sequence.name,
									accelerometer: currentAccelerometer,
									recordingHardwareName: currentAccelerometerHardwareName,
								},
							}),
						);
					}
				});
				await sequences.reduce((p, f) => p.then(f), Promise.resolve());
				const macroRunToast = toast.loading('Saving recordings...', {
					description: 'Please wait for recordings to be saved.',
				});
				try {
					await Promise.all(mutations);
					toast.success('Macro run completed', {
						id: macroRunToast,
						description: `Macro "${macro.name}" completed successfully`,
						action: {
							label: 'View Result',
							onClick: () => router.push(`/analysis/macros/${macro.id}/recordings`), // Todo fix a view of the actual result graph.
						},
					});
				} catch (e) {
					toast.error('Macro run failed', {
						id: macroRunToast,
						description: `An error occurred while saving macro result data for "${macro.name}"`,
					});
				}
			}),
		[G, mutateRecordingAsync, psds, currentAccelerometer, currentAccelerometerHardwareName, router, runMacro],
	);

	useTopMenu(
		'analysis',
		useCallback(
			(Menu) => (
				<>
					<Menu.MenubarMenu>
						<Menu.MenubarTrigger className="flex-nowrap space-x-2 whitespace-nowrap text-nowrap">
							<MicrophoneIcon className={twJoin('h-4 w-4', isChartEnabled && 'text-brand-400')} />{' '}
							<span className="hidden lg:inline">Stream</span>
						</Menu.MenubarTrigger>
						<Menu.MenubarContent onCloseAutoFocus={(e) => e.preventDefault()}>
							<Menu.MenubarItem
								disabled={isChartEnabled || isMacroRunning}
								onClick={async () => {
									setIsChartEnabled(true);
								}}
							>
								Start
							</Menu.MenubarItem>
							<Menu.MenubarItem
								disabled={!isChartEnabled || isMacroRunning}
								onClick={async () => {
									setIsChartEnabled(false);
								}}
							>
								Stop
							</Menu.MenubarItem>
						</Menu.MenubarContent>
					</Menu.MenubarMenu>
					<Menu.MenubarMenu>
						<Menu.MenubarTrigger className="flex-nowrap space-x-2 whitespace-nowrap text-nowrap">
							<PencilRuler className="size-4" /> <span className="hidden lg:inline">Tools</span>
						</Menu.MenubarTrigger>
						<Menu.MenubarContent onCloseAutoFocus={(e) => e.preventDefault()}>
							<Menu.MenubarItem
								disabled={isMacroRunning}
								onSelect={runMacro(async () => {
									await G`MAYBE_HOME`;
								})}
							>
								Home Printer
							</Menu.MenubarItem>
							<Menu.MenubarSeparator />

							<Menu.MenubarSub>
								<Menu.MenubarSubTrigger>Oscillator</Menu.MenubarSubTrigger>
								<Menu.MenubarSubContent>
									<Menu.MenubarRadioGroup value={axis} onValueChange={(e) => setAxis(e as 'x' | 'y' | 'a' | 'b')}>
										<Menu.MenubarRadioItem
											value="x"
											className={twJoin(axis === 'x' && frequency > 0 && 'font-semibold text-brand-400')}
										>
											Oscillate in X
										</Menu.MenubarRadioItem>
										<Menu.MenubarRadioItem
											value="y"
											className={twJoin(axis === 'y' && frequency > 0 && 'font-semibold text-brand-400')}
										>
											Oscillate in Y
										</Menu.MenubarRadioItem>
										<Menu.MenubarRadioItem
											value="a"
											className={twJoin(axis === 'a' && frequency > 0 && 'font-semibold text-brand-400')}
										>
											Oscillate in A
										</Menu.MenubarRadioItem>
										<Menu.MenubarRadioItem
											value="b"
											className={twJoin(axis === 'b' && frequency > 0 && 'font-semibold text-brand-400')}
										>
											Oscillate in B
										</Menu.MenubarRadioItem>
									</Menu.MenubarRadioGroup>
									<Menu.MenubarSeparator />
									<div className="min-w-48 p-4">
										<Slider
											min={0}
											className="mt-4"
											max={200}
											value={[frequency]}
											onValueChange={(val) => setFrequency(val[0])}
											step={0.1}
										/>
										<h3 className="mt-4 text-center text-2xl font-medium tracking-tight">
											<Input
												type="number"
												size={1}
												max={200}
												min={0}
												onKeyUp={(e) => e.stopPropagation()}
												onKeyDown={(e) => e.stopPropagation()}
												className="m-0 inline min-w-0 border-none bg-transparent p-0 text-right font-mono text-3xl font-medium tracking-tight"
												value={frequency.toFixed(1)}
												style={{ width: frequency.toFixed(1).length + 'rem' }}
												onChange={(e) => setFrequency(parseFloat(e.target.value))}
											/>
											Hz
										</h3>
									</div>
								</Menu.MenubarSubContent>
							</Menu.MenubarSub>
						</Menu.MenubarContent>
					</Menu.MenubarMenu>
					<Menu.MenubarMenu>
						<Menu.MenubarTrigger className="flex-nowrap space-x-2 whitespace-nowrap text-nowrap">
							{MacroIcon} <span className="hidden lg:inline">Macros</span>
						</Menu.MenubarTrigger>
						<Menu.MenubarContent onCloseAutoFocus={(e) => e.preventDefault()}>
							{macros.result?.map((macro) => (
								<Menu.MenubarItem key={macro.id} disabled={isMacroRunning} onSelect={buildMacro(macro)}>
									{macro.name}
								</Menu.MenubarItem>
							))}
							<Menu.MenubarSeparator />
							<Menu.MenubarItem disabled={isMacroRunning} asChild={true}>
								<Link href="/analysis/macros">View all macros</Link>
							</Menu.MenubarItem>
							<Menu.MenubarSeparator />
							<Menu.MenubarItem disabled={true}>Abort</Menu.MenubarItem>
						</Menu.MenubarContent>
					</Menu.MenubarMenu>
				</>
			),
			[
				isChartEnabled,
				isMacroRunning,
				runMacro,
				frequency,
				axis,
				MacroIcon,
				macros.result,
				setIsChartEnabled,
				G,
				setAxis,
				setFrequency,
				buildMacro,
			],
		),
	);

	return <RealtimeAnalysisChart {...chartProps} />;
};
