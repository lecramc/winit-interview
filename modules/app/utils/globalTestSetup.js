import { startTestContainers } from '@/modules/app/utils/testContainers.js'

export default async function globalSetup() {
  await startTestContainers()
}
