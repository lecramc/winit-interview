import createTestStore from '@/modules/app/stores/TestStore'
import { describe, expect, test } from 'vitest'

import { AttorneyFactory } from '@/modules/attorney/core/entities/attorney.factory'
import {
  attorneyDrawerViewModel,
  AttorneyDrawerViewModelType,
} from '@/modules/attorney/ui/panel/components/attorney-drawer.viewmodel.js'

describe('AttorneyModalViewModel tests', () => {
  test('When selectedAttorney state is pending, ViewModel type is Loading', () => {
    const store = createTestStore({
      initialState: {
        attorney: {
          attorneys: [],
          selectedAttorney: null,
          state: 'pending',
        },
      },
    })

    const viewModel = attorneyDrawerViewModel(store)

    expect(viewModel).toEqual({
      type: AttorneyDrawerViewModelType.Loading,
    })
  })

  test('When selectedAttorney state is rejected, ViewModel type is Rejected', () => {
    const store = createTestStore({
      initialState: {
        attorney: {
          attorneys: [],
          selectedAttorney: null,
          state: 'rejected',
        },
      },
    })

    const viewModel = attorneyDrawerViewModel(store)

    expect(viewModel).toEqual({
      type: AttorneyDrawerViewModelType.Rejected,
    })
  })

  test('When no selectedAttorney and state is fulfilled, ViewModel type is Create', () => {
    const store = createTestStore({
      initialState: {
        attorney: {
          attorneys: [],
          selectedAttorney: null,
          state: 'fulfilled',
        },
      },
    })

    const viewModel = attorneyDrawerViewModel(store)

    expect(viewModel).toEqual({
      type: AttorneyDrawerViewModelType.Create,
    })
  })

  test('When selectedAttorney exists and state is fulfilled, ViewModel type is Edit', () => {
    const selectedAttorneyData = AttorneyFactory.create({
      _id: '1',
      name: 'Jane Doe',
      email: 'jane@example.com',
      address: '456 Maple St',
      phone: '555-5678',
    })

    const store = createTestStore({
      initialState: {
        attorney: {
          attorneys: [selectedAttorneyData],
          selectedAttorney: selectedAttorneyData,
          state: 'fulfilled',
        },
      },
    })

    const viewModel = attorneyDrawerViewModel(store)

    expect(viewModel).toEqual({
      type: AttorneyDrawerViewModelType.Edit,
      attorney: selectedAttorneyData,
      priceMaps: [],
    })
  })
})
