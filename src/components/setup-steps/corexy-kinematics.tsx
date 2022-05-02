import React, { useCallback, useState } from 'react';
import { atom, useSetRecoilState } from 'recoil';
import { StepScreenProps } from '../../pages';

type StepComponent = React.FC<{
	onComplete: () => void;
}>;

const XDirectionState = atom({
	key: 'XDirection',
	default: 'right',
});

const CenterKinematics: StepComponent = (props) => {
	return (
		<div className='p-8'>
			<div className='pb-5 mb-5 border-b border-gray-200'>
				<h3 className='text-lg leading-6 font-medium text-gray-900'>Manually center printer X, Y and Z axes</h3>
				<p className='mt-2 max-w-4xl text-sm text-gray-500'>
					Please manually move your carriage to the center of the bed and make sure the distance from the nozzle to the
					bed is at least 100mm.
				</p>
			</div>
			<div className='pt-3 flex justify-center'>
				<button
					type='button'
					className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600'
					onClick={props.onComplete}
				>
					I confirm the X, Y and Z axes are centered
				</button>
			</div>
		</div>
	);
};

const MoveY: StepComponent = (props) => {
	return (
		<div className='p-8'>
			<div className='pb-5 mb-5 border-b border-gray-200'>
				<h3 className='text-lg leading-6 font-medium text-gray-900'>Did the toolhead move towards the back?</h3>
				<p className='mt-2 max-w-4xl text-sm text-gray-500'>
					The toolhead should now have moved 50mm towards the back.
				</p>
			</div>
			<div className='pt-3 flex flex-col align-center space-y-5'>
				<button
					type='button'
					onClick={props.onComplete}
					className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600'
				>
					Yes, it moved to the right!
				</button>
				<button
					type='button'
					// onClick={maybeInvertBoth}
					className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600'
				>
					No, it moved to the left.
				</button>
				<button
					type='button'
					// onClick={maybeInvertA}
					className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600'
				>
					No, it moved towards the back.
				</button>
				<button
					type='button'
					// onClick={maybeinvertB}
					className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600'
				>
					No, it moved towards the front.
				</button>
			</div>
		</div>
	);
};

const MoveX: StepComponent = (props) => {
	const setXDirection = useSetRecoilState(XDirectionState);
	const maybeInvertA = useCallback(() => {
		setXDirection('back');
	}, [setXDirection]);
	const maybeinvertB = useCallback(() => {
		setXDirection('front');
	}, [setXDirection]);
	const maybeInvertBoth = useCallback(() => {
		setXDirection('left');
	}, [setXDirection]);

	return (
		<div className='p-8'>
			<div className='pb-5 mb-5 border-b border-gray-200'>
				<h3 className='text-lg leading-6 font-medium text-gray-900'>Did the toolhead move to the right?</h3>
				<p className='mt-2 max-w-4xl text-sm text-gray-500'>The toolhead should now have moved 50mm to the right.</p>
			</div>
			<div className='pt-3 flex flex-col align-center space-y-5'>
				<button
					type='button'
					onClick={props.onComplete}
					className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600'
				>
					Yes, it moved to the right!
				</button>
				<button
					type='button'
					onClick={maybeInvertBoth}
					className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600'
				>
					No, it moved to the left.
				</button>
				<button
					type='button'
					onClick={maybeInvertA}
					className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600'
				>
					No, it moved towards the back.
				</button>
				<button
					type='button'
					onClick={maybeinvertB}
					className='inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600'
				>
					No, it moved towards the front.
				</button>
			</div>
		</div>
	);
};

const steps = [CenterKinematics, MoveX];

export const CoreXYKinematics: React.FC<StepScreenProps> = () => {
	const [step, setStep] = useState(0);
	const StepComponent = steps[step];
	const nextStep = useCallback(() => {
		setStep((s) => s + 1);
	}, []);
	return <StepComponent onComplete={nextStep} />;
};
