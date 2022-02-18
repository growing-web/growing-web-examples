import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';
import { developmentFragment } from './html.config.mjs';
import { transformFragment } from './utils.mjs';

const replace = fromRollup(rollupReplace);

export default {
  nodeResolve: true,
  watch: true,
  port: 9999,
  appIndex: 'index.html',
  plugins: [
    replace({
      include: ['src/**/*.js'],
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify('development')
      }
    }),
    {
      name: 'transformFragment',
      transform(context) {
        if (context.response.is('html')) {
          return {
            body: transformFragment(context.body, developmentFragment()),
          };
        }
      },
    }
  ],
};
