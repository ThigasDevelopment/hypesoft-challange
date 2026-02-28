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
					<ChartXData dataKey = { props.fields.data.key } tick = { { fill: 'var(--text-color)' } }/>
					<ChartYData tick = { { fill: 'var(--text-color)' } }/>

					<ChartTooltip/>
					
					<ComponentItem
						dataKey = { props.fields.item.key }
						name = { props.fields.item.name }

						radius = { props.fields.item.radius || 5 }
						barSize = { props.fields.item.size || 15 }
						
						fill = 'var(--primary-color)'
					/>
				</Component>
			</ChartContainer>
		</Chart>
	)
}