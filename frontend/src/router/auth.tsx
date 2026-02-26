import { useAuth } from 'react-oidc-context';

import { Navigate, Outlet } from 'react-router-dom';

export function AuthGuard () {
	const auth = useAuth ();

	if (auth.isLoading) {
		return (
            <div className = 'flex h-screen items-center justify-center'>
                <div className = 'animate-spin rounded-full h-8 w-8 border-b-2 border-primary'/>
            </div>
        )
	}

	if (!auth.isAuthenticated) {
		return <Navigate to = '/login' replace />
	}
	return <Outlet />
}