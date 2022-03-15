import { Generator } from '@jspm/generator';
import merge from 'lodash.merge';
import * as dancf from '@growing-web/dancf-provider';
import {
  JSONReader,
  JSONWriter
} from './utils.mjs';

const currentPackage = JSONReader('./package.json');
const routemap = JSONReader('./routemap.json');
const webmodules = {
  "defaultProvider": "nodemodules",
  "providers": {},
  "inputMap": {},
  "entry": "@growing-web/bootstrap"
};//JSONReader('./webmodules.json');
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  try {
    const dev = JSONReader('./webmodules.dev.json');
    merge(webmodules, dev);
  } catch (error) { }
}

function normalizeResolutions(resolutions) {
  // @see: https://pnpm.io/workspaces
  const workspaceRegEx = /^workspace:(.*)$/;
  const exactPkgRegEx = /^((?:@[^/\\%@]+\/)?[^./\\%@][^/\\%@]*)@([^\/]+)(\/.*)?$/;

  for (const [key, value] of Object.entries(resolutions)) {
    const [, workspace] = value.match(workspaceRegEx) || [];

    if (workspace) {
      if (workspace === '*') {
        try {
          const pjson = JSONReader(`./node_modules/${key}/package.json`);
          const version = pjson.dependencies?.[key] || pjson.peerDependencies?.[key] || pjson.optionalDependencies?.[key];
          resolutions[key] = version;
        } catch (error) {
          error.message = `Description Failed to parse the workspace protocol: ${error.message}`;
          throw error;
        }
      } else {
        const [, name, version] = workspace.match(exactPkgRegEx) || [];
        if (name) {
          throw new Error(`Workspace aliases are not supported: ${value}`);
        }
        resolutions[key] = version;
      }
    }
  }

  return resolutions;
}

const { defaultProvider, inputMap, resolutions, providers } =
  webmodules;
const generator = new Generator({
  mapUrl: new URL('../', import.meta.url).href,
  customProviders: {
    dancf,
  },
  env: [isDevelopment ? "production" : "development", "browser", "module"],
  defaultProvider,
  inputMap,
  resolutions: normalizeResolutions(Object.assign({}, currentPackage.dependencies, resolutions)),
  providers,
});

const install = [];
const routeModules = routemap?.routes
  .filter(
    (route) => route.element === 'web-widget' && route.properties?.import
  )
  .map((route) => route.properties.import);

install.push(webmodules.entry);
install.push(...routeModules);

await generator.install(install);

const importMap = generator.getMap();

JSONWriter(`./importmap.json`, importMap);
console.log(`importmap.json created!`);
