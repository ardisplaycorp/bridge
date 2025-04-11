import { defineConfig } from "vite";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

export default defineConfig({
  build: {
    outDir: "./build",
    lib: {
      entry: "src/main.js",
      name: "ARDisplay", // This name is used for the UMD build
      // formats: ["umd", "es"], // Removed because we define formats in rollupOptions.output
      fileName: (format) => `ardisplay.${format}.min.js`,
    },
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      output: [
        {
          format: "es",
          // dir: './build', // Optional: You can specify different output directories for each format
          // entryFileNames: 'ardisplay.es.min.js', // Optional: Be more explicit about file names
          preserveModules: false, // Optional: Set to true to keep the original module structure.
          preserveModulesRoot: "src", // Optional: This goes with preserveModules to control the output directory structure.
          manualChunks(id) {
            if (
              id.includes(
                "@google/model-viewer/dist/model-viewer-module.min.js"
              )
            ) {
              return "model-viewer";
            }
          },
        },
        {
          format: "umd",
          name: "ARDisplay", // The global variable name for your UMD library
          // dir: './build',
          // entryFileNames: 'ardisplay.umd.min.js',
          globals: {
            "@google/model-viewer": "ModelViewer",
          },
        },
      ],
      external: (id, importer, isResolved) => {
        // Externalize for UMD, but only if it's a top-level import (not resolved)
        return id === "@google/model-viewer" && !isResolved;
      },
    },
  },
  plugins: [compression(), visualizer()],
});
