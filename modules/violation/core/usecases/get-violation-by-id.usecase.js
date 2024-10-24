export const getViolationById = async (id, gateway) => {
  return await gateway.getViolationById(id)
}
