import { useAuth } from 'react-oidc-context'
import { Navigate } from 'react-router-dom';

import { Button } from '@/components/ui/button'

import { LayoutDashboardIcon } from 'lucide-react'

export function Login () {
	const auth = useAuth ();

    if (auth.isLoading) {
        return (
            <div className = 'flex h-screen items-center justify-center bg-background'>
                <div className = 'animate-spin rounded-full h-12 w-12 border-b-2 border-primary'/>
            </div>
        )
    }

    if (auth.isAuthenticated) {
        return <Navigate to = '/' replace/>
    }

    if (auth.error) {
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

	return (
		<div className = 'flex min-h-screen flex-col items-center justify-center bg-background p-4'>
            <div className = 'w-full max-w-sm space-y-8 text-center bg-card p-8 rounded-xl border shadow-sm'>
                <div className = 'flex flex-col items-center gap-2'>
                    <div className = 'flex h-12 w-12 items-center justify-center rounded-lg bg-primary'>
                        <LayoutDashboardIcon className = 'h-6 w-6 text-primary-foreground' />
                    </div>
                    <h1 className = 'text-2xl font-bold tracking-tight'>HypeSoft Admin</h1>
                    <p className = 'text-sm text-muted-foreground'>
                        Sistema de Gestão de Produtos
                    </p>
                </div>

                <div className = 'space-y-4'>
                    <Button 
                        className = 'w-full' 
                        size = 'lg' 
                        onClick = { () => auth.signinRedirect () }
                    >
                        Entrar com Keycloak
                    </Button>
                    
                    <p className = 'text-xs text-muted-foreground px-4'>
                        Ao clicar, você será redirecionado para o servidor de autenticação seguro.
                    </p>
                </div>
            </div>
            
            <footer className = 'mt-8 text-xs text-muted-foreground'>
                &copy; 2026 HypeSoft Inc. Todos os direitos reservados.
            </footer>
        </div>
	)
}