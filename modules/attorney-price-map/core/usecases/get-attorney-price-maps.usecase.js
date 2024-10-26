export const getAttorneyPriceMapsUsecase = () => async (store) => {
  await store.attorneyPriceMap.fetchAttorneyPriceMaps()
}
