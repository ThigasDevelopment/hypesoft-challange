import type { ComponentProps } from 'react';

export interface CategoryProps extends ComponentProps<'div'> {
	id?: string;
	name: string;
	date: string;
}