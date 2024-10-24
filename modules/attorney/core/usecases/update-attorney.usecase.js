export const updateAttorney = async ({ updatedAttorneyData, attorneyGateway }) => {
  return await attorneyGateway.updateAttorney(updatedAttorneyData)
}
