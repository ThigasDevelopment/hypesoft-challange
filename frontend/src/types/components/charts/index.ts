import type { ComponentProps } from 'react';

export interface ChartProps extends ComponentProps<'div'> {
	list: any[];
	type?: 'bar';
}