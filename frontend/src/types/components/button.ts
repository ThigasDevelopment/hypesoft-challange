import { style } from '@/components/ui/button/style';

import { type VariantProps } from 'class-variance-authority';
import { type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof style> {
	asChild?: boolean;
}