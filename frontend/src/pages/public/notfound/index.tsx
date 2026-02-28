import { Button, Card } from '@/components/ui';

import { useTheme } from '@/hooks/themes';

import { LayoutDashboardIcon } from 'lucide-react';

export function NotFound () {
	useTheme ();

	return (
		<Card className = 'flex min-h-screen flex-col items-center justify-center bg-background p-4'>
			<div className = 'w-full max-w-sm space-y-8 text-center bg-card p-8 rounded-xl border shadow-sm'>
				<div className = 'flex flex-col items-center gap-2'>
                    <div className = 'flex h-12 w-12 items-center justify-center rounded-lg bg-primary'>
                        <LayoutDashboardIcon className = 'h-6 w-6 text-primary-foreground'/>
                    </div>

                    <h1 className = 'text-2xl font-bold tracking-tight'>HypeSoft</h1>
                    <p className = 'text-sm text-muted-foreground font-bold'>
                        ERRO 404 - Página Não Encontrada
                    </p>
                </div>

				<div className = 'space-y-4'>
					<p className = 'text-sm text-muted-foreground'>
						A página que você está procurando não existe ou foi movida.
					</p>

					<Button
						className = 'w-full'
						size = 'lg'

						onClick = { () => window.location.href = '/' }
					>
						Clique aqui para voltar ao dashboard
					</Button>
				</div>
			</div>

			<footer className = 'mt-8 text-xs text-muted-foreground'>
                &copy; 2026 HypeSoft Inc. Todos os direitos reservados.
            </footer>
		</Card>
	)
}