import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { AttorneyFactory } from '@/modules/attorney/core/entities/attorney.factory.js'
import { FakeAttorneyGateway } from '@/modules/attorney/core/gateways-infra/fake-attorney.gateway.js'

describe('Feature: retrieve attorney by ID', () => {
  test('User retrieves an attorney by ID', async () => {
    givenPreviouslyCreatedAttorneys([
      AttorneyFactory.create({ _id: '1', name: 'John Doe', email: 'john@example.com' }),
    ])

    await whenRetrievingAttorneyById('1')

    thenIShouldHaveRetrievedAttorney(
      AttorneyFactory.create({ _id: '1', name: 'John Doe', email: 'john@example.com' }),
    )
  })
})

const attorneyGateway = new FakeAttorneyGateway()
const store = createTestStore({ dependencies: { attorneyGateway } })

function givenPreviouslyCreatedAttorneys(previousAttorneys = []) {
  attorneyGateway.attorneys = previousAttorneys
}

async function whenRetrievingAttorneyById(id) {
  await store.attorney.getAttorneyById(id)
}

function thenIShouldHaveRetrievedAttorney(expectedAttorney) {
  expect(store.attorney.selectedAttorney).toEqual(expectedAttorney)
}
