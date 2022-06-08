import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api/tardis': {
                target: 'http://127.0.0.1:4321',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api\/tardis/, ''),
            },
        },
    },
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    define: {
        'process.env': {},
    },
});
