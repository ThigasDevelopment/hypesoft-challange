import { Chart, ChartContainer, ChartTypes } from '@components/charts';

import type { ChartProps } from '@/types';
import { cn } from '@/lib/utils';

export function ChartDefault ({ className, type = 'bar', ...props }: ChartProps) {
	const Component = ChartTypes[type];

	return (
		<Chart>
			<ChartContainer>
				<Component
					data = { props.list }
					className = { cn ('', className) }
				>

				</Component>
			</ChartContainer>
		</Chart>
	)
}

/*
<div className = 'px-2 pt-4 flex-1 h-75 w-full min-h-75'>
	<ResponsiveContainer width = '100%' height = '100%'>
		<BarChart data = { dummyCategoryData }>
			<CartesianGrid strokeDasharray = '3 3' stroke = 'var(--border-color)'/>

			<XAxis dataKey = 'name' tick = { { fill: 'var(--text-color)' } }/>
			<YAxis tick = { { fill: 'var(--text-color)' } }/>

			<Tooltip
				contentStyle = {
					{ background: 'var(--bg-color)', borderRadius: '10px' }
				}

				itemStyle = {
					{ color: 'var(--primary-color)' }
				}
			/>
			
			<Bar dataKey = 'amount' name = 'Quantidade' barSize = { 15 } fill = 'var(--primary-color)' activeBar = { { fill: 'var(--primary-hover)' } } />
		</BarChart>
	</ResponsiveContainer>
</div>
*/