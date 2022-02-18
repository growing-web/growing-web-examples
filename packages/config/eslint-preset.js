module.exports = {
  extends: ["next", "prettier"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/", "root/*"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};
