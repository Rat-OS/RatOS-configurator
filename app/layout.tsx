import { hasLastPrinterSettings } from '../server/helpers/printer-settings';
import { Redirecter } from './_hooks/navigation';
import { twJoin } from 'tailwind-merge';
import { inter } from './fonts';
import './../styles/globals.css';
import { headers } from 'next/headers';
import { scrollClasses } from '../components/common/scroll-container';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	// Stupid hack to make this a dynamic component. Too much Next.js magic.
	headers().get('x-configurator');
	return (
		<html className={twJoin('dark h-full', scrollClasses, inter.variable, inter.className)}>
			<body className="h-full bg-zinc-100 dark:bg-[rgb(18,18,20)]">
				<Redirecter hasLastPrinterSettings={hasLastPrinterSettings()}>{children}</Redirecter>
			</body>
		</html>
	);
}
