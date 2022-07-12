import fs from 'fs-extra'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { transformFragment, JSONReader } from './utils.mjs'
import { minify } from 'html-minifier-terser'

const nodeEnv = process.env.NODE_ENV || 'development'
const __dirname = dirname(fileURLToPath(import.meta.url))
const template = fs.readFileSync(`${__dirname}/template.html`, 'utf8')

const html = transformFragment(template, {
  get importmap() {
    const importmap = JSONReader(`./importmap.json`)
    const string =
      nodeEnv === 'development'
        ? JSON.stringify(importmap, null, 2)
        : JSON.stringify(importmap)

    return `
      <script type="importmap">${string}</script>
      <script>
        if (!HTMLScriptElement.supports || !HTMLScriptElement.supports('importmap')) {
          document.head.appendChild(Object.assign(document.createElement('script'), {
            src: 'https://es.dancf.com/npm:es-module-shims@0.12.8/dist/es-module-shims.min.js',
            crossorigin: 'anonymous',
            async: true
          }));
        }
      </script>
    `
  },
  get routemap() {
    const routemap = JSONReader(`./routemap.json`)
    const string =
      nodeEnv === 'development'
        ? JSON.stringify(routemap, null, 2)
        : JSON.stringify(routemap)
    return `
      <script type="routemap">${string}</script>
    `
  },
  get outlet() {
    const { routes } = JSONReader(`./routemap.json`)
    return `
      <web-router></web-router>
    `
  },
  get entry() {
    const entry = '@growing-web/bootstrap'
    return `<script type="module">import ${JSON.stringify(entry)}</script>`
  },
})

const string = await (nodeEnv === 'development'
  ? html
  : minify(html, { collapseWhitespace: true }))
fs.writeFileSync('./index.html', string, 'utf8')
console.log(`index.html created!`)
