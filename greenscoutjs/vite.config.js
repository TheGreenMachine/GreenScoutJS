import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const useBackend = env.VITE_USE_BACKEND_SERVER === "true";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@api": path.resolve(
          __dirname,
          useBackend ? "src/api/api.js" : "src/api/mockApi.js"
        ),
      },
    },
    server: {
    // List of specific hostnames allowed
    allowedHosts: [
      "engelki.taild523d0.ts.net", 
    ],

    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    },
  };
});
