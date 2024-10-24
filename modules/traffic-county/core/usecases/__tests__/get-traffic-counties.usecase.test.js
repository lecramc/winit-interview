import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficCountyGateway } from '@/modules/traffic-county/core/gateways-infra/fake-traffic-county.gateway.js'
import { TrafficCountyFactory } from '@/modules/traffic-county/core/entities/traffic-county.factory.js'

describe('Feature: retrieve traffic counties', () => {
  test('User retrieves all traffic counties', async () => {
    givenPreviouslyCreatedTrafficCounties([
      TrafficCountyFactory.create({ _id: '1', name: 'Los Angeles', stateShortName: 'CA' }),
      TrafficCountyFactory.create({ _id: '2', name: 'Harris', stateShortName: 'TX' }),
    ])

    await whenRetrievingAllTrafficCounties()

    thenIShouldHaveAllTrafficCounties([
      TrafficCountyFactory.create({ _id: '1', name: 'Los Angeles', stateShortName: 'CA' }),
      TrafficCountyFactory.create({ _id: '2', name: 'Harris', stateShortName: 'TX' }),
    ])
  })
})

const trafficCountyGateway = new FakeTrafficCountyGateway()
const store = createTestStore({ dependencies: { trafficCountyGateway } })

function givenPreviouslyCreatedTrafficCounties(previousTrafficCounties = []) {
  trafficCountyGateway.trafficCounties = previousTrafficCounties
}

async function whenRetrievingAllTrafficCounties() {
  await store.trafficCounty.fetchTrafficCounties()
}

function thenIShouldHaveAllTrafficCounties(expectedTrafficCounties = []) {
  expect(store.trafficCounty.trafficCounties).toEqual(expectedTrafficCounties)
}
