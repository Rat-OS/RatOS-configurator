import { CheckIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { classNames } from '../helpers/classNames';
import { StepScreen, StepScreenProps } from '../hooks/useSteps';

interface StepProps {
	steps: StepScreen[];
	screenProps: StepScreenProps;
	currentStepIndex: number;
}

export const VerticalSteps: React.FC<StepProps> = (props) => {
	return (
		<nav aria-label="Progress">
			<ol role="list" className="overflow-hidden">
				{props.steps.map((step, stepIdx) => {
					const name = typeof step.name === 'function' ? step.name(props.screenProps) : step.name;
					const description = typeof step.description === 'function' ? step.description(props.screenProps) : step.description;
					return (
					<li key={name} className={classNames(stepIdx !== props.steps.length - 1 ? 'pb-10' : '', 'relative')}>
						{props.currentStepIndex > stepIdx ? (
							<>
								{stepIdx !== props.steps.length - 1 ? (
									<div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-brand-600" aria-hidden="true" />
								) : null}
								<a href={step.href} className="relative flex items-start group">
									<span className="h-9 flex items-center">
										<span className="relative z-10 w-8 h-8 flex items-center justify-center bg-brand-600 rounded-full group-hover:bg-brand-600">
											<CheckIcon className="w-5 h-5 text-white" aria-hidden="true" />
										</span>
									</span>
									<span className="ml-4 min-w-0 flex flex-col">
										<span className="text-xs font-semibold tracking-wide uppercase">{name}</span>
										<span className="text-sm text-gray-500">{description}</span>
									</span>
								</a>
							</>
						) : props.currentStepIndex === stepIdx ? (
							<>
								{stepIdx !== props.steps.length - 1 ? (
									<div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300" aria-hidden="true" />
								) : null}
								<a href={step.href} className="relative flex items-start group" aria-current="step">
									<span className="h-9 flex items-center" aria-hidden="true">
										<span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-brand-600 rounded-full">
											<span className="h-2.5 w-2.5 bg-brand-600 rounded-full" />
										</span>
									</span>
									<span className="ml-4 min-w-0 flex flex-col">
										<span className="text-xs font-semibold tracking-wide uppercase text-brand-600">{name}</span>
										<span className="text-sm text-gray-500">{description}</span>
									</span>
								</a>
							</>
						) : (
							<>
								{stepIdx !== props.steps.length - 1 ? (
									<div className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-gray-300" aria-hidden="true" />
								) : null}
								<a href={step.href} className="relative flex items-start group">
									<span className="h-9 flex items-center" aria-hidden="true">
										<span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
											<span className="h-2.5 w-2.5 bg-transparent rounded-full group-hover:bg-gray-300" />
										</span>
									</span>
									<span className="ml-4 min-w-0 flex flex-col">
										<span className="text-xs font-semibold tracking-wide uppercase text-gray-500">{name}</span>
										<span className="text-sm text-gray-500">{description}</span>
									</span>
								</a>
							</>
						)}
					</li>
				)})}
			</ol>
		</nav>
	);
};
