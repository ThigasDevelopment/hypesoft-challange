import { useAuth } from 'react-oidc-context';
import { Navigate } from 'react-router-dom';

import { Button, Card, Error, Loading } from '@/components/ui';
import { useTheme } from '@/hooks/themes';

import { LayoutDashboardIcon } from 'lucide-react';

export function Login () {
	const auth = useAuth ();
    useTheme ();

    if (auth.isLoading) {
        return (
            <Loading/>
        )
    }

    if (auth.isAuthenticated) {
        return <Navigate to = '/' replace/>
    }

    if (auth.error) {
        return (
            <Error/>
        )
    }

	return (
        <Card className = 'flex min-h-screen flex-col items-center justify-center bg-background p-4'>
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
        </Card>
	)
}