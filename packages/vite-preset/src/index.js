import path from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import shadowDomCssPlugin from 'vite-plugin-shadow-dom-css';

const cwd = process.cwd();
const { name, main, } = JSON.parse(fs.readFileSync(`${cwd}/package.json`, 'utf8'));

const filename = name.replace(/^@[^/]+\//, '').replace(/\//g, '-');
const outDir = `../../dist/${name.replace('@', '')}`;

const createImportmapPlugin = ({
  name,
  cache = () => ({
    imports: {}
  })
}) => {
  return {
    name: 'create-importmap',
    generateBundle({ format }, bundle) {
      const importmap = cache({ format });

      for (const file in bundle) {
        const chunk = bundle[file]
        if (chunk.type === 'chunk' && chunk.isEntry) {
          importmap.imports[name] = chunk.fileName;
        }
      }

      if (format === 'es' || format === 'esm') {
        this.emitFile({
          fileName: 'importmap.json',
          type: 'asset',
          source: JSON.stringify(importmap, null, 2)
        });
      } else if (format === 'system') {
        this.emitFile({
          fileName: 'systemjs-importmap.json',
          type: 'asset',
          source: JSON.stringify(importmap, null, 2)
        });
      }
    }
  };
};

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
    createImportmapPlugin({
      name
    })
  ],
});
