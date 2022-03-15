import type { UserConfig, UserConfigExport } from '@growing-web/web-builder'
import path from 'path'
import fs from 'fs-extra'


export default function ({ mode }: UserConfigExport): UserConfig {

  const isDev = mode === 'development'
  const siteConfig = fs.readJSONSync(path.resolve(__dirname, 'web-site.json'))

  function transformFragment(string: string, data: any) {
    return string.replace(
      /<fragment\s+name="([^"]+)"[^>]?>([\w\W]*?)<\/fragment>/g,
      (_, name, content) => {
        const value = data[name]
        const type = typeof value
        if (type === 'string') {
          return value
        } else if (type === 'function') {
          return value(content)
        }
        return ''
      },
    )
  }


  function getFragment() {
    const manifestPath = path.resolve(
      __dirname,
      '../dist/',
      `${isDev ? 'exports-manifest.json' : 'system-exports-manifest.json'}`,
    )
    const importmap = fs.readJSONSync(manifestPath)

    const routes = siteConfig.routemap.routes
    const bootstrap = importmap.imports['@growing-web/bootstrap']
    const systemjs = importmap.imports.systemjs

    // TODO 确定不需要system 时候简化
    return {
      importmap: `<script type="${
        isDev ? 'importmap' : 'systemjs-importmap'
      }">${JSON.stringify(importmap)}</script>`,

      data: `<script type="application/sd+json">{}</script>`,

      outlet: `
        <web-router>
          ${routes
            .map(({ path, element, properties }) => {
              const isWebWidget = element === 'web-widget'
              const moduleType = isWebWidget ? 'type="system"' : ''
              return `<web-route path="${path}" element="${element}" ${Object.entries(
                properties,
              )
                .map(([name, value]) => {
                  return `${name}="${value}"`
                })
                .join(' ')}  ${isDev ? '' : moduleType}></web-route>`
            })
            .join('')}
        </web-router>
      `,

      entry: isDev
        ? `<script type="module" src="${bootstrap}"></script>`
        : `
        <template>
          <script src="${systemjs}"></script>
          <link rel="preload" as="script" href="${bootstrap}">
          <script type="systemjs-module" src="${bootstrap}"></script>
        </template>
        <script>
          (function() {
            const template = document.currentScript.previousSibling;
            const nodes = template.content.cloneNode(true);
            document.head.appendChild(nodes);
          })();
        </script>
      `,
    }
  }

  return {
    plugins: [
      !isDev
        ? {
            // web-builder plugin
            name: 'transformFragment',
            transform(code, id) {
              if (id.endsWith('.html')) {
                const html = transformFragment(code, getFragment())
                return html
              }
              return null
            },

          }
        : {
            // FIXME 特殊处理，默认的插件不能前置处理html，所以使用 webDevServer专用插件处理
            // TODO 后续优化，在 web-builder 插件增强 transform  钩子功能，达到插件一致化，不做差异编译器配置
            name: 'transformFragment',
            webDevServer: {
              transform(context) {
                if (context.response.is('html')) {
                  return transformFragment(
                    context.body as string,
                    getFragment(),
                  )
                }
              },
            },
          },
    ],
  }
}
