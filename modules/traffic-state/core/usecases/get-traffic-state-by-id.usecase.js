export const getTrafficStateByIdUsecase = (id) => async (store) => {
  await store.trafficState.getTrafficStateById(id)
}
