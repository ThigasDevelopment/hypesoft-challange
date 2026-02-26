import { AuthGuard } from './auth';

import { type AppRoute } from '@/types/index';

import { DashboardLayout } from '@/components/layout/dashboard';

import { Login } from '@/pages/login';

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
				element: <DashboardLayout />
			},
		],
	}
];