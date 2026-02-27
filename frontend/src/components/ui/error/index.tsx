import { Button } from '@/components/ui/button';

export function Error () {
	return (
		<div className = 'flex h-screen flex-col items-center justify-center gap-4 bg-background p-4 text-center'>
			<div className = 'bg-destructive/10 p-4 rounded-full'>
				<span className = 'text-destructive text-xl font-bold'>!</span>
			</div>

			<h2 className = 'text-xl font-semibold'>Algo deu errado</h2>

			<p className = 'text-muted-foreground text-sm max-w-md'>
				Não conseguimos conectar ao servidor de autenticação. Tente novamente mais tarde.
			</p>

			<Button
				onClick = { () => window.location.reload () }
				variant = 'outline'
			>
				Recarregar Página
			</Button>
		</div>
	)
}