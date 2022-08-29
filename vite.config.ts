import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vitest/config';
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
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      all: true,
    },
    // includeSource: ['src/**/*.ts'],
  },
});

// Add this in production to disable in-source tests
// + define: {
//   +   'import.meta.vitest': 'undefined',
//   + },
