import path from 'path';
import {
  baseBuildDistPath,
  currentPackage,
  JSONReader,
  JSONWriter,
  normalizeBasename,
  siteConfig,
  devSiteConfig
} from './utils.mjs';

const isDevelopment =  process.env.NODE_ENV === 'development';
const importmapFilename = isDevelopment ? 'importmap.json' : 'systemjs-importmap.json';
const output = `${baseBuildDistPath}${importmapFilename}`;
const publicPath = isDevelopment ? (devSiteConfig.publicPath || siteConfig.publicPath) : siteConfig.publicPath;

function isAbsolutePath(path) {
  return /^(\/|https?)/.test(path);
}

function toPublicPath(publicPath, name, path) {
  if (isAbsolutePath(path)) {
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
  
  if (isAbsolutePath(value)) {
    return value;
  }

  throw new Error(`Cannot import: {"${name}": "${value}"}`);
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
}, siteConfig.importmap, publicPath);

if (isDevelopment && devSiteConfig.importmap) {
  const devImportmap = devSiteConfig.importmap;
  if (devImportmap && devImportmap.imports) {
    Object.keys(devImportmap.imports).forEach(name => {
      importmap.imports[name] = devImportmap.imports[name];
    });
  }
}

JSONWriter(output, importmap);
console.log(`created`, path.relative(process.cwd(), output));
