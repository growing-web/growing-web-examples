import { baseBuildDistPath, normalizeBasename, siteConfig, transformFragment, currentPackage } from './utils.mjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import fs from 'fs';
import { rollupPluginHTML } from '@web/rollup-plugin-html';
import { productionFragment } from './html.config.mjs';

const { name } = currentPackage;

export default {
  output: { dir: baseBuildDistPath },
  plugins: [
    nodeResolve(),
    rollupPluginHTML({
      input: {
        name: 'index.html',
        get html() {
          const html = transformFragment(fs.readFileSync('./index.html', 'utf8'), productionFragment());
          return html;
        },
      },
      publicPath: `${siteConfig.publicPath}${normalizeBasename(name)}/`,
      minify: true
    })
  ],
};