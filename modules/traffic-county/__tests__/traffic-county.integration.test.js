import { beforeEach, describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore.js'
import { HttpTrafficCountyGateway } from '@/modules/traffic-county/core/gateways-infra/http-traffic-county.gateway.js'
import { beforeEachConfig } from '@/modules/app/utils/beforEachConfig.js'
import mongoose from 'mongoose'

let store

beforeEach(async () => {
  await beforeEachConfig()

  const gateway = new HttpTrafficCountyGateway()
  store = createTestStore({
    dependencies: { trafficCountyGateway: gateway },
  })
  await store.trafficCounty.fetchTrafficCounties()
})

describe('Integration Test: API with Test DB for Traffic Counties', () => {
  test('Use case createTrafficCounty is fulfilled', async () => {
    const newTrafficCounty = {
      name: 'Denver County',
      trafficState: new mongoose.Types.ObjectId(),
    }

    await store.trafficCounty.createTrafficCounty(newTrafficCounty)
    expect(store.trafficCounty.state).toBe('fulfilled')
  })

  test('Use case getTrafficCounties is fulfilled', async () => {
    await store.trafficCounty.fetchTrafficCounties()
    expect(store.trafficCounty.state).toBe('fulfilled')
  })

  test('Use case updateTrafficCounty is fulfilled', async () => {
    const countyToUpdate = store.trafficCounty.trafficCounties[0]
    const updatedData = {
      ...countyToUpdate,
      name: 'Updated Los Angeles County',
    }

    await store.trafficCounty.updateTrafficCounty(updatedData)
    expect(store.trafficCounty.state).toBe('fulfilled')
  })

  test('Use case deleteTrafficCounty is fulfilled', async () => {
    const countyToDelete = store.trafficCounty.trafficCounties[1]

    await store.trafficCounty.deleteTrafficCounty(countyToDelete._id)
    expect(store.trafficCounty.state).toBe('fulfilled')
  })

  test('Use case getTrafficCountyById is fulfilled', async () => {
    const countyId = store.trafficCounty.trafficCounties[0]._id

    await store.trafficCounty.getTrafficCountyById(countyId)
    expect(store.trafficCounty.state).toBe('fulfilled')
  })
})
