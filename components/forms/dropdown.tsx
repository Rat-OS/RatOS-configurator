import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { twJoin, twMerge } from 'tailwind-merge';
import { Badge, BadgeProps } from '@/components/common/badge';
import { DropdownQuery, DropdownQueryInput, DropdownQueryKeys, DropdownQueryOutput, trpc } from '@/utils/trpc';
import { Spinner } from '@/components/common/spinner';
import { useSerializedPrinterConfiguration } from '@/hooks/usePrinterConfiguration';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/common/button';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { cn } from '@/helpers/utils';
import { CommandLoading } from 'cmdk';
import { PopoverAnchor } from '@radix-ui/react-popover';
import { AnimatedContainer } from '@/components/common/animated-container';
import { AnimatePresence } from 'framer-motion';
import deepEqual from 'deep-equal';
import { X } from 'lucide-react';

type Option = {
	id: number | string;
	title: string;
	disabled?: boolean;
	badge?: BadgeProps | BadgeProps[];
};

interface DropdownProps<DropdownOption extends Option = Option, CanClear extends boolean = false> {
	options: DropdownOption[];
	value: DropdownOption | null | undefined;
	help?: React.ReactNode;
	onSelect?: (option: CanClear extends true ? DropdownOption | null : DropdownOption) => void;
	isFetching?: boolean;
	label: string;
	error?: string;
	sort?: boolean;
	canClear?: CanClear;
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
	fetchImmediately?: boolean,
) => {
	const [isShown, setIsShown] = useState(false);
	const serializedConfig = useSerializedPrinterConfiguration();
	// Gigantic hack to avoid suspense in parent components from killing our atom updates.
	const variables: any = vars ?? (serializedPrinterConfiguration ? {} : undefined);
	if (variables && serializedPrinterConfiguration != null) {
		variables[serializedPrinterConfiguration] = serializedConfig;
	}
	const data = (trpc.printer[query] as DropdownQuery<T>).useQuery(variables, {
		enabled: isShown || fetchImmediately,
		keepPreviousData: true,
	});
	return {
		options: (data.data ?? []) as DropdownQueryOutput<T>,
		onShown: () => setIsShown(true),
		isFetching: data.isFetching,
	};
};

export const DropdownWithPrinterQuery = <
	T extends DropdownQueryKeys = DropdownQueryKeys,
	CanClear extends boolean = false,
>(
	props: Omit<DropdownProps<DropdownQueryOutput<T>[number], CanClear>, 'options' | 'onShown'> & {
		query: T;
		vars?: DropdownQueryInput<T>;
		serializedPrinterConfiguration?: string;
	},
) => {
	const { query, vars, serializedPrinterConfiguration, ...rest } = props;
	const { value } = rest as unknown as { value: Option; onSelect: (option: Option) => void };
	// Query the server for the options to refresh the value in case a badge contains stale hardware titles.
	const fetchImmediately = value?.badge != null;
	const queryProps = useDropdownPrinterQueryState<T>(query, vars, serializedPrinterConfiguration, fetchImmediately);
	const selectedOption = (queryProps.options as Option[]).find((o) => o.id === value?.id);
	const correctedValue = selectedOption ?? value;
	return (
		<React.Suspense>
			<Dropdown {...rest} {...queryProps} value={correctedValue as DropdownQueryOutput<T>[number]} />
		</React.Suspense>
	);
};

const badgeDescription = (badge: Option['badge']) => {
	if (!badge) return '';
	if (Array.isArray(badge)) {
		return badge.map((b) => b.children).join(', ');
	}
	return badge.children;
};

export const Dropdown = <DropdownOption extends Option = Option, CanClear extends boolean = false>(
	props: DropdownProps<DropdownOption, CanClear>,
) => {
	const { onSelect, value } = props;
	const [open, setOpen] = React.useState(false);

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

	const inputClass = twJoin(
		props.error && 'ring-red-500 ring-2 text-red-900 placeholder-red-300 dark:text-red-400 dark:placeholder-red-700',
	);

	const [animate] = useAutoAnimate();

	const valueBadges = (Array.isArray(value?.badge) ? value.badge : value?.badge ? [value.badge] : []).concat(
		Array.isArray(props.badge) ? props.badge : props.badge ? [props.badge] : [],
	);

	const help = props.help ? (
		<div className="mb-2 whitespace-pre-line text-sm text-sky-200/50 opacity-70" id="email-description">
			{props.help}
		</div>
	) : null;
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<Label
				className={twMerge(
					'block text-sm font-semibold leading-6 text-zinc-700 dark:text-zinc-300',
					props.error && 'text-red-600 dark:text-red-400',
				)}
			>
				{props.label}
			</Label>
			{help}
			{props.onShown && <OnDropdownOpened open={open} onShown={props.onShown} />}
			<PopoverTrigger asChild disabled={props.disabled}>
				<Button
					variant="outline"
					role="combobox"
					disabled={props.disabled}
					aria-expanded={open}
					className={twJoin('w-full justify-between bg-zinc-800 px-2', inputClass)}
				>
					<span className="flex min-w-0 flex-1 items-center justify-start gap-2 text-left">
						<span className="min-w-0 flex-1 items-center truncate">{value?.title ?? 'Pick from the list...'}</span>
						{props.canClear && !props.disabled && (
							<span
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									if (props.canClear === true) {
										onSelect?.(null as CanClear extends true ? DropdownOption | null : DropdownOption);
									}
								}}
								className={twJoin(
									valueBadges == null || valueBadges.length === 0 ? '-mr-3' : 'mr-0',
									'flex h-4 w-4 items-center space-x-1 text-zinc-400',
								)}
							>
								<X />
							</span>
						)}
						<span className={twJoin('flex items-center space-x-1', !props.disabled && '-mr-2')}>
							{valueBadges &&
								valueBadges.map((badge, i) => (
									<Badge {...badge} key={i} color={badge.color ?? (props.disabled ? 'plain' : badge.color)} size="sm" />
								))}
						</span>
					</span>
					{!props.disabled && <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
				</Button>
			</PopoverTrigger>
			<div ref={animate}>
				{props.error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{props.error}</p>}
			</div>

			<PopoverContent className="min-w-[var(--radix-popover-trigger-width)] p-0">
				<Command>
					<CommandInput placeholder="Search for option..." className="h-9" />
					<CommandList>
						<CommandEmpty>No option found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => (
								<CommandItem
									key={option.id}
									value={option.title + badgeDescription(option.badge) + option.id}
									onSelect={() => {
										onSelected(option.id);
										setOpen(false);
									}}
									className={twJoin(
										'gap-2',
										value?.id === option.id && 'text-brand-400 aria-selected:text-brand-400 hover:text-brand-400',
									)}
								>
									{option.badge &&
										(Array.isArray(option.badge) ? (
											option.badge.map((b, i) => <Badge {...b} color={b.color} size="sm" key={i} />)
										) : (
											<Badge {...option.badge} color={option.badge.color} size="sm" />
										))}
									{option.title}
									<CheckIcon
										className={cn(
											'ml-auto h-4 w-4 text-brand-400',
											value?.id === option.id ? 'opacity-100' : 'opacity-0',
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
				<AnimatedContainer>
					{props.isFetching && (
						<CommandLoading className="flex justify-center px-3 py-2 text-sm text-zinc-400 dark:text-zinc-500">
							<Spinner />
						</CommandLoading>
					)}
				</AnimatedContainer>
			</PopoverContent>
		</Popover>
	);
};
