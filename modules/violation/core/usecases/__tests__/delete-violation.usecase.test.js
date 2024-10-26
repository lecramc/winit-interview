import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeViolationGateway } from '@/modules/violation/core/gateways-infra/fake-violation.gateway.js'
import { ViolationFactory } from '@/modules/violation/core/entities/violation.factory.js'
import { deleteViolationUsecase } from '@/modules/violation/core/usecases/delete-violation.usecase.js'

describe('Feature: delete violation', () => {
  test('User deletes a violation', async () => {
    givenPreviouslyCreatedViolations([
      ViolationFactory.create({ _id: '1', name: 'Speeding', points: 3 }),
      ViolationFactory.create({ _id: '2', name: 'Running a red light', points: 5 }),
    ])

    await whenDeletingViolation('1')

    thenViolationShouldBeDeleted('1')
  })
})

const violationGateway = new FakeViolationGateway()
const store = createTestStore({ dependencies: { violationGateway } })

function givenPreviouslyCreatedViolations(previousViolations = []) {
  violationGateway.violations = previousViolations
}

async function whenDeletingViolation(id) {
  await deleteViolationUsecase(id)(store)
}
function thenViolationShouldBeDeleted(id) {
  expect(violationGateway.violations).not.toContainEqual(expect.objectContaining({ _id: id }))
}
