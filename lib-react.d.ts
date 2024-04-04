import React from 'react';
// Fix react types
declare module 'react' {
	function forwardRef<T, P = {}>(
		render: (props: P, ref: React.Ref<T>) => React.ReactNode | null,
	): (props: P & React.RefAttributes<T>) => React.ReactNode | null;
}
