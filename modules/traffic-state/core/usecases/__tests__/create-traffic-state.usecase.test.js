import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficStateGateway } from '@/modules/traffic-state/core/gateways-infra/fake-traffic-state.gateway.js'
import { TrafficStateFactory } from '@/modules/traffic-state/core/entities/traffic-state.factory.js'
import { createTrafficStateUsecase } from '@/modules/traffic-state/core/usecases/create-traffic-state.usecase.js'

describe('Feature: create traffic state', () => {
  test('User creates a new traffic state', async () => {
    const newTrafficStateData = TrafficStateFactory.create({
      _id: '3',
      longName: 'New York',
      shortName: 'NY',
    })

    await whenCreatingNewTrafficState(newTrafficStateData)

    thenIShouldHaveTrafficStateInStore(newTrafficStateData)
  })
})

const trafficStateGateway = new FakeTrafficStateGateway()
const store = createTestStore({ dependencies: { trafficStateGateway } })

async function whenCreatingNewTrafficState(stateData) {
  await createTrafficStateUsecase(stateData)(store)
}

function thenIShouldHaveTrafficStateInStore(expectedState) {
  expect(store.trafficState.trafficStates).toContainEqual(expectedState)
}
