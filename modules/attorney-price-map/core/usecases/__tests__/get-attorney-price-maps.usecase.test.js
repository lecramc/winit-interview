import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeAttorneyPriceMapGateway } from '@/modules/attorney-price-map/core/gateways-infra/fake-attorney-price-map.gateway.js'
import { AttorneyPriceMapFactory } from '@/modules/attorney-price-map/core/factories/attorney-price-map.factory.js'
import { getAttorneyPriceMapsUsecase } from '@/modules/attorney-price-map/core/usecases/get-attorney-price-maps.usecase.js'

describe('Feature: retrieve attorney price maps', () => {
  test('User retrieves all attorney price maps', async () => {
    givenPreviouslyCreatedPriceMaps([
      AttorneyPriceMapFactory.create({
        _id: '1',

        pointsRange: [1, 3],
        price: 250,
      }),
      AttorneyPriceMapFactory.create({
        _id: '2',

        pointsRange: [4, 6],
        price: 300,
      }),
    ])

    await whenRetrievingAllPriceMaps()

    thenIShouldHaveAllPriceMaps([
      AttorneyPriceMapFactory.create({
        _id: '1',
        pointsRange: [1, 3],
        price: 250,
      }),
      AttorneyPriceMapFactory.create({
        _id: '2',

        pointsRange: [4, 6],
        price: 300,
      }),
    ])
  })
})

const priceMapGateway = new FakeAttorneyPriceMapGateway()
const store = createTestStore({ dependencies: { attorneyPriceMapGateway: priceMapGateway } })

function givenPreviouslyCreatedPriceMaps(previousPriceMaps = []) {
  priceMapGateway.attorneyPriceMaps = previousPriceMaps
}

async function whenRetrievingAllPriceMaps() {
  await getAttorneyPriceMapsUsecase()(store)
}

function thenIShouldHaveAllPriceMaps(expectedPriceMaps = []) {
  expect(store.attorneyPriceMap.priceMaps).toEqual(expectedPriceMaps)
}
