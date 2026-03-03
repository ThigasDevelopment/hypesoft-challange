'use client';

import type { ComponentProps } from 'react';
import { ScrollArea as ShadcnScrollArea } from 'radix-ui';

import { cn } from '@/lib/utils';

export function ScrollArea ({ className, children, ...props }: ComponentProps<typeof ShadcnScrollArea.Root>) {
	return (
		<ShadcnScrollArea.Root
			data-slot = 'scroll-area'
			className = { cn ('relative', className) }

			{ ...props }
		>
			<ShadcnScrollArea.Viewport
				data-slot = 'scroll-area-viewport'
				className = { cn ('size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1', className) }
			>
				{ children }
			</ShadcnScrollArea.Viewport>

			<ScrollBar/>
			<ShadcnScrollArea.Corner/>
		</ShadcnScrollArea.Root>
	)
}

export function ScrollBar ({ className, orientation = 'vertical', ...props }: ComponentProps<typeof ShadcnScrollArea.ScrollAreaScrollbar>) {
	return (
		<ShadcnScrollArea.ScrollAreaScrollbar
			data-slot = 'scroll-area-scrollbar'
			data-orientation = { orientation }

			orientation = { orientation }

			className = { cn ('data-horizontal:h-2.5 data-horizontal:flex-col data-horizontal:border-t data-horizontal:border-t-transparent data-vertical:h-full data-vertical:w-2.5 data-vertical:border-l data-vertical:border-l-transparent flex touch-none p-px transition-colors select-none', className) }

			{ ...props }
		>
			<ShadcnScrollArea.ScrollAreaThumb
				data-slot = 'scroll-area-scrollbar-thumb'
				className = 'rounded-full relative flex-1 bg-border'
			/>
		</ShadcnScrollArea.ScrollAreaScrollbar>
	)
}
