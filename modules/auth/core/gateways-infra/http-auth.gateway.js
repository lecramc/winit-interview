import axios from '@/modules/app/axios'
import { AuthGateway } from '@/modules/auth/core/gateways/auth.gateway.js'

import { z } from 'zod'

const userDto = z.object({
  success: z.boolean(),
  user: z.object({
    _id: z.string(),
    name: z.string(),
    email: z.string(),
  }),
})
export class HttpAuthGateway extends AuthGateway {
  async login({ email, password }) {
    const unvalidatedResponse = await axios.post('/auth/login', {
      email,
      password,
    })

    const response = userDto.safeParse(unvalidatedResponse.data)
    if (!response.success) {
      throw new Error('Failed to login')
    }
    return response.data.user
  }

  async logout() {
    const response = await axios.post('/auth/logout')
    return response.data
  }
  async register({ name, email, password }) {
    const unvalidatedResponse = await axios.post('/auth/user', {
      name,
      email,
      password,
    })
    const result = userDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to register')
    }
    return result.data.data
  }
  async getUser(id) {
    const unvalidatedResponse = await axios.get(`/auth/user/${id}`)
    const result = userDto.safeParse(unvalidatedResponse.data)
    if (!result.success) {
      throw new Error('Failed to get user')
    }
    return result.data.user
  }
}
