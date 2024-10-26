export const deleteViolationUsecase = (id) => async (store) => {
  await store.violation.deleteViolation(id)
}
