'use client';
/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useCallback, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Spinner } from '@/components/common/spinner';
import { Check } from 'lucide-react';
import { twJoin } from 'tailwind-merge';

interface ModalProps extends React.PropsWithChildren {
	title: string;
	body: string;
	wide?: boolean;
	content?: React.ReactNode;
	success?: boolean;
	buttonLabel: string;
	onClick?: () => any | Promise<any>;
	onClose?: () => void;
}

export function Modal(props: ModalProps) {
	const { onClick, onClose } = props;
	const [open, setOpen] = useState(props.children == null);
	const [isCompletingClick, setIsCompletingClick] = useState(false);
	const onButtonClick = useCallback(async () => {
		const clickRes = onClick?.();
		if (clickRes instanceof Promise) {
			setIsCompletingClick(true);
			await clickRes;
			setIsCompletingClick(false);
		}
		onClose?.();
		setOpen(false);
	}, [onClick, onClose]);

	const onDialogClose = useCallback(() => {
		onClose?.();
		setOpen(false);
	}, [onClose]);

	const success = props.success ? (
		<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-700">
			<Check className="h-6 w-6 text-lime-600 dark:text-lime-100" aria-hidden="true" />
		</div>
	) : null;
	const isDesktop = useMediaQuery('(min-width: 768px)');

	if (isDesktop) {
		return (
			<Dialog
				open={open}
				onOpenChange={(val) => {
					if (!val) {
						onDialogClose();
					} else {
						setOpen(val);
					}
				}}
			>
				{props.children && <DialogTrigger asChild>{props.children}</DialogTrigger>}
				<DialogContent className={twJoin(props.wide ? 'max-w-6xl' : 'max-w-[600px]', 'grid-cols-1')}>
					<div className="flex items-center gap-4">
						{success}
						<DialogHeader>
							<DialogTitle>{props.title}</DialogTitle>
							<DialogDescription>{props.body}</DialogDescription>
						</DialogHeader>
					</div>
					{props.content && <div className="col-span-2 grid gap-2">{props.content}</div>}
					<div className="col-span-2 grid grid-cols-2 gap-2">
						<Button variant="info" onClick={onButtonClick}>
							{props.buttonLabel} {isCompletingClick && <Spinner noMargin={true} />}
						</Button>
						<Button variant="outline" onClick={onDialogClose}>
							Cancel
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer
			open={open}
			onOpenChange={(val) => {
				if (!val) {
					onDialogClose();
				} else {
					setOpen(val);
				}
			}}
		>
			{props.children && <DrawerTrigger asChild>{props.children}</DrawerTrigger>}
			<DrawerContent>
				<DrawerHeader className="flex items-center gap-4 text-left">
					{success}
					<div>
						<DrawerTitle>{props.title}</DrawerTitle>
						<DrawerDescription>{props.body}</DrawerDescription>
					</div>
				</DrawerHeader>
				{props.content && <div className="col-span-2 grid gap-2 px-4 pb-2">{props.content}</div>}
				<DrawerFooter className="pt-2">
					<Button variant="info" onClick={onButtonClick}>
						{props.buttonLabel} {isCompletingClick && <Spinner noMargin={true} />}
					</Button>
					<DrawerClose asChild>
						<Button variant="outline" onClick={onDialogClose}>
							Cancel
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
