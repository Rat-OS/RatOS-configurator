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
import { Book, CircleAlert, ExternalLink, RectangleHorizontal, Square } from 'lucide-react';
import { Button } from '@/components/common/button';
import { twJoin } from 'tailwind-merge';
import { Modal } from '@/components/common/modal';
import { DialogContent } from '@radix-ui/react-dialog';
import { DialogDescription } from '@/components/ui/dialog';

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
			.replace(/<g fill="#FFFFFF"/gi, '<g class="fill-zinc-300"')
			.replace(/<text fill="#FFFFFF"/gi, '<text class="fill-zinc-300"')
			.replace(/<text[^>]+>[0-9]*?([^<0-9]+[^V])<\/text>/g, (sub, group: string) => {
				let fixedTitle = sub.replace(group.substring(1), group.substring(1).toLocaleLowerCase());
				if (group.toLowerCase().includes('bltouch')) {
					fixedTitle = fixedTitle.replace(/bltouch/i, 'BLTouch');
				}
				if (group.toLowerCase().includes('ssr')) {
					fixedTitle = fixedTitle.replace(/ssr/i, 'SSR');
				}
				if (group.toLowerCase().includes(' psu')) {
					fixedTitle = fixedTitle.replace(/\spsu/i, ' PSU');
				}
				return fixedTitle;
			})
			.replace(/Oswald/g, 'Inter');
		return {
			aspect,
			key: board.id,
			board: board,
			img: (
				<div
					className="pointer-events-none flex h-full max-h-full w-full max-w-full select-none items-center justify-center [&_svg>rect]:fill-transparent [&_text]:text-center [&_text]:text-2xl [&_text]:font-semibold [&_text]:capitalize [&_text]:tracking-tight"
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

const fetchFanDiagram = async (board: Board | null) => {
	if (board == null) {
		return null;
	}
	let aspect: null | number = null;
	board.id;
	const diagramFileName = board?.fanWiringDiagramFileName;
	if (diagramFileName?.endsWith('.svg')) {
		const res = await fetch(`/configure/api/mcu-fan-wiring-image?boardId=${board.id}`);
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
			.replace(/<g fill="#FFFFFF"/gi, '<g class="fill-zinc-300"')
			.replace(/<text fill="#FFFFFF"/gi, '<text class="fill-zinc-300"')
			.replace(/<text[^>]+>[0-9]*?([^<0-9]+[^V])<\/text>/g, (sub, group: string) => {
				let fixedTitle = sub.replace(group.substring(1), group.substring(1).toLocaleLowerCase());
				if (group.toLowerCase().includes('bltouch')) {
					fixedTitle = fixedTitle.replace(/bltouch/i, 'BLTouch');
				}
				if (group.toLowerCase().includes('ssr')) {
					fixedTitle = fixedTitle.replace(/ssr/i, 'SSR');
				}
				if (group.toLowerCase().includes(' psu')) {
					fixedTitle = fixedTitle.replace(/\spsu/i, ' PSU');
				}
				return fixedTitle;
			})
			.replace(/Oswald/g, 'Inter');
		return {
			aspect,
			key: board.id,
			board: board,
			img: (
				<div
					className="pointer-events-none flex h-full max-h-full w-full max-w-full select-none items-center justify-center [&_svg>rect]:fill-transparent [&_text]:text-center [&_text]:text-2xl [&_text]:font-semibold [&_text]:capitalize [&_text]:tracking-tight"
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

	const controlboardImage = useQuery({
		queryFn: () => fetchWiringDiagram(controlboard),
		queryKey: ['mcu-wiring-image', controlboard?.id],
	});

	const controlboardFanImage = useQuery({
		queryFn: () => fetchFanDiagram(controlboard),
		queryKey: ['mcu-fan-wiring-image', controlboard?.id],
	});

	const toolheadImages = useQuery({
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

	const toolheadFanImages = useQuery({
		queryFn: async () => {
			return (
				await Promise.all(
					toolheads.map(async (th) => {
						const diagram = await fetchFanDiagram(th.getToolboard());
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
		queryKey: ['toolhead-fan-wiring-image', toolheads.map((th) => th.getToolboard()?.id)],
	});

	const content: React.ReactNode[] = [];

	const generalInfo = (
		<Modal
			title="General Information"
			body="Helpful tips when wiring a board"
			dismissText="Close"
			content={
				<DialogDescription>
					<ul className="grid gap-2">
						<li className="flex gap-2">
							<div className="flex-shrink-0">
								<RectangleHorizontal className="text-brand-400" />
							</div>
							<div>
								A <strong className="text-foreground">small</strong> green rectangle indicates a jumper, place jumpers
								where these are shown, and remove other jumpers from the board.
							</div>
						</li>
						<li className="flex gap-2">
							<div className="flex-shrink-0">
								<Square className="text-brand-400" />
							</div>
							<div>
								A <strong className="text-foreground">large</strong> green rectangle indicates a driver, place drivers
								in the highlighted slots if you need the annotated axis for your particular build. Some printers need
								more or less drivers, and you will later be able to reconfigure the slot ordering.
							</div>
						</li>
						<li></li>
					</ul>
				</DialogDescription>
			}
		>
			<Button variant="warning" size="sm" className="justify-start text-sm" title={`A guide to wiring diagrams`}>
				<CircleAlert className="size-4" />
				General Information
			</Button>
		</Modal>
	);

	if (controlboardImage.data) {
		content.push(
			<Card className="flex flex-col justify-stretch" key={controlboardImage.data.key}>
				<CardHeader>
					<CardTitle className="font-display font-bold tracking-tight text-zinc-300">
						{controlboardImage.data.board.name} wiring
					</CardTitle>
				</CardHeader>
				<CardContent className="grid flex-1 grid-cols-2 gap-4">
					<div className="flex flex-col justify-between">
						<CardDescription>The controlboard, which is connected to the RatOS host computer via USB</CardDescription>
						<div className="mt-4 grid gap-2 whitespace-nowrap">
							{generalInfo}
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
					<div className="mt-1 flex flex-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
						<Lightbox id="controlboard" aspect={controlboardImage.data.aspect}>
							{controlboardImage.data.img}
						</Lightbox>
						{controlboardFanImage.data != null && (
							<Lightbox id="controlboard-fans" aspect={controlboardFanImage.data.aspect}>
								{controlboardFanImage.data.img}
							</Lightbox>
						)}
					</div>
				</CardContent>
			</Card>,
		);
	}
	if (toolheadImages.data != null && toolheadImages.data.length > 0) {
		toolheadImages.data.map((wiring, i) => {
			content.push(
				<Card className="flex flex-col justify-between" key={wiring.key + i}>
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
								{generalInfo}
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
			<div className="p-8 @container">
				{' '}
				<div className="mb-5 border-b border-zinc-200 pb-5 dark:border-zinc-700">
					<h3 className="text-lg font-medium leading-6 text-zinc-900 dark:text-zinc-100">{props.name}</h3>
					<p className="mt-2 max-w-4xl text-sm text-zinc-500 dark:text-zinc-400">{props.description}</p>
				</div>
				<div
					className={twJoin(
						'grid gap-4 text-zinc-700 dark:text-zinc-300',
						content.length > 1 ? '@2xl:grid-cols-2' : 'grid-cols-1',
					)}
				>
					{props.children}
					{content}
				</div>
			</div>
			<StepNavButtons right={rightButton} left={leftButton} />
		</React.Fragment>
	);
};