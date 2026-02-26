import { Outlet } from 'react-router-dom';
import { LayoutDashboardIcon } from 'lucide-react';

export function DashboardLayout () {
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
			</aside>

			<main className = 'ml-64 flex-1 flex flex-col min-h-screen'>
				{/* Render Page */}
				<div className="p-8">
					<Outlet />
				</div>
			</main>
		</div>
	)
}