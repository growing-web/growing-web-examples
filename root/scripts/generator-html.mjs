import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { transformFragment, JSONReader } from './utils.mjs';
import { minify } from 'html-minifier-terser';

const isDevelopment =  process.env.NODE_ENV === 'development';
const __dirname = dirname(fileURLToPath(import.meta.url));
const template = fs.readFileSync(`${__dirname}/template.html`, 'utf8');

const html = transformFragment(template, {
  get importmap() {
    const importmap = JSONReader(`./importmap.json`);
    const string = isDevelopment ? JSON.stringify(importmap, null, 2) : JSON.stringify(importmap);
    return `
      <script type="importmap">${string}</script>
      <script async src="https://es.dancf.com/npm:es-module-shims@0.12.8/dist/es-module-shims.min.js" crossorigin="anonymous"></script>
    `;
  },
  data: `<script type="application/sd+json">{}</script>`,
  get outlet() {
    const { routes } = JSONReader(`./routemap.json`);
    return `
      <web-router>
        ${routes.map(({ path, element, properties }) => {
      return `<web-route path="${path}" element="${element}" ${Object.entries(properties).map(([name, value]) => {
        return `${name}="${value}"`;
      }).join(' ')}></web-route>`;
    }).join('')}
      </web-router>
    `;
  },
  get entry() {
    const { entry } = JSONReader('./webmodules.json'); 
    return `<script type="module">import ${JSON.stringify(entry)}</script>`;
  }
});

const string = await (isDevelopment ? html : minify(html, { collapseWhitespace: true }));
fs.writeFileSync('./index.html', string, 'utf8');
console.log(`index.html created!`);