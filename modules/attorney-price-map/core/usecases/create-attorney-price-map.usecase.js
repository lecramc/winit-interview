export const createAttorneyPriceMapUsecase = (newAttorneyData) => async (store) => {
  await store.attorneyPriceMap.createAttorneyPriceMap(newAttorneyData)
}
