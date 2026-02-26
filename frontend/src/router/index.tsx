import { routes } from './routes';
import { type AppRoute } from '@/types';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

function createRouteElement (route: AppRoute) {
	return (
		<Route key = { route.path } path = { route.path } element = { route.element }>
			{
				route.children?.map (childRoute => createRouteElement (childRoute))
			}
		</Route>
	)
}

export function AppRouter () {
	return (
		<BrowserRouter>
			<Routes>
				{
					routes.map (
						route => (
							createRouteElement (route)
						)
					)
				}
			</Routes>
		</BrowserRouter>
	)
}