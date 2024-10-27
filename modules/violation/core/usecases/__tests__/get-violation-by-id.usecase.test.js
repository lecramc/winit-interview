import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeViolationGateway } from '@/modules/violation/core/gateways-infra/fake-violation.gateway.js'
import { ViolationFactory } from '@/modules/violation/core/factories/violation.factory.js'
import { getViolationByIdUsecase } from '@/modules/violation/core/usecases/get-violation-by-id.usecase.js'

describe('Feature: retrieve violation by ID', () => {
  test('User retrieves a violation by ID', async () => {
    givenPreviouslyCreatedViolations([
      ViolationFactory.create({ _id: '1', name: 'Speeding', points: 3 }),
    ])

    await whenRetrievingViolationById('1')

    thenIShouldHaveViolationInStore(
      ViolationFactory.create({ _id: '1', name: 'Speeding', points: 3 }),
    )
  })
})

const violationGateway = new FakeViolationGateway()
const store = createTestStore({ dependencies: { violationGateway } })

function givenPreviouslyCreatedViolations(previousViolations = []) {
  violationGateway.violations = previousViolations
}

async function whenRetrievingViolationById(id) {
  await getViolationByIdUsecase(id)(store)
}

function thenIShouldHaveViolationInStore(expectedViolation) {
  expect(store.violation.selectedViolation).toEqual(expectedViolation)
}
