export const getAttorneyPriceMapById = async ({ id, attorneyPriceMapGateway }) => {
  return await attorneyPriceMapGateway.getAttorneyPriceMapById(id)
}
