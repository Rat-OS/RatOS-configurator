import React from 'react';
import { Button } from '@/components/common/button';
import { Badge } from '@/components/common/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircledIcon } from '@radix-ui/react-icons';

interface LogFacetedFilterProps {
	title: string;
	options: string[];
	selectedValues: string[];
	onSelectionChange: (values: string[]) => void;
	disabled?: boolean;
}

export const LogFacetedFilter: React.FC<LogFacetedFilterProps> = ({
	title,
	options,
	selectedValues,
	onSelectionChange,
	disabled = false,
}) => {
	const selectedSet = new Set(selectedValues);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="default"
					className={`flex h-9 border-dashed ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
					disabled={disabled}
				>
					<PlusCircledIcon className="h-4 w-4" />
					{title}
					{selectedValues.length > 0 && (
						<>
							<Separator orientation="vertical" className="mx-2 h-4" />
							<Badge color="gray" className="rounded-sm px-1 font-normal @2xs:hidden">
								{selectedValues.length}
							</Badge>
							<div className="hidden space-x-1 @2xs:flex">
								{selectedValues.length > 2 ? (
									<Badge color="gray" className="min-w-0 truncate rounded-sm px-1 font-normal">
										{selectedValues.length} selected
									</Badge>
								) : (
									selectedValues.map((value) => (
										<Badge color="gray" size="sm" key={value} className="rounded-sm px-1 font-normal">
											{value}
										</Badge>
									))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = selectedSet.has(option);
								return (
									<CommandItem
										key={option}
										className="space-x-2"
										onSelect={() => {
											const newSelection = isSelected
												? selectedValues.filter((v) => v !== option)
												: [...selectedValues, option];
											onSelectionChange(newSelection);
										}}
									>
										<Checkbox checked={isSelected} />
										<span>{option}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
						{selectedValues.length > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => onSelectionChange([])}
										className="flex items-center justify-center text-center"
									>
										Clear filters
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
};
