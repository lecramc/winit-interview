import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficCountyGateway } from '@/modules/traffic-county/core/gateways-infra/fake-traffic-county.gateway.js'
import { TrafficCountyFactory } from '@/modules/traffic-county/core/factories/traffic-county.factory.js'
import { deleteTrafficCountyUsecase } from '@/modules/traffic-county/core/usecases/delete-traffic-county.usecase.js'

describe('Feature: delete traffic county', () => {
  test('User deletes a traffic county', async () => {
    givenPreviouslyCreatedTrafficCounties([
      TrafficCountyFactory.create({ _id: '1', name: 'Los Angeles' }),
      TrafficCountyFactory.create({ _id: '2', name: 'Harris' }),
    ])

    await whenDeletingTrafficCounty('1')

    thenTrafficCountyShouldBeDeleted([TrafficCountyFactory.create({ _id: '2', name: 'Harris' })])
  })
})
const initialState = {
  trafficCounty: {
    trafficCounties: [
      TrafficCountyFactory.create({ _id: '1', name: 'Los Angeles' }),
      TrafficCountyFactory.create({ _id: '2', name: 'Harris' }),
    ],
  },
}
const trafficCountyGateway = new FakeTrafficCountyGateway()
const store = createTestStore({ initialState, dependencies: { trafficCountyGateway } })

function givenPreviouslyCreatedTrafficCounties(previousTrafficCounties = []) {
  trafficCountyGateway.trafficCounties = previousTrafficCounties
}

async function whenDeletingTrafficCounty(id) {
  await deleteTrafficCountyUsecase(id)(store)
}

function thenTrafficCountyShouldBeDeleted(expectedCounties) {
  expect(store.trafficCounty.trafficCounties).toEqual(expectedCounties)
}
