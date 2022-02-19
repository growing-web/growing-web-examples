
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import { currentDistPath, currentPackage } from './utils.mjs';

const { name } = currentPackage;
const filename = name.replace(/^@[^/]+\//, '').replace(/\//g, '-');

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

      if (format === 'es' || format === 'esm' || format === 'iife') {
        this.emitFile({
          fileName: 'importmap.json',
          type: 'asset',
          source: JSON.stringify(importmap, null, 2)
        });
      }
      
      if (format === 'system' || format === 'iife' || 'umd') {
        this.emitFile({
          fileName: 'systemjs-importmap.json',
          type: 'asset',
          source: JSON.stringify(importmap, null, 2)
        });
      }
    }
  };
};

export default {
  input: 'src/index.js',
  output: [{
    format: 'es',
    dir: currentDistPath,
    entryFileNames: `${filename}.[hash].[format].js`
  }, {
    format: 'system',
    dir: currentDistPath,
    entryFileNames: `${filename}.[hash].[format].js`
  }],
  plugins: [
    nodeResolve(),
    terser({
      keep_classnames: true
    }),
    replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify('production')
      }
    }),
    createImportmapPlugin({
      name
    })
  ],
};