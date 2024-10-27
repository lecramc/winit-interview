export const RegisterViewModelType = {
  Idle: 'Idle',
  Loading: 'Loading',
  Rejected: 'Rejected',
  Success: 'Success',
}

export const registerViewModel = (store) => {
  const registrationState = store.auth.registrationState
  const errorMessage = store.auth.errorMessage

  if (registrationState === 'pending') {
    return { type: RegisterViewModelType.Loading }
  }

  if (registrationState === 'rejected') {
    return { type: RegisterViewModelType.Rejected, errorMessage: errorMessage }
  }

  if (registrationState === 'fulfilled') {
    return { type: RegisterViewModelType.Success }
  }

  return { type: RegisterViewModelType.Idle }
}
