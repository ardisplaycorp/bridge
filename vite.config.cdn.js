import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'ARDisplay',
      formats: ['umd', 'es'],
      fileName: (format) => `ardisplay.${format}.js`
    },
    rollupOptions: {
      // Don't externalize dependencies - bundle everything together
      external: [],
      output: {
        globals: {}
      }
    },
    minify: true,
    sourcemap: true
  }
});