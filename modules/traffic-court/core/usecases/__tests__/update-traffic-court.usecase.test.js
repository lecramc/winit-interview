import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficCourtGateway } from '@/modules/traffic-court/core/gateways-infra/fake-traffic-court.gateway.js'
import { TrafficCourtFactory } from '@/modules/traffic-court/core/entities/traffic-court.factory.js'

describe('Feature: update traffic court', () => {
  test('User updates an existing traffic court', async () => {
    givenPreviouslyCreatedTrafficCourts([
      TrafficCourtFactory.create({
        _id: '1',
        name: 'Los Angeles Traffic Court',
        stateShortName: 'CA',
      }),
    ])

    await whenUpdatingTrafficCourt(
      TrafficCourtFactory.create({
        _id: '1',
        name: 'Orange County Traffic Court',
        stateShortName: 'CA',
      }),
    )

    thenTrafficCourtShouldBeUpdated([
      TrafficCourtFactory.create({
        _id: '1',
        name: 'Orange County Traffic Court',
        stateShortName: 'CA',
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
        stateShortName: 'CA',
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
  await store.trafficCourt.updateTrafficCourt(updatedData)
}

function thenTrafficCourtShouldBeUpdated(expectedTrafficCourt) {
  expect(store.trafficCourt.trafficCourts).toEqual(expectedTrafficCourt)
}
