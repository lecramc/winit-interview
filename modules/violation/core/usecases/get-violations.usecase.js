export const getViolationsUsecase = () => async (store) => {
  await store.violation.fetchViolations()
}
