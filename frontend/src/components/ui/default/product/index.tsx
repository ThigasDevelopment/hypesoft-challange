import { useAuth } from 'react-oidc-context';

import type { ProductProps } from '@/types';

import { Button, Card, Dialog, DialogTrigger } from '@/components/ui';
import { CreateProductForm } from '@/components/forms';

import { useDeleteProduct } from '@/hooks/products';

import { Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';

export function Product ({ id, name, desc, category, price, stock, categoryId }: ProductProps) {
	const deleteMutation = useDeleteProduct ();
	async function handleDeleteProduct () {
		if (!id)
			return toast.error ('ID do produto não encontrado. Por favor, tente novamente.');

		try {
			await deleteMutation.mutateAsync (id);
			toast.success (`Produto ${ name } deletado com sucesso!`);
		} catch (err) {
			toast.error ('Ocorreu um erro ao deletar o produto. Por favor, tente novamente.');
		}
	}

	const auth = useAuth ();
	const isAdmin = (auth.user?.profile as any)?.realm_access?.roles?.includes ('admin');
	
	return (
		<Card className = 'w-full'>
			<div className = 'flex flex-col md:flex-row justify-between gap-4'>
				<div className = 'flex-1'>
					<h3 className = 'text-lg md:text-xl font-semibold'>
						{ name } <span className = 'text-sm md:text-base text-muted-foreground'>(R$ { price.toLocaleString ('pt-BR', { minimumFractionDigits: 2 }) })</span>
					</h3>

					<p className = 'text-sm md:text-base font-medium text-muted-foreground mt-1'>
						{ desc }
					</p>
				</div>

				<div className = 'flex flex-row md:flex-col items-center justify-center gap-2'>
					<Dialog>
						<DialogTrigger asChild>
							<Button className = 'hover:bg-secondary/50 focus-visible:ring-2 focus-visible:ring-secondary/50 transition-all duration-150 active:scale-95 shadow-none hover:shadow-md' variant = 'outline' size = 'sm' disabled = { !isAdmin }>
								<Edit className = 'h-4 w-4'/>
							</Button>
						</DialogTrigger>

						<CreateProductForm type = 'edit' info = {
							{
								id: id || '',

								name,
								description: desc,
								categoryId,
								price,
								stock
							}
						}/>
					</Dialog>

					<Button variant = 'destructive' size = 'sm' onClick = { handleDeleteProduct } disabled = { !isAdmin }>
						<Trash className = 'h-4 w-4'/>
					</Button>
				</div>
			</div>

			<div className = 'mt-4 flex flex-col md:flex-col items-center justify-between text-sm'>
				<span className = 'font-bold text-muted-foreground'>
					{ category }
				</span>

				<span className = { `font-bold ${ stock > 9 ? 'text-success' : stock < 1 ? 'text-danger' : 'text-warning' }` }>
					{ stock > 0 ? `${ stock } em estoque` : 'Indisponível' }
				</span>
			</div>
		</Card>
	)
}