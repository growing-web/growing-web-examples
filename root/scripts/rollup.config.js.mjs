
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import replace from '@rollup/plugin-replace';
import { currentDistPath, currentPackage } from './utils.mjs';

const { name } = currentPackage;
const filename = name.replace(/^@[^/]+\//, '').replace(/\//g, '-');

const manifestPlugin = () => {
  // Like Web Widget Manifest
  const manifest = {
    name
  };
  return {
    name: 'create-manifest',
    generateBundle({ format }, bundle) {
      for (const file in bundle) {
        const chunk = bundle[file]
        if (chunk.type === 'chunk' && chunk.isEntry) {
          if (format === 'es' || format === 'esm') {
            manifest.path = chunk.fileName;
          } else if (format === 'system') {
            manifest.fallbackPath = chunk.fileName;
          }
        }
      }

      this.emitFile({
        fileName: 'manifest.json',
        type: 'asset',
        source: JSON.stringify(manifest, null, 2)
      });
    }
  };
};

export default [{
  input: 'src/system.js',
  output: { dir: 'libs' },
  plugins: [nodeResolve(),]
}, {
  input: 'src/index.js',
  output: [{
    dir: currentDistPath,
    format: 'es',
    entryFileNames: `${filename}.[hash].[format].js`
  }, {
    dir: currentDistPath,
    format: 'system',
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
    manifestPlugin()
  ],
}];