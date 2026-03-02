import type { CategoryProps } from '@/types';

import { Button, Card } from '../../index';

export function Category ({ name, date }: CategoryProps) {
	const formattedDate = new Intl.DateTimeFormat ('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format (new Date (date));

	return (
		<Card className = 'flex w-full items-center justify-between h-16'>
			<h1 className = 'text-sm'>{ name }<p className = 'text-sm'>Criado em: { formattedDate } </p></h1>
			<Button variant = 'destructive'>Excluir</Button>
		</Card>
	)
}