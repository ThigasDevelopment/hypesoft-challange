import type { ComponentProps } from 'react';

export interface CategoryProps extends ComponentProps<'div'> {
	name: string;
	date: string;
}