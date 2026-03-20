import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path, { basename } from "path";
import { log } from "console";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  // const useBackend = env.VITE_USE_BACKEND_SERVER === "true";
  const useBackend = "true";

  return {
    plugins: [react()],
    base: "/GreenScoutJS/",
    resolve: {
      alias: {
        "@api": path.resolve(
          __dirname,
          useBackend ? "src/api/api.js" : "src/api/mockApi.js",
        ),
      },
    },
    server: {
      // List of specific hostnames allowed
      allowedHosts: ["engelki.taild523d0.ts.net"],

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
