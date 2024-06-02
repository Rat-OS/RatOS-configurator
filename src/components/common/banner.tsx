import React from 'react';
import { badgeBackgroundColorStyle, badgeBorderColorStyle, badgeTextColorStyle } from '@/components/common/badge';
import { twJoin, twMerge } from 'tailwind-merge';
import { VariantProps, cva } from 'class-variance-authority';

const bannerStyle = cva('rounded-md p-4 border', {
	variants: {
		color: {
			red: [
				badgeBackgroundColorStyle({ color: 'red' }),
				badgeBorderColorStyle({ color: 'red' }),
				badgeTextColorStyle({ color: 'red' }),
			],
			yellow: [
				badgeBackgroundColorStyle({ color: 'yellow' }),
				badgeBorderColorStyle({ color: 'yellow' }),
				badgeTextColorStyle({ color: 'yellow' }),
			],
			orange: [
				badgeBackgroundColorStyle({ color: 'orange' }),
				badgeBorderColorStyle({ color: 'orange' }),
				badgeTextColorStyle({ color: 'orange' }),
			],
			green: [
				badgeBackgroundColorStyle({ color: 'green' }),
				badgeBorderColorStyle({ color: 'green' }),
				badgeTextColorStyle({ color: 'green' }),
			],
			lime: [
				badgeBackgroundColorStyle({ color: 'lime' }),
				badgeBorderColorStyle({ color: 'lime' }),
				badgeTextColorStyle({ color: 'lime' }),
			],
			blue: [
				badgeBackgroundColorStyle({ color: 'blue' }),
				badgeBorderColorStyle({ color: 'blue' }),
				badgeTextColorStyle({ color: 'blue' }),
			],
			sky: [
				badgeBackgroundColorStyle({ color: 'sky' }),
				badgeBorderColorStyle({ color: 'sky' }),
				badgeTextColorStyle({ color: 'sky' }),
			],
			indigo: [
				badgeBackgroundColorStyle({ color: 'indigo' }),
				badgeBorderColorStyle({ color: 'indigo' }),
				badgeTextColorStyle({ color: 'indigo' }),
			],
			purple: [
				badgeBackgroundColorStyle({ color: 'purple' }),
				badgeBorderColorStyle({ color: 'purple' }),
				badgeTextColorStyle({ color: 'purple' }),
			],
			pink: [
				badgeBackgroundColorStyle({ color: 'pink' }),
				badgeBorderColorStyle({ color: 'pink' }),
				badgeTextColorStyle({ color: 'pink' }),
			],
			brand: [
				badgeBackgroundColorStyle({ color: 'brand' }),
				badgeBorderColorStyle({ color: 'brand' }),
				badgeTextColorStyle({ color: 'brand' }),
			],
			gray: [
				badgeBackgroundColorStyle({ color: 'gray' }),
				badgeBorderColorStyle({ color: 'gray' }),
				badgeTextColorStyle({ color: 'gray' }),
			],
		},
	},
	defaultVariants: {
		color: 'gray',
	},
});

interface BannerProps extends React.PropsWithChildren<VariantProps<typeof bannerStyle>> {
	className?: string;
	Icon: React.ComponentType<{ className?: string }>;
	title?: string;
}

export const Banner: React.FC<BannerProps> = (props) => {
	const { Icon, className, title } = props;
	return (
		<div className={twMerge(bannerStyle({ color: props.color }), props.className)}>
			<div className="flex">
				<div className="flex-shrink-0">
					<Icon className={twJoin('h-5 w-5')} aria-hidden="true" />
				</div>
				<div className="ml-3 flex-1">
					<h3 className={twJoin('text-sm font-bold')}>{props.title}</h3>
					<div className="mt-2 text-sm">{props.children}</div>
				</div>
			</div>
		</div>
	);
};
