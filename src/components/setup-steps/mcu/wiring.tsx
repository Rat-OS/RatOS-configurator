'use client';
import { StepNavButton, StepNavButtons } from '@/components/step-nav-buttons';
import { StepScreenProps } from '@/hooks/useSteps';
import { ControlboardState } from '@/recoil/printer';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { Lightbox } from '@/components/ui/lightbox';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToolheads } from '@/hooks/useToolheadConfiguration';
import { Board } from '@/zods/boards';
import { Card } from '@/components/common/card';
import { Book, CircleAlert, ExternalLink, RectangleHorizontal, Square } from 'lucide-react';
import { Button } from '@/components/common/button';
import { twJoin } from 'tailwind-merge';
import { Modal } from '@/components/common/modal';
import { DialogDescription } from '@/components/ui/dialog';
import { PDFModal } from '@/components/common/pdf-modal';

const SVGClassNames =
	'pointer-events-none flex h-full max-h-full w-full max-w-full select-none items-center justify-center [&_svg>rect]:fill-transparent [&_text]:text-center [&_text]:font-medium [&_text]:capitalize [&_text]:tracking-tighter';

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
			img: <div className={SVGClassNames} dangerouslySetInnerHTML={{ __html: updatedSvgString }} />,
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
			img: <div className={SVGClassNames} dangerouslySetInnerHTML={{ __html: updatedSvgString }} />,
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
			<Button variant="warning" className="flex-1 px-4" title={`A guide to wiring diagrams`}>
				<CircleAlert className="size-4" />
				Information
			</Button>
		</Modal>
	);

	if (controlboardImage.data) {
		content.push(
			<Card className="flex flex-col justify-stretch" key={controlboardImage.data.key}>
				<CardHeader className="border-b border-border">
					<CardTitle className="font-display font-bold tracking-tight text-zinc-300">
						{controlboardImage.data.board.name} wiring
					</CardTitle>
					<CardDescription>The controlboard, which is connected to the RatOS host computer via USB</CardDescription>
				</CardHeader>
				<CardContent
					className={twJoin(
						'grid flex-1 grid-cols-2 gap-4 border-b border-border',
						controlboardFanImage.data != null ? 'grid-cols-2' : 'grid-cols-1',
					)}
				>
					<Lightbox id="controlboard" aspect={controlboardImage.data.aspect}>
						{controlboardImage.data.img}
					</Lightbox>
					{controlboardFanImage.data != null && (
						<Lightbox id="controlboard-fans" aspect={controlboardFanImage.data.aspect}>
							{controlboardFanImage.data.img}
						</Lightbox>
					)}
				</CardContent>
				<CardFooter className="grid gap-4">
					<div className="flex flex-wrap gap-4 whitespace-nowrap">
						{generalInfo}
						{controlboard?.manualFileName?.endsWith('.pdf') && (
							<PDFModal file={`/configure/api/mcu-manual?boardId=${controlboard.id}`}>
								<Button variant="primary" className="flex-1 px-4" title={`Open the manual for the board`}>
									<Book className="size-4" />
									Manual
								</Button>
							</PDFModal>
						)}
						<Button variant="indeterminate" className="flex-1 px-4" title={`Open the manual for the board`}>
							<ExternalLink className="size-4" />
							RatOS Docs
						</Button>
					</div>
				</CardFooter>
			</Card>,
		);
	}
	if (toolheadImages.data != null && toolheadImages.data.length > 0) {
		toolheadImages.data.map((wiring, i) => {
			content.push(
				<Card className="flex flex-col justify-between" key={wiring.key + i}>
					<CardHeader className="border-b border-border">
						<CardTitle className="font-display font-bold tracking-tight text-zinc-300">
							{wiring.board.name} wiring on Toolhead {wiring.toolhead.getToolCommand()}
						</CardTitle>
						<CardDescription>
							The toolboard on {wiring.toolhead.getDescription()}, which is connected to the RatOS host computer via USB
						</CardDescription>
					</CardHeader>
					<CardContent
						className={twJoin(
							'grid flex-1 grid-cols-2 gap-4 border-b border-border',
							toolheadFanImages.data?.[i] != null ? 'grid-cols-2' : 'grid-cols-1',
						)}
					>
						<Lightbox key={i} id={`toolhead-${i}`} aspect={wiring.aspect}>
							{wiring.img}
						</Lightbox>
						{toolheadFanImages.data != null && toolheadFanImages.data[i] != null && (
							<Lightbox key={i} id={`toolhead-fans-${i}`} aspect={toolheadFanImages.data[i].aspect}>
								{toolheadFanImages.data[i].img}
							</Lightbox>
						)}
					</CardContent>
					<CardFooter className="grid gap-4">
						<div className="flex flex-wrap gap-4 whitespace-nowrap">
							{generalInfo}
							<Button variant="primary" className="flex-1 px-4" title={`Open the manual for the board`}>
								<Book className="size-4" />
								Manual
							</Button>
							<Button variant="indeterminate" className="flex-1 px-4" title={`Open the manual for the board`}>
								<ExternalLink className="size-4" />
								RatOS Docs
							</Button>
						</div>
					</CardFooter>
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
				<div className={twJoin('grid gap-4 text-zinc-700 dark:text-zinc-300', 'grid-cols-1')}>
					{props.children}
					{content}
				</div>
			</div>
			<StepNavButtons right={rightButton} left={leftButton} />
		</React.Fragment>
	);
};
