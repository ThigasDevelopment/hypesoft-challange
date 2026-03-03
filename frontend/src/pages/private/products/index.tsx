import { useState, useMemo } from 'react';
import { useAuth } from 'react-oidc-context';

import { useProducts } from '@/hooks/products';
import { useCategoriesName } from '@/hooks/categories';

import { Button, Card, Dialog, DialogTrigger, Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownLabel, DropdownSeparator, DropdownTrigger, Error, Input, Loading, Product } from '@components/ui';
import { CreateProductForm } from '@/components/forms';

import { ArrowDown, ArrowUp, Search, SquarePlus } from 'lucide-react';

interface StateProps {
	filter: 'none' | 'a-z' | 'z-a' | 's:0-1' | 's:1-0' | 'p:0-1' | 'p:1-0';
	search: string;

	categorie: 'all' | string;
};

export function Products () {
	const productQuery = useProducts ();
	const categoriesQuery = useCategoriesName ();

	const [ stateProps, setStateProps ] = useState<StateProps> ({
		filter: 'none',
		search: '',

		categorie: 'all',
	});

	function handleSwitchFilter (filter: StateProps['filter']) {
		if (stateProps.filter === filter)
			return setStateProps ({ ...stateProps, filter: 'none' });

		setStateProps ({ ...stateProps, filter });
	}

	const [ allCategories, allProducts, categoriesById ] = useMemo (
		() => {
			const [ categories, categoriesById, products ] = [ categoriesQuery.data, categoriesQuery.byId, productQuery.data ? [ ...productQuery.data ] : [ ] ];

			let allProducts = products.filter (product => product.name.toLowerCase ().includes (stateProps.search.toLowerCase ()))
				.filter (product => stateProps.categorie === 'all' || categoriesById[product.categoryId] === stateProps.categorie);

			switch (stateProps.filter) {
				case 'a-z':
					allProducts.sort ((a, b) => a.name.toLowerCase ().localeCompare (b.name.toLowerCase ()));
				break;

				case 'z-a':
					allProducts.sort ((a, b) => b.name.toLowerCase ().localeCompare (a.name.toLowerCase ()));
				break;

				case 's:0-1':
					allProducts.sort ((a, b) => a.stock - b.stock);
				break;

				case 's:1-0':
					allProducts.sort ((a, b) => b.stock - a.stock);
				break;

				case 'p:0-1':
					allProducts.sort ((a, b) => a.price - b.price);
				break;

				case 'p:1-0':
					allProducts.sort ((a, b) => b.price - a.price);
				break;
			}

			return [ categories, allProducts, categoriesById ];
		}, [ stateProps.filter, stateProps.search ]
	);

	const auth = useAuth ();

	const isAdmin = (auth.user?.profile as any)?.realm_access?.roles?.includes ('admin');

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

							disabled = { !isAdmin || allCategories.length < 1 } 
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
							value = { stateProps.search }
							onChange = { (e) => setStateProps ({ ...stateProps, search: e.target.value }) }
							className = 'pl-8 pr-2 py-2 border rounded w-full sm:w-48 h-12 focus:outline-none focus:ring'
						/>
					</div>

					<div className = 'flex items-center sm:justify-between gap-2'>
						{
							allCategories && allCategories.length > 0 && (
								<Dropdown>
									<DropdownTrigger asChild>
										<Button variant = 'outline' className = 'w-full sm:w-auto'>
											Categorias
										</Button>
									</DropdownTrigger>

									<DropdownContent align = 'end'>
										<DropdownGroup>
											{
												allCategories.map (
													(categorie: string) => (
														<DropdownItem key = { categorie } className = { stateProps.categorie === categorie ? 'bg-muted' : '' } onClick = { () => setStateProps ({ ...stateProps, categorie: categorie === stateProps.categorie ? 'all' : categorie }) }>
															{ categorie }
														</DropdownItem>
													)
												)
											}
										</DropdownGroup>
									</DropdownContent>
								</Dropdown>
							)
						}

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
									<DropdownItem className = { stateProps.filter === 'a-z' ? 'bg-muted' : '' } onClick = { () => handleSwitchFilter ('a-z') }>Nome (A-Z)</DropdownItem>
									<DropdownItem className = { stateProps.filter === 'z-a' ? 'bg-muted' : '' } onClick = { () => handleSwitchFilter ('z-a') }>Nome (Z-A)</DropdownItem>
									<DropdownSeparator/>
									<DropdownItem className = { stateProps.filter === 's:0-1' ? 'bg-muted' : '' } onClick = { () => handleSwitchFilter ('s:0-1') }>Estoque <ArrowDown className = 'ml-2 h-4 w-4'/> <ArrowUp className = 'ml-2 h-4 w-4'/></DropdownItem>
									<DropdownItem className = { stateProps.filter === 's:1-0' ? 'bg-muted' : '' } onClick = { () => handleSwitchFilter ('s:1-0') }>Estoque <ArrowUp className = 'ml-2 h-4 w-4'/> <ArrowDown className = 'ml-2 h-4 w-4'/></DropdownItem>
									<DropdownSeparator/>
									<DropdownItem className = { stateProps.filter === 'p:0-1' ? 'bg-muted' : '' } onClick = { () => handleSwitchFilter ('p:0-1') }>Preço <ArrowDown className = 'ml-2 h-4 w-4'/> <ArrowUp className = 'ml-2 h-4 w-4'/></DropdownItem>
									<DropdownItem className = { stateProps.filter === 'p:1-0' ? 'bg-muted' : '' } onClick = { () => handleSwitchFilter ('p:1-0') }>Preço <ArrowUp className = 'ml-2 h-4 w-4'/> <ArrowDown className = 'ml-2 h-4 w-4'/></DropdownItem>
								</DropdownGroup>
							</DropdownContent>
						</Dropdown>
					</div>
				</div>

				{
					productQuery.isLoading ? (
						<Loading className = 'h-24'/>
					) : productQuery.error ? (
						<Error className = 'h-56'/>
					) : (
						<div className = 'grid grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2'>
							{
								allProducts.length > 0 ? (
									allProducts.map (
										(product) => (
											<Product
												key = { product.id }

												name = { product.name }
												desc = { product.description }

												price = { product.price }
												stock = { product.stock }

												category = { categoriesById[product.categoryId] || 'Sem categoria' }
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