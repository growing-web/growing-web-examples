import fs from 'fs'
import path from 'path'
;(async () => {
  const cwd = process.cwd()
  // fs.copyFileSync(
  //   path.join(cwd, 'src/react-adapter.js'),
  //   path.join(cwd, 'dist/react-adapter.js'),
  // )
  fs.copyFileSync(
    path.join(cwd, 'src/vue2-adapter.js'),
    path.join(cwd, 'dist/vue2-adapter.js'),
  )
})()
