import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { twJoin, twMerge } from 'tailwind-merge';
import { Badge, BadgeProps } from '../common/badge';
import { DropdownQuery, DropdownQueryInput, DropdownQueryKeys, DropdownQueryOutput, trpc } from '../../utils/trpc';
import { Spinner } from '../common/spinner';
import { useSerializedPrinterConfiguration } from '../../hooks/usePrinterConfiguration';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type Option = {
	id: number | string;
	title: string;
	disabled?: boolean;
	badge?: BadgeProps | BadgeProps[];
};

interface DropdownProps<DropdownOption extends Option = Option> {
	options: DropdownOption[];
	value: DropdownOption | null | undefined;
	onSelect?: (option: DropdownOption) => void;
	isFetching?: boolean;
	label: string;
	error?: string;
	sort?: boolean;
	disabled?: boolean;
	badge?: BadgeProps | BadgeProps[];
	onShown?: () => void;
}

export const OnDropdownOpened: React.FC<{ open: boolean; onShown: () => void }> = ({ open, onShown }) => {
	useEffect(() => {
		if (open) {
			onShown();
		}
	}, [open, onShown]);
	return null;
};

export const useDropdownPrinterQueryState = <T extends DropdownQueryKeys = DropdownQueryKeys>(
	query: T,
	vars?: DropdownQueryInput<T>,
	serializedPrinterConfiguration?: string,
) => {
	const [isShown, setIsShown] = useState(false);
	const serializedConfig = useSerializedPrinterConfiguration();
	// Gigantic hack to avoid suspense in parent components from killing our atom updates.
	const variables: any = vars ?? (serializedPrinterConfiguration ? {} : undefined);
	if (variables && serializedPrinterConfiguration != null) {
		variables[serializedPrinterConfiguration] = serializedConfig;
	}
	const data = (trpc.printer[query] as DropdownQuery<T>).useQuery(variables, {
		enabled: isShown,
		keepPreviousData: true,
	});
	return {
		options: (data.data ?? []) as DropdownQueryOutput<T>,
		onShown: () => setIsShown(true),
		isFetching: data.isFetching,
	};
};

export const DropdownWithPrinterQuery = <T extends DropdownQueryKeys = DropdownQueryKeys>(
	props: Omit<DropdownProps<DropdownQueryOutput<T>[number]>, 'options' | 'onShown'> & {
		query: T;
		vars?: DropdownQueryInput<T>;
		serializedPrinterConfiguration?: string;
	},
) => {
	const { query, vars, serializedPrinterConfiguration, ...rest } = props;
	const queryProps = useDropdownPrinterQueryState<T>(query, vars, serializedPrinterConfiguration);
	return (
		<React.Suspense>
			<Dropdown {...rest} {...queryProps} />
		</React.Suspense>
	);
};

export const Dropdown = <DropdownOption extends Option = Option>(props: DropdownProps<DropdownOption>) => {
	const { onSelect, value } = props;

	const onSelected = useCallback(
		(newSelection: DropdownOption['id']) => {
			const option = props.options.find((o) => o.id === newSelection);
			if (option) {
				onSelect?.(option);
			}
		},
		[onSelect, props.options],
	);

	const options =
		props.sort == false ? props.options : props.options.slice(0).sort((a, b) => a.title.localeCompare(b.title));

	const inputClass = twMerge(
		'relative flex w-full cursor-default items-center justify-between rounded-md bg-white py-1.5 pl-3 pr-3 text-left text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 focus:outline-none focus:ring-2 focus:ring-brand-600 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-700 dark:focus:ring-brand-400 sm:text-sm sm:leading-6',
		props.error
			? 'ring-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 dark:ring-red-500 dark:text-red-400 dark:placeholder-red-700'
			: 'ring-zinc-300 text-zinc-900 placeholder-zinc-300 focus:ring-brand-600 dark:ring-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-700 dark:focus:ring-brand-400 ',
	);

	const [animate] = useAutoAnimate();

	return (
		<Listbox value={value?.id ?? value === null ? null : undefined} onChange={onSelected} disabled={props.disabled}>
			{({ open }) => {
				return (
					<>
						<Listbox.Label
							className={twMerge(
								'block text-sm font-semibold leading-6 text-zinc-700 dark:text-zinc-300',
								props.error && 'text-red-600 dark:text-red-400',
							)}
						>
							{props.label}
						</Listbox.Label>
						{props.onShown && <OnDropdownOpened open={open} onShown={props.onShown} />}
						<div className="relative mt-1">
							<Listbox.Button className={inputClass} disabled={props.disabled} title={value?.title}>
								<span className="flex-1 truncate">{value?.title ?? 'Pick from the list...'}</span>
								<span className={twJoin('flex items-center space-x-1', props.disabled && '-mr-1.5')}>
									{props.badge &&
										(!Array.isArray(props.badge) ? [props.badge] : props.badge).map((badge, i) => (
											<Badge
												{...badge}
												key={i}
												color={badge.color ?? (props.disabled ? 'plain' : badge.color)}
												size="sm"
											/>
										))}
								</span>
								{!props.disabled && (
									<span className="pointer-events-none -mr-4 flex items-center pr-2">
										<ChevronUpDownIcon className="h-5 w-5 text-zinc-400" aria-hidden="true" />
									</span>
								)}
							</Listbox.Button>
							<div ref={animate}>
								{props.error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{props.error}</p>}
							</div>

							<Transition
								show={open}
								as={Fragment}
								enter="transition duration-150 ease-out"
								enterFrom="transform translate-y-1 opacity-0"
								enterTo="transform translate-y-0 opacity-100"
								leave="transition duration-200 ease-out"
								leaveFrom="transform translate-y-0 opacity-100"
								leaveTo="transform translate-y-1 opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md focus:outline-none dark:bg-zinc-800 dark:scrollbar-thumb-zinc-600 sm:text-sm">
									{props.isFetching && (
										<div className="px-3 py-2 text-sm text-zinc-400 dark:text-zinc-500">
											<Spinner />
										</div>
									)}
									{!props.isFetching && options.length === 0 && (
										<div className="px-3 py-2 text-sm text-zinc-400 dark:text-zinc-500">No options available</div>
									)}
									{options.map((option) => (
										<Listbox.Option
											key={option.id}
											className={({ active, disabled }) =>
												twMerge(
													active ? 'dark bg-brand-600 text-white' : 'text-zinc-900 dark:text-zinc-300',
													disabled && 'text-zinc-400 dark:text-zinc-500',
													'relative cursor-default select-none py-2 pl-3 pr-9',
												)
											}
											disabled={option.disabled}
											value={option.id}
										>
											{({ selected, active }) => (
												<>
													<span
														className={twJoin(
															selected ? 'font-semibold' : 'font-normal',
															'flex items-center space-x-2 truncate',
														)}
													>
														<span>{option.title}</span>{' '}
														{option.badge &&
															(Array.isArray(option.badge) ? (
																option.badge.map((b, i) => (
																	<Badge {...b} color={active ? 'plain' : b.color} size="sm" key={i} />
																))
															) : (
																<Badge {...option.badge} color={active ? 'plain' : option.badge.color} size="sm" />
															))}
													</span>

													{selected ? (
														<span
															className={twJoin(
																active ? 'text-white' : 'text-brand-600',
																'absolute inset-y-0 right-0 flex items-center pr-4',
															)}
														>
															<CheckIcon className="h-5 w-5" aria-hidden="true" />
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				);
			}}
		</Listbox>
	);
};
