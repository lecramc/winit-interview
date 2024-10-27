import createTestStore from '@/modules/app/stores/TestStore'
import { describe, expect, test } from 'vitest'
import {
  attorneyPriceMapViewModel,
  attorneyPriceMapViewModelType,
} from '@/modules/attorney/ui/panel/attorney-price-maps.view-model.js'
import { PriceMapFactory } from '@/modules/attorney/core/factories/price-map.factory.js'

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

    const priceMapsStore = store.attorneyPriceMap

    const viewModel = attorneyPriceMapViewModel(priceMapsStore)

    expect(viewModel).toEqual({
      type: attorneyPriceMapViewModelType.Loading,
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

    const priceMapsStore = store.attorneyPriceMap

    const viewModel = attorneyPriceMapViewModel(priceMapsStore)

    expect(viewModel).toEqual({
      type: attorneyPriceMapViewModelType.WithoutPriceMaps,
    })
  })

  test('When state is fulfilled, ViewModel type is WithPriceMaps and contains price maps', () => {
    const priceMapsData = [
      PriceMapFactory.create({
        _id: '1',
        attorney: { name: 'John Doe' },
        court: { name: 'Court A' },
        county: { name: 'County X' },
        violation: { description: 'Speeding' },
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

    const priceMapsStore = store.attorneyPriceMap

    const viewModel = attorneyPriceMapViewModel(priceMapsStore)

    expect(viewModel).toEqual({
      type: attorneyPriceMapViewModelType.WithPriceMaps,
      priceMaps: priceMapsData,
    })
  })
})
