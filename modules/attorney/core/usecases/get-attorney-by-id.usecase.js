export const getAttorneyById = async ({ id, attorneyGateway }) => {
  return await attorneyGateway.getAttorneyById(id)
}
