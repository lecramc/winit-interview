import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficCourtGateway } from '@/modules/traffic-court/core/gateways-infra/fake-traffic-court.gateway.js'
import { TrafficCourtFactory } from '@/modules/traffic-court/core/entities/traffic-court.factory.js'

describe('Feature: retrieve traffic courts', () => {
  test('User retrieves all traffic courts', async () => {
    givenPreviouslyCreatedTrafficCourts([
      TrafficCourtFactory.create({
        _id: '1',
        name: 'Los Angeles Traffic Court',
        stateShortName: 'CA',
      }),
      TrafficCourtFactory.create({ _id: '2', name: 'Houston Traffic Court', stateShortName: 'TX' }),
    ])

    await whenRetrievingAllTrafficCourts()

    thenIShouldHaveAllTrafficCourts([
      TrafficCourtFactory.create({
        _id: '1',
        name: 'Los Angeles Traffic Court',
      }),
      TrafficCourtFactory.create({ _id: '2', name: 'Houston Traffic Court' }),
    ])
  })
})

const trafficCourtGateway = new FakeTrafficCourtGateway()
const store = createTestStore({ dependencies: { trafficCourtGateway } })

function givenPreviouslyCreatedTrafficCourts(previousTrafficCourts = []) {
  trafficCourtGateway.trafficCourts = previousTrafficCourts
}

async function whenRetrievingAllTrafficCourts() {
  await store.trafficCourt.fetchTrafficCourts()
}

function thenIShouldHaveAllTrafficCourts(expectedTrafficCourts = []) {
  expect(store.trafficCourt.trafficCourts).toEqual(expectedTrafficCourts)
}
