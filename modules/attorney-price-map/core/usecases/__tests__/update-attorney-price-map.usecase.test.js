import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeAttorneyPriceMapGateway } from '@/modules/attorney-price-map/core/gateways-infra/fake-attorney-price-map.gateway.js'
import { updateAttorneyPriceMapUsecase } from '@/modules/attorney-price-map/core/usecases/update-attorney-price-map.usecase.js'
import { AttorneyPriceMapFactory } from '@/modules/attorney-price-map/core/factories/attorney-price-map.factory.js'

describe('Feature: update attorney price map', () => {
  test('User updates an existing attorney price map', async () => {
    givenPreviouslyCreatedPriceMaps([
      AttorneyPriceMapFactory.create({ _id: '1', pointsRange: [1, 3], price: 250 }),
      AttorneyPriceMapFactory.create({ _id: '2', pointsRange: [4, 6], price: 300 }),
    ])

    await whenUpdatingPriceMap(
      AttorneyPriceMapFactory.create({ _id: '1', pointsRange: [1, 3], price: 300 }),
    )

    thenPriceMapShouldBeUpdated(
      AttorneyPriceMapFactory.create({ _id: '1', pointsRange: [1, 3], price: 300 }),
    )
  })
})
const initialState = {
  attorneyPriceMap: {
    priceMaps: [
      AttorneyPriceMapFactory.create({ _id: '1', pointsRange: [1, 3], price: 250 }),
      AttorneyPriceMapFactory.create({ _id: '2', pointsRange: [4, 6], price: 300 }),
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

async function whenUpdatingPriceMap(updatedData) {
  await updateAttorneyPriceMapUsecase(updatedData)(store)
}

function thenPriceMapShouldBeUpdated(updatedData) {
  const updatedPriceMap = store.attorneyPriceMap.priceMaps.find(
    (priceMap) => priceMap._id === updatedData._id,
  )
  expect(updatedPriceMap).toEqual(updatedData)
}
