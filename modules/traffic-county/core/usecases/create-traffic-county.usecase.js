export const createTrafficCountyUsecase = (countyData) => async (store) => {
  await store.trafficCounty.createTrafficCounty(countyData)
}
