import { TrafficStateGateway } from '@/modules/traffic-state/core/gateways/traffic-state.gateway.js'

export class FakeTrafficStateGateway extends TrafficStateGateway {
  trafficStates = []

  async getTrafficStates() {
    return this.trafficStates
  }

  async getTrafficStateById(id) {
    return this.trafficStates.find((state) => state._id === id)
  }

  async createTrafficState(data) {
    const newState = { _id: Date.now().toString(), ...data }
    this.trafficStates.push(newState)
    return newState
  }

  async updateTrafficState(data) {
    const index = this.trafficStates.findIndex((state) => state._id === data._id)
    if (index !== -1) {
      this.trafficStates[index] = { ...this.trafficStates[index], ...data }
      return this.trafficStates[index]
    }
    throw new Error('Traffic State not found')
  }

  async deleteTrafficState(id) {
    this.trafficStates = this.trafficStates.filter((state) => state._id !== id)
    return this.trafficStates
  }
}
