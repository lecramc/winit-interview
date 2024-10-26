export const getAttorneyPriceMapByIdUsecase = (id) => async (store) => {
  await store.attorneyPriceMap.getAttorneyPriceMapById(id)
}
