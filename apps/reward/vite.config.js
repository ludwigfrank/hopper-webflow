import { defineConfig } from "vite"

// vite.config.js
export default defineConfig({
  server: {
    host: "localhost",
    cors: "*",
    hmr: {
      host: "localhost",
      protocol: "ws",
    },
    port: 3001,
  },
  build: {
    minify: true,
    manifest: true,
    rollupOptions: {
      input: "./src/index.ts",
      output: {
        format: "umd",
        entryFileNames: "index.js",
        esModule: false,
        compact: true,
      },
    },
  },
})
