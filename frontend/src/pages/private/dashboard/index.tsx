import { Button } from '@/components/ui/shadcn/button';
import { Card } from '@/components/ui/shadcn/card';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { RefreshCcwIcon, ShoppingBasket, DollarSign, Layers, TriangleAlert } from 'lucide-react';

export function Dashboard() {
	const dummyLowStockData = [
		{ name: 'Produto A', category: 'Eletrônicos', stock: 5 },
		{ name: 'Produto B', category: 'Roupas', stock: 3 },
		{ name: 'Produto C', category: 'Alimentos', stock: 2 },

		{ name: 'Produto A', category: 'Eletrônicos', stock: 5 },
	];

	const dummyCategoryData = [
		{ name: 'Eletrônicos', amount: 400 },
		{ name: 'Roupas', amount: 300 },
		{ name: 'Alimentos', amount: 200 },
		{ name: 'Móveis', amount: 100 },
	];

  	return (
		<div className = 'space-y-6'>
			<div className = 'flex items-center justify-between'>
				<h2 className = 'text-2xl font-bold'>
					Visão Geral
				</h2>

				<Button
					variant = 'default'
				>
					<RefreshCcwIcon className = 'mr-2 h-4 w-4'/>
					Atualizar Dados
				</Button>
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
								1.234.567
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
								R$ 1.234.567,00
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

						<div className = 'px-2 pt-4 space-y-4'>
							{
								dummyLowStockData.length === 0 ? (
									<div className = 'flex items-center justify-center gap-2 py-10'>
										<p className = 'flex justify-center items-center h-32 text-lg text-muted-foreground'>
											Todos os produtos estão com estoque adequado.
										</p>
									</div>
								) : (
									dummyLowStockData.map (
										(item, index) => (
											<div key = { index } className = 'flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0'>
												<div>
													<p className = 'font-medium text-sm'>
														{ item.name }
													</p>

													<p className = 'text-xs text-muted-foreground'>
														{ item.category }
													</p>
												</div>

												<div className = 'flex items-center gap-2 bg-destructive/10 text-destructive px-2 py-1 rounded-md'>
													<span className = 'text-xs font-bold'> { item.stock } un</span>
												</div>
											</div>
										)
									)
								)
							}
						</div>
					</Card>
					
					<Card>
						<div className = 'flex items-center justify-between px-2'>
							<h1 className = 'text-lg font-bold'>
								Produtos por categoria
							</h1>

							<Layers className = 'h-6 w-6 text-muted-foreground'/>
						</div>

						<div className = 'px-2 pt-4 flex-1 h-75 w-full min-h-75'>
							<ResponsiveContainer width = '100%' height = '100%'>
								<BarChart data = { dummyCategoryData }>
									<CartesianGrid strokeDasharray = '3 3' stroke = 'var(--border-color)'/>

									<XAxis dataKey = 'name' tick = { { fill: 'var(--text-color)' } }/>
									<YAxis tick = { { fill: 'var(--text-color)' } }/>

									<Tooltip
										contentStyle = {
											{ background: 'var(--bg-color)', borderRadius: '10px' }
										}

										itemStyle = {
											{ color: 'var(--primary-color)' }
										}
									/>
									
									<Bar dataKey = 'amount' name = 'Quantidade' barSize = { 15 } fill = 'var(--primary-color)' activeBar = { { fill: 'var(--primary-hover)' } } />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</Card>
				</div>
			</div>
		</div>
  	)
}