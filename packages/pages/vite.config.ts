import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isUmd = mode === 'umd';

  return {
    plugins: [react()],
    resolve: {
      alias: [
        {
          find: '@jbeat/uikit/dist/styles.css',
          replacement: resolve(__dirname, '../uikit/dist/uikit.css'),
        },
        {
          find: /^@jbeat\/uikit$/,
          replacement: resolve(__dirname, '../uikit/src/index.ts'),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis',
        },
      },
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'JBeatPages',
        formats: [isUmd ? 'umd' : 'es'],
        fileName: (format) => {
          if (format === 'es') return 'esm/index.mjs';
          if (format === 'umd') return 'umd/index.js';
          return `${format}/index.js`;
        },
      },
      emptyOutDir: !isUmd,
      rollupOptions: {
        external: isUmd ? [] : ['react', 'react-dom', 'react/jsx-runtime', '@jbeat/uikit', 'zustand', 'zod'],
        output: isUmd
          ? { assetFileNames: 'pages.[ext]' }
          : {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                '@jbeat/uikit': 'JBeatUIKit',
                zustand: 'Zustand',
                zod: 'Zod',
              },
              assetFileNames: 'pages.[ext]',
            },
      },
      sourcemap: true,
      minify: 'esbuild',
    },
  };
});
