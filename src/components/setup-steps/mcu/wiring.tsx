'use client';
import { MCUStepScreenProps } from '@/components/setup-steps/mcu-preparation';
import { StepNavButton, StepNavButtons } from '@/components/step-nav-buttons';
import { StepScreenProps } from '@/hooks/useSteps';
import { ControlboardState } from '@/recoil/printer';
import { PrinterToolheadsState } from '@/recoil/toolhead';
import React, { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { Lightbox } from '@/components/ui/lightbox';
import { motion } from 'framer-motion';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToolheads } from '@/hooks/useToolheadConfiguration';
import { Board, BoardID } from '@/zods/boards';
import { Card } from '@/components/common/card';
import { Badge } from '@/components/common/badge';
import { Book, CircleAlert, ExternalLink } from 'lucide-react';
import { Button } from '@/components/common/button';

const fetchWiringDiagram = async (board: Board | null) => {
	if (board == null) {
		return null;
	}
	let aspect: null | number = null;
	board.id;
	const diagramFileName = board?.wireDiagramFileName;
	if (diagramFileName?.endsWith('.svg')) {
		const res = await fetch(`/configure/api/mcu-wiring-image?boardId=${board.id}`);
		const svg = await res.text();
		const svgWidth = svg?.match(/<svg[^>]*width="([^"]*)"/i)?.[1];
		const svgHeight = svg?.match(/<svg[^>]*height="([^"]*)"/i)?.[1];
		if (svgWidth && svgHeight) {
			aspect = parseFloat(svgWidth.replace('px', '')) / parseFloat(svgHeight.replace('px', ''));
		}
		const updatedSvgString = svg
			.replace(
				/<svg([^>]*?)\s*(width|height)="[^"]*"/i,
				'<svg$1 preserveAspectRatio="xMidYMid meet" style="aspect-ratio: ' + aspect + '"',
			)
			.replace(/<svg([^>]*?)\s*(width|height)="[^"]*"/i, '<svg$1')
			.replace(/<text[^>]+>[0-9]*?([^<0-9]+)<\/text>/g, (sub, group: string) => {
				return sub.replace(group.substring(1), group.substring(1).toLocaleLowerCase());
			})
			.replace(/Oswald/g, 'Inter');
		return {
			aspect,
			key: board.id,
			board: board,
			img: (
				<div
					className="pointer-events-none flex h-full max-h-full w-full max-w-full select-none items-center justify-center"
					dangerouslySetInnerHTML={{ __html: updatedSvgString }}
				/>
			),
		};
	} else if (diagramFileName != null) {
		const img = new window.Image();
		img.src = `/configure/api/mcu-wiring-image?boardId=${board.id}`;
		await new Promise((resolve) => {
			img.onload = resolve;
		});
		aspect = img.width / img.height;
		return {
			aspect,
			key: board.id,
			board: board,
			img: (
				// eslint-disable-next-line @next/next/no-img-element
				<img
					src={img.src}
					alt={`${board?.name} wiring diagram`}
					className="pointer-events-none h-full max-h-full w-full max-w-full select-none object-contain"
					style={{ aspectRatio: aspect }}
				/>
			),
		};
	}
	return null;
};

