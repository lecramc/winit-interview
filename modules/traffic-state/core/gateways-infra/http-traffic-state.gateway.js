import { z } from 'zod'
import axios from '@/modules/app/axios.js'
import { TrafficStateGateway } from '@/modules/traffic-state/core/gateways/traffic-state.gateway.js'

const trafficStateDto = z.object({
  _id: z.string(),
  longName: z.string(),
  shortName: z.string(),
})

const getTrafficStatesDto = z.object({
  success: z.boolean(),
  data: z.array(trafficStateDto),
})

const deleteTrafficStateDto = z.object({
  success: z.boolean(),
  data: trafficStateDto,
})

export class HttpTrafficStateGateway extends TrafficStateGateway {
  async getTrafficStates() {
    const unvalidatedResponse = await axios.get('/traffic-state-data')
    const result = getTrafficStatesDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to fetch traffic states')
    }
    return result.data.data
  }

  async deleteTrafficState(id) {
    const unvalidatedResponse = await axios.delete(`/traffic-state-data/${id}`)
    const result = deleteTrafficStateDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to delete traffic state')
    }
    return result.data.data
  }
}
