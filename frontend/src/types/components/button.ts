import { style } from '@/components/ui/button/style';

import { type ButtonHTMLAttributes } from 'react';
import { type VariantProps } from 'class-variance-authority';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof style>;