import mongoose from 'mongoose'
import '../../../db/mongo/schemas/Attorney.js'
import '../../../db/mongo/schemas/AttorneyPriceMap.js'
import '../../../db/mongo/schemas/TrafficCourt.js'
import '../../../db/mongo/schemas/TrafficCounty.js'
import '../../../db/mongo/schemas/Violation.js'

let isConnected

export default async function dbConnect(uri) {
  if (isConnected) {
    return
  }
  const mongoUri = uri ?? process.env.MONGODB_URI

  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in your environment variables')
  }

  try {
    await mongoose.connect(mongoUri)
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Database connection error:', error)
    process.exit(1)
  }
}
