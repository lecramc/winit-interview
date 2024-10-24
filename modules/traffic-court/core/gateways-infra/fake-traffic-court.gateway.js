import { TrafficCourtGateway } from '@/modules/traffic-court/core/gateways/traffic-court.gateway.js'

export class FakeTrafficCourtGateway extends TrafficCourtGateway {
  trafficCourts = []

  async getTrafficCourts() {
    return this.trafficCourts
  }

  async getTrafficCourtById(id) {
    return this.trafficCourts.find((court) => court._id === id)
  }

  async createTrafficCourt(data) {
    const newCourt = { ...data, _id: 'newId' }
    this.trafficCourts.push(newCourt)
    return newCourt
  }

  async updateTrafficCourt(data) {
    const index = this.trafficCourts.findIndex((court) => court._id === data._id)
    if (index !== -1) {
      this.trafficCourts[index] = { ...this.trafficCourts[index], ...data }
      return this.trafficCourts[index]
    }
    throw new Error('Traffic Court not found')
  }

  async deleteTrafficCourt(id) {
    return this.trafficCourts.filter((court) => court._id !== id)
  }
}
