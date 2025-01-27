import { z } from 'zod'
import axios from '@/modules/app/axios.js'
import { TrafficCountyGateway } from '@/modules/traffic-county/core/gateways/traffic-county.gateway.js'

export const trafficCountyDto = z.object({
  _id: z.string(),
  name: z.string(),
  trafficState: z
    .object({
      _id: z.string(),
      shortName: z.string(),
      longName: z.string(),
      enable: z.boolean(),
    })
    .optional()
    .nullable(),
  enable: z.boolean(),
})

const getTrafficCountiesDto = z.object({
  success: z.boolean(),
  data: z.array(trafficCountyDto),
})
const getTrafficCountyDto = z.object({
  success: z.boolean(),
  data: trafficCountyDto,
})

export class HttpTrafficCountyGateway extends TrafficCountyGateway {
  async getTrafficCounties() {
    const response = await axios.get('/traffic-county-data')
    const result = getTrafficCountiesDto.safeParse(response.data)
    if (!result.success) {
      console.error('Validation error:', result.error)
      throw new Error('Failed to fetch traffic counties')
    }
    return result.data.data
  }

  async getTrafficCountyById(id) {
    const response = await axios.get(`/traffic-county-data/${id}`)
    const result = getTrafficCountyDto.safeParse(response.data)

    if (!result.success) {
      throw new Error('Failed to fetch traffic county by ID')
    }
    return result.data.data
  }

  async createTrafficCounty(countyData) {
    const response = await axios.post('/traffic-county-data', countyData)
    const result = getTrafficCountyDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to create traffic county')
    }
    return result.data.data
  }

  async updateTrafficCounty(countyData) {
    const response = await axios.put(`/traffic-county-data/${countyData._id}`, countyData)
    const result = getTrafficCountyDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to update traffic county')
    }
    return result.data.data
  }

  async deleteTrafficCounty(id) {
    const response = await axios.delete(`/traffic-county-data/${id}`)
    const result = getTrafficCountyDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to delete traffic county')
    }
    return result.data.data
  }
}
