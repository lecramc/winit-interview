import { defineConfig } from 'vitest/config'
import * as path from 'node:path'

export default defineConfig({
  test: {
    alias: {
      '@': path.resolve(__dirname, '/'),
    },
    environment: 'node',
  },
})
