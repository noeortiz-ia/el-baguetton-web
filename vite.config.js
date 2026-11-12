import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

/* Sitio de varias páginas: cada carpeta con su index.html es una entrada.
   `/` es la portada; el resto vive en menu/, promociones/, galeria/ y ubicacion/. */
export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1', port: 5173 },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        menu: resolve(__dirname, 'menu/index.html'),
        promociones: resolve(__dirname, 'promociones/index.html'),
        galeria: resolve(__dirname, 'galeria/index.html'),
        ubicacion: resolve(__dirname, 'ubicacion/index.html'),
      },
    },
  },
});
