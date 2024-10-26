export const deleteAttorneyPriceMapUsecase = (id) => async (store) => {
  await store.attorneyPriceMap.deleteAttorneyPriceMap(id)
}
