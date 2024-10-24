import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficCourtGateway } from '@/modules/traffic-court/core/gateways-infra/fake-traffic-court.gateway.js'
import { TrafficCourtFactory } from '@/modules/traffic-court/core/entities/traffic-court.factory.js'

describe('Feature: retrieve traffic court by ID', () => {
  test('User retrieves a traffic court by ID', async () => {
    givenPreviouslyCreatedTrafficCourts([
      TrafficCourtFactory.create({
        _id: '1',
        name: 'Los Angeles Traffic Court',
        stateShortName: 'CA',
      }),
      TrafficCourtFactory.create({ _id: '2', name: 'Houston Traffic Court', stateShortName: 'TX' }),
    ])

    await whenRetrievingTrafficCourtById('1')

    thenIShouldHaveTrafficCourtInStore(
      TrafficCourtFactory.create({
        _id: '1',
        name: 'Los Angeles Traffic Court',
        stateShortName: 'CA',
      }),
    )
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

async function whenRetrievingTrafficCourtById(id) {
  await store.trafficCourt.getTrafficCourtById(id)
}

function thenIShouldHaveTrafficCourtInStore(expectedCourt) {
  expect(store.trafficCourt.selectedTrafficCourt).toEqual(expectedCourt)
}
