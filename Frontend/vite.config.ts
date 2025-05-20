import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load .env variables
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    optimizeDeps: {
      exclude: ["lucide-react"],
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_PROXY_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
          secure: false,
        },
      },
    },
  };
});
