import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const isLibrary = mode === "library";

  const config = {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./src/test/setup.js"],
      css: true,
      include: ["src/**/*.{test,spec}.{js,jsx,ts,tsx}"],
      exclude: ["node_modules/**", "dist/**", "src/test/e2e/**", "**/*.{config,setup}.{js,ts}"],
      coverage: {
        reporter: ["text", "json", "html"],
        exclude: ["node_modules/", "dist/", "src/test/e2e/", "**/*.{config,setup}.{js,ts}"],
      },
    },
  };

  if (isLibrary) {
    config.build = {
      lib: {
        entry: path.resolve(__dirname, "src/index.js"),
        name: "sweet-diagram",
        formats: ["es", "cjs"],
        fileName: (format) => `sweet-diagram.${format}.js`,
      },
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "jsxRuntime",
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") return "style.css";
            return assetInfo.name;
          },
        },
      },
      cssCodeSplit: false,
    };
  }

  return config;
});
