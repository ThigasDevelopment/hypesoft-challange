import styles from './styles.module.css';

import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: 'sm' | 'lg' | 'icon' | 'default';

	variant?: 'ghost' | 'outline' | 'destructive' | 'default';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps> (
	({ className, variant = 'default', size = 'default', ...props }, ref) => {
		const classes = [
			styles.button,

			styles[`size-${ size }`],
			styles[`variant-${ variant }`],

			className
		].filter (Boolean).join (' ');

		return (
			<button
				ref = { ref }
				className = { classes }
				{ ...props }
			/>
		)
	}
)