export const updateAttorneyPriceMap = async ({ updatedAttorneyData, attorneyPriceMapGateway }) => {
  return await attorneyPriceMapGateway.updateAttorneyPriceMap(updatedAttorneyData)
}
