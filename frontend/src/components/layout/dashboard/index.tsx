import { useAuth } from 'react-oidc-context';
import { Outlet, useLocation } from 'react-router-dom';

import { LayoutDashboardIcon } from 'lucide-react';

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
					<p className = 'text-sm text-muted-foreground'>DASHBOARD</p>
				</div>

				{/* NavBar */}
				<div className = 'space-y-2'>
					
				</div>
			</aside>

			<main className = 'ml-64 flex-1 flex flex-col min-h-screen'>
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