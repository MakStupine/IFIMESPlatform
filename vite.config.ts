import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    themePlugin(),
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, "client/static/_redirects"),
          dest: ".", // copy directly into dist/
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    hmr: {
      overlay: false,
    },
  },
});
