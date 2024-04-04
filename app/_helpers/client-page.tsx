import React from 'react';
import { NoSSR } from '@/components/common/no-ssr';
import { FullLoadScreen } from '@/components/common/full-load-screen';
import { EditMacro } from '@/app/analysis/macros/[id]/edit/edit';

export const ClientPage: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<div className="h-full @container">
			<React.Suspense fallback={<FullLoadScreen />}>
				<NoSSR>
					<React.Suspense fallback={<FullLoadScreen />}>{children}</React.Suspense>
				</NoSSR>
			</React.Suspense>
		</div>
	);
};
