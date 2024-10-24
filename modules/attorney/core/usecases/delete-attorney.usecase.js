export const deleteAttorney = async ({ id, attorneyGateway }) => {
  return await attorneyGateway.deleteAttorney(id)
}
