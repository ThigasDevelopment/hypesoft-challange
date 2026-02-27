import type { ProductProps } from '@/types';

import { Button } from '../../shadcn/button';
import { Card } from '../../shadcn/card';

import { Edit, Trash } from 'lucide-react';

export function Product ({ name, desc, category, price, stock }: ProductProps) {
	return (
		<Card className = 'w-full'>
			<div className = 'flex flex-col md:flex-row justify-between gap-4'>
				<div className = 'flex-1'>
					<h3 className = 'text-lg md:text-xl font-semibold'>
						{ name } <span className = 'text-sm md:text-base text-muted-foreground'>(R$ { price.toLocaleString ('pt-BR', { minimumFractionDigits: 2 }) })</span>
					</h3>

					<p className = 'text-sm md:text-base font-medium text-muted-foreground mt-1'>
						{ desc }
					</p>
				</div>

				<div className = 'flex flex-row md:flex-col items-center justify-center gap-2'>
					<Button className = 'hover:bg-secondary/50 focus-visible:ring-2 focus-visible:ring-secondary/50 transition-all duration-150 active:scale-95 shadow-none hover:shadow-md' variant = 'outline' size = 'sm'><Edit className = 'h-4 w-4'/></Button>
					<Button variant = 'destructive' size = 'sm'><Trash className = 'h-4 w-4'/></Button>
				</div>
			</div>

			<div className = 'mt-4 flex flex-col md:flex-row items-center justify-between text-sm'>
				<span className = 'font-bold text-muted-foreground'>
					{ category }
				</span>

				<span className = { `font-bold ${ stock > 9 ? 'text-success' : stock < 1 ? 'text-danger' : 'text-warning' }` }>
					{ stock > 0 ? `${ stock } em estoque` : 'Indisponível' }
				</span>
			</div>
		</Card>
	)
}