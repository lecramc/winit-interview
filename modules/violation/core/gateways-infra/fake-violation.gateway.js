import { ViolationGateway } from '@/modules/violation/core/gateways/violation.gateway.js'

export class FakeViolationGateway extends ViolationGateway {
  violations = []

  async getViolations() {
    return this.violations
  }

  async getViolationById(id) {
    return this.violations.find((violation) => violation._id === id)
  }

  async createViolation(data) {
    const newViolation = { _id: 'newId', ...data }
    this.violations.push(newViolation)
    return newViolation
  }

  async updateViolation(data) {
    const index = this.violations.findIndex((violation) => violation._id === data._id)
    if (index !== -1) {
      this.violations[index] = { ...this.violations[index], ...data }
      return this.violations[index]
    }
    throw new Error('Violation not found')
  }

  async deleteViolation(id) {
    this.violations = this.violations.filter((violation) => violation._id !== id)
    return this.violations
  }
}
