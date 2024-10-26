import { z } from 'zod'
import { AttorneyGateway } from '@/modules/attorney/core/gateways/attorney.gateway.js'
import axios from '@/modules/app/axios.js'

export const attorneyDto = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  address: z.optional(z.string()),
  phone: z.optional(z.string()),
  enabled: z.boolean(),
})

const responseDto = z.object({
  success: z.boolean(),
  data: attorneyDto,
})

const responseArrayDto = z.object({
  success: z.boolean(),
  data: z.array(attorneyDto),
})

export class HttpAttorneyGateway extends AttorneyGateway {
  async getAttorneys() {
    const unvalidatedResponse = await axios.get('/attorney-data')
    const result = responseArrayDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to fetch attorneys')
    }
    return result.data.data
  }

  async deleteAttorney(id) {
    const unvalidatedResponse = await axios.delete(`/attorney-data/${id}`)
    const result = responseDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to delete attorney')
    }
    return result.data.data
  }

  async getAttorneyById(id) {
    const unvalidatedResponse = await axios.get(`/attorney-data/${id}`)
    const result = responseDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to fetch attorney by ID')
    }
    return result.data.data
  }

  async createAttorney(attorneyData) {
    const unvalidatedResponse = await axios.post('/attorney-data', attorneyData)
    const result = responseDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to create attorney')
    }
    return result.data.data
  }

  async updateAttorney(attorneyData) {
    const unvalidatedResponse = await axios.put(`/attorney-data/${attorneyData._id}`, attorneyData)
    const result = responseDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to update attorney')
    }
    return result.data.data
  }
}
