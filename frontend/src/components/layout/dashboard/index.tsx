import { useAuth } from 'react-oidc-context';
import { Outlet, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import { LayoutDashboardIcon, LogOut } from 'lucide-react';

export function DashboardLayout () {
	const auth = useAuth ();
	const location = useLocation ();

	const username = auth.user?.profile?.preferred_username || auth.user?.profile?.email || 'Usuário';

	return (
		<div className = 'flex min-h-screen bg-background text-foreground'>
			<aside className = 'fixed left-0 top-0 z-20 h-full w-64 border-r px-4 py-6 shadow-sm flex flex-col bg-secondary'>
				{/* Logo */}
				<div className = 'mb-8 flex justify-center items-center gap-2 px-2'>
					<h1 className = 'flex justify-center items-center gap-1 text-2xl font-bold'><LayoutDashboardIcon/> Hypesoft</h1>
					<p className = 'text-sm text-muted-foreground'>Dashboard</p>
				</div>

				{/* NavBar */}
				<div className = 'space-y-2'>
					
				</div>

				{/* Footer */}
				<div className = 'absolute bottom-6 left-0 w-full px-4'>
					<Button
						className="w-full justify-start text-destructive bg-transparent hover:bg-destructive/10 hover:text-destructive focus-visible:ring-2 focus-visible:ring-destructive/50 transition-all duration-150 active:scale-95 shadow-none hover:shadow-md group"
						variant = 'ghost'

						onClick = { () => auth.signoutRedirect () }
					>
						<span className="group-hover:-translate-x-1 transition-transform duration-150 flex items-center">
							<LogOut className="mr-2 h-4 w-4" />
							Sair
						</span>
					</Button>
				</div>
			</aside>

			<main className = 'ml-64 flex-1 flex flex-col min-h-screen'>
				{/* Header */}
				<header className = 'sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 px-6 backdrop-blur shadow-sm'>
					<h2 className = 'text-lg font-semibold'>
						{ location.pathname === '/' ? 'Dashboard' : location.pathname.split('/')[1] }
					</h2>
					
					<div className = 'flex items-center gap-4'>
						<span className = 'text-sm font-medium text-muted-foreground'>Bem-vindo(a), { username }!</span>
						<div className = 'h-9 w-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold'> { username.charAt (0).toUpperCase () } </div>
					</div>
				</header>

				{/* Render Page */}
				<div className = 'p-8'>
					<Outlet />
				</div>
			</main>
		</div>
	)
}