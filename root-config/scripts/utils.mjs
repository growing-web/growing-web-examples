import fs from 'fs-extra'
import dotenv from 'dotenv'

const isDevelopment = process.env.NODE_ENV === 'development'
export const JSONReader = (file) => JSON.parse(fs.readFileSync(file, 'utf8'))
export const JSONWriter = (file, data) =>
  fs.writeFileSync(
    file,
    isDevelopment ? JSON.stringify(data, null, 2) : JSON.stringify(data),
  )

export const transformFragment = (string, data) =>
  string.replace(
    /<fragment\s+name="([^"]+)"[^>]?>([\w\W]*?)<\/fragment>/g,
    (_, name, content) => {
      const value = data[name]
      const type = typeof value
      if (type === 'string') {
        return value
      } else if (type === 'function') {
        return value(content)
      }
      return ''
    },
  )

export const loadEnv = () => {
  const env = process.env.NODE_ENV
  const resultEnv = {}
  const envList = [`.env.${env}.local`, `.env.${env}`, '.env.local', '.env']
  envList.forEach((e) => {
    dotenv.config({
      path: e,
    })
  })

  for (const key of Object.keys(process.env)) {
    const value = process?.env?.[key]?.replace(/\\n/g, '\n') ?? ''
    process.env[key] = value
    resultEnv[key] = value
  }
  return resultEnv
}
