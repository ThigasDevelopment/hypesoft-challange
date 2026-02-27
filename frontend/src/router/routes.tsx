import { AuthGuard } from './auth';

import { type AppRoute } from '@/types/index';

import { DashboardLayout } from '@/components/layout/dashboard';

import { Login } from '@/pages';
import { NotFound } from '@/pages';

import { Dashboard } from '@/pages';
import { Products } from '@/pages';

export const routes: AppRoute[] = [
	{
		path: '*',
		element: <NotFound/>
	},

	{
		path: '/login',
		element: <Login/>
	},

	{
		path: '/',
		name: 'Dashboard',
		element: <AuthGuard/>,

		children: [
			{
				path: '/',
				element: <DashboardLayout/>,
				children: [
					{
						path: '/',
						element: <Dashboard/>
					},

					{
						path: '/products',
						element: <Products/>
					}
				]
			},
		],
	}
];