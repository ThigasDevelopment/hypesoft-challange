import { useState } from 'react';

import { Button, Card, Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownLabel, DropdownSeparator, DropdownTrigger, Input } from '@components/ui';
import { Product } from '@/components/ui/default/product';

import { ArrowDown, ArrowUp, Search, SquarePlus } from 'lucide-react';

const dummyCategories: string[] = [
	'Eletrônicos',
	'Roupas',
	'Alimentos',
];

const dummyProducts: any[] = [
	{ id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron 16GB RAM', category: 'Eletrônicos', price: 4200.00, stock: 8 },
	{ id: '2', name: 'Computador', description: 'Computador Gamer Ryzen 5', category: 'Eletrônicos', price: 3500.00, stock: 5 },
	{ id: '3', name: 'Celular', description: 'Smartphone Samsung Galaxy', category: 'Eletrônicos', price: 1999.99, stock: 12 },
	{ id: '4', name: 'Camiseta', description: 'Camiseta de Algodão', category: 'Roupas', price: 49.90, stock: 20 },
	{ id: '5', name: 'Calça Jeans', description: 'Calça Jeans Masculina', category: 'Roupas', price: 89.90, stock: 15 },
	{ id: '6', name: 'Tênis', description: 'Tênis Esportivo', category: 'Roupas', price: 120.00, stock: 10 },
	{ id: '7', name: 'Chocolate', description: 'Chocolate ao Leite', category: 'Alimentos', price: 5.50, stock: 50 },
	{ id: '8', name: 'Café', description: 'Café em Grãos', category: 'Alimentos', price: 25.00, stock: 30 },
];

export function Products () {
	const [ categorie, setCategorie ] = useState ('all');
	const [ filter, setFilter ] = useState ('none');

	const [ search, setSearch ] = useState ('');

	const filteredProducts = dummyProducts
		.filter (product => product.name.toLowerCase ().includes (search.toLowerCase ()))
		.filter (product => categorie === 'all' || product.category === categorie);

	if (filteredProducts.length === 0 && (filter !== 'none' || categorie !== 'all')) {
		setFilter ('none');
		setCategorie ('all');
	}

	if (filter !== 'none') {
		switch (filter) {
			case 'a-z':
				filteredProducts.sort ((a, b) => a.name.localeCompare (b.name));
				break;
			case 'z-a':
				filteredProducts.sort ((a, b) => b.name.localeCompare (a.name));
				break;
			case '0-1':
				filteredProducts.sort ((a, b) => a.price - b.price);
				break;
			case '1-0':
				filteredProducts.sort ((a, b) => b.price - a.price);
				break;
		}
	}

	return (
		<div className = 'space-y-6'>
			<div className = 'flex flex-col sm:flex-row items-center justify-between gap-4'>
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
							className = 'pl-8 pr-2 py-2 border rounded w-full sm:w-48 h-12 focus:outline-none focus:ring'
						/>
					</div>

					<div className = 'flex items-center sm:justify-between gap-2'>
						<Dropdown>
							<DropdownTrigger asChild>
								<Button variant = 'outline' className = 'w-full sm:w-auto'>
									Categorias
								</Button>
							</DropdownTrigger>

							<DropdownContent align = 'end'>
								<DropdownGroup>
									{
										dummyCategories.map (
											category => (
												<DropdownItem className = { categorie === category ? 'bg-muted' : '' } onClick = { () => setCategorie (categorie === category ? 'all' : category) } key = { category }>
													{ category }
												</DropdownItem>
											)
										)
									}
								</DropdownGroup>
							</DropdownContent>
						</Dropdown>

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
									<DropdownItem className = { filter === '0-1' ? 'bg-muted' : '' } onClick = { () => setFilter (filter === '0-1' ? 'none' : '0-1') }>Preço <ArrowDown className = 'ml-2 h-4 w-4'/> <ArrowUp className = 'ml-2 h-4 w-4'/></DropdownItem>
									<DropdownItem className = { filter === '1-0' ? 'bg-muted' : '' } onClick = { () => setFilter (filter === '1-0' ? 'none' : '1-0') }>Preço <ArrowUp className = 'ml-2 h-4 w-4'/> <ArrowDown className = 'ml-2 h-4 w-4'/></DropdownItem>
								</DropdownGroup>
							</DropdownContent>
						</Dropdown>
					</div>
				</div>

				<div className = 'grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
					{
						filteredProducts.length > 0 ? (
							filteredProducts.map (product => (
								<Product
									key = { product.id }
									name = { product.name }
									desc = { product.description }
									category = { product.category }
									price = { product.price }
									stock = { product.stock }
								/>
							))
						) : (
							<h1 className = 'col-span-full text-center py-8 text-muted-foreground'>
								Nenhum produto encontrado
							</h1>
						)
					}
				</div>
			</Card>
		</div>
	)
}