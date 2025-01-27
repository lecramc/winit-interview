import { z } from 'zod'
import axios from '@/modules/app/axios.js'
import { TrafficStateGateway } from '@/modules/traffic-state/core/gateways/traffic-state.gateway.js'

export const trafficStateDto = z.object({
  _id: z.string(),
  shortName: z.string(),
  longName: z.string(),
  enable: z.boolean(),
})

const oneTrafficStateDto = z.object({
  success: z.boolean(),
  data: trafficStateDto,
})

const getTrafficStatesDto = z.object({
  success: z.boolean(),
  data: z.array(trafficStateDto),
})

export class HttpTrafficStateGateway extends TrafficStateGateway {
  async getTrafficStates() {
    const response = await axios.get('/traffic-state-data')
    const result = getTrafficStatesDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to fetch traffic states')
    }
    return result.data.data
  }

  async getTrafficStateById(id) {
    const response = await axios.get(`/traffic-state-data/${id}`)
    const result = oneTrafficStateDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to fetch traffic state by ID')
    }
    return result.data.data
  }

  async createTrafficState(stateData) {
    const response = await axios.post('/traffic-state-data', stateData)
    const result = oneTrafficStateDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to create traffic state')
    }
    return result.data.data
  }

  async updateTrafficState(stateData) {
    const response = await axios.put(`/traffic-state-data/${stateData._id}`, stateData)
    const result = oneTrafficStateDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to update traffic state')
    }
    return result.data.data
  }

  async deleteTrafficState(id) {
    const response = await axios.delete(`/traffic-state-data/${id}`)
    const result = oneTrafficStateDto.safeParse(response.data)
    if (!result.success) {
      throw new Error('Failed to delete traffic state')
    }
    return result.data.data
  }
}
