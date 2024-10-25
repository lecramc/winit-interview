import { beforeEach, describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { HttpAttorneyPriceMapGateway } from '@/modules/attorney-price-map/core/gateways-infra/http-attorney-price-map.gateway.js'
import mongoose from 'mongoose'
import { beforeEachConfig } from '@/modules/app/utils/beforEachConfig.js'

let store

beforeEach(async () => {
  await beforeEachConfig()

  const gateway = new HttpAttorneyPriceMapGateway()
  store = createTestStore({
    dependencies: { attorneyPriceMapGateway: gateway },
  })
  await store.attorneyPriceMap.fetchAttorneyPriceMaps()
})

describe('Integration Test: API with Test DB for AttorneyPriceMap', () => {
  test('Create PriceMap', async () => {
    const newPriceMap = {
      attorney: new mongoose.Types.ObjectId(),
      court: new mongoose.Types.ObjectId(),
      price: 400,
      pointsRange: [1, 4],
    }
    await store.attorneyPriceMap.createAttorneyPriceMap(newPriceMap)
    expect(store.attorneyPriceMap.state).toBe('fulfilled')
  })

  test('Get PriceMaps', async () => {
    await store.attorneyPriceMap.fetchAttorneyPriceMaps()
    expect(store.attorneyPriceMap.state).toBe('fulfilled')
  })

  test('Update PriceMap', async () => {
    const priceMapToUpdate = store.attorneyPriceMap.priceMaps[0]
    const updatedData = {
      ...priceMapToUpdate,
      price: 500,
    }
    await store.attorneyPriceMap.updateAttorneyPriceMap(updatedData)
    expect(store.attorneyPriceMap.state).toBe('fulfilled')
  })

  test('Delete PriceMap', async () => {
    const priceMapToDelete = store.attorneyPriceMap.priceMaps[1]

    await store.attorneyPriceMap.deleteAttorneyPriceMap(priceMapToDelete._id)
    expect(store.attorneyPriceMap.state).toBe('fulfilled')
  })

  test('Get PriceMap by ID', async () => {
    const priceMapId = store.attorneyPriceMap.priceMaps[0]._id

    await store.attorneyPriceMap.getAttorneyPriceMapById(priceMapId)
    expect(store.attorneyPriceMap.state).toBe('fulfilled')
  })
})
