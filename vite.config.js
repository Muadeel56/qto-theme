import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  
  const config = {
    build: {
      lib: {
        entry: 'src/index.js',
        name: 'QtoTheme',
        fileName: (format) => `qto-theme.${format}.js`,
        formats: ['es', 'umd'],
      },
      rollupOptions: {
        external: [
          'react', 
          'react-dom', 
          '@emotion/react', 
          '@emotion/styled',
          'lucide-react'
        ],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            '@emotion/react': 'emotionReact',
            '@emotion/styled': 'emotionStyled',
            'lucide-react': 'lucideReact'
          },
        },
      },
      sourcemap: true,
      minify: isProd ? 'esbuild' : false,
      target: 'es2020',
    },
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: [
            ['@emotion/babel-plugin', { sourceMap: false }],
            ['@babel/plugin-transform-runtime', { useESModules: true }]
          ],
          compact: true,
          minified: true,
        },
      }),
      tailwindcss(),
    ],
  };

  return config;
});
