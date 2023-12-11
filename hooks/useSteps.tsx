'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

export interface StepScreenProps extends React.PropsWithChildren<{}> {
	nextScreen?: () => void;
	previousScreen?: () => void;
	hasNextScreen: boolean;
	hasPreviousScreen: boolean;
	skipSteps?: () => void;
	description: string;
	name: string;
	key: string;
}

type NoExtraProps = '__noExtraProps';
type ExtraStepProps<P extends NoExtraProps | Object = NoExtraProps> = P extends NoExtraProps
	? {}
	: { extraScreenProps: P };
type NormalizedGeneric<P extends NoExtraProps | Object = NoExtraProps> = P extends NoExtraProps ? {} : P;

export interface StepScreen<P extends NoExtraProps | Object = NoExtraProps> {
	renderScreen: (screenProps: StepScreenProps & NormalizedGeneric<P>) => JSX.Element | null;
	id: string;
	name: string | ((props: Omit<StepScreenProps, 'name' | 'description'> & NormalizedGeneric<P>) => string);
	description: string | ((props: Omit<StepScreenProps, 'name' | 'description'> & NormalizedGeneric<P>) => string);
	href: string;
}

type UseStepProps<P extends NoExtraProps | Object = NoExtraProps> = {
	onStepChange?: (step: number, action: 'set' | 'increment' | 'decrement') => void;
	steps: StepScreen<P>[];
	step?: number;
	parentScreenProps?: StepScreenProps;
} & ExtraStepProps<P>;

export const useSteps = <P extends NoExtraProps | Object>(props: UseStepProps<P>) => {
	const { onStepChange } = props;
	const [currentStepIndex, _setCurrentStepIndex] = useState(props.step != null && !isNaN(props.step) ? props.step : 0);
	const currentStep = props.steps[currentStepIndex];
	const currentStepRef = useRef(currentStepIndex);
	currentStepRef.current = currentStepIndex;
	const setCurrentStepIndex = useCallback(
		(stepIndex: number) => {
			onStepChange?.(stepIndex, 'set');
			_setCurrentStepIndex(stepIndex);
		},
		[onStepChange],
	);
	useEffect(() => {
		if (props.step && !isNaN(props.step) && props.step !== currentStepRef.current) {
			_setCurrentStepIndex(props.step);
		}
	}, [props.step]);
	const hasNextScreen = currentStepIndex < props.steps.length - 1;
	const hasPreviousScreen = currentStepIndex > 0;
	const incrementStep = useCallback(() => {
		_setCurrentStepIndex((csi) => {
			onStepChange?.(csi + 1, 'increment');
			return csi + 1;
		});
	}, [onStepChange]);
	const decrementStep = useCallback(() => {
		_setCurrentStepIndex((csi) => {
			onStepChange?.(csi - 1, 'decrement');
			return csi - 1;
		});
	}, [onStepChange]);
	const partialScreenProps: Omit<StepScreenProps, 'name' | 'description'> & NormalizedGeneric<P> = {
		...(('extraScreenProps' in props ? props.extraScreenProps : {}) as NormalizedGeneric<P>),
		key: 'step-' + currentStepIndex,
		hasNextScreen: hasNextScreen || (props.parentScreenProps?.hasNextScreen ?? false),
		hasPreviousScreen: hasPreviousScreen || (props.parentScreenProps?.hasNextScreen ?? false),
		nextScreen: hasNextScreen
			? incrementStep
			: props.parentScreenProps?.hasNextScreen
			? props.parentScreenProps.nextScreen
			: undefined,
		previousScreen: hasPreviousScreen
			? decrementStep
			: props.parentScreenProps?.hasPreviousScreen
			? props.parentScreenProps.previousScreen
			: undefined,
		skipSteps:
			props.parentScreenProps && props.parentScreenProps.hasNextScreen ? props.parentScreenProps.nextScreen : undefined,
	};
	const name = typeof currentStep.name === 'function' ? currentStep.name(partialScreenProps) : currentStep.name;
	const description =
		typeof currentStep.description === 'function'
			? currentStep.description(partialScreenProps)
			: currentStep.description;
	const screenProps: StepScreenProps = {
		...partialScreenProps,
		name,
		description,
	};
	return {
		screenProps,
		currentStepIndex,
		setCurrentStepIndex: setCurrentStepIndex,
		currentStep: props.steps[currentStepIndex],
	};
};
