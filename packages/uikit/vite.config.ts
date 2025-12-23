import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const isUmd = mode === 'umd';

  return {
    plugins: [react()],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'JBeatUIKit',
        formats: [isUmd ? 'umd' : 'es'],
        fileName: (format) => {
          if (format === 'es') return 'esm/index.mjs';
          if (format === 'umd') return 'umd/index.js';
          return `${format}/index.js`;
        },
      },
      emptyOutDir: !isUmd,
      rollupOptions: {
        external: isUmd ? [] : ['react', 'react-dom', 'react/jsx-runtime'],
        output: isUmd
          ? {}
          : {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
              },
            },
      },
      sourcemap: true,
      minify: 'esbuild',
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "sass:math";`,
        },
      },
    },
  };
});
