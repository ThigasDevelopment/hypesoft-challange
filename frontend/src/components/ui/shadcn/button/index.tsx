'use client';

import { style } from './style';

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { type ButtonProps } from '@/types';
import { cn } from '@/lib/utils';

export const Button = forwardRef<HTMLButtonElement, ButtonProps> (
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Component = asChild ? Slot : 'button';

		return (
			<Component
				ref = { ref }
				className = { cn (style({ variant, size }), className) }
				{ ...props }
			/>
		);
	}
);

Button.displayName = 'Button';