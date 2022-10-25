import { useCallback, useEffect, useRef, useState } from 'react';

export interface StepScreenProps {
	nextScreen?: () => void;
	previousScreen?: () => void;
	hasNextScreen: boolean;
	hasPreviousScreen: boolean;
	description: string;
	name: string;
	key: string;
}

type NoExtraProps = '__noExtraProps'
type ExtraStepProps<P extends NoExtraProps | Object = NoExtraProps> = P extends NoExtraProps ? {} : { extraScreenProps: P };
type NormalizedGeneric<P extends NoExtraProps | Object = NoExtraProps> = P extends NoExtraProps ? {} : P;

export interface StepScreen<P extends NoExtraProps | Object = NoExtraProps> {
	renderScreen: (screenProps: StepScreenProps & NormalizedGeneric<P>) => JSX.Element | null;
	id: string;
	name: string | ((props: Omit<StepScreenProps, 'name' | 'description'> & NormalizedGeneric<P>) => string);
	description: string | ((props: Omit<StepScreenProps, 'name' | 'description'> & NormalizedGeneric<P>) => string);
	href: string;
}

type UseStepProps<P extends NoExtraProps | Object = NoExtraProps> = {
	onIncrementStep?: (step: number) => void;
	onDecrementStep?: (step: number) => void;
	steps: StepScreen<P>[];
	step?: number;
	parentScreenProps?: StepScreenProps;
} & ExtraStepProps<P>;

export const useSteps = <P extends NoExtraProps | Object,>(props: UseStepProps<P>) => {
	const { onIncrementStep, onDecrementStep } = props;
	const [currentStepIndex, setCurrentStepIndex] = useState(props.step != null && !isNaN(props.step) ? props.step : 0);
	const currentStep = props.steps[currentStepIndex];
	const currentStepRef = useRef(currentStepIndex);
	currentStepRef.current = currentStepIndex;
	useEffect(() => {
		if (props.step && !isNaN(props.step) && props.step !== currentStepRef.current) {
			setCurrentStepIndex(props.step);
		}
	}, [props.step]);
	const hasNextScreen = currentStepIndex < props.steps.length - 1;
	const hasPreviousScreen = currentStepIndex > 0;
	const incrementStep = useCallback(() => {
		setCurrentStepIndex((csi) => {
			onIncrementStep?.(csi + 1);
			return csi + 1;
		});
	}, [onIncrementStep]);
	const decrementStep = useCallback(() => {
		setCurrentStepIndex((csi) => {
			onDecrementStep?.(csi - 1);
			return csi - 1;
		});
	}, [onDecrementStep]);
	const partialScreenProps: Omit<StepScreenProps, 'name' | 'description'> & NormalizedGeneric<P> = {
		...('extraScreenProps' in props ? props.extraScreenProps : {} ) as NormalizedGeneric<P>,
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
	}
	const name = typeof currentStep.name === 'function' ? currentStep.name(partialScreenProps) : currentStep.name;
	const description = typeof currentStep.description === 'function' ? currentStep.description(partialScreenProps) : currentStep.description;
	const screenProps: StepScreenProps = {
		...partialScreenProps,
		name,
		description
	};
	return {
		screenProps,
		currentStepIndex,
		currentStep: props.steps[currentStepIndex],
	};
};
