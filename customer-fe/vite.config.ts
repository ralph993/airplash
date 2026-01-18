import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import viteReact from '@vitejs/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // react(),
    viteReact(),
    tailwindcss(),
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    VitePWA({ registerType: 'autoUpdate' }),
  ],
});
