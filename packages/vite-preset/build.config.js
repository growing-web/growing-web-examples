import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  entries: ['src/index'],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
  externals: [
    "vite",
    "vite-plugin-vue2",
    "@vitejs/plugin-react",
    "vite-plugin-shadow-dom-css"
  ],
})
