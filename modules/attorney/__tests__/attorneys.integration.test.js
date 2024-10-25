import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { HttpAttorneyGateway } from '@/modules/attorney/core/gateways-infra/http-attorney.gateway.js'
import Attorney from '@/db/mongo/schemas/Attorney.js'
import axios from '@/modules/app/axios.js'
import {
  getApiUrl,
  getMongoUri,
  startTestContainers,
  stopTestContainers,
} from '@/modules/app/utils/testContainers.js'
import dbConnect from '@/modules/app/utils/dbConnect.js'

let store

beforeAll(async () => {
  await startTestContainers()

  axios.defaults.baseURL = getApiUrl()
  process.env.MONGODB_URI = getMongoUri()
  await dbConnect()

  const existingAttorneys = [
    {
      name: 'Alice Dupont',
      email: 'alice.dupont@example.com',
      address: '10 Rivoli St',
      phone: '014-567-8910',
      enabled: true,
    },
    {
      name: 'Julien Lefebvre',
      email: 'julien.lefebvre@example.com',
      address: '25 Champs-Élysées Ave',
      phone: '015-234-5678',
      enabled: true,
    },
    {
      name: 'Emma Giraud',
      email: 'emma.giraud@example.com',
      address: '50 Haussmann Blvd',
      phone: '016-789-1234',
      enabled: true,
    },
  ]
  await Attorney.create(existingAttorneys)

  const gateway = new HttpAttorneyGateway()

  store = createTestStore({
    dependencies: { attorneyGateway: gateway },
  })
})

afterAll(async () => {
  await stopTestContainers()
})

describe('Integration Test: API with Test DB', () => {
  test('Use case createAttorney is fulfilled', async () => {
    const newAttorney = {
      name: 'Clément Doe',
      email: 'clement@example.com',
      address: '123 Main St',
      phone: '123-456-7890',
      enabled: true,
    }

    await store.attorney.createAttorney(newAttorney)
    expect(store.attorney.state).toBe('fulfilled')
  })

  test('Use case getAttorneys is fulfilled', async () => {
    await store.attorney.fetchAttorneys()
    expect(store.attorney.state).toBe('fulfilled')
  })

  test('Use case updateAttorney is fulfilled', async () => {
    await store.attorney.fetchAttorneys()

    const attorneyToUpdate = store.attorney.attorneys[0]
    const updatedData = {
      ...attorneyToUpdate,
      name: 'Alice Dupont Updated',
      address: '12 Updated Address St',
    }

    await store.attorney.updateAttorney(updatedData)
    expect(store.attorney.state).toBe('fulfilled')
    expect(store.attorney.attorneys[0].name).toBe('Alice Dupont Updated')
  })

  test('Use case deleteAttorney is fulfilled', async () => {
    await store.attorney.fetchAttorneys()
    const attorneyToDelete = store.attorney.attorneys[1]

    await store.attorney.deleteAttorney(attorneyToDelete._id)
    expect(store.attorney.state).toBe('fulfilled')
  })

  test('Use case getAttorneyById is fulfilled', async () => {
    await store.attorney.fetchAttorneys()
    const attorneyId = store.attorney.attorneys[0]._id

    await store.attorney.getAttorneyById(attorneyId)
    expect(store.attorney.state).toBe('fulfilled')
  })
})
