import { useState, useMemo } from 'react';

import { useCategories } from '@/hooks/categories';

import { Button, Card, Category, Dialog, DialogTrigger, Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownLabel, DropdownSeparator, DropdownTrigger, Error, Loading, Input } from '@components/ui';

import { ArrowDown, ArrowUp, Search, SquarePlus } from 'lucide-react';
import { CreateCategoryForm } from '@/components/forms';

interface StateProps {
	filter: 'none' | 'a-z' | 'z-a' | 'recent-asc' | 'recent-desc';
	search: string;
};

export function Categories () {
	const { data, isLoading, error } = useCategories ();

	const [ stateProps, setStateProps ] = useState<StateProps> ({
		filter: 'none',
		search: '',
	});

	function handleSwitchFilter (filter: StateProps['filter']) {
		if (stateProps.filter === filter)
			return setStateProps ({ ...stateProps, filter: 'none' });

		setStateProps ({ ...stateProps, filter });
	}

	const allCategories = useMemo (
		() => {
			const list = data ? [ ...data ] : [ ];

			let result = list.filter (category => category.name.toLowerCase ().includes (stateProps.search.toLowerCase ()))
				.sort ((a, b) => a.createdAt.localeCompare (b.createdAt));

			switch (stateProps.filter) {
				case 'a-z':
					result.sort ((a, b) => a.name.toLowerCase ().localeCompare (b.name.toLowerCase ()));
				break;

				case 'z-a':
					result.sort ((a, b) => b.name.toLowerCase ().localeCompare (a.name.toLowerCase ()));
				break;

				case 'recent-asc':
					result.sort ((a, b) => a.createdAt.localeCompare (b.createdAt));
				break;

				case 'recent-desc':
					result.sort ((a, b) => b.createdAt.localeCompare (a.createdAt));
				break;
			}

			return result;
		}, [ data, stateProps.filter, stateProps.search ]
	);

	return (
		<div className = 'space-y-6'>
			<div className = 'flex flex-col sm:flex-row items-center justify-between gap-4'>
				<h2 className = 'text-2xl font-bold'>
					Categorias
				</h2>

				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant = 'default'
						>
							<SquarePlus className = 'mr-2 h-4 w-4'/>
							Criar Categoria
						</Button>
					</DialogTrigger>

					<CreateCategoryForm/>
				</Dialog>
			</div>

			<Card>
				<div className = 'flex items-center sm:justify-between gap-2 mb-4'>
					<div className = 'relative'>
						<Search className = 'absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground'/>

						<Input
							placeholder = 'Buscar categorias...'
							value = { stateProps.search }
							onChange = { (e) => setStateProps ({ ...stateProps, search: e.target.value }) }
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
								<DropdownItem className = { stateProps.filter === 'a-z' ? 'bg-muted' : '' } onClick = { () => handleSwitchFilter ('a-z') }>Nome (A-Z)</DropdownItem>
								<DropdownItem className = { stateProps.filter === 'z-a' ? 'bg-muted' : '' } onClick = { () => handleSwitchFilter ('z-a') }>Nome (Z-A)</DropdownItem>
								<DropdownSeparator/>
								<DropdownItem className = { stateProps.filter === 'recent-asc' ? 'bg-muted' : '' } onClick = { () => handleSwitchFilter ('recent-asc') }>Recentes <ArrowDown className = 'ml-2 h-4 w-4'/> <ArrowUp className = 'ml-2 h-4 w-4'/></DropdownItem>
								<DropdownItem className = { stateProps.filter === 'recent-desc' ? 'bg-muted' : '' } onClick = { () => handleSwitchFilter ('recent-desc') }>Recentes <ArrowUp className = 'ml-2 h-4 w-4'/> <ArrowDown className = 'ml-2 h-4 w-4'/></DropdownItem>
							</DropdownGroup>
						</DropdownContent>
					</Dropdown>
				</div>

				{
					isLoading ? (
						<Loading className = 'h-24'/>
					) : error ? (
						<Error className = 'h-56'/>
					) : (
						<div className = 'flex flex-col gap-4 sm:items-center sm:justify-center mb-2'>
							{
								allCategories.length > 0 ? (
									allCategories.map (
										category => (
											<Category key = { category.id } name = { category.name } date = { category.createdAt }/>
										)
									)
								) : (
									<p className = 'text-center text-muted-foreground'>
										Nenhuma categoria encontrada
									</p>
								)
							}
						</div>
					)
				}
			</Card>
		</div>
	)
}