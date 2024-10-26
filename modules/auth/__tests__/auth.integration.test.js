import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { HttpAuthGateway } from '@/modules/auth/core/gateways-infra/http-auth.gateway.js'
import { beforeEachConfig } from '@/modules/app/utils/beforEachConfig.js'

let store

beforeEach(async () => {
  await beforeEachConfig()

  const gateway = new HttpAuthGateway()
  store = createTestStore({
    dependencies: { authGateway: gateway },
  })
})

describe('Integration test: login via auth API', () => {
  test('login action sets cookie and updates store state to fulfilled', async () => {
    const loginData = { email: 'user@example.com', password: 'password123' }

    await store.auth.login(loginData)

    expect(store.auth.authState).toBe('fulfilled')
  })
  test('register user and updates store state to fulfilled', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecureP@ss123',
    }

    await store.auth.register(newUser)

    expect(store.auth.registrationState).toBe('fulfilled')
  })
})
