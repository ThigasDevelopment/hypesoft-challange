import { style } from './style';
import { forwardRef } from 'react';

import { type ButtonProps } from '@/types/index';
import { cn } from '@/utils/index';

export const Button = forwardRef<HTMLButtonElement, ButtonProps> (
	({ className, variant, size, ...props }, ref) => {
		return (
			<button
				ref = { ref }
				className = { cn (style ({ variant, size }), className) }
				{ ...props }
			/>
		);
	}
);

Button.displayName = 'Button';