import type { ComponentProps } from 'react';
import * as Recharts from 'recharts';

import { cn } from '@/lib/utils';

export const ChartTypes = {
	'bar': {
		component: Recharts.BarChart,
		item: Recharts.Bar,
	},
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

export function ChartXData ({ className, ...props }: ComponentProps<typeof Recharts.XAxis>) {
	return (
		<Recharts.XAxis
			data-slot = 'chart-x-data'
			className = { cn ('', className) }

			{ ...props }
		/>
	)
}

export function ChartYData ({ className, ...props }: ComponentProps<typeof Recharts.YAxis>) {
	return (
		<Recharts.YAxis
			data-slot = 'chart-y-data'
			className = { cn ('', className) }

			{ ...props }
		/>
	)
}

export function ChartTooltip ({ ...props }: ComponentProps<typeof Recharts.Tooltip>) {
	return (
		<Recharts.Tooltip
			data-slot = 'chart-tooltip'
			contentStyle = {
				{ background: 'var(--bg-color)', borderRadius: '10px' }
			}

			itemStyle = {
				{ color: 'var(--primary-color)' }
			}

			{ ...props }
		/>
	)
}