import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficCountyGateway } from '@/modules/traffic-county/core/gateways-infra/fake-traffic-county.gateway.js'
import { TrafficCountyFactory } from '@/modules/traffic-county/core/entities/traffic-county.factory.js'

describe('Feature: create traffic county', () => {
  test('User creates a new traffic county', async () => {
    const newTrafficCountyData = TrafficCountyFactory.create({
      _id: '3',
      name: 'Orange County',
      stateShortName: 'CA',
    })

    await whenCreatingNewTrafficCounty(newTrafficCountyData)

    thenIShouldHaveTrafficCountyInStore(newTrafficCountyData)
  })
})

const trafficCountyGateway = new FakeTrafficCountyGateway()
const store = createTestStore({ dependencies: { trafficCountyGateway } })

async function whenCreatingNewTrafficCounty(countyData) {
  await store.trafficCounty.createTrafficCounty(countyData)
}

function thenIShouldHaveTrafficCountyInStore(expectedCounty) {
  expect(store.trafficCounty.trafficCounties).toContainEqual(expectedCounty)
}
