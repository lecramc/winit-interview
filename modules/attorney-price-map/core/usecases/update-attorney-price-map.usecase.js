export const updateAttorneyPriceMapUsecase = (updatedAttorneyData) => async (store) => {
  await store.attorneyPriceMap.updateAttorneyPriceMap(updatedAttorneyData)
}
