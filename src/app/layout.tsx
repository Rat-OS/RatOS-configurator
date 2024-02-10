import { hasLastPrinterSettings } from '../server/helpers/printer-settings';
import { Redirecter } from './_hooks/navigation';
import { twJoin } from 'tailwind-merge';
import { inter } from './fonts';
import './../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html className={twJoin('dark h-full scroll-smooth', inter.variable, inter.className)}>
			<body className="h-full bg-zinc-100 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-400 scrollbar-thumb-rounded-md dark:bg-[rgb(18,18,20)] dark:scrollbar-thumb-zinc-600">
				<Redirecter hasLastPrinterSettings={hasLastPrinterSettings()}>{children}</Redirecter>
			</body>
		</html>
	);
}
