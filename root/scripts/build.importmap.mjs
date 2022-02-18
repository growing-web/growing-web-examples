import {
  baseBuildDistPath,
  currentDistPath,
  currentPackage,
  JSONReader,
  JSONWriter,
  normalizeBasename,
  siteConfig,
} from './utils.mjs';

const NODE_ENV = process.env.NODE_ENV;
const entryManifest = JSONReader(`${currentDistPath}manifest.json`);

const importmap = {
  imports: {},
};

function dependenciesFilter(dependencies, rules) {
  const results = [];
  rules.forEach((rule) => {
    const regx = new RegExp(
      '^' +
      rule
        .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\*/g, '.*') +
      '$'
    );
    Object.keys(dependencies).forEach((name) => {
      if (regx.test(name)) {
        results.push(name);
      }
    });
  });
  return results;
}

function getPublicPath(publicPath, name, path) {
  return `${publicPath}${normalizeBasename(name)}/${path}`;
}

// 获取依赖的 Apps 入口模块映射
dependenciesFilter(currentPackage.dependencies, siteConfig.applications)
  .map((name) =>
    JSONReader(
      `${baseBuildDistPath}${normalizeBasename(name)}/web-widget.json`
    )
  )
  .forEach(({ name, fallbackPath, path }) => {
    importmap.imports[name] = getPublicPath(
      siteConfig.publicPath,
      name,
      NODE_ENV === 'development' ? path : fallbackPath
    );
  });

// 共享依赖
Object.assign(importmap.imports, siteConfig.sharedDependencies);

// 获取根入口文件模块映射
importmap.imports[entryManifest.name] = getPublicPath(
  siteConfig.publicPath,
  entryManifest.name,
  NODE_ENV === 'development' ? entryManifest.path : entryManifest.fallbackPath
);

JSONWriter(`${currentDistPath}importmap.json`, importmap);
console.log(`created`, `importmap.json`);
