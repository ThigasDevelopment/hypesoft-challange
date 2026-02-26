import { style } from './style';

import type { CardProps, CardHeaderProps } from '@/types/components/card';
import { cn } from '@/lib/utils';

export function Card ({ className, size, ...props }: CardProps) {
	return (
		<div
			data-slot = 'card'
			data-size = { size }

			className = { cn (style ({ size }), className) }
			{ ...props }
		/>
	)
}

export function CardHeader ({ className, ...props }: CardHeaderProps) {
	return (
		<div
			data-slot = 'card-header'

			className = { cn ('flex flex-col space-y-1.5 p-6', className) }
			{ ...props }
		/>
	)
}

export function CardTitle ({ className, ...props }: CardHeaderProps) {
	return (
		<h3
			data-slot = 'card-title'

			className = { cn ('text-lg font-semibold', className) }
			{ ...props }
		/>
	)
}

export function CardContent ({ className, ...props }: CardHeaderProps) {
	return (
		<div
			data-slot = 'card-content'

			className = { cn ('px-4 group-data-[size=sm]/card:px-3', className) }
			{ ...props }
		/>
	)
}