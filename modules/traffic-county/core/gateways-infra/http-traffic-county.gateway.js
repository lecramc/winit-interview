import { z } from 'zod'
import axios from '@/modules/app/axios.js'
import { TrafficCountyGateway } from '@/modules/traffic-county/core/gateways/traffic-county.gateway.js'

const trafficCountyDto = z.object({
  _id: z.string(),
  name: z.string(),
  trafficState: z.string(),
  stateShortName: z.string(),
})

const getTrafficCountiesDto = z.object({
  success: z.boolean(),
  data: z.array(trafficCountyDto),
})

const deleteTrafficCountyDto = z.object({
  success: z.boolean(),
  data: trafficCountyDto,
})

export class HttpTrafficCountyGateway extends TrafficCountyGateway {
  async getTrafficCounties() {
    const unvalidatedResponse = await axios.get('/traffic-county-data')
    const result = getTrafficCountiesDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to fetch traffic counties')
    }
    return result.data.data
  }

  async deleteTrafficCounty(id) {
    const unvalidatedResponse = await axios.delete(`/traffic-county-data/${id}`)
    const result = deleteTrafficCountyDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to delete traffic county')
    }
    return result.data.data
  }
}
