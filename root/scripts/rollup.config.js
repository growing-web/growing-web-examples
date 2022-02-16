import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import { name } from '../package.json';
import apps from  '../apps';

const dir = 'dist';
const filename = name.replace(/^@[^/]+\//, '').replace(/\//g, '-');

export default {
  input: 'src/index.js',
  output: { dir },
  output: [{
    dir,
    format: 'es',
    entryFileNames: `${filename}.[hash].[format].js`
  }, {
    dir,
    format: 'system',
    entryFileNames: `${filename}.[hash].[format].js`
  }],
  plugins: [
    nodeResolve(),
    terser({
      keep_classnames: true
    }),
    {
      name: 'create-importmap',
      generateBundle({ format }, bundle) {
        const importmap = {
          imports: {}
        };
        const url = 'https://cdn.examples.com/[name]/[fallbackPath]';
        const root = {
          name
        };

        const template = (string, data) => string.replace(/\[([^\]]+)\]/g, (m, $1) => data[$1]);

        for (const file in bundle) {
          const chunk = bundle[file]
          if (chunk.type === 'chunk' && chunk.isEntry) {
            if (format === 'es' || format === 'esm') {
              root.path = chunk.fileName;
            } else if (format === 'system') {
              root.fallbackPath = chunk.fileName;
            }
          }
        }

        const modules = [root, ...apps];
        modules.forEach((app) => {
          importmap.imports[app.name] = template(url, app);
        });
  
        this.emitFile({
          fileName: 'importmap.json',
          type: 'asset',
          source: JSON.stringify(importmap, null, 2)
        });
      }
    }
  ],
};