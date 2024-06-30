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
import { Check, Cross } from 'lucide-react';
import { twJoin, twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import { ButtonVariantProps } from '@/components/common/button';
import { AnimatedContainer } from '@/components/common/animated-container';

export interface ModalProps extends React.PropsWithChildren {
	title: string;
	body: string;
	wide?: boolean;
	isLoading?: boolean;
	content?: React.ReactNode;
	success?: boolean;
	buttonLabel?: string;
	buttonVariant?: ButtonVariantProps['variant'];
	secondButtonLabel?: string;
	dismissText?: string;
	dismissVariant?: ButtonVariantProps['variant'];
	secondButtonVariant?: ButtonVariantProps['variant'];
	onClick?: () => any | Promise<any>;
	onClickSecondButton?: () => any | Promise<any>;
	onClose?: () => void;
}

export function Modal(props: ModalProps) {
	const { onClick, onClose, onClickSecondButton } = props;
	const [open, setOpen] = useState(props.children == null);
	const [isCompletingClick, setIsCompletingClick] = useState<1 | 2 | false>(false);
	const onButtonClick = useCallback(async () => {
		const clickRes = onClick?.();
		if (clickRes instanceof Promise) {
			setIsCompletingClick(1);
			try {
				await clickRes;
				onClose?.();
				setOpen(false);
			} catch (e) {
				if (e instanceof Error) {
					toast.error(e.message);
				}
				throw e;
			} finally {
				setIsCompletingClick(false);
			}
		} else {
			onClose?.();
			setOpen(false);
		}
	}, [onClick, onClose]);

	const _onClickSecondButton = useCallback(async () => {
		const clickRes = onClickSecondButton?.();
		if (clickRes instanceof Promise) {
			setIsCompletingClick(2);
			try {
				await clickRes;
				onClose?.();
				setOpen(false);
			} catch (e) {
				if (e instanceof Error) {
					toast.error(e.message);
				}
				throw e;
			} finally {
				setIsCompletingClick(false);
			}
		} else {
			onClose?.();
			setOpen(false);
		}
	}, [onClickSecondButton, onClose]);

	const onDialogClose = useCallback(() => {
		onClose?.();
		setOpen(false);
	}, [onClose]);

	const success = props.isLoading ? (
		<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-700">
			<Spinner className="h-6 w-6" noMargin={true} aria-hidden="true" />
		</div>
	) : props.success === true ? (
		<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-700">
			<Check className="h-6 w-6 text-lime-600 dark:text-lime-100" aria-hidden="true" />
		</div>
	) : props.success === false ? (
		<div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-700">
			<Cross className="h-6 w-6 text-rose-600 dark:text-rose-100" aria-hidden="true" />
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
				<DialogContent className={twJoin(props.wide ? 'max-w-6xl' : 'max-w-[600px]', 'flex max-h-[90vh] flex-col')}>
					<div className="flex flex-grow-0 items-center gap-4">
						{success}
						<DialogHeader>
							<DialogTitle>{props.title}</DialogTitle>
							<DialogDescription>{props.body}</DialogDescription>
						</DialogHeader>
					</div>
					<AnimatedContainer
						containerClassName="flex-1 flex"
						className="scrollable -mr-4 grid flex-1 gap-2 overflow-hidden overflow-y-scroll pr-1.5"
					>
						{props.content}
					</AnimatedContainer>
					<div
						className={twJoin(
							'col-span-2 grid flex-grow-0 gap-2',
							props.secondButtonLabel && props.onClickSecondButton
								? 'grid-cols-3'
								: props.buttonLabel && props.onClick
									? 'grid-cols-2'
									: 'grid-cols-1',
						)}
					>
						{props.buttonLabel && props.onClick && (
							<Button variant={props.buttonVariant ?? 'info'} onClick={onButtonClick}>
								{props.buttonLabel} {isCompletingClick === 1 && <Spinner className="inline-block" noMargin={true} />}
							</Button>
						)}
						{props.secondButtonLabel && props.onClickSecondButton && (
							<Button variant={props.secondButtonVariant ?? 'indeterminate'} onClick={_onClickSecondButton}>
								{props.secondButtonLabel}{' '}
								{isCompletingClick === 2 && <Spinner className="inline-block" noMargin={true} />}
							</Button>
						)}
						<Button variant={props.dismissVariant ?? 'outline'} onClick={onDialogClose}>
							{props.dismissText ?? 'Cancel'}
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
					{props.buttonLabel && props.onClick && (
						<Button variant={props.buttonVariant ?? 'info'} onClick={onButtonClick}>
							{props.buttonLabel} {isCompletingClick === 1 && <Spinner className="inline-block" noMargin={true} />}
						</Button>
					)}
					{props.secondButtonLabel && props.onClickSecondButton && (
						<Button variant={props.secondButtonVariant ?? 'indeterminate'} onClick={_onClickSecondButton}>
							{props.secondButtonLabel}{' '}
							{isCompletingClick === 2 && <Spinner className="inline-block" noMargin={true} />}
						</Button>
					)}
					<DrawerClose asChild>
						<Button variant={props.dismissVariant ?? 'outline'} onClick={onDialogClose}>
							{props.dismissText ?? 'Cancel'}
						</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
