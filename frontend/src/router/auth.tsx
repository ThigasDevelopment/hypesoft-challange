import { useAuth } from 'react-oidc-context';
import { Navigate, Outlet } from 'react-router-dom';

import { Error, Loading } from '@/components/ui';

export function AuthGuard () {
	const auth = useAuth ();
	if (auth.isLoading) {
		return (
            <Loading/>
        )
	}

	if (auth.error) {
		return (
			<Error/>
		)
	}

	if (!auth.isAuthenticated) {
		return <Navigate to = '/login' replace />
	}
	return <Outlet/>
}