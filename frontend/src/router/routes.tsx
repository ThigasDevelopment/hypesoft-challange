import type { ReactElement } from 'react';

type AppRoute = {
	path: string;
	element: ReactElement; 
};

export const routes: AppRoute[] = [
	{ path: '/', element: <h1>Hello World</h1> },
];