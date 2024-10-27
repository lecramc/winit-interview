import { AuthGateway } from '@/modules/auth/core/gateways/auth.gateway.js'
import { UserFactory } from '@/modules/auth/core/factories/user.factory.js'

export class FakeAuthGateway extends AuthGateway {
  async login({ email, password }) {
    if (email === 'test@example.com' && password === 'password123') {
      return UserFactory.create({ _id: 'user-123', email, name: 'Test User' })
    }
    throw new Error('Invalid credentials')
  }
  async register({ name, email, password }) {
    if (email && password && name) {
      return UserFactory.create({ _id: 'user-123', email, name: 'Test User' })
    }
    throw new Error('Invalid credentials')
  }
  async getUser(id) {
    if (id === 'user-123') {
      return UserFactory.create({ _id: 'user-123', email: 'user@example.com' })
    }
    throw new Error('Invalid credentials')
  }
}
