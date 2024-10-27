import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { AttorneyFactory } from '@/modules/attorney/core/factories/attorney.factory.js'
import { FakeAttorneyGateway } from '@/modules/attorney/core/gateways-infra/fake-attorney.gateway.js'
import { createAttorneyUsecase } from '@/modules/attorney/core/usecases/create-attorney.usecase.js'

describe('Feature: create attorney', () => {
  test('User creates a new attorney', async () => {
    await whenCreatingANewAttorney(
      AttorneyFactory.create({
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Main St',
        phone: '123-456-7890',
      }),
    )

    thenIShouldHaveCreatedAttorney(
      AttorneyFactory.create({
        _id: expect.any(String),
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Main St',
        phone: '123-456-7890',
      }),
    )
  })
})

const attorneyGateway = new FakeAttorneyGateway()
const store = createTestStore({ dependencies: { attorneyGateway } })

async function whenCreatingANewAttorney(newAttorneyData) {
  await createAttorneyUsecase(newAttorneyData)(store)
}

function thenIShouldHaveCreatedAttorney(expectedAttorney) {
  expect(store.attorney.attorneys).toContainEqual(expectedAttorney)
}
