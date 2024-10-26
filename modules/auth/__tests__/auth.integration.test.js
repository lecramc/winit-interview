import { describe, expect, test } from 'vitest'
import createTestStore from '@/modules/app/stores/TestStore'
import { HttpAuthGateway } from '@/modules/auth/core/gateways-infra/http-auth.gateway.js'
import { beforeEachConfig } from '@/modules/app/utils/beforEachConfig.js'
import User from '@/db/mongo/schemas/User.js'
import { registerUsecase } from '@/modules/auth/core/usecases/register.usecase.js'
import { getUserUsecase } from '@/modules/auth/core/usecases/get-user.usecase.js'

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

    await registerUsecase(newUser)(store)

    expect(store.auth.registrationState).toBe('fulfilled')
  })
  test('get user and updates store state to fulfilled', async () => {
    const userCreated = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'SecureP@ss123',
    })
    await getUserUsecase(userCreated._id.toString())(store)
    const user = store.auth.user
    expect(store.auth.authState).toBe('fulfilled')
    expect(store.auth.user).toEqual({
      _id: user._id,
      email: user.email,
      name: user.name,
    })
  })
})
