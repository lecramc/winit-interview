import { DockerComposeEnvironment, Wait } from 'testcontainers'
import mongoose from 'mongoose'

let composeEnvironment
let testMongoUri

const projectRoot = process.cwd()

export const startTestContainers = async () => {
  testMongoUri = `mongodb://root:password@mongo:27017/test_db?authSource=admin`

  composeEnvironment = await new DockerComposeEnvironment(projectRoot, 'docker-compose.yml')
    .withEnvironment({
      MONGODB_URI: testMongoUri,
      MONGO_PORT: '27018',
      NEXT_PUBLIC_API_PORT: '3001',
    })
    .withProjectName(`attorney_test`)
    .withWaitStrategy('nextjs', Wait.forLogMessage('Ready on http'))
    .up()
}

export const stopTestContainers = async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.dropDatabase()
    await mongoose.disconnect()
  }

  if (composeEnvironment) {
    await composeEnvironment.down()
  }
}
export const getApiUrl = () => 'http://localhost:3001/api'
export const getMongoUri = () => 'mongodb://root:password@localhost:27018/test_db?authSource=admin'
