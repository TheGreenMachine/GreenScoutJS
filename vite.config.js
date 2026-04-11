import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

function generateThemeLinks() {
  const relativePath = "public/themes";
  const dirPath = path.resolve(__dirname, relativePath);
  const files = fs.readdirSync(dirPath);

  const PRIORITY = ["Green", "Dark", "Light", "Rainbow"];

  let themeNames = [];
  for (let i = 0; i < files.length; ++i) {
    let index = files[i].lastIndexOf(".css");
    if (index === -1) continue;
    themeNames.push(files[i].substring(0, index));
  }

  themeNames.sort((a, b) => {
    const ai = PRIORITY.indexOf(a);
    const bi = PRIORITY.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b);
  });

  return { themeNames };
}

// https://vite.dev/config/
export default defineConfig(() => {
  const { themeNames } = generateThemeLinks();

  return {
    css: {
      transformer: "lightningcss",
    },
    define: {
      __THEME_NAMES__: JSON.stringify(themeNames),
    },
    plugins: [react()],
    base: "/GreenScoutJS/",
    resolve: {
      alias: {
        "@api": path.resolve(__dirname, "src/api/index.js"),
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
