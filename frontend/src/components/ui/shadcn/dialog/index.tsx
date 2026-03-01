'use client';

import type { ComponentProps } from 'react';
import { Dialog as ShadcnDialog } from 'radix-ui';

import { Button } from '@components/ui';

import { XIcon } from 'lucide-react';
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

interface DialogContentProps extends ComponentProps<typeof ShadcnDialog.Content> {
	showCloseButton?: boolean;
}

export function DialogContent ({ className, children, showCloseButton = true, ...props }: DialogContentProps) {
	return (
		<DialogPortal>
			<DialogOverlay/>

			<ShadcnDialog.Content
				data-slot = 'dialog-content'
				className = { cn ('bg-background data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 ring-foreground/10 grid max-w-[calc(100%-2rem)] gap-4 rounded-xl p-4 text-sm ring-1 duration-100 sm:max-w-sm fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 outline-none', className) }

				{ ...props }
			>
				{ children }

				{
					showCloseButton && (
						<DialogClose asChild>
							<Button variant = 'ghost' size = 'icon' className = 'absolute right-2'>
								<XIcon className = 'h-4 w-4'/>
							</Button>
						</DialogClose>
					)
				}
			
			</ShadcnDialog.Content>
		</DialogPortal>
	)
}

export function DialogHeader ({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			data-slot = 'dialog-header'
			className = { cn ('gap-2 flex flex-col', className) }

			{ ...props }
		/>
	)
}

interface DialogFooterProps extends ComponentProps<'div'> {
	showCloseButton?: boolean;
}

export function DialogFooter ({ className, children, showCloseButton = false, ...props }: DialogFooterProps) {
	return (
		<div
			data-slot = 'dialog-footer'
			className = { cn ('bg-muted/10 -mx-2 -mb-4 rounded-b-xl border-t p-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:items-center', className) }

			{ ...props }
		>
			{ children }

			{
				showCloseButton && (
					<DialogClose asChild>
						<Button variant = 'outline'>
							Fechar
						</Button>
					</DialogClose>
				)
			}
		</div>
	)
}

export function DialogTitle ({ className, ...props }: ComponentProps<typeof ShadcnDialog.Title>) {
	return (
		<ShadcnDialog.Title
			data-slot = 'dialog-title'
			className = { cn ('text-base leading-none font-medium', className) }

			{ ...props }
		/>
	)
}

export function DialogDescription ({ className, ...props }: ComponentProps<typeof ShadcnDialog.Description>) {
	return (
		<ShadcnDialog.Description
			data-slot = 'dialog-description'
			className = { cn ('text-muted-foreground *:[a]:hover:text-foreground text-sm *:[a]:underline *:[a]:underline-offset-3', className) }

			{ ...props }
		/>
	)
}