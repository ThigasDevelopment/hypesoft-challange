import { cva } from 'class-variance-authority';

export const style = cva (
	[
		'inline-flex items-center justify-center',
		'gap-2 whitespace-nowrap',
		'text-sm font-medium',
		'transition-colors duration-200',
		'cursor-pointer outline-none',
		'border border-transparent rounded-md',
		'focus-visible:outline-2',
		'focus-visible:outline-[var(--primary-color)]',
		'focus-visible:outline-offset-2',
		'disabled:opacity-50 disabled:pointer-events-none',
	],

	{
		variants: {
			variant: {
				default: [
					'text-[var(--primary-foreground-color)]',
					'bg-[var(--primary-color)]',
					'hover:opacity-90',
				]
			},

			size: {
				default: 'h-10 px-4',
			},
		},

		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);