import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficStateGateway } from '@/modules/traffic-state/core/gateways-infra/fake-traffic-state.gateway.js'
import { TrafficStateFactory } from '@/modules/traffic-state/core/factories/traffic-state.factory.js'
import { deleteTrafficStateUsecase } from '@/modules/traffic-state/core/usecases/delete-traffic-state.usecase.js'

describe('Feature: delete traffic state', () => {
  test('User deletes a traffic state', async () => {
    givenPreviouslyCreatedTrafficStates([
      TrafficStateFactory.create({ _id: '1', longName: 'California', shortName: 'CA' }),
      TrafficStateFactory.create({ _id: '2', longName: 'Texas', shortName: 'TX' }),
    ])

    await whenDeletingTrafficState('1')

    thenTrafficStateShouldBeDeleted([
      TrafficStateFactory.create({ _id: '2', longName: 'Texas', shortName: 'TX' }),
    ])
  })
})
const initialState = {
  trafficState: {
    trafficStates: [
      TrafficStateFactory.create({ _id: '1', longName: 'California', shortName: 'CA' }),
      TrafficStateFactory.create({ _id: '2', longName: 'Texas', shortName: 'TX' }),
    ],
  },
}
const trafficStateGateway = new FakeTrafficStateGateway()
const store = createTestStore({ initialState, dependencies: { trafficStateGateway } })

function givenPreviouslyCreatedTrafficStates(previousTrafficStates = []) {
  trafficStateGateway.trafficStates = previousTrafficStates
}

async function whenDeletingTrafficState(id) {
  await deleteTrafficStateUsecase(id)(store)
}

function thenTrafficStateShouldBeDeleted(expectedTrafficStates) {
  expect(store.trafficState.trafficStates).toEqual(expectedTrafficStates)
}
