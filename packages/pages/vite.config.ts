import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@jbeat/uikit': resolve(__dirname, '../uikit/src/index.ts'),
      '@jbeat/uikit/dist/styles.css': resolve(__dirname, '../uikit/dist/uikit.css'),
    },
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
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') return 'es/index.mjs';
        if (format === 'cjs') return 'cjs/index.cjs';
        return `${format}/index.js`;
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@jbeat/uikit', '@jbeat/uikit/dist/styles.css', 'zustand', 'zod'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: 'pages.[ext]',
      },
    },
    sourcemap: true,
    minify: 'esbuild',
  },
});
