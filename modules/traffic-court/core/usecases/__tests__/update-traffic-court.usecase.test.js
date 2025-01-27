import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficCourtGateway } from '@/modules/traffic-court/core/gateways-infra/fake-traffic-court.gateway.js'
import { TrafficCourtFactory } from '@/modules/traffic-court/core/factories/traffic-court.factory.js'
import { updateTrafficCourtUsecase } from '@/modules/traffic-court/core/usecases/update-traffic-court.usecase.js'

describe('Feature: update traffic court', () => {
  test('User updates an existing traffic court', async () => {
    const previousTrafficCourts = [
      TrafficCourtFactory.create({ _id: '1', name: 'Los Angeles Traffic Court' }),
    ]
    givenPreviouslyCreatedTrafficCourts(previousTrafficCourts)

    await whenUpdatingTrafficCourt(
      TrafficCourtFactory.create({
        _id: '1',
        name: 'Orange County Traffic Court',
      }),
    )

    thenTrafficCourtShouldBeUpdated([
      TrafficCourtFactory.create({
        _id: '1',
        name: 'Orange County Traffic Court',
      }),
    ])
  })
})
const initialState = {
  trafficCourt: {
    trafficCourts: [
      TrafficCourtFactory.create({
        _id: '1',
        name: 'Los Angeles Traffic Court',
      }),
    ],
  },
}
const trafficCourtGateway = new FakeTrafficCourtGateway()
const store = createTestStore({ initialState, dependencies: { trafficCourtGateway } })

function givenPreviouslyCreatedTrafficCourts(previousTrafficCourts = []) {
  trafficCourtGateway.trafficCourts = previousTrafficCourts
}

async function whenUpdatingTrafficCourt(updatedData) {
  await updateTrafficCourtUsecase(updatedData)(store)
}

function thenTrafficCourtShouldBeUpdated(expectedTrafficCourt) {
  expect(store.trafficCourt.trafficCourts).toEqual(expectedTrafficCourt)
}
