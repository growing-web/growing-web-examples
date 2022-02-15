import path from "path";
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import { createRequire } from "module";

import shadowDomCssPlugin from 'vite-plugin-shadow-dom-css';

const require = createRequire(import.meta.url);
const cwd = process.cwd();
const { source, main, module, system } = require(`${cwd}/package.json`);

const outDir = "dist/";
const formats = {
  cjs: main,
  esm: module,
  system,
};

// https://vitejs.dev/config/
export default defineConfig({
  base: 'http://localhost:3000/',
  build: {
    outDir,
    lib: {
      entry: path.resolve(cwd, source),
      formats: Object.keys(formats),
      fileName: (format) => {
        const normalize = formats[format].replace(/\.\//, "");
        return normalize.startsWith(outDir)
          ? normalize.replace(outDir, "")
          : normalize;
      },
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [
    shadowDomCssPlugin({
      include: [/\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\?)/]
    }),
    createVuePlugin(),
  ],
});
