// init-db.js
import TrafficCourt from '../../db/mongo/schemas/TrafficCourt.js'
import TrafficState from '../../db/mongo/schemas/TrafficState.js'
import TrafficCounty from '../../db/mongo/schemas/TrafficCounty.js'
import Violation from '../../db/mongo/schemas/Violation.js'
import AttorneyPriceMap from '../../db/mongo/schemas/AttorneyPriceMap.js'
import Attorney from '../../db/mongo/schemas/Attorney.js'
import dotenv from 'dotenv'
import dbConnect from '../../modules/app/utils/dbConnect.js'
import * as fs from 'node:fs'
import mongoose from 'mongoose'
import url from 'node:url'

export const dropDatabase = async () => {
  await Attorney.deleteMany()
  await TrafficState.deleteMany()
  await TrafficCounty.deleteMany()
  await TrafficCourt.deleteMany()
  await Violation.deleteMany()
  await AttorneyPriceMap.deleteMany()
}

export const seedDatabase = async () => {
  const attorneys = await Attorney.create([
    {
      name: 'Alice Dupont',
      email: 'alice.dupont@example.com',
      address: '10 Rivoli St',
      phone: '014-567-8910',
    },
    {
      name: 'Julien Lefebvre',
      email: 'julien.lefebvre@example.com',
      address: '25 Champs-Élysées Ave',
      phone: '015-234-5678',
    },
    {
      name: 'Emma Giraud',
      email: 'emma.giraud@example.com',
      address: '50 Haussmann Blvd',
      phone: '016-789-1234',
    },
    {
      name: 'Lucas Moreau',
      email: 'lucas.moreau@example.com',
    },
  ])

  const trafficStates = await TrafficState.create([
    {
      longName: 'California',
      shortName: 'CA',
    },
    {
      longName: 'Texas',
      shortName: 'TX',
    },
  ])

  const trafficCounties = await TrafficCounty.create([
    {
      name: 'Los Angeles County',
      trafficState: trafficStates[0]._id,
    },
    {
      name: 'Harris County',
      trafficState: trafficStates[1]._id,
    },
  ])

  const trafficCourts = await TrafficCourt.create([
    {
      name: 'Los Angeles Traffic Court',
      address: '123 Broadway St',
      trafficCounty: trafficCounties[0]._id,
      trafficState: trafficStates[0]._id,
    },
    {
      name: 'Houston Traffic Court',
      address: '789 Bayou St',
      trafficCounty: trafficCounties[1]._id,
      trafficState: trafficStates[1]._id,
    },
  ])

  const violations = await Violation.create([
    {
      name: 'Speeding over 20 MPH',
      points: 4,
    },
    {
      name: 'Failure to stop at a stop sign',
      points: 2,
    },
  ])

  await AttorneyPriceMap.create([
    // Alice Dupont
    {
      attorney: attorneys[0]._id,
      court: trafficCourts[0]._id,
      pointsRange: [12, 15],
      price: 550,
    },
    {
      attorney: attorneys[0]._id,
      county: trafficCounties[0]._id,
      pointsRange: [15, 18],
      price: 450,
    },
    {
      attorney: attorneys[0]._id,
      violation: violations[0]._id,
      price: 500,
    },
    // Julien Lefebvre
    {
      attorney: attorneys[1]._id,
      court: trafficCourts[1]._id,
      pointsRange: [8, 12],
      price: 300,
    },
    {
      attorney: attorneys[1]._id,
      violation: violations[1]._id,
      price: 350,
    },
    // Emma Giraud
    {
      attorney: attorneys[2]._id,
      court: trafficCourts[1]._id,
      pointsRange: [10, 15],
      price: 500,
    },
    {
      attorney: attorneys[2]._id,
      county: trafficCounties[1]._id,
      pointsRange: [18, 20],
      price: 600,
    },
    {
      attorney: attorneys[2]._id,
      violation: violations[0]._id,
      price: 450,
    },
    // Lucas Moreau
    {
      attorney: attorneys[3]._id,
      violation: violations[1]._id,
      price: 320,
    },
  ])

  console.log('Seeding completed')
}

const __filename = url.fileURLToPath(import.meta.url)

if (process.argv[1] === __filename) {
  const main = async () => {
    try {
      dotenv.config({
        path: fs.existsSync('.env') ? '.env' : '.env.local',
      })
      await dbConnect()

      console.log('Dropping database...')
      await dropDatabase()
      console.log('Database dropped')
      console.log('Seeding database...')
      await seedDatabase()
      console.log('Database seeded')
    } catch (err) {
      console.error('Seeding failed', err)
    } finally {
      await mongoose.connection.close()
    }
  }

  await main()
}
