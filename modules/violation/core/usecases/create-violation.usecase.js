export const createViolationUsecase = (data) => async (store) => {
  return await store.violation.createViolation(data)
}
