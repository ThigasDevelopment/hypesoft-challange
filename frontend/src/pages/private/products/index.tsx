import { useState } from 'react';
import { useProducts } from '@/hooks/products';

import { Button, Card, Dialog, DialogTrigger, Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownLabel, DropdownSeparator, DropdownTrigger, Error, Input, Loading, Product } from '@components/ui';
import { CreateProductForm } from '@/components/forms';

import { ArrowDown, ArrowUp, Search, SquarePlus } from 'lucide-react';

const dummyCategories: string[] = [
	'Eletrônicos',
	'Roupas',
	'Alimentos',
	'Teste',
];

export function Products () {
	const [ categorie, setCategorie ] = useState ('all');
	const [ filter, setFilter ] = useState ('none');
	const [ search, setSearch ] = useState ('');

	const { data, isLoading, error } = useProducts ({
		search: search !== '' ? search : undefined,
		categoryId: categorie !== 'all' ? categorie : undefined,
	});

	const products = Array.isArray (data) ? data : (data?.items || [ ]);
	products.sort ((a, b) => a.name.toLowerCase ().localeCompare (b.name.toLowerCase ()));

	if (filter !== 'none') {
		switch (filter) {
			case 'a-z':
				products.sort ((a, b) => a.name.toLowerCase ().localeCompare (b.name.toLowerCase ()));
				break;
			case 'z-a':
				products.sort ((a, b) => b.name.toLowerCase ().localeCompare (a.name.toLowerCase ()));
				break;
			case 's:0-1':
				products.sort ((a, b) => a.stock - b.stock);
				break;
			case 's:1-0':
				products.sort ((a, b) => b.stock - a.stock);
				break;
			case 'p:0-1':
				products.sort ((a, b) => a.price - b.price);
				break;
			case 'p:1-0':
				products.sort ((a, b) => b.price - a.price);
				break;
		}
	}

	return (
		<div className = 'space-y-6'>
			<div className = 'flex flex-col sm:flex-row items-center justify-between gap-4'>
				<h2 className = 'text-2xl font-bold'>
					Produtos
				</h2>

				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant = 'default'
						>
							<SquarePlus className = 'mr-2 h-4 w-4'/>
							Criar Produto
						</Button>
					</DialogTrigger>

					<CreateProductForm/>
				</Dialog>
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
									<DropdownItem className = { filter === 's:0-1' ? 'bg-muted' : '' } onClick = { () => setFilter (filter === 's:0-1' ? 'none' : 's:0-1') }>Estoque <ArrowDown className = 'ml-2 h-4 w-4'/> <ArrowUp className = 'ml-2 h-4 w-4'/></DropdownItem>
									<DropdownItem className = { filter === 's:1-0' ? 'bg-muted' : '' } onClick = { () => setFilter (filter === 's:1-0' ? 'none' : 's:1-0') }>Estoque <ArrowUp className = 'ml-2 h-4 w-4'/> <ArrowDown className = 'ml-2 h-4 w-4'/></DropdownItem>
									<DropdownSeparator/>
									<DropdownItem className = { filter === 'p:0-1' ? 'bg-muted' : '' } onClick = { () => setFilter (filter === 'p:0-1' ? 'none' : 'p:0-1') }>Preço <ArrowDown className = 'ml-2 h-4 w-4'/> <ArrowUp className = 'ml-2 h-4 w-4'/></DropdownItem>
									<DropdownItem className = { filter === 'p:1-0' ? 'bg-muted' : '' } onClick = { () => setFilter (filter === 'p:1-0' ? 'none' : 'p:1-0') }>Preço <ArrowUp className = 'ml-2 h-4 w-4'/> <ArrowDown className = 'ml-2 h-4 w-4'/></DropdownItem>
								</DropdownGroup>
							</DropdownContent>
						</Dropdown>
					</div>
				</div>

				{
					isLoading ? (
						<Loading className = 'h-24'/>
					) : error ? (
						<Error className = 'h-56'/>
					) : (
						<div className = 'grid gap-4 grid-cols-1 md:grid-cols-2'>
							{
								products.length > 0 ? (
									products.map (
										(product: any) => (
											<Product
												key = { product.id }
												name = { product.name }
												desc = { product.description }
												category = { product.categoryId }
												price = { product.price }
												stock = { product.stock }
											/>
										)
									)
								) : (
									<h1 className = 'col-span-full text-center py-8 text-muted-foreground'>
										Nenhum produto encontrado
									</h1>
								)
							}
						</div>
					)
				}
			</Card>
		</div>
	)
}