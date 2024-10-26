import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { AttorneyFactory } from '@/modules/attorney/core/entities/attorney.factory.js'
import { FakeAttorneyGateway } from '@/modules/attorney/core/gateways-infra/fake-attorney.gateway.js'
import { updateAttorneyUsecase } from '@/modules/attorney/core/usecases/update-attorney.usecase.js'

describe('Feature: update attorney', () => {
  test('User updates an existing attorney', async () => {
    givenPreviouslyCreatedAttorneys([
      AttorneyFactory.create({ _id: '1', name: 'John Doe', email: 'john@example.com' }),
      AttorneyFactory.create({ _id: '2', name: 'John Cafe', email: 'john@example.com' }),
    ])

    await whenUpdatingAttorney(
      AttorneyFactory.create({
        _id: '1',
        name: 'John Doe Updated',
        email: 'johnupdated@example.com',
      }),
    )

    thenAttorneyShouldBeUpdated([
      AttorneyFactory.create({
        _id: '1',
        name: 'John Doe Updated',
        email: 'johnupdated@example.com',
      }),
      AttorneyFactory.create({ _id: '2', name: 'John Cafe', email: 'john@example.com' }),
    ])
  })
})

const initialState = {
  attorney: {
    attorneys: [
      AttorneyFactory.create({ _id: '1', name: 'John Doe', email: 'john@example.com' }),
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

async function whenUpdatingAttorney(updatedAttorneyData) {
  await updateAttorneyUsecase(updatedAttorneyData)(store)
}

function thenAttorneyShouldBeUpdated(expectedAttorney) {
  expect(store.attorney.attorneys).toEqual(expectedAttorney)
}
