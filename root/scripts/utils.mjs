import fs from 'fs';
import { dirname, normalize } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const JSONReader = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
export const JSONWriter = (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
export const normalizeBasename = name => name.replace('@', '');

export const siteConfig = JSONReader(`${__dirname}/../web-site.json`);
export const devSiteConfig = JSONReader(`${__dirname}/../web-site.dev.json`);
export const baseBuildDistPath = normalize(`${__dirname}/../../dist/`);
export const currentPackage = JSONReader(`${__dirname}/../package.json`);
export const currentDistPathname = normalizeBasename(currentPackage.name);
export const currentDistPath = `${baseBuildDistPath}${currentDistPathname}/`;

export const transformFragment = (string, data) =>
  string.replace(
    /<fragment\s+name="([^"]+)"[^>]?>([\w\W]*?)<\/fragment>/g,
    (match, name, content) => {
      const value = data[name];
      const type = typeof value;
      if (type === 'string') {
        return value;
      } else if (type === 'function') {
        return value(content);
      }
      return '';
    }
  );
