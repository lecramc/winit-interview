import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeAttorneyPriceMapGateway } from '@/modules/attorney-price-map/core/gateways-infra/fake-attorney-price-map.gateway.js'
import { AttorneyPriceMapFactory } from '@/modules/attorney-price-map/core/factories/attorney-price-map.factory.js'
import { getAttorneyPriceMapByIdUsecase } from '@/modules/attorney-price-map/core/usecases/get-attorney-price-map-by-id.usecase.js'

describe('Feature: retrieve attorney price map by id', () => {
  test('User retrieves an attorney price map by ID', async () => {
    givenExistingPriceMaps([
      AttorneyPriceMapFactory.create({ _id: '1', price: 250 }),
      AttorneyPriceMapFactory.create({ _id: '2', price: 250 }),
    ])

    await whenRetrievingPriceMapById('1')

    thenIShouldHavePriceMapInStore(AttorneyPriceMapFactory.create({ _id: '1', price: 250 }))
  })
})

const priceMapGateway = new FakeAttorneyPriceMapGateway()
const store = createTestStore({
  dependencies: { attorneyPriceMapGateway: priceMapGateway },
})

function givenExistingPriceMaps(existingPriceMaps = []) {
  priceMapGateway.attorneyPriceMaps = existingPriceMaps
}

async function whenRetrievingPriceMapById(id) {
  await getAttorneyPriceMapByIdUsecase(id)(store)
}

function thenIShouldHavePriceMapInStore(expectedPriceMap) {
  expect(store.attorneyPriceMap.selectedPriceMap).toEqual(expectedPriceMap)
}
