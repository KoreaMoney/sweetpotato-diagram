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
  };

  if (isLibrary) {
    config.build = {
      lib: {
        entry: path.resolve(__dirname, "src/index.js"),
        name: "SweetPD",
        formats: ["es", "cjs"],
        fileName: (format) => `sweetpd.${format}.js`,
      },
      rollupOptions: {
        external: ["react", "react-dom", "react/jsx-runtime"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "jsxRuntime",
          },
        },
      },
      cssCodeSplit: false,
    };
  }

  return config;
});
