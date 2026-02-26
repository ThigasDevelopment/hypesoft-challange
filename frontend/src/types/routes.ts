import type { ReactElement } from 'react';

export interface AppRoute {
	path: string;
	name?: string;

	element: ReactElement;
	children?: AppRoute[];
}