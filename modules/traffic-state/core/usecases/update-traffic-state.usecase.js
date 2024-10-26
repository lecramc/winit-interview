export const updateTrafficStateUsecase = (updatedData) => async (store) => {
  await store.trafficState.updateTrafficState(updatedData)
}
