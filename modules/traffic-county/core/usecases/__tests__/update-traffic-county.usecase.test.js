import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficCountyGateway } from '@/modules/traffic-county/core/gateways-infra/fake-traffic-county.gateway.js'
import { TrafficCountyFactory } from '@/modules/traffic-county/core/entities/traffic-county.factory.js'
import { updateTrafficCountyUsecase } from '@/modules/traffic-county/core/usecases/update-traffic-county.usecase.js'

describe('Feature: update traffic county', () => {
  test('User updates an existing traffic county', async () => {
    givenPreviouslyCreatedTrafficCounties([
      TrafficCountyFactory.create({ _id: '1', name: 'Los Angeles' }),
    ])

    await whenUpdatingTrafficCounty(
      TrafficCountyFactory.create({ _id: '1', name: 'Orange County' }),
    )

    thenTrafficCountyShouldBeUpdated([
      TrafficCountyFactory.create({ _id: '1', name: 'Orange County' }),
    ])
  })
})
const initialState = {
  trafficCounty: {
    trafficCounties: [TrafficCountyFactory.create({ _id: '1', name: 'Los Angeles' })],
  },
}
const trafficCountyGateway = new FakeTrafficCountyGateway()
const store = createTestStore({ initialState, dependencies: { trafficCountyGateway } })

function givenPreviouslyCreatedTrafficCounties(previousTrafficCounties = []) {
  trafficCountyGateway.trafficCounties = previousTrafficCounties
}

async function whenUpdatingTrafficCounty(updatedData) {
  await updateTrafficCountyUsecase(updatedData)(store)
}

function thenTrafficCountyShouldBeUpdated(expectedUpdate) {
  expect(store.trafficCounty.trafficCounties).toEqual(expectedUpdate)
}
