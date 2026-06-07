import tailwindcss from "@tailwindcss/vite";
import fg from "fast-glob";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

const __dirname = dirname(fileURLToPath(import.meta.url));

const htmlFiles = fg.sync("src/*.html", { cwd: __dirname });
const input = Object.fromEntries(
  htmlFiles.map((file) => [
    file.replace("src/", "").replace(".html", ""),
    resolve(__dirname, file),
  ]),
);

export default defineConfig({
  base: "./",
  root: "src",
  publicDir: resolve(__dirname, "public"),
  plugins: [
    tailwindcss(),
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
      context: {
        siteName: "SonicStop",
        currentYear: new Date().getFullYear(),
      },
    }),
  ],
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    assetsInlineLimit: 0,
    rollupOptions: {
      input,
      output: {
        format: "iife",
        entryFileNames: "js/[name].[hash].js",
        chunkFileNames: "js/[name].[hash].js",
        assetFileNames: ({ name = "" }) => {
          if (name.endsWith(".css")) return "css/[name].[hash][extname]";
          if (/\.(woff2?|ttf|eot)$/.test(name))
            return "assets/fonts/[name][extname]";
          return "assets/images/[name][extname]";
        },
      },
    },
  },
});
