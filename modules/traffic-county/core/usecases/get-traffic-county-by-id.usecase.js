export const getTrafficCountyByIdUsecase = (id) => async (store) => {
  await store.trafficCounty.getTrafficCountyById(id)
}
