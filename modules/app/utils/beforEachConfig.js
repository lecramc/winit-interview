import dbConnect from '@/modules/app/utils/dbConnect.js'
import { getApiUrl, getMongoUri } from '@/modules/app/utils/testContainers.js'
import { dropDatabase, seedDatabase } from '@/db/mongo/init-db.js'
import axios from '@/modules/app/axios.js'

export const beforeEachConfig = async () => {
  await dbConnect(getMongoUri())
  await dropDatabase()
  await seedDatabase()
  axios.defaults.baseURL = getApiUrl()
}
