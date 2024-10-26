export const updateAttorneyUsecase = (updatedAttorneyData) => async (store) => {
  await store.attorney.updateAttorney(updatedAttorneyData)
}
