import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficStateGateway } from '@/modules/traffic-state/core/gateways-infra/fake-traffic-state.gateway.js'
import { TrafficStateFactory } from '@/modules/traffic-state/core/entities/traffic-state.factory.js'

describe('Feature: retrieve traffic state by ID', () => {
  test('User retrieves a traffic state by ID', async () => {
    givenPreviouslyCreatedTrafficStates([
      TrafficStateFactory.create({ _id: '1', longName: 'California', shortName: 'CA' }),
      TrafficStateFactory.create({ _id: '2', longName: 'Texas', shortName: 'TX' }),
    ])

    await whenRetrievingTrafficStateById('1')

    thenIShouldHaveTrafficStateInStore(
      TrafficStateFactory.create({
        _id: '1',
        longName: 'California',
        shortName: 'CA',
      }),
    )
  })
})

const trafficStateGateway = new FakeTrafficStateGateway()
const store = createTestStore({ dependencies: { trafficStateGateway } })

function givenPreviouslyCreatedTrafficStates(previousTrafficStates = []) {
  trafficStateGateway.trafficStates = previousTrafficStates
}

async function whenRetrievingTrafficStateById(id) {
  await store.trafficState.getTrafficStateById(id)
}

function thenIShouldHaveTrafficStateInStore(expectedState) {
  expect(store.trafficState.selectedTrafficState).toEqual(expectedState)
}
