import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routes } from './routes';

export function AppRouter () {
	return (
		<BrowserRouter>
			<Routes>
				{
					routes.map (
						({ path, element, children }) => (
							<Route key = { path } path = { path } element = { element }>
								{
									children?.map (
										({ path, element }) => (
											<Route key = { path } path = { path } element = { element } />
										)
									)
								}
							</Route>
						)
					)
				}
			</Routes>
		</BrowserRouter>
	)
}