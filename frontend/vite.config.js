// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'dist', // This will create a 'build' directory instead of 'dist'
//     chunkSizeWarningLimit: 1000 // Addresses the chunk size warning
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/client',  // Output your frontend build into backend folder
    emptyOutDir: true,
    chunkSizeWarningLimit: 1000,
  },
})
