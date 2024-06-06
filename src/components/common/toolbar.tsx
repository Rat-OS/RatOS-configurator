import { useAutoAnimate } from '@formkit/auto-animate/react';
import React, { useCallback } from 'react';
import { twJoin, twMerge } from 'tailwind-merge';
import { Spinner } from '@/components/common/spinner';
import { useDebounce } from '@/app/_hooks/debounce';
import { LucideProps } from 'lucide-react';

type Icon = React.FC<LucideProps>;

export type ToolbarButton = {
	id: string;
	title: string;
	isLoading?: boolean;
	icon?: Icon;
	name?: NonNullable<React.ReactNode>;
	className?: string;
	onClick: (() => void) | (() => Promise<void>);
	subButtonPosition?: 'before' | 'after';
	children?: React.ReactNode;
	hidden?: boolean;
	isActive: boolean;
} & ({ name: string } | { icon: Icon });

export type ToolbarButtonWithParent = ToolbarButton & { parent: string };

type ToolbarProps = {
	className?: string;
	buttons: ToolbarButton[];
	subButtons?: (ToolbarButton & { parent: string })[];
};

const animationOptions = { duration: 150 };

const Button = (button: React.PropsWithChildren<ToolbarButton>) => {
	const [animateRef] = useAutoAnimate();
	const [isLoading, setIsLoading] = React.useState(false);
	const _setIsLoading = useDebounce(setIsLoading, 200);
	const _onClick = useCallback(async () => {
		if (button.onClick && !button.isLoading) {
			_setIsLoading(true);
			await button.onClick();
			_setIsLoading(false);
		}
	}, [_setIsLoading, button]);
	return (
		<li key={button.id} className={twJoin('relative flex')}>
			{button.subButtonPosition === 'before' && (
				<ol ref={animateRef} className="flex divide-x divide-zinc-200 dark:divide-zinc-800">
					{button.children}
				</ol>
			)}
			<div className={twJoin('flex items-center', button.isActive && 'dark:bg-zinc-800')}>
				<button
					onClick={_onClick}
					type="button"
					title={button.title}
					className={twMerge(
						'flex items-center space-x-2 whitespace-nowrap px-5 py-3 text-sm font-medium text-zinc-700 transition-transform hover:text-black active:scale-95 dark:text-zinc-300 dark:hover:text-white',
						button.isActive ? 'hover:text-brand:600 text-brand-600 dark:text-brand-500 dark:hover:text-brand-500' : '',
						button.hidden ? 'hidden' : '',
						button.className,
					)}
				>
					{button.icon && (button.isLoading || isLoading) && (
						<Spinner noMargin={true} className="inline h-5 w-5 flex-shrink-0" aria-hidden="true" />
					)}
					{button.icon && !button.isLoading && (
						<button.icon className="inline h-5 w-5 flex-shrink-0" aria-hidden="true" />
					)}
					{button.name && <span className="inline">{button.name}</span>}
				</button>
			</div>
			{button.subButtonPosition != null && button.subButtonPosition !== 'before' && (
				<ol ref={animateRef} className="flex divide-x divide-zinc-200 dark:divide-zinc-800">
					{button.children}
				</ol>
			)}
			{button.subButtonPosition == null && button.children && button.children}
		</li>
	);
};

export default function Toolbar(props: ToolbarProps) {
	const [animateRef] = useAutoAnimate(animationOptions);
	return (
		<nav
			className={twMerge(
				'flex select-none overflow-hidden rounded-md border border-zinc-200 bg-white shadow dark:border-zinc-800 dark:bg-zinc-900/80',
				props.className,
			)}
			aria-label="Breadcrumb"
		>
			<ol role="list" className="flex divide-x divide-zinc-200 dark:divide-zinc-800" ref={animateRef}>
				{props.buttons.map((button) => {
					const subButtons = props.subButtons?.filter((b) => b.parent === button.id);
					return button.hidden ? null : (
						<Button {...button} key={button.id}>
							{subButtons != null && subButtons.length > 0 && button.isActive
								? subButtons.map((subButton) => {
										return subButton.hidden ? null : <Button {...subButton} key={subButton.id} />;
									})
								: button.children}
						</Button>
					);
				})}
			</ol>
		</nav>
	);
}
