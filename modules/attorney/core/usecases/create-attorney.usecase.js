export const createAttorneyUsecase = (newAttorneyData) => async (store) => {
  await store.attorney.createAttorney(newAttorneyData)
}
