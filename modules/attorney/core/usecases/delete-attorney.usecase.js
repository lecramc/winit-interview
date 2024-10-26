export const deleteAttorneyUsecase = (id) => async (store) => {
  await store.attorney.deleteAttorney(id)
}
