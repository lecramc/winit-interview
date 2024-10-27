import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeTrafficCourtGateway } from '@/modules/traffic-court/core/gateways-infra/fake-traffic-court.gateway.js'
import { TrafficCourtFactory } from '@/modules/traffic-court/core/factories/traffic-court.factory.js'
import { createTrafficCourtUsecase } from '@/modules/traffic-court/core/usecases/create-traffic-court.usecase.js'

describe('Feature: create traffic court', () => {
  test('User creates a new traffic court', async () => {
    const newTrafficCourtData = TrafficCourtFactory.create({
      _id: '3',
      name: 'San Francisco Traffic Court',
    })

    await whenCreatingNewTrafficCourt(newTrafficCourtData)

    thenIShouldHaveTrafficCourtInStore([{ ...newTrafficCourtData, _id: 'newId' }])
  })
})

const trafficCourtGateway = new FakeTrafficCourtGateway()
const store = createTestStore({ dependencies: { trafficCourtGateway } })

async function whenCreatingNewTrafficCourt(courtData) {
  await createTrafficCourtUsecase(courtData)(store)
}

function thenIShouldHaveTrafficCourtInStore(expectedCourt) {
  expect(store.trafficCourt.trafficCourts).toEqual(expectedCourt)
}
