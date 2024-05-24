'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useGcodeCommand } from '@/app/_hooks/toolhead';
import { twJoin } from 'tailwind-merge';
import { DotFilledIcon } from '@radix-ui/react-icons';
import { Spinner } from '@/components/common/spinner';
import { SciChartSurface } from 'scichart';
import { useTopMenu } from '@/app/topmenu';
import { RealtimeAnalysisChart, useRealtimeAnalysisChart } from '@/app/analysis/realtime-analysis-chart';
import Link from 'next/link';
import { trpc } from '@/utils/trpc';
import { Macro, MacroRecordingSettings } from '@/zods/analysis';
import * as uuid from 'uuid';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { getLogger } from '@/app/_helpers/logger';
import {
	ArrowDownToDot,
	AudioLines,
	AudioWaveform,
	Ban,
	Cpu,
	Home,
	List,
	Move3D,
	MoveDiagonal,
	MoveDiagonal2,
	MoveHorizontal,
	MoveRight,
	MoveVertical,
	Pause,
	PencilRuler,
	Play,
	Plus,
	ServerIcon,
	SquareFunction,
	Target,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useToolheads } from '@/hooks/useToolheadConfiguration';
import { KlipperAccelSensorName } from '@/zods/hardware';

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
		if (isOscillating.current) {
			return;
		}
		// time to do a full oscillation (250ms t_seq)
		const oscTime = 500 / frequencyRef.current;
		// aim for TARGET_OSC_TIME to allow for relatively fast updates
		const macroTime = Math.floor(Math.max(250, TARGET_OSC_TIME - (TARGET_OSC_TIME % oscTime)));
		const direction = axisRef.current === 'a' ? '1,1' : axisRef.current === 'b' ? '1,-1' : axisRef.current;
		const beforeGcode = new Date().getTime();
		try {
			if (!isEnabledRef.current) {
				isOscillating.current = false;
				return;
			}
			isOscillating.current = true;
			await G`
			OSCILLATE FREQ=${frequencyRef.current} TIME=${macroTime / 1000} AXIS=${direction}
			`;
			isOscillating.current = false;
			const gcodeDuration = new Date().getTime() - beforeGcode;
			if (frequencyRef.current > 0 && gcodeDuration > macroTime) {
				// If the gcode took longer than the macro time, we need to start it again
				setTimeout(() => {
					oscillate();
				}, 1);
			} else {
				setTimeout(() => {
					oscillate();
				}, macroTime - gcodeDuration);
			}
		} catch (e) {
			isOscillating.current = false;
			getLogger().error(e, 'Failed to oscillate');
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
	const [macros] = trpc.analysis.getMacros.useSuspenseQuery({ limit: 10 });
	const router = useRouter();
	const toolheads = useToolheads();
	const hasBeacon = useMemo(
		() => toolheads.some((th) => th.getYAccelerometerName() === 'beacon' || th.getXAccelerometerName() === 'beacon'),
		[toolheads],
	);
	const [adxl, setAdxl] = useState<MacroRecordingSettings['accelerometer']>(toolheads[0].getYAccelerometerName());
	const {
		isChartEnabled,
		setIsChartEnabled,
		streamStarted,
		chartProps,
		psds,
		currentAccelerometer,
		currentAccelerometerHardwareName,
	} = useRealtimeAnalysisChart(adxl);
	const { mutateAsync: mutateRecordingAsync } = trpc.analysis.saveRecording.useMutation(macroRecordingMutationOptions);
	const isChartEnabledRef = useRef(isChartEnabled);
	isChartEnabledRef.current = isChartEnabled;

	const [isRecording, setIsRecording] = useState(false);
	const [isMacroRunning, setIsMacroRunning] = useState(false);
	const currentMacro = useRef<Macro | null>(null);
	const G = useGcodeCommand();

	const { frequency, setFrequency, axis, setAxis } = useOscillator(G, isChartEnabled && !isMacroRunning);

	const abortController = useRef(new AbortController());

	const runMacro = useCallback(
		<Params extends readonly unknown[]>(macro: (...args: [AbortSignal, ...Params]) => Promise<any>, ...args: Params) =>
			async () => {
				abortController.current = new AbortController();
				const wasStreaming = isChartEnabledRef.current;
				setFrequency(0);
				setIsMacroRunning(true);
				setIsChartEnabled(true);
				await streamStarted();
				try {
					await macro(abortController.current.signal, ...args);
				} catch (e) {
					if (abortController.current.signal.aborted || (e instanceof DOMException && e.name === 'AbortError')) {
						getLogger().info(e, 'Macro run aborted');
						toast.info('Macro run aborted', {
							description: 'The macro run was aborted',
						});
					} else {
						getLogger().error(`Macro run failed`, e);
						toast.error('Macro failed', {
							description:
								e instanceof Error
									? e.message
									: e instanceof String
										? e
										: 'An unknown error occurred while running the macro',
						});
					}
				} finally {
					setIsMacroRunning(false);
					setIsRecording(false);
					if (!wasStreaming) {
						setIsChartEnabled(false);
					}
					currentMacro.current = null;
				}
			},
		[setFrequency, setIsChartEnabled, streamStarted],
	);

	const MacroIcon = useMemo(
		() =>
			isRecording ? (
				<DotFilledIcon className="h-4 w-4 scale-150 text-red-400" />
			) : isMacroRunning ? (
				<Spinner noMargin={true} className="h-4 w-4 group-data-[state=open]:text-white" />
			) : (
				<SquareFunction className="h-5 w-5 text-white group-data-[state=open]:text-white lg:text-white/60" />
			),
		[isMacroRunning, isRecording],
	);

	const buildMacro = useCallback(
		(macro: Macro) =>
			runMacro(async (abort: AbortSignal) => {
				currentMacro.current = macro;
				const macroRunId = uuid.v4();
				const mutations: Promise<any>[] = [];
				const sequences = macro.sequences.map((sequence) => async () => {
					if (abort.aborted) {
						throw new DOMException('Macro run aborted by user', 'AbortError');
					}
					const startTs = new Date().getTime();
					setAdxl(sequence.recording?.accelerometer);
					await streamStarted();
					if (sequence.recording?.capturePSD) {
						await psds.startAccumulation();
						setIsRecording(true);
					}
					if (abort.aborted) {
						await psds.stopAccumulation();
						setIsRecording(false);
						throw new DOMException('Macro run aborted by user', 'AbortError');
					}
					await G`
						${sequence.gcode}
						M400
					`;
					if (sequence.recording?.capturePSD) {
						const psd = await psds.stopAccumulation();
						setIsRecording(false);
						if (abort.aborted) {
							throw new DOMException('Macro run aborted by user', 'AbortError');
						}
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
				if (abort.aborted) {
					throw new DOMException('Macro run aborted by user', 'AbortError');
				}
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
							onClick: () => router.push(`/analysis/macros/${macro.id}/recordings/${macroRunId}`), // Todo fix a view of the actual result graph.
						},
					});
				} catch (e) {
					toast.error('Macro run failed', {
						id: macroRunToast,
						description: `An error occurred while saving macro result data for "${macro.name}"`,
					});
				}
			}),
		[
			runMacro,
			streamStarted,
			G,
			psds,
			mutateRecordingAsync,
			currentAccelerometer,
			currentAccelerometerHardwareName,
			router,
		],
	);

	useTopMenu(
		'analysis',
		useCallback(
			(Menu) => (
				<>
					<Menu.MenubarMenu>
						<Menu.MenubarTrigger className="flex-nowrap whitespace-nowrap text-nowrap">
							<Menu.MenubarIcon Icon={AudioLines} className={twJoin(isChartEnabled && 'text-brand-400')} />{' '}
							<span className="hidden lg:inline">Stream</span>
						</Menu.MenubarTrigger>
						<Menu.MenubarContent onCloseAutoFocus={(e) => e.preventDefault()}>
							<Menu.MenubarSub>
								<Menu.MenubarSubTrigger>
									<Menu.MenubarContentIcon Icon={Move3D} /> Accelerometer
								</Menu.MenubarSubTrigger>
								<Menu.MenubarSubContent>
									<Menu.MenubarRadioGroup value={adxl} onValueChange={(e) => setAdxl(e as KlipperAccelSensorName)}>
										<Menu.MenubarRadioItem
											value="rpi"
											className={twJoin(adxl === 'rpi' && 'font-semibold text-brand-400')}
											onSelect={(e) => e.preventDefault()}
										>
											<Menu.MenubarContentIcon Icon={ServerIcon} />
											Host
										</Menu.MenubarRadioItem>
										<Menu.MenubarRadioItem
											value="controlboard"
											className={twJoin(adxl === 'controlboard' && 'font-semibold text-brand-400')}
											onSelect={(e) => e.preventDefault()}
										>
											<Menu.MenubarContentIcon Icon={Cpu} />
											Control Board
										</Menu.MenubarRadioItem>
										{toolheads[0].hasToolboard() && (
											<Menu.MenubarRadioItem
												value="toolboard_t0"
												className={twJoin(adxl === 'toolboard_t0' && 'font-semibold text-brand-400')}
												onSelect={(e) => e.preventDefault()}
											>
												<Menu.MenubarContentIcon Icon={ArrowDownToDot} />
												Toolboard T0
											</Menu.MenubarRadioItem>
										)}
										{toolheads.length > 1 && toolheads[1].hasToolboard() && (
											<Menu.MenubarRadioItem
												value="toolboard_t1"
												className={twJoin(adxl === 'toolboard_t1' && 'font-semibold text-brand-400')}
												onSelect={(e) => e.preventDefault()}
											>
												<Menu.MenubarContentIcon Icon={ArrowDownToDot} />
												Toolboard T1
											</Menu.MenubarRadioItem>
										)}
										{hasBeacon && (
											<Menu.MenubarRadioItem
												value="beacon"
												className={twJoin(adxl === 'beacon' && 'font-semibold text-brand-400')}
												onSelect={(e) => e.preventDefault()}
											>
												<Menu.MenubarContentIcon Icon={Target} />
												Beacon
											</Menu.MenubarRadioItem>
										)}
									</Menu.MenubarRadioGroup>
								</Menu.MenubarSubContent>
							</Menu.MenubarSub>
							<Menu.MenubarSeparator />
							<Menu.MenubarItem
								disabled={isChartEnabled || isMacroRunning}
								onClick={async () => {
									setIsChartEnabled(true);
								}}
							>
								<Menu.MenubarContentIcon Icon={Play} /> Start
							</Menu.MenubarItem>
							<Menu.MenubarItem
								disabled={!isChartEnabled || isMacroRunning}
								onClick={async () => {
									setIsChartEnabled(false);
								}}
							>
								<Menu.MenubarContentIcon Icon={Pause} /> Stop
							</Menu.MenubarItem>
						</Menu.MenubarContent>
					</Menu.MenubarMenu>
					<Menu.MenubarMenu>
						<Menu.MenubarTrigger className="flex-nowrap whitespace-nowrap text-nowrap">
							<Menu.MenubarIcon Icon={PencilRuler} /> <span className="hidden lg:inline">Tools</span>
						</Menu.MenubarTrigger>
						<Menu.MenubarContent onCloseAutoFocus={(e) => e.preventDefault()}>
							<Menu.MenubarItem
								disabled={isMacroRunning}
								onSelect={runMacro(async () => {
									await G`MAYBE_HOME`;
								})}
							>
								<Menu.MenubarContentIcon Icon={Home} />
								Home Printer
							</Menu.MenubarItem>
							<Menu.MenubarSeparator />

							<Menu.MenubarSub>
								<Menu.MenubarSubTrigger>
									<Menu.MenubarContentIcon Icon={AudioWaveform} /> Oscillator
								</Menu.MenubarSubTrigger>
								<Menu.MenubarSubContent>
									<Menu.MenubarRadioGroup value={axis} onValueChange={(e) => setAxis(e as 'x' | 'y' | 'a' | 'b')}>
										<Menu.MenubarRadioItem
											value="x"
											className={twJoin(axis === 'x' && frequency > 0 && 'font-semibold text-brand-400')}
											onSelect={(e) => e.preventDefault()}
										>
											<Menu.MenubarContentIcon Icon={MoveHorizontal} /> Oscillate in X
										</Menu.MenubarRadioItem>
										<Menu.MenubarRadioItem
											value="y"
											className={twJoin(axis === 'y' && frequency > 0 && 'font-semibold text-brand-400')}
											onSelect={(e) => e.preventDefault()}
										>
											<Menu.MenubarContentIcon Icon={MoveVertical} /> Oscillate in Y
										</Menu.MenubarRadioItem>
										<Menu.MenubarRadioItem
											value="a"
											className={twJoin(axis === 'a' && frequency > 0 && 'font-semibold text-brand-400')}
											onSelect={(e) => e.preventDefault()}
										>
											<Menu.MenubarContentIcon Icon={MoveDiagonal} /> Oscillate in A
										</Menu.MenubarRadioItem>
										<Menu.MenubarRadioItem
											value="b"
											className={twJoin(axis === 'b' && frequency > 0 && 'font-semibold text-brand-400')}
											onSelect={(e) => e.preventDefault()}
										>
											<Menu.MenubarContentIcon Icon={MoveDiagonal2} /> Oscillate in B
										</Menu.MenubarRadioItem>
									</Menu.MenubarRadioGroup>
									<Menu.MenubarSeparator />
									<div className="min-w-48 p-4">
										<h3 className="-mt-2 text-center text-2xl font-medium tracking-tight">
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
										<Slider
											min={0}
											className="mt-4"
											max={200}
											value={[frequency]}
											onValueChange={(val) => setFrequency(val[0])}
											step={0.1}
										/>
									</div>
								</Menu.MenubarSubContent>
							</Menu.MenubarSub>
						</Menu.MenubarContent>
					</Menu.MenubarMenu>
					<Menu.MenubarMenu>
						<Menu.MenubarTrigger className="flex-nowrap whitespace-nowrap text-nowrap">
							{MacroIcon} <span className="hidden lg:inline">Macros</span>
						</Menu.MenubarTrigger>
						<Menu.MenubarContent onCloseAutoFocus={(e) => e.preventDefault()}>
							{macros.result?.map((macro) => (
								<Menu.MenubarItem
									key={macro.id}
									disabled={isMacroRunning}
									onSelect={buildMacro(macro)}
									className={twJoin(currentMacro.current?.id === macro.id && 'text-brand-400 opacity-100')}
								>
									{currentMacro.current?.id === macro.id ? MacroIcon : <Menu.MenubarContentIcon Icon={Play} />}
									{macro.name}
								</Menu.MenubarItem>
							))}
							<Menu.MenubarSeparator />
							<Menu.MenubarItem disabled={isMacroRunning} asChild={true} className="pr-8">
								<Link href="/analysis/macros">
									<Menu.MenubarContentIcon Icon={List} /> View All Macros
									<span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
										<MoveRight className="h-4 w-4" />
									</span>
								</Link>
							</Menu.MenubarItem>
							<Menu.MenubarItem disabled={isMacroRunning} asChild={true} className="pr-8">
								<Link href="/analysis/macros/new">
									<Menu.MenubarContentIcon Icon={Plus} /> New Macro
									<span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
										<MoveRight className="h-4 w-4" />
									</span>
								</Link>
							</Menu.MenubarItem>
							<Menu.MenubarSeparator />
							<Menu.MenubarItem disabled={!isMacroRunning} onClick={() => abortController.current.abort()}>
								<Menu.MenubarContentIcon Icon={Ban} className={twJoin(isMacroRunning && 'text-red-400')} />
								Abort {currentMacro.current?.name || ''}
							</Menu.MenubarItem>
						</Menu.MenubarContent>
					</Menu.MenubarMenu>
				</>
			),
			[
				isChartEnabled,
				adxl,
				toolheads,
				hasBeacon,
				isMacroRunning,
				runMacro,
				axis,
				frequency,
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
