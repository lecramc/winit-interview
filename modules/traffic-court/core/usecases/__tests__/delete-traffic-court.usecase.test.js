import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficCourtGateway } from '@/modules/traffic-court/core/gateways-infra/fake-traffic-court.gateway.js'
import { TrafficCourtFactory } from '@/modules/traffic-court/core/entities/traffic-court.factory.js'

describe('Feature: delete traffic court', () => {
  test('User deletes a traffic court', async () => {
    givenPreviouslyCreatedTrafficCourts([
      TrafficCourtFactory.create({
        _id: '1',
        name: 'Los Angeles Traffic Court',
        stateShortName: 'CA',
      }),
      TrafficCourtFactory.create({ _id: '2', name: 'Houston Traffic Court', stateShortName: 'TX' }),
    ])

    await whenDeletingTrafficCourt('1')

    thenTrafficCourtShouldBeDeleted([
      TrafficCourtFactory.create({ _id: '2', name: 'Houston Traffic Court', stateShortName: 'TX' }),
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
      TrafficCourtFactory.create({ _id: '2', name: 'Houston Traffic Court', stateShortName: 'TX' }),
    ],
  },
}
const trafficCourtGateway = new FakeTrafficCourtGateway()
const store = createTestStore({ initialState, dependencies: { trafficCourtGateway } })

function givenPreviouslyCreatedTrafficCourts(previousTrafficCourts = []) {
  trafficCourtGateway.trafficCourts = previousTrafficCourts
}

async function whenDeletingTrafficCourt(id) {
  await store.trafficCourt.deleteTrafficCourt(id)
}

function thenTrafficCourtShouldBeDeleted(expectedTrafficCourts) {
  expect(store.trafficCourt.trafficCourts).toEqual(expectedTrafficCourts)
}
