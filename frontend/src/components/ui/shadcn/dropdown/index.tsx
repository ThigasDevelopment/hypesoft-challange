import { DropdownMenu } from 'radix-ui';

import { cn } from '@/lib/utils';

export function Dropdown ({ ...props }: DropdownMenu.DropdownMenuProps) {
	return (
		<DropdownMenu.Root
			data-slot = 'dropdown'

			{ ...props }
		/>
	)
}

export function DropdownPortal ({ ...props }: DropdownMenu.DropdownMenuPortalProps) {
	return (
		<DropdownMenu.Portal
			data-slot = 'dropdown-portal'

			{ ...props }
		/>
	)
}

export function DropdownTrigger ({ ...props }: DropdownMenu.DropdownMenuTriggerProps) {
	return (
		<DropdownMenu.Trigger
			data-slot = 'dropdown-trigger'

			{ ...props }
		/>
	)
}

export function DropdownContent ({ className, align = 'start', sideOffset = 4, ...props }: DropdownMenu.DropdownMenuContentProps) {
	return (
		<DropdownPortal>
			<DropdownMenu.Content
				data-slot = 'dropdown-content'

				align = { align }
				sideOffset = { sideOffset }

				className = { cn ('data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/10 bg-background text-popover-foreground min-w-32 rounded-lg p-1 shadow-md ring-1 duration-100 z-50 overflow-x-hidden overflow-y-auto data-[state=closed]:overflow-hidden', className) }

				{ ...props }
			/>
		</DropdownPortal>
	)
}

export function DropdownGroup ({ ...props }: DropdownMenu.DropdownMenuGroupProps) {
	return (
		<DropdownMenu.Group
			data-slot = 'dropdown-group'

			{ ...props }
		/>
	)
}

export function DropdownItem ({ className, ...props }: DropdownMenu.DropdownMenuItemProps) {
	return (
		<DropdownMenu.Item
			data-slot = 'dropdown-item'

			className = { cn ('data-disabled:pointer-events-none flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-disabled:opacity-40 hover:bg-hover', className) }

			{ ...props }
		/>
	)
}

export function DropdownLabel ({ className, ...props }: DropdownMenu.DropdownMenuLabelProps) {
	return (
		<DropdownMenu.Label
			data-slot = 'dropdown-label'

			className = { cn ('px-2 py-1.5 text-sm font-semibold', className) }

			{ ...props }
		/>
	)
}

export function DropdownSeparator ({ className, ...props }: DropdownMenu.DropdownMenuSeparatorProps) {
	return (
		<DropdownMenu.Separator
			data-slot = 'dropdown-separator'

			className = { cn ('bg-border -mx-1 my-1 h-px', className) }

			{ ...props }
		/>
	)
}