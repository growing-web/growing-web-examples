import type { UserConfig, UserConfigExport } from '@growing-web/web-builder'
import path from 'path'
import fs from 'fs-extra'

const siteConfig = fs.readJSONSync(path.resolve(__dirname, 'web-site.json'))

export default function ({ mode }: UserConfigExport): UserConfig {
  const isDev = mode === 'development'
  const importmap = fs.readJSONSync(
    path.resolve(
      __dirname,
      '../dist/',
      `${isDev ? 'exports-manifest.json' : 'system-exports-manifest.json'}`,
    ),
  )

  const routes = siteConfig.routemap.routes
  const bootstrap = importmap.imports['@growing-web/bootstrap']
  const systemjs = importmap.imports.systemjs

  // TODO 确定不需要system 时候简化
  const fragmentData = {
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

  return {
    // 开发环境使用 web-dev-server
    // web-dev-server 没有提供生产环境构建，所以使用了基于 rollup 的vite
    bundlerType: 'webDevServer',

    // 只有配置该选项，构建器会启动 web-site 模式
    webSite: {
      // 构建输出目录
      outputDir: '../dist',
      link: {
        // link 源目录
        src: '../',
        // link 目标目录
        target: './workspace',
      },
    },
    plugins: [
      !isDev
        ? {
            // web-builder plugin
            name: 'transformFragment',
            transform(code, id) {
              if (id.endsWith('.html')) {
                const html = transformFragment(code, fragmentData)
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
                  return transformFragment(context.body as string, fragmentData)
                }
              },
            },
          },
    ],
  }
}

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
