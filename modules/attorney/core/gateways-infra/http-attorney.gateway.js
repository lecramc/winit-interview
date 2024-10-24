import { z } from 'zod'
import { AttorneyGateway } from '@/modules/attorney/core/gateways/attorney.gateway.js'

const getAttorneysDto = z.object({
  success: z.boolean(),
  data: z.array(
    z.object({
      _id: z.string(),
      name: z.string(),
      email: z.string(),
      address: z.optional(z.string()),
      phone: z.optional(z.string()),
      enabled: z.boolean(),
    }),
  ),
})

export class HttpAttorneyGateway extends AttorneyGateway {
  async getAttorneys() {
    const unvalidatedResponse = await fetch(`${process.env.API_URL}/api/attorney-data`)
    const unvalidatedJson = await unvalidatedResponse.json()
    const result = getAttorneysDto.safeParse(unvalidatedJson)
    if (!result.success) {
      throw new Error('Failed to fetch attorneys')
    }
    return result.data.data
  }
}
