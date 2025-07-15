import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'qto_theme',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/components/Button.jsx',
        './Card': './src/components/Card.jsx',
      },
      shared: ['react', 'react-dom']
    })
   ],
   build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    outDir: 'dist', 
   },
   server: {
    port: 5001,
    cors: true,
   }
})
