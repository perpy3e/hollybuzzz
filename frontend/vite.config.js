import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // This will create a 'build' directory instead of 'dist'
    chunkSizeWarningLimit: 1000 // Addresses the chunk size warning
  }
})
