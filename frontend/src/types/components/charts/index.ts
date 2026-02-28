import type { ComponentProps } from 'react';

export interface ChartProps extends ComponentProps<'div'> {
	list: any[];
	type?: 'bar';

	fields: {
		data: {
			key: string;
		};

		item: {
			key: string;
			name: string;

			radius?: number;
			size?: number;
		}
	}
}