import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficCourtGateway } from '@/modules/traffic-court/core/gateways-infra/fake-traffic-court.gateway.js'
import { TrafficCourtFactory } from '@/modules/traffic-court/core/entities/traffic-court.factory.js'

describe('Feature: create traffic court', () => {
  test('User creates a new traffic court', async () => {
    const newTrafficCourtData = TrafficCourtFactory.create({
      _id: '3',
      name: 'San Francisco Traffic Court',
      stateShortName: 'CA',
    })

    await whenCreatingNewTrafficCourt(newTrafficCourtData)

    thenIShouldHaveTrafficCourtInStore([{ ...newTrafficCourtData, _id: 'newId' }])
  })
})

const trafficCourtGateway = new FakeTrafficCourtGateway()
const store = createTestStore({ dependencies: { trafficCourtGateway } })

async function whenCreatingNewTrafficCourt(courtData) {
  await store.trafficCourt.createTrafficCourt(courtData)
}

function thenIShouldHaveTrafficCourtInStore(expectedCourt) {
  expect(store.trafficCourt.trafficCourts).toEqual(expectedCourt)
}
