import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import shadowDomCssPlugin from 'vite-plugin-shadow-dom-css';
import webWidgetManifestPlugin from './rollup-plugin-web-widget-manifest';

const cwd = process.cwd();
const { name, main, } = JSON.parse(fs.readFileSync(`${cwd}/package.json`, 'utf8'));

const filename = name.replace(/^@[^/]+\//, '').replace(/\//g, '-');
const outDir = `../../dist/${name.replace('@', '')}`;

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir,
    lib: {
      entry: path.resolve(cwd, main),
      formats: ['esm', 'system'],
      fileName: format => `${filename}.[hash].${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    shadowDomCssPlugin({
      include: [/\.(css|less|sass|scss|styl|stylus|pcss|postcss)($|\?)/]
    }),
    createVuePlugin(),
    webWidgetManifestPlugin({
      transform(manifest) {
        manifest.name = name;
        return manifest;
      }
    })
  ],
});
