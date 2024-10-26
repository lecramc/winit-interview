export const getTrafficCourtsUsecase = () => async (store) => {
  await store.trafficCourt.fetchTrafficCourts()
}
