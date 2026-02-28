import type { ComponentProps } from 'react';
import { Dialog as ShadcnDialog } from 'radix-ui';

import { cn } from '@/lib/utils';

export function Dialog ({ ...props }: ComponentProps<typeof ShadcnDialog.Root>) {
	return (
		<ShadcnDialog.Root
			data-slot = 'dialog'

			{ ...props }
		/>
	)
}

export function DialogTrigger ({ ...props }: ComponentProps<typeof ShadcnDialog.Trigger>) {
	return (
		<ShadcnDialog.Trigger
			data-slot = 'dialog-trigger'

			{ ...props }
		/>
	)
}

export function DialogPortal ({ ...props }: ComponentProps<typeof ShadcnDialog.Portal>) {
	return (
		<ShadcnDialog.Portal
			data-slot = 'dialog-portal'

			{ ...props }
		/>
	)
}

export function DialogClose ({ ...props }: ComponentProps<typeof ShadcnDialog.Close>) {
	return (
		<ShadcnDialog.Close
			data-slot = 'dialog-close'

			{ ...props }
		/>
	)
}

export function DialogOverlay ({ className, ...props }: ComponentProps<typeof ShadcnDialog.Overlay>) {
	return (
		<ShadcnDialog.Overlay
			data-slot = 'dialog-overlay'
			className = { cn ('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs fixed inset-0 isolate z-50', className) }

			{ ...props }
		/>
	)
}
