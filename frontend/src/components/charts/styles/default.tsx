import { Chart, ChartContainer, ChartTooltip, ChartTypes, ChartXData, ChartYData } from '@components/charts';

import type { ChartProps } from '@/types';
import { cn } from '@/lib/utils';

export function ChartDefault ({ className, type = 'bar', ...props }: ChartProps) {
	const component = ChartTypes[type];

	const Component = component.component;
	const ComponentItem = component.item;

	return (
		<Chart>
			<ChartContainer>
				<Component
					data = { props.list }
					className = { cn ('', className) }
				>
					<ChartXData dataKey = 'name' tick = { { fill: 'var(--text-color)' } }/>
					<ChartYData tick = { { fill: 'var(--text-color)' } }/>

					<ChartTooltip/>
					
					<ComponentItem
						dataKey = 'amount'
						name = 'Quantidade'

						radius = { 5 }
						barSize = { 15 }
						
						fill = 'var(--primary-color)'
					/>
				</Component>
			</ChartContainer>
		</Chart>
	)
}