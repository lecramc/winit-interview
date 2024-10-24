export const deleteAttorneyPriceMap = async ({ id, attorneyPriceMapGateway }) => {
  return await attorneyPriceMapGateway.deleteAttorneyPriceMap(id)
}
