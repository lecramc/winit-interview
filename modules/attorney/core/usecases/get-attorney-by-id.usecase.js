export const getAttorneyByIdUsecase = (id) => async (store) => {
  await store.attorney.getAttorneyById(id)
}
