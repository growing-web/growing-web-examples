import fs from 'fs';
import html from '@web/rollup-plugin-html';
import { nodeResolve } from '@rollup/plugin-node-resolve';
//import { terser } from 'rollup-plugin-terser';
import { transformHtml } from './transform-html.mjs';

export default {
  output: { dir: 'dist' },
  plugins: [
    nodeResolve(),
    // terser({
    //   keep_classnames: true
    // }),
    html({
      input: {
        name: 'index.html',
        html: transformHtml(fs.readFileSync('./index.html', 'utf8'), {}, 'production'),
      },
      //publicPath: 'https://google.com/',
      minify: true
    })
  ],
};