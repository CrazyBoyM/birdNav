import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { minifyHtml, injectHtml } from "vite-plugin-html";

const htmlPlugin = () => {
  return {
    name: "html-transform",
    transformIndexHtml(html) {
      return html.replace(
        /\/assets\//g,
        "https://cdn.jsdelivr.net/gh/CrazyBoyM/birdNav/dist/assets/"
      );
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), minifyHtml(), injectHtml()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
