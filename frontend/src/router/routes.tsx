import { AuthGuard } from './auth';

import { type AppRoute } from '@/types/index';

import { DashboardLayout } from '@/components/layout/dashboard';

import { Login } from '@/pages/login';
import { Dashboard } from '@/pages/dashboard';

export const routes: AppRoute[] = [
	{
		path: '/login',
		element: <Login />
	},

	{
		path: '/',
		name: 'Dashboard',
		element: <AuthGuard />,

		children: [
			{
				path: '/',
				element: <DashboardLayout />,
				children: [
					{
						path: '/',
						element: <Dashboard />
					}
				]
			},
		],
	}
];