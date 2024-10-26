export const deleteTrafficStateUsecase = (id) => async (store) => {
  await store.trafficState.deleteTrafficState(id)
}
