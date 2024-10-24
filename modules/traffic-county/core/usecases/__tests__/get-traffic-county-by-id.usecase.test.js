import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficCountyGateway } from '@/modules/traffic-county/core/gateways-infra/fake-traffic-county.gateway.js'
import { TrafficCountyFactory } from '@/modules/traffic-county/core/entities/traffic-county.factory.js'

describe('Feature: retrieve traffic county by ID', () => {
  test('User retrieves a traffic county by ID', async () => {
    givenPreviouslyCreatedTrafficCounties([
      TrafficCountyFactory.create({ _id: '1', name: 'Los Angeles County', stateShortName: 'CA' }),
      TrafficCountyFactory.create({ _id: '2', name: 'Harris County', stateShortName: 'TX' }),
    ])

    await whenRetrievingTrafficCountyById('1')

    thenIShouldHaveTrafficCountyInStore(
      TrafficCountyFactory.create({
        _id: '1',
        name: 'Los Angeles County',
        stateShortName: 'CA',
      }),
    )
  })
})

const trafficCountyGateway = new FakeTrafficCountyGateway()
const store = createTestStore({ dependencies: { trafficCountyGateway } })

function givenPreviouslyCreatedTrafficCounties(previousTrafficCounties = []) {
  trafficCountyGateway.trafficCounties = previousTrafficCounties
}

async function whenRetrievingTrafficCountyById(id) {
  await store.trafficCounty.getTrafficCountyById(id)
}

function thenIShouldHaveTrafficCountyInStore(expectedCounty) {
  expect(store.trafficCounty.selectedTrafficCounty).toEqual(expectedCounty)
}
