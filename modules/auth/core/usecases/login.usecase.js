export const loginUsecase =
  ({ email, password }) =>
  async (store) => {
    await store.auth.login({ email, password })
  }
