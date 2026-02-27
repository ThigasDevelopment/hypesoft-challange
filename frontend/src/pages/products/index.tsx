import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

import { Search, SquarePlus } from 'lucide-react';

const dummyProducts = [
	{ id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron 16GB RAM', category: 'Eletrônicos', price: 4200.00, stock: 8 },
	{ id: '2', name: 'Computador', description: 'Computador Gamer Ryzen 5', category: 'Eletrônicos', price: 3500.00, stock: 5 },
	{ id: '3', name: 'Celular', description: 'Smartphone Samsung Galaxy', category: 'Eletrônicos', price: 1999.99, stock: 12 },
];

export function Products () {
	const [ search, setSearch ] = useState ('');

	return (
		<div className = 'space-y-6'>
			<div className = 'flex items-center justify-between'>
				<h2 className = 'text-2xl font-bold'>
					Produtos
				</h2>

				<Button
					variant = 'default'
				>
					<SquarePlus className = 'mr-2 h-4 w-4'/>
					Criar Produto
				</Button>
			</div>

			<Card>
				<div className = 'flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4'>
					<div className = 'relative'>
						<Search className = 'absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground'/>

						<Input
							placeholder = 'Buscar produtos...'
							value = { search }
							onChange = { (e) => setSearch (e.target.value) }
							className = 'pl-8 pr-2 py-2 border rounded w-48 h-12 focus:outline-none focus:ring'
						/>
					</div>
				</div>
			</Card>
		</div>
	)
}