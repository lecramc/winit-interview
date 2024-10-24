import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeViolationGateway } from '@/modules/violation/core/gateways-infra/fake-violation.gateway.js'
import { ViolationFactory } from '@/modules/violation/core/entities/violation.factory.js'

describe('Feature: retrieve violations', () => {
  test('User retrieves all violations', async () => {
    givenPreviouslyCreatedViolations([
      ViolationFactory.create({ _id: '1', name: 'Speeding', points: 3 }),
      ViolationFactory.create({ _id: '2', name: 'Running a red light', points: 5 }),
    ])

    await whenRetrievingAllViolations()

    thenIShouldHaveAllViolations([
      ViolationFactory.create({ _id: '1', name: 'Speeding', points: 3 }),
      ViolationFactory.create({ _id: '2', name: 'Running a red light', points: 5 }),
    ])
  })
})

const violationGateway = new FakeViolationGateway()
const store = createTestStore({ dependencies: { violationGateway } })

function givenPreviouslyCreatedViolations(previousViolations = []) {
  violationGateway.violations = previousViolations
}

async function whenRetrievingAllViolations() {
  await store.violation.fetchViolations()
}

function thenIShouldHaveAllViolations(expectedViolations = []) {
  expect(store.violation.violations).toEqual(expectedViolations)
}
