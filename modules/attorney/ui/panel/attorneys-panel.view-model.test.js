import createTestStore from '@/modules/app/stores/TestStore'

import { describe, expect, test } from 'vitest'
import {
  attorneyViewModel,
  AttorneyViewModelType,
} from '@/modules/attorney/ui/panel/attorneys-panel.view-model.js'

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

    const attorneyStore = store.attorney
    console.log(attorneyStore)
    const viewModel = attorneyViewModel(attorneyStore)

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
    const attorneyStore = store.attorney

    const viewModel = attorneyViewModel(attorneyStore)

    expect(viewModel).toEqual({
      type: AttorneyViewModelType.WithoutAttorneys,
    })
  })

  test('When state is fulfilled, ViewModel type is loaded with attorneys', () => {
    const attorneysData = [
      { _id: '1', name: 'John Doe', email: 'john@example.com', address: '', phone: '' },
    ]

    const store = createTestStore({
      initialState: {
        attorney: {
          attorneys: attorneysData,
          state: 'fulfilled',
        },
      },
    })

    const attorneyStore = store.attorney

    const viewModel = attorneyViewModel(attorneyStore)

    expect(viewModel).toEqual({
      type: AttorneyViewModelType.WithAttorneys,
      attorneys: attorneysData,
    })
  })
})
