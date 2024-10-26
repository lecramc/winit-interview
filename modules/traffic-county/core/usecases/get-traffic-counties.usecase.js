export const getTrafficCountiesUsecase = () => async (store) => {
  await store.trafficCounty.fetchTrafficCounties()
}
