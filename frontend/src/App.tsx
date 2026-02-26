import { AppRouter } from './router';

import { AuthProvider } from 'react-oidc-context';

const OICD = {
    authority: `${ import.meta.env.VITE_KEYCLOAK_URL }/realms/${ import.meta.env.VITE_KEYCLOAK_REALM }`,
    client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    redirect_uri: window.location.origin,

    onSigninCallback: () => {
        window.history.replaceState ({ }, document.title, window.location.pathname);
    },
};

export function App () {
	return (
        <AuthProvider { ...OICD }>
            <AppRouter />
        </AuthProvider>
    );
}