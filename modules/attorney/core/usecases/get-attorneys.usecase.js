export const getAttorneysUsecase = () => async (store) => {
  await store.attorney.fetchAttorneys()
}
