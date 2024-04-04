'use client';

import * as React from 'react';
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '@radix-ui/react-icons';
import * as MenubarPrimitive from '@radix-ui/react-menubar';

import { cn, setDisplayName } from '@/helpers/utils';

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.Root
		ref={ref}
		className={cn('flex items-center space-x-1 rounded-md shadow-sm', className)}
		{...props}
	/>
));
setDisplayName(Menubar, MenubarPrimitive.Root.displayName);

const MenubarTrigger = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.Trigger
		ref={ref}
		className={cn(
			'flex cursor-default select-none items-center rounded-sm px-3 py-1 text-sm font-medium outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
			className,
		)}
		{...props}
	/>
));
setDisplayName(MenubarTrigger, MenubarPrimitive.Trigger.displayName);

const MenubarSubTrigger = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
		inset?: boolean;
	}
>(({ className, inset, children, ...props }, ref) => (
	<MenubarPrimitive.SubTrigger
		ref={ref}
		className={cn(
			'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
			inset && 'pl-8',
			className,
		)}
		{...props}
	>
		{children}
		<ChevronRightIcon className="ml-auto h-4 w-4" />
	</MenubarPrimitive.SubTrigger>
));
setDisplayName(MenubarSubTrigger, MenubarPrimitive.SubTrigger.displayName);

const MenubarSubContent = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.SubContent>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.SubContent
		ref={ref}
		className={cn(
			'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
			className,
		)}
		{...props}
	/>
));
setDisplayName(MenubarSubContent, MenubarPrimitive.SubContent.displayName);

const MenubarContent = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(({ className, align = 'start', alignOffset = -4, sideOffset = 8, ...props }, ref) => (
	<MenubarPrimitive.Portal>
		<MenubarPrimitive.Content
			ref={ref}
			align={align}
			alignOffset={alignOffset}
			sideOffset={sideOffset}
			className={cn(
				'z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
				className,
			)}
			{...props}
		/>
	</MenubarPrimitive.Portal>
));
setDisplayName(MenubarContent, MenubarPrimitive.Content.displayName);

const MenubarItem = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<MenubarPrimitive.Item
		ref={ref}
		className={cn(
			'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground',
			inset && 'pl-8',
			className,
		)}
		{...props}
	/>
));
setDisplayName(MenubarItem, MenubarPrimitive.Item.displayName);

const MenubarCheckboxItem = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.CheckboxItem>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
	<MenubarPrimitive.CheckboxItem
		ref={ref}
		className={cn(
			'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground',
			className,
		)}
		checked={checked}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<MenubarPrimitive.ItemIndicator>
				<CheckIcon className="h-4 w-4" />
			</MenubarPrimitive.ItemIndicator>
		</span>
		{children}
	</MenubarPrimitive.CheckboxItem>
));
setDisplayName(MenubarCheckboxItem, MenubarPrimitive.CheckboxItem.displayName);

const MenubarRadioItem = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.RadioItem>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
	<MenubarPrimitive.RadioItem
		ref={ref}
		className={cn(
			'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground',
			className,
		)}
		{...props}
	>
		<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
			<MenubarPrimitive.ItemIndicator>
				<DotFilledIcon className="h-4 w-4 fill-current" />
			</MenubarPrimitive.ItemIndicator>
		</span>
		{children}
	</MenubarPrimitive.RadioItem>
));
setDisplayName(MenubarRadioItem, MenubarPrimitive.RadioItem.displayName);

const MenubarLabel = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
		inset?: boolean;
	}
>(({ className, inset, ...props }, ref) => (
	<MenubarPrimitive.Label
		ref={ref}
		className={cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className)}
		{...props}
	/>
));
setDisplayName(MenubarLabel, MenubarPrimitive.Label.displayName);

const MenubarSeparator = React.forwardRef<
	React.ElementRef<typeof MenubarPrimitive.Separator>,
	React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Separator>
>(({ className, ...props }, ref) => (
	<MenubarPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
));
setDisplayName(MenubarSeparator, MenubarPrimitive.Separator.displayName);

const MenubarShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => {
	return <span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...props} />;
};
MenubarShortcut.displayname = 'MenubarShortcut';

export {
	Menubar,
	MenubarMenu,
	MenubarTrigger,
	MenubarContent,
	MenubarItem,
	MenubarSeparator,
	MenubarLabel,
	MenubarCheckboxItem,
	MenubarRadioGroup,
	MenubarRadioItem,
	MenubarPortal,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarGroup,
	MenubarSub,
	MenubarShortcut,
};
