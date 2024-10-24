import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { AttorneyFactory } from '@/modules/attorney/core/entities/attorney.factory.js'
import { FakeAttorneyGateway } from '@/modules/attorney/core/gateways-infra/fake-attorney.gateway.js'

describe('Feature: delete attorney', () => {
  test('User delete an existing attorney', async () => {
    givenPreviouslyCreatedAttorneys([
      AttorneyFactory.create({ _id: '1', name: 'John Doe', email: 'john@example.com' }),
      AttorneyFactory.create({ _id: '2', name: 'John Cafe', email: 'john@example.com' }),
    ])

    await whenDeletingAttorney('1')

    thenAttorneyShouldBeDeleted([
      AttorneyFactory.create({ _id: '2', name: 'John Cafe', email: 'john@example.com' }),
    ])
  })
})
const initialState = {
  attorney: {
    attorneys: [
      AttorneyFactory.create({
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      }),
      AttorneyFactory.create({ _id: '2', name: 'John Cafe', email: 'john@example.com' }),
    ],
    state: 'pending',
  },
}
const attorneyGateway = new FakeAttorneyGateway()
const store = createTestStore({ initialState, dependencies: { attorneyGateway } })

function givenPreviouslyCreatedAttorneys(previousAttorneys = []) {
  attorneyGateway.attorneys = previousAttorneys
}

async function whenDeletingAttorney(id) {
  await store.attorney.deleteAttorney(id)
}

function thenAttorneyShouldBeDeleted(expectedAttorneys = []) {
  expect(store.attorney.attorneys).toEqual(expectedAttorneys)
}
