import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'
import { visualizer } from 'rollup-plugin-visualizer'

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
        './Input': './src/components/Input.jsx',
        './Card': './src/components/Card.jsx',
        './Badge': './src/components/Badge.jsx',
        './Avatar': './src/components/Avatar.jsx',
        './Modal': './src/components/Modal.jsx',
        './ThemeProvider': './src/components/ThemeProvider.jsx',
        './ThemeToggle': './src/components/ThemeToggle.jsx',
        './Tooltip': './src/components/Tooltip.jsx',
        './Dropdown': './src/components/Dropdown.jsx',
        './Alert': './src/components/Alert.jsx',
        './Components': './src/components/index.js',
        './Styles': './src/index.css',
      },
      shared: ['react', 'react-dom'],
      dev: true,
      emitFile: true, // ⬅️ this line is mandatory for `build` to output `remoteEntry.js`
    }),
    visualizer({ open: true })
   ],
   build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
   },
   server: {
    port: 5002,
    cors: true,
   },
   preview: {
    port: 5002,
    cors: true,
   }
})
