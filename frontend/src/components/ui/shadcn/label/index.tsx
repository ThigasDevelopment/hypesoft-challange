import type { ComponentProps } from 'react';
import { Label as ShadcnLabel } from 'radix-ui';

import { cn } from '@/lib/utils';

export function Label ({ className, ...props }: ComponentProps<typeof ShadcnLabel.Root>) {
	return (
		<ShadcnLabel.Root
			data-slot = 'label'
			className = { cn ('gap-2 text-sm leading-none font-medium group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 flex items-center select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed', className) }

			{ ...props }
		/>
	)
}
