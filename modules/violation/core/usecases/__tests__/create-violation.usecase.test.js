import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeViolationGateway } from '@/modules/violation/core/gateways-infra/fake-violation.gateway.js'
import { ViolationFactory } from '@/modules/violation/core/entities/violation.factory.js'

describe('Feature: create violation', () => {
  test('User creates a new violation', async () => {
    const newViolationData = ViolationFactory.create({
      _id: '3',
      name: 'Failure to yield',
      points: 2,
    })

    await whenCreatingNewViolation(newViolationData)

    thenIShouldHaveViolationInStore([{ _id: 'newId', ...newViolationData }])
  })
})

const violationGateway = new FakeViolationGateway()
const store = createTestStore({ dependencies: { violationGateway } })

async function whenCreatingNewViolation(violationData) {
  await store.violation.createViolation(violationData)
}

function thenIShouldHaveViolationInStore(expectedViolation) {
  expect(store.violation.violations).toEqual(expectedViolation)
}
