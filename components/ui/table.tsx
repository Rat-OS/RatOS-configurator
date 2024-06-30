import * as React from 'react';

import { cn, setDisplayName } from '@/helpers/utils';
import { twJoin } from 'tailwind-merge';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
	({ className, ...props }, ref) => (
		<div className={twJoin('scrollable, relative w-full overflow-auto rounded-md border')}>
			<table ref={ref} className={cn('w-full caption-bottom rounded-md text-sm', className)} {...props} />
		</div>
	),
);
setDisplayName(Table, 'Table');

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ className, ...props }, ref) => (
		<thead
			ref={ref}
			className={cn('border-l border-l-zinc-400/5 bg-zinc-400/5 [&_tr]:border-b', className)}
			{...props}
		/>
	),
);
setDisplayName(TableHeader, 'TableHeader');

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ className, ...props }, ref) => (
		<tbody
			ref={ref}
			className={cn('rounded-b-sm [&_tr:last-child]:rounded-b-sm [&_tr:last-child]:border-b-0', className)}
			{...props}
		/>
	),
);
setDisplayName(TableBody, 'TableBody');

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
	({ className, ...props }, ref) => (
		<tfoot ref={ref} className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props} />
	),
);
setDisplayName(TableFooter, 'TableFooter');

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
	({ className, ...props }, ref) => (
		<tr
			ref={ref}
			className={cn(
				'border-x-transparent border-t-transparent transition-colors data-[state=selected]:!border data-[state=selected]:!border-brand-800 data-[state=selected]:!bg-brand-400/10 data-[state=selected]:ring-1 data-[state=selected]:ring-brand-800 [tbody>&]:border [tbody>&]:hover:border-x-muted/50 [tbody>&]:hover:bg-muted/50',
				className,
			)}
			{...props}
		/>
	),
);
setDisplayName(TableRow, 'TableRow');

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
	({ className, ...props }, ref) => (
		<th
			ref={ref}
			className={cn(
				'h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
				className,
			)}
			{...props}
		/>
	),
);
setDisplayName(TableHead, 'TableHead');

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
	({ className, ...props }, ref) => (
		<td ref={ref} className={cn('p-2 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />
	),
);
setDisplayName(TableCell, 'TableCell');

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
	({ className, ...props }, ref) => (
		<caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
	),
);
setDisplayName(TableCaption, 'TableCaption');

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
