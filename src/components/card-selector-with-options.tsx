import { useCallback, useEffect, useRef, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { classNames } from '../helpers/classNames';

export interface SelectableOption {
	name: string;
	id: string | number;
}

export interface SelectableCard<Option extends SelectableOption = SelectableOption> {
	id: string | number;
	name: string;
	right: JSX.Element | null;
	details: JSX.Element | string;
	options?: Option[];
}

type SelectedCard<Selectable, Option extends SelectableOption = SelectableOption> = Selectable & {
	selectedOption: Option | null;
};

interface CardSelectorProps<
	Option extends SelectableOption = SelectableOption,
	Selectable extends SelectableCard<Option> = SelectableCard<Option>,
> {
	cards: Selectable[];
	onSelect?: (card: SelectedCard<Selectable, Option>) => void;
	value?: SelectedCard<Selectable, Option> | null;
}

export const CardSelectorWithOptions = <
	Option extends SelectableOption = SelectableOption,
	Selectable extends SelectableCard<Option> = SelectableCard<Option>,
>(
	props: CardSelectorProps<Option, Selectable>,
) => {
	const [selected, setSelected] = useState<SelectedCard<Selectable, Option> | null>(null);
	const selectedRef = useRef(selected);
	const { onSelect: _onSelect } = props;

	const onSelect = useCallback(
		(card: Selectable) => {
			const newSelection = { ...card, selectedOption: card.options?.[0] ?? null };
			if (props.value === undefined && selectedRef.current?.id !== newSelection.id) {
				selectedRef.current = newSelection;
				setSelected(newSelection);
			}
			_onSelect?.(newSelection);
		},
		[_onSelect, props.value, selected],
	);

	const onSelectOption = useCallback(
		(card: Selectable, option: Option | null) => {
			const newSelection = { ...card, selectedOption: option };
			if (props.value === undefined) {
				selectedRef.current = newSelection;
				setSelected(newSelection);
			}
			_onSelect?.(newSelection);
		},
		[selected, _onSelect, props.value],
	);

	useEffect(() => {
		if (props.value !== undefined) {
			setSelected(props.value);
		}
	}, [props.value]);

	return (
		<RadioGroup value={selected} onChange={onSelect}>
			<RadioGroup.Label className="sr-only">Selector</RadioGroup.Label>
			<div className="space-y-4">
				{props.cards.map((card, i) => (
					<RadioGroup.Option
						key={card.name + i}
						value={card}
						className={({ checked, active }) =>
							classNames(
								checked ? 'border-transparent' : 'border-gray-300',
								active ? 'ring-2 ring-brand-600' : '',
								'relative cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none',
							)
						}
					>
						{({ active, checked }) => (
							<>
								<div className="flex justify-between">
									<div className="flex items-center">
										<div>
											<RadioGroup.Label as="p" className="text-sm font-bold text-gray-900">
												{card.name}
											</RadioGroup.Label>
											<RadioGroup.Description as="div" className="text-xs text-gray-500">
												<p className="sm:inline">{card.details}</p>
											</RadioGroup.Description>
										</div>
									</div>
									<RadioGroup.Description as="div" className="mt-2 flex text-sm sm:mt-0 sm:ml-4 sm:block sm:text-right">
										{card.right}
									</RadioGroup.Description>
								</div>
								{card.options != null && (
									<RadioGroup
										value={selected?.name === card.name ? selected.selectedOption : null}
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
														classNames(
															'cursor-pointer focus:outline-none',
															active ? 'ring-2 ring-brand-600 ring-offset-2' : '',
															checked
																? 'bg-brand-600 text-white hover:bg-brand-700'
																: 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
															'flex items-center justify-center rounded-md py-3 px-3 text-sm font-semibold uppercase sm:flex-1',
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
									className={classNames(
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
