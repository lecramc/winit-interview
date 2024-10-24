export const createAttorneyPriceMap = async ({ newAttorneyData, attorneyPriceMapGateway }) => {
  return await attorneyPriceMapGateway.createAttorneyPriceMap(newAttorneyData)
}
