import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/assets': {
        target: 'http://ec2-54-156-15-66.compute-1.amazonaws.com:3000',
        changeOrigin: true,
      },
    },
  },
});
