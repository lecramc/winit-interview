export const updateTrafficCountyUsecase = (data) => async (store) => {
  await store.trafficCounty.updateTrafficCounty(data)
}
