import { defineConfig } from "vite";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      // This alias helps Vite locate Three.js during development.
      three: path.resolve(__dirname, "node_modules/three"),
    },
    dedupe: ["three", "@google/model-viewer"],
  },
  build: {
    outDir: "./build",
    lib: {
      entry: path.resolve(__dirname, "src/main.js"), // Clear entry point
      name: "ARDisplay", // Global variable name for the UMD build
      fileName: (format) => `ardisplay.${format}.js`, // File naming per format
      formats: ["es", "umd"], // Generate both ES and UMD formats
    },
    minify: "esbuild", // Minify the output
    sourcemap: true, // Generate sourcemaps for debugging
    rollupOptions: {
      // Remove "three" from external so that it gets bundled.
      external: ["@google/model-viewer"],
      output: [
        {
          // ES Module output configuration:
          format: "es",
          // No globals needed since ES modules use import/export.
        },
        {
          // UMD output configuration:
          format: "umd",
          name: "ARDisplay", // Must match library name
          globals: {
            // Only model-viewer is considered external here.
            "@google/model-viewer": "ModelViewerElement",
          },
          exports: "named",
        },
      ],
    },
  },
  plugins: [
    compression({
      // Optional: configure compression (e.g., gzip) as needed.
    }),
    visualizer({
      open: true, // Automatically open the report in the browser after build
      filename: "build/stats.html", // Output report location
    }),
  ],
});
