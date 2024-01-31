'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { twJoin, twMerge } from 'tailwind-merge';
import { badgeBackgroundColorStyle, badgeBorderColorStyle, badgeTextColorStyle } from './common/badge';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export interface SelectableOption {
	name: string;
	id: string | number;
}

export interface SelectableCardWithOptions<Option extends SelectableOption = SelectableOption> {
	id: string | number;
	name: string;
	right: JSX.Element | null;
	details: JSX.Element | string;
	options?: Option[];
}

export type SelectedCard<Selectable> = Selectable;

interface CardSelectorProps<
	Option extends SelectableOption = SelectableOption,
	Selectable extends SelectableCardWithOptions<Option> = SelectableCardWithOptions<Option>,
> {
	cards: Selectable[];
	onSelect?: (card: SelectedCard<Selectable>, option: Option | null) => void;
	value?: SelectedCard<Selectable> | null;
	optionValue?: Option | null;
}

export const CardSelectorWithOptions = <
	Option extends SelectableOption = SelectableOption,
	Selectable extends SelectableCardWithOptions<Option> = SelectableCardWithOptions<Option>,
>(
	props: CardSelectorProps<Option, Selectable>,
) => {
	const [selected, setSelected] = useState<SelectedCard<Selectable> | null>(null);
	const [selectedOption, setSelectedOption] = useState<Option | null>(null);
	const selectedRef = useRef({ selected, selectedOption });
	const { onSelect: _onSelect } = props;
	const [parent] = useAutoAnimate();

	const onSelect = useCallback(
		(card: Selectable) => {
			// Do not select the same card twice, since onSelectOption might have been called first.
			if (selectedRef.current.selected !== card) {
				if (props.value === undefined) {
					setSelected(card);
					if (props.optionValue === undefined) {
						setSelectedOption(card.options?.[0] ?? null);
					}
				}
				selectedRef.current.selected = card;
				selectedRef.current.selectedOption = card.options?.[0] ?? null;
				_onSelect?.(card, card.options?.[0] ?? null);
			}
		},
		[_onSelect, props.value, props.optionValue],
	);

	const onSelectOption = useCallback(
		(card: Selectable, option: Option | null) => {
			if (props.value === undefined) {
				setSelected(card);
				setSelectedOption(option);
			}
			selectedRef.current.selected = card;
			selectedRef.current.selectedOption = option;
			_onSelect?.(card, option);
		},
		[_onSelect, props.value],
	);

	useEffect(() => {
		if (props.value !== undefined && props.value !== selectedRef.current.selected) {
			setSelected(props.value);
		}
		if (props.optionValue !== undefined && props.optionValue !== selectedRef.current.selectedOption) {
			setSelectedOption(props.optionValue);
		}
	}, [props.value, props.optionValue]);

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
								active ? 'ring-2 ring-brand-600 dark:ring-brand-500' : '',
								'relative cursor-pointer rounded-lg border bg-white px-4 py-4 shadow-sm focus:outline-none dark:bg-zinc-800',
							)
						}
					>
						{({ active, checked }) => (
							<>
								<div className="flex justify-between">
									<div className="flex-1">
										<RadioGroup.Label as="p" className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
											{card.name}
										</RadioGroup.Label>
										<RadioGroup.Description as="div" className="text-xs text-zinc-500 dark:text-zinc-400">
											<p className="sm:inline">{card.details}</p>
										</RadioGroup.Description>
									</div>
									<RadioGroup.Description as="div" className="mb-2 ml-4 flex text-sm sm:block sm:text-right">
										{card.right}
									</RadioGroup.Description>
								</div>
								{card.options != null && (
									<RadioGroup
										value={selected?.id === card.id ? selectedOption : null}
										onChange={(option) => onSelectOption(card, option)}
										className="mt-2"
									>
										<RadioGroup.Label className="sr-only"> Choose a memory option </RadioGroup.Label>
										<div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
											{card.options.map((option) => (
												<RadioGroup.Option
													key={option.name}
													value={option}
													className={({ active, checked }) =>
														twMerge(
															active || checked ? 'ring-2' : 'ring-1',
															'flex items-center justify-center rounded-md px-3 py-3 text-sm font-semibold uppercase ring-inset sm:flex-1',
															badgeBackgroundColorStyle({ color: checked ? 'brand' : 'gray' }),
															badgeBorderColorStyle({ color: active || checked ? 'brand' : 'gray' }),
															badgeTextColorStyle({ color: active || checked ? 'brand' : 'gray' }),
														)
													}
												>
													<RadioGroup.Label as="span">{option.name}</RadioGroup.Label>
												</RadioGroup.Option>
											))}
										</div>
									</RadioGroup>
								)}
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
