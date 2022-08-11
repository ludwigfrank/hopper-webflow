import { defineConfig } from 'vite'

// vite.config.js
export default defineConfig({
  server: {
    host: 'localhost',
    cors: '*',
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
    port: 3000,
  },
  build: {
    minify: false,
    manifest: true,
    rollupOptions: {
      input: './src/index.ts',
      output: {
        format: 'esm',
      },
    },
  },
})
