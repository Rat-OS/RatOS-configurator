/* This example requires Tailwind CSS v2.0+ */
import React, { useCallback, useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { classNames } from '../helpers/classNames';
import Image from 'next/image';

export interface SelectableCard {
	name: string;
	right: JSX.Element | null;
	details: JSX.Element | string;
}

interface CardSelectorProps<Selectable extends SelectableCard = SelectableCard> {
	cards: Selectable[];
	onSelect?: (card: Selectable) => void;
	value?: Selectable | null;
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
			<RadioGroup.Label className='sr-only'>Server size</RadioGroup.Label>
			<div className='space-y-4'>
				{props.cards.map((card, i) => (
					<RadioGroup.Option
						key={card.name + i}
						value={card}
						className={({ checked, active }) =>
							classNames(
								checked ? 'border-transparent' : 'border-gray-300',
								active ? 'ring-2 ring-brand-600' : '',
								'relative block bg-white border rounded-lg shadow-sm px-6 py-4 cursor-pointer sm:flex sm:justify-between focus:outline-none',
							)
						}
					>
						{({ active, checked }) => (
							<>
								<div className='flex items-center'>
									<div>
										<RadioGroup.Label as='p' className='font-bold text-gray-900 text-sm'>
											{card.name}
										</RadioGroup.Label>
										<RadioGroup.Description as='div' className='text-gray-500 text-xs'>
											<p className='sm:inline'>{card.details}</p>
										</RadioGroup.Description>
									</div>
								</div>
								<RadioGroup.Description as='div' className='mt-2 flex text-sm sm:mt-0 sm:block sm:ml-4 sm:text-right'>
									{card.right}
								</RadioGroup.Description>
								<div
									className={classNames(
										active ? 'border' : 'border-2',
										checked ? 'border-brand-600' : 'border-transparent',
										'absolute -inset-px rounded-lg pointer-events-none',
									)}
									aria-hidden='true'
								/>
							</>
						)}
					</RadioGroup.Option>
				))}
			</div>
		</RadioGroup>
	);
};
