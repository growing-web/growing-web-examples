import fs from 'fs';
import html from '@web/rollup-plugin-html';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { transformHtml } from './transform-html.mjs';
import { name } from '../package.json';
import importmap from '../dist/importmap.json';

const dir = 'dist';

export default {
  output: { dir },
  plugins: [
    nodeResolve(),
    html({
      input: {
        name: 'index.html',
        html: transformHtml(fs.readFileSync('./index.html', 'utf8'), {
          importmap: JSON.stringify(importmap),
          entry: importmap.imports[name]
        }, 'production'),
      },
      //publicPath: 'https://google.com/',
      minify: true
    })
  ],
};