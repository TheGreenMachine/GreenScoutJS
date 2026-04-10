import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

function generateThemeLinks() {
  const relativePath = "public/themes";
  const dirPath = path.resolve(__dirname, relativePath);
  const files = fs.readdirSync(dirPath);

  let themeLinks = [];
  let themeNames = [];
  for (let i = 0; i < files.length; ++i) {
    let index = files[i].lastIndexOf(".css");
    if (index === -1) continue;
    themeNames.push(files[i].substring(0, index));

    const thePath = path.resolve(relativePath, files[i]);
    const link = `<link href="${thePath}" rel="stylesheet" id="themeLink">`;
    themeLinks.push(link);
  }
  return { themeLinks, themeNames };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const useBackend = env.VITE_BACKEND_URL !== ""; // Backend URL is defined in .env.production

  const { themeLinks, themeNames } = generateThemeLinks();

  return {
    css: {
      transformer: "lightningcss",
    },
    define: {
      __THEME_NAMES__: JSON.stringify(themeNames),
    },
    plugins: [
      react(),
      {
        name: "inject-html",
        transformIndexHtml(html) {
          return html.replace("<THEMEANCHOR/>", themeLinks.join("\n"));
        },
      },
    ],
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
