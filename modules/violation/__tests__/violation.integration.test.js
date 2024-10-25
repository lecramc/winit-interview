import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore.js'
import { HttpViolationGateway } from '@/modules/violation/core/gateways-infra/http-violation.gateway.js'
import { beforeEachConfig } from '@/modules/app/utils/beforEachConfig.js'

let store

beforeEach(async () => {
  await beforeEachConfig()

  const gateway = new HttpViolationGateway()
  store = createTestStore({
    dependencies: { violationGateway: gateway },
  })
  await store.violation.fetchViolations()
})

describe('Integration Test: API with Test DB for Violations', () => {
  test('Use case createViolation is fulfilled', async () => {
    const newViolation = {
      name: 'Reckless driving',
      points: 6,
    }

    await store.violation.createViolation(newViolation)
    expect(store.violation.state).toBe('fulfilled')
  })

  test('Use case getViolations is fulfilled', async () => {
    await store.violation.fetchViolations()
    expect(store.violation.state).toBe('fulfilled')
  })

  test('Use case updateViolation is fulfilled', async () => {
    const violationToUpdate = store.violation.violations[0]
    const updatedData = {
      ...violationToUpdate,
      name: 'Reckless driving updated',
      points: 5,
    }

    await store.violation.updateViolation(updatedData)
    expect(store.violation.state).toBe('fulfilled')
  })

  test('Use case deleteViolation is fulfilled', async () => {
    const violationToDelete = store.violation.violations[1]

    await store.violation.deleteViolation(violationToDelete._id)
    expect(store.violation.state).toBe('fulfilled')
  })

  test('Use case getViolationById is fulfilled', async () => {
    const violationId = store.violation.violations[0]._id

    await store.violation.getViolationById(violationId)
    expect(store.violation.state).toBe('fulfilled')
  })
})
