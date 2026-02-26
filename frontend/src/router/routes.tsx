import { type AppRoute } from '@/types/index';

import { DashboardLayout } from '@/components/layout/dashboard';

export const routes: AppRoute[] = [
	{
		path: '/',
		name: 'Dashboard',
		element: <DashboardLayout />,

		children: [
			{
				path: '/',
				element: <h1>Dashboard</h1>
			},
		],
	}
];