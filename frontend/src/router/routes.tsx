import { AuthGuard } from './auth';

import { type AppRoute } from '@/types/index';

import { DashboardLayout } from '@/components/layout/dashboard';

import { Login } from '@/pages/public/login';
import { NotFound } from '@/pages/public/notfound';

import { Dashboard } from '@/pages/private/dashboard';
import { Products } from '@/pages/private/products';

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