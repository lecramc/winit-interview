import { z } from 'zod'
import axios from '@/modules/app/axios.js'
import { ViolationGateway } from '@/modules/violation/core/gateways/violation.gateway.js'

const violationDto = z.object({
  _id: z.string(),
  name: z.string(),
  points: z.number(),
})

const getViolationsDto = z.object({
  success: z.boolean(),
  data: z.array(violationDto),
})

const deleteViolationDto = z.object({
  success: z.boolean(),
  data: violationDto,
})

export class HttpViolationGateway extends ViolationGateway {
  async getViolations() {
    const unvalidatedResponse = await axios.get('/violation-data')
    const result = getViolationsDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to fetch violations')
    }
    return result.data.data
  }

  async deleteViolation(id) {
    const unvalidatedResponse = await axios.delete(`/violation-data/${id}`)
    const result = deleteViolationDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to delete violation')
    }
    return result.data.data
  }
}
