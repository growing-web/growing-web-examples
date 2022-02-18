import { currentDistPath, siteConfig, currentPackage, JSONReader } from './utils.mjs';

const { name } = currentPackage;
const importmap = JSONReader(`${currentDistPath}importmap.json`);

export const developmentFragment = () => ({
  get importmap() {
    const devImportmap = JSONReader(`${process.cwd()}/modules-proxy.json`);
    Object.keys(devImportmap.imports).forEach(name => {
      importmap.imports[name] = devImportmap.imports[name];
    });

    return `
      <script type="importmap:original">${JSON.stringify(importmap)}</script>
      <script src="/scripts/client/importmap-override.js"></script>
    `;
  },
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
    return `
      <script type="module" src="/src/index.js"></script>
    `;
  }
});

export const productionFragment = () => ({
  get importmap() {
    return `
      <script type="systemjs-importmap">
        ${JSON.stringify(importmap)}
      </script>
    `;
  },
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
    const entry = importmap.imports[name];
    return `
      <link rel="preload" as="script" href="${entry}">
      <script src="/libs/system.js"></script>
      <script>
        System.import("${entry}");
      </script>
    `;
  }
});