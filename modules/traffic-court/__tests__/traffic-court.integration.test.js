import { beforeEach, describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore.js'
import { HttpTrafficCourtGateway } from '@/modules/traffic-court/core/gateways-infra/http-traffic-court.gateway.js'
import { beforeEachConfig } from '@/modules/app/utils/beforEachConfig.js'
import mongoose from 'mongoose'

let store

beforeEach(async () => {
  await beforeEachConfig()

  const gateway = new HttpTrafficCourtGateway()
  store = createTestStore({
    dependencies: { trafficCourtGateway: gateway },
  })
  await store.trafficCourt.fetchTrafficCourts()
})

describe('Integration Test: API with Test DB for Traffic Courts', () => {
  test('Use case createTrafficCourt is fulfilled', async () => {
    const newTrafficCourt = {
      name: 'Denver Traffic Court',
      address: '123 Main Denver',
      trafficCounty: new mongoose.Types.ObjectId(),
      trafficState: new mongoose.Types.ObjectId(),
    }

    await store.trafficCourt.createTrafficCourt(newTrafficCourt)
    expect(store.trafficCourt.state).toBe('fulfilled')
  })

  test('Use case getTrafficCourts is fulfilled', async () => {
    await store.trafficCourt.fetchTrafficCourts()
    expect(store.trafficCourt.state).toBe('fulfilled')
  })

  test('Use case updateTrafficCourt is fulfilled', async () => {
    const courtToUpdate = store.trafficCourt.trafficCourts[0]
    const updatedData = {
      ...courtToUpdate,
      name: 'Updated Los Angeles Traffic Court',
      address: '123 Updated St, Los Angeles',
    }

    await store.trafficCourt.updateTrafficCourt(updatedData)
    expect(store.trafficCourt.state).toBe('fulfilled')
  })

  test('Use case deleteTrafficCourt is fulfilled', async () => {
    const courtToDelete = store.trafficCourt.trafficCourts[1]

    await store.trafficCourt.deleteTrafficCourt(courtToDelete._id)
    expect(store.trafficCourt.state).toBe('fulfilled')
  })

  test('Use case getTrafficCourtById is fulfilled', async () => {
    const courtId = store.trafficCourt.trafficCourts[0]._id

    await store.trafficCourt.getTrafficCourtById(courtId)
    expect(store.trafficCourt.state).toBe('fulfilled')
  })
})
