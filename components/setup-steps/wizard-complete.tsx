import { StepScreenProps } from '../../hooks/useSteps';
import { StepNavButtons } from '../step-nav-buttons';

export const WizardComplete: React.FC<StepScreenProps> = (props) => {
	const openMainsail = () => {
		window.location.href = 'http://' + window.location.hostname;
	};

	return (
		<>
			<div className="p-8">
				{' '}
				<div className="pb-5 mb-5 border-b border-gray-200">
					<h3 className="text-lg leading-6 font-medium text-gray-900">{props.name}</h3>
					<p className="mt-2 max-w-4xl text-sm text-gray-500">{props.description}</p>
				</div>
				<div className="space-y-4">
					Now that your controlboard is configured, you can connect to your printer via Mainsail and start configuring
					and calibrating your printer.
					<div className="mt-5">
						You can now continue to{' '}
						<a
							href="https://os.ratrig.com/docs/configuration#initial-configuration"
							target="_blank"
							rel="noreferrer"
							className="text-brand-700 hover:text-brand-600 cursor-pointer"
						>
							the next step in the documentation.
						</a>
					</div>
				</div>
			</div>
			<StepNavButtons
				left={{ onClick: props.previousScreen }}
				right={{ onClick: openMainsail, label: 'Open Mainsail' }}
			/>
		</>
	);
};
