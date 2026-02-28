import { useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { Outlet, useLocation, Link } from 'react-router-dom';

import { Button } from '@/components/ui/shadcn/button';
import { Dropdown, DropdownContent, DropdownGroup, DropdownItem, DropdownTrigger } from '@/components/ui/shadcn/dropdown';

import { useTheme } from '@/hooks/themes';

import { LayoutDashboardIcon, LogOut, Menu, MoonIcon, SunIcon, ShoppingBasket, Layers } from 'lucide-react';

export function DashboardLayout () {
	const [ isMenuOpen, setMenuOpen ] = useState (false);

	const auth = useAuth ();
	const username = auth.user?.profile?.preferred_username || auth.user?.profile?.email || 'Usuário';
	
	const location = useLocation ();
	const { currentTheme, toggleCurrentTheme } = useTheme ();

	return (
		<div className = 'flex min-h-screen bg-background text-foreground'>
			{
				isMenuOpen && <div className = 'fixed inset-0 bg-black/50 z-30 sm:hidden' onClick = { () => setMenuOpen (false) } />
			}

			<aside className = { `fixed left-0 top-0 z-40 h-full w-64 border-r-2 px-4 py-6 bg-secondary transform transition-transform duration-200 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0 sm:fixed sm:z-20 sm:h-full sm:w-64 sm:border-r sm:px-4 sm:py-6` }>
				<div className = 'mb-4 flex items-center justify-between sm:justify-center'>
					<div className = 'flex items-center gap-2'>
						<h1 className = 'flex justify-center items-center gap-1 text-2xl font-bold'><LayoutDashboardIcon/> Hypesoft</h1>
						<p className = 'text-sm text-muted-foreground'>Dashboard</p>
					</div>
				</div>

				<div className = 'block w-[calc(100%+2rem)] -mx-4 border-b-2'/>

				<div className = 'flex-1 space-y-2 mt-4'>
					<Link
						to = '/'

						className = { `flex items-center gap-2 rounded-md px-4 py-2 transition-colors ${ location.pathname === '/' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground' }` }
					>
						<LayoutDashboardIcon className = 'h-4 w-4'/>
						Dashboard
					</Link>

					<Link
						to = '/products'

						className = { `flex items-center gap-2 rounded-md px-4 py-2 transition-colors ${ location.pathname === '/products' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground' }` }
					>
						<ShoppingBasket className = 'h-4 w-4'/>
						Produtos
					</Link>

					<Link
						to = '/categories'

						className = { `flex items-center gap-2 rounded-md px-4 py-2 transition-colors ${ location.pathname === '/categories' ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground' }` }
					>
						<Layers className = 'h-4 w-4'/>
						Categorias
					</Link>
				</div>
			</aside>

			<main className = 'flex-1 flex flex-col min-h-screen sm:ml-64 min-w-0'>
				<header className = 'sticky top-0 z-10 flex h-16 flex-wrap items-center justify-between border-b bg-background/95 px-4 sm:px-6 backdrop-blur shadow-sm'>
					<div className = 'flex items-center gap-4'>
						<Button
							className = 'p-2 rounded-md hover:bg-secondary/50 focus-visible:ring-2 focus-visible:ring-secondary/50 transition-all duration-150 active:scale-95 shadow-none hover:shadow-md sm:hidden'
							variant = 'secondary'
							onClick = { () => setMenuOpen (!isMenuOpen) }

						>
							<Menu className = 'h-4 w-4'/>
						</Button>

						<Button
							className = 'p-2 rounded-md hover:bg-secondary/50 focus-visible:ring-2 focus-visible:ring-secondary/50 transition-all duration-150 active:scale-95 shadow-none hover:shadow-md'
							variant = 'secondary'

							onClick = { toggleCurrentTheme }
						>
							{ currentTheme === 'dark' ? <SunIcon className = 'h-4 w-4'/> : <MoonIcon className = 'h-4 w-4'/> }
						</Button>
					</div>
					
					<div className = 'flex items-center gap-4'>
						<Dropdown>
							<DropdownTrigger asChild>
								<Button
									className = 'h-9 w-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold'
									variant = 'secondary'
								>
									{ username.charAt (0).toUpperCase () }
								</Button>
							</DropdownTrigger>

							<DropdownContent align = 'end'>
								<DropdownGroup>
									<DropdownItem className = 'hover:bg-danger/50' onClick = { () => auth.signoutRedirect ({ post_logout_redirect_uri: `${ import.meta.env.VITE_API_BASE_URL }/login` }) }>
										<LogOut className = 'mr-2 h-4 w-4'/>
										Sair
									</DropdownItem>
								</DropdownGroup>
							</DropdownContent>
						</Dropdown>
					</div>
				</header>

				<div className = 'p-4 sm:p-8 min-w-0'>
					<Outlet/>
				</div>
			</main>
		</div>
	)
}