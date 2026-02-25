import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig ({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL ('./src', import.meta.url)),
      '@components': fileURLToPath(new URL ('./src/components', import.meta.url)),
      '@hooks': fileURLToPath(new URL ('./src/hooks', import.meta.url))
    }
  }
});
