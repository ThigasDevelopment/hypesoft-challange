import type { ComponentProps } from 'react';

import type { ChartTypes } from '@/components/charts';

export interface ChartProps extends ComponentProps<'div'> {
	list: any[];
	type?: keyof typeof ChartTypes;

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