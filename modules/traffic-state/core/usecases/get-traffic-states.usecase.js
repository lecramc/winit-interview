export const getTrafficStatesUsecase = () => async (store) => {
  await store.trafficState.fetchTrafficStates()
}
