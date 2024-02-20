export default function WizardLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="py-10">
			<div className="mx-auto max-w-7xl pb-12">{children}</div>
		</main>
	);
}
