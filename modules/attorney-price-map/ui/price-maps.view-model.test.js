import createTestStore from '@/modules/app/stores/TestStore'
import { describe, expect, test } from 'vitest'

import {
  priceMapsViewModel,
  PriceMapsViewModelType as priceMapsViewModelType,
} from '@/modules/attorney-price-map/ui/price-maps.view-model.js'
import { AttorneyPriceMapFactory } from '@/modules/attorney-price-map/core/factories/attorney-price-map.factory.js'

describe('attorneyPriceMapViewModel tests', () => {
  test('When state is pending, ViewModel type is Loading', () => {
    const store = createTestStore({
      initialState: {
        attorneyPriceMap: {
          priceMaps: [],
          state: 'pending',
        },
      },
    })

    const viewModel = priceMapsViewModel(store)

    expect(viewModel).toEqual({
      type: priceMapsViewModelType.Loading,
    })
  })

  test('When state is fulfilled and without price maps, ViewModel type is WithoutPriceMaps', () => {
    const store = createTestStore({
      initialState: {
        attorneyPriceMap: {
          priceMaps: [],
          state: 'fulfilled',
        },
      },
    })

    const viewModel = priceMapsViewModel(store)

    expect(viewModel).toEqual({
      type: priceMapsViewModelType.WithoutPriceMaps,
    })
  })

  test('When state is fulfilled, ViewModel type is WithPriceMaps and contains price maps', () => {
    const priceMapsData = [
      AttorneyPriceMapFactory.create({
        _id: '1',
        pointsRange: [1, 3],
        price: 250,
      }),
    ]

    const store = createTestStore({
      initialState: {
        attorneyPriceMap: {
          priceMaps: priceMapsData,
          state: 'fulfilled',
        },
      },
    })

    const viewModel = priceMapsViewModel(store)

    expect(viewModel).toEqual({
      type: priceMapsViewModelType.WithPriceMaps,
      priceMaps: priceMapsData,
    })
  })
})
