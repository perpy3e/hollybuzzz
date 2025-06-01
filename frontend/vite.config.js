import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/public',  // output build here relative to frontend folder
    emptyOutDir: true,           // clean old builds
    chunkSizeWarningLimit: 1000,
  }
});
