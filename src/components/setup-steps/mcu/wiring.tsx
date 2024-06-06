'use client';
import { MCUStepScreenProps } from '@/components/setup-steps/mcu-preparation';
import { StepNavButton, StepNavButtons } from '@/components/step-nav-buttons';
import { StepScreenProps } from '@/hooks/useSteps';
import { ControlboardState } from '@/recoil/printer';
import { PrinterToolheadsState } from '@/recoil/toolhead';
import React, { useRef } from 'react';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { Lightbox } from '@/components/ui/lightbox';
import { motion } from 'framer-motion';

export const ElectronicsWiring = (props: StepScreenProps) => {
	const controlboard = useRecoilValue(ControlboardState);
	const controlboardWiring = controlboard?.wireDiagramFileName;
	const aspect = useRef(1);
	const toolboardWiring = useRecoilValue(PrinterToolheadsState)
		?.map((th) => th.toolboard?.wireDiagramFileName)
		.filter(Boolean);

	const controlboardSvg = useQuery({
		queryFn: async () => {
			if (controlboardWiring?.endsWith('.svg')) {
				const res = await fetch(`/configure/api/mcu-wiring-image?boardId=${controlboard?.id}`);
				const svg = await res.text();
				const svgWidth = svg?.match(/<svg[^>]*width="([^"]*)"/i)?.[1];
				const svgHeight = svg?.match(/<svg[^>]*height="([^"]*)"/i)?.[1];
				if (svgWidth && svgHeight) {
					aspect.current = parseFloat(svgWidth.replace('px', '')) / parseFloat(svgHeight.replace('px', ''));
				}
				const updatedSvgString = svg
					.replace(
						/<svg([^>]*?)\s*(width|height)="[^"]*"/i,
						'<svg$1 preserveAspectRatio="xMidYMid meet" style="aspect-ratio: ' + aspect.current + '"',
					)
					.replace(/<svg([^>]*?)\s*(width|height)="[^"]*"/i, '<svg$1')
					.replace(/<text[^>]+>[0-9]*?([^<0-9]+)<\/text>/g, (sub, group: string) => {
						return sub.replace(group.substring(1), group.substring(1).toLocaleLowerCase());
					})
					.replace(/Oswald/g, 'Inter');
				return updatedSvgString;
			}
			return null;
		},
		queryKey: ['mcu-wiring-image', controlboard?.id],
	});

	const content: React.ReactNode[] = [];

	if (controlboardWiring?.endsWith('.svg') && controlboardSvg.data) {
		content.push(
			<div key="controlboard">
				<h3 className="font-display font-bold tracking-tight text-zinc-300">Control board wiring</h3>
				<Lightbox id="controlboard" aspect={aspect.current}>
					<div
						className="flex h-full max-h-full w-full max-w-full items-center justify-center"
						dangerouslySetInnerHTML={{ __html: controlboardSvg?.data }}
					/>
				</Lightbox>
			</div>,
		);
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
				<div className="space-y-4 text-zinc-700 dark:text-zinc-300">
					{props.children}
					{content}
				</div>
			</div>
			<StepNavButtons right={rightButton} left={leftButton} />
		</React.Fragment>
	);
};
