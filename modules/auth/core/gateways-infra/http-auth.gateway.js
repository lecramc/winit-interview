import axios from '@/modules/app/axios'
import { AuthGateway } from '@/modules/auth/core/gateways/auth.gateway.js'

import { z } from 'zod'

const loginDto = z.object({
  success: z.boolean(),
  data: z.object({
    user: z.object({
      _id: z.string(),
      name: z.string(),
      email: z.string(),
    }),
  }),
})
export class HttpAuthGateway extends AuthGateway {
  async login({ email, password }) {
    const unvalidatedResponse = await axios.post('/auth/login', {
      email,
      password,
    })
    const response = loginDto.safeParse(unvalidatedResponse.data)
    if (!response.success) {
      throw new Error('Failed to login')
    }
    return response.data.data
  }

  async logout() {
    const response = await axios.post('/api/auth/logout')
    return response.data
  }
}