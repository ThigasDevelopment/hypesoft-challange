import { useState } from 'react';

import { Button, Card, Category, Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownLabel, DropdownSeparator, DropdownTrigger, Input } from '@components/ui';

import { ArrowDown, ArrowUp, Search, SquarePlus } from 'lucide-react';

const dummyCategories: any[] = [
	{ id: '1', name: 'Eletrônicos', date: 1772350895 },
	{ id: '2', name: 'Roupas', date: 1772450895 },
	{ id: '3', name: 'Alimentos', date: 1772550895 },
	{ id: '4', name: 'Teste', date: 1772650895 },
];

export function Categories () {
	const [ filter, setFilter ] = useState ('none');
	const [ search, setSearch ] = useState ('');

	const filteredCategories = dummyCategories.filter (category => category.name.toLowerCase ().includes (search.toLowerCase ()))
	filteredCategories.sort ((a, b) => a.name.toLowerCase ().localeCompare (b.name.toLowerCase ()));

	if (filteredCategories.length === 0 && filter !== 'none') {
		setFilter ('none');
	}

	if (filter !== 'none') {
		switch (filter) {
			case 'a-z':
				filteredCategories.sort ((a, b) => a.name.toLowerCase ().localeCompare (b.name.toLowerCase ()));
				break;
			case 'z-a':
				filteredCategories.sort ((a, b) => b.name.toLowerCase ().localeCompare (a.name.toLowerCase ()));
				break;
			case 'recent-asc':
				filteredCategories.sort ((a, b) => a.date - b.date);
				break;
			case 'recent-desc':
				filteredCategories.sort ((a, b) => b.date - a.date);
				break;
		}
	}

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
				<div className = 'flex items-center sm:justify-between gap-2 mb-4'>
					<div className = 'relative'>
						<Search className = 'absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground'/>

						<Input
							placeholder = 'Buscar categoria...'
							value = { search }
							onChange = { (e) => setSearch (e.target.value) }
							className = 'pl-8 pr-2 py-2 border rounded w-full sm:w-48 h-12 focus:outline-none focus:ring'
						/>
					</div>

					<Dropdown>
						<DropdownTrigger asChild>
							<Button variant = 'outline' className = 'w-full sm:w-auto'>
								Filtros
							</Button>
						</DropdownTrigger>

						<DropdownContent align = 'end'>
							<DropdownGroup>
								<DropdownLabel>Ordernar por</DropdownLabel>
								<DropdownSeparator/>
								<DropdownItem className = { filter === 'a-z' ? 'bg-muted' : '' } onClick = { () => setFilter (filter === 'a-z' ? 'none' : 'a-z') }>Nome (A-Z)</DropdownItem>
								<DropdownItem className = { filter === 'z-a' ? 'bg-muted' : '' } onClick = { () => setFilter (filter === 'z-a' ? 'none' : 'z-a') }>Nome (Z-A)</DropdownItem>
								<DropdownSeparator/>
								<DropdownItem className = { filter === 'recent-asc' ? 'bg-muted' : '' } onClick = { () => setFilter (filter === 'recent-asc' ? 'none' : 'recent-asc') }>Recentes <ArrowDown className = 'ml-2 h-4 w-4'/> <ArrowUp className = 'ml-2 h-4 w-4'/></DropdownItem>
								<DropdownItem className = { filter === 'recent-desc' ? 'bg-muted' : '' } onClick = { () => setFilter (filter === 'recent-desc' ? 'none' : 'recent-desc') }>Recentes <ArrowUp className = 'ml-2 h-4 w-4'/> <ArrowDown className = 'ml-2 h-4 w-4'/></DropdownItem>
							</DropdownGroup>
						</DropdownContent>
					</Dropdown>
				</div>

				<div className = 'flex flex-col gap-4 sm:items-center sm:justify-center mb-2'>
					{
						filteredCategories.length > 0 ? (
							filteredCategories.map (
								category => (
									<Category key = { category.id } name = { category.name } date = { new Date (category.date * 1000).toLocaleDateString ('pt-BR') }/>
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