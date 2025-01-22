import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

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
    compression(),
    visualizer()
  ],
  resolve: {
    alias: {
      three: path.resolve(__dirname, 'node_modules/three/build/three.module.min.js'),
    },
  },
});