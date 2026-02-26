import type { ReactElement } from 'react';

type AppRoute = {
	path: string;
	element: ReactElement;
	children?: AppRoute[];
};

import { DashboardLayout } from '@/components/layout/dashboard';

export const routes: AppRoute[] = [
	{
		path: '/',
		element: <DashboardLayout />,

		children: [
			{
				path: '/',
				element: <h1>Dashboard</h1>
			}
		],
	}
];