export const ElectronicsWiring = (props: StepScreenProps) => {
	const controlboard = useRecoilValue(ControlboardState);
	const toolheads = useToolheads();

	const controlboardSvg = useQuery({
		queryFn: () => fetchWiringDiagram(controlboard),
		queryKey: ['mcu-wiring-image', controlboard?.id],
	});

	const toolheadsSvg = useQuery({
		queryFn: async () => {
			return (
				await Promise.all(
					toolheads.map(async (th) => {
						const diagram = await fetchWiringDiagram(th.getToolboard());
						if (diagram != null) {
							return {
								...diagram,
								toolhead: th,
							};
						}
						return null;
					}),
				)
			).filter(Boolean);
		},
		queryKey: ['toolhead-wiring-image', toolheads.map((th) => th.getToolboard()?.id)],
	});

	const content: React.ReactNode[] = [];

	if (controlboardSvg.data) {
		content.push(
			<Card className="flex flex-col justify-stretch">
				<CardHeader key={controlboardSvg.data.key}>
					<CardTitle className="font-display font-bold tracking-tight text-zinc-300">
						{controlboardSvg.data.board.name} wiring
					</CardTitle>
				</CardHeader>
				<CardContent className="grid flex-1 grid-cols-2 gap-4">
					<div className="flex flex-col justify-between">
						<CardDescription>The controlboard, which is connected to the RatOS host computer via USB</CardDescription>
						<div className="mt-4 grid gap-2 whitespace-nowrap">
							<Button
								variant="warning"
								size="sm"
								className="justify-start text-sm"
								title={`Open the manual for the board`}
							>
								<CircleAlert className="size-4" />
								Information
							</Button>
							<Button
								variant="primary"
								size="sm"
								className="justify-start text-sm"
								title={`Open the manual for the board`}
							>
								<Book className="size-4" />
								Manual
							</Button>
							<Button
								variant="indeterminate"
								size="sm"
								className="justify-start text-sm"
								title={`Open the manual for the board`}
							>
								<ExternalLink className="size-4" />
								RatOS Docs
							</Button>
						</div>
					</div>
					<div className="mt-1 flex-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
						<Lightbox id="controlboard" aspect={controlboardSvg.data.aspect}>
							{controlboardSvg.data.img}
						</Lightbox>
					</div>
				</CardContent>
			</Card>,
		);
	}
	if (toolheadsSvg.data != null && toolheadsSvg.data.length > 0) {
		toolheadsSvg.data.map((wiring, i) => {
			content.push(
				<Card className="flex flex-col justify-between">
					<CardHeader key={wiring.key + i}>
						<CardTitle className="font-display font-bold tracking-tight text-zinc-300">
							{wiring.board.name} wiring on Toolhead {wiring.toolhead.getToolCommand()}
						</CardTitle>
					</CardHeader>
					<CardContent className="grid flex-1 grid-cols-2 gap-4">
						<div className="flex flex-col justify-between">
							<CardDescription>
								The toolboard on {wiring.toolhead.getDescription()}, which is connected to the RatOS host computer via
								USB
							</CardDescription>
							<div className="mt-4 grid gap-2 whitespace-nowrap">
								<Button
									variant="warning"
									size="sm"
									className="justify-start text-sm"
									title={`Open the manual for the board`}
								>
									<CircleAlert className="size-4" />
									Information
								</Button>
								<Button
									variant="primary"
									size="sm"
									className="justify-start text-sm"
									title={`Open the manual for the board`}
								>
									<Book className="size-4" />
									Manual
								</Button>
								<Button
									variant="indeterminate"
									size="sm"
									className="justify-start text-sm"
									title={`Open the manual for the board`}
								>
									<ExternalLink className="size-4" />
									RatOS Docs
								</Button>
							</div>
						</div>
						<div className="mt-1 flex-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
							<Lightbox key={i} id={`toolhead-${i}`} aspect={wiring.aspect}>
								{wiring.img}
							</Lightbox>
						</div>
					</CardContent>
				</Card>,
			);
		});
	}

	let rightButton: StepNavButton = {
		onClick: props.nextScreen,
		label: 'Next',
	};
	let leftButton: StepNavButton = {
		onClick: props.previousScreen,
	};

	return (
		<React.Fragment>
			<div className="p-8">
				{' '}
				<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700">
					<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">{props.name}</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">{props.description}</p>
				</div>
				<div className="grid grid-cols-2 gap-4 text-zinc-700 dark:text-zinc-300">
					{props.children}
					{content}
				</div>
			</div>
			<StepNavButtons right={rightButton} left={leftButton} />
		</React.Fragment>
	);
};
