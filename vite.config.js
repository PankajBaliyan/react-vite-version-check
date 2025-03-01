import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Allow external connections (including Replit preview URL)
    host: '0.0.0.0',
    port: 3000, // You can use the default port, or choose a specific one
    strictPort: true,
    allowedHosts: ['.replit.dev'], // Add this line to allow Replit
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
      },
    },
  },
})
