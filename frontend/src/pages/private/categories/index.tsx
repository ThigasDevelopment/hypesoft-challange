import { useState } from 'react';

import { Button, Card, Category, Input } from '@components/ui';

import { Search, SquarePlus } from 'lucide-react';

const dummyCategories: string[] = [
	'Eletrônicos',
	'Roupas',
	'Alimentos',
	'Teste',
];

export function Categories () {
	const [ search, setSearch ] = useState ('');

	const filteredCategories = dummyCategories.filter (category => category.toLowerCase ().includes (search.toLowerCase ()))
	filteredCategories.sort ((a, b) => a.localeCompare (b));

	return (
		<div className = 'space-y-6'>
			<div className = 'flex flex-col sm:flex-row items-center justify-between gap-4'>
				<h2 className = 'text-2xl font-bold'>
					Categorias
				</h2>

				<Button
					variant = 'default'
				>
					<SquarePlus className = 'mr-2 h-4 w-4'/>
					Criar Categoria
				</Button>
			</div>

			<Card>
				<div className = 'relative mb-4'>
					<Search className = 'absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground'/>

					<Input
						placeholder = 'Buscar categoria...'
						value = { search }
						onChange = { (e) => setSearch (e.target.value) }
						className = 'pl-8 pr-2 py-2 border rounded w-full sm:w-48 h-12 focus:outline-none focus:ring'
					/>
				</div>

				<div className = 'flex flex-col gap-2 sm:items-center sm:justify-center mb-2'>
					{
						filteredCategories.length > 0 ? (
							filteredCategories.map (
								category => (
									<Category key = { category } name = { category } date = '01/01/2023'/>
								)
							)
						) : (
							<p className = 'text-center text-muted-foreground'>
								Nenhuma categoria encontrada
							</p>
						)
					}
				</div>
			</Card>
		</div>
	)
}