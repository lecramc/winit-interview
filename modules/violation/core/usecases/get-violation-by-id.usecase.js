export const getViolationByIdUsecase = (id) => async (store) => {
  await store.violation.getViolationById(id)
}
