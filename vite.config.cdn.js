import { defineConfig } from "vite";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

export default defineConfig({
  // Instruct Vite to treat these packages as external and not bundle them
  // This helps prevent duplication if the consuming app also uses them.
  resolve: {
    dedupe: ["three", "@google/model-viewer"],
  },
  build: {
    outDir: "./build",
    lib: {
      entry: path.resolve(__dirname, "src/main.js"), // Use path.resolve for clarity
      name: "ARDisplay", // Global variable name for UMD build
      fileName: (format) => `ardisplay.${format}.js`, // Standard practice is often non-minified name here
      formats: ["es", "umd"], // Explicitly define formats here
    },
    minify: "esbuild", // Minify the output
    sourcemap: true, // Generate sourcemaps for easier debugging
    rollupOptions: {
      // **Crucial:** Declare peer dependencies as external
      // so they are not bundled into your library.
      external: ["three", "@google/model-viewer"],

      output: [
        // Configuration for the ES Module output
        {
          format: "es",
          // ES modules don't use globals, imports handle dependencies
          // manualChunks can be useful for code splitting *within* your library,
          // but less relevant when externalizing main dependencies. Removing for simplicity.
        },
        // Configuration for the UMD output
        {
          format: "umd",
          name: "ARDisplay", // Must match build.lib.name
          // **Crucial:** Specify global variable names for external dependencies
          // This tells the UMD wrapper what global variables to expect.
          globals: {
            three: "THREE", // 'three' package typically exports to global THREE
            "@google/model-viewer": "ModelViewerElement", // <model-viewer> component registers itself, but accessing its class might use this. Check model-viewer docs if a specific global is needed/expected for UMD usage patterns. Often, for UMD custom elements, you just need the script loaded. Let's assume ModelViewerElement for potential programmatic access. If not needed, you could potentially remove it, but it's safer to map it.
          },
          // Ensure exports are named for UMD compatibility if your entry point uses named exports
          exports: "named",
        },
      ],
    },
  },
  plugins: [
    compression({
      // Optional: configure compression further if needed
      // e.g., algorithm: 'gzip', ext: '.gz',
    }),
    visualizer({
      open: true, // Automatically open report in browser after build
      filename: "build/stats.html", // Output report to build directory
    }),
  ],
});
