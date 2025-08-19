import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwindcss()],
    /*server: {
        proxy: {
            '/upload': {
                target: 'http://ec2-3-216-249-17.compute-1.amazonaws.com:3000',
                changeOrigin: true,
            },
            '/assets': {
                target: 'http://ec2-3-216-249-17.compute-1.amazonaws.com:3000',
                changeOrigin: true,
            },
        },
    },*/
});
