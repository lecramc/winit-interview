export const createViolation = async (data, gateway) => {
  return await gateway.createViolation(data)
}
