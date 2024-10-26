export const getUserUsecase = (id) => async (store) => {
  await store.auth.getUser(id)
}
