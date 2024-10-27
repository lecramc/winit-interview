import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeAttorneyPriceMapGateway } from '@/modules/attorney-price-map/core/gateways-infra/fake-attorney-price-map.gateway.js'
import { AttorneyPriceMapFactory } from '@/modules/attorney-price-map/core/factories/attorney-price-map.factory.js'
import { deleteAttorneyPriceMapUsecase } from '@/modules/attorney-price-map/core/usecases/delete-attorney-price-map.usecase.js'

describe('Feature: delete attorney price map', () => {
  test('User deletes an attorney price map', async () => {
    givenPreviouslyCreatedPriceMaps([
      AttorneyPriceMapFactory.create({ _id: '1', price: 250 }),
      AttorneyPriceMapFactory.create({ _id: '2', price: 300 }),
    ])

    await whenDeletingPriceMap('1')

    thenPriceMapShouldBeDeleted([AttorneyPriceMapFactory.create({ _id: '2', price: 300 })])
  })
})
const initialState = {
  attorneyPriceMap: {
    priceMaps: [
      AttorneyPriceMapFactory.create({ _id: '1', price: 250 }),
      AttorneyPriceMapFactory.create({ _id: '2', price: 300 }),
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
  await deleteAttorneyPriceMapUsecase(id)(store)
}

function thenPriceMapShouldBeDeleted(expectedPriceMaps) {
  expect(store.attorneyPriceMap.priceMaps).toEqual(expectedPriceMaps)
  expect(priceMapGateway.attorneyPriceMaps).toEqual(expectedPriceMaps)
}
