import {
  baseBuildDistPath,
  currentPackage,
  JSONReader,
  JSONWriter,
  normalizeBasename,
  siteConfig,
} from './utils.mjs';

const NODE_ENV = process.env.NODE_ENV;
const importmapFilename = NODE_ENV === 'development' ? 'importmap.json' : 'systemjs-importmap.json';

function toPublicPath(publicPath, name, path) {
  if (/^(\/|https?)/.test(path)) {
    return path;
  }
  return `${publicPath}${normalizeBasename(name)}/${path}`;
}

function dependenciesFilter(dependencies, name) {
  const results = [];

  if (name.includes('*')) {
    const regx = new RegExp(
      '^' +
      name
        .replace(/[.+?^${}()|[\]\\]/g, '\\$&')
        .replace(/\*/g, '.*') +
      '$'
    );
  
    Object.keys(dependencies).forEach((name) => {
      if (regx.test(name)) {
        results.push(name);
      }
    });
  } else {
    results.push(name);
  } 

  return results;
}

function getImportmapValue(name, value) {
  if (value.includes('workspace:*')) {
    const importmap = JSONReader(
      `${baseBuildDistPath}${normalizeBasename(name)}/${importmapFilename}`
    );
    return importmap.imports[name];
  }
  return value;
}

function assignImportmap(target, source, publicPath) {
  Object.keys(source.imports).forEach(name => {
    const value = source.imports[name];
    dependenciesFilter(currentPackage.dependencies, name).forEach(name => {
      target.imports[name] = toPublicPath(publicPath, name, getImportmapValue(name, value));
    });
  });
  return target;
}

const importmap = assignImportmap({
  imports: {},
}, siteConfig.importmap, siteConfig.publicPath);

JSONWriter(`${baseBuildDistPath}${importmapFilename}`, importmap);
console.log(`created`, importmapFilename);
