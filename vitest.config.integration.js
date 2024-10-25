import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    include: ['modules/**/*.integration.test.js'],
    environment: 'node',
    hookTimeout: 60000,
    testTimeout: 90000,
    globals: true,
    globalSetup: './modules/app/utils/globalTestSetup.js',
    globalTeardown: './modules/app/utils/globalTestTeardown.js',
    threads: false,
    maxConcurrency: 1,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
