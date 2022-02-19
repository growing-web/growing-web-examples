import { baseBuildDistPath, siteConfig, JSONReader } from './utils.mjs';

export const developmentFragment = () => {
  const importmap = JSONReader(`${baseBuildDistPath}importmap.json`);
  return {
    get importmap() {
      return `
        <script type="importmap:original">${JSON.stringify(importmap)}</script>
        <script src="/src/importmap-override.js"></script>
      `;
    },
    data: `<script type="application/sd+json">{}</script>`,
    get outlet() {
      const routes = siteConfig.routes;
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
      const bootstrap = importmap.imports['@growing-web/bootstrap'];
      return `
        <script type="module" src="${bootstrap}"></script>
      `;
    }
  };
};

export const productionFragment = () => {
  const importmap = JSONReader(`${baseBuildDistPath}systemjs-importmap.json`);
  return {
    get importmap() {
      return `
        <script type="systemjs-importmap">
          ${JSON.stringify(importmap)}
        </script>
      `;
    },
    data: `<script type="application/sd+json">{}</script>`,
    get outlet() {
      const routes = siteConfig.routes;
      return `
        <web-router>
          ${routes.map(({ path, element, properties }) => {
        const isWebWidget = element === 'web-widget';
        const moduleType = isWebWidget ? 'type="system"' : '';
        return `<web-route path="${path}" element="${element}" ${Object.entries(properties).map(([name, value]) => {
          return `${name}="${value}"`;
        }).join(' ')} ${moduleType}></web-route>`;
      }).join('')}
        </web-router>
      `;
    },
    get entry() {
      const systemjs = importmap.imports.systemjs;
      const bootstrap = importmap.imports['@growing-web/bootstrap'];
      return `
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
      `;
    }
  }
};