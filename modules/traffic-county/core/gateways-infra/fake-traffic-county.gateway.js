import { TrafficCountyGateway } from '@/modules/traffic-county/core/gateways/traffic-county.gateway.js'

export class FakeTrafficCountyGateway extends TrafficCountyGateway {
  trafficCounties = []

  async getTrafficCounties() {
    return this.trafficCounties
  }

  async getTrafficCountyById(id) {
    return this.trafficCounties.find((county) => county._id === id)
  }

  async createTrafficCounty(data) {
    const newCounty = { _id: 'newId', ...data }
    this.trafficCounties.push(newCounty)
    return newCounty
  }

  async updateTrafficCounty(data) {
    const index = this.trafficCounties.findIndex((county) => county._id === data._id)
    if (index !== -1) {
      this.trafficCounties[index] = { ...this.trafficCounties[index], ...data }
      return this.trafficCounties[index]
    }
    throw new Error('Traffic County not found')
  }

  async deleteTrafficCounty(id) {
    this.trafficCounties = this.trafficCounties.filter((county) => county._id !== id)
    return this.trafficCounties
  }
}
