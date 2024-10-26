export const registerUsecase =
  ({ name, email, password }) =>
  async (store) => {
    await store.auth.register({ name, email, password })
  }
