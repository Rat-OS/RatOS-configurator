'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { twJoin } from 'tailwind-merge';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export interface SelectableCard {
	id: string | number;
	name: string;
	right: JSX.Element | null;
	details: JSX.Element | string;
}

interface CardSelectorProps<Selectable extends SelectableCard = SelectableCard> {
	cards: Selectable[];
	onSelect?: (card: Selectable) => void;
	value?: Selectable | null;
	title?: (card: Selectable) => string;
}

export const CardSelector = <Selectable extends SelectableCard = SelectableCard>(
	props: CardSelectorProps<Selectable>,
) => {
	const [selected, setSelected] = useState<Selectable | null>(null);
	const { onSelect: _onSelect } = props;
	const [parent] = useAutoAnimate();

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
			<RadioGroup.Label className="sr-only">Selector</RadioGroup.Label>
			<div className="space-y-4" ref={parent}>
				{props.cards.map((card, i) => (
					<RadioGroup.Option
						key={card.id}
						value={card}
						className={({ checked, active }) =>
							twJoin(
								checked ? 'border-transparent' : 'border-zinc-300 dark:border-zinc-700',
								active ? 'ring-2 ring-brand-600' : '',
								'relative flex cursor-pointer justify-between rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none dark:bg-zinc-900',
							)
						}
					>
						{({ active, checked }) => (
							<>
								<div className="flex items-center">
									<div>
										<RadioGroup.Label as="p" className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
											{props.title ? props.title(card) : card.name}
										</RadioGroup.Label>
										<RadioGroup.Description as="div" className="text-xs text-zinc-500 dark:text-zinc-400">
											<p className="sm:inline">{card.details}</p>
										</RadioGroup.Description>
									</div>
								</div>
								<RadioGroup.Description as="div" className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:block sm:text-right">
									{card.right}
								</RadioGroup.Description>
								<div
									className={twJoin(
										active ? 'border' : 'border-2',
										checked ? 'border-brand-600' : 'border-transparent',
										'pointer-events-none absolute -inset-px rounded-lg',
									)}
									aria-hidden="true"
								/>
							</>
						)}
					</RadioGroup.Option>
				))}
			</div>
		</RadioGroup>
	);
};
