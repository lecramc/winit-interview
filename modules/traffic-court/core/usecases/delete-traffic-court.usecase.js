export const deleteTrafficCourtUsecase = (id) => async (store) => {
  await store.trafficCourt.deleteTrafficCourt(id)
}
