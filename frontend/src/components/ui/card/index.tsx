import { style } from './style';

import { type CardProps } from '@/types/components/card';
import { cn } from '@/lib/utils';

export function Card ({ className, size, ...props }: CardProps) {
	return (
		<div
			data-slot = 'card'
			data-size = { size }

			className = { cn (style({ size }), className) }
			{ ...props }
		/>
	)
}