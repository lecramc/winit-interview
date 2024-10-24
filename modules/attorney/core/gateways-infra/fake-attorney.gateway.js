import { AttorneyGateway } from '@/modules/attorney/core/gateways/attorney.gateway.js'

export class FakeAttorneyGateway extends AttorneyGateway {
  attorneys = []

  async getAttorneys() {
    if (this.attorneys.length > 0) {
      return this.attorneys
    }
    return new Error('No attorneys found')
  }
  async getAttorneyById(id) {
    const attorney = this.attorneys.find((attorney) => attorney._id === id)
    if (attorney) {
      return attorney
    }
    throw new Error(`Attorney with id ${id} not found`)
  }

  async createAttorney(newAttorneyData) {
    const newAttorney = { ...newAttorneyData, _id: Date.now().toString() }
    this.attorneys.push(newAttorney)
    return newAttorney
  }

  async updateAttorney(updatedAttorneyData) {
    const index = this.attorneys.findIndex((attorney) => attorney._id === updatedAttorneyData._id)
    if (index !== -1) {
      this.attorneys[index] = { ...this.attorneys[index], ...updatedAttorneyData }
      return this.attorneys[index]
    }
    throw new Error(`Attorney with id ${id} not found`)
  }

  async deleteAttorney(id) {
    const index = this.attorneys.findIndex((attorney) => attorney._id === id)
    if (index !== -1) {
      this.attorneys.splice(index, 1)
      return true
    }
    throw new Error(`Attorney with id ${id} not found`)
  }
}
