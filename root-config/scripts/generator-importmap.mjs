import { loadEnv } from './utils.mjs'
;(async () => {
  loadEnv()

  const { install } = await import('@growing-web/wpm')
  await install({ force: true })
})()
