import createTestStore from '@/modules/app/stores/TestStore'
import { describe, expect, test } from 'vitest'
import {
  registerViewModel,
  RegisterViewModelType,
} from '@/modules/auth/ui/Register/register.viewmodel.js'

describe('RegisterViewModel tests', () => {
  test('When state is idle, ViewModel type is Idle and onSubmit is defined', () => {
    const store = createTestStore({
      initialState: {
        auth: {
          registrationState: 'idle',
        },
      },
    })

    const viewModel = registerViewModel(store)

    expect(viewModel).toEqual({
      type: RegisterViewModelType.Idle,
    })
  })
  test('When state is pending, ViewModel type is Loading', () => {
    const store = createTestStore({
      initialState: {
        auth: {
          registrationState: 'pending',
        },
      },
    })

    const viewModel = registerViewModel(store)

    expect(viewModel).toEqual({
      type: RegisterViewModelType.Loading,
    })
  })

  test('When state is error, ViewModel type is Error with errorMessage', () => {
    const store = createTestStore({
      initialState: {
        auth: {
          registrationState: 'rejected',
          errorMessage: 'Invalid credentials',
        },
      },
    })

    const viewModel = registerViewModel(store)

    expect(viewModel).toEqual({
      type: RegisterViewModelType.Rejected,
      errorMessage: 'Invalid credentials',
    })
  })

  test('When state is fulfilled, ViewModel type is Success', () => {
    const store = createTestStore({
      initialState: {
        auth: {
          registrationState: 'fulfilled',
        },
      },
    })

    const viewModel = registerViewModel(store)

    expect(viewModel).toEqual({
      type: RegisterViewModelType.Success,
    })
  })
})
