export const createTrafficCourtUsecase = (courtData) => async (store) => {
  await store.trafficCourt.createTrafficCourt(courtData)
}
