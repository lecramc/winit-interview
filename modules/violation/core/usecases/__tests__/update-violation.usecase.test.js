import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeViolationGateway } from '@/modules/violation/core/gateways-infra/fake-violation.gateway.js'
import { ViolationFactory } from '@/modules/violation/core/factories/violation.factory.js'
import { updateViolationUsecase } from '@/modules/violation/core/usecases/update-violation.usecase.js'

describe('Feature: update violation', () => {
  test('User updates an existing violation', async () => {
    givenPreviouslyCreatedViolations([
      ViolationFactory.create({ _id: '1', name: 'Speeding', points: 3 }),
    ])

    await whenUpdatingViolation(
      ViolationFactory.create({ _id: '1', name: 'Speeding over limit', points: 5 }),
    )

    thenViolationShouldBeUpdated([
      ViolationFactory.create({ _id: '1', name: 'Speeding over limit', points: 5 }),
    ])
  })
})
const initialState = {
  violation: {
    violations: [ViolationFactory.create({ _id: '1', name: 'Speeding', points: 3 })],
  },
}
const violationGateway = new FakeViolationGateway()
const store = createTestStore({ initialState, dependencies: { violationGateway } })

function givenPreviouslyCreatedViolations(previousViolations = []) {
  violationGateway.violations = previousViolations
}

async function whenUpdatingViolation(updatedData) {
  await updateViolationUsecase(updatedData)(store)
}

function thenViolationShouldBeUpdated(updatedData) {
  expect(store.violation.violations).toEqual(updatedData)
}
