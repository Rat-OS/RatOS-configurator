export default function WizardLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="">
			<div className="mx-auto max-w-full">{children}</div>
		</main>
	);
}
