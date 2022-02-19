import fs from 'fs';
import { dirname, normalize } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const JSONReader = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
export const JSONWriter = (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
export const normalizeBasename = name => name.replace('@', '');

export const baseBuildDistPath = normalize(`${__dirname}/../../../dist/`);
export const currentPackage = JSONReader(`${__dirname}/../package.json`);
export const currentDistPathname = normalizeBasename(currentPackage.name);
export const currentDistPath = `${baseBuildDistPath}${currentDistPathname}/`;