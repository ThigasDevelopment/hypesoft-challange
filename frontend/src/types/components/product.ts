import type { ComponentProps } from 'react';

export interface ProductProps extends ComponentProps<'div'> {
	name: string;
	desc: string;
	category: string;
	price: number;
	stock: number;
}