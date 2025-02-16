import { defineConfig } from "vite";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

export default defineConfig({
  build: {
    outDir: "./build",
    lib: {
      entry: "src/main.js",
      name: "ARDisplay", // UMD global name
      fileName: (format) => `ardisplay.${format}.min.js`,
    },
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      output: [
        {
          format: "es",
          preserveModules: false,
          preserveModulesRoot: "src",
          manualChunks(id) {
            if (id.includes("/model-viewer.min.js")) {
              return "model-viewer";
            }
          },
        },
        {
          format: "umd",
          name: "ARDisplay",
        },
      ],
      external: (id, importer, isResolved) =>
        id === "/model-viewer.min.js" && !isResolved,
    },
  },
  plugins: [compression(), visualizer()],
});
