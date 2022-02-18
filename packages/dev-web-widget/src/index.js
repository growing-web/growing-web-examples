#!/usr/bin/env node

import path from 'path';
import fs from 'fs';
import minimist from 'minimist';

const { dist, url } = minimist(process.argv.slice(2));
const entryDist = path.resolve(process.cwd(), dist);

console.log(entryDist)
const JSONReader = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
const JSONWriter = (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

const { name } = JSONReader(`${process.cwd()}/package.json`);

fs.writeFileSync(`${entryDist}/index.js`, `export { default } from ${JSON.stringify(url)};`);

JSONWriter(`${entryDist}/web-widget.json`, {
  name,
  path: 'index.js'
});

