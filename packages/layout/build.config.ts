import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  clean: true,
  entries: ['src/index', 'src/adapters/vue2-adapter'],
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
