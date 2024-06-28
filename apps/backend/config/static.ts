import { defineConfig } from '@adonisjs/static'

const staticServerConfig = defineConfig({
  enabled: false,
  etag: true,
  lastModified: true,
  dotFiles: 'ignore',
})

export default staticServerConfig
