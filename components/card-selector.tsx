'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { twJoin } from 'tailwind-merge';
import { motion } from 'framer-motion';

export interface SelectableCard {
	id: string | number;
	name: React.ReactNode;
	right?: React.ReactNode;
	left?: React.ReactNode;
	details: React.ReactNode;
}

interface CardSelectorProps<Selectable extends SelectableCard = SelectableCard> {
	cards: Selectable[];
	onSelect?: (card: Selectable) => void;
	value?: Selectable | null;
	title?: (card: Selectable) => React.ReactNode;
}

export const CardSelector = <Selectable extends SelectableCard = SelectableCard>(
	props: CardSelectorProps<Selectable>,
) => {
	const [selected, setSelected] = useState<Selectable | null>(null);
	const { onSelect: _onSelect } = props;

	const onSelect = useCallback(
		(card: Selectable) => {
			if (props.value === undefined) {
				setSelected(card);
			}
			_onSelect?.(card);
		},
		[_onSelect, props.value],
	);

	useEffect(() => {
		if (props.value !== undefined) {
			setSelected(props.value);
		}
	}, [props.value]);

	return (
		<RadioGroup value={selected} onChange={onSelect}>
			<motion.div className="grid grid-cols-1 gap-4 2xl:grid-cols-2">
				{props.cards.map((card, i) => (
					<RadioGroup.Option
						key={card.id}
						value={card}
						className={({ checked, active }) =>
							twJoin(
								checked ? 'border-transparent' : 'border-zinc-300 dark:border-zinc-700',
								'relative flex cursor-pointer items-stretch rounded-lg border bg-white px-4 py-4 shadow-sm focus:outline-none active:ring-0 dark:bg-zinc-800/70',
							)
						}
					>
						{({ active, checked }) => (
							<>
								<div className="flex flex-1 flex-col items-stretch justify-between gap-4">
									{card.left && (
										<RadioGroup.Description as="div" className="mr-4 mt-2 flex text-sm sm:mt-0 sm:block sm:text-left">
											{card.left}
										</RadioGroup.Description>
									)}
									<div className="flex flex-shrink-0 flex-col">
										<RadioGroup.Label
											as="p"
											className="flex items-center space-x-2 text-sm font-bold text-zinc-900 dark:text-zinc-100"
										>
											{props.title ? props.title(card) : card.name}
										</RadioGroup.Label>
										<RadioGroup.Description
											as="div"
											className="mt-1 flex-1 text-xs font-medium text-zinc-500 dark:text-zinc-400"
										>
											<div className="sm:inline">{card.details}</div>
										</RadioGroup.Description>
									</div>
								</div>
								{card.right && (
									<RadioGroup.Description as="div" className="ml-4 mt-2 flex text-sm sm:mt-0 sm:block sm:text-right">
										{card.right}
									</RadioGroup.Description>
								)}
								<div
									className={twJoin(
										checked ? 'border-brand-600' : 'border-transparent',
										'pointer-events-none absolute -inset-px rounded-lg border-2',
									)}
									aria-hidden="true"
								/>
							</>
						)}
					</RadioGroup.Option>
				))}
			</motion.div>
		</RadioGroup>
	);
};
