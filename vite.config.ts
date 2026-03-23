import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
        manifest: {
          name: 'Liquid Glass Finance',
          short_name: 'LG Finance',
          description: 'High-end financial management and POS system',
          theme_color: '#0e0e0e',
          background_color: '#0e0e0e',
          display: 'standalone',
          icons: [
            {
              src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUx_ee8oaBGvfDrwicUS7WIRklJu2xgi0IOkh2EfTScO2yclbITXfI33KWX3eaYurjC8kitvOxCbkffaD8azNj_F-s14MwFSiyfxSVHZV3EWuKbXYLfI08ShXEKs_H_6E7BlZtQBzkZavh1VdBc9Q8txnobm_ZdPwwqQs0XXHgR8AluUT50OXEbP2LSjeDUUaOtwR_w-H-_8lfsg8BizSlT1qRGpWYilXvmf2jD3bsgVYKs8Khr3wBe8Go7kuofYe9GnhXoZEG-rU',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
