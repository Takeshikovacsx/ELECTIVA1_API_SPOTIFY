import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    allowedHosts: [
      '73a0-191-156-38-141.ngrok-free.app'
    ],
    host: true,
    port: 3000,
  }
});
