import createTestStore from '@/modules/app/stores/TestStore.js'

import { describe, expect, test } from 'vitest'
import {
  attorneyViewModel,
  AttorneyViewModelType,
} from '@/modules/attorney/ui/attorneys-panel.view-model.js'
import { AttorneyFactory } from '@/modules/attorney/core/factories/attorney.factory.js'

describe('AttorneyViewModel tests', () => {
  test('When state is pending, ViewModel type is Loading', () => {
    const store = createTestStore({
      initialState: {
        attorney: {
          attorneys: [],
          state: 'pending',
        },
      },
    })

    const viewModel = attorneyViewModel(store)

    expect(viewModel).toEqual({
      type: AttorneyViewModelType.Loading,
    })
  })
  test('When state is fulfilled and without attorneys, ViewModel type is WithoutAttorneys', () => {
    const store = createTestStore({
      initialState: {
        attorney: {
          attorneys: [],
          state: 'fulfilled',
        },
      },
    })

    const viewModel = attorneyViewModel(store)

    expect(viewModel).toEqual({
      type: AttorneyViewModelType.WithoutAttorneys,
    })
  })

  test('When state is fulfilled, ViewModel type is loaded with attorneys', () => {
    const attorneysData = [
      AttorneyFactory.create({
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        address: '',
        phone: '',
      }),
    ]

    const store = createTestStore({
      initialState: {
        attorney: {
          attorneys: attorneysData,
          state: 'fulfilled',
        },
      },
    })

    const viewModel = attorneyViewModel(store)

    expect(viewModel).toEqual({
      type: AttorneyViewModelType.WithAttorneys,
      attorneys: attorneysData,
    })
  })
})
