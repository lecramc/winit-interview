import { beforeEach, describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { HttpAttorneyPriceMapGateway } from '@/modules/attorney-price-map/core/gateways-infra/http-attorney-price-map.gateway.js'
import { beforeEachConfig } from '@/modules/app/utils/beforEachConfig.js'
import { createAttorneyPriceMapUsecase } from '@/modules/attorney-price-map/core/usecases/create-attorney-price-map.usecase.js'
import { getAttorneyPriceMapsUsecase } from '@/modules/attorney-price-map/core/usecases/get-attorney-price-maps.usecase.js'
import { updateAttorneyPriceMapUsecase } from '@/modules/attorney-price-map/core/usecases/update-attorney-price-map.usecase.js'
import { deleteAttorneyPriceMapUsecase } from '@/modules/attorney-price-map/core/usecases/delete-attorney-price-map.usecase.js'
import { getAttorneyPriceMapByIdUsecase } from '@/modules/attorney-price-map/core/usecases/get-attorney-price-map-by-id.usecase.js'

let store

beforeEach(async () => {
  await beforeEachConfig()

  const gateway = new HttpAttorneyPriceMapGateway()
  store = createTestStore({
    dependencies: { attorneyPriceMapGateway: gateway },
  })
  await getAttorneyPriceMapsUsecase()(store)
})

describe('Integration Test: API with Test DB for AttorneyPriceMap', () => {
  test('Create PriceMap', async () => {
    const priceMap = store.attorneyPriceMap.priceMaps[0]
    const newPriceMap = {
      court: priceMap.court,
      county: priceMap.county,
      attorney: priceMap.attorney,
      pointsRange: [1, 3],
      price: 300,
    }
    await createAttorneyPriceMapUsecase(newPriceMap)(store)
    expect(store.attorneyPriceMap.state).toBe('fulfilled')
  })

  test('Get PriceMaps', async () => {
    await getAttorneyPriceMapsUsecase()(store)
    expect(store.attorneyPriceMap.state).toBe('fulfilled')
  })

  test('Update PriceMap', async () => {
    const priceMapToUpdate = store.attorneyPriceMap.priceMaps[0]
    const updatedData = {
      ...priceMapToUpdate,
      price: 500,
    }
    await updateAttorneyPriceMapUsecase(updatedData)(store)
    expect(store.attorneyPriceMap.state).toBe('fulfilled')
  })

  test('Delete PriceMap', async () => {
    const priceMapToDelete = store.attorneyPriceMap.priceMaps[1]

    await deleteAttorneyPriceMapUsecase(priceMapToDelete._id)(store)
    expect(store.attorneyPriceMap.state).toBe('fulfilled')
  })

  test('Get PriceMap by ID', async () => {
    const priceMapId = store.attorneyPriceMap.priceMaps[0]._id

    await getAttorneyPriceMapByIdUsecase(priceMapId)(store)
    expect(store.attorneyPriceMap.state).toBe('fulfilled')
  })
})
