import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig (
  ({ mode }) => {
    const env = loadEnv (mode, '../', '');

    return {
      define: {
        'import.meta.env.BASE_URL': JSON.stringify (env.BASE_URL),
        'import.meta.env.BACKEND_PORT': JSON.stringify (env.BACKEND_PORT),
        'import.meta.env.FRONTEND_PORT': JSON.stringify (env.FRONTEND_PORT),
        'import.meta.env.KEYCLOAK_URL': JSON.stringify (env.KEYCLOAK_URL),
        'import.meta.env.KEYCLOAK_REALM': JSON.stringify (env.KEYCLOAK_REALM),
        'import.meta.env.KEYCLOAK_CLIENT_ID': JSON.stringify (env.KEYCLOAK_CLIENT_ID),
      },
      plugins: [
        react(),
        tailwindcss(),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
          '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
          '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url))
        }
      }
    };
  }
);
