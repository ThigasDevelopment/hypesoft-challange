import type { ComponentProps } from 'react';
import * as Recharts from 'recharts';

import { cn } from '@/lib/utils';

export const ChartTypes = {
	'bar': Recharts.BarChart,
};

export function Chart ({ className, children, ...props }: ComponentProps<'div'>) {
	return (
		<div
			data-slot = 'chart'
			className = { cn ('px-2 pt-4 flex-1 h-75 w-full min-h-75', className) }

			{ ...props }
		>
			{ children }
		</div>
	)
}

export function ChartContainer ({ className, children, ...props }: ComponentProps<typeof Recharts.ResponsiveContainer>) {
	return (
		<Recharts.ResponsiveContainer
			data-slot = 'chart-container'
			className = { cn ('', className) }

			width = '100%'
			height = '100%'

			{ ...props }
		>
			{ children }
		</Recharts.ResponsiveContainer>
	)
}