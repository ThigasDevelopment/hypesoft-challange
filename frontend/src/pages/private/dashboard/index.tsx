import { useMemo } from 'react';

import { useCategoriesName } from '@/hooks/categories';
import { useProducts, useProductsLowStock } from '@/hooks/products';

import { Card, ScrollArea } from '@/components/ui';
import { ChartDefault } from '@/components/charts';

import { ShoppingBasket, DollarSign, Layers, TriangleAlert } from 'lucide-react';

export function Dashboard() {
	const productsQuery = useProducts ();
	const lowStockProductsQuery = useProductsLowStock ();
	
	const categoriesQuery = useCategoriesName ();
	
	const [ totalProducts, totalStockPrice, lowStockList ] = useMemo (
		() => {
			const totalProducts = productsQuery.data ? productsQuery.data.length : 0;
			const totalStockPrice = productsQuery.data ? productsQuery.data.reduce ((acc, product) => acc + (product.price * product.stock), 0) : 0;
			
			const lowStockList = lowStockProductsQuery.data || [];
			if (lowStockList.length > 0) {
				lowStockList.sort (
					(a, b) => a.name.toLowerCase().localeCompare (b.name.toLowerCase() || '')
				)
			}

			return [ totalProducts, totalStockPrice, lowStockList ];
		}, [ productsQuery.data, lowStockProductsQuery.data ]
	)

  	return (
		<div className = 'space-y-6'>
			<div className = 'flex items-center justify-between'>
				<h2 className = 'text-2xl font-bold'>
					Visão Geral
				</h2>
			</div>

			<div className = 'flex flex-col gap-4'>
				<div className = 'grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
					<Card>
						<div className = 'flex items-center justify-between px-2'>
							<h1 className = 'text-lg font-bold'>
								Total de produtos
							</h1>

							<ShoppingBasket className = 'h-6 w-6 text-muted-foreground'/>
						</div>

						<div className = 'px-2 pt-4'>
							<p className = 'text-2xl font-bold'>
								{ totalProducts.toLocaleString () }
							</p>

							<p className = 'text-sm text-muted-foreground'>
								Itens cadastrados no sistema
							</p>
						</div>
					</Card>

					<Card>
						<div className = 'flex items-center justify-between px-2'>
							<h1 className = 'text-lg font-bold'>
								Valor total do estoque
							</h1>

							<DollarSign className = 'h-6 w-6 text-muted-foreground'/>
						</div>

						<div className = 'px-2 pt-4'>
							<p className = 'text-2xl font-bold'>
								R$ { totalStockPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }
							</p>

							<p className = 'text-sm text-muted-foreground'>
								Valor total em mercadoria
							</p>
						</div>
					</Card>
				</div>

				<div className = 'grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
					<Card>
						<div className = 'flex items-center justify-between px-2'>
                            <h1 className = 'text-lg font-bold'>
                                Produtos com estoque baixo
                            </h1>

                            <TriangleAlert className = 'h-6 w-6 text-muted-foreground'/>
                        </div>

						<ScrollArea className = 'h-72 px-2 mt-4 space-y-4'>
							{
								lowStockList.length === 0 ? (
									<div className = 'flex items-center justify-center gap-2 py-10'>
                                        <p className = 'flex justify-center items-center h-32 text-lg text-muted-foreground'>
                                            Todos os produtos estão com estoque adequado.
                                        </p>
                                    </div>
								) : (
									lowStockList.map (
										(item, index) => (
											<div key = { index } className = 'flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0'>
												<div className = 'justify-end gap-2'>
                                                    <p className = 'font-medium text-sm'>
                                                        { item.name }
                                                    </p>

                                                    <p className = 'text-xs text-muted-foreground'>
                                                        { categoriesQuery.byId[item.categoryId] || 'Sem categoria' }
                                                    </p>
                                                </div>

												<div className = 'flex items-center gap-2 bg-destructive/10 text-destructive px-2 py-1 rounded-md'>
                                                    <span className = 'text-xs font-bold'>
														{ item.stock } un
													</span>
                                                </div>
											</div>
										)
									)
								)
							}
						</ScrollArea>
					</Card>
					
					<Card>
						<div className = 'flex items-center justify-between px-2'>
							<h1 className = 'text-lg font-bold'>
								Produtos por categoria
							</h1>

							<Layers className = 'h-6 w-6 text-muted-foreground'/>
						</div>

						<ChartDefault
							list = { [ 1, 2, 3, 4, 5, 6, 7 ] }
							type = 'line'

							fields = {
								{
									data: {
										key: 'name',
									},

									item: {
										key: 'amount',
										name: 'Quantidade',
									}
								}
							}
						/>
					</Card>
				</div>
			</div>
		</div>
  	)
}