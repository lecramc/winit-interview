import { beforeEach, describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { HttpAttorneyGateway } from '@/modules/attorney/core/gateways-infra/http-attorney.gateway.js'
import { beforeEachConfig } from '@/modules/app/utils/beforEachConfig.js'

let store

beforeEach(async () => {
  await beforeEachConfig()
  const gateway = new HttpAttorneyGateway()

  store = createTestStore({
    dependencies: { attorneyGateway: gateway },
  })
  await store.attorney.fetchAttorneys()
})

describe('Integration Test: API with Test DB', () => {
  test('Use case createAttorney is fulfilled', async () => {
    const newAttorney = {
      name: 'Clément Doe',
      email: 'clement@example.com',
      address: '123 Main St',
      phone: '123-456-7890',
      enable: true,
    }

    await store.attorney.createAttorney(newAttorney)
    expect(store.attorney.state).toBe('fulfilled')
  })

  test('Use case getAttorneys is fulfilled', async () => {
    expect(store.attorney.state).toBe('fulfilled')
  })

  test('Use case updateAttorney is fulfilled', async () => {
    const attorneyToUpdate = store.attorney.attorneys[0]
    const updatedData = {
      ...attorneyToUpdate,
      name: 'Alice Dupont Updated',
      address: '12 Updated Address St',
    }

    await store.attorney.updateAttorney(updatedData)
    expect(store.attorney.state).toBe('fulfilled')
    expect(store.attorney.attorneys[0].name).toBe('Alice Dupont Updated')
  })

  test('Use case deleteAttorney is fulfilled', async () => {
    const attorneyToDelete = store.attorney.attorneys[1]

    await store.attorney.deleteAttorney(attorneyToDelete._id)
    expect(store.attorney.state).toBe('fulfilled')
  })

  test('Use case getAttorneyById is fulfilled', async () => {
    const attorneyId = store.attorney.attorneys[0]._id

    await store.attorney.getAttorneyById(attorneyId)
    expect(store.attorney.state).toBe('fulfilled')
  })
})
