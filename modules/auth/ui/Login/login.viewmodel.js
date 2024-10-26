export const LoginViewModelType = {
  Idle: 'Idle',
  Loading: 'Loading',
  Rejected: 'Rejected',
  Success: 'Success',
}

export const loginViewModel = (store) => {
  const authState = store.auth.authState
  const errorMessage = store.auth.errorMessage

  if (authState === 'pending') {
    return { type: LoginViewModelType.Loading }
  }

  if (authState === 'rejected') {
    return { type: LoginViewModelType.Rejected, errorMessage: errorMessage }
  }

  if (authState === 'fulfilled') {
    return { type: LoginViewModelType.Success }
  }

  return { type: LoginViewModelType.Idle }
}
