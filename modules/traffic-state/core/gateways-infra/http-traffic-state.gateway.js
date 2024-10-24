import { z } from 'zod'
import axios from '@/modules/app/axios.js'
import { ViolationGateway } from '@/modules/violation/core/gateways/violation.gateway.js'

const attorneyDto = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  address: z.optional(z.string()),
  phone: z.optional(z.string()),
  enabled: z.boolean(),
})
const deleteAttorneyDto = z.object({
  success: z.boolean(),
  data: attorneyDto,
})
const getAttorneysDto = z.object({
  success: z.boolean(),
  data: z.array(attorneyDto),
})

export class HttpTrafficStateGateway extends ViolationGateway {
  async getAttorneys() {
    const unvalidatedResponse = await axios.get('/attorney-data')
    const result = getAttorneysDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to fetch attorneys')
    }
    return result.data.data
  }
  async deleteAttorney(id) {
    const unvalidatedResponse = await axios.delete(`/attorney-data/${id}`, { enabled: false })

    const result = deleteAttorneyDto.safeParse(unvalidatedResponse.data)

    if (!result.success) {
      throw new Error('Failed to delete attorney')
    }
    return result.data.data
  }
}
