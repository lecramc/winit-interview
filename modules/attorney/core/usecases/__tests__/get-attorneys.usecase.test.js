import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { AttorneyFactory } from '@/modules/attorney/core/entities/attorney.factory.js'
import { FakeAttorneyGateway } from '@/modules/attorney/core/gateways-infra/fake-attorney.gateway.js'
import { getAttorneysUsecase } from '@/modules/attorney/core/usecases/get-attorneys.usecase.js'

describe('Feature: retrieve attorneys', () => {
  test('User retrieves all created attorneys', async () => {
    givenPreviouslyCreatedAttorneys([
      AttorneyFactory.create({ _id: '1', name: 'John Doe', email: 'john@example.com' }),
      AttorneyFactory.create({ _id: '2', name: 'Jane Roe', email: 'jane@example.com' }),
    ])

    await whenRetrievingAllAttorneys()

    thenIShouldHaveAllAttorneys([
      AttorneyFactory.create({ _id: '1', name: 'John Doe', email: 'john@example.com' }),
      AttorneyFactory.create({ _id: '2', name: 'Jane Roe', email: 'jane@example.com' }),
    ])
  })
})

const attorneyGateway = new FakeAttorneyGateway()
const store = createTestStore({ dependencies: { attorneyGateway } })

function givenPreviouslyCreatedAttorneys(previousAttorneys = []) {
  attorneyGateway.attorneys = previousAttorneys
}

async function whenRetrievingAllAttorneys() {
  await getAttorneysUsecase()(store)
}

function thenIShouldHaveAllAttorneys(expectedAttorneys = []) {
  expect(store.attorney.attorneys).toEqual(expectedAttorneys)
}
