import { z } from 'zod'
import axios from '@/modules/app/axios.js'
import { TrafficCourtGateway } from '@/modules/traffic-court/core/gateways/traffic-court.gateway.js'

const trafficStateDto = z.object({
  _id: z.string(),
  shortName: z.string(),
  longName: z.string(),
  enable: z.boolean(),
})

const trafficCountyDto = z.object({
  _id: z.string(),
  name: z.string(),
  trafficState: z.string(),
  enable: z.boolean(),
})
export const trafficCourtDto = z.object({
  _id: z.string(),
  name: z.string(),
  address: z.string().optional(),
  trafficCounty: trafficCountyDto.optional().nullable(),
  trafficState: trafficStateDto.optional().nullable(),
  enable: z.boolean(),
})

const getTrafficCourtsDto = z.object({
  success: z.boolean(),
  data: z.array(trafficCourtDto),
})
const getOneTrafficCourtDto = z.object({
  success: z.boolean(),
  data: trafficCourtDto,
})

export class HttpTrafficCourtGateway extends TrafficCourtGateway {
  async getTrafficCourts() {
    const response = await axios.get('/traffic-court-data')
    const result = getTrafficCourtsDto.safeParse(response.data)

    if (!result.success) {
      console.error('Validation error:', result.error)
      throw new Error('Failed to fetch traffic courts')
    }
    return result.data.data
  }

  async getTrafficCourtById(id) {
    const response = await axios.get(`/traffic-court-data/${id}`)
    const result = getOneTrafficCourtDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to fetch traffic court by ID')
    }
    return result.data.data
  }

  async createTrafficCourt(courtData) {
    const response = await axios.post('/traffic-court-data', courtData)
    const result = getOneTrafficCourtDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to create traffic court')
    }
    return result.data.data
  }

  async updateTrafficCourt(courtData) {
    const response = await axios.put(`/traffic-court-data/${courtData._id}`, courtData)
    const result = getOneTrafficCourtDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to update traffic court')
    }
    return result.data.data
  }

  async deleteTrafficCourt(id) {
    const response = await axios.delete(`/traffic-court-data/${id}`)
    const result = getOneTrafficCourtDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to delete traffic court')
    }
    return result.data.data
  }
}
