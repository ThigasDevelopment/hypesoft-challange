import type { CardProps } from '@/types/components/card';
import { cn } from '@/lib/utils';

export function Card ({ className, ...props }: CardProps) {
	return (
		<div
			data-slot = 'card'

			className = { cn ('rounded-xl border bg-card text-card-foreground shadow p-6', className) }
			{ ...props }
		/>
	)
}