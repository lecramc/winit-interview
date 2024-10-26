export const updateViolationUsecase = (updatedData) => async (store) => {
  await store.violation.updateViolation(updatedData)
}
