import { z } from 'zod'
import axios from '@/modules/app/axios.js'
import { ViolationGateway } from '@/modules/violation/core/gateways/violation.gateway.js'

const violationDto = z.object({
  _id: z.string(),
  name: z.string(),
  points: z.number(),
})

const responseDto = z.object({
  success: z.boolean(),
  data: z.union([violationDto, z.array(violationDto)]),
})

export class HttpViolationGateway extends ViolationGateway {
  async getViolations() {
    const response = await axios.get('/violation-data')
    const result = responseDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to fetch violations')
    }
    return result.data.data
  }

  async getViolationById(id) {
    const response = await axios.get(`/violation-data/${id}`)
    const result = responseDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to fetch violation by ID')
    }
    return result.data.data
  }

  async createViolation(violationData) {
    const response = await axios.post('/violation-data', violationData)
    const result = responseDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to create violation')
    }
    return result.data.data
  }

  async updateViolation(violationData) {
    const response = await axios.put(`/violation-data/${violationData._id}`, violationData)
    const result = responseDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to update violation')
    }
    return result.data.data
  }

  async deleteViolation(id) {
    const response = await axios.delete(`/violation-data/${id}`)
    const result = responseDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to delete violation')
    }
    return result.data.data
  }
}
