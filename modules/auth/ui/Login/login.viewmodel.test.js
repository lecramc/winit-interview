import createTestStore from '@/modules/app/stores/TestStore'
import { describe, expect, test } from 'vitest'
import { loginViewModel, LoginViewModelType } from '@/modules/auth/ui/Login/login.viewmodel.js'

describe('LoginViewModel tests', () => {
  test('When state is idle, ViewModel type is Idle and onSubmit is defined', () => {
    const store = createTestStore({
      initialState: {
        auth: {
          authState: 'idle',
        },
      },
    })

    const viewModel = loginViewModel(store)

    expect(viewModel).toEqual({
      type: LoginViewModelType.Idle,
    })
  })
  test('When state is pending, ViewModel type is Loading', () => {
    const store = createTestStore({
      initialState: {
        auth: {
          authState: 'pending',
        },
      },
    })

    const viewModel = loginViewModel(store)

    expect(viewModel).toEqual({
      type: LoginViewModelType.Loading,
    })
  })

  test('When state is error, ViewModel type is Error with errorMessage', () => {
    const store = createTestStore({
      initialState: {
        auth: {
          authState: 'rejected',
          errorMessage: 'Invalid credentials',
        },
      },
    })

    const viewModel = loginViewModel(store)

    expect(viewModel).toEqual({
      type: LoginViewModelType.Rejected,
      errorMessage: 'Invalid credentials',
    })
  })

  test('When state is fulfilled, ViewModel type is Success', () => {
    const store = createTestStore({
      initialState: {
        auth: {
          authState: 'fulfilled',
        },
      },
    })

    const viewModel = loginViewModel(store)

    expect(viewModel).toEqual({
      type: LoginViewModelType.Success,
    })
  })
})
