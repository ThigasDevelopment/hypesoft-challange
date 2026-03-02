import axios from 'axios';

export const api = axios.create ({
	baseURL: `${ import.meta.env.BASE_URL }:${ import.meta.env.BACKEND_PORT }/api`,

	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use (
	(config) => {
		const storage = sessionStorage.getItem (`oidc.user:${ import.meta.env.KEYCLOAK_URL }/realms/${ import.meta.env.KEYCLOAK_REALM }:${ import.meta.env.KEYCLOAK_CLIENT_ID }`);
		if (storage) {
			const user = JSON.parse (storage);
			config.headers.Authorization = `Bearer ${ user.access_token }`;
		}

		return config;
	},

	(error) => {
		return Promise.reject (error);
	}
);