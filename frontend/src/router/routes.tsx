import { type AppRoute } from '@/types/index';

import { DashboardLayout } from '@/components/layout/dashboard';

import { Dashboard } from '@/pages/dashboard';

export const routes: AppRoute[] = [
	{
		path: '/',
		name: 'Dashboard',
		element: <DashboardLayout />,

		children: [
			{
				path: '/',
				element: <Dashboard />
			},
		],
	}
];