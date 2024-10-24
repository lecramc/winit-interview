export const createAttorney = async ({ newAttorneyData, attorneyGateway }) => {
  return await attorneyGateway.createAttorney(newAttorneyData)
}
