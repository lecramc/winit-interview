export const createTrafficStateUsecase = (stateData) => async (store) => {
  await store.trafficState.createTrafficState(stateData)
}
