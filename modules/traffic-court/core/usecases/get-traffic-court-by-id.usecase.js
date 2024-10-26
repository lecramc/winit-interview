export const getTrafficCourtByIdUsecase = (id) => async (store) => {
  return await store.trafficCourt.getTrafficCourtById(id)
}
