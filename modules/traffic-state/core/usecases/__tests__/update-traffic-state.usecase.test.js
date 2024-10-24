import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficStateGateway } from '@/modules/traffic-state/core/gateways-infra/fake-traffic-state.gateway.js'
import { TrafficStateFactory } from '@/modules/traffic-state/core/entities/traffic-state.factory.js'

describe('Feature: update traffic state', () => {
  test('User updates an existing traffic state', async () => {
    givenPreviouslyCreatedTrafficStates([
      TrafficStateFactory.create({ _id: '1', longName: 'California', shortName: 'CA' }),
    ])

    await whenUpdatingTrafficState(
      TrafficStateFactory.create({ _id: '1', longName: 'New California', shortName: 'CA' }),
    )

    thenTrafficStateShouldBeUpdated([
      TrafficStateFactory.create({ _id: '1', longName: 'New California', shortName: 'CA' }),
    ])
  })
})
const initialState = {
  trafficState: {
    trafficStates: [
      TrafficStateFactory.create({ _id: '1', longName: 'California', shortName: 'CA' }),
    ],
  },
}
const trafficStateGateway = new FakeTrafficStateGateway()
const store = createTestStore({ initialState, dependencies: { trafficStateGateway } })

function givenPreviouslyCreatedTrafficStates(previousTrafficStates = []) {
  trafficStateGateway.trafficStates = previousTrafficStates
}

async function whenUpdatingTrafficState(updatedData) {
  await store.trafficState.updateTrafficState(updatedData)
}

function thenTrafficStateShouldBeUpdated(expectedState) {
  expect(store.trafficState.trafficStates).toEqual(expectedState)
}