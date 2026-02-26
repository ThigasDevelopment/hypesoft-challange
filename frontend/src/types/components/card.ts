import { type ComponentProps } from 'react';

export interface CardProps extends ComponentProps<'div'> {
	size?: 'default' | 'sm';
}

export interface CardHeaderProps extends ComponentProps<'div'> { }