import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficCourtGateway } from '@/modules/traffic-court/core/gateways-infra/fake-traffic-court.gateway.js'
import { TrafficCourtFactory } from '@/modules/traffic-court/core/factories/traffic-court.factory.js'
import { getTrafficCourtsUsecase } from '@/modules/traffic-court/core/usecases/get-traffic-courts.usecase.js'

describe('Feature: retrieve traffic courts', () => {
  test('User retrieves all traffic courts', async () => {
    const previousTrafficCourts = [
      TrafficCourtFactory.create({ _id: '1', name: 'Los Angeles Traffic Court' }),
      TrafficCourtFactory.create({ _id: '2', name: 'Houston Traffic Court' }),
    ]
    givenPreviouslyCreatedTrafficCourts(previousTrafficCourts)

    await whenRetrievingAllTrafficCourts()

    thenIShouldHaveAllTrafficCourts(previousTrafficCourts)
  })
})

const trafficCourtGateway = new FakeTrafficCourtGateway()
const store = createTestStore({ dependencies: { trafficCourtGateway } })

function givenPreviouslyCreatedTrafficCourts(previousTrafficCourts = []) {
  trafficCourtGateway.trafficCourts = previousTrafficCourts
}

async function whenRetrievingAllTrafficCourts() {
  await getTrafficCourtsUsecase()(store)
}

function thenIShouldHaveAllTrafficCourts(expectedTrafficCourts = []) {
  expect(store.trafficCourt.getTrafficCourts()).toEqual(expectedTrafficCourts)
}
