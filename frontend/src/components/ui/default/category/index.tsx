import type { CategoryProps } from '@/types';

import { Button, Card } from '../../index';

export function Category ({ name }: CategoryProps) {
	return (
		<Card className = 'flex w-full items-center justify-between h-16'>
			<h1 className = 'text-sm'>{ name }</h1>
			<Button variant = 'destructive'>Excluir</Button>
		</Card>
	)
}