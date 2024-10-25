import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore.js'
import { HttpTrafficStateGateway } from '@/modules/traffic-state/core/gateways-infra/http-traffic-state.gateway.js'
import { beforeEachConfig } from '@/modules/app/utils/beforEachConfig.js'

let store

beforeEach(async () => {
  await beforeEachConfig()
  const gateway = new HttpTrafficStateGateway()
  store = createTestStore({
    dependencies: { trafficStateGateway: gateway },
  })
  await store.trafficState.fetchTrafficStates()
})

describe('Integration Test: API with Test DB for Traffic States', () => {
  test('Use case createTrafficState is fulfilled', async () => {
    const newTrafficState = {
      longName: 'Utah',
      shortName: 'UT',
    }

    await store.trafficState.createTrafficState(newTrafficState)
    expect(store.trafficState.state).toBe('fulfilled')
  })

  test('Use case getTrafficStates is fulfilled', async () => {
    await store.trafficState.fetchTrafficStates()
    expect(store.trafficState.state).toBe('fulfilled')
  })

  test('Use case updateTrafficState is fulfilled', async () => {
    const stateToUpdate = store.trafficState.trafficStates[0]
    const updatedData = {
      ...stateToUpdate,
      longName: 'Updated California',
    }

    await store.trafficState.updateTrafficState(updatedData)
    expect(store.trafficState.state).toBe('fulfilled')
  })

  test('Use case deleteTrafficState is fulfilled', async () => {
    const stateToDelete = store.trafficState.trafficStates[1]

    await store.trafficState.deleteTrafficState(stateToDelete._id)
    expect(store.trafficState.state).toBe('fulfilled')
  })

  test('Use case getTrafficStateById is fulfilled', async () => {
    const stateId = store.trafficState.trafficStates[0]._id

    await store.trafficState.getTrafficStateById(stateId)
    expect(store.trafficState.state).toBe('fulfilled')
  })
})
