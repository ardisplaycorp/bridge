import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

export default defineConfig({
  build: {
    outDir: './build',
    lib: {
      entry: 'src/main.js',
      name: 'ARDisplay',
      formats: ['umd', 'es'],
      fileName: (format) => `ardisplay.${format}.min.js`
    },
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  },
  plugins: [
    compression()
  ]
});