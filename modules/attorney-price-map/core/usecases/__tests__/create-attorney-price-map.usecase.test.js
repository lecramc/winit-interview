import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { FakeAttorneyPriceMapGateway } from '@/modules/attorney-price-map/core/gateways-infra/fake-attorney-price-map.gateway.js'
import { AttorneyPriceMapFactory } from '@/modules/attorney-price-map/core/entities/attorney-price-map.factory.js'

describe('Feature: create attorney price map', () => {
  test('User creates a new attorney price map', async () => {
    const newPriceMapData = AttorneyPriceMapFactory.create({
      _id: '3',
      attorney: '1',
      court: '1',
      pointsRange: [1, 3],
      price: 350,
    })

    await whenCreatingNewPriceMap(newPriceMapData)

    thenIShouldHavePriceMapInStore([newPriceMapData])
  })
})

const priceMapGateway = new FakeAttorneyPriceMapGateway()
const store = createTestStore({ dependencies: { attorneyPriceMapGateway: priceMapGateway } })

async function whenCreatingNewPriceMap(priceMapData) {
  await store.attorneyPriceMap.createAttorneyPriceMap(priceMapData)
}

function thenIShouldHavePriceMapInStore(expectedPriceMap) {
  expect(store.attorneyPriceMap.priceMaps).toEqual(expectedPriceMap)
  expect(priceMapGateway.attorneyPriceMaps).toEqual(expectedPriceMap)
}
