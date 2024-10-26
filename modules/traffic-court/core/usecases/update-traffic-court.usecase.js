export const updateTrafficCourtUsecase = (updatedData) => async (store) => {
  await store.trafficCourt.updateTrafficCourt(updatedData)
}
