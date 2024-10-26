export const deleteTrafficCountyUsecase = (id) => async (store) => {
  await store.trafficCounty.deleteTrafficCounty(id)
}
