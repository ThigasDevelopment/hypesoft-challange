import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import { SquarePlus } from 'lucide-react';

export function Products () {
	const dummyProducts = [
		{ id: 'asdasdas-asdasdsad-asddsada-dasdas', name: 'Produto A', description: 'Descrição do produto A', category: 'Eletrônicos', price: 199.99, stock: 5 },
		{ id: 'asdasdas-asdasdsad-asddsada-dasdas', name: 'Produto B', description: 'Descrição do produto B', category: 'Roupas', price: 49.99, stock: 3 },
		{ id: 'asdasdas-asdasdsad-asddsada-dasdas', name: 'Produto C', description: 'Descrição do produto C', category: 'Alimentos', price: 9.99, stock: 2 },
	];

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
				<div className = 'flex items-center justify-between border-b p-4'>
					
				</div>
			</Card>
		</div>
	)
}