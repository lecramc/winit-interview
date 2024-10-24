import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficCountyGateway } from '@/modules/traffic-county/core/gateways-infra/fake-traffic-county.gateway.js'
import { TrafficCountyFactory } from '@/modules/traffic-county/core/entities/traffic-county.factory.js'

describe('Feature: delete traffic county', () => {
  test('User deletes a traffic county', async () => {
    givenPreviouslyCreatedTrafficCounties([
      TrafficCountyFactory.create({ _id: '1', name: 'Los Angeles', stateShortName: 'CA' }),
      TrafficCountyFactory.create({ _id: '2', name: 'Harris', stateShortName: 'TX' }),
    ])

    await whenDeletingTrafficCounty('1')

    thenTrafficCountyShouldBeDeleted([
      TrafficCountyFactory.create({ _id: '2', name: 'Harris', stateShortName: 'TX' }),
    ])
  })
})
const initialState = {
  trafficCounty: {
    trafficCounties: [
      TrafficCountyFactory.create({ _id: '1', name: 'Los Angeles', stateShortName: 'CA' }),
      TrafficCountyFactory.create({ _id: '2', name: 'Harris', stateShortName: 'TX' }),
    ],
  },
}
const trafficCountyGateway = new FakeTrafficCountyGateway()
const store = createTestStore({ initialState, dependencies: { trafficCountyGateway } })

function givenPreviouslyCreatedTrafficCounties(previousTrafficCounties = []) {
  trafficCountyGateway.trafficCounties = previousTrafficCounties
}

async function whenDeletingTrafficCounty(id) {
  await store.trafficCounty.deleteTrafficCounty(id)
}

function thenTrafficCountyShouldBeDeleted(expectedCounties) {
  expect(store.trafficCounty.trafficCounties).toEqual(expectedCounties)
}
