import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { createHtmlPlugin } from "vite-plugin-html";
import sitemap from "vite-plugin-sitemap";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  const isLibrary = mode === "library";
  const siteUrl = "https://sweetpotato-diagram.vercel.app";

  const config = {
    plugins: [
      react(),
      tailwindcss(),
      // HTML 최적화 플러그인 (라이브러리 모드가 아닐 때만 사용)
      !isLibrary &&
        createHtmlPlugin({
          inject: {
            data: {
              title: "Sweet Diagram - Modern React Diagram Editor",
              description:
                "A modern and intuitive diagram editor component for React applications with auto-connect features, vertical text support, and animation effects",
              keywords:
                "react,diagram,editor,visualization,sweet-diagram,javascript,auto-connect,animation,vertical-text,drag-drop",
              author: "KimDowon",
              siteUrl: siteUrl,
              twitterHandle: "@sweetdiagram",
              ogImage: `${siteUrl}/main.png`,
            },
          },
        }),
      // 사이트맵 생성 플러그인 (라이브러리 모드가 아닐 때만 사용)
      !isLibrary &&
        sitemap({
          hostname: siteUrl,
          urls: ["/", "/components", "/documentation", "/examples", "/hooks"],
          lastmod: new Date().toISOString(),
          changefreq: "weekly",
          priority: {
            "/": 1.0,
            "/components": 0.8,
            "/documentation": 0.8,
            "/examples": 0.7,
            "/hooks": 0.6,
          },
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // SEO 관련 최적화
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
            three: ["three", "@react-three/fiber", "@react-three/drei"],
          },
        },
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
    config.publicDir = false; // 라이브러리 빌드 시 public 폴더 복사 비활성화
    config.build = {
      lib: {
        entry: path.resolve(__dirname, "src/index.js"),
        name: "sweet-diagram",
        formats: ["es", "cjs"],
        fileName: (format) => `sweet-diagram.${format}.js`,
      },
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "three",
          "@react-three/fiber",
          "@react-three/drei",
          "lucide-react",
          "zustand",
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "jsxRuntime",
            three: "THREE",
            "@react-three/fiber": "ReactThreeFiber",
            "@react-three/drei": "ReactThreeDrei",
            "lucide-react": "LucideReact",
            "zustand": "Zustand",
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === "style.css") return "sweet-diagram.css";
            return assetInfo.name;
          },
        },
        treeshake: {
          moduleSideEffects: false,
        },
      },
      cssCodeSplit: false,
      // 번들 크기 최적화
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log", "console.warn", "console.error"],
          dead_code: true,
          unused: true,
          reduce_vars: true,
          collapse_vars: true,
          booleans: true,
          loops: true,
          if_return: true,
          join_vars: true,
          pure_getters: true,
        },
        mangle: {
          safari10: true,
        },
        format: {
          comments: false,
        },
      },
    };
  }

  return config;
});
