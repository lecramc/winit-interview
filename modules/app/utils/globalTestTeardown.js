import { stopTestContainers } from '@/modules/app/utils/testContainers.js'

export async function globalTeardown() {
  await stopTestContainers()
}
