import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeAttorneyPriceMapGateway } from '@/modules/attorney-price-map/core/gateways-infra/fake-attorney-price-map.gateway.js'
import { AttorneyPriceMapFactory } from '@/modules/attorney-price-map/core/entities/attorney-price-map.factory.js'

describe('Feature: delete attorney price map', () => {
  test('User deletes an attorney price map', async () => {
    givenPreviouslyCreatedPriceMaps([
      AttorneyPriceMapFactory.create({ _id: '1', attorney: '1', court: '1', price: 250 }),
      AttorneyPriceMapFactory.create({ _id: '2', attorney: '1', county: '1', price: 300 }),
    ])

    await whenDeletingPriceMap('1')

    thenPriceMapShouldBeDeleted([
      AttorneyPriceMapFactory.create({ _id: '2', attorney: '1', county: '1', price: 300 }),
    ])
  })
})
const initialState = {
  attorneyPriceMap: {
    priceMaps: [
      AttorneyPriceMapFactory.create({ _id: '1', attorney: '1', court: '1', price: 250 }),
      AttorneyPriceMapFactory.create({ _id: '2', attorney: '1', county: '1', price: 300 }),
    ],
  },
}
const priceMapGateway = new FakeAttorneyPriceMapGateway()
const store = createTestStore({
  initialState,
  dependencies: { attorneyPriceMapGateway: priceMapGateway },
})

function givenPreviouslyCreatedPriceMaps(previousPriceMaps = []) {
  priceMapGateway.attorneyPriceMaps = previousPriceMaps
}

async function whenDeletingPriceMap(id) {
  await store.attorneyPriceMap.deleteAttorneyPriceMap(id)
}

function thenPriceMapShouldBeDeleted(expectedPriceMaps) {
  expect(store.attorneyPriceMap.priceMaps).toEqual(expectedPriceMaps)
  expect(priceMapGateway.attorneyPriceMaps).toEqual(expectedPriceMaps)
}
