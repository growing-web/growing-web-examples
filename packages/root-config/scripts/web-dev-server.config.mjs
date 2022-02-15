
import { transformHtml } from './transform-html.mjs';
import { importMapsPlugin }  from '@web/dev-server-import-maps';

export default {
  nodeResolve: true,
  watch: true,
  port: 9999,
  appIndex: 'index.html',
  plugins: [
    {
      name: 'my-plugin',
      transform(context) {
        if (context.response.is('html')) {
          return {
            body: transformHtml(context.body, {}, 'development'),
          };
        }
      },
    },
    importMapsPlugin(),
  ],
};
