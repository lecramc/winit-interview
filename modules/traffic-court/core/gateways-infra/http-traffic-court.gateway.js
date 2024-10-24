import { z } from 'zod'
import axios from '@/modules/app/axios.js'
import { TrafficCourtGateway } from '@/modules/traffic-court/core/gateways/traffic-court.gateway.js'

const trafficCourtDto = z.object({
  _id: z.string(),
  name: z.string(),
  address: z.string(),
  trafficCounty: z.string(),
  trafficState: z.string(),
  stateShortName: z.string(),
})

const getTrafficCourtsDto = z.object({
  success: z.boolean(),
  data: z.array(trafficCourtDto),
})

const deleteTrafficCourtDto = z.object({
  success: z.boolean(),
  data: trafficCourtDto,
})

export class HttpTrafficCourtGateway extends TrafficCourtGateway {
  async getTrafficCourts() {
    const unvalidatedResponse = await axios.get('/traffic-court-data')
    const result = getTrafficCourtsDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to fetch traffic courts')
    }
    return result.data.data
  }

  async deleteTrafficCourt(id) {
    const unvalidatedResponse = await axios.delete(`/traffic-court-data/${id}`)
    const result = deleteTrafficCourtDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to delete traffic court')
    }
    return result.data.data
  }
}
