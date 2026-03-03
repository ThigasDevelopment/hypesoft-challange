import { useAuth } from 'react-oidc-context';
import { toast } from 'sonner';

import { useDeleteCategory } from '@/hooks/categories';
import type { CategoryProps } from '@/types';

import { Button, Card } from '../../index';

export function Category ({ id, name, date }: CategoryProps) {
	const formattedDate = new Intl.DateTimeFormat ('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format (new Date (date));

	const deleteMutation = useDeleteCategory ();
	async function handleDeleteCategory (id?: string) {
		if (!id)
			return toast.error ('ID da categoria não encontrado. Por favor, tente novamente.');

		try {
			await deleteMutation.mutateAsync (id);
			toast.success (`Categoria ${ name } excluída com sucesso!`);
		} catch (err) {
			toast.error ('Ocorreu um erro ao excluir a categoria. Por favor, tente novamente.');
		}
	}

	const auth = useAuth ();
	const isAdmin = (auth.user?.profile as any)?.realm_access?.roles?.includes ('admin');

	return (
		<Card className = 'flex w-full items-center justify-between h-16'>
			<h1 className = 'text-sm'>{ name }<p className = 'text-sm'>Criado em: { formattedDate } </p></h1>
			<Button variant = 'destructive' onClick = { () => handleDeleteCategory (id) } disabled = { !isAdmin }>Excluir</Button>
		</Card>
	)
}